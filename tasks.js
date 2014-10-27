	'use strict';
	var app = angular.module('AtWork');


	app.controller('TaskListCtrl', ['$rootScope','$routeParams','$scope', '$location', 'DropDownFactory','RESTService',  'Cache',  function ($rootScope,$routeParams,$scope, $location,DropDownFactory,RESTService,  Cache) {
		    $rootScope.selection = 'TaskListPage';
		      var a = Cache.get('_tasklist');
	        var c, _limit = 20, $this = this;

	    function init() { 
    		a.tasklist = {};
    		a.tasklist.data = [];
    		
    		a.resources = {};
    		a.resources.data = [];
    		a.resources.loading = false;
    		a.selection = 'TaskListPage';
    		a.projects = {};
    		    a.projects.data = [];
    		if(Cache.get('_projlist') !== null) {
    		    a.projects = Cache.get('_projlist').projlist;
    		    a.projects.data = Cache.get('_projlist').projlist.data;
    		}
            a.comments = {};
    		a.comments.data = [];
    		a.comments.loading = false;
    		
    		a.tasklist.offset = 0;	
    		a.tasklist.initialized = false;
    		a.tasklist.hasMore = false;
    		a.tasklist.loading = false;
    		$scope.a = a;
    		console.log("********* In Task Ctrl init()**********");
    		$this.taskList(); 
    		$this.resourceList();
    	
    	}
	this.getMoreTaskList = function() {
	    console.log("********* In Taks Ctrl getTaskList()**********");
		if (a.tasklist.loading || !a.tasklist.hasMore) {
			return;
		}
		a.tasklist.offset += _limit;
		$this.taskList();
	};  
$scope.projectId = ""; 
    $scope.status = "";
    $scope.isactive = "";
    $scope.priority = "";
    $scope.projectType = "";
    $scope.taskId = "";
    $scope.startDate = "";
    $scope.endDate = "";
 
    
 	this.commentsList = function(){  
	        console.log("**************");
			a.comments.loading = true;	 
			RESTService.query({'method':'data'}, {'ds':'CommRef','limit':_limit,'offset':a.tasklist.offset,'wC':"TYPE = 'T' and REF_ID= ?",'params':[a.tasklist.current.TASK_ID], 'executeCountSql': 'N'},
			function(result){
					if (result.$error) {
						Logger.showAlert(result.errorMessage, result.errorTitle);
					} else {
                        console.log(result.data);
						if (result.data.length > 0) {
							a.comments.data.push.apply(a.comments.data, result.data);
							if (result.data.length < _limit) {
								a.comments.hasMore = false;
							} else {
								a.comments.hasMore = true;
							}
						} else {
							a.comments.hasMore = false;
							console.log("No Records found!!");
						}
						Cache.put('_commentslist', a);
					}
					a.comments.loading = false;
				}
			); 
	};
 
 	this.taskList = function(){  
	        console.log("**************");
			a.tasklist.loading = true;	 
			RESTService.query({'method':'data'}, {'ds':'GetTaskResourceRef1','limit':_limit,'offset':a.tasklist.offset,'wC':'proj_id = ?','params':[$routeParams.projId], 'executeCountSql': 'N'},
			function(result){
					if (result.$error) {
						Logger.showAlert(result.errorMessage, result.errorTitle);
					} else {
                        console.log(result.data);
						if (result.data.length > 0) {
							a.tasklist.data.push.apply(a.tasklist.data, result.data);
							if (result.data.length < _limit) {
								a.tasklist.hasMore = false;
							} else {
								a.tasklist.hasMore = true;
							}
						} else {
							a.tasklist.hasMore = false;
							console.log("No Records found!!");
						}
						Cache.put('_tasklist', a);
					}
					a.tasklist.loading = false;
				}
			); 
	};
	$scope.createtasktitle = "Create New Task";
	$scope.$watch('a.selection', function(newValue, oldValue){
		console.log(oldValue + '->' + newValue);
		//alert(newValue);
		/*
		a.patients.initialized = true;
		*/if (newValue === 'EditTaskPage') {
		   // alert("getting here");
		    //resource_nametask_nameproj_idTASK_IDstatus
			$scope.taskName =a.tasklist.current.task_name;
			$scope.status = a.tasklist.current.status;
	        $scope.desc = a.tasklist.current.DESCRIPTION;
	        $scope.projectId = a.tasklist.current.proj_id;
	        $scope.priority = a.tasklist.current.PRIORITY;
	        $scope.resourceId = a.tasklist.current.RSRC_ID
	        $scope.taskId = a.tasklist.current.TASK_ID;
	        $scope.startDate = a.tasklist.current.START_DATE;
	        $scope.endDate = a.tasklist.current.END_DATE;
	        $scope.createtasktitle = "Edit Task";
	        	$this.commentsList();
	    } else if(newValue === 'TaskListPage'){
	        $scope.createtasktitle = "Create New Task";
	    };
			
			
		 
	});

	
 	this.resourceList = function(){  
	        console.log("**************");
			a.resources.loading = true;	 
			RESTService.query({'method':'data'}, 
			{'ds':'GetRsrcGroupRef','limit':_limit,'offset':a.tasklist.offset, 'executeCountSql': 'N'},
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
	
	function beforeInit(){
	a = {'pageTitle':'TaskList'};
	};

	if (a === undefined) {
	   	a = {'pageTitle':'TaskList'};
		Cache.put('_tasklist', a);
	}
  
	init();
		    $scope.back = function() {
		         
		        $rootScope.selection = 'MainPage';
		        $location.path('#/projectlist');
		    }
    
    $scope.addNewTask = function() {
	   console.log("*********343434*****"+$scope.taskName);
		
	    var datajson = {'ds':'TaskRef','operation':'INSERT','data':
	                    {'TASK_NAME':$scope.taskName,'status':$scope.status,
	                    'DESCRIPTION':$scope.desc,
	                    'PROJ_ID':$scope.projectId,
	                    'PRIORITY':$scope.priority,
	                    'START_DATE':$scope.startDate,
	                    'END_DATE':$scope.endDate
	                    }
	    };
	    
	    
	    
	     if($scope.taskId) {
             datajson.operation = 'UPDATE';
             datajson.data.ID = $scope.taskId;
             datajson.data.custUpdate  = "Y"; 
         }  else {
             datajson.data.isGenIds = "Y"; 
         }
	    
		RESTService.save({'method':'update'},datajson, function(result){
		    console.log(result);
			if (result.status === "E") {
				console.log(result.errorMsg, result.title);
			} else {
			    if($scope.taskId) {
			    console.log("Task Updated Successfully!")
			    	a.tasklist.data = [];
    		        a.selection = 'TaskListPage';
    		        $this.taskList();
			    } else {
				console.log("Task Added Successfully!")
				var genIds = result.ids;
				//alert(genIds[0]);
	            var datajson = {'ds':'TaskResourcesRef','operation':'INSERT','data':
	                    {'TASK_ID':genIds[0],'RESOURCE_ID':$scope.resourceId,
	                    'PROJ_ID':$scope.projectId}
            	    };
            		RESTService.save({'method':'update'},datajson, function(result){
                	
                	a.tasklist.data = [];
    		        a.selection = 'TaskListPage';
    		        $this.taskList();
                });
			    }
			}
		});

	}  
	  
	  $scope.addComments = function() {
	    var datajson = {'ds':'CommRef','operation':'INSERT','data':
	                    {'REF_ID':a.tasklist.current.TASK_ID,'TYPE':'T',
	                    'COMMENTS':$scope.comments,'orderBy': 'CREATION_DATE DESC'},'orderBy': 'CREATION_DATE DESC'
	    };
		RESTService.save({'method':'update'},datajson, function(result){
		    console.log(result);
			if (result.status === "E") {
				console.log(result.errorMsg, result.title);
			} else {
				console.log("Comments Added Successfully!")
			    	a.comments.data = [];
    		        //a.selection = 'TaskListPage';
    		        $this.commentsList();
            }
		});

	}  
	   
		    
	}]);
	//end of the tast list 
	