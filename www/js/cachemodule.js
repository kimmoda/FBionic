;(function() {
"use strict";

angular.module("cachemodule", []).run(["$templateCache", function($templateCache) {$templateCache.put("module/gallery/view/gallery.account.tabs.html","<ion-view cache-view=\"false\" class=\"gallery-profile\"><ion-nav-title><h1 class=\"title\">{{ user.name }}</h1></ion-nav-title><ion-nav-buttons side=\"right\"><button gallery-settings class=\"button button-icon icon ion-gear-a\"></button></ion-nav-buttons><ion-content><div class=\"profile-top\"><div class=\"row\"><div class=\"col-25\"><img class=\"avatar\" user-avatar ng-src=\"{{ user.src }}\"></div><div class=\"col col-statics\"><div class=\"row\"><div class=\"col\"><span class=\"text-center\">{{ GalleryProfile.form.galleries }}</span><h3>Publicações</h3></div><div class=\"col\"><span class=\"text-center\">{{ GalleryProfile.form.follow }}</span><h3>Seguidores</h3></div><div class=\"col\"><span class=\"text-center\">{{ GalleryProfile.form.follow2 }}</span><h3>Seguindo</h3></div></div><div class=\"row col-edit\"><div class=\"col\"><button gallery-profile-edit class=\"button\">EDITAR SEU PERFIL</button></div></div></div></div><div class=\"padding\"><span class=\"user-username\">{{ user.name }}</span><p class=\"user-status\">{{ user.status }}</p></div><ion-tabs class=\"tabs-light\"><ion-tab icon=\"ion-android-apps\" ng-click=\"tab=\'grid\'\"></ion-tab><ion-tab icon=\"ion-navicon-round\" ng-click=\"tab=\'list\'\"></ion-tab><ion-tab icon=\"ion-ios-location-outline\"></ion-tab></ion-tabs></div><div class=\"profile-view\"><gallery-photo-grid gallery=\"GalleryProfile.data\" loading=\"GalleryProfile.loading\"></gallery-photo-grid></div></ion-content></ion-view>");
$templateCache.put("module/gallery/view/gallery.activity.html","<ion-view cache-view=\"false\" class=\"gallery-activity\"><ion-nav-title><h1 class=\"title\">{{ \'Activities\' | translate }}</h1></ion-nav-title><ion-content overflow-scroll=\"true\"><gallery-loading loading=\"GalleryActivity.loading\" icon=\"android\"></gallery-loading><div class=\"list\"><div class=\"item item-avatar item-animate1\" ng-repeat=\"item in GalleryActivity.data\"><img ng-src=\"{{ item.user.src }}\"><h2>{{ item.user.name }}</h2><div class=\"text\">{{ item.action | translate }}</div><p>{{ item.created | amTimeAgo }}</p><div class=\"img-right\" ng-if=\"ite.img\"><img ng-src=\"{{ item.img }}\"></div></div></div><ion-infinite-scroll ng-if=\"!GalleryActivity.loading\" on-infinite=\"GalleryActivity.load()\"></ion-infinite-scroll></ion-content></ion-view>");
$templateCache.put("module/gallery/view/gallery.capture.html","<ion-view view-title=\"{{ \'Share\' | translate }}\" cache-view=\"false\"><ion-content><div class=\"center-ico\"><i class=\"icon ion-camera\"></i><h1 translate>Share photo</h1></div></ion-content></ion-view>");
$templateCache.put("module/gallery/view/gallery.capture.modal.html","<ion-modal-view class=\"modal-capture\"><ion-header-bar class=\"bar-dark\"><button class=\"button button-clear button-icon ion-ios-arrow-thin-left\" ng-click=\"closeModal()\"></button><div class=\"title\">{{ \'Share Photo\' | translate }}</div><button class=\"button button-positive\" ng-click=\"submitCapture()\"><i class=\"icon ion-arrow-right-b\"></i></button></ion-header-bar><ion-content><gallery-loading loading=\"loading\" icon=\"android\"></gallery-loading><div class=\"list\"><div class=\"item no-padding capture-photo\"><img ng-src=\"{{data}}\" ng-click=\"open()\"></div><div class=\"item item-input\"><input type=\"text\" name=\"title\" ng-model=\"form.title\" placeholder=\"{{ \'Write a Legend\'|translate }}\"></div><div class=\"item item-input\"><input type=\"text\" placeholder=\"{{ \'Location\' | translate }}\" ion-location location=\"form.geo\" ng-model=\"form.geo.resume\"></div><div class=\"item nopadding\" ng-show=\"form.geo.image\"><img ng-src=\"{{ form.geo.image }}\"></div><div class=\"item item-divider\" translate>Share In</div><formly-form model=\"formShare\" fields=\"formShareFields\"></formly-form></div></ion-content></ion-modal-view>");
$templateCache.put("module/gallery/view/gallery.comment.directive.html","<ion-modal-view class=\"modal-comment\"><ion-header-bar class=\"bar-dark\"><button class=\"button button-clear button-icon ion-ios-arrow-thin-left\" ng-click=\"closeModal()\"></button><div class=\"title\">{{ \'Comments\' | translate }} ({{ comments.length }})</div></ion-header-bar><ion-content><gallery-loading loading=\"loading\" icon=\"android\"></gallery-loading><div class=\"list step1\" ng-show=\"comments.length\"><div ng-repeat=\"item in comments\" class=\"item item-avatar\"><img ng-src=\"{{ item.user.src }}\"><div class=\"row\"><h2>{{ item.user.name }}</h2><div>{{ item.text }}</div></div><div class=\"row\"><p>{{ item.created | amTimeAgo }}</p></div></div></div><div class=\"center-ico step1\" ng-show=\"nocomments\"><i class=\"icon ion-ios-chatbubble-outline\"></i><h1 translate>No Comments</h1></div></ion-content><ion-footer class=\"step2\"><div class=\"form\"><formly-form model=\"form\" fields=\"formFields\" form=\"rForm\"><button class=\"button button-positive\" type=\"button\" ng-click=\"submitComment(rForm, form)\"><i class=\"icon ion-arrow-right-b\"></i></button></formly-form></div></ion-footer></ion-modal-view>");
$templateCache.put("module/gallery/view/gallery.home.html","<ion-view><ion-nav-title><span class=\"icon2-logo\"></span></ion-nav-title><ion-content overflow-scroll=\"true\"><ion-refresher ng-if=\"!GalleryHome.loading\" on-refresh=\"loadMore(true)\"></ion-refresher><gallery-loading loading=\"GalleryHome.loading\"></gallery-loading><gallery-photo-list gallery=\"GalleryHome.data\" loading=\"GalleryHome.loading\"></gallery-photo-list><div class=\"center-ico\" ng-if=\"GalleryHome.empty\"><i class=\"icon ion-ios-camera\"></i><h1 translate>Nenhuma foto postagem por perto</h1></div><ion-infinite-scroll ng-if=\"!GalleryHome.loadMore&&GalleryHome.more\" on-infinite=\"loadMore()\"></ion-infinite-scroll></ion-content></ion-view>");
$templateCache.put("module/gallery/view/gallery.like.directive.html","<ion-modal-view class=\"modal-comment\"><ion-header-bar class=\"bar-dark\"><button class=\"button button-clear button-icon ion-ios-arrow-thin-left\" ng-click=\"closeModal()\"></button><div class=\"title\">{{ \'Likes\' | translate }} ({{ likes.length }})</div></ion-header-bar><ion-content><div class=\"list step1\"><div ng-repeat=\"item in likes\" class=\"item item-avatar item-button-right\"><img ng-src=\"{{ item.user.img }}\"><h2>{{ item.user.name }}</h2><div>{{ item.text }}</div><p>{{ item.created | amTimeAgo }}</p><button class=\"button button-positive button-outline\"><i class=\"icon ion-ios-plus-empty\"></i> {{ \'Follow\' }}</button></div></div></ion-content></ion-modal-view>");
$templateCache.put("module/gallery/view/gallery.photo.feedback.modal.html","<ion-modal-view class=\"modal-profile\"><ion-header-bar class=\"bar-dark\"><button class=\"button button-clear button-icon ion-ios-arrow-thin-left\" ng-click=\"closeModal()\"></button><div class=\"title\">{{ \'Feedback\' | translate }}</div><button class=\"button button-positive\" ng-click=\"submitFeedback()\"><i class=\"icon ion-arrow-right-b\"></i></button></ion-header-bar><ion-content><div class=\"step2\"><formly-form model=\"form\" form=\"rForm\" fields=\"formFields\"></formly-form></div></ion-content></ion-modal-view>");
$templateCache.put("module/gallery/view/gallery.photo.html","<ion-view view-title=\"Photo\"><ion-content><div class=\"list card step1\"><div class=\"item item-avatar\" data-affix-within-parent-with-class=\"card\" ion-affix><img ng-src=\"{{GalleryPhoto.data.user.img}}\"><h2>{{GalleryPhoto.data.user.name}}</h2><span>{{GalleryPhoto.data.created | amTimeAgo}}</span></div><div class=\"item item-body\"><img ng-src=\"{{GalleryPhoto.data.img._url}}\" style=\"width: 100%\"></div><div class=\"padding\"><p>{{ GalleryPhoto.data.title }}</p><p><a class=\"subdued\" href=\"#\">1 {{ \'Like\' | translate}}</a></p></div></div><div class=\"list\"><div ng-repeat=\"item in GalleryPhoto.comments\" class=\"item item-avatar\"><img ng-src=\"{{ item.user.img }}\"><h2>{{ item.user.name }}</h2><p>{{ item.text }}</p></div></div><div class=\"step2\"><formly-form model=\"GalleryPhoto.form\" fields=\"GalleryPhoto.formFields\" form=\"rForm\"><div class=\"padding\"><button class=\"button button-block button-positive\" type=\"button\" ng-click=\"GalleryPhoto.submitComment(rForm, GalleryPhoto.form)\" translate>Comment</button></div></formly-form></div></ion-content></ion-view>");
$templateCache.put("module/gallery/view/gallery.photos.grid.html","<gallery-loading loading=\"loading\" icon=\"android\"></gallery-loading><div class=\"row step1\" ng-if=\"$index % 3 === 0\" ng-repeat=\"image in data\"><div class=\"col col-33 item-animate1\" ng-if=\"$index < data.length\"><img ng-src=\"{{data[$index].src}}\" width=\"100%\"></div><div class=\"col col-33 item-animate1\" ng-if=\"$index + 1 < data.length\"><img ng-src=\"{{data[$index + 1].src}}\" width=\"100%\"></div><div class=\"col col-33 item-animate1\" ng-if=\"$index + 2 < data.length\"><img ng-src=\"{{data[$index + 2].src}}\" width=\"100%\"></div></div>");
$templateCache.put("module/gallery/view/gallery.photos.list.html","<div class=\"list card animated fadeIn\" ng-repeat=\"gallery in data\"><div class=\"item item-avatar\"><img ng-src=\"{{gallery.user.src}}\"><h2>{{gallery.user.name}}</h2><p>{{ gallery.user.status }}</p><span>{{gallery.created | amTimeAgo}}</span></div><div class=\"item item-body\" ng-click=\"like = !like\"><i class=\"icon\" ng-if=\"like\"></i> <img cache-src=\"{{gallery.src}}\"></div><div class=\"item item-buttons\"><div class=\"row\"><div class=\"col col-75\"><button gallery-like ng-model=\"gallery\" ng-class=\"(gallery.liked ===1) ? \'ion-ios-heart\' : \'ion-ios-heart-outline\'\" class=\"button-clear button-icon button-heart\"></button> <button gallery-comment ng-model=\"gallery\" class=\"button-clear button-icon ion-ios-chatbubble-outline\"></button></div><div class=\"col text-right\"><button gallery-photo-feedback gallery=\"{{ gallery.id }}\" class=\"button-clear button-icon ion-android-more-vertical\"></button></div></div></div><div class=\"padding\"><span class=\"likes\" gallery-like gallery=\"{{ gallery }}\"><i class=\"icon ion-ios-heart\"></i> {{ gallery.likes + \' \' }} {{ \'Likes\' | translate }}</span><div class=\"list-comments\"><div class=\"comment-item\"><span class=\"username\">{{ gallery.user.name }}</span> <span class=\"comment\">{{ gallery.item.title }}</span></div><div class=\"comment-item\" ng-repeat=\"item in gallery.comments\"><span class=\"username\">{{ item.user.name }}</span> <span class=\"comment\">{{ item.text }}</span></div></div><button class=\"button button-block button-clear button-comment\" gallery-comment ng-model=\"gallery\">{{ \'Add comment\' | translate }}</button></div></div>");
$templateCache.put("module/gallery/view/gallery.popover.home.html","<ion-popover-view><ion-content><div class=\"list\"><div class=\"item\" ui-sref=\"gallery.settings\" translate>Settings</div><div class=\"item\" ui-sref=\"gallery.settings\" translate>About</div></div></ion-content></ion-popover-view>");
$templateCache.put("module/gallery/view/gallery.profile.edit.modal.html","<ion-modal-view class=\"modal-profile\"><ion-header-bar class=\"bar-positive\"><button class=\"button button-clear button-icon ion-ios-arrow-thin-left\" ng-click=\"closeModal()\"></button><div class=\"title\">{{ \'Edit Profile\' | translate }}</div></ion-header-bar><ion-content class=\"view-avatar\"><div class=\"row step1\"><div class=\"col\"><img class=\"avatar\" user-avatar ng-src=\"{{ form.src }}\"></div></div><div class=\"step2\"><formly-form model=\"form\" fields=\"formFields\" form=\"rForm\"></formly-form></div><div class=\"padding step3\"><button ng-click=\"linkFacebook()\" ng-disabled=\"form.facebook\" class=\"button button-block button-facebook\"><i class=\"icon ion-social-facebook\"></i> <span translate>Link Facebook</span></button> <button class=\"button button-block button-positive\" ng-click=\"submitUpdateProfile()\" translate>Save Profile</button></div></ion-content></ion-modal-view>");
$templateCache.put("module/gallery/view/gallery.profile.photos.html","<ion-view title=\"{{\'Profile\' | translate}}\" class=\"profile\"><ion-content scroll=\"false\"><h2>Fotos</h2></ion-content></ion-view>");
$templateCache.put("module/gallery/view/gallery.profile.tabs.html","<ion-view cache-view=\"false\" class=\"profile\"><ion-nav-title><h1 class=\"title\">{{ GalleryProfile.form.name }}</h1></ion-nav-title><ion-content><div class=\"profile-top step1\"><div class=\"row\"><div class=\"col-25\"><img class=\"avatar step1\" user-avatar ng-src=\"{{ GalleryProfile.form.img }}\"></div><div class=\"col col-statics\"><div class=\"row\"><div class=\"col\"><span class=\"text-center\">{{ GalleryProfile.form.galleries }}</span><h3 translate>posts</h3></div><div class=\"col\"><span class=\"text-center\">{{ GalleryProfile.form.follow }}</span><h3 translate>followers</h3></div><div class=\"col\"><span class=\"text-center\">{{ GalleryProfile.form.follow2 }}</span><h3 tranlsate>following</h3></div></div><div class=\"row col-edit\"><div class=\"col\"><button gallery-profile-edit class=\"button\">{{ \'EDIT YOUR PROFILE\' | translate }}</button></div></div></div></div><div class=\"padding\"><span class=\"user-username\">{{ GalleryProfile.form.name }}</span><p class=\"user-status\">{{ GalleryProfile.form.status }}</p></div><ion-tabs class=\"tabs-light\"><ion-tab icon=\"ion-android-apps\"></ion-tab><ion-tab icon=\"ion-navicon-round\"></ion-tab><ion-tab icon=\"ion-ios-location-outline\"></ion-tab></ion-tabs></div></ion-content></ion-view>");
$templateCache.put("module/gallery/view/gallery.search.grid.html","<ion-view><ion-nav-title><ion-search class=\"search-wrapper-light\" placeholder=\"{{ \'Search\' | translate }}\" min-length=\"1\" model=\"GallerySearchGrid.data\" source=\"GallerySearchGrid.search(str)\"></ion-search></ion-nav-title><ion-content class=\"gallery-search\"><gallery-photo-grid gallery=\"GallerySearchGrid.data\" loading=\"GallerySearchGrid.loading\"></gallery-photo-grid></ion-content></ion-view>");
$templateCache.put("module/gallery/view/gallery.search.map.html","<ion-view class=\"maps-view\"><ion-nav-title translate>Map</ion-nav-title><ion-nav-buttons side=\"right\"><button ng-click=\"GallerySearchMap.location()\" class=\"button button-icon icon ion-pinpoint\"></button></ion-nav-buttons><ion-content scroll=\"false\"><div class=\"map-container\"><ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\"><ui-gmap-marker idkey=\"0\" coords=\"GallerySearchMap.user\"></ui-gmap-marker><ui-gmap-marker idkey=\"item.id\" coords=\"item.coords\" icon=\"item.icon\" ng-repeat=\"item in GallerySearchMap.data\"></ui-gmap-marker></ui-gmap-google-map></div></ion-content></ion-view>");
$templateCache.put("module/gallery/view/gallery.search.tabs.html","<ion-view title=\"Search\" class=\"view-tab\"><ion-nav-title><h1 class=\"title\">Search</h1></ion-nav-title><ion-tabs class=\"tabs-top tabs-positive tabs-striped\"><ion-tab title=\"Grid\" icon=\"ion-grid\" ui-sref=\"gallery.search.grid\"><ion-nav-view name=\"tabGrid\"></ion-nav-view></ion-tab><ion-tab title=\"Map\" icon=\"ion-map\" ui-sref=\"gallery.search.map\"><ion-nav-view name=\"tabMap\"></ion-nav-view></ion-tab></ion-tabs></ion-view>");
$templateCache.put("module/gallery/view/gallery.settings.modal.html","<ion-modal-view class=\"modal-profile\"><ion-header-bar class=\"bar-dark\"><button class=\"button button-clear button-icon ion-ios-arrow-thin-left\" ng-click=\"closeModal()\"></button><div class=\"title\">{{ \'Settings\' | translate }}</div></ion-header-bar><ion-content><div class=\"list\"><label class=\"item item-input item-select\"><div class=\"input-label\" style=\"z-index: 2;\"><h2>{{\'Change language\' | translate}}</h2></div><select ng-model=\"language\" ng-change=\"changeLanguage(language)\" ng-options=\"language.value as language.name for language in languages\"></select></label><div class=\"item item-divider\" translate>Follow Friends</div><div class=\"item\" translate>Invite Facebook Friends</div><div class=\"item\" translate>Share</div><div class=\"item item-divider\" translate>Account</div><div class=\"item\" ng-click=\"link(\'gallery.account\')\" translate>Edit Profile</div><div class=\"item item-divider\" translate>Terms</div><div class=\"item\" open-terms translate>Terms and Conditions</div></div><div class=\"padding\"><button ng-click=\"link(\'logout\')\" class=\"button button-block button-positive\" translate>Logout</button></div></ion-content></ion-modal-view>");
$templateCache.put("module/gallery/view/gallery.tabs.html","<ion-view><ion-nav-bar class=\"bar bar-positive bar-mop\" align-title=\"left\"><ion-nav-back-button></ion-nav-back-button></ion-nav-bar><ion-tabs class=\"tabs-dark tabs-photogram\"><ion-tab title=\"Home\" icon=\"ion-android-home\" ui-sref=\"gallery.home\"><ion-nav-view name=\"tabHome\"></ion-nav-view></ion-tab><ion-tab title=\"Search\" icon=\"ion-search\" ui-sref=\"gallery.search.grid\"><ion-nav-view name=\"tabSearch\"></ion-nav-view></ion-tab><ion-tab title=\"Capture\" icon=\"ion-camera\" class=\"middle\" ui-sref=\"gallery.capture\"><ion-nav-view name=\"tabCapture\"></ion-nav-view></ion-tab><ion-tab title=\"Notify\" icon=\"ion-chatbubble\" ui-sref=\"gallery.activity\"><ion-nav-view name=\"tabActivity\"></ion-nav-view></ion-tab><ion-tab title=\"Perfil\" icon=\"ion-person\" ui-sref=\"gallery.account\"><ion-nav-view name=\"tabProfile\"></ion-nav-view></ion-tab></ion-tabs></ion-view>");
$templateCache.put("module/gallery/view/gallery.user.list.html","<ion-view view-title=\"UserList\" class=\"gallery-userlist\"><ion-header-bar class=\"bar-dark\"><h1 class=\"title\">{{ \'Follow Users\' | translate }}</h1><div class=\"buttons\"><button class=\"button button-positive\" ng-click=\"GalleryUserList.submitFollow()\"><i class=\"icon ion-arrow-right-b\"></i></button></div></ion-header-bar><ion-content><div class=\"list\"><div class=\"item item-avatar item-button-right\" ng-repeat=\"item in GalleryUserList.data\"><img ng-src=\"{{ item.src }}\"><h2>{{ item.name }}</h2><p>{{ item.status }}</p><button class=\"button\" ng-click=\"item.follow = !item.follow\" ng-class=\"item.follow ? \'button-positive\' : \'button-stable\'\"><i class=\"icon\" ng-class=\"item.follow? \'ion-thumbsup\' : \'ion-plus\'\"></i></button></div></div></ion-content></ion-view>");
$templateCache.put("module/gallery/view/gallery.view.html","<ion-view view-title=\"{{ \'Gallery preview\' | translate }}\"><ion-content class=\"bg-content\"><ion-list class=\"card\" ng-if=\"!GalleryPreview.data.images.length\"><ion-item class=\"text-center\">No photos</ion-item></ion-list><div class=\"row\"><div class=\"col\" ng-repeat=\"picture in GalleryPreview.data.images\" ui-sref=\"app.gallerypreview({id: picture.id})\"><div class=\"card\"><div class=\"item item-image\"><img ng-src=\"{{picture.image._url}}\"></div></div></div></div></ion-content></ion-view>");}]);
}());
