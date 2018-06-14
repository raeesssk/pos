 angular.module('dinein').controller('bookListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

 	$scope.loading1=0;
    $rootScope.tableList = [];
    // $scope.isreserved = 0;
	$scope.getAll = function () {
        
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
	      $scope.loading1=1;
        $scope.$apply();

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
    

    


    $scope.getid = function (table) {
    	// $("#"+id).removeClass('color');
    	// $("#"+id).addClass('btn-success');

    	
    $rootScope.table = table;
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
			    		$("#"+table.tm_id).removeClass('color');
			    		$("#"+table.tm_id).addClass('btn-success');
		    			$scope.tableList=[];
			    		
			    			 
			    		
		    		
			    		
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
    	else{

    		/*$http({
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
			    });*/

			    			window.location.href = '#/order/add';


    	}

    	};


    });

