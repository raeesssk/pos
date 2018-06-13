// import admin
 angular.module('order').controller('orderListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {


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

 //   //Pagination Function
 //    $scope.resetpagination = function () {
 //        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
 //        var end = begin + $scope.numPerPage;
 //        $scope.filterUserend = begin + 1;
 //        $scope.filterUser = end;
 //        if ($scope.filterUser >= $scope.dealerList.length)
 //            $scope.filterUser = $scope.dealerList.length;
 //        $scope.filteredTodos = $scope.dealerList.slice(begin, end);
 //    };
 //    //search Data
 //    $scope.getSearch = function () {
 //        $scope.searchtext = $("#searchtext").val();
 //        $scope.dealerList = [];
 //        if ($scope.searchtext !== "") {
 //            for (var i = 0; i < $scope.obj_Main.length; i++) {
 //                if (String($scope.obj_Main[i].dm_firm_name).toLowerCase().includes($scope.searchtext.toLowerCase())
 //                    || String($scope.obj_Main[i].dm_number).toLowerCase().includes($scope.searchtext.toLowerCase())
 //                    || String($scope.obj_Main[i].dm_address).toLowerCase().includes($scope.searchtext.toLowerCase())
 //                    || String($scope.obj_Main[i].dm_credit).toLowerCase().includes($scope.searchtext.toLowerCase())
 //                    || String($scope.obj_Main[i].dm_debit).toLowerCase().includes($scope.searchtext.toLowerCase())
 //                ) {
 //                    $scope.dealerList.push($scope.obj_Main[i]);
 //                }
 //            }
 //        }
 //        else {
 //            $scope.dealerList = [];
 //            $scope.dealerList = $scope.obj_Main;
 //        }
 //        $scope.resetpagination();
 //        $scope.$apply();
 //    };

 //    $scope.deleteDealer = function (dm_id) {
 //      $scope.dm_id=dm_id;
 //    }  

 //    $scope.deleteConfirm = function () {
 //                $('#del').attr('disabled','true');
 //              $('#del').text("please wait...");
  //      $http({
  //       method: 'POST',
 //        url: $rootScope.baseURL+'/dealer/delete/'+$scope.dm_id,
  //       headers: {'Content-Type': 'application/json',
 //                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
  //     })
  //     .success(function(customerObj)
  //     {
 //                $('#del').text("Delete");
 //                $('#del').removeAttr('disabled');
 //                $scope.dealerList = [];
 //                $scope.getAll();
 //                $('#confirm-delete').modal('hide');
            
  //     })
  //     .error(function(data) 
  //     {   
 //          toastr.error('Oops, Something Went Wrong.', 'Error', {
 //              closeButton: true,
 //              progressBar: true,
 //            positionClass: "toast-top-center",
 //            timeOut: "500",
 //            extendedTimeOut: "500",
 //          });    
 //          $('#del').text("Delete");
 //          $('#del').removeAttr('disabled');
  //     });
  // };

 //  $scope.dealerDetails = function (index) {
 //      $scope.dname = $scope.filteredTodos[index].dm_firm_name;
 //      $scope.dno = $scope.filteredTodos[index].dm_number;
 //      $scope.dadd = $scope.filteredTodos[index].dm_address;
 //      $scope.dcredit = $scope.filteredTodos[index].dm_credit;
 //      $scope.ddebit = $scope.filteredTodos[index].dm_debit;
 //      $scope.dopeningcredit = $scope.filteredTodos[index].dm_opening_credit;
 //      $scope.dopeningdebit = $scope.filteredTodos[index].dm_opening_debit;

 //      $scope.dealerdetailsList =[];
 //      $http({
 //        method: 'GET',
 //        url: $rootScope.baseURL+'/dealer/details/'+$scope.filteredTodos[index].dm_id,
 //        headers: {'Content-Type': 'application/json',
 //                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
 //      })
 //      .success(function(dealerdetailsList)
 //      {
 //        // $scope.dealerdetailsList = angular.copy(dealerdetailsList);
 //        var amount_balance = 0;
 //        if($scope.dopeningcredit !=0){
 //          amount_balance = parseInt(amount_balance) + $scope.dopeningcredit;
 //          $scope.dealerdetailsList = [{"credit":$scope.dopeningcredit , "debit":$scope.dopeningdebit , "drcr":"CR", "bal":amount_balance , "date":"" , "invoice":"" , "status":"Opening Balance" , "type":"Opening"}];
 //        }
 //        else if($scope.dopeningdebit !=0){
 //          amount_balance = parseInt(amount_balance) - $scope.dopeningdebit;
 //          $scope.dealerdetailsList = [{"credit":$scope.dopeningcredit , "debit":$scope.dopeningdebit , "drcr":"DR", "bal": Math.abs(amount_balance) , "date":"" , "invoice":"" , "status":"Opening Balance" , "type":"Opening"}];
 //        }

 //          dealerdetailsList.forEach(function (value, key) {

 //            $scope.data = new Date(value.date);
 //            if(value.credit == 0)
 //            {
 //              amount_balance = parseInt(amount_balance) - parseInt(value.debit);
 //            }
 //            else if(value.debit == 0)
 //            {
 //              amount_balance = parseInt(amount_balance) + parseInt(value.credit);
 //            }
 //            if(amount_balance < 0)
 //            {
 //              Math.abs(amount_balance);
 //            value.bal = Math.abs(amount_balance);
 //              value.drcr="DR";
 //            }
 //            else{
 //              value.drcr="CR";
 //              value.bal = amount_balance;
 //            }
 //            if($scope.fDate <= $scope.data && $scope.tDate >= $scope.data)
 //            {
 //              $scope.dealerdetailsList.push(value);
 //            }
 //            else if($('#user-datepicker-from').val() == "" && $('#user-datepicker-to').val() == "")  
 //            {
 //              $scope.dealerdetailsList.push(value);
 //            }
 //          });
 //          // $('#filter-user-btn').text("Filter");
 //          // $('#filter-user-btn').removeAttr('disabled');
 //          // $('#reset-user-btn').text("Reset");
 //          // $('#reset-user-btn').removeAttr('disabled');
 //      })
 //      .error(function(data) 
 //      {
 //        toastr.error('Oops, Something Went Wrong.', 'Error', {
 //          closeButton: true,
 //          progressBar: true,
 //          positionClass: "toast-top-center",
 //          timeOut: "500",
 //          extendedTimeOut: "500",
 //        });
 //      });

 //    };

  





});