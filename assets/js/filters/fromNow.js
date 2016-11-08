'use strict';
angular.module('app')
  .filter('fromNow', function($window) {
      return function(date) {
        if($window.moment){
          return $window.moment(date).locale("es").fromNow();
        }

        try{
            var moment = require('moment').locale("es");
            return global.moment(date).fromNow();
        }catch(e){

        }
      }
  });

angular.module('app').filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
          items.forEach(function(item) {
            var itemMatches = false;

            var keys = Object.keys(props);
            for (var i = 0; i < keys.length; i++) {
              var prop = keys[i];
              var text = props[prop].toLowerCase();
              if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                itemMatches = true;
                break;
              }
            }

            if (itemMatches) {
              out.push(item);
            }
          });
        } else {
          // Let the output be the input untouched
          out = items;
        }

        return out;
    };
})