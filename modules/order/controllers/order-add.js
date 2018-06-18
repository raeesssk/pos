 // import admin
 angular.module('order').controller('orderAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.tab=0;
    $scope.categoryList = [];
    $scope.tableList = [];

    var taskData = localStorage['tasklist'];
     if(taskData !== undefined) {
      $scope.task = JSON.parse(taskData)
    }



  $scope.getAll = function () {
        
      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/category',
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
        category.forEach(function (value, key) {

                  $scope.categoryList.push(value);
                  
              });
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
    $scope.getAll();

$scope.closechk=function(){
  $('input').filter(':checkbox').prop('checked',true);
};

// ### switch always on
$scope.getBox=function(){
  $('#confirm-change').modal('show');
  // $('input').filter(':checkbox').prop('checked',true);
};

  $scope.deleteTable=function(table){
          $http({
            method: 'post',
            url: $rootScope.baseURL+'/table/notreserved',
            data: table,
            headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
          })
          .success(function(category) {
            
              if (category.length > 0) {
              $('#'+table.tm_id).removeClass('btn-success');
              $("#"+table.tm_id).addClass('color');
              $('#confirm-change').modal('hide');
              // $('#confirm-change').modal('hide');
              window.location.href="#/dinein";

            }
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


  $scope.changeTable=function(table){

    $scope.tableList = [];
    $http({
        method: 'GET',
        url: $rootScope.baseURL+'/table',
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
        category.forEach(function (value, key) {

                  $scope.tableList.push(value);

              });
              $scope.tab=1;
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

  $scope.getid = function (table) {
      // $("#"+id).removeClass('color');
      // $("#"+id).addClass('btn-success');
    if ($("#"+table.tm_id).hasClass('color')){
        $http({
            method: 'post',
            url: $rootScope.baseURL+'/table/isreserved',
            data: table,
            headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
          })
          .success(function(category) {
            
              if (category.length > 0) {
                $http({
                  method: 'post',
                  url: $rootScope.baseURL+'/order/edit/'+rootScope.orderObj.om_id,
                  data: table,
                  headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
                })
                .success(function(category) {
                  
                    $("#"+table.tm_id).removeClass('color');
                    $("#"+table.tm_id).addClass('btn-success');
                    
                    $rootScope.tableObj = table;
                    $('#confirm-change').modal('hide');
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
              
              
            }
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
      }
      // else{
      // }
      };
});