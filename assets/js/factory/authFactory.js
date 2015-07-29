angular.module('app').factory('AuthenticationService', function() {
    var auth = {
        isAuthenticated: false,
        isAdmin: false
    }

    return auth;
});

angular.module('app').factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService, $localStorage) {
    return {
        request: function (config) {
            config.headers = config.headers || {};

            if ($localStorage.credential) {
                config.headers.Authorization = 'Bearer ' + $localStorage.credential.token;
            }
            
            return config;
        },

        requestError: function(rejection) {
            return $q.reject(rejection);
        },

        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 200 && $localStorage.credential && !AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = true;
            }

            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($localStorage.credential.token || AuthenticationService.isAuthenticated)) {
                AuthenticationService.isAuthenticated = true;
                $location.path("/app/panel");                
            }

            return $q.reject(rejection);
        }
    };
});

angular.module('app').factory('UserService', function ($API, $rootScope) {
    return {
        signIn: function(username, password) {
            return $API.Usuario.Login({ usuario : username , password : password});
        },

        logOut: function() {
            return $API.Usuario.Logout();
        },

        register: function(username, password, passwordConfirmation) {

        }
    }
});
