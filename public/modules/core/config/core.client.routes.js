'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

    // Home state routing
    $stateProvider.
      state('home', {
        url: '/',
        templateUrl: 'modules/core/views/home.client.view.html'
      }).
      state('about', {
        url: '/about',
        templateUrl: 'modules/core/views/about.client.view.html'
      }).
      state('improve', {
        url: '/improve',
        templateUrl: 'modules/core/views/improve.client.view.html'
      }).
      state('businessSupport', {
        url: '/businessSupport',
        templateUrl: 'modules/core/views/businessSupport.client.view.html'
      }).
      state('projects', {
        url: '/projects',
        templateUrl: 'modules/core/views/projects.client.view.html'
      }).
      state('scanNetwork', {
        url: '/scanNetwork',
        templateUrl: 'modules/core/views/scanNetwork.client.view.html'
      }).

      state('scanManage', {
        url: '/scanManage',
        templateUrl: 'modules/core/views/scanManage.client.view.html'
      }).
      state('mailServer', {
        url: '/mailServer',
        templateUrl: 'modules/core/views/mailServer.client.view.html'
      }).
      state('sequrity', {
        url: '/sequrity',
        templateUrl: 'modules/core/views/sequrity.client.view.html'
      }).
      state('virtualServers', {
        url: '/virtualServers',
        templateUrl: 'modules/core/views/virtualServers.client.view.html'
      }).
      state('antiSpam', {
        url: '/antiSpam',
        templateUrl: 'modules/core/views/antiSpam.client.view.html'
      }).
      state('recovery', {
        url: '/recovery',
        templateUrl: 'modules/core/views/recovery.client.view.html'
      })
      .state('outSource', {
        url: '/outSource',
        templateUrl: 'modules/core/views/out-source.client.view.html'
      });


  }
]);
