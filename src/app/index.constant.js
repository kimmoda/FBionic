(function () {
    'use strict';
    angular.module('ionic').constant('AppConfig', AppConfig());

    function AppConfig() {
        return {
            path           : 'app/module/photogram',
            app            : {
                name : 'Photogram',
                url  : 'http://photogramapp.com',
                image: 'http://photogramapp.com/social-share.jpg',
            },
            routes         : {
                home : 'tab.home',
                login: 'user.login'
            },
            statusBarColor : '#00796B',
            gaTrackingId   : 'UA-69485876-2',
            facebookAppId  : '1024016557617380',
            parse          : {
                appId : 'myAppId',
                server: 'http://localhost:1337/parse/',
            },
            onesignal      : {
                id    : 'd13d00d0-013f-406f-9811-66ce0737d7bc',
                google: 'AIzaSyCEBeAMSs4nrAC-2cvG6N6Q_KqJpnUrnh0'
            },
            map            : {
                unit   : 'mi',
                mapType: 'normal',
            },
            locales        : [
                {
                    translation: 'portugues',
                    code       : 'pt'
                },
                {
                    translation: 'english',
                    code       : 'en'
                },
                {
                    translation: 'turkish',
                    code       : 'tr'
                },
                {
                    translation: 'persian',
                    code       : 'fa'
                },
                {
                    translation: 'german',
                    code       : 'de'
                }
            ],
            preferredLocale: 'en',
            DAO            : {
                name  : 'photogram_db',
                tables: [
                    {
                        name   : 'User',
                        columns: {
                            id         : 'TEXT PRIMARY KEY',
                            name       : 'TEXT',
                            username   : 'TEXT',
                            email      : 'TEXT',
                            language   : 'TEXT',
                            facebookimg: 'TEXT',
                            gender     : 'TEXT',
                            img        : 'TEXT',
                            facebook   : 'INTEGER',
                            qtdFollow  : 'INTEGER',
                            status     : 'TEXT',
                            createdAt  : 'INTEGER',
                            attributes : 'TEXT'
                        }
                    },
                    {
                        name   : 'UserFollow',
                        columns: {
                            id      : 'TEXT PRIMARY KEY',
                            user_id : 'TEXT',
                            followId: 'TEXT'
                        },
                    },
                    {
                        name   : 'Gallery',
                        columns: {
                            id       : 'TEXT PRIMARY KEY',
                            img      : 'TEXT',
                            title    : 'TEXT',
                            user_id  : 'TEXT',
                            location : 'TEXT',
                            isLiked  : 'BOOLEAN',
                            likes    : 'INTEGER',
                            createdAt: 'INTEGER'
                        }
                    },
                    {
                        name   : 'GalleryActivity',
                        columns: {
                            id        : 'TEXT PRIMARY KEY',
                            action    : 'TEXT',
                            img       : 'TEXT',
                            userAvatar: 'TEXT',
                            userName  : 'TEXT',
                            user_id   : 'TEXT',
                            gallery_id: 'TEXT',
                            createdAt : 'INTEGER'
                        }
                    },
                    {
                        name   : 'GalleryComment',
                        columns: {
                            id        : 'TEXT PRIMARY KEY',
                            name      : 'TEXT',
                            user_id   : 'TEXT',
                            userName  : 'TEXT',
                            gallery_id: 'TEXT',
                            createdAt : 'INTEGER'
                        }
                    },
                    {
                        name   : 'GallerySetting',
                        columns: {
                            key  : 'TEXT',
                            value: 'TEXT'
                        }
                    }
                ]
            }
        };
    }
})();
