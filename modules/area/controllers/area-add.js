// import admin
angular.module('area').controller('areaAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.apiURL = $rootScope.baseURL+'/area/add';
	$scope.area = {};
	$scope.area.am_srm_id = localStorage.getItem("pos_admin_srm_id");
	
	 var permission=JSON.parse(localStorage.getItem('permission'));
  var value = '#/area/add';
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

  	$scope.addArea = function () {
	    
	    if($('#am_name').val() == undefined || $('#am_name').val() == ""){
	    	toastr.error('please enter table area name.', 'Error', {
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
                  url: $rootScope.baseURL+'/area/checkname',
                  data: $scope.area,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length == 0){
                        
                        $http({
					      method: 'POST',
					      url: $scope.apiURL,
					      data: $scope.area,
					      headers: {'Content-Type': 'application/json',
				                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
					    })
                        .success(function(area)
					    {	
					    	toastr.success('Area Added Successfully!', 'Success', {
						        closeButton: true,
						        progressBar: true,
							  	positionClass: "toast-top-center",
							  	timeOut: "500",
							  	extendedTimeOut: "500",
						    });  
				                $('#btnsave').text("Save Table Area");
				                $('#btnsave').removeAttr('disabled');
						       	// window.location.href = '#/';  

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
                    else{
                            toastr.warning('Area Already Exist!', 'Warning', {
						        closeButton: true,
						        progressBar: true,
							  	positionClass: "toast-top-center",
							  	timeOut: "500",
							  	extendedTimeOut: "500",
						    });      
			                $('#btnsave').text("Save Table Area");
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
	                $('#btnsave').text("Save Table Area");
	                $('#btnsave').removeAttr('disabled');
                });
		    }
	     
	};

});