'use strict';
/* Account Module */
angular.module('report', [])
    .config(['$routeProvider', function config($routeProvider) {
        

        $routeProvider
            
            .when('/report',
                {
                    templateUrl: 'modules/reports/partials/salereport-list.html',
                    controller: 'reportListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/reports/controllers/salereport-list.js']
                            }]);
                        }]
                    }
                })
/*
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
                })*/;
				
        }]);