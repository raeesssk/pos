// import admin
 angular.module('report').controller('reportListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
    
    $scope.reportList = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.limit = {};
    $scope.loading1 = 0;
    $scope.orderList = [];
    $scope.orderListcount=0;
    $scope.viewList=[];   
var socket = io.connect($rootScope.baseURL);
$scope.apiURL = $rootScope.baseURL+'/order/order/total';

    $(function() {
      $( "#tabs" ).tabs();
    });
  
  // Main Function
  /*$scope.getAll = function () {
          if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
        $scope.limit.search = "";
      }
      else{
        $scope.limit.search = $scope.searchtext;
      }

      $scope.limit.om_srm_id = localStorage.getItem("pos_admin_srm_id");
      
      $http({
        method: 'POST',
        url: $scope.apiURL,
        data:$scope.limit,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
        category.forEach(function (value, key) {
                  $scope.orderListcount=value.total;
                  // console.log($scope.filteredTodos.om_amount);
                  // console.log($scope.orderListcount);
              });
              $scope.$watch("currentPage + numPerPage",
                  function () {
                    $scope.resetpagination();
                  });
              
              // $scope.$apply(); 
      })
      .error(function(data) 
      {     
              $scope.loading1 = 1;
        toastr.error('Oops, Something Went Wrong.', 'Error', {
              closeButton: true,
              progressBar: true,
            positionClass: "toast-top-center",
            timeOut: "500",
            extendedTimeOut: "500",
          });             
      });
    };*/

    //Pagination Function
    /*$scope.resetpagination = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filterUserend = begin + 1;
        $scope.filterUser = end;
        if ($scope.filterUser >= $scope.orderListcount)
            $scope.filterUser = $scope.orderListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/order/order/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
              })
              .success(function(customer)
              {
                $scope.filteredTodos = [];
                if (customer.length > 0) {
                 
                  customer.forEach(function (value, key) {
                    // console.log(value);
                      $scope.filteredTodos.push(value);

                  });
                }
                else{
                }                
                      // $scope.obj_Main = $scope.vendorList;
                      $scope.loading1 = 1;
                      // $scope.$apply(); 
                      
                  
              })
              .error(function(data) 
              {   
                  $scope.loading1 = 1;
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                        dialog.modal('hide'); 
                    }, 3001);             
              });
    };

   //search Data
    $scope.getSearch = function () {
      $scope.getAll();
    };*/

    $('#user-datepicker-from').datepicker({
     timepicker:false,
      format: 'yyyy-mm-dd',
      autoclose: true,
     maxDate:'+1970/01/02',
     scrollInput:false
    });

    $('#user-datepicker-to').datepicker({
     timepicker:false,
      format: 'yyyy-mm-dd',
      autoclose: true,
     maxDate:'+1970/01/02',
     scrollInput:false

    });
    $scope.srm_id = localStorage.getItem("pos_admin_srm_id");
    $scope.getAll = function () {
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/dashboard/salereport/'+$scope.srm_id,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(report)
      {
        report.forEach(function (value, key) {
          $scope.reportList.push(value);
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

   $scope.check=function(){
      $scope.toDate = $("#user-datepicker-to").val();
    $scope.fromDate = $("#user-datepicker-from").val();
    if(angular.isUndefined($scope.fromDate) || $scope.fromDate === null || $scope.fromDate == "")
      {
         var dialog = bootbox.dialog({
          message: '<p class="text-center">please select from-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }

      if(angular.isUndefined($scope.toDate) || $scope.toDate === null || $scope.toDate == "")
      {
          var dialog = bootbox.dialog({
          message: '<p class="text-center">please select to-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }

      $scope.dateFilter = '&startTime='+ $scope.fromDate + '&endTime=' + $scope.toDate;

      
      $scope.fDate = new Date($scope.fromDate);
      $scope.fDate.setHours(0,0,0,0);
      $scope.tDate = new Date($scope.toDate);
      $scope.tDate.setHours(0,0,0,0);
      if($scope.fDate > $scope.tDate)
      {
          var dialog = bootbox.dialog({
          message: '<p class="text-center">oops!!! to-date greater than from-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }
     $scope.getAll();
    };

    Date.prototype.setFromDate = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     if(mm == 0){
      document.getElementById("user-datepicker-from").value = yyyy-1 +"-"+ ("12") +"-"+ (dd[1]?dd:"0"+dd[0]);
     }
     else if(mm==2||mm==4||mm==6||mm==7||mm==9||mm==11){
      document.getElementById("user-datepicker-from").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd-1:"0"+dd[0]);
     }
     else{
      document.getElementById("user-datepicker-from").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
     }
    };

    Date.prototype.setToDate = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     document.getElementById("user-datepicker-to").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
     $scope.check();
    };

    d = new Date();
    d.setFromDate();
    d.setToDate();

    // icon-info VIEW 
    $scope.orderDetails = function (index) {
      $('#orderDetails').modal('show');
      $scope.viewList=[];

      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/order/complete',
        data: $scope.filteredTodos[index],
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
        category.forEach(function (value, key) {
            value.opm_quantity_old = value.opm_quantity;
          
            $scope.viewList.push(value);

          });    

      $scope.total_amount = $scope.filteredTodos[index].om_amount; 
        // console.log($scope.viewList);
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

    // order Stop
    $scope.deleteOrder = function(index){
      $scope.obj = $scope.filteredTodos[index];
      $('#confirm-delete').modal('show');
    };

    // cancel Order conformation
    $scope.cancelOrder = function(){
      $scope.viewList=[];
      
      // socket.on('deleteshow',function(data){
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/order/order/cancel',
        data: $scope.obj,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {

        
        $('#confirm-delete').modal('hide');
        if(category == "completed"){
          toastr.success('Your Order cannot be Cancelled.', {
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
            timeOut: "500",
            extendedTimeOut: "500",
          }); 
        }
        else
        {
          toastr.success('Your Order has been Cancelled.', {
              closeButton: true,
              progressBar: true,
              positionClass: "toast-top-center",
              timeOut: "500",
              extendedTimeOut: "500",
            });  
        }

        socket.emit('deleteshow',{
          objs:category[0]
        });
          // $scope.getAll();
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
        // });
     
    };
    $scope.printComplete=function(index){
    $scope.obj=$scope.filteredTodos[index];
    $http({
        method: 'POST',
        url: $rootScope.baseURL+'/order/order/print',
        data: $scope.obj,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
          
          toastr.success('Table Orders Closed,Print Coming....', 'Success', {
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
            timeOut: "800",
            extendedTimeOut: "500",
          });     
          // window.location.href = '#/kitchen/pending'; 
          
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

    socket.on('deleteshow',function(data){
      $scope.getAll();
    });
    $rootScope.socket.on('status',function(data){
          $scope.getAll();
      });
    
});