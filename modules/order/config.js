'use strict';
/* Account Module */
angular.module('order', [])
    .config(['$routeProvider', function config($routeProvider) {
        

        $routeProvider
            
            .when('/order',
                {
                    templateUrl: 'modules/order/partials/order-list.html',
                    controller: 'orderListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/order/controllers/order-list.js']
                            }]);
                        }]
                    }
                })

			.when('/order/add',
                {
                    templateUrl: 'modules/order/partials/order-add.html',
                    controller: 'orderAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/order/controllers/order-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/order/closed',
                {
                    templateUrl: 'modules/order/partials/order-close.html',
                    controller: 'ordercloseCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/order/controllers/order-close.js']
                            }]);
                        }]
                    }
                });
				
        }]);