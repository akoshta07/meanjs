angular.module('mainController', ['authServices'])
.controller('mainCtrl',function(Auth, $timeout, $location){
    
    var app =this;

    this.doLogin = function(loginData){
        app.loading=true;
        app.errorMsg = false;
        app.successMsg = false;

        Auth.create(app.loginData).then(function(data){
    
            if(data.data.success){
                app.loading=false;
                //Create success message
                app.successMsg = data.data.message + '...Redirecting'
                //Redirect to home page
                $timeout(function(){
                    $location.path('/about');
                },2000)
            }
            else{
                app.loading=false;
                app.errorMsg = data.data.message;  
            }
        })
    };
});