angular.module('verticalScrollingTest.article', [])
.controller('ArticleCtrl', function () {
  var vm = this;

  var types = [
    'blue',
    'yellow',
    'green',
    'red',
    'purple'
  ];

  vm.type = types[Math.floor(Math.random() * types.length)];
});
