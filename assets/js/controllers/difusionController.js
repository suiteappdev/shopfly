angular.module('app').controller("difusionController", [
		"$scope",
		"$docFlyConf",
		"$stateParams",
		"$rootScope",
		"$modal",
		"toaster",
		"$API",
		"$fileManagerService",
		"$printerService",
		"$docFlyConf",
		"$cryptoService",
		"$webkitService",
		"$moment",
		"$socket",
		"$mailService",
		"$timeout",
		 function(
			$scope,
			$docFlyConf,
			$stateParams,
			$rootScope,
			$modal,
			toaster,
			$API,
			$fileManagerService,
			$printerService,
			$docFlyConf,
			$cryptoService,
			$webkitService,
			$moment,
			$socket,
			$mailService,
			$timeout
			){
	$scope.Load = function(){
		$API.EstadoDocumento.List().then(function(res){
			$scope.estadoDocs = res.data || [];
		});

		$scope.units = $fileManagerService.fileSize;
		$scope.COUNTER = 0;
		$scope.CURRENT_FILENAME = '';
		var _walker = null;

		$API.Ruta.List().then(function(res){
			$scope.rutas = res.data || [];
		});
		
		try{
			$printerService.getPrinters()('test', function(err, result){
				$scope.prints = result || [];
			});
		}catch(e){

		}

		$API.EstadoDocumento.List().then(function(res){
			$scope.estadoDocumentos = res.data || [];
		});

		if($rootScope.difusionItems){
			
		}

	}

	$scope.remove = function(file){
		$scope.myFiles.splice($scope.myFiles.indexOf(file), 1);
	}

	$scope.onSelect = function($item, $model){
		$scope.setRuta = angular.copy($item);

		var modalInstance = $modal.open({
	        templateUrl: 'documentar.html',
	        size : 'md',
	        scope : $scope,
	        controller : 'documentarController'
      	});
	}

	$scope.Scan = function(){
	   $webkitService.win.minimize();

		$printerService.Scan()($scope.print.Id, function(_err, _result){
			$fileManagerService.fs.stat(_result[0], function(_err, _res){
				var _parsed = $fileManagerService.path.parse(_result[0]);

					var modalInstance = $modal.open({
				        templateUrl: 'renombrar_archivo.html',
				        backdrop : 'static',
				        keyboard : false,
				        scope : $scope,
				        controller : function($scope){
				        	$scope.Renombrar = function(){
				        		var _file = _parsed.dir + $scope.$parent.CURRENT_FILENAME + '-' + $scope.$parent.COUNTER + _parsed.ext;

								$fileManagerService.Move(_result[0], _file , function (err) {
								  if (err) throw err;

									$scope.myFiles.push({name : $scope.$parent.CURRENT_FILENAME + '-' + $scope.$parent.COUNTER + _parsed.ext, size : _res.size, path : _file});
					        		$scope.$parent.COUNTER ++;
									
									toaster.pop("success","Archivo", "Renombrado");
					        		$scope.$close();								  	
								});
				        	}
				        },
				        size : 'sm'
			      	});
			})
			
			$webkitService.win.maximize();
		});
	}

	$scope.mostrarIndices = function(plantilla){
		$scope.setPlantilla = angular.copy(plantilla);

		var modalInstance = $modal.open({
	        templateUrl: 'mostrar_indices.html',
	        scope : $scope,
	        size : 'md'
      	});
	}
	
	$scope.explorer = function(directorio){
		var modalInstance = $modal.open({
	        templateUrl: 'explorer.html',
	        scope : $scope,
	        controller : function($scope){
	        	$scope.Load = function(){
				  var App = {};
				  var folder = new folder_view.Folder($('#fileView'));
				  folder.open($docFlyConf.path + directorio);
				  App.folder = folder;

				  folder.on('navigate', function(dir, mime) {
				      nwGui.Shell.openItem(mime.path);
				  });
	        	}
	        },
	        size : 'md'
      	});
	}

	$scope.removeDifusion = function(difusion){
		$rootScope.difusionItems.splice($rootScope.difusionItems.indexOf(difusion), 1);
	}

	$scope.setDifusionItem = function(doc){
		if(doc.difusion){
			if($rootScope.difusionItems){
				$rootScope.difusionItems.push(doc);
				return;
			}

			$rootScope.difusionItems = [];
			$rootScope.difusionItems.push(doc);
		}
	}

	$scope.Update = function(){
		angular.forEach($rootScope.difusionItems, function(doc, key){
			angular.forEach($scope.myFiles, function(v, k){
				$fileManagerService.copy(v.path, $fileManagerService.path.join($docFlyConf.path, doc.directorio, v.name), function(err){
					if(err) return console.log(err);
				});
			});

			doc.estado = $scope.estado;

			$API.DocDocumento.Update(doc).then(function(res){
				if(res.status == 200){
					$scope.myFiles.length = 0;
				}
			});		
		});

		$timeout(function(){
			toaster.pop("success","Documentacion", "Actualizada");			
		}, 1000);
	}

	$scope.open = function($event, index) {
		$event.preventDefault();
		$event.stopPropagation();
		index.opened = true;
	};
}]);
