'use strict';

angular.module('app')
	.service('$awsupload', ['$document', '$q', '$timeout', '$http', function($document, $q, $timeout, $http){
		this.upload = function(formData) {
			console.log(formData.destPath)
			console.log(formData.v)
			// Enviar solicitud POST a la URL /upload con los datos de formData.
			//alert('upload')
			  return $http.post('http://127.0.0.1:3000/upload', formData, {
			  headers: { 'Content-Type': undefined },
			  transformRequest: angular.identity
			});
		  };

		  this.getfiles = function(directorio){
			console.log(directorio)
			// Enviar solicitud GET a la URL /s3files con los datos de formData.
			return $http.get('http://127.0.0.1:3000/s3files',{
				params: { Prefix: directorio },
			  });
		  }
		
	}]);
