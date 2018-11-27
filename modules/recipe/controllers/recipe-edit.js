// import admin
angular.module('recipe').controller('recipeEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {


	$scope.productList = [];
	$scope.inventoryList = [];
	$scope.ctmId = $routeParams.ctmId;
  $scope.apiURL = $rootScope.baseURL+'/recipe/edit/'+$scope.ctmId;
  $scope.recipe ={}
  	$scope.getSearchproduct = function(vals) {

      var searchTerms = {search: vals, pm_srm_id:localStorage.getItem("pos_admin_srm_id")};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("pos_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/product/typeahead/search', searchTerms, httpOptions).then((result) => {
        return result.data;
      });
    };

    $scope.getSearchInventory = function(vals) {

      var searchTerms = {search: vals, im_srm_id:localStorage.getItem("pos_admin_srm_id")};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("pos_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/inventory/typeahead/search', searchTerms, httpOptions).then((result) => {
        return result.data;
      });
    };

    $scope.getProduct = function(){
    	$http({
          method: 'GET',
          url: $rootScope.baseURL+'/product/price/'+$scope.recipe.rm_pm.pm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
        })
        .success(function(productlist)
        {
            if(productlist[0].pm_half == 1)
            {
            	$scope.recipe.qty_half = 1;
            }
            else
            {
            	$scope.recipe.qty_half = 0;
              $scope.recipe.rm_quantity_half = 0;
            }
        })
        .error(function(data) 
        {   
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide');  
                $('#addCustomer').modal('hide');
            }, 1500);
        });
    };
	
  $scope.getRecipe = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/recipe/'+$scope.ctmId,
	      // data: $scope.employee,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(recipe)
	    {
	    	recipe.forEach(function (value, key) {
	    		$http({
				      method: 'GET',
				      url: $rootScope.baseURL+'/product',
				      headers: {'Content-Type': 'application/json',
			                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
				    })
				    .success(function(categoryList)
				    {
				    	categoryList.forEach(function(value1,key){
				    		if(value.rm_pm_id == value1.pm_id)
				    		{
				    			value.rm_pm = value1;
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
				    $http({
				      method: 'GET',
				      url: $rootScope.baseURL+'/inventory',
				      headers: {'Content-Type': 'application/json',
			                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
				    })
				    .success(function(categoryList)
				    {
				    	categoryList.forEach(function(value2,key){
				    		if(value.rm_im_id == value2.im_id)
				    		{
				    			value.rm_im = value2;
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
	    		$scope.recipe = value;
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


  $scope.editRecipe = function () {

	  	if($('#rm_pm_id').val() == undefined || $('#rm_pm_id').val() == "" || $scope.recipe.rm_pm.pm_id == undefined){
	    	toastr.error('please select dishes name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#rm_im_id').val() == undefined || $('#rm_im_id').val() == "" || $scope.recipe.rm_im.im_id == undefined){
	    	toastr.error('please select product name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#rm_quantity').val() == undefined || $('#rm_quantity').val() == ""){
	    	toastr.error('please enter quantity.', 'Error', {
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
		      data: $scope.recipe,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		    })
		    .success(function(login)
		    {
                $('#btnsave').text("Update Recipe");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/recipe';  
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
                $('#btnsave').text("Update Recipe");
                $('#btnsave').removeAttr('disabled');  
		    });
		}
	};

});