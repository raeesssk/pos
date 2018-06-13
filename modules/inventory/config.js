'use strict';
/* Account Module */
angular.module('inventory', [])
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
            
            .when('/inventory',
                {
                    templateUrl: 'modules/inventory/partials/inventory-list.html',
                    controller: 'inventoryListCtrl',
                    resolve: resolve
                })

			.when('/inventory/add',
                {
                    templateUrl: 'modules/inventory/partials/inventory-add.html',
                    controller: 'inventoryAddCtrl',
                    resolve: resolve
                })
				
			.when('/inventory/edit/:ctmId',
                {
                    templateUrl: 'modules/inventory/partials/inventory-edit.html',
                    controller: 'inventoryEditCtrl',
                    resolve: resolve
                });
				
        }]);