'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('storybookCtrl', ['$scope','$firebase','Upload','$timeout','blockUI', '$window', function($scope,$firebase,Upload,$timeout,blockUI,$window) {

       

 /***** Add data to firebase *****/
    $scope.AddPost = function(files) {

                swal({
                  title: "Do you want to insert this record?",
                  type: "info",
                  showCancelButton: true,
                  closeOnConfirm: false,
                  showLoaderOnConfirm: true
                },
                function(){
                   var fb = new Firebase("https://kiddo-56f35.firebaseio.com/storybook/");

                    var title = $scope.storybook.title;
                    var description  = $scope.storybook.description;
                    

                setTimeout(function () {
                  Upload.base64DataUrl(files).then(function(base64Urls) {
                    fb.push({
                        title:     title,
                        description:      description,
                        images : base64Urls,

                    },function(error) {
                        if (error) {
                          console.log("Error:",error);
                        } else {
                            $scope.storybook = {};
                            $scope.files = "";
                            console.log("Post set successfully!");
                            $scope.$apply();
                            swal("successfully added!", "", "success");
                            $window.location.reload();
                          }

                    });
                });
             }, 2000);
                  
          });

    }

}]);