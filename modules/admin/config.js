'use strict';

/* Account Module */
angular.module('admin', [])
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
            .when('/',
                {
                    templateUrl: 'modules/admin/partials/dashboard.html',
                    controller: 'dashboardCtrl',
                    resolve: resolve
                })
            .when('/settings',
                {
                    templateUrl: 'modules/admin/partials/change-pass.html',
                    controller: 'changePasswordCtrl',
                    resolve: resolve
                })
            .when('/profile',
                {
                    templateUrl: 'modules/admin/partials/change-image.html',
                    controller: 'changeImageCtrl',
                    resolve: resolve
                });

    }]);