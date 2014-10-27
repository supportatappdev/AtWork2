
//var app = angular.module('AtWork', ['chartsapi']);

app.service('ChartAPI', function(chartsapi) {
    
    
    this.lineChart = function(divid,_innserData){
    	var labels = ['Date', 'Open', 'Closed'];
    	var values = [];
    	values[0] = labels;
    	console.log("********* In Chart API Line Chart**********")
    	console.log(_innserData)
		for(var counter = 0; counter < _innserData.length; counter++) {
    		values[counter+1] = [_innserData[counter].dt,_innserData[counter].open,_innserData[counter].closed];
    	}
    	console.log(values)
    	var options = {
    					title: 'Open vs Closed',
						hAxis: {title: 'Date', titleTextStyle: {color: 'red'}}
					  };
	 	chartsapi.lineChart(divid,values,options);
    }

    this.areaChart = function(divid){
    	var labels = ['Year', 'Sales', 'Expenses'];
    	var values = [];
    	values[0] = labels;
    	var _innserData = [['2004',  1000,      400],
						          ['2005',  1170,      460],
						          ['2006',  660,       1120],
						          ['2007',  1030,      540]];
		for(var counter =0; counter < _innserData.length; counter++) {
    		values[counter+1] = _innserData[counter];
    	}
    	var options = {
    					title: 'Company Performance',
						hAxis: {title: 'Year', titleTextStyle: {color: 'red'}}
					  };
	 	chartsapi.areaChart(divid,values,options);
    }

    this.barChart = function(divid){
    	var labels = ['Year', 'Sales', 'Expenses'];
    	var values = [];
    	values[0] = labels;
    	var _innserData = [['2004',  1000,      400],
						          ['2005',  1170,      460],
						          ['2006',  660,       1120],
						          ['2007',  1030,      540]];
		for(var counter =0; counter < _innserData.length; counter++) {
    		values[counter+1] = _innserData[counter];
    	}
    	var options = {
    					title: 'Company Performance',
						hAxis: {title: 'Year', titleTextStyle: {color: 'red'}}
					  };
	 	chartsapi.barChart(divid,values,options);
    }
    this.candleStick = function(divid){
    	//var labels = ['Year', 'Sales', 'Expenses'];
    	var values = [];
    	//values[0] = labels;
    	var _innserData = [  ['Mon', 20, 28, 38, 45],
          ['Tue', 31, 38, 55, 66],
          ['Wed', 50, 55, 77, 80],
          ['Thu', 77, 77, 66, 50],
          ['Fri', 68, 66, 22, 15]];
		for(var counter =0; counter < _innserData.length; counter++) {
    		values[counter] = _innserData[counter];
    	}
    	var options = {
          legend:'none'
        };

	 	chartsapi.candleStickChart(divid,values,options);
    }
    this.gaugeChart = function(divid){
    	//var labels = ['Year', 'Sales', 'Expenses'];
    	var values = [];
    	//values[0] = labels;
    	var _innserData = [  
          ['Label', 'Value'],
          ['Memory', 80],
          ['CPU', 55],
          ['Network', 68]];
		for(var counter =0; counter < _innserData.length; counter++) {
    		values[counter] = _innserData[counter];
    	}
    	  var options = {
          width: 400, height: 120,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5
        };


	 	chartsapi.gaugeChart(divid,values,options);
    }
this.geoChart = function(divid){
    	//var labels = ['Year', 'Sales', 'Expenses'];
    	var values = [];
    	//values[0] = labels;
    	var _innserData = [  
          ['Country', 'Popularity'],
          ['Germany', 200],
          ['United States', 300],
          ['Brazil', 400],
          ['Canada', 500],
          ['France', 600],
          ['RU', 700]];
		for(var counter =0; counter < _innserData.length; counter++) {
    		values[counter] = _innserData[counter];
    	}
    	   var options = {};


	 	chartsapi.geoChart(divid,values,options);
    }/*
    this.lineChart = function(divid,data){
    	var labels = ['Date', 'Open', 'Closed'];
    	var values = [];
    	values[0] = labels;
    	/*var _innserData = [  
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540]];
		for(var counter =0; counter < data.length; counter++) {
		    var item = data[counter];
		    var _inData = [item.dt,item.open,item.closed];
		  	values[counter+1] = _inData;
    	}
    	     var options = {
          title: 'Open vs Closed'
        };


	 	chartsapi.lineChart(divid,values,options);
    }*/
    this.pieChart = function(divid){
    	var labels =  ['Task', 'Hours per Day'];
    	var values = [];
    	values[0] = labels;
    	var _innserData = [  
         ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]];
		for(var counter =0; counter < _innserData.length; counter++) {
    		values[counter+1] = _innserData[counter];
    	}
    	  var options = {
          title: 'My Daily Activities',
          is3D: true,
        };


	 	chartsapi.pieChart(divid,values,options);
    }
});

