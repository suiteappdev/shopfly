angular.module('app').controller("documentarController", [
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
			$socket
			){
	
	$scope.Load = function(){
		$API.EstadoDocumento.List().then(function(res){
			$scope.estadoDocs = res.data || [];
		});

	    angular.forEach($rootScope.credential.user.metadata.estadoDocumento, function(estado){
	     	if(estado.subscribed){
		        $socket.on(estado.nombre, function(res){
		            alert(res);
		        });	     		
	     	}
	    })

		$scope.units = $fileManagerService.fileSize;

		$scope.COUNTER = 0;
		$scope.CURRENT_FILENAME = '';

		var _walker = null;

		if($stateParams.documentacion){
			$API.DocDocumento.DocDocumento($stateParams.documentacion).then(function(res){
				$scope.documentacion = res.data;
				_walker = $fileManagerService.walker.walk($fileManagerService.path.join($docFlyConf.path, res.data.directorio));
				
				_walker.on('file', function (root, fileStats, next){
					$scope.myFiles.push({name : fileStats.name, size : fileStats.size, path :$fileManagerService.path.join(root, fileStats.name), estado : "InDisk"});
					next();
					$scope.$apply();
				});					
			});
		}

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

	}

	$scope.remove = function(file){
		$scope.myFiles.splice($scope.myFiles.indexOf(file), 1);
	}

	$scope.removeFromDisk = function(file){
		var modalInstance = $modal.open({
	        templateUrl: 'confirm.html',
	        size : 'sm',
	        scope : $scope,
	        controller : function($scope){
	        	$scope.ok = function(){
	        		file.estado  = "Deleted";
	        		$scope.$close();
	        	}

	        	$scope.cancel  = function(){
	        		$scope.$close();
	        	}
	        }
      	});
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

	$scope.formClient = function(){
		var modalInstance = $modal.open({
	        templateUrl: 'listado_cliente.html',
	        scope : $scope,
	        controller : function($scope){
				
				$scope.setSelected = function(cliente){
			 		$scope.selected = cliente;
			 		$scope.$parent.setCliente = cliente;
				}

				$scope.ok = function(){
					$scope.$close(true);
				}

				$scope.cancel = function(){
					$scope.$close(false);
				}

				$scope.buscarCliente = function(){
					$API.Cliente.Search({
						estado 			: $rootScope.client_status ? $rootScope.client_status  :  null,
						documento 		: $scope.filter ? $scope.filter.numero  : null,
						cliente 		: $scope.cliente ? $scope.cliente : null,
						tipoCliente		: $rootScope.client_type ? $rootScope.client_type : null,
			 		}).then(function(res){
						$scope.clientes = res.data || [];
					});
				}
	        },
	        size : 'lg',
	        scope : $scope
      	});

      	modalInstance.result.then(
  			function(val){
  				if(!val){delete $scope.setCliente}
      		},
      		function(val){
      			if(typeof(val) != typeof(true)){
      				delete $scope.setCliente;
      			}else if(!val){
      				delete $scope.setCliente;
      			}
      		}
      	);
	}

	$scope.ok = function(){

		var _targetPath = $cryptoService.encodeHmac($scope.setRuta.plantilla.indice.map(function(v){ return v.value}).join(""), "sha1")
		
		$fileManagerService.createDir(
			$fileManagerService.path.join(
				$docFlyConf.path,
				$scope.dest.path,
				_targetPath 
				), function(e){
					if(e){
						toaster.pop("error","Error", "Unidad de almacenamiento desconectada.");
						$scope.$apply();
						throw(e)
					};

					angular.forEach($scope.myFiles, function(v, k){
						var _filename = $fileManagerService.path.join($docFlyConf.path, $scope.dest.path, _targetPath, v.name);
						
						$fileManagerService.copy(v.path, _filename, function(e){
							if(e) throw(e);
							
							v.estado = true;
						});
					});

					$API.DocDocumento.Create({
						estado : $scope.estado,
						cliente : $scope.setCliente,
						plantilla : $scope.setRuta.plantilla,
						ruta : $scope.dest,
						archivo : $scope.myFiles.length,
						directorio :$fileManagerService.path.join($scope.dest.path, _targetPath)
					}).then(function(res){
						toaster.pop("success","Documentacion", "Archivos subidos");
						$scope.$close();
					});
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

	$scope.Search = function(){
		$API.DocDocumento.Search(
				{
					estado : $scope.estado ? $scope.estado._id : null,
					id : $scope.ruta ? $scope.ruta.plantilla._id : null,
					criteria : $scope.criteria,
					ini : $scope.ini ? $moment($scope.ini.date).startOf('day').format() : null,
					end : $scope.end ? $moment($scope.end.date).endOf('day').format() : null,
					cliente : $scope.cliente ? $scope.cliente : null 
				}
			).then(function(res){
				$scope.documentos = res.data || [];
		});
	}

	$scope.mostrarIndices = function(indices){
		$scope.setIndices = indices ;

		var modalInstance = $modal.open({
	        templateUrl: 'mostrar_indices.html',
	        scope : $scope,
	        controller : function($scope){
	        },
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

				  var folder = new folder_view.Folder($('#files'));

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

	$scope.Update = function(){
		var modalInstance = $modal.open({
	        templateUrl: 'confirm.html',
	        size : 'sm',
	        scope : $scope,
	        controller : function($scope){
	        	$scope.ok = function(){
					angular.forEach($scope.myFiles, function(v, k){
						if(v.estado == "Deleted"){
							$fileManagerService.Remove($fileManagerService.path.normalize(v.path).toString(), function(err){
								if(err) return console.log(err);
								
								$scope.myFiles.splice(k, 1);
								$scope.$apply();
							});
						}

						if(!v.estado){
							$fileManagerService.copy(v.path, $fileManagerService.path.join($docFlyConf.path, $scope.documentacion.directorio, v.name), function(err){
								if(err) return console.log(err);
							});
						}
					});

					$scope.documentacion.archivo = $scope.myFiles.length;
					$API.DocDocumento.Update($scope.documentacion).then(function(res){
						if(res.status == 200){

							toaster.pop("success","Documentacion", "Actualizada");
							$scope.myFiles.length = 0;
							$API.DocDocumento.DocDocumento($stateParams.documentacion).then(function(res){
								$scope.documentacion = res.data;
								_walker = $fileManagerService.walker.walk($fileManagerService.path.join($docFlyConf.path, res.data.directorio));
								
								_walker.on('file', function (root, fileStats, next){
									$scope.myFiles.push({name : fileStats.name, size : fileStats.size, path :$fileManagerService.path.join(root, fileStats.name), estado : "InDisk"});
									next();
									$scope.$apply();
								});					
							});
						}
					});
						        		
	        		$scope.$close();
	        	}

	        	$scope.cancel  = function(){
	        		$scope.$close();
	        	}
	        }
      	});


	}

	$scope.today = function() {
		$scope.dt = new Date();
	};

	$scope.today();

	$scope.clear = function () {
	$scope.dt = null;
	};

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
}]);
