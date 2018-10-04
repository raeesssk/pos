/*
 * Login Controller
 */
 //  angular.module('orientfurniture', []).controller('loginCtrl', function($scope, $http) {
function SignupCtrl($scope, $location, $http, $routeParams, $rootScope) {
    
	// $scope.apiURL = 'http://localhost:3000';
	$scope.apiURL = 'http://unitech.3commastechnologies.com:3000';
	
  $scope.limit={};
function onSuccess(googleUser) {
              console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
            }
            function onFailure(error) {
              console.log(error);
            }
            function renderButton() {
              gapi.signin2.render('my-signin2', {
                'scope': 'profile email',
                'width': 240,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': onSuccess,
                'onfailure': onFailure
              });
            }


 // Main register Function
  	$scope.signup = function() {
  		var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;
		var passwordRegex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;


  		if($scope.limit.email == undefined || $scope.limit.email == ""){
  			toastr.error('Please Enter Your Email.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#email').focus(); 
  		}
  		else if(!emailRegex.test($scope.limit.email)){
            toastr.error('Please Enter A Valid Email.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#email').focus();
		}
  		else if($scope.limit.password == undefined || $scope.limit.password == ""){
  			toastr.error('Please Enter Your Password.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#password').focus();
  		}
  		else if(!passwordRegex.test($scope.limit.password)){
            toastr.error('Please Enter A Valid Password.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#password').focus();
		}
  		else if($scope.limit.conpassword == undefined || $scope.limit.conpassword == ""){
  			toastr.error('Please Enter Confirm Password.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#conpassword').focus();
  		}
  		else if($('#password').val() != $('#conpassword').val()){
            toastr.error('Password Entered Does Not Match.. Please Try Again', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "1110",
			  	extendedTimeOut: "500",
		    });
		    $('#password').focus(); 
                $scope.password="";
                $scope.conpassword=""; 
        }
  		else{
                $('#signup').attr('disabled','true');
                $('#signup').text("please wait...");
               console.log($scope.limit);
                $http({
				    method: 'POST',
				   	url: $scope.apiURL+'/signup',
			        data:$scope.limit,
				      headers: {'Content-Type': 'application/json'}
			    })
			    .success(function(product)
			    {
			      	toastr.success('Hoola, Account Created!', 'Success', {
			              closeButton: true,
			              progressBar: true,
			            positionClass: "toast-top-center",
			            timeOut: "500",
			            extendedTimeOut: "500",
			        });
		            $http({
				          method: 'POST',
				          url: $scope.apiURL+"/oauth/token",
				          data: 'grant_type=password&username='+ encodeURIComponent($scope.limit.email) +'&password='+ encodeURIComponent($scope.limit.conpassword),
				          headers: {'Content-Type': 'application/x-www-form-urlencoded',
			                    'Authorization' : 'Basic Y2xpZW50S2V5OmNsaWVudFNlY3JldEtleQ=='}
					 })
				  	 .success(function(data, status, headers, config)
				  	 {
				  	 	

					        $http({
					          method: 'POST',
					          url: $scope.apiURL+'/login/isonline',
					          data: 'username='+$scope.limit.email,
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
		                $('#signup').text("Register");
		                $('#signup').removeAttr('disabled');
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
				                $('#signup').text("Register");
				                $('#signup').removeAttr('disabled');
					        });

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
		                $('#signup').text("Register");
		                $('#signup').removeAttr('disabled');
				     });
			    })
			    .error(function(data) 
			    {   
		            $scope.loading1 = 1;
			      	toastr.error('Oops, Something Went Wrong.', 'Error', {
			              closeButton: true,
			              progressBar: true,
			            positionClass: "toast-top-center",
			            timeOut: "500",
			            extendedTimeOut: "500",
			        });              
			    });
  		}
	}
// End Main register Function


	// $scope.signuptemp = function (){
	// 	window.location ='/setup-corporate';
	// 	// window.location = "/pos/";
	// };

	// $scope.login = function(){
	// 	window.location = 'login.html';
	// };
	
// Eye open to see password
	$scope.viewpassowrd = function() {
	    var x = document.getElementById("password");
	    if (x.type === "password") {
	        x.type = "text";
	        ;
	    } else {
	        x.type = "password";
	    }
	};
	$scope.viewconpassowrd = function() {
	    var x = document.getElementById("conpassword");
	    if (x.type === "password") {
	        x.type = "text";
	        ;
	    } else {
	        x.type = "password";
	    }
	};
	$(document).ready(function () {
        $('i').click(function () {
            $(this).toggleClass('fa-eye fa-eye-slash');
        });
    });
//END  Eye open to see password





};


