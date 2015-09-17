(function (window, angular, cordova, Parse, undefined) {
  'use strict';
  angular
    .module('module.user')
    .factory('User', function ($q, AppConfig, $rootScope, $timeout, $ionicHistory, $location, $cordovaDevice,
      $facebook, $cordovaFacebook, Loading, $state) {

      var device = cordova ? true : false,
        facebook = device ? $cordovaFacebook : $facebook;

      function init() {
        // Parse Start
        Parse.initialize(AppConfig.parse.applicationId, AppConfig.parse.javascriptKey);
        var user = Parse.User.current();
        if (user) {
          console.log('Logged user');
          var newUser = loadProfile(user);

          if (newUser.name === '') {
            logout();
          }

        } else {
          console.log('Not logged user, go intro');
          $state.go(AppConfig.routes.login, {
            clear: true
          });
        }
      }


      function currentUser() {
        return $rootScope.user;
      }


      function loadProfile(response) {
        if (response) {
          var user = response.attributes;
          user.id = response.id;
          user = processImg(user);
          delete $rootScope.user;
          $rootScope.user = user;
          console.log('load profile', response, user);
          return user;
        } else {
          logout();
          return false;
        }
      }

      function processImg(obj) {
        console.log('process image', obj);
        if (obj.facebook) {
          obj.src = (obj.facebookimg) ? obj.facebookimg : 'img/user.png';
        } else {
          obj.src = (obj.img) ? obj.img.url() : 'img/user.png';
        }
        return obj;
      }

      function login(form) {
        var defer = $q.defer();
        Loading.start();
        Parse
          .User
          .logIn(form.email, form.password, {
            success: function (resp) {
              console.info(resp);
              Loading.end();
              var user = loadProfile(resp);
              //startPush('user-', user.email);
              defer.resolve(user);
            },
            error: function (user, err) {
              console.error(user, err);
              Loading.end();
              // The login failed. Check error to see why.
              defer.reject(err);
            }
          });
        return defer.promise;
      }

      function facebookLogin() {
        var defer = $q.defer();

        //facebook.logout();
        console.log('facebook login');

        Loading.start();

        facebook
          .login(['email'])
          .then(function (response) {

              console.log('facebook login', response);
              //Pega o Status do Login
              facebook
                .getLoginStatus()
                .then(function (response) {
                  console.log('facebook status', response);
                  facebook
                    .api('me/?fields=id,name,email,gender,bio', ['user_birthday'])
                    .then(function (dados) {
                      console.log('facebook api', dados);


                      var query = new Parse.Query(Parse.User);
                      query
                        .equalTo('email', dados.email)
                        .first({
                          success: function (user) {
                            console.log(user);

                            if (user) {
                              console.log('Já existe um cadastro com esse email', user);
                              if (user.get('facebook_complete') == Boolean(true)) {
                                console.log('Perfil já está completo, faz o login', dados, response);

                                facebookLogIn(response)
                                  .then(function (resp) {
                                    console.log('Logado', resp);
                                    defer.resolve({
                                      status: 0
                                    });
                                    Loading.end();
                                  });
                              } else {
                                console.log('Se ainda não está completo, manda completar o perfil', dados,
                                  response);

                                $rootScope.tempUser = processImg(user.attributes);
                                $rootScope.tempUser.src = 'https://graph.facebook.com/' + dados.id +
                                  '/picture?width=250&height=250';

                                console.log($rootScope.tempUser);
                                defer.resolve({
                                  status: 2
                                });
                                Loading.end();

                              }

                            } else {
                              // Se não encontrar nenhum usuário
                              console.log('Novo usuário');

                              // Crio uma conta no parse com o Facebook
                              facebookLogIn(response)
                                .then(function (newuser) {

                                  console.log(newuser);

                                  // Atualizo o novo perfil
                                  var form = {
                                    name: dados.name,
                                    facebook: dados.id,
                                    email: dados.email,
                                    gender: dados.gender,
                                    facebook_complete: Boolean(true),
                                    facebookimg: 'https://graph.facebook.com/' + dados.id +
                                      '/picture?width=250&height=250'
                                  };

                                  update(form)
                                    .then(function (resp) {
                                      console.warn('me response', resp);

                                      defer.resolve({
                                        status: 1
                                      });
                                      Loading.end();
                                    })


                                });


                            }

                          },
                          error: function (error) {
                            alert('Sem conexão');
                            Loading.end();

                          }
                        });

                    });
                });
            },
            function (response) {
              alert(JSON.stringify(response));

            });

        return defer.promise;
      }


      function facebookProfile() {
        var defer = $q.defer();
        facebookLogin()
          .then(function (resp) {

            facebook
              .api('me', '')
              .then(function (response) {
                defer.resolve([
                  resp,
                  response
                ]);
              }, function (error) {
                console.log(error);
                defer.reject(error);
              });
          });
        return defer.promise;
      }


      function register(form) {
        var defer = $q.defer();

        var formData = form;
        formData.username = form.email;
        Loading.start();

        console.log(formData);
        new Parse
          .User(formData)
          .signUp(null, {
            success: function (resp) {
              var user = loadProfile(resp);
              console.log(resp, user);
              Loading.end();
              //startPush('user-', user.email);
              defer.resolve(user);
            },
            error: function (user, resp) {
              Loading.end();
              console.log(resp);
              if (resp.code === 125) {
                defer.reject('Please specify a valid email address');
              } else if (resp.code === 202) {
                defer.reject('The email address is already registered');
              } else {
                defer.reject(resp);
              }
            }
          });
        return defer.promise;
      }

      function forgot(form) {
        var defer = $q.defer();
        new Parse
          .User
          .requestPasswordReset(form.email, {
            success: function (resp) {
              defer.resolve(resp);
            },
            error: function (err) {
              if (err.code === 125) {
                defer.reject('Email address does not exist');
              } else {
                defer.reject('An unknown error has occurred, please try again');
              }
            }
          });
        return defer.promise;
      }

      function logout() {
        Parse.User.logOut();
        delete $rootScope.user;
        //$window.location = '/#/intro';
        $state.go('intro', {
          clear: true
        });
        $ionicHistory.clearCache();
      }

      function update(form) {
        var defer = $q.defer();
        var currentUser = Parse.User.current();
        Loading.start();
        delete form.img;
        console.info('update user', form);
        delete form.authData;
        angular.forEach(form, function (value, key) {
          currentUser.set(key, value);
        });

        if (cordova) {

          var cordovaDevice = {
            device: $cordovaDevice.getDevice(),
            cordova: $cordovaDevice.getCordova(),
            model: $cordovaDevice.getModel(),
            platform: $cordovaDevice.getPlatform(),
            uuid: $cordovaDevice.getUUID(),
            version: $cordovaDevice.getVersion()
          };

          currentUser.set('device', cordovaDevice.device);
          currentUser.set('deviceCordova', cordovaDevice.cordova);
          currentUser.set('deviceModel', cordovaDevice.model);
          currentUser.set('devicePlatform', cordovaDevice.platform);
          currentUser.set('deviceUuiid', cordovaDevice.uuid);
          currentUser.set('deviceVersion', cordovaDevice.version);
        }
        currentUser.set('language', $rootScope.lang.value);
        currentUser
          .save()
          .then(function (resp) {
            console.log('load user', user);
            var user = loadProfile(resp);
            Loading.end();
            defer.resolve(user);
          });


        return defer.promise;
      }

      function updateAvatar(photo) {
        var defer = $q.defer();

        Loading.start();

        if (photo !== '') {

          // create the parse file
          var imageFile = new Parse.File('mypic.jpg', {
            base64: photo
          });

          // save the parse file
          return imageFile
            .save()
            .then(function () {

              photo = null;

              // create object to hold caption and file reference
              var currentUser = Parse.User.current();

              // set object properties
              currentUser.set('img', imageFile);

              // save object to parse backend
              currentUser
                .save()
                .then(function (resp) {
                  var user = loadProfile(resp);
                  console.log(resp);
                  Loading.end();
                  defer.resolve(user);
                });


            }, function (error) {
              Loading.end();
              console.log(error);
              defer.reject(error);
            });
        }
        return defer.promise;
      }


      function facebookFriends() {
        var defer = $q.defer();

        facebook
          .api('me/friends')
          .then(function (success) {
            defer.resolve(success);
          }, function (error) {
            defer.reject(error);
          });

        return defer.promise;
      }

      function facebookAPI(api) {
        var defer = $q.defer();

        facebook
          .api(api)
          .then(function (success) {
            defer.resolve(success);
          }, function (error) {
            defer.reject(error);
          });

        return defer.promise;
      }

      function facebookInvite() {
        var defer = $q.defer();
        if (device) {
          facebook
            .showDialog({
              method: 'apprequests',
              message: 'Venha para o nosso clube!'
            })
            .then(function (resp) {
              defer.resolve(resp);
            });
        } else {
          facebook
            .ui({
              method: 'apprequests',
              message: 'Venha para o nosso clube!'
            })
            .then(function (resp) {
              defer.resolve(resp);
            });
        }
        return defer.promise;
      }


      function list(force) {
        var defer = $q.defer();

        new Parse
          .Query('User')
          .notEqualTo('user', Parse.User.current())
          .find()
          .then(function (resp) {
            var users = [];
            angular.forEach(resp, function (item) {
              var user = item.attributes;
              user.id = item.id;
              user = processImg(user);

              new Parse
                .Query('UserFollow')
                .equalTo('user', Parse.User.current())
                .equalTo('follow', item)
                .count()
                .then(function (follow) {
                  user.follow = follow;

                  console.log(user);
                  users.push(user);
                })
            });
            defer.resolve(users);
          });

        return defer.promise;
      }

      function find(userId) {
        var defer = $q.defer();

        console.log('find', userId);
        new Parse
          .Query('User')
          .equalTo('objectId', userId)
          .first()
          .then(function (resp) {
            console.log(resp);
            defer.resolve(resp);
          });

        return defer.promise;
      }

      function profile(userId) {
        var defer = $q.defer();

        find(userId)
          .then(function (resp) {
            console.log(resp);
            var user = loadProfile(resp);

            new Parse
              .Query('Gallery')
              .equalTo('user', resp)
              .count()
              .then(function (gallery) {
                user.galleries = gallery;

                new Parse
                  .Query('UserFollow')
                  .equalTo('user', resp)
                  .count()
                  .then(function (foloow) {
                    user.follow = foloow;

                    new Parse
                      .Query('UserFollow')
                      .equalTo('follow', resp)
                      .count()
                      .then(function (follow2) {
                        user.follow2 = follow2;
                        defer.resolve(user);
                      })

                  });
              });
          });

        return defer.promise;
      }


      function follow(status, user) {
        var defer = $q.defer();

        if (status) {
          find(user)
            .then(function (follow) {
              var Object = Parse.Object.extend('UserFollow');
              var item = new Object();

              item.set('user', Parse.User.current());
              item.set('follow', follow);
              item.save()
                .then(function (resp) {
                  defer.resolve(resp);
                }, function (err) {
                  defer.resolve(err);
                });
            });
        } else {
          find(user)
            .then(function (follow) {
              new Parse
                .Query('UserFollow')
                .equalTo('user', Parse.User.current())
                .equalTo('follow', follow)
                .first()
                .then(function (item) {
                  item
                    .destroy()
                    .then(function (resp) {
                      defer.resolve(resp);
                    }, function (err) {
                      defer.resolve(err);
                    });
                })
            });
        }

        return defer.promise;
      }

      function addFollows(users) {
        console.log('addFollows', users);
        var promises = [];
        angular.forEach(users, function (user) {
          promises.push(follow(true, user.id));
        });
        return $q.all(promises);
      }

      function getMail(email) {
        var defer = $q.defer();
        Loading.start();
        new Parse
          .Query('User')
          .equalTo('email', email)
          .first()
          .then(function (resp) {
            Loading.end();
            defer.resolve(resp);
          }, function (resp) {
            Loading.end();
            defer.reject(resp);
          })
        return defer.promise;
      }

      function facebookLogIn(response) {
        var defer = $q.defer();

        var data = new Date(new Date().getTime() + response['authResponse']['expiresIn'] * 1000);

        Parse.FacebookUtils.logIn({
          id: response['authResponse']['userID'],
          access_token: response['authResponse']['accessToken'],
          expiration_date: data
        }, {
          success: function (response) {
            // Função caso tenha logado tanto no face quanto no Parse
            var user = loadProfile(response);
            console.log('User', user);
            defer.resolve(user);
          }
        });

        return defer.promise;
      }

      function facebookLink() {
        var defer = $q.defer();

        facebook
          .login(['email'])
          .then(function (response) {

              console.log('facebook login', response);
              //Pega o Status do Login
              facebook
                .getLoginStatus()
                .then(function (response) {
                  console.log('Facebook Status', response);

                  var data = new Date(new Date().getTime() + response['authResponse']['expiresIn'] * 1000);

                  var user = Parse.User.current();
                  console.log(user, response, data);

                  Parse.FacebookUtils.link(user, {
                    id: response['authResponse']['userID'],
                    access_token: response['authResponse']['accessToken'],
                    expiration_date: data
                  }, {
                    success: function (user) {
                      // Função caso tenha logado tanto no face quanto no Parse
                      console.log('User', user);
                      user.set('facebook', response.id);
                      user.set('facebook_img', 'https://graph.facebook.com/' + response.id +
                        '/picture?width=250&height=250');
                      user.set('facebook_complete', Boolean(true));
                      user.save()
                        .then(function (response) {
                          var user = loadProfile(response);
                          console.log('User', user);
                          defer.resolve(user);
                        });
                    }
                  });
                });
            },
            function (response) {
              alert(JSON.stringify(response));

            });


        return defer.promise;
      }


      return {
        init: init,
        addFollows: addFollows,
        currentUser: currentUser,
        register: register,
        login: login,
        profile: profile,
        logout: logout,
        update: update,
        updateAvatar: updateAvatar,
        forgot: forgot,
        list: list,
        find: find,
        follow: follow,
        mail: getMail,
        facebookLogin: facebookLogin,
        facebookLink: facebookLink,
        facebookProfile: facebookProfile,
        facebookFriends: facebookFriends,
        facebookInvite: facebookInvite,
        facebookAPI: facebookAPI
      };
    });
})(window, window.angular, window.cordova, window.Parse);
