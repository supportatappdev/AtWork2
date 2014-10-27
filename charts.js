//do something
app.controller('ChartsCtrl', ['ChartAPI','$rootScope','$scope', '$location', 'DropDownFactory','RESTService',  'Cache',  function (ChartAPI,$rootScope,$scope, $location,DropDownFactory,RESTService,  Cache) {
	    $rootScope.selection = 'MainPage1';
	    //load chart
		$scope.linechartload = false;
		$this = this;
		ChartAPI.areaChart('chart_div1');
	         
	    ChartAPI.barChart('chart_div2');
	   
        /*ChartAPI.candleStick('chart_div3');
		ChartAPI.gaugeChart('chart_div4');
		ChartAPI.geoChart('chart_div5');
		ChartAPI.lineChart('chart_div6');
        ChartAPI.pieChart('chart_div7');*/
        
        this.lineChart = function(){  
	        console.log("*******Render line chart*******");
			linechartload = true;	 
			RESTService.query({'method':'data'}, {'ds':'GetOpenCloseIssuesV','limit':100,'offset':0},
			function(result){
					if (result.$error) {
						Logger.showAlert(result.errorMessage, result.errorTitle);
					} else {
                      	if(typeof result.data !== 'undefined') {
    						if (result.data.length > 0) {
    						    ChartAPI.lineChart('chart_div',result.data);
    		                    linechartload = false;				
    						} 
                      	} 
					}});
        }
					
		$this.lineChart();			
	}]);
	  