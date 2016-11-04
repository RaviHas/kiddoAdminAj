'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('viewquestionCtrl', ['$scope','$firebase','$firebaseArray','$firebaseObject','Upload','$timeout','blockUI', function($scope,$firebase,$firebaseArray,$firebaseObject,Upload,$timeout,blockUI) {

  	var ref = new Firebase('https://kiddo-56f35.firebaseio.com/question');
    var sync = $firebaseArray(ref);
    $scope.questions = sync;
    blockUI.stop();
  	console.log($scope.questions);

  	var ref1 = new Firebase("https://kiddo-56f35.firebaseio.com/course/");
  	var sync1 = $firebaseArray(ref1);
  	console.log(sync);
  	$scope.titles = [];

  	$scope.editQuestion = function(id){
  		var ref = new Firebase('https://kiddo-56f35.firebaseio.com/question/' + id);
 		$scope.editQuestionData = $firebaseObject(ref);
 		console.log($scope.editQuestionData );

		$scope.filter1 = function(){
  		$scope.editQuestionData.subject="";
  		$scope.titles = [];
  		var i;
  		var j=0;
  		for(i=0;i<sync1.length;i++){
  			if($scope.editQuestionData.grade==sync1[i].grade){
  				$scope.titles[j]=sync1[i].title;
  				j++;
  			}
  		}

  	};


  	$scope.filter2 = function(){
  		$scope.titles = [];
  		var i;
  		var j=0;
  		for(i=0;i<sync1.length;i++){
  			if($scope.editQuestionData.grade==sync1[i].grade && $scope.editQuestionData.subject==sync1[i].subject){
  				$scope.titles[j]=sync1[i].title;
  				j++;
  			}
  		}

  	}; 		

  	};


  	 	$scope.updateQuestion = function(id){

 		swal({
 			title: "Do you want to update this record?",
 			type: "info",
 			showCancelButton: true,
 			closeOnConfirm: false,
 			showLoaderOnConfirm: true
 		}, function () {
 			var ref = new Firebase('https://kiddo-56f35.firebaseio.com/question/' + id);
 			var i;
 			var question;
      var file;
      console.log('parent------>',$scope.files);

			if($scope.editQuestionData.type =="Text Question"){
  	    		question = $scope.editQuestionData.question;
  	    	}
  	    	else{
 					if(typeof $scope.files == "object"){
 						Upload.base64DataUrl($scope.files).then(function(base64Urls) {
 							file=base64Urls;
             question = file[0];
              console.log('file------->',file);
              console.log('question------>',question);

 						});
 					}	
 					else{
 						question=$scope.editQuestionData.question;
            console.log('questionelse------>',question);
 					}
  			}


 			setTimeout(function () {
 				ref.update({
 					grade: $scope.editQuestionData.grade,
	            	subject: $scope.editQuestionData.subject,
	            	title : $scope.editQuestionData.title,
	            	type : $scope.editQuestionData.type,
	            	question : question,
	            	answer1 : $scope.editQuestionData.answer1,
	            	answer2 : $scope.editQuestionData.answer2,
	            	answer3 : $scope.editQuestionData.answer3,
	            	answer4 : $scope.editQuestionData.answer4,
	            	canswer : $scope.editQuestionData.canswer

 				},function(error) {
 					if (error) {
 						console.log("Error:",error);
 					} else {
 						$("#editModal").modal('hide');
 						swal("successfully Updated!", "", "success");
            $scope.files = "";
 					}

 				});
 				
 			}, 2000);
 		});


 	};


 	 $scope.deleteQuestion = function(deleteQue){
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
 			$scope.questions.$remove(deleteQue);
 			swal("Deleted!", "Your record has been deleted.", "success");
 		});
 		
 	}

}]);