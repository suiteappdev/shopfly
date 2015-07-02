'use strict';
angular.module('app').run(['$rootScope', '$state', '$stateParams', "$window",  function($rootScope,   $state,   $stateParams, $window) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
          $rootScope.country = {code : "CO", name : "Colombia"};
          $rootScope.getScanner = $window.getScanner;
          
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
          
          $urlRouterProvider.otherwise('/app/panel');

          $stateProvider
            .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html'
              })
              .state('app.panel', {
                  url: '/panel',
                  templateUrl: 'tpl/board.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load([
                          'assets/js/controllers/chart.js',
                          'assets/js/services/provider.js',
                          'assets/js/services/file.js'
                          ]);
                    }]
                  }
              })
              // pages
              .state('app.page', {
                  url: '/page',
                  template: '<div ui-view class="fade-in-down"></div>'
              })

              /* start shopFly pages */
              .state('app.page.dependencia', {
                  url: '/dependencia',
                  templateUrl: 'tpl/pages/page_dependencia.html',
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
              .state('app.page.barrio', {
                  url: '/barrio',
                  templateUrl: 'tpl/pages/page_barrio.html',
                  controller : 'barrioController',
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
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                  return $ocLazyLoad.load([
                                      'assets/js/controllers/perfilController.js'
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
              .state('app.page.iva', {
                  url: '/iva',
                  templateUrl: 'tpl/pages/page_iva.html',
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
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['toaster', 'ui.select']).then(
                              function(){
                                 return $ocLazyLoad.load([
                                  'assets/js/controllers/documentarController.js',
                                  'assets/js/directives/file.js',
                                  'assets/js/directives/path.js'
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
                  resolve:{
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select', 'toaster']).then(
                              function(){
                                  return $ocLazyLoad.load([
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
              .state('app.page.empresa', {
                  url: '/empresa',
                  templateUrl: 'tpl/pages/page_empresa.html',
                  controller : 'empresaController',
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
              .state('app.page.cliente', {
                  url: '/cliente',
                  templateUrl: 'tpl/pages/page_cliente.html',
                  controller : 'clienteController',
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
                  templateUrl: 'tpl/pages/cliente_list.html',
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
