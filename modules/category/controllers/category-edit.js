// import admin
angular.module('category').controller('categoryEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.ctmId = $routeParams.ctmId;
  $scope.apiURL = $rootScope.baseURL+'/category/edit/'+$scope.ctmId;

  $scope.getCategory = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/category/'+$scope.ctmId,
	      // data: $scope.employee,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(category)
	    {
	    	category.forEach(function (value, key) {
	      		$scope.category = value;
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

	              $scope.category.file = input.files[0];
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
  	
  	$scope.editCategory = function () {

	  	if($('#ctm_type').val() == undefined || $('#ctm_type').val() == ""){
	    	toastr.error('please enter category name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#ctm_image').val() != "" && ($('#ctm_image').data('max-size') < $('#ctm_image').get(0).files[0].size )){
        	toastr.error('Please Select Image size less than 200KB!', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
		    $('#ctm_image').val("");
            $('#blah').attr('src', "resources/default-image.png");
      	}
      	else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/category/checkname',
                  data: $scope.category,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length == 1 && $scope.ctmId != orderno[0].ctm_id){
                         
                        toastr.warning('Category Already Exits!', 'Warning', {
				            closeButton: true,
				            progressBar: true,
				            positionClass: "toast-top-center",
				            timeOut: "500",
				            extendedTimeOut: "500",
				        });
				        $('#btnsave').text("Update Category");
				        $('#btnsave').removeAttr('disabled');
                      }
                    else
                      	{	
                      		var fd = new FormData();
			            	fd.append('ctm_type', $scope.category.ctm_type);
			                fd.append('ctm_image', $scope.category.file);
			            	fd.append('ctm_srm_id', $scope.category.ctm_srm_id);
                          	$http({
							    method: 'POST',
							    url: $scope.apiURL,
							    data: fd,
							    transformRequest: angular.identity,
							    headers: {'Content-Type': undefined,
					                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
						    })
                          	.success(function(login)
						    {
						    	toastr.success('Details Updated', 'Success', {
						            closeButton: true,
						            progressBar: true,
						            positionClass: "toast-top-center",
						            timeOut: "500",
						            extendedTimeOut: "500",
						        });
				                $('#btnsave').text("Update Category");
				                $('#btnsave').removeAttr('disabled');
						        window.location.href = '#/category'; 
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
				                $('#btnsave').text("Update Category");
				                $('#btnsave').removeAttr('disabled');
						    });
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
			        $('#btnsave').text("Update Category");
				    $('#btnsave').removeAttr('disabled');
                });
        }


	 //    else{
  //               $('#btnsave').attr('disabled','true');
  //           	$('#btnsave').text("please wait...");
		//      $http({
		//       method: 'POST',
		//       url: $scope.apiURL,
		//       data: $scope.category,
		//       headers: {'Content-Type': 'application/json',
	 //                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		//     })
		//     .success(function(login)
		//     {
  //               $('#btnsave').text("Update Category");
  //               $('#btnsave').removeAttr('disabled');
		//        window.location.href = '#/category';  
		//     })
		//     .error(function(data) 
		//     {   
		//     	toastr.error('Oops, Something Went Wrong.', 'Error', {
		//             closeButton: true,
		//             progressBar: true,
		//             positionClass: "toast-top-center",
		//             timeOut: "500",
		//             extendedTimeOut: "500",
		//         });
  //               $('#btnsave').text("Update Category");
  //               $('#btnsave').removeAttr('disabled');
		//     });
		// }
	};


});