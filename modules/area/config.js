'use strict';
/* Account Module */
angular.module('area', [])
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
            
            .when('/area',
                {
                    templateUrl: 'modules/area/partials/area-list.html',
                    controller: 'areaListCtrl',
                    resolve: resolve
                })

			.when('/area/add',
                {
                    templateUrl: 'modules/area/partials/area-add.html',
                    controller: 'areaAddCtrl',
                    resolve: resolve
                })
				
			.when('/area/edit/:ctmId',
                {
                    templateUrl: 'modules/area/partials/area-edit.html',
                    controller: 'areaEditCtrl',
                    resolve: resolve
                });
				
        }]);