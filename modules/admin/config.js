'use strict';

/* Account Module */
angular.module('admin', [])
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
            .when('/',
                {
                    templateUrl: 'modules/admin/partials/dashboard.html',
                    controller: 'dashboardCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/admin/controllers/dashboard.js']
                            }]);
                        }]
                    }
                })
            // .when('/profile',
            //     {
            //         templateUrl: 'modules/setcorporate/partials/edit-setcorporate.html',
            //         controller: 'editCorporateCtrl',
            //         resolve: {
            //             lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
            //                 return $ocLazyLoad.load([{
            //                     name: 'myApp',
            //                     files: ['modules/setcorporate/controllers/edit-setcorporate.js']
            //                 }]);
            //             }]
            //         }
            //     })
            .when('/profile',
                {
                    templateUrl: 'modules/setcorporate/partials/setcorporate-edit.html',
                    controller: 'editCorporateCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/setcorporate/controllers/setcorporate-edit.js']
                            }]);
                        }]
                    }
                })
            .when('/settings',
                {
                    templateUrl: 'modules/admin/partials/change-pass.html',
                    controller: 'changePasswordCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/admin/controllers/change-password.js']
                            }]);
                        }]
                    }
                });

    }]);