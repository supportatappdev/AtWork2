
	'use strict';
	var app = angular.module('AtWork');


	app.controller('CustCtrl', ['$rootScope','$routeParams','$scope', '$location', 'DropDownFactory','RESTService',  'Cache',  function ($rootScope,$routeParams,$scope, $location,DropDownFactory,RESTService,  Cache) {
		   // $rootScope.selection = 'CustPage';
	        $rootScope.selection = 'CustListPage';
	
		      var a = Cache.get('_cust');
	        var c, _limit = 20, $this = this;

	    function init() { 
    		a.custlist = {};
    		a.custlist.data = [];
    		
    		a.resources = {};
    		a.resources.data = [];
    		a.resources.loading = false;
    		a.selection = 'CustListPage';
    		
    		a.custlist.offset = 0;	
    		a.custlist.initialized = false;
    		a.custlist.hasMore = false;
    		a.custlist.loading = false;
    		$scope.a = a;
    		console.log("********* In Cust Ctrl init()**********");
    		$this.custlist(); 
    	}
	this.getMoreCustlist = function() {
	    console.log("********* In Cust Ctrl getcustlist()**********");
		if (a.custlist.loading || !a.custlist.hasMore) {
			return;
		}
		a.custlist.offset += _limit;
		$this.custlist();
	};  
$scope.customerId = ""; 
    $scope.status = "";
    $scope.isactive = "";
    $scope.priority = "";
    $scope.projectType = "";
 
 	this.custlist = function(){  
	        console.log("**************");
			a.custlist.loading = true;	 
			RESTService.query({'method':'data'}, {'ds':'CustRef','limit':_limit,'offset':a.custlist.offset},
			function(result){
					if (result.$error) {
						Logger.showAlert(result.errorMessage, result.errorTitle);
					} else {
                      	if(typeof result.data !== 'undefined') {
    						if (result.data.length > 0) {
    							a.custlist.data.push.apply(a.custlist.data, result.data);
    							if (result.data.length < _limit) {
    								a.custlist.hasMore = false;
    							} else {
    								a.custlist.hasMore = true;
    							}
    						} else {
    							a.custlist.hasMore = false;
    							console.log("No Records found!!");
    						}
						}
						Cache.put('_custlist', a);
					}
					a.custlist.loading = false;
				}
			); 
	};
	$scope.createcusttitle = "Create New Customer";
	$scope.$watch('a.selection', function(newValue, oldValue){
		console.log(oldValue + '->' + newValue);
		//alert(newValue);
		/*
		a.patients.initialized = true;
		*/if (newValue === 'EditCustPage') {
		   // alert("getting here");
		    //resource_nameCust_nameproj_idCust_IDstatus
		     $scope.fullName = a.custlist.current.FULL_NAME;
            $scope.type = a.custlist.current.TYPE_ID; 
            $scope.custgroup = a.custlist.current.GROUP_ID;
            $scope.territoryid = a.custlist.current.TERRITORY_ID;
            $scope.currency = a.custlist.current.CURRENCY_ID;
            $scope.tac = a.custlist.current.TAX_AND_CHARGES_ID;
	        $scope.createcusttitle = "Edit Customer";
	    } else if(newValue === 'CustListPage'){
	        $scope.createcusttitle = "Create New Customer";
	    };
			
			
		 
	});

	
 	this.resourceList = function(){  
	        console.log("**************");
			a.resources.loading = true;	 
			RESTService.query({'method':'data'}, 
			{'ds':'RscRef','limit':_limit,'offset':a.custlist.offset, 'executeCountSql': 'N'},
			function(result){
					if (result.$error) {
						Logger.showAlert(result.errorMessage, result.errorTitle);
					} else {
                        console.log(result.data);
						if (result.data.length > 0) {
							a.resources.data.push.apply(a.resources.data, result.data);
							/*if (result.data.length < _limit) {
								a.resources.hasMore = false;
							} else {
								a.resources.hasMore = true;
							}*/
						} else {
						//	a.resources.hasMore = false;
							console.log("No Records found!!");
						}
						Cache.put('_custlist', a);
					}
					a.resources.loading = false;
				}
			); 
	};
	
	function beforeInit(){
	a = {'pageTitle':'custlist'};
	};

	if (a === undefined) {
	   	a = {'pageTitle':'custlist'};
		Cache.put('_custlist', a);
	}
  
	init();
		    $scope.back = function() {
		         
		        $rootScope.selection = 'MainPage';
		        $location.path('#/projectlist');
		    }
    
    $scope.fullName;
    $scope.type;
    $scope.custgroup;
    $scope.territoryid;
    $scope.currency;
    $scope.tac;
    $scope.addNewCust = function() {
	   console.log("*********343434*****"+$scope.CustName);
		/*
		FULL_NAME	String	05-07-2014 16:40	
3	TYPE_ID	Integer	05-07-2014 16:40	
4	GROUP_ID	Integer	05-07-2014 16:40	
5	TERRITORY_ID	Integer	05-07-2014 16:40	
6	CUST_DETAILS	String	05-07-2014 16:40	
7	CURRENCY_ID	Integer	05-07-2014 16:40	
8	TAX_AND_CHARGES_ID
		fullName type custgroup territoryid currency pricelist creditd tac
		*/
	    var datajson = {'ds':'CustRef','operation':'INSERT','data':
	                    {'FULL_NAME':$scope.fullName,'TYPE_ID':$scope.type,
	                    'GROUP_ID':$scope.custgroup,'TERRITORY_ID':$scope.territoryid,'CURRENCY_ID':$scope.currency, 'TAX_AND_CHARGES_ID':$scope.tac}
	    };
		RESTService.save({'method':'update'},datajson, function(result){
		    console.log(result);
			if (result.status === "E") {
				console.log(result.errorMsg, result.title);
			} else {
				console.log("Cust Added Successfully!")
				    a.selection = 'CustListPage';
				    	a.custlist.data = [];
    		        $this.custlist();
			}
		});    

	}  
	   
		    
	}]);
	//end of the tast list 
	