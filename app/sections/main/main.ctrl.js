angular.module('verticalScrollingTest.main', [])
.controller('MainCtrl', function (articleList) {

  var vm = this;

  articleList.init();

});
