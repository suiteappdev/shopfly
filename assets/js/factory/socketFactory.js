angular.module('app').factory('$socket', function ($rootScope, $docFlyConf) {
        var socket = io.connect($docFlyConf.socketUrl);

  return {
        initialize : function(){
            socket.on("connection", function(){
                if($rootScope.user){
                    socket.emit('newClient', $rootScope.user.cliente);
                }
            });
        },
        on: function (eventName, callback) {
            socket.on(eventName, function () {  
                var args = arguments;

                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;

                $rootScope.$apply(function () {
                    if (callback) {
                            callback.apply(socket, args);
                    }
                });
            })
        }
    };
});