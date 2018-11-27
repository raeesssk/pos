// import admin
angular.module('recipe').controller('recipeAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.apiURL = $rootScope.baseURL+'/recipe/add';
	$scope.productList = [];
	$scope.inventoryList = [];
	$scope.recipe = {};
	$scope.recipe.rm_username = $rootScope.userid;
	$scope.recipe.rm_srm_id = localStorage.getItem("pos_admin_srm_id");

	var permission=JSON.parse(localStorage.getItem('permission'));
  var value = '#/recipe/add';
  var access = permission.includes(value);
    $scope.getrolepermission=function(){
      
      // for(var i=0;i<permission.length;i++)
      // {
        if(access)
        {
          return true
        }
        else
        {
           var dialog = bootbox.dialog({
          message: '<p class="text-center">You Are Not Authorized</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
          $location.path('/')

        }
        /*
        break;
      }*/

    };
    $scope.getrolepermission();


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
          url: $rootScope.baseURL+'/product/price/'+$scope.recipe.rm_pm_id.pm_id,
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
	
  	$scope.addRecipe = function () {
	    
	    if($('#rm_pm_id').val() == undefined || $('#rm_pm_id').val() == "" || $scope.recipe.rm_pm_id.pm_id == undefined){
	    	toastr.error('please select dishes name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#rm_im_id').val() == undefined || $('#rm_im_id').val() == "" || $scope.recipe.rm_im_id.im_id == undefined){
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
		    .success(function(category)
		    {
                $('#btnsave').text("Save Recipe");
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
                $('#btnsave').text("Save Recipe");
                $('#btnsave').removeAttr('disabled');    
		    });
	    }
	     
	};

});