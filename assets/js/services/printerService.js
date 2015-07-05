'use strict';

angular.module('app')
	.service('$printerService', ['$document', '$q', '$timeout', function($document, $q, $timeout){
		try{
			var edge = require('edge');
		}catch(e){

		}
	
	this.getPrinters = function(){
		return edge.func({
				assemblyFile: 'assembly/scanner.dll',
				typeName: 'scanner.provider',
				methodName: 'GetScanners'
		});
	}

	this.scanFromHtml = function(){
		return edge.func({
			assemblyFile: 'assembly/scanner.dll',
			typeName: 'scanner.provider',
			methodName: 'ScanfromHtml'
		});
	}

}]);
