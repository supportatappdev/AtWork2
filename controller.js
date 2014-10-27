
	'use strict';
	var app = angular.module('AtWork');

	app.controller('IndexCtrl', ['$rootScope','$scope', '$location', 'DropDownFactory','RESTService',  'Cache',  function ($rootScope,$scope, $location,DropDownFactory,RESTService,  Cache) {
	    $rootScope.selection = 'MainPage';
	    $rootScope.gohome = function() {
	         $rootScope.selection = 'MainPage';
		        $location.path('/');
	    };  
	    
	    $scope.logout = function() {
	      alert("*********");   
	    };
	}]);
	
	      