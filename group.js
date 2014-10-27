
	'use strict';
	var app = angular.module('AtWork');


	app.controller('GroupCtrl', ['$rootScope','$routeParams','$scope', '$location', 'DropDownFactory','RESTService',  'Cache',  function ($rootScope,$routeParams,$scope, $location,DropDownFactory,RESTService,  Cache) {
		   // $rootScope.selection = 'CustPage';
	        $rootScope.selection = 'GroupListPage';
	
		      var a = Cache.get('_cust');
	        var c, _limit = 20, $this = this;

	    function init() { 
    		a.grouplist = {};
    		a.grouplist.data = [];
    		
    		a.resources = {};
    		a.resources.data = [];
    		a.resources.loading = false;
    		a.selection = 'GroupListPage';
    		
    		a.grouplist.offset = 0;	
    		a.grouplist.initialized = false;
    		a.grouplist.hasMore = false;
    		a.grouplist.loading = false;
    		$scope.a = a;
    		console.log("********* In Group Ctrl init()**********");
    		$this.grouplist(); 
    	}
	this.getMoreCustlist = function() {
	    console.log("********* In Group Ctrl getcustlist()**********");
		if (a.grouplist.loading || !a.grouplist.hasMore) {
			return;
		}
		a.grouplist.offset += _limit;
		$this.grouplist();
	};
	
    $scope.customerId = ""; 
    $scope.status = "";
    $scope.isactive = "";
    $scope.priority = "";
    $scope.projectType = "";
 
 	this.grouplist = function(){  
	        console.log("**************");
			a.grouplist.loading = true;	 
			RESTService.query({'method':'data'}, {'ds':'GroupRef','limit':_limit,'offset':a.grouplist.offset},
			function(result){
					if (result.$error) {
						Logger.showAlert(result.errorMessage, result.errorTitle);
					} else {
                      	if(typeof result.data !== 'undefined') {
    						if (result.data.length > 0) {
    							a.grouplist.data.push.apply(a.grouplist.data, result.data);
    							if (result.data.length < _limit) {
    								a.grouplist.hasMore = false;
    							} else {
    								a.grouplist.hasMore = true;
    							}
    						} else {
    							a.grouplist.hasMore = false;
    							console.log("No Records found!!");
    						}
						}
						Cache.put('_grouplist', a);
					}
					a.grouplist.loading = false;
				}
			); 
	};
	$scope.title = "Create New Group";
	$scope.$watch('a.selection', function(newValue, oldValue){
		console.log(oldValue + '->' + newValue);
		//alert(newValue);
		/*
		a.patients.initialized = true;
		*/if (newValue === 'EditCustPage') {
		   // alert("getting here");
		    //resource_nameCust_nameproj_idCust_IDstatus
		     $scope.groupName = a.grouplist.current.GROUP_NAME;
            $scope.desc = a.grouplist.current.DESCRIPTION; 
	        $scope.title = "Edit Group";
	    } else if(newValue === 'GroupListPage'){
	        $scope.title = "Create New Group";
	    };
			
			
		 
	});

	
	function beforeInit(){
	a = {'pageTitle':'group list'};
	};

	if (a === undefined) {
	   	a = {'pageTitle':'group list'};
		Cache.put('_grouplist', a);
	}
    	init();
		$scope.back = function() {
		      $rootScope.selection = 'MainPage';
		      $location.path('#/projectlist');
		}
    
    $scope.groupName;
    $scope.desc;
    $scope.addNewGroup = function() {
	    var datajson = {'ds':'GroupRef','operation':'INSERT','data':
	                    {'GROUP_NAME':$scope.groupName,'DESCRIPTION':$scope.desc}
	    };
		RESTService.save({'method':'update'},datajson, function(result){
		    console.log(result);
			if (result.status === "E") {
				console.log(result.errorMsg, result.title);
			} else {
				console.log("Group Added Successfully!")
				    a.selection = 'GroupListPage';
				    	a.grouplist.data = [];
    		            $this.grouplist();
			}
		});    
	}  
	}]);
	//end of the tast list 
	