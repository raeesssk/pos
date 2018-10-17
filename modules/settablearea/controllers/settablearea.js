// import admin
angular.module('settablearea').controller('settableareaCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	// $scope.apiURL = $rootScope.baseURL+'/settablearea/add';
	// $scope.area = {};
	// $scope.area.am_username = $rootScope.userid;
	
	$('#navbar_hide').hide();
	$('#sidebar_hide').hide();
	$scope.settablearea = {};
	$('#am_name').focus();
  	$scope.addArea = function () {
	    
	    if($('#am_name').val() == undefined || $('#am_name').val() == ""){
	    	toastr.error('Please Enter Table Area Name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#am_name').focus();
	    }
	    else{
	    		$scope.settablearea.am_srm_id = $rootScope.restaurantObj.srm_id;
                $('#btnsave').attr('disabled','true');
            	$('#btnsave').text("please wait...");
	    	$http({
		      method: 'POST',
		      url: $rootScope.baseURL+'/area/add',
		      data: $scope.settablearea,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(area)
		    {
		    	$rootScope.tableareaObj = area[0];
                $('#btnsave').text("Save Table Area");
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
                $('#btnsave').text("Save Table Area");
                $('#btnsave').removeAttr('disabled');    
		    });
	    }
	     
	};

});