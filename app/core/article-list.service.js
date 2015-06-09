angular.module('verticalScrollingTest.articleList', [])
.factory('articleList', function ($document, $window, $compile, $templateCache, scroll, $rootScope, $log) {

  scroll.init(onScroll);

  var articleTempl = $templateCache.get('app/sections/articles/article.html');
  var container, viewportH;
  var service = {
    posMark: 0,
    didRenderArticle: false,
    articleCount: 0
  };

  service.init = function() {
    viewportH = Math.max($document[0].documentElement.clientHeight, $window.innerHeight || 0);
    container = $document.find('main');
    renderArticle();
    service.posMark = -viewportH;
  };

  service.register = function(height) {
    service.posMark += 0.5 * height;
    $log.log('☞ Next marker at', service.posMark);
    service.didRenderArticle = false;
  };

  function onScroll(position) {
    if (position >= service.posMark && !service.didRenderArticle) {
      renderArticle();
    }
  }

  function randomNumber(minimum, maximum) {
    return Math.round(Math.random() * (maximum - minimum) + minimum);
  }

  function renderArticle() {
    var scope = $rootScope.$new();
    var types = [
      'blue',
      'yellow',
      'green',
      'red',
      'purple'
    ];

    scope.type = types[Math.floor(Math.random() * types.length)];
    scope.paragraphs = new Array(randomNumber(1, 5));
    service.didRenderArticle = true;
    service.articleCount++;
    container.append($compile(articleTempl)(scope));
    $log.log('📰 Rendering a new article');
    $log.log('Article Count:', service.articleCount);
  }

  return service;
});
