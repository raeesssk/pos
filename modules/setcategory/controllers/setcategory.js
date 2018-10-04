// import admin
angular.module('setcategory').controller('setcategoryCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	// $scope.apiURL = $rootScope.baseURL+'/setcategory/add';
	// $scope.category = {};
	// $scope.category.ctm_username = $rootScope.userid;
	
  	$('#navbar_hide').hide();
	$('#sidebar_hide').hide();
	$('#scm_type').focus();

  	$scope.addCategory = function () {
	    
	    if($('#scm_type').val() == undefined || $('#scm_type').val() == ""){
	    	toastr.error('Please Enter Category Name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
			$('#scm_type').focus();
	    }
	    else{
                $('#btnsave').attr('disabled','true');
            	$('#btnsave').text("please wait...");
	    	$http({
		      method: 'POST',
		      url: $scope.apiURL,
		      data: $scope.category,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(category)
		    {
                $('#btnsave').text("Save Category");
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
                $('#btnsave').text("Save Category");
                $('#btnsave').removeAttr('disabled');    
		    });
	    }
	     
	};

});