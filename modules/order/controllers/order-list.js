// import admin
 angular.module('order').controller('orderListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
    $scope.filteredTodos = [];
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

$scope.apiURL = $rootScope.baseURL+'/order/order/total';
  $scope.getAll = function () {
          if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
        $scope.limit.search = "";
      }
      else{
        $scope.limit.search = $scope.searchtext;

      }
      // console.log($scope.limit);
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
              });
              $scope.$watch("currentPage + numPerPage",
                  function () {
                    $scope.resetpagination();
                  });

              // console.log($scope.orderListcount);
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
    };



   //Pagination Function
    $scope.resetpagination = function () {
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
    };
 
    $scope.orderDetails = function (index) {
      $('#orderDetails').modal('show');
      $scope.viewList=[];
      $scope.objList={
        list:$scope.viewList[index]
      };      
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
            
            $scope.viewList.push(value);
          });    
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
});