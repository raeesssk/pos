'use strict';
/* Account Module */
angular.module('setrestaurant', [])
    .config(['$routeProvider', function config($routeProvider) {
        

        $routeProvider
            
            .when('/setrestaurant',
                {
                    templateUrl: 'modules/setrestaurant/partials/setrestaurant.html',
                    controller: 'restaurantCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/setrestaurant/controllers/setrestaurant.js']
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