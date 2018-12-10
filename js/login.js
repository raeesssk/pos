/*
 * Login Controller
 */
 //  angular.module('orientfurniture', []).controller('loginCtrl', function($scope, $http) {
function LoginCtrl($scope, $location, $http, $routeParams, $rootScope) {
    
	// $rootScope.baseURL = 'http://localhost:3000';
	// $rootScope.baseURL = 'http://10.1.0.32:3000';
	$rootScope.baseURL = 'http://pos.restromaticz.com:3000';
	// if(localStorage.getItem("pos_admin_access_token") != null)
 //      {
 //          window.location = '/greenair/';
 //      }

  // $scope.loginmaster = {};
  $("#password").hide();
  $("#back").hide();


  	$scope.login = function() {
  		
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		if($scope.loginmaster.username == undefined || $scope.loginmaster.username == ""){
  			toastr.error('Please Enter Your Email.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
  		}
  		else if(!emailRegex.test($scope.loginmaster.username)){
      
		    var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter a valid email..</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#username').focus();
            }, 1500); 
		}
  		if ($("#login").text() == 'Next'){
  			$http({
                    method: 'POST',
                    url: $rootScope.baseURL+'/login/check',
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
		        		toastr.error('Please Enter Correct Email.', 'Error', {
					        closeButton: true,
					        progressBar: true,
						  	positionClass: "toast-top-center",
						  	timeOut: "500",
						  	extendedTimeOut: "500",
						});  	
						$('#btnsave').html("SAVE");
	                    $('#btnsave').removeAttr('disabled');
	                    // setTimeout(function(){
	                    
	                    //     dialog.modal('hide'); 
	                    // }, 1500);
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
  		if ($("#login").text() == 'Login')
	 	{
                $('#login').attr('disabled','true');
                $('#login').text("wait...");
  			$http({
		          method: 'POST',
		          url: $rootScope.baseURL+"/oauth/token",
		          data: 'grant_type=password&username='+ encodeURIComponent($scope.loginmaster.username) +'&password='+ encodeURIComponent($scope.loginmaster.password),
		          headers: {'Content-Type': 'application/x-www-form-urlencoded',
	                    'Authorization' : 'Basic Y2xpZW50S2V5OmNsaWVudFNlY3JldEtleQ=='}
			 })
		  	 .success(function(data, status, headers, config)
		  	 {
		  	 	

			        $http({
			          method: 'POST',
			          url: $rootScope.baseURL+'/login/isonline',
			          data: 'username='+$scope.loginmaster.username,
			          headers: {'Content-Type': 'application/x-www-form-urlencoded',
	                  'Authorization' :'Bearer '+data.access_token}
			        })
			        .success(function(deliverycount)
			        {	
			        	console.log(deliverycount);
			        	$scope.role_id = deliverycount[0].user_rm_id;
			        	$scope.user = deliverycount[0].username;
			        	$scope.firstname = deliverycount[0].first_name;
			        	$scope.iconimage = deliverycount[0].icon_image;
			        	$scope.uid = deliverycount[0].id;
					    $scope.srm_id = deliverycount[0].user_srm_id;     
				  	 	localStorage.setItem('pos_admin_srm_id', $scope.srm_id);  
				  	 	localStorage.setItem('pos_admin_username', $scope.user);
				  	 	localStorage.setItem('pos_admin_firstname', $scope.firstname);
				  	 	localStorage.setItem('pos_admin_iconimage', $scope.iconimage);				  	 	
				  	 	localStorage.setItem('pos_admin_uid', $scope.uid);
				  	 	localStorage.setItem('pos_admin_access_token', data.access_token);
				        localStorage.setItem('pos_admin_expires_in', data.expires_in);
				        localStorage.setItem('pos_admin_refresh_token', data.refresh_token);
				        localStorage.setItem('pos_admin_token_type', data.token_type);
			        	localStorage.setItem('rm_id',$scope.role_id);
			        		if(deliverycount[0].user_srm_id != null || deliverycount[0].user_srm_id != undefined)
			        		{
					        	window.location = "/";           
			        		}
				            else 
				            {
				            	window.location = "#/setuprestaurant";
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
};
	$scope.back = function () {
      $('#username').removeAttr('readonly','true'); 
        $('#login').text('Next');
        $('#password').hide();
        $('#back').hide();
  };

	
}


