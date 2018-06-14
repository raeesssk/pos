// import admin
 angular.module('order').controller('orderAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    /*$scope.tableList=[];*/
    $scope.categoryList = [];
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
$scope.getBox=function(){

  $('#confirm-change').modal('show');
  $scope.changeTable=function(table){
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
          $('#confirm-change').modal('hide');
  };


};
});