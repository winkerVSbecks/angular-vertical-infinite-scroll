'use strict';

angular.module('verticalScrollingTest', [
  'ngAnimate',
  'ui.router',
  'verticalScrollingTest.main',
  'verticalScrollingTest.article',
  'verticalScrollingTest.scroll',
  'verticalScrollingTest.articleList',
  'verticalScrollingTest.locMarker'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');

  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'app/sections/main/main.html',
      controller: 'MainCtrl as main'
    });
});
