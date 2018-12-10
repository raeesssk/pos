// import admin
angular.module("admin").controller('dashboardCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

	$('#navbar_hide').show();
	$('#sidebar_hide').show();

	// $scope.myJson = {
	//     type : 'bar',
	//     series : [
	//       { values : ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'] }
	//     ]
	// };

	$scope.limit={};
  $scope.monthlyreport = {};
	 $scope.srm_id = localStorage.getItem("pos_admin_srm_id");
	
    $scope.getAll = function () {
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/dashboard/salereport/'+$scope.srm_id,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(report)
      {
        report.forEach(function (value, key) {
          if(value.amount == null)
          {
            value.amount = 0;
          }
            
        	$scope.limit=value;
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

   $scope.getAll();

   $scope.getMonthly = function () {
      
      $scope.limit.from_date = $('#user-datepicker-from').val();
      $scope.limit.to_date = $('#user-datepicker-to').val();
      $scope.limit.srm_id = localStorage.getItem("pos_admin_srm_id");
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/dashboard/monthlyreport',
        data: $scope.limit,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
      })
      .success(function(report)
      {
        report.forEach(function (value, key) {
          $scope.reportListmonthly=value;
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

   $scope.check=function(){
      $scope.toDate = $("#user-datepicker-to").val();
    $scope.fromDate = $("#user-datepicker-from").val();
    if(angular.isUndefined($scope.fromDate) || $scope.fromDate === null || $scope.fromDate == "")
      {
         var dialog = bootbox.dialog({
          message: '<p class="text-center">please select from-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }

      if(angular.isUndefined($scope.toDate) || $scope.toDate === null || $scope.toDate == "")
      {
          var dialog = bootbox.dialog({
          message: '<p class="text-center">please select to-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }

      $scope.dateFilter = '&startTime='+ $scope.fromDate + '&endTime=' + $scope.toDate;

      
      $scope.fDate = new Date($scope.fromDate);
      $scope.fDate.setHours(0,0,0,0);
      $scope.tDate = new Date($scope.toDate);
      $scope.tDate.setHours(0,0,0,0);
      if($scope.fDate > $scope.tDate)
      {
          var dialog = bootbox.dialog({
          message: '<p class="text-center">oops!!! to-date greater than from-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }
      $scope.getMonthly();
    };

    Date.prototype.setFromDate = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     if(mm == 0){
      document.getElementById("user-datepicker-from").value = yyyy-1 +"-"+ ("12") +"-"+ (dd[1]?dd:"0"+dd[0]);
     }
     else if(mm==2||mm==4||mm==6||mm==7||mm==9||mm==11){
      document.getElementById("user-datepicker-from").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd-1:"0"+dd[0]);
     }
     else{
      document.getElementById("user-datepicker-from").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
     }
    };

    Date.prototype.setToDate = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     document.getElementById("user-datepicker-to").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
     $scope.check();
    };

    d = new Date();
    d.setFromDate();
    d.setToDate();
       
});