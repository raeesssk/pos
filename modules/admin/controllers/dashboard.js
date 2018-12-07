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
       
});