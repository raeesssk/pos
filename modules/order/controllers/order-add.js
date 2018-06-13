// import admin
 angular.module('order').controller('orderAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

     
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



    // $(document).ready(function(){
    //     $("#switch").click(function(){
    //         $("").hide();
    //     });
    //     $("#switch").click(function(){
    //         $("").show();
    //     });
    // });


});