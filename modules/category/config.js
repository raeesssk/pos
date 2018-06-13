'use strict';
/* Account Module */
angular.module('category', [])
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
            
            .when('/category',
                {
                    templateUrl: 'modules/category/partials/category-list.html',
                    controller: 'categoryListCtrl',
                    resolve: resolve
                })

			.when('/category/add',
                {
                    templateUrl: 'modules/category/partials/category-add.html',
                    controller: 'categoryAddCtrl',
                    resolve: resolve
                })
				
			.when('/category/edit/:ctmId',
                {
                    templateUrl: 'modules/category/partials/category-edit.html',
                    controller: 'categoryEditCtrl',
                    resolve: resolve
                });
				
        }]);