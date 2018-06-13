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
            
            .when('/purcashbook',
                {
                    templateUrl: 'modules/purcashbook/partials/purcashbook-list.html',
                    controller: 'purcashbookCtrl',
                    resolve: resolve
                })

			.when('/purcashbook/add',
                {
                    templateUrl: 'modules/purcashbook/partials/purcashbook-add.html',
                    controller: 'purcashbookAddCtrl',
                    resolve: resolve
                })
				
			.when('/purcashbook/edit/:emId',
                {
                    templateUrl: 'modules/purcashbook/partials/purcashbook-edit.html',
                    controller: 'purcashbookEditCtrl',
                    resolve: resolve
                });
				
        }]);