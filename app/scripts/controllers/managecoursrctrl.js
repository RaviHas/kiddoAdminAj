'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
 angular.module('yapp')
 .controller('managecoursrctrl', ['$scope','$firebase', '$firebaseArray', '$firebaseObject', 'Upload', 'blockUI', function($scope,$firebase,$firebaseArray,$firebaseObject,Upload,blockUI) {

 	$scope.regex = '^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$';
 	blockUI.start();
 	var ref = new Firebase('https://kiddo-56f35.firebaseio.com/course');
 	var sync = $firebaseArray(ref);
 	$scope.courses = sync;
 	blockUI.stop();
 	console.log($scope.courses);

 	$scope.editCourse = function(id){
 		var ref = new Firebase('https://kiddo-56f35.firebaseio.com/course/' + id);
 		$scope.editCourseData = $firebaseObject(ref);
 		console.log($scope.editCourseData);
 	};

 	$scope.updateBook = function(id){


 		swal({
 			title: "Do you want to update this record?",
 			type: "info",
 			showCancelButton: true,
 			confirmButtonClass: "btn-primary",
 			confirmButtonText: "Yes",
 			closeOnConfirm: false
 		},
 		function(){
 			var ref = new Firebase('https://kiddo-56f35.firebaseio.com/course/' + id);
 			var grade = $scope.editCourseData.grade;
 			var subject  = $scope.editCourseData.subject;
 			var title  = $scope.editCourseData.title;
 			var description  = $scope.editCourseData.description;
 			var url  = $scope.editCourseData.url;
 			setTimeout(function(){
 				ref.update({
 					grade   : grade,
 					subject : subject,
 					title   : title,
 					description : description,
 					url     : url,

 				},function(error) {
 					if (error) {
 						console.log("Error:",error);
 					} else {
 						$("#editModal").modal('hide');
 					}

 				});

 			}, 1000);
 			
 			swal("successfully Updated!", "", "success");
 		});

 	};
 	

 	$scope.deleteConf = function(course){
 		$scope.deleteCourse = course;
 	};

 	$scope.deleteCourses = function(deleteCourse){
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
 			$scope.courses.$remove(deleteCourse);
 			$("#deleteModal").modal('hide');
 			swal("Deleted!", "Your record has been deleted.", "success");
 		});
 		
 	}

 }]);