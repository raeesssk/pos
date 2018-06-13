// import admin
angular.module('purchase').controller('purchaseListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $('#paymentdateindex').removeClass("active");
  $('#dashboardindex').removeClass("active");
  $('#customerindex').removeClass("active");
  $('#categoryindex').removeClass("active");
  $('#productindex').removeClass("active");
  $('#businessindex').removeClass("active");
  $('#quatationindex').removeClass("active");
  $('#invoiceindex').removeClass("active");
  $('#deliveryindex').removeClass("active");
  $('#cashbookindex').removeClass("active");
  $('#expensetypeindex').removeClass("active");
  $('#expenseindex').removeClass("active");
  $('#reportindex').removeClass("active");
  $('#invoicereportindex').removeClass("active");
  $('#receivedateindex').removeClass("active");
  $('#dailybalanceindex').removeClass("active");
  $('#accountindex').removeClass("active");
  $('#employeeindex').removeClass("active");
  $('#customerreportindex').removeClass("active");
  $('#quatationreportindex').removeClass("active");
  $('#expensereportindex').removeClass("active");
  $('#categoryindex').addClass("active");
  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.purchaseList = [];
    $scope.loading1 = 0;
    $scope.parseFloat = parseFloat;

   $scope.getAll = function () {
        
      $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/purchase',
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(purchase)
	    {
	      purchase.forEach(function (value, key) {
                  $scope.purchaseList.push(value);
              });

              $scope.$watch("currentPage + numPerPage",
                  function () {
                      var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                      var end = begin + $scope.numPerPage;
                      $scope.filterUserend = begin + 1;
                      $scope.filterUser = end;
                      if ($scope.filterUser >= $scope.purchaseList.length)
                          $scope.filterUser = $scope.purchaseList.length;
                      $scope.filteredTodos = $scope.purchaseList.slice(begin, end);
                  });

              $scope.obj_Main = $scope.purchaseList;
              $scope.loading1 = 1;
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
        if ($scope.filterUser >= $scope.purchaseList.length)
            $scope.filterUser = $scope.purchaseList.length;
        $scope.filteredTodos = $scope.purchaseList.slice(begin, end);
    };
    //search Data
    $scope.getSearch = function () {
        $scope.searchtext = $("#searchtext").val();
        $scope.purchaseList = [];
        if ($scope.searchtext !== "") {
            for (var i = 0; i < $scope.obj_Main.length; i++) {
                if (String($scope.obj_Main[i].prm_invoice_no).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($filter('date')($scope.obj_Main[i].prm_date, "mediumDate")).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].dm_firm_name).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].dm_number).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].dm_address).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].prm_amount).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].prm_credit).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($filter('date')($scope.obj_Main[i].prm_payment_date, "mediumDate")).toLowerCase().includes($scope.searchtext.toLowerCase())
                ) {
                    $scope.purchaseList.push($scope.obj_Main[i]);
                }
            }
        }
        else {
            $scope.purchaseList = [];
            $scope.purchaseList = $scope.obj_Main;
        }
        $scope.resetpagination();
        $scope.$apply();
    };

    $scope.deletePurchase = function (prm_id) {
      $scope.prm_id=prm_id;
    }  

    $scope.deleteConfirm = function () {
                $('#del').attr('disabled','true');
              $('#del').text("please wait...");
	     $http({
	      method: 'POST',
        url: $rootScope.baseURL+'/purchase/delete/'+$scope.prm_id.prm_id,
        data: $scope.prm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
                $('#del').text("Cancelled");
                $('#del').removeAttr('disabled');
                $scope.purchaseList = [];
                $scope.getAll();
                $('#confirm-delete').modal('hide');
      		  
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
          $('#del').text("Cancelled");
          $('#del').removeAttr('disabled');
	    });
	};

  $scope.viewPurchaseDetails = function (index) {
    
    $scope.purchaseProductList = [];
      $scope.invoiceno = $scope.filteredTodos[index].prm_invoice_no;
      $scope.dmfirmname = $scope.filteredTodos[index].dm_firm_name;
      $scope.dmaddress = $scope.filteredTodos[index].dm_address;
      $scope.dmnumber = $scope.filteredTodos[index].dm_number;
      $scope.prmamount = $filter('number')($scope.filteredTodos[index].prm_amount, "2");
      $scope.prmdate = $filter('date')($scope.filteredTodos[index].prm_date, "mediumDate");
      $scope.prmpaymentdate = $filter('date')($scope.filteredTodos[index].prm_payment_date, "mediumDate");
      $scope.prmcredit = $scope.filteredTodos[index].prm_credit;
      $scope.prmcomment = $scope.filteredTodos[index].prm_comment;
      $scope.prmstatus = $scope.filteredTodos[index].prm_status;
      // $scope.convertNumberToWords($scope.prmamount);

      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/purchase/details/'+$scope.filteredTodos[index].prm_id,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(purchaseProductList)
      {
        var i = 1;
        purchaseProductList.forEach(function (value, key) {
              value.srno = i++;
              $scope.purchaseProductList.push(value);
            });
        // $scope.purchaseProductList = angular.copy(purchaseProductList);
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