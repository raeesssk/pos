'use strict';
/* Account Module */
angular.module('settablearea', [])
    .config(['$routeProvider', function config($routeProvider) {
        

        $routeProvider
            
            .when('/settablearea',
                {
                    templateUrl: 'modules/settablearea/partials/settablearea.html',
                    controller: 'settableareaCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/settablearea/controllers/settablearea.js']
                            }]);
                        }]
                    }
                });
				
        }]);