var app=angular.module('travelDiary',['ngRoute','ui.bootstrap']);



    app.config(['$routeProvider',function($routeProvider,$routeParams){
           
        $routeProvider
        .when('/',{templateUrl:'./app/components/home/homeView.html'})
        .when('/articles',
        {templateUrl:'./app/components/article/allArticlesView.html',controller:'allArticleController'}
        )
        .when('/article/:id',{templateUrl:'./app/components/article/articleView.html'})
        .when('/postDiary',{templateUrl:'./app/components/article/postDiaryView.html'});

    }
    
    ]);
/*
    app.controller('popupService',['$scope','$uibModal', function($scope,$uibModal){

        $scope.openLogin=function(){
           var openModal= $uibModal.open({
                templateUrl:'./app/components/login/loginView.html',
                
            });
        }

       

    }]);
    */

   // For login  popup
   angular.module('travelDiary').controller('popupService', ['$scope','$modal',function ($scope, $modal) {

       $scope.open = function () {

           event.preventDefault();
           var modalInstance = $modal.open({
                 controller: 'PopupCont',
                 templateUrl: './app/components/login/loginView.html',
           });
       }

    //for signup
       $scope.openSignup = function () {

        event.preventDefault();
        var modalInstance = $modal.open({
              controller: 'PopupSignup',
              templateUrl: './app/components/register/registerView.html',
        });
    }




   }]);

   angular.module('travelDiary').controller('PopupCont', ['$scope','$modalInstance',function ($scope, $modalInstance) {
       $scope.close = function () {
           $modalInstance.dismiss('cancel');
       };
   }]);

   angular.module('travelDiary').controller('PopupSignup', ['$scope','$modalInstance',function ($scope, $modalInstance) {
    $scope.closeSignup = function () {
        $modalInstance.dismiss('cancel');
    };
   }]);



   // For login popup ends

  


  angular.module('travelDiary').controller('allArticleController', function ($scope, $http) {
    
    $scope.loading = true;
     
    $http.get("http://marufdryfruit.com/APITourmonk/API/articles")
    .then(function mySuccess(response) {
        $scope.myWelcome = response.data;
        console.log(response.data);
    },

    function myError(response) {
        $scope.myWelcome = response.statusText;
        console.log(response.statusText);
    }

    ).finally(function() {
        // called no matter success or failure
        $scope.loading = false;
    });
 
   

  });


  //submit article, post diary


  angular.module('travelDiary').controller('addArticleController', function ($scope, $http) {
    
  
    

    $scope.submitArticle=function(){

        $scope.article_user_id=1;
        $scope.article_name=null;
        $scope.article_description=null;

        var data={article_user_id:'1',article_name:'testing',article_description:'testing7'};
         
    
     
        $http.post("http://marufdryfruit.com/APITourmonk/API/addArticle", data)
        .then(function mySuccess(response) {
            $scope.successMessage = "Form submitted successfully";
            $scope.successMessagebool = true;
            $scope.myWelcome = response.data;
            console.log(response.data);
        },

        function myError(response) {
            $scope.myWelcome = response.statusText;
            console.log(response.statusText);
        }

        ); 

   }
 
   

  });

  //upload image
  angular.module('travelDiary').controller('uploadImage',
            function MyCtrl($scope) {
                $scope.data = 'none';    
                $scope.addPhoto = function(){
                var f = document.getElementById('file').files[0],
                    r = new FileReader();
                r.onloadend = function(e){        
                    var binary = "";
            var bytes = new Uint8Array(e.target.result);
            var length = bytes.byteLength;

            for (var i = 0; i < length; i++) 
            {
                binary += String.fromCharCode(bytes[i]);
            }

            $scope.data = (binary).toString();

                    alert($scope.data);
                }
                r.readAsArrayBuffer(f);
                }
            }

  );



   