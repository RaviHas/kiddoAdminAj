'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('viewquestionCtrl', ['$scope','$firebase','$firebaseArray','Upload','$timeout','blockUI', function($scope,$firebase,$firebaseArray,Upload,$timeout,blockUI) {

  	var ref = new Firebase('https://kiddo-56f35.firebaseio.com/question');
    var sync = $firebaseArray(ref);
    $scope.questions = sync;
    blockUI.stop();
  	console.log($scope.questions);

}]);