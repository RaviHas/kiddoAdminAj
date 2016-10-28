'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('quizCtrl', ['$scope','$firebase','$firebaseArray','Upload','$timeout','blockUI', function($scope,$firebase,$firebaseArray,Upload,$timeout,blockUI) {
  	var ref = new Firebase("https://kiddo-56f35.firebaseio.com/course/");
  	var sync = $firebaseArray(ref);

    var ref2 = new Firebase("https://kiddo-56f35.firebaseio.com/question/");
    var sync2 = $firebaseArray(ref2);

    var quizfb = new Firebase("https://kiddo-56f35.firebaseio.com/quiz/");
    var sync3 = $firebaseArray(quizfb);

  	console.log(sync);
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

  	$scope.AddQuiz = function(){
  		swal({
      title: "Do you want to insert this record?",
      type: "info",
      showCancelButton: true,
      confirmButtonClass: "btn-primary",
      confirmButtonText: "Yes",
      closeOnConfirm: false
    }, function(){
      var count=0;
      var i=0;
      for(i=0;i<sync2.length;i++){
        if($scope.quiz.grade==sync2[i].grade && $scope.quiz.subject==sync2[i].subject && $scope.quiz.title==sync2[i].title){
          count++;
        }
      }
      if($scope.quiz.noOfQuestion<=count){
        
        var i;
        var notfind = true;
        for(i=0;i<sync3.length;i++){
            if($scope.quiz.grade==sync3[i].grade && $scope.quiz.subject==sync3[i].subject && $scope.quiz.title==sync3[i].title)
              notfind=false;
        } 

        if(notfind){
           blockUI.start();
          quizfb.push({
            grade   : $scope.quiz.grade,
            subject : $scope.quiz.subject,
            title   : $scope.quiz.title,
            noOfQuestion : $scope.quiz.noOfQuestion

          },function(error) {
            if (error) {
                console.log("Error:",error);
            } else {
                $scope.quiz = {};
                blockUI.stop();
                console.log("Post set successfully!");
                $scope.$apply();
            }

          });
        
          swal("successfully added!", "", "success");
        }

        else{
          swal("Oops...", "Given Quiz has already been added", "error");
        }
       
    }
    else{
      swal("Oops...", "Less no of questions in database please add questions and try again", "error");
    }
    });


  }

}]);