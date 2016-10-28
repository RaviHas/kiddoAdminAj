'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('viewquizCtrl', ['$scope','$firebase','$firebaseArray','$firebaseObject','Upload','$timeout','blockUI', function($scope,$firebase,$firebaseArray,$firebaseObject,Upload,$timeout,blockUI) {
  	
    var ref = new Firebase('https://kiddo-56f35.firebaseio.com/quiz');
    var sync = $firebaseArray(ref);
    $scope.quizzes = sync;

    var ref = new Firebase("https://kiddo-56f35.firebaseio.com/course/");
  	var sync = $firebaseArray(ref);

    var ref2 = new Firebase("https://kiddo-56f35.firebaseio.com/question/");
    var sync2 = $firebaseArray(ref2);

  	$scope.titles = [];

  	$scope.filter1 = function(){
  		$scope.quiz.subject="";
  		$scope.titles = [];
  		var i;
  		var j=0;
  		for(i=0;i<sync.length;i++){
  			if($scope.quiz.grade==sync[i].grade){
  				$scope.titles[j]=sync[i].title;
  				j++;
  			}
  		}

  	};


  	$scope.filter2 = function(){
  		$scope.titles = [];
  		var i;
  		var j=0;
  		for(i=0;i<sync.length;i++){
  			if($scope.quiz.grade==sync[i].grade && $scope.quiz.subject==sync[i].subject){
  				$scope.titles[j]=sync[i].title;
  				j++;
  			}
  		}

  	};

  	
    $scope.editQuiz = function(id){
          var ref = new Firebase('https://kiddo-56f35.firebaseio.com/quiz/' + id);
          $scope.quiz = $firebaseObject(ref);
          console.log($scope.quiz );
    };


    $scope.updateQuiz = function(id){

    swal({
      title: "Do you want to update this record?",
      type: "info",
      showCancelButton: true,
      confirmButtonClass: "btn-primary",
      confirmButtonText: "Yes",
      closeOnConfirm: false
    }, function () {
      
      var count=0;
      var i=0;
      for(i=0;i<sync2.length;i++){
        if($scope.quiz.grade==sync2[i].grade && $scope.quiz.subject==sync2[i].subject && $scope.quiz.title==sync2[i].title){
          count++;
        }
      }
      if($scope.quiz.noOfQuestion<=count){
        var ref = new Firebase('https://kiddo-56f35.firebaseio.com/quiz/' + id);
        ref.update({
          grade   : $scope.quiz.grade,
          subject : $scope.quiz.subject,
          title   : $scope.quiz.title,
          noOfQuestion : $scope.quiz.noOfQuestion

      },function(error) {
        if (error) {
           swal("Oops...", error, "error");
        } else {
            $scope.quiz = {};
            console.log("Post set successfully!");
            $scope.$apply();
            swal("Successfully Updated!", "", "success");
            $("#editModal").modal('hide');
        }

    });

    }
    else{
      swal("Oops...", "Less no of questions in database please add questions and try again", "error");
    }

    });


  };

    $scope.deleteQuiz = function(deleteQuiz){
    swal({
      title: "Are you sure?",
      text: "Your will not be able to recover this record!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
    function(){
      $scope.quizzes.$remove(deleteQuiz);
      swal("Deleted!", "Your record has been deleted.", "success");
    });
  };

}]);