'use strict';

angular.module('app')
	.service('$webkitService', ['$document', '$q', '$timeout', function($document, $q, $timeout){
		
		try{
	   		var gui = require('nw.gui');
		    this.giu = gui;
		    this.win = gui.Window.get();	   		
		}catch(e){}

}]);
