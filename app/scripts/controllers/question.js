'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('questionCtrl', ['$scope','$firebase','$firebaseArray','Upload','$timeout','blockUI', function($scope,$firebase,$firebaseArray,Upload,$timeout,blockUI) {
  	var ref = new Firebase("https://kiddo-56f35.firebaseio.com/course/");
  	var sync = $firebaseArray(ref);
  	console.log(sync.length);
  	$scope.titles = [];


  	$scope.filter1 = function(){
  		$scope.question.subject="";
  		$scope.titles = [];
  		var i;
  		var j=0;
  		for(i=0;i<sync.length;i++){
  			if($scope.question.grade==sync[i].grade){
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
  			if($scope.question.grade==sync[i].grade && $scope.question.subject==sync[i].subject){
  				$scope.titles[j]=sync[i].title;
  				j++;
  			}
  		}

  	};

  	$scope.AddQuestion = function(files){
  		var question;
      var file;
  
		var fb = new Firebase("https://kiddo-56f35.firebaseio.com/question/");

  		if($scope.question.questionType =="Text Question"){
  	    	question = $scope.question.question;
  	    }
  	    else{
  	    	Upload.base64DataUrl(files).then(function(base64Urls) {
 				     file = base64Urls;
             question = file[0];
        	});
  		}


  		   setTimeout(function(){
			fb.push({
	            grade: $scope.question.grade,
	            subject: $scope.question.subject,
	            title : $scope.question.title,
	            type : $scope.question.questionType,
	            question : question,
	            answer1 : $scope.question.answer1,
	            answer2 : $scope.question.answer2,
	            answer3 : $scope.question.answer3,
	            answer4 : $scope.question.answer4,
	            canswer : $scope.question.canswer

	            },function(error) {
	                if (error) {
	                    console.log("Error:",error);
	                } else {
	                	$scope.question = {};
	                	$scope.files = "";
						console.log("Post set successfully!");
	                }

	         });
			$scope.question = {};
		}, 500);
           
  
  	};


}]);