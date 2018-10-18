
angular.module('setcorporate').controller('corporateCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

	$('#navbar_hide').hide();
	$('#sidebar_hide').hide();
	 // Main register Function
	$('#scm_corp_name').focus();
	 // console.log($rootScope.uid);
 	$scope.setCorp = {};

  	$scope.addSetupCorp = function () {
  		var alpharegex = /^[a-zA-Z ]*$/;
	    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.setCorp.scm_corp_name == undefined || $scope.setCorp.scm_corp_name == ""){
  			toastr.error('Please Enter Corporate Name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_corp_name').focus(); 
  		}
  		else if(!alpharegex.test($scope.setCorp.scm_corp_name)){
            toastr.error('Please Enter A Valid Name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_corp_name').focus();
		}
	    // else if($scope.setCorp.scm_country == undefined || $scope.setCorp.scm_country  == ""){
	    // 	toastr.error("Please enter Corporate Country.", 'Error', {
		   //      closeButton: true,
		   //      progressBar: true,
			  // 	positionClass: "toast-top-center",
			  // 	timeOut: "500",
			  // 	extendedTimeOut: "500",
		   //  });
		   //  $('#countries_states1').focus();
	    // }
	    else if($('#scm_address').val() == undefined || $('#scm_address').val() == ""){
	    	toastr.error("Please enter Address.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_address').focus();
	    }
	    else if($('#scm_landmark').val() == undefined || $('#scm_landmark').val() == ""){
	    	toastr.error("Please enter Landmark.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_landmark').focus();
	    }
	    else if($('#scm_area').val() == undefined || $('#scm_area').val() == ""){
	    	toastr.error("Please enter the Area.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_area').focus();
	    }
	    else if($('#scm_city').val() == undefined || $('#scm_city').val() == ""){
	    	toastr.error("Please enter the City.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_city').focus();
	    }
	    else if($scope.setCorp.scm_pincode == undefined || $scope.setCorp.scm_pincode == ""){
  			toastr.error('Please Enter Pincode.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_pincode').focus(); 
  		}
  		else if(!numRegex.test($scope.setCorp.scm_pincode)){
            toastr.error('Please Enter A Valid Pincode.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_pincode').focus();
		}
	    else if($scope.setCorp.scm_state == undefined || $scope.setCorp.scm_state == ""){
	    	toastr.error("Please enter the State.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    // $('#scm_state').focus();
	    }
	    else if($scope.setCorp.scm_currency == undefined || $scope.setCorp.scm_currency == ""){
	    	toastr.error("Please enter Currency.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    // $('#scm_currency').focus();
	    }
	    else if($('#scm_contact_name').val() == undefined || $('#scm_contact_name').val() == ""){
	    	toastr.error("Please enter Contact Name.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_contact_name').focus();
	    }
	    else if($('#scm_contact_no').val() == undefined || $('#scm_contact_no').val() == ""){
	    	toastr.error("Please enter Contact Number.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_contact_no').focus();
	    }
	    else if($scope.setCorp.scm_email == undefined || $scope.setCorp.scm_email == ""){
  			toastr.error('Please Enter Your Email.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_email').focus(); 
  		}
  		else if(!emailRegex.test($scope.setCorp.scm_email)){
            toastr.error('Please Enter A Valid Email.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_email').focus();
		}
	    else{  
	    		// window.location = '#/setrestaurant';

	    		$scope.setCorp.scm_country = $('#countries_states1').val();
                        var fd = new FormData();
                        
                        fd.append('scm_corp_name', $scope.setCorp.scm_corp_name);
                        fd.append('scm_country', $scope.setCorp.scm_country);
                        fd.append('scm_address', $scope.setCorp.scm_address);
                        fd.append('scm_landmark', $scope.setCorp.scm_landmark);
                        fd.append('scm_area', $scope.setCorp.scm_area);
                        fd.append('scm_city', $scope.setCorp.scm_city);
                        fd.append('scm_pincode', $scope.setCorp.scm_pincode);
                        fd.append('scm_state', $scope.setCorp.scm_state);
                        fd.append('scm_currency', $scope.setCorp.scm_currency);
                        fd.append('scm_contact_name', $scope.setCorp.scm_contact_name);
                        fd.append('scm_contact_no', $scope.setCorp.scm_contact_no);
                        fd.append('scm_email', $scope.setCorp.scm_email);
                        fd.append('scm_image', $scope.setCorp.file);
                        fd.append('scm_user_id', $rootScope.uid);

                $('#btnsave').attr('disabled','true');
            	$('#btnsave').text("please wait..."); 
		    	$http({
			      method: 'POST',
			      url: $rootScope.baseURL+'/corporate/add',
			      data: fd,
			      transformRequest: angular.identity,
			      headers: {'Content-Type': undefined,
		                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
			    })
			    .success(function(category)
			    {	
			    	toastr.success('WelCome!.', 'Success', {
				        closeButton: true,
				        progressBar: true,
					  	positionClass: "toast-top-center",
					  	timeOut: "500",
					  	extendedTimeOut: "500",
					});
			    	$rootScope.corporateObj = category[0];
	                $('#btnsave').text("Save");
	                $('#btnsave').removeAttr('disabled');
			       	window.location = "#/";  
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
	                $('#btnsave').text("Save");
	                $('#btnsave').removeAttr('disabled');    
			    });
	    }
	     
	};
// End Main  Function

// Image
$scope.displayImage = "resources/default-image.png";
  function readURL(input) {
    if (input.files && input.files[0]) {
          var reader = new FileReader();

              $scope.setCorp.file = input.files[0];
          reader.onload = function (e) {
              $('#blah').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);

      }
  }

  $("#scm_image").change(function(){
      readURL(this);
  });



});

