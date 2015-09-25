'use strict';
angular.module('app').run(['$rootScope', '$state', '$stateParams', "$window", "AuthenticationService", "$location", "$localStorage", "$socket",  function($rootScope,   $state,   $stateParams, $window, AuthenticationService, $location, $localStorage, $socket) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
          $rootScope.country = {code : "CO", name : "Colombia"};
          $rootScope.getScanner = $window.getScanner;
          $socket.initialize();

          $rootScope.$on('$stateChangeStart', function(event, nextRoute, toParams, fromState, fromParams){
              $rootScope.credential = $localStorage.credential;

              if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication 
                  && !AuthenticationService.isAuthenticated && !$localStorage.credential) {
                  $location.path('login');
              }
          });

          $rootScope.clearCustomFields = function(){
            try{
              delete $rootScope.client_type;
              delete $rootScope.barrio;
              delete $rootScope.client_status;
              delete $rootScope.enterprise_status;
              delete $rootScope.cropped;
              delete $rootScope.departamento;
              delete $rootScope.document;
              delete $rootScope.regime;
              delete $rootScope.gender;
              delete $rootScope.line_price;
              delete $rootScope.location;
              delete $rootScope.municipio;
              delete $rootScope.barrios;
              delete $rootScope.marital_status;
              delete $rootScope.municipio;
              delete $rootScope.profile;
              delete $rootScope.stratum;
              delete $rootScope.taxpayer_type;     
              delete $rootScope.enterprise;
              delete $rootScope.office;
              delete $rootScope.education_level;
              delete $rootScope.birthday;
              delete $rootScope.phoneBook;
              delete $rootScope.faxBook;
              delete $rootScope.cellularPhoneBook;
              delete $rootScope.faxBookNumber;
              delete $rootScope.cellularPhone;
              delete $rootScope.phone;
                       
            }catch(e){}
          }
      }
    ]
  ).config(['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', function($stateProvider,   $urlRouterProvider, JQ_CONFIG) {
          $urlRouterProvider.otherwise('app/panel');
          $stateProvider
              .state('login', {
                  url: '/login',
                  templateUrl: 'tpl/login.html',
                  controller : 'loginController',
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/loginController.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
            .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html',
                  access: { requiredAuthentication: true }
              })
              .state('app.panel', {
                  url: '/panel',
                  templateUrl: 'tpl/board.html',
                  access: { requiredAuthentication: true },
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load([
                            JQ_CONFIG.moment
                          ]);
                    }]
                  }
                 
              })
              // pages
              .state('app.page', {
                  url: '/page',
                  template: '<div ui-view class="fade-in-down"></div>',
                  access: { requiredAuthentication: true }
              })

              /* start shopFly pages */
              .state('app.page.dependencia', {
                  url: '/dependencia',
                  templateUrl: 'tpl/pages/page_dependencia.html',
                  access: { requiredAuthentication: true },
                  controller : 'dependenciaController',
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/dependenciaController.js',
                                      'assets/js/directives/country.js',
                                      'assets/js/directives/document.js',
                                      'assets/js/directives/marital_status.js',
                                      'assets/js/directives/location.js',
                                      'assets/js/directives/enterprise_status.js',
                                      'assets/js/directives/gender.js',
                                      'assets/js/services/file.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.cargo', {
                  url: '/cargo',
                  templateUrl: 'tpl/pages/page_cargo.html',
                  access: { requiredAuthentication: true },
                  controller : 'cargoController',
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/cargoController.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.barrio', {
                  url: '/barrio',
                  templateUrl: 'tpl/pages/page_barrio.html',
                  controller : 'barrioController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/barrioController.js',
                                      'assets/js/directives/country.js',
                                      'assets/js/directives/document.js',
                                      'assets/js/directives/marital_status.js',
                                      'assets/js/directives/location.js',
                                      'assets/js/directives/enterprise_status.js',
                                      'assets/js/directives/gender.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.banco', {
                  url: '/banco',
                  templateUrl: 'tpl/pages/page_banco.html',
                  controller : 'bancoController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/bancoController.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.perfil', {
                  url: '/perfil',
                  templateUrl: 'tpl/pages/page_perfil.html',
                  controller : 'perfilController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/perfilController.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.iva', {
                  url: '/iva',
                  templateUrl: 'tpl/pages/page_iva.html',
                  access: { requiredAuthentication: true },
                  controller : 'ivaController',
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/ivaController.js'
                                      //'assets/js/directives/country.js',
                                      //'assets/js/directives/document.js',
                                      //'assets/js/directives/marital_status.js',
                                      //'assets/js/directives/location.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.retencion', {
                  url: '/retencion',
                  templateUrl: 'tpl/pages/page_retencion.html',
                  controller : 'retencionController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/retencionController.js'
                                      //'assets/js/directives/country.js',
                                      //'assets/js/directives/document.js',
                                      //'assets/js/directives/marital_status.js',
                                      //'assets/js/directives/location.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.indices', {
                  url: '/indices',
                  templateUrl: 'tpl/pages/page_indice.html',
                  controller : 'indiceController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/indiceController.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.plantillas', {
                  url: '/plantillas',
                  templateUrl: 'tpl/pages/page_plantilla.html',
                  controller : 'plantillaController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/plantillaController.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.rutas', {
                  url: '/rutas',
                  templateUrl: 'tpl/pages/page_ruta.html',
                  controller : 'rutaController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/rutaController.js',
                                      'assets/js/directives/path.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.documentar', {
                  url: '/documentar',
                  templateUrl: 'tpl/pages/page_documentar.html',
                  controller : 'documentarController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['toaster', 'ui.select']).then(
                              function(){
                                 return $ocLazyLoad.load([
                                  JQ_CONFIG.moment,
                                  'assets/js/controllers/documentarController.js',
                                  'assets/js/services/mailService.js',
                                  'assets/js/directives/file.js',
                                  'assets/js/directives/path.js',
                                  'assets/js/controllers/clienteController.js',
                                  'assets/js/directives/client_type.js',
                                  'assets/js/directives/client_status.js',
                                  'assets/js/directives/document.js',
                                  'assets/js/directives/phoneBook.js',
                                  'assets/js/directives/dataTypes.js'
                                  ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.editar-documentacion', {
                  url: '/editar-documentacion/:documentacion',
                  templateUrl: 'tpl/pages/editar_documentacion.html',
                  controller : 'documentarController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['toaster', 'ui.select']).then(
                              function(){
                                 return $ocLazyLoad.load([
                                  JQ_CONFIG.moment,
                                  'assets/js/controllers/documentarController.js',
                                  'assets/js/static/main.js',
                                  'assets/js/services/mailService.js',
                                  'assets/js/directives/file.js',
                                  'assets/js/directives/path.js',
                                  'assets/js/controllers/clienteController.js',
                                  'assets/js/directives/client_type.js',
                                  'assets/js/directives/client_status.js',
                                  'assets/js/directives/document.js',
                                  'assets/js/directives/phoneBook.js'
                                  ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.difusion', {
                  url: '/difusion',
                  templateUrl: 'tpl/pages/page_difusion.html',
                  controller : 'difusionController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['toaster', 'ui.select']).then(
                              function(){
                                 return $ocLazyLoad.load([
                                  'assets/js/controllers/difusionController.js',
                                  'assets/js/static/main.js',
                                  'assets/js/services/mailService.js',
                                  'assets/js/directives/file.js',
                                  'assets/js/directives/path.js',
                                  'assets/js/controllers/clienteController.js',
                                  'assets/js/directives/client_type.js',
                                  'assets/js/directives/client_status.js',
                                  'assets/js/directives/document.js',
                                  'assets/js/directives/phoneBook.js'
                                  ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.firmar', {
                  url: '/firmar?file&url&hash&path',
                  templateUrl: 'tpl/pages/page_firmar.html',
                  controller : 'firmarController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(["toaster"]).then(
                              function(){
                                 return $ocLazyLoad.load([
                                  'assets/js/controllers/firmarController.js',
                                  'assets/vendor/pdfjs/pdf.js',
                                  'assets/vendor/pdfjs/pdf.compat.js',
                                  'assets/vendor/pdfjs/pdf.worker.js',
                                  'assets/js/directives/draggable.js',
                                  'assets/js/directives/resizable.js',
                                  'assets/js/directives/file.js',
                                  'assets/js/directives/pdfPageDirective.js',
                                  'assets/vendor/signaturePad/signature_pad.min.js',
                                  //'assets/vendor/jspdf/jspdf.js', 
                                  'assets/vendor/html2canvas/jspdf.debug.js', 
                                  'assets/vendor/jspdf/jspdf.plugin.addimage.js',
                                  'assets/vendor/jspdf/libs/FileSaver/FileSaver.js'
                                  ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.documentaciones', {
                  url: '/documentaciones',
                  templateUrl: 'tpl/pages/page_documentaciones.html',
                  controller : 'documentarController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['toaster', 'ui.select']).then(
                              function(){
                                 return $ocLazyLoad.load([
                                  JQ_CONFIG.moment,
                                  'assets/js/controllers/documentarController.js',
                                  'assets/js/services/mailService.js',
                                  'assets/js/services/moment.js',
                                  'assets/js/static/main.js',
                                  'assets/js/directives/client_type.js',
                                  'assets/js/directives/enterprise.js',
                                  'assets/js/directives/client_status.js',
                                  'assets/js/directives/phoneBook.js',
                                  'assets/js/directives/client_type.js',
                                  'assets/js/directives/document.js'
                                  ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.estadoDocumento', {
                  url: '/estadoDocumento',
                  templateUrl: 'tpl/pages/page_estadoDocumento.html',
                  controller : 'estadoDocumentoController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/estadoDocumentoController.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.consecutivo', {
                  url: '/consecutivo',
                  templateUrl: 'tpl/pages/page_consecutivo.html',
                  controller : 'consecutivoController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                    JQ_CONFIG.moment,
                                      'assets/js/controllers/consecutivoController.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })  
              .state('app.page.empresas', {
                  url: '/empresas',
                  templateUrl: 'tpl/pages/empresa_listado.html',
                  controller : 'empresaController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      JQ_CONFIG.moment,
                                      'assets/js/controllers/empresaController.js',
                                      'assets/js/directives/country.js',
                                      'assets/js/directives/location.js',
                                      'assets/js/directives/phoneBook.js',
                                      'assets/js/directives/cellularPhoneBook.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.editar-empresa', {
                  url: '/editar-empresa/:id',
                  templateUrl: 'tpl/pages/editar_empresa.html',
                  controller : 'empresaController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/empresaController.js',
                                      'assets/js/directives/country.js',
                                      'assets/js/directives/enterprise_status.js',
                                      'assets/js/directives/location.js',
                                      'assets/js/directives/phoneBook.js',
                                      'assets/js/directives/faxBook.js',
                                      'assets/js/directives/cellularPhoneBook.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.notifiaciones', {
                  url: '/notificaciones',
                  templateUrl: 'tpl/pages/listado_notificaciones.html',
                  controller : 'notificacionController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/notificacionController.js',
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.empresa', {
                  url: '/empresa',
                  templateUrl: 'tpl/pages/page_empresa.html',
                  controller : 'empresaController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/empresaController.js',
                                      'assets/js/directives/country.js',
                                      'assets/js/directives/enterprise_status.js',
                                      'assets/js/directives/location.js',
                                      'assets/js/directives/phoneBook.js',
                                      'assets/js/directives/faxBook.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.permisos', {
                  url: '/permisos',
                  templateUrl: 'tpl/pages/listado_permisos.html',
                  controller : 'permisoController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/permisoController.js',
                                      'assets/js/static/permisos.js',
                                      'assets/js/directives/client_type.js',
                                      'assets/js/directives/client_status.js',
                                      'assets/js/directives/document.js',
                                      'assets/js/directives/phoneBook.js',
                                      'assets/js/directives/client_type.js',
                                      'assets/js/directives/document.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.permiso', {
                  url: '/permiso',
                  templateUrl: 'tpl/pages/page_permiso.html',
                  controller : 'permisoController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/permisoController.js',
                                      'assets/js/static/permisos.js',
                                      'assets/js/directives/client_type.js',
                                      'assets/js/directives/client_status.js',
                                      'assets/js/directives/document.js',
                                      'assets/js/directives/phoneBook.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.editar-permiso', {
                  url: '/editar-permiso/:usuario',
                  templateUrl: 'tpl/pages/editar_permiso.html',
                  controller : 'permisoController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/permisoController.js',
                                      'assets/js/static/permisos.js',
                                      'assets/js/directives/client_type.js',
                                      'assets/js/directives/client_status.js',
                                      'assets/js/directives/document.js',
                                      'assets/js/directives/phoneBook.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.roles', {
                  url: '/roles',
                  templateUrl: 'tpl/pages/page_roles.html',
                  controller : 'rolesController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/rolesController.js',
                                      'assets/js/static/permisos.js'
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.cliente', {
                  url: '/cliente',
                  templateUrl: 'tpl/pages/page_cliente.html',
                  controller : 'clienteController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'ngImgCrop', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/clienteController.js',
                                      'assets/js/controllers/barrioController.js',
                                      'assets/js/directives/country.js',
                                      'assets/js/directives/document.js',
                                      'assets/js/directives/marital_status.js',
                                      'assets/js/directives/enterprise_status.js',
                                      'assets/js/directives/client_status.js',
                                      'assets/js/directives/location.js',
                                      'assets/js/directives/gender.js',
                                      'assets/js/directives/birthday.js',
                                      'assets/js/directives/education_level.js',
                                      'assets/js/directives/regime.js',
                                      'assets/js/directives/stratum.js',
                                      'assets/js/directives/client_type.js',
                                      'assets/js/directives/enterprise.js',
                                      'assets/js/directives/branch.js',
                                      'assets/js/directives/line_price.js',
                                      'assets/js/directives/office.js',
                                      'assets/js/directives/taxpayer_type.js',
                                      'assets/js/directives/profile.js',
                                      'assets/js/directives/cropper.js',
                                      'assets/js/directives/phoneBook.js',
                                      'assets/js/directives/cellularPhoneBook.js',
                                      'assets/js/directives/faxBook.js'
                                      ]);
                              }
                          );
                      }]
                  },
                  onExit: function($rootScope){
                    $rootScope.clearCustomFields();
                  }
              })
              .state('app.page.tipo_cliente', {
                  url: '/tipoCliente',
                  templateUrl: 'tpl/pages/page_tipoCliente.html',
                  access: { requiredAuthentication: true },
                  controller : 'tipoClienteController',
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/tipoClienteController.js',
                                      ]);
                              }
                          );
                      }]
                  }
              })
              .state('app.page.clientes', {
                  url: '/clientes',
                  templateUrl: 'tpl/pages/listado_cliente.html',
                  access: { requiredAuthentication: true },
                  controller : 'clienteController',
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/clienteController.js',
                                      'assets/js/directives/client_type.js',
                                      'assets/js/directives/client_status.js',
                                      'assets/js/directives/document.js',
                                      'assets/js/directives/phoneBook.js'
                                      ]);
                              }
                          );
                      }]
                  },
                  onExit: function($rootScope){
                    $rootScope.clearCustomFields();
                  }
              })
              .state('app.page.editar-cliente', {
                  url: '/editar-cliente/:id',
                  templateUrl: 'tpl/pages/editar_cliente.html',
                  controller : 'clienteController',
                  access: { requiredAuthentication: true },
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'ngImgCrop', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/clienteController.js',
                                      'assets/js/directives/country.js',
                                      'assets/js/directives/document.js',
                                      'assets/js/directives/marital_status.js',
                                      'assets/js/directives/enterprise_status.js',
                                      'assets/js/directives/client_status.js',
                                      'assets/js/directives/location.js',
                                      'assets/js/directives/gender.js',
                                      'assets/js/directives/birthday.js',
                                      'assets/js/directives/education_level.js',
                                      'assets/js/directives/regime.js',
                                      'assets/js/directives/stratum.js',
                                      'assets/js/directives/client_type.js',
                                      'assets/js/directives/enterprise.js',
                                      'assets/js/directives/branch.js',
                                      'assets/js/directives/line_price.js',
                                      'assets/js/directives/office.js',
                                      'assets/js/directives/taxpayer_type.js',
                                      'assets/js/directives/profile.js',
                                      'assets/js/directives/cropper.js',
                                      'assets/js/directives/phoneBook.js',
                                      'assets/js/directives/cellularPhoneBook.js',
                                      'assets/js/directives/faxBook.js'
                                      ]);
                              }
                          );
                      }]
                  },
                  onExit: function($rootScope){
                    $rootScope.clearCustomFields();
                  }
              })
              /* end shopFly pages */
      }
    ]
  );
