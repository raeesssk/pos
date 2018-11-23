// import admin
angular.module('category').controller('categoryAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.apiURL = $rootScope.baseURL+'/category/add';
	$scope.category = {};
	$scope.category.ctm_srm_id = localStorage.getItem("pos_admin_srm_id");
	
	 var permission=JSON.parse(localStorage.getItem('permission'));
  var value = '#/category/add';
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

  	$scope.addCategory = function () {
	    
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
                    if(orderno.length == 0){
                        
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
                        .success(function(category)
					    {	
					    	toastr.success('Category Added Successfully!', 'Success', {
						        closeButton: true,
						        progressBar: true,
							  	positionClass: "toast-top-center",
							  	timeOut: "500",
							  	extendedTimeOut: "500",
						    });  
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
                    else{
                            toastr.warning('Category Already Exist!', 'Warning', {
						        closeButton: true,
						        progressBar: true,
							  	positionClass: "toast-top-center",
							  	timeOut: "500",
							  	extendedTimeOut: "500",
						    });      
			                $('#btnsave').text("Save Category");
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
	                $('#btnsave').text("Save Category");
	                $('#btnsave').removeAttr('disabled');
                });
		    }
	     
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

});