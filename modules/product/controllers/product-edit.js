// import admin
angular.module('product').controller('productEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.categoryList = [];
	$scope.productId = $routeParams.productId;
 	$scope.apiURL = $rootScope.baseURL+'/product/edit/'+$scope.productId;

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

      $scope.getDetails = function () {
		$http({
		      method: 'GET',
		      url: $scope.apiURL,
		      url: $rootScope.baseURL+'/area/restaurant/'+$scope.product.pm_srm_id,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(area)
		    {
                // $scope.tableAreaDetails.push();
                area.forEach(function (value, key) {

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
	};


	$scope.getCategoryList = function() {
    	$http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/category',
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(categoryList)
	    {
	    	$scope.categoryList = angular.copy(categoryList);
	    	$scope.getProduct();
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
				    	})
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

  $scope.editProduct = function () {
		if($('#pm_ctm_id').val() == undefined || $('#pm_ctm_id').val() == "" || $scope.product.pm_ctm.ctm_id == undefined){
	    	toastr.error('please select category name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#pm_description').val() === undefined || $('#pm_description').val() === ""){
	    	toastr.error('please enter dishes name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#pm_quantity').val() == undefined || $('#pm_quantity').val() == ""){
	    	toastr.error('please enter quantity.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#pm_rate').val() == undefined || $('#pm_rate').val() == ""){
	    	toastr.error('please enter price.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else
	    {

	  		$scope.formEntry = {
		    	image : $scope.displayImagesdb,
		    	product : $scope.product
		    }
		    
            $('#btnsave').attr('disabled','true');
            $('#btnsave').text("please wait...");
		    $http({
		      method: 'POST',
		      url: $scope.apiURL,
		      data: $scope.formEntry,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(login)
		    {
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