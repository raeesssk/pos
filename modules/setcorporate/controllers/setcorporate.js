
angular.module('setcorporate').controller('corporateCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

	$('#navbar_hide').hide();
	$('#sidebar_hide').hide();
 // Main register Function
 $('#scm_corp_name').focus();
  	$scope.addSetupCorp = function () {
	    
	    if($('#scm_corp_name').val() == undefined || $('#scm_corp_name').val() == ""){
	    	toastr.error("Please enter Corporate Name.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_corp_name').focus();
	    }
	    else if($('#scm_corp_location').val() == undefined || $('#scm_corp_location').val() == ""){
	    	toastr.error("Please enter Corporate Location.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_corp_location').focus();
	    }
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
	    else if($('#scm_pincode').val() == undefined || $('#scm_pincode').val() == ""){
	    	toastr.error("Please enter Pincode.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_pincode').focus();
	    }
	    else if($('#scm_state').val() == undefined || $('#scm_state').val() == ""){
	    	toastr.error("Please enter the State.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_state').focus();
	    }
	    else if($('#scm_currency').val() == undefined || $('#scm_currency').val() == ""){
	    	toastr.error("Please enter Currency.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_currency').focus();
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
	    else if($('#scm_email').val() == undefined || $('#scm_email').val() == ""){
	    	toastr.error("Please enter Email.", 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#scm_email').focus();
	    }
	    else{  
	    		window.location = '#/setrestaurant';


      //           $('#btnsave').attr('disabled','true');
      //       	$('#btnsave').text("please wait...");
	    	// $http({
		    //   method: 'POST',
		    //   url: $scope.apiURL,
		    //   data: $scope.dealer,
		    //   headers: {'Content-Type': 'application/json',
	     //              'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    // })
		    // .success(function(category)
		    // {
      //           $('#btnsave').text("Save & Next");
      //           $('#btnsave').removeAttr('disabled');
		    //    	   window.location = '#/setrestaurant';  
		    // }) 	
		    // .error(function(data) 
		    // {   
		    // 	toastr.error('Oops, Something Went Wrong.', 'Error', {
			   //      closeButton: true,
			   //      progressBar: true,
				  // 	positionClass: "toast-top-center",
				  // 	timeOut: "500",
				  // 	extendedTimeOut: "500",
			   //  });      
      //           $('#btnsave').text("Save & Next");
      //           $('#btnsave').removeAttr('disabled');    
		    // });
	    }
	     
	};
// End Main  Function




});

