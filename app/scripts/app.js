 'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('yapp', [
    'ui.router',
    'ngAnimate',
    'ngFileUpload',
    'angularFileUpload',
    'firebase',
    'blockUI'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/course');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
          .state('course', {
            url: '/course',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/overview.html',
            controller: 'courseCtrl'
          })
          .state('question', {
            url: '/question',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/question.html',
            controller: 'questionCtrl'
          })
          .state('viewquestion', {
            url: '/viewquestion',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/viewquestion.html',
            controller: 'viewquestionCtrl'
          })
            .state('storybook', {
            url: '/storybook',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/storybook.html',
             controller: 'storybookCtrl'
          })
            .state('viewstorybook', {
            url: '/viewstorybook',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/viewstorybook.html',
            controller: 'viewStorybookCtrl'
          })
            .state('events', {
            url: '/events',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/events.html'
          })
            .state('managecourse', {
            url: '/managecourse',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/managecourse.html',
            controller: 'managecoursrctrl'
          });
           

  });
