'use strict';
/* Account Module */
angular.module('operatingtime', [])
    .config(['$routeProvider', function config($routeProvider) {
        var resolve = {
            data: ["$q", "$location", function ($q, $location) {
              /*  if (!localStorageService.get('kayre_access_token')) {
                    alert("Your session has been expired");
                    window.location = 'login.html';
                    return $q.defer.promise;
                }*/

            }]

        };

        $routeProvider
            
            // .when('/operatingtime',
            //     {
            //         templateUrl: 'modules/operatingtime/partials/operatingtime-list.html',
            //         controller: 'operatingtimeListCtrl',
            //         resolve: {
            //             lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
            //                 return $ocLazyLoad.load([{
            //                     name: 'myApp',
            //                     files: ['modules/operatingtime/controllers/operatingtime-list.js']
            //                 }]);
            //             }]
            //         }
            //     })

			.when('/operatingtime/add',
                {
                    templateUrl: 'modules/operatingtime/partials/operatingtime-add.html',
                    controller: 'operatingtimeAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/operatingtime/controllers/operatingtime-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/operatingtime/edit/:otmId',
                {
                    templateUrl: 'modules/operatingtime/partials/operatingtime-edit.html',
                    controller: 'operatingtimeEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/operatingtime/controllers/operatingtime-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);