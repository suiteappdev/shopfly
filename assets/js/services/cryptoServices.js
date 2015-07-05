'use strict';

angular.module('app')
	.service('$cryptoService', ['$document', '$q', '$timeout', '$docFlyConf', function($document, $q, $timeout, $docFlyConf){
		try{
			var crypto    = require('crypto');
		}catch(e){

		}

	this.encodeHmac = function(text, algorithm){
		var hmac = crypto.createHmac(algorithm, $docFlyConf.fileKey);

		hmac.setEncoding('hex');

		hmac.write(text);

		hmac.end();

		return hmac.read(); 
	}		


}]);