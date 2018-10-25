
angular.module('setuprestaurant').controller('setuprestaurantEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

	
	$scope.restaurantObj=JSON.parse(localStorage.getItem("pos_admin_restaurant"));
    $scope.apiURL = $rootScope.baseURL+'/restaurant/edit/'+$scope.restaurantObj.srm_id;
	
	$("#countries_states1").attr('data-country',$scope.restaurantObj.srm_country);
	$("#countries_states1").trigger('change');
	$("#srm_state").attr('data-country',"countries_states1");
	$("#srm_contact_number").attr('data-country','countries_states1');
 	$scope.setuprestaurant = {};
	
	$scope.setuprestaurant = $scope.restaurantObj;
	
	if ($scope.setuprestaurant.srm_isnight == 0) {
		$("#srm_night_start_time").hide();
		$("#srm_night_end_time").hide();	
		$("#srm_night_start_time").val('');
		$("#srm_night_end_time").val('');
	}
	else if ($scope.setuprestaurant.srm_isnight == 1) {
		$('#check_night').attr('checked', 'checked');
		// do in ng change 
		$("#srm_night_start_time").show();
  		$("#srm_night_end_time").show();
	}
	 	
	// Main register Function
  	$scope.updateSetupRestro = function () {
  		var alpharegex = /^[a-zA-Z ]*$/;
	    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($scope.setuprestaurant.srm_restaurant_name == undefined || $scope.setuprestaurant.srm_restaurant_name == ""){
  			toastr.error('Please Enter Restaurant Name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    console.log($scope.setuprestaurant.srm_isnight);
		    $('#srm_restaurant_name').focus();
  		}
  		else if(!alpharegex.test($scope.setuprestaurant.srm_restaurant_name)){
            toastr.error('Please Enter A Valid Name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_restaurant_name').focus();
		}
		// else if($scope.setuprestaurant.scm_country == undefined || $scope.setuprestaurant.scm_country  == ""){
	    // 	toastr.error("Please enter Corporate Country.", 'Error', {
		   //      closeButton: true,
		   //      progressBar: true,
			  // 	positionClass: "toast-top-center",
			  // 	timeOut: "500",
			  // 	extendedTimeOut: "500",
		   //  });
		   //  $('#countries_states1').focus();
	    // }
		else if($scope.setuprestaurant.srm_state == undefined || $scope.setuprestaurant.srm_state == ""){
	    	toastr.error("Please enter the State.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    // $('#scm_state').focus();
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
	    else if($scope.setuprestaurant.srm_pincode == undefined || $scope.setuprestaurant.srm_pincode == ""){
  			toastr.error('Please Enter Pincode.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_pincode').focus(); 
  		}
  		else if(!numRegex.test($scope.setuprestaurant.srm_pincode)){
            toastr.error('Please Enter A Valid Pincode.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_pincode').focus();
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
	    else if($scope.setuprestaurant.srm_currency == undefined || $scope.setuprestaurant.srm_currency == ""){
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
	    else if($scope.setuprestaurant.srm_email == undefined || $scope.setuprestaurant.srm_email == ""){
  			toastr.error('Please Enter Your Email.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_email').focus(); 
  		}
  		else if(!emailRegex.test($scope.setuprestaurant.srm_email)){
            toastr.error('Please Enter A Valid Email.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_email').focus();
		}
	    else if($('#srm_day_start_time').val() == undefined || $('#srm_day_start_time').val() == ""){
            toastr.error('Please Select Day Start Time.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_day_start_time').focus();
		}
	    else if($('#srm_day_end_time').val() == undefined || $('#srm_day_end_time').val() == ""){
            toastr.error('Please Select Day End Time.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_day_end_time').focus();
		}
		else if($scope.setuprestaurant.srm_isnight == 1 && ($('#srm_night_start_time').val() == undefined || $('#srm_night_start_time').val() == "")){
           	toastr.error("Please Select Night Start Time.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_night_start_time').focus();
		}
		else if($scope.setuprestaurant.srm_isnight == 1 && ($('#srm_night_end_time').val() == undefined || $('#srm_night_end_time').val() == "")){
           	toastr.error("Please Select Night Start Time.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#srm_night_end_time').focus();
		}  		
	    else{  
	    		// window.location = '#/setrestaurant';

	    		
                        var fd = new FormData();

			    		$scope.setuprestaurant.srm_country = $('#countries_states1').val();
			    		$scope.setuprestaurant.srm_state = $('#srm_state').val();
			    		$scope.setuprestaurant.srm_currency = $('#srm_currency').val();
                        
                        fd.append('srm_restaurant_name', $scope.setuprestaurant.srm_restaurant_name);
                        fd.append('srm_country', $scope.setuprestaurant.srm_country);
                        fd.append('srm_address', $scope.setuprestaurant.srm_address);
                        fd.append('srm_landmark', $scope.setuprestaurant.srm_landmark);
                        fd.append('srm_area', $scope.setuprestaurant.srm_area);
                        fd.append('srm_city', $scope.setuprestaurant.srm_city);
                        fd.append('srm_pincode', $scope.setuprestaurant.srm_pincode);
                        fd.append('srm_state', $scope.setuprestaurant.srm_state);
                        fd.append('srm_currency', $scope.setuprestaurant.srm_currency);
                        fd.append('srm_contact_name', $scope.setuprestaurant.srm_contact_name);
                        fd.append('srm_contact_number', $scope.setuprestaurant.srm_contact_number);
                        fd.append('srm_email', $scope.setuprestaurant.srm_email);
                        fd.append('srm_image', $scope.setuprestaurant.file);
                        fd.append('srm_day_start_time',$('#srm_day_start_time').val());
                        fd.append('srm_day_end_time',$('#srm_day_end_time').val());
                        fd.append('srm_night_start_time',$('#srm_night_start_time').val());
                        fd.append('srm_night_end_time',$('#srm_night_end_time').val());
                        fd.append('srm_isnight',$scope.setuprestaurant.srm_isnight);


                $('#btnsave').attr('disabled','true');
            	$('#btnsave').text("please wait..."); 
		    	$http({
			      method: 'POST',
			      url: $scope.apiURL,
			      data: fd,
			      transformRequest: angular.identity,
			      headers: {'Content-Type': undefined,
		                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
			    })
			    .success(function(category)
			    {	
			    	localStorage.setItem('pos_admin_restaurant', JSON.stringify(category[0]));
			    	toastr.success('Details Updated.', 'Success', {
				        closeButton: true,
				        progressBar: true,
					  	positionClass: "toast-top-center",
					  	timeOut: "500",
					  	extendedTimeOut: "500",
					});
					
	                $('#btnsave').text("Update");
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
	                $('#btnsave').text("Update");
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

              $scope.setuprestaurant.file = input.files[0];
          reader.onload = function (e) {
              $('#blah').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);

      }
  }
  $("#srm_image").change(function(){
      readURL(this);
  });

// Time
	$("#srm_day_start_time").datetimepicker({
	  datepicker: false,
	  step: 15,
	  format:'H:i'
	});

	$("#srm_day_end_time").datetimepicker({
	  datepicker: false,
	  step: 15,
	  format:'H:i'
	});

	$("#srm_night_start_time").datetimepicker({
	  datepicker: false,
	  step: 15,
	  format:'H:i'
	});

	$("#srm_night_end_time").datetimepicker({
	  datepicker: false,
	  step: 15,
	  format:'H:i'
	});

	// Operating time for night
	$("#check_night").change(function() {
	     var is_checked = $(this).is(":checked");
	     if(!is_checked) {
	     	$scope.setuprestaurant.srm_isnight = 0;
			$("#srm_night_start_time").hide();
  			$("#srm_night_end_time").hide();	
  			$("#srm_night_start_time").val('');
  			$("#srm_night_end_time").val('');	      
	     }
	     else{
	     	$scope.setuprestaurant.srm_isnight = 1;
			$("#srm_night_start_time").show();
  			$("#srm_night_end_time").show();
	     }
    });
	// END Operating time for night


});
