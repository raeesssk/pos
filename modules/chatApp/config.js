/*var express=require('express');
var socket=require('socket.io');
//app setup

var app=express();
var server = app.listen(3002,function() {
	console.log('listening to port 3002');
});

app.use(express.static("public"));

//socket setup
var io = socket(server);

io.on('connection', function(socket){
	console.log(socket.id);

	socket.on('chat', function(data){
		io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data);
	})
});*/

'use strict';
/* Account Module */
angular.module('chat', [])
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
            
            .when('/chat',
                {
                    templateUrl: 'modules/chatApp/partials/chat.html',
                    controller: 'chatCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/chatApp/controllers/chat.js']
                            }]);
                        }]
                    }
                })
       		}]);
