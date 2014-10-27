
	'use strict';
	var app = angular.module('AtWork');


	app.controller('RscCtrl', ['$rootScope','$routeParams','$scope', '$location', 'DropDownFactory','RESTService',  'Cache',  function ($rootScope,$routeParams,$scope, $location,DropDownFactory,RESTService,  Cache) {
		   // $rootScope.selection = 'CustPage';
	        $rootScope.selection = 'RscListPage';
	
		      var a = Cache.get('_rsclist');
	        var c, _limit = 20, $this = this;

	    function init() { 
    		a.rsclist = {};
    		a.rsclist.data = [];
    		
    		
    		
    		a.resources = {};
    		a.resources.data = [];
    		a.resources.loading = false;
    		a.selection = 'RscListPage';
    		
    		
    		a.grouplist = {};
    		a.grouplist.data = [];
    		a.grouplist.loading = false;
    		
    		a.userresources = {};
    		a.userresources.data = [];
    		a.userresources.loading = false;
    		
    		a.rsclist.offset = 0;	
    		a.rsclist.initialized = false;
    		a.rsclist.hasMore = false;
    		a.rsclist.loading = false;
    		$scope.a = a;
    		console.log("********* In Rsc Ctrl init()**********");
    		
    		if(Cache.get('_grouplist') !== null && typeof Cache.get('_grouplist') !== 'undefined') {
    		    a.grouplist = Cache.get('_grouplist').grouplist;
    		    a.grouplist.data = Cache.get('_grouplist').grouplist.data;
    		} else {
    		    console.log("********* loading groups in group resource ********");
    		    $this.grouplist();
    		    
    		}
    		
    		if(Cache.get('_resourcelist') !== null && typeof Cache.get('_resourcelist') !== 'undefined') {
    		    console.log("******** In group resource ******"+Cache.get('_resourcelist'))
    		    a.resources = Cache.get('_resourcelist').resources;
    		    a.resources.data = Cache.get('_resourcelist').resources.data;
    		} else {
    		    console.log("********* loading resources in group resource ********");
    		    $this.resourceList();
    		    
    		}
    		
    		$this.grrsclist(); 
    	    $this.getUsersAreNotResources();	
    	}
	this.getMoreCustlist = function() {
	    console.log("********* In Rsc Ctrl getcustlist()**********");
		if (a.rsclist.loading || !a.rsclist.hasMore) {
			return;
		}
		a.rsclist.offset += _limit;
		$this.grrsclist();
	};
	
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
	
	
	
	
 	this.getUsersAreNotResources = function(){  
			a.userresources.loading = true;	 
			RESTService.query({'method':'data'}, 
			{'ds':'GetUsersWhichAreNotResources','limit':_limit,'offset':a.rsclist.offset, 'executeCountSql': 'N'},
			function(result){
					if (result.$error) {
						Logger.showAlert(result.errorMessage, result.errorTitle);
					} else {
                        console.log(result.data);
						if (result.data.length > 0) {
							a.userresources.data.push.apply(a.userresources.data, result.data);
							/*if (result.data.length < _limit) {
								a.resources.hasMore = false;
							} else {
								a.resources.hasMore = true;
							}*/
						} else {
						//	a.resources.hasMore = false;
							console.log("No Records found!!");
						}
						Cache.put('_usernotresource', a);
					}
					a.userresources.loading = false;
				}
			); 
	};
	
	
 	this.resourceList = function(){  
	        console.log("**************");
			a.resources.loading = true;	 
			RESTService.query({'method':'data'}, 
			{'ds':'RscRef','limit':_limit,'offset':a.rsclist.offset, 'executeCountSql': 'N'},
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
						Cache.put('_resourcelist', a);
					}
					a.resources.loading = false;
				}
			); 
	};
	
 	this.grrsclist = function(){  
	        console.log("**************");
			a.rsclist.loading = true;	 
			RESTService.query({'method':'data'}, {'ds':'GetRsrcGroupRef','limit':_limit,'offset':a.rsclist.offset},
			function(result){
					if (result.$error) {
						Logger.showAlert(result.errorMessage, result.errorTitle);
					} else {
                      	if(typeof result.data !== 'undefined') {
    						if (result.data.length > 0) {
    							a.rsclist.data.push.apply(a.rsclist.data, result.data);
    							if (result.data.length < _limit) {
    								a.rsclist.hasMore = false;
    							} else {
    								a.rsclist.hasMore = true;
    							}
    						} else {
    							a.rsclist.hasMore = false;
    							console.log("No Records found!!");
    						}
						}
						Cache.put('_rsclist', a);
					}
					a.rsclist.loading = false;
				}
			); 
	};
	$scope.title = "Add Resource";
	$scope.$watch('a.selection', function(newValue, oldValue){
		console.log(oldValue + '->' + newValue);
		//alert(newValue);
		/*
		a.patients.initialized = true;
		*/if (newValue === 'EditCustPage') {
		   // alert("getting here");
		    //resource_nameCust_nameproj_idCust_IDstatus
		     $scope.groupId = a.rsclist.current.GROUP_ID;
            $scope.rscId = a.rsclist.current.RSRC_ID; 
	        $scope.title = "Edit Resource";
	    } else if(newValue === 'RscListPage'){
	        $scope.title = "Add Resource";
	    };
			
			
		 
	});

	
	function beforeInit(){
	a = {'pageTitle':'rsc list'};
	};

	if (a === undefined) {
	   	a = {'pageTitle':'rsc list'};
		Cache.put('_rsclist', a);
	}
    	init();
		$scope.back = function() {
		      $rootScope.selection = 'MainPage';
		      $location.path('#/projectlist');
		}
    
    $scope.groupId;
    $scope.userId;
    $scope.addNewGroup = function() {
        
	    
	    var datajson = {'ds':'RscRef','operation':'INSERT','data':
	                    {'user_id':$scope.userId, 'isGenIds':"Y"}
	    };
		RESTService.save({'method':'update'},datajson, function(result){
		    console.log(result);
			if (result.status === "E") {
				console.log(result.errorMsg, result.title);
			} else {
				console.log("Resource Added Successfully!")
				var genIds = result.ids;
				//alert(genIds[0]);
            	    var datajson = {'ds':'RscGroupsRef','operation':'INSERT','data':
	                    {'RSRC_ID':genIds,'GROUP_ID':$scope.groupId}
	                  };
            		RESTService.save({'method':'update'},datajson, function(result){
            		    console.log(result);
            			if (result.status === "E") {
            				console.log(result.errorMsg, result.title);
            			} else {
            				console.log("Added Group Resource Successfully!")
            				    a.selection = 'RscListPage';
            				    	a.rsclist.data = [];
                		            $this.grrsclist();
            			}
            		}); 
			}
		});
	}  
	}]);
	//end of the tast list 
	