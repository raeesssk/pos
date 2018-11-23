// import admin
angular.module('product').controller('productAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
	
	$scope.restaurantObj=JSON.parse(localStorage.getItem("pos_admin_restaurant"));
	$scope.apiURL = $rootScope.baseURL+'/product/add';

	 var permission=JSON.parse(localStorage.getItem('permission'));
  var value = '#/product/add';
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


	$scope.displayImages = "resources/assets/img/default-image.png";

	$scope.check_isnight = $scope.restaurantObj.srm_isnight;

	$scope.tableAreaDetails=[];
	$scope.categoryList = [];
	$scope.product = {};
	$scope.product.pm_srm_id = localStorage.getItem("pos_admin_srm_id");
	$scope.product.check_night = false;
	$scope.checknight = 0;
    $('#pm_ctm_id').focus();
	//type a head
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
	//end type a head

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
                	 value.pm_fullday_price = 0;
                	 value.pm_fullnight_price = 0;
                	 value.pm_halfday_price = 0;
                	 value.pm_halfnight_price = 0;

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

		// Image
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

      $scope.check=function(){
      	
      	if($scope.product.check_night == true)
      	{
      		$scope.checknight = 1;
      	}
      	else
      	{
      		$scope.checknight = 0;
      	}
      }

	$scope.addProduct = function () {

	    if($('#pm_ctm_id').val() == undefined || $('#pm_ctm_id').val() == "" || $scope.product.pm_ctm_id.ctm_id == undefined){
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
      	else{
                $('#btnsave').attr('disabled','true');
            	$('#btnsave').text("please wait...");

                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/product/checkname',
                  data: $scope.product,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length == 0){
                        
                        var fd = new FormData();
                       
		                fd.append('pm_image', $scope.product.file);

		                $scope.obj = {
		                	list : $scope.tableAreaDetails,
		                	product : $scope.product
		                }

		            	
                        $http({
					      method: 'POST',
					      url: $scope.apiURL,
					      data: $scope.obj,
					      headers: {'Content-Type': 'application/json',
				                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
					    })
                        .success(function(product)
					    {	
					    
				    	$http({
					      method: 'POST',
					      url: $rootScope.baseURL+'/product/image/'+product[0].pm_id,
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
					    	toastr.success('Dish Added Successfully!', 'Success', {
						        closeButton: true,
						        progressBar: true,
							  	positionClass: "toast-top-center",
							  	timeOut: "500",
							  	extendedTimeOut: "500",
						    });  
				                $('#btnsave').text("Save Dishes");
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
			                $('#btnsave').text("Save Dishes");
                			$('#btnsave').removeAttr('disabled');    
					    });

					    
                    }
                    else{
                            toastr.warning('Dish Already Exist!', 'Warning', {
						        closeButton: true,
						        progressBar: true,
							  	positionClass: "toast-top-center",
							  	timeOut: "500",
							  	extendedTimeOut: "500",
						    });      
			                $('#btnsave').text("Save Dishes");
               				$('#btnsave').removeAttr('disabled');
                    	}
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
		    }



	 //    else
	 //    {
		//     $scope.formEntry = {
		//     	productList : $scope.tableAreaDetails,
		//     	product : $scope.product
		//     }
  //           $('#btnsave').attr('disabled','true');
  //           $('#btnsave').text("please wait...");
  //   		$http({
		//       method: 'POST',
		//       url: $scope.apiURL,
		//       data: $scope.formEntry,
		//       headers: {'Content-Type': 'application/json',
	 //                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		//     })
		//     .success(function(login)
		//     {
  //               $('#btnsave').text("Save Dishes");
  //               $('#btnsave').removeAttr('disabled');
		//        window.location.href = '#/';  
		//     })
		//     .error(function(data) 
		//     {   
		//     	toastr.error('Oops, Something Went Wrong.', 'Error', {
		// 	        closeButton: true,
		// 	        progressBar: true,
		// 		  	positionClass: "toast-top-center",
		// 		  	timeOut: "500",
		// 		  	extendedTimeOut: "500",
		// 	    });
  //               $('#btnsave').text("Save Dishes");
  //               $('#btnsave').removeAttr('disabled');
		//     });
		// }
	    
	};

	



	

// CheckBoxs
	// $("#check_full_night").change(function() {
	//      var is_checked = $(this).is(":checked");
	//      if(!is_checked) {
	//       $(".id_of_3th_td").val(0);
	//      }
	//      $(".id_of_3th_td").prop("readonly", !is_checked);
	// });	
		
	// $("#check_half_night").change(function() {
	//      var is_checked = $(this).is(":checked");
	//      if(!is_checked) {
	//       $(".id_of_5th_td").val(0);
	//      }
	//      $(".id_of_5th_td").prop("readonly", !is_checked);
	// });
	
	// $("#check_half").change(function() {
	//      var is_checked = $(this).is(":checked");
	//      if(!is_checked) {
	//       $(".id_of_4th_td").val(0);
	//       $(".id_of_5th_td").val(0);
	//      }
	//      $(".id_of_4th_td").prop("readonly", !is_checked);
	// });
// END CheckBox

});