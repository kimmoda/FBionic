(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .controller('GallerySearchGridCtrl', function ($scope, Gallery) {
      var vm = this;
      vm.loading = true;

      function init() {
        vm.data = [];
        vm.page = 0;
        vm.empty = false;
        vm.more = false;
      }

      init();

      $scope.loadMore = function (force) {
        console.log('Load More', vm.more);
        vm.load(force);
      };

      vm.load = function (string) {
        Gallery
          .search(string, vm.page)
          .then(function (resp) {
            vm.loading = false;

            angular.forEach(resp, function (value, key) {
              vm.data.push(value);
            });

            console.log('qtd', resp.length);

            if (resp.length) {
              vm.more = true;
              vm.page++;
            } else {
              vm.empty = true;
              vm.more = false;
            }
          })
          .then(function () {
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');

          })
          .catch(function () {
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if (vm.data.length) {
              vm.loading = false;
              vm.page++;
            } else {
              vm.empty = true;
              vm.loading = false;
            }
            vm.more = false;
          });
      };

      vm.load();

    });
})(window, window.angular);
