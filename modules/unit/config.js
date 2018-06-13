'use strict';
/* Account Module */
angular.module('unit', [])
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
            
            .when('/unit',
                {
                    templateUrl: 'modules/unit/partials/unit-list.html',
                    controller: 'unitListCtrl',
                    resolve: resolve
                })

			.when('/unit/add',
                {
                    templateUrl: 'modules/unit/partials/unit-add.html',
                    controller: 'unitAddCtrl',
                    resolve: resolve
                })
				
			.when('/unit/edit/:ctmId',
                {
                    templateUrl: 'modules/unit/partials/unit-edit.html',
                    controller: 'unitEditCtrl',
                    resolve: resolve
                });
				
        }]);