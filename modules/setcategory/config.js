'use strict';
/* Account Module */
angular.module('setcategory', [])
    .config(['$routeProvider', function config($routeProvider) {
       

        $routeProvider
            
            .when('/setcategory',
                {
                    templateUrl: 'modules/setcategory/partials/setcategory.html',
                    controller: 'setcategoryCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/setcategory/controllers/setcategory.js']
                            }]);
                        }]
                    }
                });
				
        }]);