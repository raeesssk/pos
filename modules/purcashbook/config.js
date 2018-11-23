'use strict';
/* Account Module */
angular.module('purcashbook', [])
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
            
            .when('/cashbook',
                {
                    templateUrl: 'modules/purcashbook/partials/purcashbook-list.html',
                    controller: 'purcashbookCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/purcashbook/controllers/purcashbook-list.js']
                            }]);
                        }]
                    }
                })

			.when('/cashbook/add',
                {
                    templateUrl: 'modules/purcashbook/partials/purcashbook-add.html',
                    controller: 'purcashbookAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/purcashbook/controllers/purcashbook-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/cashbook/edit/:emId',
                {
                    templateUrl: 'modules/purcashbook/partials/purcashbook-edit.html',
                    controller: 'purcashbookEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/purcashbook/controllers/purcashbook-edit.js']
                             }]);
                        }]
                    }
                });
                
        }]);