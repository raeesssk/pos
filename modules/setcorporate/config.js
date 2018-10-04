'use strict';
/* Account Module */
angular.module('setcorporate', [])
    .config(['$routeProvider', function config($routeProvider) {
        

        $routeProvider
            
            .when('/setcorporate',
                {
                    templateUrl: 'modules/setcorporate/partials/setcorporate.html',
                    controller: 'corporateCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/setcorporate/controllers/setcorporate.js']
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