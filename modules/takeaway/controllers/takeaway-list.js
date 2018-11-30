 // import admin
 angular.module('takeaway').controller('takeawayAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.pro=0;
    $scope.tab=0;
    $scope.categoryList = [];
    $scope.productList = [];
    $scope.tableList = [];
    $scope.itemList = [];
    $scope.om_add=0;
    $scope.orderObj = {};
    $scope.orderObj.om_total=0;
    $scope.printList=[];
    var d = new Date();
    $scope.currentime = d.getHours();

    $scope.orderObj.om_where='takeaway';
    $scope.orderObj.srm_id = localStorage.getItem("pos_admin_srm_id");
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

 /* $scope.getPrintDetails = function () {
      $scope.printList = [];
      $scope.orderObj.total_amount = 0;  
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/order/ongoing/orders',
        data: $scope.orderObj,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
        console.log(category)
        category.forEach(function (value, key) {
          value.opm_quantity_old = value.opm_quantity;
          $scope.orderObj.total_amount = parseFloat(parseFloat($scope.orderObj.total_amount) + parseFloat(value.opm_total));
          $scope.printList.push(value);
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
    };*/


    $scope.getPro=function(product){
      $scope.productList=[];

      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/takeaway/items',
        data: product,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
      $('#stop').attr("disabled","true");
        category.forEach(function (value, key) {
          value.quantity = 1;
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

    $scope.addOrder = function (product){
     $scope.customization = product;
    if($scope.currentime < 18)
      {  
        if($scope.customization.ppm_halfday_price > 0){
           $('#customize').modal('show');
        }
        
        else
        {
          var flag = 0;
          
            $scope.customization.price = $scope.customization.ppm_fullday_price;
          $scope.customization.opm_half = 'Full';
          if ($scope.itemList.length == 0) 
          {
            $scope.itemList.push($scope.customization);
            $('#stop').removeAttr("disabled");
            $scope.customization.total = $scope.customization.price * product.quantity;
            $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total + product.price);
          }
          else{

                $scope.itemList.forEach(function (value, key) {
                  if (value.pm_id == $scope.customization.pm_id) 
                    {
                      value.quantity++;
                      value.total = value.price * value.quantity;
                      $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total + value.price);;
                      flag=1;

                      $('#stop').removeAttr("disabled");
                    }
                });
                if (flag==0)
                  {
                    $scope.customization.total = $scope.customization.price * $scope.customization.quantity;
                    $scope.orderObj.om_total =  parseFloat($scope.orderObj.om_total + $scope.customization.price);
                    $scope.itemList.push($scope.customization);

                    $('#stop').removeAttr("disabled");
                  }
              }
        }
      }
      else if($scope.currentime >= 18)
      {
        if($scope.customization.ppm_halfnight_price > 0){
           $('#customize').modal('show');
        }
        
        else
        {
          var flag = 0;
          
          $scope.customization.price = $scope.customization.ppm_fullnight_price;
          $scope.customization.opm_half = 'Full';
          if ($scope.itemList.length == 0) 
          {
            $scope.itemList.push($scope.customization);
            $('#stop').removeAttr("disabled");
            $scope.customization.total = $scope.customization.price * product.quantity;
            $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total + product.price);
          }
          else{
                $scope.itemList.forEach(function (value, key) {
                  if (value.pm_id == $scope.customization.pm_id) 
                    {
                      value.quantity++;
                      value.total = value.price * value.quantity;
                      $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total + value.price);;
                      flag=1;
                      $('#stop').removeAttr("disabled");
                    }
                });
                if (flag==0)
                  {
                    $scope.customization.total = $scope.customization.price * $scope.customization.quantity;
                    $scope.orderObj.om_total =  parseFloat($scope.orderObj.om_total + $scope.customization.price);
                    $scope.itemList.push($scope.customization);
                      $('#stop').removeAttr("disabled");
                  }
              }
        }
      }
      };

    $scope.qminus = function (index){
        if($scope.itemList[index].quantity == 1){
          $scope.itemList[index].total = $scope.itemList[index].price * $scope.itemList[index].quantity;
          $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total - $scope.itemList[index].price);
          $scope.itemList.splice(index, 1);
        }
        else
        {
          $scope.itemList[index].quantity--;
          $scope.itemList[index].total = $scope.itemList[index].ppm_fullday_price * $scope.itemList[index].quantity;
          $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total - $scope.itemList[index].price);
          // $scope.itemList = value.pm_rate * value.quantity;
        }
      };

      $scope.qplus=function(index){

      $scope.itemList[index].quantity = 1 + parseFloat($scope.itemList[index].quantity);
      $scope.itemList[index].total = $scope.itemList[index].price * $scope.itemList[index].quantity;
      $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total) + parseFloat($scope.itemList[index].price);
      
    }

    $scope.cart = function(){
      if($scope.currentime < 18)
      {
        if($scope.customization.selectfull)
        {

          $scope.customization.price = $scope.customization.ppm_fullday_price;
          $scope.customization.opm_half = 'Full';
          $scope.itemList.push($scope.customization);
            $('#stop').removeAttr("disabled");
            $scope.customization.total = $scope.customization.price * $scope.customization.quantity;
            $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total + $scope.customization.price);
             $('#customize').modal('hide');
        }
        else if($scope.customization.selecthalf)
        {
          $scope.customization.price = $scope.customization.ppm_halfday_price;
          $scope.customization.opm_half = 'Half';
          $scope.itemList.push($scope.customization);
            $('#stop').removeAttr("disabled");
            $scope.customization.total = $scope.customization.price * $scope.customization.quantity;
            $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total + $scope.customization.price);
             $('#customize').modal('hide');
        }
      }
      else if($scope.currentime > 18)
      {
        if($scope.customization.selectfull)
        {
          $scope.customization.price = $scope.customization.ppm_fullnight_price;
          $scope.customization.opm_half = 'Full';
          $scope.itemList.push($scope.customization);
            $('#stop').removeAttr("disabled");
            $scope.customization.total = $scope.customization.ppm_fullnight_price * $scope.customization.quantity;
            $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total + $scope.customization.ppm_fullnight_price);
             $('#customize').modal('hide');
        }
        else if($scope.customization.selecthalf)
        {
          $scope.customization.price = $scope.customization.ppm_halfnight_price;
          $scope.customization.opm_half = 'Half';
          $scope.itemList.push($scope.customization);
            $('#stop').removeAttr("disabled");
            $scope.customization.total = $scope.customization.ppm_halfnight_price * $scope.customization.quantity;
            $scope.orderObj.om_total = parseFloat($scope.orderObj.om_total + $scope.customization.ppm_halfnight_price);
             $('#customize').modal('hide');
        }
      }
    };

    $scope.orderchange = function(){
        $scope.obj = {
           list:$scope.updateqty, 
          total:$scope.orderObj.total_amount
        }
        $http({
        method: 'POST',
        url: $rootScope.baseURL+'/order/product/update',
        data: $scope.obj,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      { 
        toastr.success('Order Updated', 'Successfully', {
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
            timeOut: "500",
            extendedTimeOut: "500",
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

      $scope.orderObj.total_amount = 0;
      $scope.printList.forEach(function (value, key) {
        $scope.orderObj.total_amount = parseFloat($scope.orderObj.total_amount + (value.opm_quantity * value.opm_rate));
      });
    };

    
    $scope.updateqty={}
    $scope.om_update = function(item){
      $scope.updateqty = item;
      $('#updateQuantity').modal('show');
    };


    $scope.qtyminus = function(){
      $scope.updateqty.opm_quantity = parseFloat($scope.updateqty.opm_quantity) - 1;
    };
    $scope.qtyplus = function(){
      $scope.updateqty.opm_quantity = parseFloat($scope.updateqty.opm_quantity) + 1;
    };

    $scope.orderConfirm = function(){
     

      $scope.objList={
        list:$scope.itemList, 
        obj:$scope.orderObj
      };
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/takeaway/delivery',
        data: $scope.objList,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
        $scope.orderObj = category;
        toastr.success('Order Placed', 'Success', {
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
            timeOut: "500",
            extendedTimeOut: "500",
          });          
        $rootScope.socket.emit('takeaway',{
            obj:category[0]
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
    $rootScope.socket.on('takeaway', function(data){
        $route.reload();
       });
});