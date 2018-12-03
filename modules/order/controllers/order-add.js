 // import admin
 angular.module('order').controller('orderAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.tableObj = JSON.parse(localStorage.getItem("tableObj"));
    $scope.orderObj = JSON.parse(localStorage.getItem("orderObj"));
    $scope.pro=0;
    $scope.tab=0;
    $scope.categoryList = [];
    $scope.productList = [];
    $scope.tableList = [];
    $scope.itemList = [];
    $scope.om_add=0;
    $scope.orderObj.om_total=0;
    $scope.printList=[];
    $scope.customization={};
    $scope.category = {};
    var d = new Date();
    $scope.currentime = d.getHours();
    // $scope.orderObj.where='dinein';

// console.log($scope.tableObj);
// localStorage.setItem("tableObj");
// localStorage["tablesList"]=JSON.stringify($scope.tableObj);

  // Main function
  $scope.getAll = function () {
      $scope.category.ctm_srm_id = localStorage.getItem("pos_admin_srm_id");
      $http({
        method: 'post',
        url: $rootScope.baseURL+'/category',
        data:$scope.category,
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

  // After place Order tableList
  $scope.getPrintDetails = function () {
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
        category.forEach(function (value, key) {
          value.opm_quantity_old = value.opm_quantity;
          // $scope.orderObj.total_amount = parseFloat(parseFloat($scope.orderObj.total_amount) + parseFloat(value.opm_total));
          $scope.orderObj.total_amount = parseFloat($scope.orderObj.total_amount + (value.opm_quantity * value.opm_rate));
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
    };

// ### CONFIRM / CHANGE show Modal
  $scope.getBox=function(){
    $('#confirm-change').modal('show');
    // $('input').filter(':checkbox').prop('checked',true);

  };

// ### Cancel Reservation in Modal
  // $scope.deleteTable=function(table){
  //     $http({
  //       method: 'post',
  //       url: $rootScope.baseURL+'/order/product/remove',
  //       data: $scope.orderObj,
  //       headers: {'Content-Type': 'application/json',
  //                 'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
  //     })
  //     .success(function(category) {
  //       if($(category.length == 0)){
  //           $http({
  //             method: 'post',
  //             url: $rootScope.baseURL+'/table/notreserved',
  //             data: table,
  //             headers: {'Content-Type': 'application/json',
  //                       'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
  //           })
  //           .success(function(category) {
  //             // if (category.length > 0) {
  //               $('#'+table.tm_id).removeClass('btn-success');
  //               $("#"+table.tm_id).addClass('color');
  //               $('#confirm-change').modal('hide');
  //               // $('#confirm-change').modal('hide');
  //               $scope.tableList = [];
  //               window.location.href="#/dinein";
  //             // }
  //           })
  //           .error(function(data){   
  //             $scope.loading1 = 1;
  //             toastr.error("Oops! Something Went Wrong", 'Error', {
  //               closeButton: true,
  //               progressBar: true,
  //               positionClass: "toast-top-center",
  //               timeOut: "500",
  //               extendedTimeOut: "500",
  //             });          
  //           });
  //       }
  //       else {
  //         toastr.warning("Some Pending Orders",'Warning',{
  //           closeButton: true,
  //           progressBar: true,
  //           positionClass: "toast-top-center",
  //           timeOut: "500",
  //           extendedTimeOut: "500",
  //         });
  //       }
  //       $rootScope.socket.emit('remove-reserve',{
  //         obj:category[0]
  //       });
  //     })
  //     .error(function(data) 
  //       {   
  //         $scope.loading1 = 1;
  //         toastr.error('Oops, Something Went Wrong.', 'Error', {
  //           closeButton: true,
  //           progressBar: true,
  //           positionClass: "toast-top-center",
  //           timeOut: "500",
  //           extendedTimeOut: "500",
  //         });          
  //       });
  // };


  // $http({
  //       method: 'post',
  //       url: $rootScope.baseURL+'/order/product/remove',
  //       data: $scope.orderObj,
  //       headers: {'Content-Type': 'application/json',
  //                 'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
  //     })
  //     .success(function(category) {
  //       // if($(category.length != 0 || $scope.opm_status_type != 'pending')){

  //         if($scope.opm_status_type != 'pending'){
  //         console.log(category.length);
  //         console.log($scope.opm_status_type);
  //           $http({
  //             method: 'post',
  //             url: $rootScope.baseURL+'/table/notreserved',
  //             data: table,
  //             headers: {'Content-Type': 'application/json',
  //                       'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
  //           })
  //           .success(function(category) {
  //             // if ($(category.length == 0 )) {
  //               $('#'+table.tm_id).removeClass('btn-success');
  //               $("#"+table.tm_id).addClass('color');
  //               $('#confirm-change').modal('hide');
  //               // $('#confirm-change').modal('hide');
  //               $scope.tableList = [];
  //               window.location.href="#/dinein";
  //             // }
  //           })
  //           .error(function(data){   
  //             $scope.loading1 = 1;
  //             toastr.error("Oops! Something Went Wrong", 'Error', {
  //               closeButton: true,
  //               progressBar: true,
  //               positionClass: "toast-top-center",
  //               timeOut: "500",
  //               extendedTimeOut: "500",
  //             });          
  //           });
  //       }
  //       else {
  //         toastr.warning("Some Completed Orders, Cannot Be Cancelled",'Warning',{
  //           closeButton: true,
  //           progressBar: true,
  //           positionClass: "toast-top-center",
  //           timeOut: "500",
  //           extendedTimeOut: "500",
  //         });
  //       }
  //       $rootScope.socket.emit('remove-reserve',{
  //         obj:category[0]
  //       });
  //     })
  //     .error(function(data) 
  //       {   
  //         $scope.loading1 = 1;
  //         toastr.error('Oops, Something Went Wrong.', 'Error', {
  //           closeButton: true,
  //           progressBar: true,
  //           positionClass: "toast-top-center",
  //           timeOut: "500",
  //           extendedTimeOut: "500",
  //         });          
  //       });

// $scope.opm_status_type = 'complete'
  $scope.deleteTable=function(table){
      var flag = 0;

      $scope.printList.forEach(function(value, key){
        // console.log(value);
      if(value.opm_status_type != 'pending'){
            flag = 1;
        }
      });

      if(flag == 0) {
          $http({
                method: 'post',
                url: $rootScope.baseURL+'/table/notreserved',
                data: table,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
              })
              .success(function(category) {
                  
                    $http({
                        method: 'post',
                        url: $rootScope.baseURL+'/order/order/close',
                        data: $scope.orderObj,
                        headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
                      })
                      .success(function(category) {
                        $('#'+table.tm_id).removeClass('btn-success');
                        $("#"+table.tm_id).addClass('color');
                        $('#confirm-change').modal('hide');
                        $scope.tableList = [];
                        window.location.href="#/dinein";

                      })
                      .error(function(data){   
                        $scope.loading1 = 1;
                        toastr.error("Oops! Something Went Wrong", 'Error', {
                          closeButton: true,
                          progressBar: true,
                          positionClass: "toast-top-center",
                          timeOut: "500",
                          extendedTimeOut: "500",
                        });          
                    });
              })
              .error(function(data){   
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
            toastr.warning("Cannot Be Cancelled", 'Warning', {
                  closeButton: true,
                  progressBar: true,
                  positionClass: "toast-top-center",
                  timeOut: "500",
                  extendedTimeOut: "500",
                });           
        }
    };


// orderCompleted PRINT table
  // $scope.orderCompleted=function(table){
  //     $http({
  //       method: 'post',
  //       url: $rootScope.baseURL+'/order/product/remove',
  //       data: $scope.orderObj,
  //       headers: {'Content-Type': 'application/json',
  //                 'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
  //     })
  //     .success(function(category) {
  //       if($(category.length == 0)){
  //           $http({
  //             method: 'post',
  //             url: $rootScope.baseURL+'/table/notreserved',
  //             data: table,
  //             headers: {'Content-Type': 'application/json',
  //                       'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
  //           })
  //           .success(function(category) {
  //             if (category.length > 0) {
  //               $('#'+table.tm_id).removeClass('btn-success');
  //               $("#"+table.tm_id).addClass('color');
  //               $('#confirm-change').modal('hide');
  //               // $('#confirm-change').modal('hide');
  //               $scope.tableList = [];
  //               window.location.href="#/dinein";
  //             }
  //           })
  //           .error(function(data){   
  //             $scope.loading1 = 1;
  //             toastr.error("Oops! Something Went Wrong", 'Error', {
  //               closeButton: true,
  //               progressBar: true,
  //               positionClass: "toast-top-center",
  //               timeOut: "500",
  //               extendedTimeOut: "500",
  //             });          
  //           });
  //       }
  //       else {
  //         toastr.warning("Some Pending Orders",'Warning',{
  //           closeButton: true,
  //           progressBar: true,
  //           positionClass: "toast-top-center",
  //           timeOut: "500",
  //           extendedTimeOut: "500",
  //         });
  //       }
  //       $rootScope.socket.emit('remove-reserve',{
  //         obj:category[0]
  //       });
  //     })
  //     .error(function(data) 
  //       {   
  //         $scope.loading1 = 1;
  //         toastr.error('Oops, Something Went Wrong.', 'Error', {
  //           closeButton: true,
  //           progressBar: true,
  //           positionClass: "toast-top-center",
  //           timeOut: "500",
  //           extendedTimeOut: "500",
  //         });          
  //       });
  // };

// ### Change Reservation in Modal
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
        $rootScope.socket.emit('changeTable',{
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
    };


    $scope.getPro=function(product){
      $scope.productList=[];
      product.am_id = $scope.tableObj.am_id;
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/product/items',
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
                  console.log(value);
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
      else if($scope.currentime >= 18)
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


// quantity change
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
        $scope.getPrintDetails();
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

    $scope.om_status = function(index){
      $scope.cancelList={
        list:$scope.printList[index], 
        total:$scope.orderObj.total_amount
      };
       $http({
        method: 'POST',
        url: $rootScope.baseURL+'/order/product/cancel',
        data: $scope.cancelList,
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
        $scope.getPrintDetails();
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

    $scope.orderConfirm = function(){
      $scope.objList={
        list:$scope.itemList, 
        obj:$scope.orderObj
      };
      console.log($scope.objList.obj);
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/order/placeorder',
        data: $scope.objList,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
          toastr.success('Order Placed', 'Success', {
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
            timeOut: "500",
            extendedTimeOut: "500",
          });     
          // window.location.href = '#/kitchen/pending'; 
          window.location.reload(true);
          $rootScope.socket.emit('orderPlace',{
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

    $scope.printComplete=function(){
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/order/order/complete',
        data: $scope.orderObj,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(category)
      {
          $rootScope.socket.emit('status',{
            obj:category[0]
          });
          toastr.success('Table Orders Completed', 'Success', {
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-center",
            timeOut: "500",
            extendedTimeOut: "500",
          });     
          window.location.href = '#/dinein'; 
          
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
    $rootScope.socket.on('status',function(data){
          $route.reload();
      });
    $rootScope.socket.on('orderPlace', function(data){
        $route.reload();
       });
      /*socket.on('orderPlace',function(data){

        });*/
});