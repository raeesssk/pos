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


		$scope.config = {
		  title: 'Products',
		  tooltips: true,
		  labels: false,
		  mouseover: function() {},
		  mouseout: function() {},
		  click: function() {},
		  legend: {
		    display: true,
		    //could be 'left, right'
		    position: 'left'
		  },
		  innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
		  lineLegend: 'lineEnd' // can be also 'traditional'
		}

	$scope.data = {
    series: ['Sales', 'Income', 'Expense'],
    data: [{
      x: "Laptops",
      y: [100, 500, 0],
      tooltip: "this is tooltip"
    }, {
      x: "Desktops",
      y: [300, 100, 100]
    }, {
      x: "Mobiles",
      y: [351]
    }, {
      x: "Tablets",
      y: [54, 0, 879]
    }]
  };

       
});