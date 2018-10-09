// import admin
angular.module('product').controller('productAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
	

	$scope.apiURL = $rootScope.baseURL+'/product/add';

	$scope.displayImages = "resources/assets/img/default-image.png";


	$scope.tableAreaDetails=[];
	$scope.categoryList = [];
	$scope.product = {};
	$scope.product.pm_username = $rootScope.userid;

	/*$scope.onFileSelect = function ($files) {
        var reader = new FileReader();
        reader.readAsDataURL($files[0]);

        reader.onloadend = function () {
            var img_data = reader.result;
            var spl_dt = img_data.split(',');
            $scope.displayImages = 'data:image/png;base64, ' + spl_dt[1];
            $scope.displayImagesdb = spl_dt[1];
            $scope.$apply();
        };
    };*/
    $scope.onFileSelect = function ($files) {
        $scope.speakerIcon.photo = $files[0];
        $scope.fileName = $scope.speakerIcon.photo.name;
        var reader = new FileReader();
        reader.readAsDataURL($files[0]);

        reader.onloadend = function () {
            var img_data = reader.result;
            var spl_dt = img_data.split(',');
            $scope.displayImages = 'data:image/png;base64, ' + spl_dt[1];
            $scope.displayImagesdb = spl_dt[1];
            $scope.$apply();
        };
    };

//typeahead customer list record for Customer Name input
    $scope.getCategoryList = function(vals) {
        var searchTerms = {search: vals};
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

	$scope.getDetails = function () {
		$http({
		      method: 'GET',
		      url: $scope.apiURL,
		      url: $rootScope.baseURL+'/area',
		      data: $scope.formEntry,
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

    $('#pm_ctm_id').focus();
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
	    else
	    {
		    $scope.formEntry = {
		    	productList : $scope.tableAreaDetails,
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
	    
	};

// CheckBoxs
	$("#check_full_night").change(function() {
	     var is_checked = $(this).is(":checked");
	     if(!is_checked) {
	      $(".id_of_3th_td").val(0);
	     }
	     $(".id_of_3th_td").prop("readonly", !is_checked);
	});	
		
	$("#check_half_night").change(function() {
	     var is_checked = $(this).is(":checked");
	     if(!is_checked) {
	      $(".id_of_5th_td").val(0);
	     }
	     $(".id_of_5th_td").prop("readonly", !is_checked);
	});
	
	$("#check_half").change(function() {
	     var is_checked = $(this).is(":checked");
	     if(!is_checked) {
	      $(".id_of_4th_td").val(0);
	      $(".id_of_5th_td").val(0);
	      // $("#check_half_night").prop("checked", false);
	     }
	     $(".id_of_4th_td").prop("readonly", !is_checked);
	});
// END CheckBox

});