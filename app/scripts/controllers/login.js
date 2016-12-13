'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location) {

  	$scope.erro = false;

    $scope.submit = function(auth) {
    	console.log(auth);

    	if(auth.email == "admin" && auth.password == "admin"){
			$location.path('/dashboard');
			$scope.erro = false;    	}
		else{
			$scope.erro = true;
		}

      return false;
    }

  });
