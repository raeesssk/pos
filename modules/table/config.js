'use strict';
/* Account Module */
angular.module('table', [])
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
            
            .when('/table',
                {
                    templateUrl: 'modules/table/partials/table-list.html',
                    controller: 'tableListCtrl',
                    resolve: resolve
                })

			.when('/table/add',
                {
                    templateUrl: 'modules/table/partials/table-add.html',
                    controller: 'tableAddCtrl',
                    resolve: resolve
                })
				
			.when('/table/edit/:ctmId',
                {
                    templateUrl: 'modules/table/partials/table-edit.html',
                    controller: 'tableEditCtrl',
                    resolve: resolve
                });
				
        }]);