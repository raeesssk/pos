// import admin
angular.module('product').controller('productEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.categoryList = [];
	$scope.productId = $routeParams.productId;
 	$scope.apiURL = $rootScope.baseURL+'/product/edit/'+$scope.productId;
 	$scope.tableAreaDetails = [];
	$scope.restaurantObj=JSON.parse(localStorage.getItem("pos_admin_restaurant"));
	$scope.displayImages = "resources/assets/img/default-image.png";

	$scope.check_isnight = $scope.restaurantObj.srm_isnight;
 	$scope.displayImage = "resources/default-image.png";
	  function readURL(input) {
	    if (input.files && input.files[0]) {
	          var reader = new FileReader();

	              $scope.product.file = input.files[0];
	          reader.onload = function (e) {
	              $('#blah').attr('src', e.target.result);
	          }
	          reader.readAsDataURL(input.files[0]);

	      }
	  }
	  // $("#ctm_image").change(function(){
	  //     readURL(this);
	  // });
	  checkButton = function(objs){
          readURL(objs);
      };

      

	$scope.getSearchTable = function(vals) {

      var searchTerms = {search: vals, ctm_srm_id:localStorage.getItem("pos_admin_srm_id")};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("pos_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/category/typeahead/search', searchTerms, httpOptions).then((result) => {
        return result.data;
      });
    };

  $scope.getProduct = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/product/'+$scope.productId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(product)
	    {
	    	product.forEach(function (value, key) {
	    		$http({
				      method: 'GET',
				      url: $rootScope.baseURL+'/category',
				      headers: {'Content-Type': 'application/json',
			                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
				    })
				    .success(function(categoryList)
				    {
				    	categoryList.forEach(function(value1,key){
				    		if(value.pm_ctm_id == value1.ctm_id)
				    		{
				    			value.pm_ctm = value1;
				    		}
				    	});
						
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
				    $http({
						      method: 'GET',
						      url: $rootScope.baseURL+'/product/price/'+$scope.productId,
						      headers: {'Content-Type': 'application/json',
					                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
						    })
						    .success(function(area)
						    {;
				                area.forEach(function (value, key) {
				                		$scope.check_day_half = true;
				                		if($scope.check_isnight == 1)
				                		{
				                			$scope.product.check_night_half = true;
				                			$scope.checknight = 1;
				                		}
				                      $scope.tableAreaDetails.push(value);
				                });
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
	      		$scope.product = value;
              });
      		  
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

	$scope.check=function(){
      	
      	if($scope.product.check_night_half == true)
      	{
      		$scope.checknight = 1;
      	}
      	else
      	{
      		$scope.checknight = 0;
      	}
      }


  $scope.editProduct = function () {
		if($('#pm_ctm_id').val() == undefined || $('#pm_ctm_id').val() == "" || $scope.product.pm_ctm.ctm_id == undefined){
	    	toastr.error('please select category name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#pm_ctm_id').focus();
	    }
	    else if($('#pm_description').val() === undefined || $('#pm_description').val() === ""){
	    	toastr.error('please enter dishes name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#pm_description').focus();		    
	    } 
	    else if($('#pm_dish_no').val() == undefined || $('#pm_dish_no').val() == ""){
	    	toastr.error('please enter dish number.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#pm_dish_no').focus();
	    }
	    else if($('#pm_expected_in').val() == undefined || $('#pm_expected_in').val() == ""){
	    	toastr.error('please enter expected time.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#pm_expected_in').focus();
	    }
	    else if($('#pm_image').val() != "" && ($('#pm_image').data('max-size') < $('#pm_image').get(0).files[0].size )){
        	toastr.error('Please Select Image size less than 200KB!', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#pm_image').val("");
            $('#blah').attr('src', "resources/default-image.png");
      	}
	    else
	    {
	    	var fd = new FormData();
                       
            fd.append('pm_image', $scope.product.file);

	  		$scope.obj = {
            	list : $scope.tableAreaDetails,
            	product : $scope.product
            }

            $('#btnsave').attr('disabled','true');
            $('#btnsave').text("please wait...");
		    $http({
		      method: 'POST',
		      url: $scope.apiURL,
		      data: $scope.obj,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(login)
		    {
		    	$http({
				      method: 'POST',
				      url: $rootScope.baseURL+'/product/image/'+$scope.productId,
				      data: fd,
				      transformRequest: angular.identity,
				      headers: {'Content-Type': undefined,
			                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
				    })
	                .success(function(product)
				    {	
				    	 
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
		                $('#btnsave').text("Save Dishes");
	        			$('#btnsave').removeAttr('disabled');    
				    });
                $('#btnsave').text("Update Dishes");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/product';  
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
                $('#btnsave').text("Update Dishes");
                $('#btnsave').removeAttr('disabled');
		    });
		}
	};

});