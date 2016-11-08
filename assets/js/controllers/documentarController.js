angular.module('app').controller("documentarController", [
		"$state",
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
		 	$state,
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

		/*$API.Consecutivo.List().then(function(res){
			$scope.consecutivos = res.data || [];
		});*/

		$scope.result = {};

		$scope.units = $fileManagerService.fileSize;
		$scope.COUNTER = 0;
		$scope.CURRENT_FILENAME = '';
		var _walker = null;
		
		if($stateParams.documentacion){
			//no se encuentra definida la funcion enUso en shoplyjs
			//$API.DocDocumento.enUso({_id : $stateParams.documentacion}).then(function(res){});

			$API.DocDocumento.DocDocumento($stateParams.documentacion).then(function(res){
				console.log(res)
				$scope.documentacion = res.data;
				_walker = $fileManagerService.walker.walk($fileManagerService.path.join($docFlyConf.path, res.data.directorio));
				
				_walker.on('file', function (root, fileStats, next){
					$scope.myFiles.push({documentacion : $scope.documentacion, name : fileStats.name, size : fileStats.size, path :$fileManagerService.path.join(root, fileStats.name), estado : "InDisk"});
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
	
	$scope.showCorrespondenciaForm = function(documentacion){
		$scope.documentacion = documentacion;
		$scope.correspondencia = {};
		$scope.correspondencia.contactos = [];

 		var modalInstance = $modal.open({
	        templateUrl: 'correspondencia.html',
	        scope : $scope,
	        size : "md",
	        controller : function($scope, $timeout){

	        	$scope.nuevoContacto = function(){
			 		var _modal = $modal.open({
					        templateUrl: 'nuevo_contacto.html',
					        scope : $scope,
					        size : "md",
					        controller : function($scope){
					        	$scope.createContact = function(){
					        		if($scope.newContact){
					        			angular.forEach($scope.newContact.split(","), function(contact){
					        				if($scope.correspondencia.contactos.indexOf(contact) > -1){
												toaster.pop("error","Contacto", "ya existe en la lista de destinatarios");
												return;
					        				}

						        			$scope.correspondencia.contactos.push(contact);
					        			});

						        		$scope.$close();					        			
					        		}
					        	}
					        }
				    	});
	        	}

	        	$scope.ok = function(){
					toaster.pop("warning","Espere...", "Enviando correspondencia...");

					var mailOptions = {
					    from: $docFlyConf.gmailUser,
					    to: $scope.correspondencia.contactos.join(','),
					    subject: $scope.correspondencia.asunto,
					    text: $scope.correspondencia.mensaje ,
					    attachments : [] 
					};

					angular.forEach($scope.myFiles, function(file){
						mailOptions.attachments.push({
							filename : file.name,
							path : file.path
						});
					});

					$mailService.mailer.sendMail(mailOptions, function(error, info){
					    if(error){
							toaster.pop("error","Ops!", "Hubo un error al enviar, Contacte al Admin");
							$scope.$close();
					        return console.log(error);
					    }

						toaster.pop("sucesss","Listo!!", "Correspondencia enviada");
						$scope.$close();
					});
	        	}

				$scope.formClient = function(){
					var modalInstance = $modal.open({
				        templateUrl: 'listado_cliente.html',
				        scope : $scope,
				        controller : function($scope){
							$scope.setSelected = function(cliente){
						 		$scope.selected = cliente;
							}

							$scope.ok = function(){
								if($scope.$parent.correspondencia.contactos.indexOf($scope.selected.metadata.email) > -1){
									toaster.pop("error","Error", "Ya has agregado este contacto.");
									return;
								}

								$scope.$parent.correspondencia.contactos.push($scope.selected.metadata.email);
								$scope.$close();
							}

							$scope.cancel = function(){
								$scope.$close();
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
				}
				
	        	$scope.Load = function(){
					_walker = $fileManagerService.walker.walk($fileManagerService.path.join($docFlyConf.path, $scope.documentacion.directorio));
					
					$scope.myFiles = [];

					_walker.on('file', function (root, fileStats, next){
						$scope.myFiles.push({documentacion : $scope.documentacion, name : fileStats.name, size : fileStats.size, path :$fileManagerService.path.join(root, fileStats.name), estado : "InDisk"});
						next();
						$scope.$apply();
					});
	        	}

	        	$scope.RemoveContacto = function(contacto){
	        		$scope.correspondencia.contactos.splice($scope.correspondencia.contactos.indexOf(contacto), 1);
	        	}

	        	$scope.removeFile = function(file){
	        		$scope.myFiles.splice($scope.myFiles.indexOf(file), 1);
	        	}
	        },
      	});
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

	$scope.formEditClient = function(){
		var modalInstance = $modal.open({
	        templateUrl: 'tpl/modals/listado_cliente.html',
	        scope : $scope,
	        controller : function($scope){
				
				$scope.setSelected = function(cliente){
			 		$scope.selected = cliente;
			 		$scope.$parent.setRuta.plantilla.cliente = cliente;
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

	$scope.deleteFiles = function(){
		var _path = $fileManagerService.path.join($docFlyConf.path, $scope.dest.path, $scope._targetPath);
		$fileManagerService.Remove(_path, function(e){
			if (e) return console.error(e);

			console.log("Borrado")
		});
	}

	$scope.writeFiles = function(){
		$scope._targetPath = $cryptoService.encodeHmac($scope.setRuta.plantilla.indice.map(function(v){ return v.value}).join(""), "sha1")
		
		$fileManagerService.createDir(
			$fileManagerService.path.join(
				$docFlyConf.path,
				$scope.dest.path,
				$scope._targetPath 
				), function(e){
					if(e){
						toaster.pop("error","Error", "Unidad de almacenamiento desconectada.");
						$scope.$apply();
						throw(e)
					};

					angular.forEach($scope.myFiles, function(v, k){
						var _filename = $fileManagerService.path.join($docFlyConf.path, $scope.dest.path, $scope._targetPath, v.name);
							$fileManagerService.copy(v.path, _filename, function(e){
								if(e) {
									v.estado = false;
								}

								$scope.$apply(function(){
									v.estado = true;									
								})
							});	
					});
			});
	}

	$scope.obtenerCliente = function(){
		$API.Cliente.Cliente($scope.setRuta.plantilla.cliente).then(function(res){
			 $scope.setRuta.plantilla.cliente = res.data;
		});
	}

	$scope.saveDocumentacion = function(){
		$scope.setRuta.plantilla.cliente = $scope.setRuta.plantilla.cliente._id;
		$API.DocDocumento.Create({
			estado : $scope.estado,
			usuario : $rootScope.credential.user._id,
			plantilla : $scope.setRuta.plantilla,
			ruta : $scope.dest,
			hash : $scope._targetPath,
			archivo : $scope.myFiles.length,
			directorio :$fileManagerService.path.normalize($fileManagerService.path.join($scope.dest.path, $scope._targetPath))
		}).then(function(res){
			toaster.pop("success", "# de documentacion :" +res.data.consecutivo, "Archivos subidos");
			$scope.$close();
			$scope.myFiles.length = 0;
		});
	}

	$scope.ok = function(){
 		var modalInstance = $modal.open({
	        templateUrl: 'preLoad.html',
	        scope : $scope,
	        controller : function($scope){
	        	$scope.init = function(){
	        		$scope.$parent.writeFiles();
				}

	        	$scope.createDocumentacion = function(){
	        		$scope.$parent.saveDocumentacion();
	        		$scope.$dismiss({status : true});
	        		console.log("saving");
	        	}

	        	$scope.rollBackFiles = function(){
	        		console.log("delete");
	        		$scope.$parent.deleteFiles();
	        		$scope.$close();
	        	}
	        }
	    });

      	modalInstance.result.then(function(val){}, function(val){
      		if(val.status){
      			return;
      		}

      		$scope.deleteFiles();
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
		if($rootScope.difusionItems && $rootScope.difusionItems.length > 0){
			$rootScope.difusionItems.length = 0;
		}

		$API.DocDocumento.Search(
				{
					estado : $scope.estado ? $scope.estado._id : null,
					id : $scope.ruta ? $scope.ruta.plantilla._id : null,
					criteria : $scope.criteria,
					indiceIni : $scope.indiceIni ? $scope.indiceIni.date : null ,
					indiceEnd :$scope.indiceEnd ?  $scope.indiceEnd.date : null,
					sucursal : $rootScope.enterprise ? $rootScope.enterprise._id : null,
					ini : $scope.ini ? $moment($scope.ini.date).startOf('day').format() : null,
					end : $scope.end ? $moment($scope.end.date).endOf('day').format() : null,
					cliente : $scope.cliente ? $scope.cliente : null ,
					valorConsecutivo : $scope.valorConsecutivo ? $scope.valorConsecutivo : null, 
					consecutivo : $scope.consecutivo ? $scope.consecutivo._id : null, 
				}
			).then(function(res){
				$scope.documentos = res.data || [];
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

	$scope.setDifusionItem = function(doc){
		if(doc.difusion){
			if($rootScope.difusionItems){
				$rootScope.difusionItems.push(doc);
				return;
			}

			$rootScope.difusionItems = [];
			$rootScope.difusionItems.push(doc);
			return;
		}

		$rootScope.difusionItems.splice($rootScope.difusionItems.indexOf(doc), 1);
	}

	$scope.Update = function(documentacion){
		$scope.setRuta	= angular.copy(documentacion);
		var modalInstance = $modal.open({
	        templateUrl: 'editar_documentacion.html',
	        size : 'md',
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

								v.estado = "InDisk";
								$scope.$apply();
							});
						}
					});

					$scope.documentacion.archivo = $scope.myFiles.length;
					$scope.setRuta.plantilla.cliente = $scope.setRuta.plantilla.cliente._id;
					$API.DocDocumento.Update($scope.setRuta).then(function(res){
						if(res.status == 200){
							//$API.DocDocumento.sinUso({_id : $stateParams.documentacion}).then(function(res){});
							toaster.pop("success","Documentacion", "Actualizada");
						}
					});
						        		
	        		$scope.$close();
	        	}
	        }
      	});
	}

	$scope.open = function($event, index) {
		$event.preventDefault();
		$event.stopPropagation();
		index.opened = true;
	};
}]);
