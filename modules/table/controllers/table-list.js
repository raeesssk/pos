// import admin
angular.module('table').controller('tableListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

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
    $scope.tableList = [];
    $scope.tableListcount=0;
    $scope.limit={};
    $scope.loading1 = 0;
$scope.apiURL = $rootScope.baseURL+'/table/table/total';

  var permission=JSON.parse(localStorage.getItem('permission'));
  var value = '#/table';
  var access = permission.includes(value);
    $scope.getrolepermission=function(){
        if(access)
        {
          return true;
        }
        else
        {
          var dialog = bootbox.dialog({
          message: '<p class="text-center">You Are Not Authorized</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
          $location.path('/');
        }
          
    };
    $scope.getrolepermission();

   $scope.getAll = function () {
        if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
        $scope.limit.search = "";
      }
      else{
        $scope.limit.search = $scope.searchtext;
      }
      $scope.limit.tm_srm_id = localStorage.getItem("pos_admin_srm_id");
      console.log($scope.limit);
      $http({
	      method: 'POST',
	      url: $scope.apiURL,
        data: $scope.limit,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(category)
	    {
	      category.forEach(function (value, key) {
                  $scope.tableListcount=value.total;
              });

              $scope.$watch("currentPage + numPerPage",
                  function () {
                    $scope.resetpagination();
                  });

              
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
        if ($scope.filterUser >= $scope.tableListcount)
            $scope.filterUser = $scope.tableListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/table/table/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
              })
              .success(function(table)
              {
                $scope.filteredTodos = [];
                if (table.length > 0) {
                 
                  table.forEach(function (value, key) {
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

    $scope.deleteTable = function (tm_id) {
      $scope.tm_id=tm_id;
    }  

    $scope.deleteConfirm = function () {
                $('#del').attr('disabled','true');
              $('#del').text("please wait...");
	     $http({
	      method: 'POST',
        url: $rootScope.baseURL+'/table/delete/'+$scope.tm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                $scope.tableList = [];
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
          $('#del').text("Delete");
          $('#del').removeAttr('disabled');        
	    });
	};

});