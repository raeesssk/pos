// import admin
angular.module('operatingtime').controller('operatingtimeAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.apiURL = $rootScope.baseURL+'/operatingtime/add';
	$scope.operatingtime = {};
	$scope.operatingtime.sctm_username = $rootScope.userid;

	$scope.addOperatingTime = function () {
	    
	    if($('#sctm_pm_id').val() == undefined || $('#sctm_pm_id').val() == "" || $scope.operatingtime.sctm_pm_id.pm_id == undefined){
	    	toastr.error('please select dishes name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#sctm_type').val() == undefined || $('#sctm_type').val() == ""){
	    	toastr.error('please enter sub category name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else{
                $('#btnsave').attr('disabled','true');
            	$('#btnsave').text("please wait...");
	    	$http({
		      method: 'POST',
		      url: $scope.apiURL,
		      data: $scope.operatingtime,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(category)
		    {
                $('#btnsave').text("Save Sub Category");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/';  
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
                $('#btnsave').text("Save Sub Category");
                $('#btnsave').removeAttr('disabled');    
		    });
	    }
	     
	};

	// Time
	$("#otm_day_start_time").datetimepicker({
	  datepicker: false,
	  step: 30,
	  format:'H:i'
	});

	$("#otm_day_end_time").datetimepicker({
	  datepicker: false,
	  step: 30,
	  format:'H:i'
	});

	$("#otm_night_start_time").datetimepicker({
	  datepicker: false,
	  step: 30,
	  format:'H:i'
	});

	$("#otm_night_end_time").datetimepicker({
	  datepicker: false,
	  step: 30,
	  format:'H:i'
	});

});