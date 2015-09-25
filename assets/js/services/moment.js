'use strict';
angular.module('app').service('$moment',["$timeout", "$window", function($timeout, $window){
		return $window.moment || require('moment');
}]);
