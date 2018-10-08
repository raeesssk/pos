'use strict';
/* Account Module */
angular.module('setproduct', [])
    .config(['$routeProvider', function config($routeProvider) {
        

        $routeProvider
            
            .when('/setproduct',
                {
                    templateUrl: 'modules/setproduct/partials/setproduct.html',
                    controller: 'setproductListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/setproduct/controllers/setproduct.js']
                            }]);
                        }]
                    }
                });
				
        }]);