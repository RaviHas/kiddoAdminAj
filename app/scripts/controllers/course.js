'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
 angular.module('yapp')
 .controller('courseCtrl', ['$scope','$firebase','blockUI', function($scope,$firebase,blockUI) {

     

   /***** Add data to firebase *****/


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

    blockUI.start();
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

        }

    });
    
    swal("successfully added!", "", "success");
});
}


}]);