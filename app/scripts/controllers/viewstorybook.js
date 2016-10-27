'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('viewStorybookCtrl', ['$scope','$firebase', '$firebaseArray', '$firebaseObject', 'Upload', 'blockUI', function($scope,$firebase,$firebaseArray,$firebaseObject,Upload,blockUI) {

  	blockUI.start();
  	var ref = new Firebase('https://kiddo-56f35.firebaseio.com/storybook');
    var sync = $firebaseArray(ref);
    $scope.storybooks = sync;
    blockUI.stop();
  	console.log($scope.storybooks);

  	$scope.editBook = function(id){
  		var ref = new Firebase('https://kiddo-56f35.firebaseio.com/storybook/' + id);
  		$scope.editBookData = $firebaseObject(ref);
  		console.log($scope.editBookData);
  	};

  	$scope.updateBook = function(id){
  		var ref = new Firebase('https://kiddo-56f35.firebaseio.com/storybook/' + id);
		var images = [];
		var i;
		for(i=0; i<$scope.editBookData.images.length; i++){
			if(typeof $scope.editBookData.images[i] != "string"){
				Upload.base64DataUrl($scope.editBookData.images[i]).then(function(base64Urls) {
   				images.push(base64Urls);

        		});
			}
			else{
				images.push($scope.editBookData.images[i]);
			}
			
		}

		setTimeout(function(){
		//blockUI.start();
			ref.update({
	            title: $scope.editBookData.title,
	            description: $scope.editBookData.description,
	            images : images,

	            },function(error) {
	                if (error) {
	                    console.log("Error:",error);
	                } else {
	                	blockUI.stop();
						$("#editModal").modal('hide');
	                }

	         });

		}, 1000);
		
      };
  	

     $scope.deleteConf = function(book){
     	$scope.deleteBook = book;
     };

     $scope.deleteStoryBook = function(deleteBook){
     	$scope.storybooks.$remove(deleteBook);
     	$("#deleteModal").modal('hide');
     }

}]);