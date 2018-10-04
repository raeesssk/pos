// import admin
angular.module('settablearea').controller('settableareaCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	// $scope.apiURL = $rootScope.baseURL+'/settablearea/add';
	// $scope.area = {};
	// $scope.area.am_username = $rootScope.userid;
	
	$('#navbar_hide').hide();
	$('#sidebar_hide').hide();
	$('#sam_name').focus();
  	$scope.addArea = function () {
	    
	    if($('#sam_name').val() == undefined || $('#sam_name').val() == ""){
	    	toastr.error('Please Enter Table Area Name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#sam_name').focus();
	    }
	    else{
                $('#btnsave').attr('disabled','true');
            	$('#btnsave').text("please wait...");
	    	$http({
		      method: 'POST',
		      url: $scope.apiURL,
		      data: $scope.area,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(area)
		    {
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