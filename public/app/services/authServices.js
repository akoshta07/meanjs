angular.module('authServices',[])
.factory('Auth', function($http, AuthToken,$q){
    authFactory = {};

    authFactory.create = function(loginData){
        return $http.post('api/authenticate', loginData).then(function(data){
            AuthToken.setToken(data.data.token);
            console.log(data.data.token);
            return data;
        });
    };

    authFactory.isLoggedIn = function(){
        if(AuthToken.getToken()){
            return true;
        }
        else{
            return false
        }
    };

    authFactory.getUser = function(){
        if(AuthToken.getToken()){
            return $http.post('/api/me');
        }
        else{
            $q.reject({message:"User has no token"})
        }
    };

    authFactory.logout =function(){
        AuthToken.setToken();
    };

    return authFactory;
})

.factory('AuthToken', function($window){
    var authTokenFactory = {};

    //AuthToken.setToken(token)
    authTokenFactory.setToken = function(token){
        if(token){
        $window.localStorage.setItem('token', token ); //store token in browser
        }
        else{
            $window.localStorage.removeItem('token');   
        }
    };

    //AuthToken.getToken(token)
    authTokenFactory.getToken = function(){
        return $window.localStorage.getItem('token');
    };

    return authTokenFactory;
})

.factory('AuthInterceptors',function(AuthToken){
    var authInterceptorsFactory={};

    authInterceptorsFactory.request=function(config){
        var token = AuthToken.getToken();

        if(token) config.headers['x-access-token']=token;

        return config;
    }

    return authInterceptorsFactory;
})