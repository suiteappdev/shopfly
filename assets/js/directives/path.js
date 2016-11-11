angular.module("app").directive("ngPath", function($modal, $rootScope){
	function ctrl($scope, $API){
		$API.DocDependencia.List().then(function(res){
			$scope.dependencias = res.data || [];
		})

	$scope.addPath = function(path){
		/*var _exist = false;

			$scope.ngData.forEach(function(value){
			if(value.path == $rootScope.selectedNode.path){
				_exist = true;
				return;
			}
		});	

		if(!_exist){
			$scope.ngData.push({path : $rootScope.selectedNode.path});
		}
		*/			
		$scope.ngData.push({path : $rootScope.selectedNode.path});
		
	}

	$scope.removePath = function(path){
		$scope.ngData.splice($scope.ngData.indexOf(path), 1);
	}

	$scope.showPath = function(index){
			var modalInstance = $modal.open({
		        templateUrl: 'path.html',
		        size : 'md',
		        scope : $scope,
		        controller : function($scope){
		        	$scope.ok = function(){
			        	$scope.$parent.addPath({path : $rootScope.selectedNode.path});
			        	$scope.$close();
		        	}
		        }
	      	});
		}


	}

	function link($scope){

	}

	return {
		restrict : "EA",
		controller : ctrl,
		scope : true,
		scope : {
			ngLabel : "@",
			ngPlaceholder : '@',
			ngData : '='
		},
		templateUrl : "tpl/fields/path.html",
		link : link
	}
});