
	'use strict';
	var app = angular.module('AtWork');

/*	app.controller('IndexCtrl', ['$rootScope','$scope', '$location', 'DropDownFactory','RESTService',  'Cache',  function ($rootScope,$scope, $location,DropDownFactory,RESTService,  Cache) {
	    $rootScope.selection = 'MainPage';
	}]);
	*/
	  
	// get project list 
	app.controller('ProjListCtrl', ['$window', '$rootScope','$scope', '$location', 'DropDownFactory','RESTService',  'Cache',  function ($window,$rootScope,$scope, $location,DropDownFactory,RESTService,  Cache) {
	$scope.selectedItems = [];
    $scope.selectAll = function(){
        $scope.selectedItems = [];
    }
    
    $scope.unCheckAll = function(){
      $scope.selectedItems = [];
    }
	
	$scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();
    
    $scope.clear = function () {
        $scope.dt = null;
    };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

   // $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.initDate = new Date('12/12/2014');
  $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
		   
		   
		   
		    var a = Cache.get('_projlist');
	        var c, _limit = 20, $this = this;

		    $rootScope.selection = 'ProjListPage';
		    $scope.projselection = 'ProjList';	    
	    function init() { 
    		a.projlist = {};
    		a.projlist.data = [];
    		a.selection = 'ProjList';
    		$scope.projselection = 'ProjList';	    
    		a.projlist.offset = 0;	
    		a.projlist.initialized = false;
    		a.projlist.hasMore = false;
    		a.projlist.loading = false;
    		a.customers = {};
    		a.customers.loading = false;
    		    a.customers.data = [];
    		if(Cache.get('_custlist') !== null && typeof Cache.get('_custlist') !== 'undefined') {
    		    a.customers = Cache.get('_custlist').custlist;
    		    if(typeof Cache.get('_custlist').data !== 'undefined') {
    		        a.customers.data = Cache.get('_custlist').custlist.data;
    		    }
    		} else {
    		    $this.customerList();
    		}
    		
    		$scope.a = a;
    		console.log("********* In Project Ctrl init()**********");
    		$this.projList(); 
    	}
	this.getMoreProjList = function() {
	    console.log("********* In Project Ctrl getProjList()**********");
		if (a.projlist.loading || !a.projlist.hasMore) {
			return;
		}
		a.projlist.offset += _limit;
		$this.projList();
	};  

    $scope.projectName = ""; 
    $scope.status = "";
    $scope.isactive = "";
    $scope.priority = "";
    $scope.projectId = "";
    $scope.projectType = "";
    $scope.completionDate = "";
    $scope.projectStartDate = "";
    $scope.actualCompletionDate = "";
 $scope.createprojectitle = 'Create New Project';
    $scope.$watch('projselection', function(newValue, oldValue){
		console.log(oldValue + '->' + newValue);
		//alert(newValue);
		/*
		a.patients.initialized = true;
		*/if (newValue === 'EditProjectPage') {
			$scope.projectName =a.projlist.current.PROJECT_NAME;
			$scope.status = a.projlist.current.status;
	        $scope.isactive = a.projlist.current.IS_ACTIVE;
	        $scope.projectId = a.projlist.current.proj_id;
	        $scope.priority = a.projlist.current.PRIORITY;
	        $scope.customerId = a.projlist.current.CUSTOMER_ID;
            $scope.completionDate = a.projlist.current.COMPLETION_DATE;
            $scope.projectStartDate = a.projlist.current.PROJECT_START_DATE;
            $scope.actualCompletionDate = a.projlist.current.ACTUAL_COMPLETION_DATE;
            $scope.projectType = a.projlist.current.PROJECT_TYPE;
	        $scope.createprojectitle = 'Edit Project';
	    } else if(newValue ==='NewProj'){
	        $scope.createprojectitle = 'Create New Project';
	        };
	});
	
	
 	this.customerList = function(){  
	        console.log("**************");
			a.customers.loading = true;	 
			RESTService.query({'method':'data'}, 
			{'ds':'CustRef','limit':_limit,'offset':a.projlist.offset, 'executeCountSql': 'N'},
			function(result){
					if (result.$error) {
						Logger.showAlert(result.errorMessage, result.errorTitle);
					} else {
                        console.log(result.data);
						if (result.data.length > 0) {
							a.customers.data.push.apply(a.customers.data, result.data);
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
					a.customers.loading = false;
				}
			); 
	};
	
	
	this.projList = function(){  
	        console.log("**************");
			a.projlist.loading = true;	 
			RESTService.query({'method':'data'}, {'ds':'GetCustProjRef','limit':_limit,'offset':a.projlist.offset, 'executeCountSql': 'N'},
			function(result){
					if (result.$error) {
						Logger.showAlert(result.errorMessage, result.errorTitle);
					} else {
                        console.log(result.data);
						if (result.data.length > 0) {
							a.projlist.data.push.apply(a.projlist.data, result.data);
							if (result.data.length < _limit) {
								a.projlist.hasMore = false;
							} else {
								a.projlist.hasMore = true;
							}
						} else {
							a.projlist.hasMore = false;
							console.log("No Records found!!");
						}
						Cache.put('_projlist', a);
					}
					a.projlist.loading = false;
				}
			);
	};
	
	function beforeInit(){
	a = {'pageTitle':'ProjList'};
	};

	if (a === undefined) {
	   	a = {'pageTitle':'ProjList'};
		Cache.put('_projlist', a);
	}
  
	init();

/*	$scope.userName = Session.get().displayName;
	$scope.session = Session.get();
	$scope.pageTitle = "";*/
	/*$scope.$watch('a.selection', function(newValue, oldValue){
		Logger.log(oldValue + '->' + newValue);
		if (newValue === 'Updates') {
			$scope.pageTitle = 'Recent Updates';
		} 
	});*/


		    $scope.back = function() {
		        $rootScope.selection = 'MainPage';
		        $location.path('/');
		    }
  	$scope.addNewProject = function() {
	  //alert($scope.completionDate);
	  var projId = $scope.projectId;
	    //alert(projId);
	    var datajson = {'ds':'ProjRef','operation':'INSERT',
	                      'data':{'PROJECT_NAME':$scope.projectName,
	                            'status':$scope.status,
	                             'IS_ACTIVE':$scope.isactive,
	                            'PROJECT_TYPE':$scope.projectType,
	                            'PRIORITY':$scope.priority,
	                            'COMPLETION_DATE':$scope.completionDate,
	                            'PROJECT_START_DATE':$scope.projectStartDate,
	                            'ACTUAL_COMPLETION_DATE':$scope.actualCompletionDate     
	                            }
                        };
         if(projId) { 
             datajson.operation = 'UPDATE';
             datajson.data.ID = projId;
             datajson.data.custUpdate  = "Y"; 
         }  else {
             datajson.data.isGenIds = "Y"; 
         }
         console.log("Printing...datajson");
         console.log(datajson);
         
		RESTService.save({'method':'update'},datajson, function(result){
		    console.log(result);
			if (result.status === "E") {
				console.log(result.errorMsg, result.title);
			} else {
			        if($scope.projectId) {
    			    
			          console.log("Project Updated Successfull!");
			            a.projlist.data = [];
        	            $this.projList();
        		        $scope.projselection = 'ProjList';	    
			      }else {
			          	var genIds = result.ids;
    			        var datajson = {'ds':'CustProjRef','operation':'INSERT','data':
    	                    {'PROJECT_ID':genIds[0],'CUSTOMER_ID':$scope.customerId}
                	    };
                		RESTService.save({'method':'update'},datajson, function(result){
                    	console.log("Project Added Successfully!")
        	            a.projlist.data = [];
        	            $this.projList();
        		        $scope.projselection = 'ProjList';	    
    			    });
			      }
			}
		});

	}  
	
	}]);