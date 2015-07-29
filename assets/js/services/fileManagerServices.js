'use strict';

angular.module('app')
	.service('$fileManagerService', ['$document', '$q', '$timeout', function($document, $q, $timeout){
		try{
			var fse = require('fs-extra');
			var fs = require('fs');
			var path = require('path'); 
			var walk = require('walk')

			this.walker = walk;
			this.path = path;
			this.fs = fs;
			this.fse = fse;
			this.createDir = fse.mkdirp;
			this.Move = fse.move;
			this.Create = fse.createFile;
			this.Remove = fse.remove;
			this.copyFile = fse.copy
			this.copy = fse.copy;			
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
}]);