
angular.module('chat').service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:3000')
    });
}]).controller('chatCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {


//make connection


		var socket = io.connect('http://localhost:3000');



		//emit events
		$('#send').click(function() {
			socket.emit('chat', {
				message:$('#message').val(),
				handle:$('#handle').val()
			});
			$('#handle').val('');
			$('#message').val('');    
		});
		//message
		$("#message").keypress(function(){
			socket.emit('typing', $('#handle').val());

		});

		//listening for event

		socket.on('chat', function(data){
			$('#output').html('<p><strong>'+ data.handle +':</strong>' + data.message + '</p>');
		});

		socket.on('typing', function(data){
			$('#feedback').html('<p><em>' + data + ' is typing a message..</em></p>');

		});
});

/*app.controller('homeController', function($scope, localStorageService, SocketService) {

    $scope.array = [];
    $scope.message = {};
    SocketService.emit('room', { roomId: "temp" });

    $scope.add = function() {
        SocketService.emit('toBackEnd', {roomId:'temp', data: $scope.message, date: new Date() })
        $scope.array.push({ data: $scope.message, date: new Date() })
    }

    SocketService.on('message', function(msg) {
        $scope.array.push(msg)
    });

})*/