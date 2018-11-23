/*
 * Reset Controller
 */
 //  angular.module('orientfurniture', []).controller('loginCtrl', function($scope, $http) {
function ResetCtrl($scope, $location, $http, $routeParams, $rootScope) {
    
	$scope.apiURL = 'http://localhost:3000';
	// $rootScope.baseURL = 'http://10.1.0.21:3000';
	// $scope.apiURL = 'http://unitech.3commastechnologies.com:3000';

	var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
    	}
	};
	var tech = getUrlParameter('token');

  	$scope.reset = {};
  
  	$scope.resetPassword = function() {
  		var passwordRegex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;

  		if($scope.reset.password == undefined || $scope.reset.password == ""){
  			toastr.error('Please Enter Your Password.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#password').focus();
  		}
  		else if(!passwordRegex.test($scope.reset.password)){
            toastr.error('Please Enter A Valid Password.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#password').focus();
		}
  		else if($scope.reset.conpassword == undefined || $scope.reset.conpassword == ""){
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
                // $scope.reset.password="";
                $scope.reset.conpassword=""; 
        }
  		else{
  			$('#resetPassword').attr('readonly','true'); 
		    $('#resetPassword').text('Please Wait..');
  			$http({
		      method: 'POST',
		      url: $scope.apiURL+'/emailsent/reset/'+tech,
		      data: $scope.reset,
		      headers: {'Content-Type': 'application/json'}
		    })
		    .success(function(login)
		    {
		    	if(login == 'Token not Found')
		    	{	
		    		toastr.error('Invalid Token or Token Expired', 'Error', {
				        closeButton: true,
				        progressBar: true,
					  	positionClass: "toast-top-center",
					  	timeOut: "1110",
					  	extendedTimeOut: "500",
				    });
				    window.location.href='forgot.html';
		    	}
		    	else
		    	{	
		    		toastr.success('Password Updated', 'Success', {
				        closeButton: true,
				        progressBar: true,
					  	positionClass: "toast-top-center",
					  	timeOut: "1110",
					  	extendedTimeOut: "500",
				    });
				    window.location.href='login.html';
	    		}
		    })
		    .error(function(data) 
		    {   
		    	toastr.error('Oops something went wrong', 'Error', {
			        closeButton: true,
			        progressBar: true,
				  	positionClass: "toast-top-center",
				  	timeOut: "1110",
				  	extendedTimeOut: "500",
			    });
                $('#resetPassword').text("Update Password");
                $('#resetPassword').removeAttr('disabled');
		    });
			
  		}
	};

	$scope.preventPaste= function() {
		$('#password').bind('cut copy paste', function (e) {
	        e.preventDefault();
		});
		$('#conpassword').bind('cut copy paste', function (e) {
	        e.preventDefault();
	    });
	}
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

}


