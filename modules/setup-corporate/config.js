'use strict';
/* Account Module */
angular.module('setup-corporate', [])
    .config(['$routeProvider', function config($routeProvider) {
        

        $routeProvider
            
            .when('/setup-corporate',
                {
                    templateUrl: 'modules/setup-corporate/partials/setup-corporate.html',
                    controller: 'setup-corporateAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/setup-corporate/controllers/setup-corporate-list.js']
                            }]);
                        }]
                    }
                })

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