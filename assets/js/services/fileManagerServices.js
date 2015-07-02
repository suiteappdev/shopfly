'use strict';

angular.module('app')
	.service('$fileManagerService', ['$document', '$q', '$timeout', function($document, $q, $timeout){
		try{
			var fse = require('fs-extra')
		}catch(e){

		}

		this.fileSize = function(bytes, si){
		    var thresh = si ? 1000 : 1024;
		    
		    if(Math.abs(bytes) < thresh) {
		        return bytes + ' B';
		    }

		    var units = si
		        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
		        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
		    var u = -1;
		    
		    do {
		        bytes /= thresh;
		        ++u;
		    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
		    
		    return bytes.toFixed(1)+' '+units[u];
		}

		this.Create = function(file, cb){
			fse.createFile(file, cb);
		}

		this.Remove = function(file, cb){
			fse.remove(file, cb);
		}

		this.CopyFile = function(src, dest, cb){
			fse.copy(src, dest, cb); 
		}

		this.copyFiles = function(src, dest, cb){
			fse.copy(src, dest, cb); 
		}
}]);