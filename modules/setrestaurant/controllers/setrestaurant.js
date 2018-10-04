
angular.module('setrestaurant').controller('restaurantCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {
   
   	$('#navbar_hide').hide();
	$('#sidebar_hide').hide();

  	$('#srm_restaurant_name').focus();
  	$scope.addSetupRest = function () {
	    
	    if($('#srm_restaurant_name').val() == undefined || $('#srm_restaurant_name').val() == ""){
	    	toastr.error("Please enter Restaurant Name.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_restaurant_name').focus();
	    }
	    else if($('#srm_restaurant_location').val() == undefined || $('#srm_restaurant_location').val() == ""){
	    	toastr.error("Please enter Restaurant Location.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_restaurant_location').focus();
	    }
	    else if($('#srm_address').val() == undefined || $('#srm_address').val() == ""){
	    	toastr.error("Please enter Address.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_address').focus();
	    }
	    else if($('#srm_landmark').val() == undefined || $('#srm_landmark').val() == ""){
	    	toastr.error("Please enter Landmark.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_landmark').focus();
	    }
	    else if($('#srm_area').val() == undefined || $('#srm_area').val() == ""){
	    	toastr.error("Please enter the Area.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_area').focus();
	    }
	    else if($('#srm_city').val() == undefined || $('#srm_city').val() == ""){
	    	toastr.error("Please enter the City.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_city').focus();
	    }
	    else if($('#srm_pincode').val() == undefined || $('#srm_pincode').val() == ""){
	    	toastr.error("Please enter Pincode.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_pincode').focus();
	    }
	    else if($('#srm_state').val() == undefined || $('#srm_state').val() == ""){
	    	toastr.error("Please enter the State.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_state').focus();
	    }
	    else if($('#srm_currency').val() == undefined || $('#srm_currency').val() == ""){
	    	toastr.error("Please enter Currency.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_currency').focus();
	    }
	    else if($('#srm_contact_name').val() == undefined || $('#srm_contact_name').val() == ""){
	    	toastr.error("Please enter Contact Name.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_contact_name').focus();
	    }
	    else if($('#srm_contact_number').val() == undefined || $('#srm_contact_number').val() == ""){
	    	toastr.error("Please enter Contact Number.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_contact_number').focus();
	    }
	    else if($('#srm_email').val() == undefined || $('#srm_email').val() == ""){
	    	toastr.error("Please enter Email.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_email').focus();
	    }
	    else{
	    	
                $('#btnsave').attr('disabled','true');
            	$('#btnsave').text("please wait...");
	    	$http({
		      method: 'POST',
		      url: $scope.apiURL,
		      data: $scope.dealer,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(category)
		    {
                $('#btnsave').text("Save & Next");
                $('#btnsave').removeAttr('disabled');
		       	window.location ='login.html';  
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
                $('#btnsave').text("Save & Next");
                $('#btnsave').removeAttr('disabled');    
		    });
	    }
	     
	};
// End Main register Function




});


