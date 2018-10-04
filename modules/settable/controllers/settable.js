// import admin
angular.module('settable').controller('settableCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	// $scope.apiURL = $rootScope.baseURL+'/table/add';
	// $scope.areaList = [];
	// $scope.table = {};
	// $scope.table.tm_username = $rootScope.userid;

	$('#navbar_hide').hide();
	$('#sidebar_hide').hide();
	$('#stm_am_id').focus();

	$scope.getAreaList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/area',
	      //data: $scope.data,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(areaList)
	    {
	    	$scope.areaList = angular.copy(areaList);
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
	    });
	};
    $scope.getAreaList();

	
  	$scope.addTable = function () {
	    
	    if($('#stm_am_id').val() == undefined || $('#stm_am_id').val() == "" || $scope.table.stm_am_id.sam_id == undefined){
	    	toastr.error('Please Select Table Area Name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#stm_am_id').focus();
	    }
	    else if($('#stm_description').val() === undefined || $('#stm_description').val() === ""){
	    	toastr.error('Please Select Table Area Name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#stm_description').focus();
	    } 
	    else if($('#stm_size').val() == undefined || $('#stm_size').val() == ""){
	    	toastr.error('Please Select Table Area Name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#stm_size').focus();
	    }
	    else{
                $('#btnsave').attr('disabled','true');
            	$('#btnsave').text("please wait...");
	    	$http({
		      method: 'POST',
		      url: $scope.apiURL,
		      data: $scope.table,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(table)
		    {
                $('#btnsave').text("Save Tables");
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
                $('#btnsave').text("Save Tables");
                $('#btnsave').removeAttr('disabled');
		    });
	    }
	     
	};

});