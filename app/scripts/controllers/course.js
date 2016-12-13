'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
 angular.module('yapp')
 .controller('courseCtrl', ['$scope','$firebase','blockUI','$window','$timeout', function($scope,$firebase,blockUI,$window,$timeout) {

     

   /***** Add data to firebase *****/
   $scope.regex = '^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$';

   $scope.AddCourse = function() {


    swal({
      title: "Do you want to insert this record?",
      type: "info",
      showCancelButton: true,
      confirmButtonClass: "btn-primary",
      confirmButtonText: "Yes",
      closeOnConfirm: false
  },
  function(){
    var fb = new Firebase("https://kiddo-56f35.firebaseio.com/course/");
    var grade = $scope.course.grade;
    var subject  = $scope.course.subject;
    var title  = $scope.course.title;
    var description  = $scope.course.description;
    var url  = $scope.course.url;

    setTimeout(function(){
    fb.push({
        grade   : grade,
        subject : subject,
        title   : title,
        description : description,
        url     : url,

    },function(error) {
        if (error) {
            console.log("Error:",error);
        } else {
            $scope.course = {};
            blockUI.stop();
            console.log("Post set successfully!");
            $scope.$apply();
            
            swal("successfully added!", "", "success");
            $window.location.reload();

        }
          
    });
    
  }, 150);

});

}

}]);