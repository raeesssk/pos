// import admin
angular.module('purcashbook').controller('purcashbookCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {
  
  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.purcashbookList = [];
    $scope.loading1 = 0;
    
   $scope.getAll = function () {
        
      $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/purcashbook',
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(expense)
	    {
	      expense.forEach(function (value, key) {
                  $scope.purcashbookList.push(value);
              });

              $scope.$watch("currentPage + numPerPage",
                  function () {
                      var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                      var end = begin + $scope.numPerPage;
                      $scope.filterUserend = begin + 1;
                      $scope.filterUser = end;
                      if ($scope.filterUser >= $scope.purcashbookList.length)
                          $scope.filterUser = $scope.purcashbookList.length;
                      $scope.filteredTodos = $scope.purcashbookList.slice(begin, end);
                  });
              $scope.obj_Main = $scope.purcashbookList;
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
        if ($scope.filterUser >= $scope.purcashbookList.length)
            $scope.filterUser = $scope.purcashbookList.length;
        $scope.filteredTodos = $scope.purcashbookList.slice(begin, end);
    };
    //search Data
    $scope.getSearch = function () {
        $scope.searchtext = $("#searchtext").val();
        $scope.purcashbookList = [];
        if ($scope.searchtext !== "") {
            for (var i = 0; i < $scope.obj_Main.length; i++) {
                if (String($scope.obj_Main[i].dm_firm_name).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].dm_number).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].dm_address).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].pcm_payment_mode).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].pcm_received_by).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].pcm_comment).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].pcm_amount).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($scope.obj_Main[i].pcm_cheque_no).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($filter('date')($scope.obj_Main[i].pcm_date, "mediumDate")).toLowerCase().includes($scope.searchtext.toLowerCase())
                    || String($filter('date')($scope.obj_Main[i].pcm_cheque_date, "mediumDate")).toLowerCase().includes($scope.searchtext.toLowerCase())
                ) {
                    $scope.purcashbookList.push($scope.obj_Main[i]);
                }
            }
        }
        else {
            $scope.purcashbookList = [];
            $scope.purcashbookList = $scope.obj_Main;
        }
        $scope.resetpagination();
        $scope.$apply();
    };

    $scope.deletePurcashbook = function (pcm_id) {
      $scope.pcm_id=pcm_id;
    }  

    $scope.deleteConfirm = function () {
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/purcashbook/delete/'+$scope.pcm_id.pcm_id,
        data: $scope.pcm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
                $scope.purcashbookList = [];
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
	    });
	};

});