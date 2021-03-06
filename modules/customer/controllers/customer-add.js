// import admin
angular.module('customer').controller('customerAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  

  $('.index').removeClass("active");
  $('#Menu-6').addClass("active");
  $('#SubMenu-29').addClass("active");
    $scope.loading1=0;
    $scope.customer = {};
    $scope.customer.cm_com_id = localStorage.getItem("com_id");
    $scope.customer.cm_mobile = "N/A";
    $scope.customer.cm_address = "N/A";
    // $scope.customer.cm_state = "N/A";
    // $scope.customer.cm_city = "N/A";
    $scope.customer.cm_pin = "N/A";

  $scope.customer.cm_srm_id = localStorage.getItem("pos_admin_srm_id");
    $("#cm_name").focus();

    /*$scope.getsamecheck = function(){
      if($('#samecheck:checkbox:checked').length > 0){
        $rootScope.stateInfo.forEach(function (value1, key1) {
          if (value1.state == $scope.customer.cm_state)
          {
            $scope.city1 = value1.cities;
          }
        });
        $scope.customer.cm_del_address = $scope.customer.cm_address;
        $scope.customer.cm_del_state = $scope.customer.cm_state;
        $scope.customer.cm_del_city = $scope.customer.cm_city;
        $scope.customer.cm_del_pin = $scope.customer.cm_pin;
      }
      else{
        $scope.customer.cm_del_address = undefined;
        $scope.customer.cm_del_state = undefined;
        $scope.customer.cm_del_city = undefined;
        $scope.customer.cm_del_pin = undefined;
      }
    };*/

     var permission=JSON.parse(localStorage.getItem('permission'));
  var value = '#/customer/add';
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

$scope.getAll=function(){
  $scope.loading1=1;
};
    var socket = io.connect('http://localhost:3000');
	$scope.apiURL = $rootScope.baseURL+'/customer/add';
    $scope.addCustomer = function () {
		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
      if($('#cm_name').val() == undefined || $('#cm_name').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_name").focus();
            }, 1500);
	    }
        else if($('#cm_address').val() == undefined || $('#cm_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_address").focus();
            }, 1500);
        }
        else if($('#cm_pin').val() == undefined || $('#cm_pin').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter pin code.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_pin").focus();
            }, 1500);
        }
	    else if($('#cm_mobile').val() == undefined || $('#cm_mobile').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Mobile no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#cm_mobile").focus();
            }, 1500);
	    }
      else{
              $http({
                    method: 'POST',
                    url: $rootScope.baseURL+'/customer/checkname',
                    data: $scope.customer,
                    headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
                  })
                  .success(function(login)
                  {
                      if(login.length == 0)
                      {
                        $http({
                          method: 'POST',
                          url: $scope.apiURL,
                          data: $scope.customer,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
                        })
                        .success(function(login)
                        {
                            $('#btnsave').text("Save");
                            $('#btnsave').removeAttr('disabled');
                            
                            window.location.href = '#/'; 

                            socket.emit('tobackend', {customer:login})
                        })
                        .error(function(data) 
                        {   
                          var dialog = bootbox.dialog({
                            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                                closeButton: false
                            });
                            setTimeout(function(){
                            $('#btnsave').html("SAVE");
                            $('#btnsave').removeAttr('disabled');
                                dialog.modal('hide'); 
                            }, 1500);            
                        });
                      }
                      else
                      {
                        toastr.warning('Customer Already Exist!', 'Warning', {
                            closeButton: true,
                            progressBar: true,
                          positionClass: "toast-top-center",
                          timeOut: "500",
                          extendedTimeOut: "500",
                        });      
                      $('#btnsave').text("Save Customer");
                      $('#btnsave').removeAttr('disabled');
                      }
                  })
                  .error(function(data) 
                  {   
                    var dialog = bootbox.dialog({
                      message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                          closeButton: false
                      });
                      setTimeout(function(){
                      $('#btnsave').html("SAVE");
                      $('#btnsave').removeAttr('disabled');
                          dialog.modal('hide'); 
                      }, 1500);            
                  });
                  
                }
              }
            });

