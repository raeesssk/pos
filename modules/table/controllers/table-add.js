// import admin
angular.module('table').controller('tableAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

	$scope.apiURL = $rootScope.baseURL+'/table/add';
	$scope.areaList = [];
	$scope.table = {};
	$scope.table.tm_srm_id = localStorage.getItem("pos_admin_srm_id");

	//type a head
    $scope.getSearchTable = function(vals) {

      var searchTerms = {search: vals, am_srm_id:localStorage.getItem("pos_admin_srm_id")};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("pos_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/area/typeahead/search', searchTerms, httpOptions).then((result) => {
        return result.data;
      });
    };
//end type a head

  	$scope.addTable = function () {
	    
	    if($('#tm_am_id').val() == undefined || $('#tm_am_id').val() == "" || $scope.table.tm_am_id.am_id == undefined){
	    	toastr.error('please select table area name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else if($('#tm_description').val() === undefined || $('#tm_description').val() === ""){
	    	toastr.error('please enter table name.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    } 
	    else if($('#tm_size').val() == undefined || $('#tm_size').val() == ""){
	    	toastr.error('please select table size.', 'Error', {
		        closeButton: true,
		        progressBar: true,
			  	positionClass: "toast-top-center",
			  	timeOut: "500",
			  	extendedTimeOut: "500",
		    });
	    }
	    else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $scope.table.tm_am_name = $scope.table.tm_am_id.am_name;
                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/table/checkname',
                  data: $scope.table,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length == 0){
                        $http({
					      method: 'POST',
					      url: $scope.apiURL,
					      data: $scope.table,
					      headers: {'Content-Type': 'application/json',
				                  'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
					    })
					    .success(function(table)
					    {	
					    	toastr.success('Table Added Successfully!', 'Success', {
						        closeButton: true,
						        progressBar: true,
							  	positionClass: "toast-top-center",
							  	timeOut: "500",
							  	extendedTimeOut: "500",
						    }); 
			                $('#btnsave').text("Save Tables");
			                $('#btnsave').removeAttr('disabled');
					       window.location.href = '#/';  
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
			                $('#btnsave').text("Save Tables");
			                $('#btnsave').removeAttr('disabled');
					    });
                    }
                    else{
                            toastr.warning('Table Already Exist!', 'Warning', {
						        closeButton: true,
						        progressBar: true,
							  	positionClass: "toast-top-center",
							  	timeOut: "500",
							  	extendedTimeOut: "500",
						    });      
			                $('#btnsave').text("Save Tables");
			                $('#btnsave').removeAttr('disabled');
                    	}
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
	                $('#btnsave').text("Save Tables");
	                $('#btnsave').removeAttr('disabled');
                });
		    }

	    // else{
     //            $('#btnsave').attr('disabled','true');
     //        	$('#btnsave').text("please wait...");
	    // 	$http({
		   //    method: 'POST',
		   //    url: $scope.apiURL,
		   //    data: $scope.table,
		   //    headers: {'Content-Type': 'application/json',
	    //               'Authorization' :'Bearer '+localStorage.getItem("pos_admin_access_token")}
		   //  })
		   //  .success(function(table)
		   //  {
     //            $('#btnsave').text("Save Tables");
     //            $('#btnsave').removeAttr('disabled');
		   //     window.location.href = '#/';  
		   //  })
		   //  .error(function(data) 
		   //  {   
		   //  	toastr.error('Oops, Something Went Wrong.', 'Error', {
			  //       closeButton: true,
			  //       progressBar: true,
				 //  	positionClass: "toast-top-center",
				 //  	timeOut: "500",
				 //  	extendedTimeOut: "500",
			  //   }); 
     //            $('#btnsave').text("Save Tables");
     //            $('#btnsave').removeAttr('disabled');
		   //  });
	    // }
	     
	};

});