angular.module('mainController', ['authServices'])
.controller('mainCtrl',function(Auth, $timeout, $location,$rootScope,$window){
    
    var app =this;
    app.loadme = false;

    $rootScope.$on('$routeChangeStart',function(){
        if(Auth.isLoggedIn()){
            app.isLoggedIn = true;
            Auth.getUser().then(function(data){
                console.log(data.data.username);
                app.username=data.data.username;
                app.useremail=data.data.email;
                app.loadme = true;
            });
            
        }
        else{
            app.username = '';
            app.useremail = '';
            app.isLoggedIn = false;
            app.loadme = true;
        }
        if ($location.hash() == '_=_') $location.hash(null);
    });

    this.facebook = function(){
        $window.location =  $window.location.protocol +'//' +$window.location.host + '/auth/facebook';
    };

    this.doLogin = function(loginData){
        app.loading=true;
        app.errorMsg = false;

        Auth.create(app.loginData).then(function(data){
    
            if(data.data.success){
                app.loading=false;
                //Create success message
                app.successMsg = data.data.message + '...Redirecting'
                //Redirect to home page
                $timeout(function(){
                    $location.path('/about');
                    app.loginData = ''
                    app.successMsg =false;
                },2000)
            }
            else{
                app.loading=false;
                app.errorMsg = data.data.message;  
            }
        })
    };

    this.logout = function(){
        Auth.logout();
        $location.path('/logout');
        $timeout(function(){
            $location.path('/');
        }, 2000);
    };
});