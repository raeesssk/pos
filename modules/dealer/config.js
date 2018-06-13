'use strict';
/* Account Module */
angular.module('dealer', [])
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
            
            .when('/dealer',
                {
                    templateUrl: 'modules/dealer/partials/dealer-list.html',
                    controller: 'dealerListCtrl',
                    resolve: resolve
                })

			.when('/dealer/add',
                {
                    templateUrl: 'modules/dealer/partials/dealer-add.html',
                    controller: 'dealerAddCtrl',
                    resolve: resolve
                })
				
			.when('/dealer/edit/:ctmId',
                {
                    templateUrl: 'modules/dealer/partials/dealer-edit.html',
                    controller: 'dealerEditCtrl',
                    resolve: resolve
                });
				
        }]);