angular.module('verticalScrollingTest.scroll', [])
.factory('scroll', function ($document, $log, $window) {

  var service = {};
  var documentElement;

  service.init = function(callback) {
    documentElement = $document[0].documentElement;

    $document.bind('scroll', function() {
      var scrollPos = calcScrollTop();
      callback(scrollPos);
    });
  };

  function calcScrollTop() {
    return ($window.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0);
  }

  return service;
})
