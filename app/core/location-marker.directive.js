angular.module('verticalScrollingTest.locMarker', [
  'verticalScrollingTest.articleList'
])
.directive('locMarker', function(articleList, $timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var elementWatcher = scrollMonitor.create(element[0]);

      elementWatcher.enterViewport(function() {
        $timeout(function() {
          elementWatcher.destroy();
          articleList.register(element[0].offsetHeight);
        });
      });
    }
  };
})
