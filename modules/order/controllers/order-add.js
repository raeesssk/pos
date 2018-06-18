 // import admin
 angular.module('order').controller('orderAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.tableObj = JSON.parse(localStorage.getItem("tableObj"));
    $scope.orderObj = JSON.parse(localStorage.getItem("orderObj"));
    $scope.pro=0;
    $scope.tab=0;
    $scope.categoryList = [];
    $scope.productList = [];
    $scope.tableList = [];
    // console.log($scope.tableObj);
// localStorage.setItem("tableObj");
// localStorage["tablesList"]=JSON.stringify($scope.tableObj);


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
                url: $rootScope.baseURL+'/order/product/remove',
                data: $scope.orderObj,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
              })
              .success(function(category) {
                  if($(category.length == 0)){

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
                         toastr.error("Oops! Something Went Wrong", 'Error', {
                              closeButton: true,
                              progressBar: true,
                            positionClass: "toast-top-center",
                            timeOut: "500",
                            extendedTimeOut: "500",
                          });          
                      });
                      
                  }
                  else{
                    toastr.warning("Some Pending Orders",'Warning',{
                      closeButton: true,
                              progressBar: true,
                            positionClass: "toast-top-center",
                            timeOut: "500",
                            extendedTimeOut: "500",
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
  };


  $scope.changeTable=function(table){
    $('#del').attr("disabled","true");
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
                  url: $rootScope.baseURL+'/order/edit/'+$scope.orderObj.om_id,
                  data: table,
                  headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
                })
                .success(function(category1) {
                  
                    $http({
                        method: 'post',
                        url: $rootScope.baseURL+'/table/notreserved/',
                        data: $scope.tableObj,
                        headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
                    })
                      .success(function(category2) {
                        
                          $("#"+table.tm_id).removeClass('btn-success');
                          $("#"+table.tm_id).addClass('color');
                          $("#"+$scope.tableObj.tm_id).removeClass('color');
                          $("#"+$scope.tableObj.tm_id).addClass('btn-success');

                          localStorage.setItem('tableObj',JSON.stringify(table) );
                          $scope.tableObj = JSON.parse(localStorage.getItem("tableObj"));
                          $scope.tab=0;
                          $('#del').removeAttr("disabled");
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
      $scope.getPro=function(product){
        
          $http({
        method: 'GET',
        url: $rootScope.baseURL+'/product',
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
        category.forEach(function (value, key) {

                  $scope.productList.push(value);

              });
              $scope.pro=1;
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