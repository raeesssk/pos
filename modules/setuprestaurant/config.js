'use strict';
/* Account Module */
angular.module('setuprestaurant', [])
    .config(['$routeProvider', function config($routeProvider) {
        

        $routeProvider
            
            .when('/setuprestaurant',
                {
                    templateUrl: 'modules/setuprestaurant/partials/setuprestaurant.html',
                    controller: 'setuprestaurantCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/setuprestaurant/controllers/setuprestaurant.js']
                            }]);
                        }]
                    }
                });

            // .when('/order/add',
            //     {
            //         templateUrl: 'modules/order/partials/order-add.html',
            //         controller: 'orderAddCtrl',
            //         resolve: {
            //             lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
            //                 return $ocLazyLoad.load([{
            //                     name: 'myApp',
            //                     files: ['modules/order/controllers/order-add.js']
            //                 }]);
            //             }]
            //         }
            //     })
                
            // .when('/order/edit/:ctmId',
            //     {
            //         templateUrl: 'modules/order/partials/order-edit.html',
            //         controller: 'orderEditCtrl',
            //         resolve: {
            //             lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
            //                 return $ocLazyLoad.load([{
            //                     name: 'myApp',
            //                     files: ['modules/order/controllers/order-edit.js']
            //                 }]);
            //             }]
            //         }
            //     });
                
        }]);