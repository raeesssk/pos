// import admin
angular.module('employee').controller('employeeAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {


   
  
    $scope.employee = {};

  $scope.employee.emp_srm_id = localStorage.getItem("pos_admin_srm_id");
    $('#emp_name').focus();
    // $scope.employee.userid=localStorage.getItem('logichron_userid');
	$scope.apiURL = $rootScope.baseURL+'/employee/add';

  //   $scope.url = 'Tried to enter employee add Page';

  //   $scope.gethistory=function(){
  //     $scope.history={
  //       user_id : $rootScope.userid,
  //       url : $scope.url
  //     }
  //     $http({
  //           method: 'POST',
  //           url: $rootScope.baseURL+'/history/add',
  //           data: $scope.history,
  //           headers: {'Content-Type': 'application/json',
  //                   'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
  //         })
  //         .success(function(login)
  //         {
              
  //         })
  //         .error(function(data) 
  //         {   
  //           var dialog = bootbox.dialog({
  //             message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
  //                 closeButton: false
  //             });
  //             setTimeout(function(){
  //             $('#btnsave').text("SAVE");
  //             $('#btnsave').removeAttr('disabled');
  //                 dialog.modal('hide'); 
  //           }, 1500);            
  //       });
  //   };
  //   $scope.gethistory();

    var permission=JSON.parse(localStorage.getItem('permission'));
    var value = '#/employee/add';
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
          $location.path('/');
        }
        /*
        break;
      }*/

    };
    $scope.getrolepermission();

  //    $scope.displayImage = "resources/images/default-image.png";
  // function readURL(input) {
  //   if (input.files && input.files[0]) {
  //         var reader = new FileReader();

  //             $scope.employee.file = input.files[0];
  //         reader.onload = function (e) {
  //             if(input.files[0].size > 200000)
  //           {
  //             var dialog = bootbox.dialog({
  //             message: '<p class="text-center">File Size Too Big To Upload!!!</p>',
  //                 closeButton: false
  //             });
  //             dialog.find('.modal-body').addClass("btn-danger");
  //             setTimeout(function(){
  //                 dialog.modal('hide'); 
  //             }, 2000);
  //             $('#next').attr('disabled',true);
  //           }
  //           else
  //           { 
              
  //             $('#blah').attr('src', e.target.result);
  //           }
  //         }
  //         reader.readAsDataURL(input.files[0]);

  //     }
  // }

  // $("#emp_image").change(function(){
  //     readURL(this);
  // });

    
    $scope.addEmployee = function () {
		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
        if($('#emp_name').val() == undefined || $('#emp_name').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Employee Name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_name').focus();
            }, 1500);
        }
	    else if($('#emp_mobile').val() == undefined || $('#emp_mobile').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Mobile Number.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_mobile').focus(); 
            }, 1500);
            
	    }
      else if($('#emp_address').val() == undefined || $('#emp_address').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Residential Address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#emp_address').focus(); 
            }, 1500);
      }
	    else{

                    
                    $http({
                      method: 'POST',
                      url: $scope.apiURL,
                      data: $scope.employee,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
                    })
                    .success(function(employees)
                    {
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                       window.location.href = '#/employee';  
                    })
                    .error(function(data) 
                    {   
                        var dialog = bootbox.dialog({
                        message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                            closeButton: false
                        });
                        setTimeout(function(){
                            $('#btnsave').text("Save");
                            $('#btnsave').removeAttr('disabled');
                            dialog.modal('hide');  
                        }, 1500);
                    });
		}
	};

});