'use strict';
angular
    .module ('module.gallery')
    .directive ('galleryLike', function (Gallery, Notify) {
    return {
        restrict: 'A',
        scope   : {
            ngModel: '='
        },
        template: '',
        link    : function ($scope, elem, attr) {
            elem.bind ('click', function () {

                Notify.showLoading ();

                console.log ($scope.ngModel);
                Gallery
                    .likeGallery ($scope.ngModel.id)
                    .then (function (resp) {
                    console.log (resp);
                    console.log (resp);
                    Notify.hideLoading();
                });

                if ($scope.ngModel.liked === 0) {
                    $scope.ngModel.liked = 1;
                    $scope.ngModel.likes += 1;
                } else {
                    $scope.ngModel.liked = 0;
                    $scope.ngModel.likes -= 1;
                }

                $scope.$apply ();

            });
        }
    }
});
