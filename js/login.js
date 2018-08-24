/*
 * Login Controller
 */
 //  angular.module('orientfurniture', []).controller('loginCtrl', function($scope, $http) {
function LoginCtrl($scope, $location, $http, $routeParams, $rootScope) {
    
	// $scope.apiURL = 'http://10.1.0.21:3000';
	// $rootScope.baseURL = 'http://10.1.0.21:3000';
	$scope.apiURL = 'http://unitech.3commastechnologies.com:3000';
	// if(localStorage.getItem("pos_admin_access_token") != null)
 //      {
 //          window.location = '/greenair/';
 //      }

  // $scope.loginmaster = {};
  $("#password").hide();
  $("#back").hide();


  	$scope.login = function() {
  		
  		if($scope.loginmaster.username == undefined || $scope.loginmaster.username == ""){
  			toastr.error('Please Enter Your Email.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
  		}
  		// else if($scope.password == undefined || $scope.password == ""){
  		// 	toastr.error('please enter password.', 'Error', {
		  //       closeButton: true,
		  //       progressBar: true,
			 //  	positionClass: "toast-top-center",
			 //  	timeOut: "500",
			 //  	extendedTimeOut: "500",
		  //   });
  		// }
  		if ($("#login").text() == 'Next'){
  			console.log($scope.loginmaster);
  			$http({
                    method: 'POST',
                    url: $scope.apiURL+'/login/check',
                    data: $scope.loginmaster,
                    headers: {'Content-Type': 'application/json'}
                  })
                  .success(function(category)
                  {
                     
			        if(category.length > 0 && (category[0].username == $scope.loginmaster.username)){


			        $('#username').attr('readonly','true'); 
			        $('#login').text('Login');
			        $('#password').show();
			        $('#back').show();
			        }
			        else{

			        }
                  })
                  .error(function(data) 
                  {   
                    // var dialog = bootbox.dialog({
                    //   message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    //       closeButton: false
                    //   });
                    //   setTimeout(function(){
                    //   $('#btnsave').html("SAVE");
                    //   $('#btnsave').removeAttr('disabled');
                    //       // dialog.modal('hide'); 
                    //   }, 1500);            
                  });
  			// $http({
			  //       method: 'POST',
			  //       url: $scope.apiURL+'/login/check',
			  //       data: $scope.login,
			  //       headers: {'Content-Type': 'application/json'}
			  //     })
			  //     .success(function(category)
			  //     {
			  //       if(category.length > 0 && (category[0].username == $scope.login.username)){


			  //       $('#username').attr('readonly','true'); 
			  //       $('#login').text('Login');
			  //       $('#password').show();
			  //       $('#back').show();
			  //       }
			  //       else{

			  //       }
			  //     })
			  //     .error(function(data) 
			  //     {   
			          
			  //  });
  		}
  		if ($("#login").text() == 'Login') {
                $('#login').attr('disabled','true');
                $('#login').text("wait...");
  			$http({
		          method: 'POST',
		          url: $scope.apiURL+"/oauth/token",
		          data: 'grant_type=password&username='+ encodeURIComponent($scope.loginmaster.username) +'&password='+ encodeURIComponent($scope.loginmaster.password),
		          headers: {'Content-Type': 'application/x-www-form-urlencoded',
	                    'Authorization' : 'Basic Y2xpZW50S2V5OmNsaWVudFNlY3JldEtleQ=='}
			 })
		  	 .success(function(data, status, headers, config)
		  	 {
		  	 	if($scope.loginmaster.username == 'admin'){

			        $http({
			          method: 'POST',
			          url: $scope.apiURL+'/login/isonline',
			          data: 'username='+$scope.loginmaster.username,
			          headers: {'Content-Type': 'application/x-www-form-urlencoded',
	                  'Authorization' :'Bearer '+data.access_token}
			        })
			        .success(function(deliverycount)
			        {	
			        	$scope.user = deliverycount[0].username;
			        	$scope.firstname = deliverycount[0].first_name;
			        	$scope.iconimage = deliverycount[0].icon_image;
				  	 	localStorage.setItem('pos_admin_username', $scope.user);
				  	 	localStorage.setItem('pos_admin_firstname', $scope.firstname);
				  	 	localStorage.setItem('pos_admin_iconimage', $scope.iconimage);
				  	 	localStorage.setItem('pos_admin_access_token', data.access_token);
				        localStorage.setItem('pos_admin_expires_in', data.expires_in);
				        localStorage.setItem('pos_admin_refresh_token', data.refresh_token);
				        localStorage.setItem('pos_admin_token_type', data.token_type);
                $('#login').text("Login");
                $('#login').removeAttr('disabled');
				         window.location = "/pos/";
			        })
			        .error(function(data) 
			        {   
			            toastr.error('Oops, Something Went Wrong.', 'Error', {
			              closeButton: true,
			              progressBar: true,
			              positionClass: "toast-top-center",
			              timeOut: "500",
			              extendedTimeOut: "500",
			            });
		                $('#login').text("Login");
		                $('#login').removeAttr('disabled');
			        });

		  	 		
		  	 	}
		  	 	else{
			  	 	$scope.username = undefined;
		  	 		$scope.password = undefined;
		  	 		localStorage.removeItem('pos_admin_access_token');
			        localStorage.removeItem('pos_admin_expires_in');
			        localStorage.removeItem('pos_admin_refresh_token');
			        localStorage.removeItem('pos_admin_token_type');
			  	 	localStorage.removeItem('pos_admin_username');
			  	 	localStorage.removeItem('pos_admin_firstname');
			  	 	localStorage.removeItem('pos_admin_iconimage');
			        localStorage.clear();
			        var dialog = bootbox.dialog({
		            message: '<p class="text-center">You Are Not Right User To Login!</p>',
		                closeButton: false
		            });
		            setTimeout(function(){
                $('#login').text("Login");
                $('#login').removeAttr('disabled');
		                dialog.modal('hide'); 
		            }, 2000); 
		  	 	}
		  	 })
		  	 .error(function(data, status, headers, config)
		  	 {
		  	 	toastr.error('Invalid Username or Password.', 'Error', {
	              closeButton: true,
	              progressBar: true,
	              positionClass: "toast-top-center",
	              timeOut: "500",
	              extendedTimeOut: "500",
	            });
                $('#login').text("Login");
                $('#login').removeAttr('disabled');
		     });
  		}
	}

	$scope.back = function () {
      $('#username').removeAttr('readonly','true'); 
        $('#login').text('Next');
        $('#password').hide();
        $('#back').hide();
  };

	$scope.signup = function(){
		window.location = 'signup.html';
	};

}


