angular.module('authServices',[])
.factory('Auth', function($http){
    authFactory = {};

    authFactory.create = function(loginData){
        return $http.post('api/authenticate', loginData);
    }
    return authFactory;
})