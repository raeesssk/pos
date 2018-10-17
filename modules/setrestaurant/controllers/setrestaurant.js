
angular.module('setrestaurant').controller('restaurantCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {
   
   	$('#navbar_hide').hide();
	$('#sidebar_hide').hide();

	$("#countries_states1").attr('data-country','IN');
	$("#srm_state").attr('data-country','countries_states1');
	$("#srm_contact_number").attr('data-country','countries_states1');
  	// $('#srm_restaurant_name').focus();
  	
  	$scope.restaurant={};
	// $("#my-drop-down-select-element-id").find("option").eq(0).remove();
	// $(document).ready(function() {
	//     $("#countries_states1").find("option").eq(0).remove();
	// });


	$scope.getCorpDetails = function () {
		if($scope.restaurant.select)
		{	

		console.log($rootScope.corporateObj.scm_currency);
			
			$scope.restaurant.srm_restaurant_name=$rootScope.corporateObj.scm_corp_name;

			// $scope.restaurant.srm_country=$rootScope.corporateObj.scm_country;
			$("#countries_states1").attr('data-country',$rootScope.corporateObj.scm_country);
			$("#countries_states1").val($rootScope.corporateObj.scm_country);

			 $("#countries_states1").trigger('change');
				$("#srm_state").attr('data-country',"countries_states1");
				$("#srm_contact_number").attr('data-country','countries_states1');
			
			console.log($rootScope.corporateObj.scm_contact_number);
			$scope.restaurant.srm_address=$rootScope.corporateObj.scm_address;
			$scope.restaurant.srm_landmark=$rootScope.corporateObj.scm_landmark;
			$scope.restaurant.srm_area=$rootScope.corporateObj.scm_area;
			$scope.restaurant.srm_city=$rootScope.corporateObj.scm_city;
			$scope.restaurant.srm_pincode=$rootScope.corporateObj.scm_pincode;

			// $scope.restaurant.srm_state=$rootScope.corporateObj.scm_state;
			// $("#srm_state").removeAttr('data-country');
			// $("#srm_state").attr('data-country',$rootScope.corporateObj.scm_country);
			$("#srm_state").val($rootScope.corporateObj.scm_state);

			// $scope.restaurant.srm_currency=$rootScope.corporateObj.scm_currency;
			$("#srm_currency").val($rootScope.corporateObj.scm_currency);
			// $scope.restaurant.srm_currency=$rootScope.corporateObj.scm_currency;

			$scope.restaurant.srm_contact_name=$rootScope.corporateObj.scm_contact_name;

			$scope.restaurant.srm_contact_number=$rootScope.corporateObj.scm_contact_no;
			// $scope.restaurant.srm_contact_number=$rootScope.corporateObj.scm_contact_number;

			$scope.restaurant.srm_email=$rootScope.corporateObj.scm_email;

			console.log($scope.restaurant);
		}
		else
		{
			
	$("#countries_states1").attr('data-country','IN');	
	$("#countries_states1").val('IN');
	 $("#countries_states1").trigger('change');
	$("#srm_state").attr('data-country','countries_states1');
			$scope.restaurant='';
	$("#srm_contact_number").attr('data-country','countries_states1');
	$("#srm_currency").val('');
		}
	};

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
	    // else if($('#srm_restaurant_location').val() == undefined || $('#srm_restaurant_location').val() == ""){
	    // 	toastr.error("Please enter Restaurant Location.", 'Error', {
		   //      closeButton: true,
		   //      progressBar: true,
			  // 	positionClass: "toast-top-center",
			  // 	timeOut: "500",
			  // 	extendedTimeOut: "500",
		   //  });
		   //  $('#srm_restaurant_location').focus();
	    // }
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
	    // else if($scope.restaurant.srm_state == undefined || $scope.restaurant.srm_state == ""){
	    else if($('#srm_state').val() == undefined || $('#srm_state').val() == ""){
	    	toastr.error("Please enter the State.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    // $('#scm_state').focus();
	    }
	    // else if($scope.restaurant.srm_currency == undefined || $scope.restaurant.srm_currency == ""){
	    else if($('#srm_currency').val() == undefined || $('#srm_currency').val() == ""){
	    	toastr.error("Please enter Currency.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    // $('#scm_currency').focus();
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
	    		$scope.restaurant.srm_scm_id = $rootScope.corporateObj.scm_id;
	    		$scope.restaurant.srm_country = $rootScope.corporateObj.scm_country;
	    		$scope.restaurant.srm_state = $rootScope.corporateObj.scm_state;
	    		$scope.restaurant.srm_currency = $rootScope.corporateObj.scm_currency;

                $('#btnsave').attr('disabled','true');
            	$('#btnsave').text("please wait..."); 
		    	$http({
			      method: 'POST',
			      url: $rootScope.baseURL+'/restaurant/add',
			      data: $scope.restaurant,
			      // transformRequest: angular.identity,
			      headers: {'Content-Type': 'application/json',
		                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
			    })
			    .success(function(category)
			    {
			    	$rootScope.restaurantObj = category[0];
	                $('#btnsave').text("Save & Next");
	                $('#btnsave').removeAttr('disabled');
			       	window.location = '#/';  
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


