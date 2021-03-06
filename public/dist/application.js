'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'netfix';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'ngS3upload'
      ];
    //'ngAnimate'
    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
      // Create angular module
      angular.module(moduleName, dependencies || []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('projects');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
// Configuring the Articles module
angular.module('articles').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
    Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
    Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
  }
]);'use strict';
// Setting up route
angular.module('articles').config([
  '$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider.state('listArticles', {
      url: '/articles',
      templateUrl: 'modules/articles/views/list-articles.client.view.html'
    }).state('createArticle', {
      url: '/articles/create',
      templateUrl: 'modules/articles/views/create-article.client.view.html'
    }).state('viewArticle', {
      url: '/articles/:articleId',
      templateUrl: 'modules/articles/views/view-article.client.view.html'
    }).state('editArticle', {
      url: '/articles/:articleId/edit',
      templateUrl: 'modules/articles/views/edit-article.client.view.html'
    });
  }
]);'use strict';
angular.module('articles').controller('ArticlesController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Articles',
  function ($scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
    $scope.create = function () {
      var article = new Articles({
          title: this.title,
          content: this.content
        });
      article.$save(function (response) {
        $location.path('articles/' + response._id);
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.remove = function (article) {
      if (article) {
        article.$remove();
        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };
    $scope.update = function () {
      var article = $scope.article;
      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.find = function () {
      $scope.articles = Articles.query();
    };
    $scope.findOne = function () {
      $scope.article = Articles.get({ articleId: $stateParams.articleId });
    };
  }
]);'use strict';
//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', [
  '$resource',
  function ($resource) {
    return $resource('articles/:articleId', { articleId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    }).state('about', {
      url: '/about',
      templateUrl: 'modules/core/views/about.client.view.html'
    }).state('improve', {
      url: '/improve',
      templateUrl: 'modules/core/views/improve.client.view.html'
    }).state('businessSupport', {
      url: '/businessSupport',
      templateUrl: 'modules/core/views/businessSupport.client.view.html'
    }).state('projects', {
      url: '/projects',
      templateUrl: 'modules/core/views/projects.client.view.html'
    }).state('scanNetwork', {
      url: '/scanNetwork',
      templateUrl: 'modules/core/views/scanNetwork.client.view.html'
    }).state('scanManage', {
      url: '/scanManage',
      templateUrl: 'modules/core/views/scanManage.client.view.html'
    }).state('mailServer', {
      url: '/mailServer',
      templateUrl: 'modules/core/views/mailServer.client.view.html'
    }).state('sequrity', {
      url: '/sequrity',
      templateUrl: 'modules/core/views/sequrity.client.view.html'
    }).state('virtualServers', {
      url: '/virtualServers',
      templateUrl: 'modules/core/views/virtualServers.client.view.html'
    }).state('antiSpam', {
      url: '/antiSpam',
      templateUrl: 'modules/core/views/antiSpam.client.view.html'
    }).state('recovery', {
      url: '/recovery',
      templateUrl: 'modules/core/views/recovery.client.view.html'
    }).state('contactus', {
      url: '/contactus',
      templateUrl: 'modules/core/views/contactus.client.view.html'
    }).state('manageNetworks', {
      url: '/manageNetworks',
      templateUrl: 'modules/core/views/manageNetworks.client.view.html'
    }).state('manageProducts', {
      url: '/manageProducts',
      templateUrl: 'modules/core/views/manageProducts.client.view.html'
    }).state('outSource', {
      url: '/outSource',
      templateUrl: 'modules/core/views/out-source.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
    $scope.logout = function () {
    };
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.slides = [
      {
        image: '/modules/images/business-leadership-3.png',
        active: true
      },
      {
        image: '/modules/images/images_slider2.jpg',
        active: false
      }
    ];
  }
]);$(document).ready(function () {
  $('.dropM').hide();
  $('.drop').hover(function () {
    $('.dropM').slideDown();
  });
  $('.drop').mouseleave(function () {
    $('.dropM').fadeOut();
  });
  /*IE Fixes */
  if ($.browser.msie && $.browser.version == 7) {
    $('#menu ul.dropM').css({ 'margin': '39px -104px 0px 0px' });
  }
  if ($.browser.msie) {
    $('input[type="text"]').css({ 'line-height': '39px' });
  }
});
$(function () {
  if (!$.support.placeholder) {
    var active = document.activeElement;
    $(':text').focus(function () {
      if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
        $(this).val('').removeClass('hasPlaceholder');
      }
    }).blur(function () {
      if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
        $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
      }
    });
    $(':text').blur();
    $(active).focus();
    $('form').submit(function () {
      $(this).find('.hasPlaceholder').each(function () {
        $(this).val('');
      });
    });
  }
});(function (f) {
  var n = 'inside';
  var t = 'outside';
  var E = 0;
  var F = 1;
  var m = {
      TL: 0,
      TC: 1,
      TR: 2,
      BL: 3,
      BC: 4,
      BR: 5,
      LT: 6,
      LC: 7,
      LB: 8,
      RT: 9,
      RC: 10,
      RB: 11
    };
  var e = 0;
  var l = {
      'block.top': e++,
      'block.right': e++,
      'block.bottom': e++,
      'block.left': e++,
      'block.drop': e++,
      'diag.fade': e++,
      'diag.exp': e++,
      'rev.diag.fade': e++,
      'rev.diag.exp': e++,
      'block.fade': e++,
      'block.exp': e++,
      'block.top.zz': e++,
      'block.bottom.zz': e++,
      'block.left.zz': e++,
      'block.right.zz': e++,
      'spiral.in': e++,
      'spiral.out': e++,
      'vert.tl': e++,
      'vert.tr': e++,
      'vert.bl': e++,
      'vert.br': e++,
      'fade.left': e++,
      'fade.right': e++,
      'alt.left': e++,
      'alt.right': e++,
      'blinds.left': e++,
      'blinds.right': e++,
      'vert.random.fade': e++,
      'horz.tl': e++,
      'horz.tr': e++,
      'horz.bl': e++,
      'horz.br': e++,
      'fade.top': e++,
      'fade.bottom': e++,
      'alt.top': e++,
      'alt.bottom': e++,
      'blinds.top': e++,
      'blinds.bottom': e++,
      'horz.random.fade': e++,
      none: e++,
      fade: e++,
      'h.slide': e++,
      'v.slide': e++,
      random: e++
    };
  var B = {
      fade: 0,
      down: 1,
      right: 2,
      up: 3,
      left: 4,
      none: 5
    };
  var r = 250;
  var h = 75;
  var b = 50;
  var s = 5000;
  var y = 800;
  var x = 500;
  var q = 600;
  var z = 4;
  var k = 50;
  var g = 'updatetext';
  var w = 'updatelist';
  var A = a(7);
  function c(G) {
    this._$stripes;
    this._arr;
    this._total;
    this._intervalId = null;
    this._rotator = G;
    this._areaWidth = G._screenWidth;
    this._areaHeight = G._screenHeight;
    this._size = G._vertSize;
    this._delay = G._vertDelay;
    this.init();
  }
  c.prototype.init = function () {
    this._total = Math.ceil(this._areaWidth / this._size);
    if (this._total > r) {
      this._size = Math.ceil(this._areaWidth / r);
      this._total = Math.ceil(this._areaWidth / this._size);
    }
    var H = '';
    for (var G = 0; G < this._total; G++) {
      H += '<div class=\'vpiece\' id=\'' + G + '\' style=\'left:' + G * this._size + 'px; height:' + this._areaHeight + 'px\'></div>';
    }
    this._rotator.addToScreen(H);
    this._$stripes = this._rotator._$obj.find('div.vpiece');
    this._arr = this._$stripes.toArray();
  };
  c.prototype.clear = function () {
    clearInterval(this._intervalId);
    this._intervalId = null;
    this._$stripes.stop(true).css({
      'z-index': 2,
      opacity: 0
    });
  };
  c.prototype.displayContent = function (G, H) {
    this.setPieces(G, H);
    if (H == l['vert.random.fade']) {
      this.animateRandom(G);
    } else {
      this.animate(G, H);
    }
  };
  c.prototype.setPieces = function (G, H) {
    switch (H) {
    case l['vert.tl']:
    case l['vert.tr']:
      this.setVertPieces(G, -this._areaHeight, 1, this._size, false);
      break;
    case l['vert.bl']:
    case l['vert.br']:
      this.setVertPieces(G, this._areaHeight, 1, this._size, false);
      break;
    case l['alt.left']:
    case l['alt.right']:
      this.setVertPieces(G, 0, 1, this._size, true);
      break;
    case l['blinds.left']:
    case l['blinds.right']:
      this.setVertPieces(G, 0, 1, 0, false);
      break;
    default:
      this.setVertPieces(G, 0, 0, this._size, false);
    }
  };
  c.prototype.setVertPieces = function (G, N, O, J, M) {
    var Q = G.attr('src');
    var P = 0;
    var I = 0;
    if (this._rotator._autoCenter) {
      P = (this._areaHeight - G.height()) / 2;
      I = (this._areaWidth - G.width()) / 2;
    }
    for (var K = 0; K < this._total; K++) {
      var H = this._$stripes.eq(K);
      var L = -K * this._size + I;
      if (M) {
        N = K % 2 == 0 ? -this._areaHeight : this._areaHeight;
      }
      H.css({
        background: 'url(\'' + Q + '\') no-repeat',
        backgroundPosition: L + 'px ' + P + 'px',
        opacity: O,
        top: N,
        width: J,
        'z-index': 3
      });
    }
  };
  c.prototype.animate = function (I, J) {
    var K = this;
    var M, H, L, G;
    switch (J) {
    case l['vert.tl']:
    case l['vert.bl']:
    case l['fade.left']:
    case l['blinds.left']:
    case l['alt.left']:
      M = 0;
      H = this._total - 1;
      L = 1;
      break;
    default:
      M = this._total - 1;
      H = 0;
      L = -1;
    }
    this._intervalId = setInterval(function () {
      K._$stripes.eq(M).animate({
        top: 0,
        opacity: 1,
        width: K._size
      }, K._rotator._duration, K._rotator._easing, function () {
        if (f(this).attr('id') == H) {
          K._rotator.showContent(I);
        }
      });
      if (M == H) {
        clearInterval(K._intervalId);
        K._intervalId = null;
      }
      M += L;
    }, this._delay);
  };
  c.prototype.animateRandom = function (H) {
    var J = this;
    u(this._arr);
    var G = 0;
    var I = 0;
    this._intervalId = setInterval(function () {
      f(J._arr[G++]).animate({ opacity: 1 }, J._rotator._duration, J._rotator._easing, function () {
        if (++I == J._total) {
          J._rotator.showContent(H);
        }
      });
      if (G == J._total) {
        clearInterval(J._intervalId);
        J._intervalId = null;
      }
    }, this._delay);
  };
  function v(G) {
    this._$stripes;
    this._arr;
    this._total;
    this._intervalId = null;
    this._rotator = G;
    this._areaWidth = G._screenWidth;
    this._areaHeight = G._screenHeight;
    this._size = G._horzSize;
    this._delay = G._horzDelay;
    this.init();
  }
  v.prototype.init = function () {
    this._total = Math.ceil(this._areaHeight / this._size);
    if (this._total > r) {
      this._size = Math.ceil(this._areaHeight / r);
      this._total = Math.ceil(this._areaHeight / this._size);
    }
    var H = '';
    for (var G = 0; G < this._total; G++) {
      H += '<div class=\'hpiece\' id=\'' + G + '\' style=\'top:' + G * this._size + 'px; width:' + this._areaWidth + 'px\'><!-- --></div>';
    }
    this._rotator.addToScreen(H);
    this._$stripes = this._rotator._$obj.find('div.hpiece');
    this._arr = this._$stripes.toArray();
  };
  v.prototype.clear = function () {
    clearInterval(this._intervalId);
    this._intervalId = null;
    this._$stripes.stop(true).css({
      'z-index': 2,
      opacity: 0
    });
  };
  v.prototype.displayContent = function (G, H) {
    this.setPieces(G, H);
    if (H == l['horz.random.fade']) {
      this.animateRandom(G);
    } else {
      this.animate(G, H);
    }
  };
  v.prototype.setPieces = function (G, H) {
    switch (H) {
    case l['horz.tr']:
    case l['horz.br']:
      this.setHorzPieces(G, this._areaWidth, 1, this._size, false);
      break;
    case l['horz.tl']:
    case l['horz.bl']:
      this.setHorzPieces(G, -this._areaWidth, 1, this._size, false);
      break;
    case l['alt.top']:
    case l['alt.bottom']:
      this.setHorzPieces(G, 0, 1, this._size, true);
      break;
    case l['blinds.top']:
    case l['blinds.bottom']:
      this.setHorzPieces(G, 0, 1, 0, false);
      break;
    default:
      this.setHorzPieces(G, 0, 0, this._size, false);
    }
  };
  v.prototype.setHorzPieces = function (G, K, N, P, M) {
    var Q = G.attr('src');
    var O = 0;
    var I = 0;
    if (this._rotator._autoCenter) {
      O = (this._areaHeight - G.height()) / 2;
      I = (this._areaWidth - G.width()) / 2;
    }
    for (var L = 0; L < this._total; L++) {
      var H = this._$stripes.eq(L);
      var J = -L * this._size + O;
      if (M) {
        K = L % 2 == 0 ? -this._areaWidth : this._areaWidth;
      }
      H.css({
        background: 'url(\'' + Q + '\') no-repeat',
        backgroundPosition: I + 'px ' + J + 'px',
        opacity: N,
        left: K,
        height: P,
        'z-index': 3
      });
    }
  };
  v.prototype.animate = function (H, I) {
    var J = this;
    var L, G, K;
    switch (I) {
    case l['horz.tl']:
    case l['horz.tr']:
    case l['fade.top']:
    case l['blinds.top']:
    case l['alt.top']:
      L = 0;
      G = this._total - 1;
      K = 1;
      break;
    default:
      L = this._total - 1;
      G = 0;
      K = -1;
    }
    this._intervalId = setInterval(function () {
      J._$stripes.eq(L).animate({
        left: 0,
        opacity: 1,
        height: J._size
      }, J._rotator._duration, J._rotator._easing, function () {
        if (f(this).attr('id') == G) {
          J._rotator.showContent(H);
        }
      });
      if (L == G) {
        clearInterval(J._intervalId);
        J._intervalId = null;
      }
      L += K;
    }, this._delay);
  };
  v.prototype.animateRandom = function (H) {
    var J = this;
    u(this._arr);
    var G = 0;
    var I = 0;
    this._intervalId = setInterval(function () {
      f(J._arr[G++]).animate({ opacity: 1 }, J._rotator._duration, J._rotator._easing, function () {
        if (++I == J._total) {
          J._rotator.showContent(H);
        }
      });
      if (G == J._total) {
        clearInterval(J._intervalId);
        J._intervalId = null;
      }
    }, this._delay);
  };
  function o(G) {
    this._$blockArr;
    this._$blocks;
    this._arr;
    this._numRows;
    this._numCols;
    this._total;
    this._intervalId;
    this._rotator = G;
    this._areaWidth = G._screenWidth;
    this._areaHeight = G._screenHeight;
    this._size = G._blockSize;
    this._delay = G._blockDelay;
    this.init();
  }
  o.prototype.init = function () {
    this._numRows = Math.ceil(this._areaHeight / this._size);
    this._numCols = Math.ceil(this._areaWidth / this._size);
    this._total = this._numRows * this._numCols;
    if (this._total > r) {
      this._size = Math.ceil(Math.sqrt(this._areaHeight * this._areaWidth / r));
      this._numRows = Math.ceil(this._areaHeight / this._size);
      this._numCols = Math.ceil(this._areaWidth / this._size);
      this._total = this._numRows * this._numCols;
    }
    var J = '';
    for (var I = 0; I < this._numRows; I++) {
      for (var H = 0; H < this._numCols; H++) {
        J += '<div class=\'block\' id=\'' + I + '-' + H + '\'></div>';
      }
    }
    this._rotator.addToScreen(J);
    this._$blocks = this._rotator._$obj.find('div.block');
    this._$blocks.data({
      tlId: '0-0',
      trId: '0-' + (this._numCols - 1),
      blId: this._numRows - 1 + '-0',
      brId: this._numRows - 1 + '-' + (this._numCols - 1)
    });
    var G = 0;
    this._arr = this._$blocks.toArray();
    this._$blockArr = new Array(this._numRows);
    for (var I = 0; I < this._numRows; I++) {
      this._$blockArr[I] = new Array(this._numCols);
      for (var H = 0; H < this._numCols; H++) {
        this._$blockArr[I][H] = this._$blocks.filter('#' + (I + '-' + H)).data('top', I * this._size);
      }
    }
  };
  o.prototype.clear = function () {
    clearInterval(this._intervalId);
    this._intervalId = null;
    this._$blocks.stop(true).css({
      'z-index': 2,
      opacity: 0
    });
  };
  o.prototype.displayContent = function (G, H) {
    switch (H) {
    case l['diag.fade']:
      this.setBlocks(G, 0, this._size, 0);
      this.diagAnimate(G, { opacity: 1 }, false);
      break;
    case l['diag.exp']:
      this.setBlocks(G, 0, 0, 0);
      this.diagAnimate(G, {
        opacity: 1,
        width: this._size,
        height: this._size
      }, false);
      break;
    case l['rev.diag.fade']:
      this.setBlocks(G, 0, this._size, 0);
      this.diagAnimate(G, { opacity: 1 }, true);
      break;
    case l['rev.diag.exp']:
      this.setBlocks(G, 0, 0, 0);
      this.diagAnimate(G, {
        opacity: 1,
        width: this._size,
        height: this._size
      }, true);
      break;
    case l['block.fade']:
      this.setBlocks(G, 0, this._size, 0);
      this.randomAnimate(G);
      break;
    case l['block.exp']:
      this.setBlocks(G, 1, 0, 0);
      this.randomAnimate(G);
      break;
    case l['block.drop']:
      this.setBlocks(G, 1, this._size, -(this._numRows * this._size));
      this.randomAnimate(G);
      break;
    case l['block.top.zz']:
    case l['block.bottom.zz']:
    case l['block.left.zz']:
    case l['block.right.zz']:
      this.setBlocks(G, 0, this._size, 0);
      this.zigZag(G, H);
      break;
    case l['spiral.in']:
      this.setBlocks(G, 0, this._size, 0);
      this.spiral(G, false);
      break;
    case l['spiral.out']:
      this.setBlocks(G, 0, this._size, 0);
      this.spiral(G, true);
      break;
    default:
      this.setBlocks(G, 1, 0, 0);
      this.dirAnimate(G, H);
    }
  };
  o.prototype.setBlocks = function (G, M, Q, L) {
    var N = 0;
    var I = 0;
    if (this._rotator._autoCenter) {
      N = (this._areaHeight - G.height()) / 2;
      I = (this._areaWidth - G.width()) / 2;
    }
    var O = G.attr('src');
    for (var K = 0; K < this._numRows; K++) {
      for (var J = 0; J < this._numCols; J++) {
        var P = -K * this._size + N;
        var H = -J * this._size + I;
        this._$blockArr[K][J].css({
          background: 'url(\'' + O + '\') no-repeat',
          backgroundPosition: H + 'px ' + P + 'px',
          opacity: M,
          top: K * this._size + L,
          left: J * this._size,
          width: Q,
          height: Q,
          'z-index': 3
        });
      }
    }
  };
  o.prototype.diagAnimate = function (G, P, L) {
    var O = new Array(this._total);
    var H, K, I, J;
    var Q = this._numRows - 1 + (this._numCols - 1);
    if (L) {
      H = Q;
      K = -1;
      I = -1;
      J = this._$blocks.data('tlId');
    } else {
      H = 0;
      K = Q + 1;
      I = 1;
      J = this._$blocks.data('brId');
    }
    var N = 0;
    while (H != K) {
      i = Math.min(this._numRows - 1, H);
      while (i >= 0) {
        j = Math.abs(i - H);
        if (j >= this._numCols) {
          break;
        }
        O[N++] = this._$blockArr[i][j];
        i--;
      }
      H += I;
    }
    N = 0;
    var M = this;
    this._intervalId = setInterval(function () {
      O[N++].animate(P, M._rotator._duration, M._rotator._easing, function () {
        if (f(this).attr('id') == J) {
          M._rotator.showContent(G);
        }
      });
      if (N == M._total) {
        clearInterval(M._intervalId);
        M._intervalId = null;
      }
    }, this._delay);
  };
  o.prototype.zigZag = function (H, O) {
    var N = this;
    var L = true;
    var M = 0, K = 0, I, J, G;
    if (O == l['block.left.zz']) {
      J = this._numCols % 2 == 0 ? this._$blocks.data('trId') : this._$blocks.data('brId');
      K = 0;
      I = 1;
      G = false;
    } else {
      if (O == l['block.right.zz']) {
        J = this._numCols % 2 == 0 ? this._$blocks.data('tlId') : this._$blocks.data('blId');
        K = this._numCols - 1;
        I = -1;
        G = false;
      } else {
        if (O == l['block.top.zz']) {
          J = this._numRows % 2 == 0 ? this._$blocks.data('blId') : this._$blocks.data('brId');
          M = 0;
          I = 1;
          G = true;
        } else {
          J = this._numRows % 2 == 0 ? this._$blocks.data('tlId') : this._$blocks.data('trId');
          M = this._numRows - 1;
          I = -1;
          G = true;
        }
      }
    }
    this._intervalId = setInterval(function () {
      N._$blockArr[M][K].animate({ opacity: 1 }, N._duration, N._rotator._easing, function () {
        if (f(this).attr('id') == J) {
          N._rotator.showContent(H);
        }
      });
      if (N._$blockArr[M][K].attr('id') == J) {
        clearInterval(N._intervalId);
        N._intervalId = null;
      }
      if (G) {
        L ? K++ : K--;
        if (K == N._numCols || K < 0) {
          L = !L;
          K = L ? 0 : N._numCols - 1;
          M += I;
        }
      } else {
        L ? M++ : M--;
        if (M == N._numRows || M < 0) {
          L = !L;
          M = L ? 0 : N._numRows - 1;
          K += I;
        }
      }
    }, this._delay);
  };
  o.prototype.dirAnimate = function (I, J) {
    var M = new Array(this._total);
    var N;
    var L = 0;
    switch (J) {
    case l['block.left']:
      N = this._$blocks.data('brId');
      for (var G = 0; G < this._numCols; G++) {
        for (var H = 0; H < this._numRows; H++) {
          M[L++] = this._$blockArr[H][G];
        }
      }
      break;
    case l['block.right']:
      N = this._$blocks.data('blId');
      for (var G = this._numCols - 1; G >= 0; G--) {
        for (var H = 0; H < this._numRows; H++) {
          M[L++] = this._$blockArr[H][G];
        }
      }
      break;
    case l['block.top']:
      N = this._$blocks.data('brId');
      for (var H = 0; H < this._numRows; H++) {
        for (var G = 0; G < this._numCols; G++) {
          M[L++] = this._$blockArr[H][G];
        }
      }
      break;
    default:
      N = this._$blocks.data('trId');
      for (var H = this._numRows - 1; H >= 0; H--) {
        for (var G = 0; G < this._numCols; G++) {
          M[L++] = this._$blockArr[H][G];
        }
      }
    }
    L = 0;
    var K = this;
    this._intervalId = setInterval(function () {
      M[L++].animate({
        width: K._size,
        height: K._size
      }, K._rotator._duration, K._rotator._easing, function () {
        if (f(this).attr('id') == N) {
          K._rotator.showContent(I);
        }
      });
      if (L == K._total) {
        clearInterval(K._intervalId);
        K._intervalId = null;
      }
    }, this._delay);
  };
  o.prototype.randomAnimate = function (H) {
    u(this._arr);
    var G = 0;
    count = 0;
    var I = this;
    this._intervalId = setInterval(function () {
      f(I._arr[G]).animate({
        top: f(I._arr[G]).data('top'),
        width: I._size,
        height: I._size,
        opacity: 1
      }, I._rotator._duration, I._rotator._easing, function () {
        if (++count == I._total) {
          I._rotator.showContent(H);
        }
      });
      G++;
      if (G == I._total) {
        clearInterval(I._intervalId);
        I._intervalId = null;
      }
    }, this._delay);
  };
  o.prototype.spiral = function (G, O) {
    var N = 0, M = 0;
    var S = this._numRows - 1;
    var T = this._numCols - 1;
    var I = 0;
    var L = T;
    var R = new Array();
    while (S >= 0 && T >= 0) {
      var Q = 0;
      while (true) {
        R[R.length] = this._$blockArr[N][M];
        if (++Q > L) {
          break;
        }
        switch (I) {
        case 0:
          M++;
          break;
        case 1:
          N++;
          break;
        case 2:
          M--;
          break;
        case 3:
          N--;
        }
      }
      switch (I) {
      case 0:
        I = 1;
        L = --S;
        N++;
        break;
      case 1:
        I = 2;
        L = --T;
        M--;
        break;
      case 2:
        I = 3;
        L = --S;
        N--;
        break;
      case 3:
        I = 0;
        L = --T;
        M++;
      }
    }
    if (R.length > 0) {
      if (O) {
        R.reverse();
      }
      var K = R.length - 1;
      var H = R[K].attr('id');
      var J = 0;
      var P = this;
      this._intervalId = setInterval(function () {
        R[J].animate({ opacity: 1 }, P._rotator._duration, P._rotator._easing, function () {
          if (f(this).attr('id') == H) {
            P._rotator.showContent(G);
          }
        });
        if (J == K) {
          clearInterval(P._intervalId);
          P._intervalId = null;
        }
        J++;
      }, this._delay);
    }
  };
  function C(H, G) {
    this._screenWidth = d(G.width, 825);
    this._screenHeight = d(G.height, 300);
    this._margin = D(G.button_margin, 4);
    this._globalEffect = G.transition.toLowerCase();
    this._duration = d(G.transition_speed, y);
    this._globalDelay = d(G.delay, s);
    this._rotate = G.auto_start;
    this._cpPos = G.cpanel_position.toLowerCase();
    this._cpAlign = G.cpanel_align.toUpperCase();
    this._thumbWidth = d(G.thumb_width, 24);
    this._thumbHeight = d(G.thumb_height, 24);
    this._buttonWidth = d(G.button_width, 24);
    this._buttonHeight = d(G.button_height, 24);
    this._displayThumbImg = G.display_thumbimg;
    this._displayThumbs = G.display_thumbs;
    this._displaySideBtns = G.display_side_buttons;
    this._displayDBtns = G.display_dbuttons;
    this._displayPlayBtn = G.display_playbutton;
    this._displayNumbers = G.display_numbers;
    this._displayTimer = G.display_timer;
    this._cpMouseover = window.Touch ? false : G.cpanel_mouseover;
    this._textMousover = window.Touch ? false : G.text_mouseover;
    this._pauseMouseover = window.Touch ? false : G.mouseover_pause;
    this._mouseoverSelect = window.Touch ? false : G.mouseover_select;
    this._tipType = G.tooltip_type.toLowerCase();
    this._textEffect = G.text_effect.toLowerCase();
    this._textSync = G.text_sync;
    this._playOnce = G.play_once;
    this._autoCenter = G.auto_center;
    this._easing = G.easing;
    this._timerAlign = G.timer_align.toLowerCase();
    this._shuffle = G.shuffle;
    this._vertSize = d(G.vert_size, b);
    this._horzSize = d(G.horz_size, b);
    this._blockSize = d(G.block_size, h);
    this._vertDelay = d(G.vstripe_delay, 75);
    this._horzDelay = d(G.hstripe_delay, 75);
    this._blockDelay = d(G.block_delay, 25);
    this._numItems;
    this._currIndex;
    this._prevIndex;
    this._delay;
    this._vStripes;
    this._hStripes;
    this._blocks;
    this._timerId;
    this._blockEffect;
    this._hStripeEffect;
    this._vStripeEffect;
    this._dir;
    this._cpVertical;
    this._slideCoord;
    this._$rotator;
    this._$screen;
    this._$strip;
    this._$mainLink;
    this._$textBox;
    this._$preloader;
    this._$cpWrapper;
    this._$cpanel;
    this._$thumbPanel;
    this._$list;
    this._$thumbs;
    this._$buttonPanel;
    this._$playBtn;
    this._$sPrev;
    this._$sNext;
    this._$timer;
    this._$tooltip;
    this._$items;
    this._$innerText;
    this._$obj = H;
    this.init();
  }
  C.prototype.init = function () {
    this._$rotator = this._$obj.find('.wt-rotator');
    this._$screen = this._$rotator.find('div.screen');
    this._$cpanel = this._$rotator.find('div.c-panel');
    this._$buttonPanel = this._$cpanel.find('div.buttons');
    this._$thumbPanel = this._$cpanel.find('div.thumbnails');
    this._$list = this._$thumbPanel.find('>ul');
    this._$thumbs = this._$list.find('>li');
    this._timerId = null;
    this._currIndex = 0;
    this._prevIndex = -1;
    this._numItems = this._$thumbs.size();
    this._$items = new Array(this._numItems);
    this._blockEffect = this._hStripeEffect = this._vStripeEffect = false;
    this.checkEffect(l[this._globalEffect]);
    this._cpVertical = m[this._cpAlign] >= m.LT ? true : false;
    if (this._numItems <= 1) {
    }
    if (this._displaySideBtns) {
      this._displayDBtns = false;
    }
    if (this._displayThumbImg) {
      this._displayNumbers = false;
      if (this._tipType == 'image') {
        this._tipType = 'none';
      }
    }
    if (this._shuffle) {
      this.shuffleItems();
    }
    this._$rotator.css({
      width: this._screenWidth,
      height: this._screenHeight
    });
    this.initScreen();
    this.initButtons();
    this.initItems();
    this.initCPanel();
    this.initTimerBar();
    if (this._textMousover) {
      this._$rotator.bind('mouseenter', { elem: this }, this.displayText).bind('mouseleave', { elem: this }, this.hideText);
    } else {
      this._$rotator.bind(g, { elem: this }, this.updateText);
    }
    if (this._vStripeEffect) {
      this._vStripes = new c(this);
    }
    if (this._hStripeEffect) {
      this._hStripes = new v(this);
    }
    if (this._blockEffect) {
      this._blocks = new o(this);
    }
    if (window.Touch) {
      this._slideCoord = {
        start: -1,
        end: -1
      };
      if (this._globalEffect == 'v.slide') {
        this._$rotator.bind('touchstart', { elem: this }, this.touchVStart).bind('touchmove', { elem: this }, this.touchVMove);
      } else {
        this._$rotator.bind('touchstart', { elem: this }, this.touchStart).bind('touchmove', { elem: this }, this.touchMove);
      }
      this._$rotator.bind('touchend', { elem: this }, this.touchEnd);
    } else {
      if (this._mousewheelScroll) {
        try {
          this._$rotator.bind('mousewheel', { elem: this }, this.mouseScrollContent).bind('DOMMouseScroll', { elem: this }, this.mouseScrollContent);
        } catch (G) {
        }
      }
    }
    if (!a(6)) {
      this.loadImg(0);
    }
    this.loadContent(this._currIndex);
  };
  C.prototype.touchStart = function (G) {
    G.data.elem._slideCoord.start = G.originalEvent.touches[0].pageX;
  };
  C.prototype.touchMove = function (G) {
    G.preventDefault();
    G.data.elem._slideCoord.end = G.originalEvent.touches[0].pageX;
  };
  C.prototype.touchVStart = function (G) {
    G.data.elem._slideCoord.start = G.originalEvent.touches[0].pageY;
  };
  C.prototype.touchVMove = function (G) {
    G.preventDefault();
    G.data.elem._slideCoord.end = G.originalEvent.touches[0].pageY;
  };
  C.prototype.touchEnd = function (H) {
    var G = H.data.elem;
    if (G._slideCoord.end >= 0) {
      if (Math.abs(G._slideCoord.start - G._slideCoord.end) > k) {
        if (G._slideCoord.end < G._slideCoord.start) {
          G.nextImg();
        } else {
          G.prevImg();
        }
      }
    }
    G._slideCoord.start = G._slideCoord.end = -1;
  };
  C.prototype.addToScreen = function (G) {
    this._$mainLink.append(G);
  };
  C.prototype.initScreen = function () {
    var G = '<div class=\'desc\'><div class=\'inner-bg\'></div><div class=\'inner-text\'></div></div>\t\t\t\t\t\t<div class=\'preloader\'></div>\t\t\t\t\t\t<div class=\'timer\'></div>';
    this._$screen.append(G);
    this._$textBox = this._$screen.find('div.desc');
    this._$preloader = this._$screen.find('div.preloader');
    this._$screen.css({
      width: this._screenWidth,
      height: this._screenHeight
    });
    this._$innerText = this._$textBox.find('div.inner-text');
    this._$strip = f('<div class=\'strip\'></div>');
    if (this._globalEffect == 'h.slide') {
      this._$screen.append(this._$strip);
      this._$strip.css({
        width: 2 * this._screenWidth,
        height: this._screenHeight
      });
      this._$thumbs.removeAttr('effect');
    } else {
      if (this._globalEffect == 'v.slide') {
        this._$screen.append(this._$strip);
        this._$strip.css({
          width: this._screenWidth,
          height: 2 * this._screenHeight
        });
        this._$thumbs.removeAttr('effect');
      } else {
        this._$screen.append('<a href=\'#\'></a>');
        this._$mainLink = this._$screen.find('>a:first');
      }
    }
  };
  C.prototype.initCPanel = function () {
    if (this._displayThumbs || this._displayDBtns || this._displayPlayBtn) {
      if (this._cpPos == n) {
        switch (m[this._cpAlign]) {
        case m.BL:
          this.setHPanel('left');
          this.setInsideHP('bottom');
          break;
        case m.BC:
          this.setHPanel('center');
          this.setInsideHP('bottom');
          break;
        case m.BR:
          this.setHPanel('right');
          this.setInsideHP('bottom');
          break;
        case m.TL:
          this.setHPanel('left');
          this.setInsideHP('top');
          break;
        case m.TC:
          this.setHPanel('center');
          this.setInsideHP('top');
          break;
        case m.TR:
          this.setHPanel('right');
          this.setInsideHP('top');
          break;
        case m.LT:
          this.setVPanel('top');
          this.setInsideVP('left');
          break;
        case m.LC:
          this.setVPanel('center');
          this.setInsideVP('left');
          break;
        case m.LB:
          this.setVPanel('bottom');
          this.setInsideVP('left');
          break;
        case m.RT:
          this.setVPanel('top');
          this.setInsideVP('right');
          break;
        case m.RC:
          this.setVPanel('center');
          this.setInsideVP('right');
          break;
        case m.RB:
          this.setVPanel('bottom');
          this.setInsideVP('right');
          break;
        }
        if (this._cpMouseover) {
          var G = this._cpVertical ? 'left' : 'top';
          this._$rotator.bind('mouseenter', {
            elem: this,
            dir: G
          }, this.displayCPanel).bind('mouseleave', {
            elem: this,
            dir: G
          }, this.hideCPanel);
        }
      } else {
        switch (m[this._cpAlign]) {
        case m.BL:
          this.setHPanel('left');
          this.setOutsideHP(false);
          break;
        case m.BC:
          this.setHPanel('center');
          this.setOutsideHP(false);
          break;
        case m.BR:
          this.setHPanel('right');
          this.setOutsideHP(false);
          break;
        case m.TL:
          this.setHPanel('left');
          this.setOutsideHP(true);
          break;
        case m.TC:
          this.setHPanel('center');
          this.setOutsideHP(true);
          break;
        case m.TR:
          this.setHPanel('right');
          this.setOutsideHP(true);
          break;
        case m.LT:
          this.setVPanel('top');
          this.setOutsideVP(true);
          break;
        case m.LC:
          this.setVPanel('center');
          this.setOutsideVP(true);
          break;
        case m.LB:
          this.setVPanel('bottom');
          this.setOutsideVP(true);
          break;
        case m.RT:
          this.setVPanel('top');
          this.setOutsideVP(false);
          break;
        case m.RC:
          this.setVPanel('center');
          this.setOutsideVP(false);
          break;
        case m.RB:
          this.setVPanel('bottom');
          this.setOutsideVP(false);
          break;
        }
      }
      this._$cpanel.css('visibility', 'visible').click(p);
    }
  };
  C.prototype.setHPanel = function (H) {
    this._$cpanel.css({
      'margin-top': this._margin,
      'margin-bottom': this._margin,
      height: Math.max(this._$thumbPanel.outerHeight(true), this._$buttonPanel.outerHeight(true))
    });
    var G;
    if (H == 'center') {
      G = Math.round((this._screenWidth - this._$cpanel.width() - this._margin) / 2);
    } else {
      if (H == 'left') {
        G = this._margin;
      } else {
        G = this._screenWidth - this._$cpanel.width();
      }
    }
    this._$cpanel.css('left', G);
  };
  C.prototype.setVPanel = function (H) {
    this._$cpanel.css({
      'margin-left': this._margin,
      'margin-right': this._margin,
      width: Math.max(this._$thumbPanel.outerWidth(true), this._$buttonPanel.outerWidth(true))
    });
    var G;
    if (H == 'center') {
      G = Math.round((this._screenHeight - this._$cpanel.height() - this._margin) / 2);
    } else {
      if (H == 'top') {
        G = this._margin;
      } else {
        G = this._screenHeight - this._$cpanel.height();
      }
    }
    this._$cpanel.css('top', G);
  };
  C.prototype.setInsideHP = function (I) {
    var H, G;
    if (I == 'top') {
      G = 0;
      H = -this._$cpanel.outerHeight(true);
    } else {
      G = this._screenHeight - this._$cpanel.outerHeight(true);
      H = this._screenHeight;
    }
    this._$cpanel.data({
      offset: H,
      pos: G
    }).css({ top: this._cpMouseover ? H : G });
  };
  C.prototype.setInsideVP = function (I) {
    var H, G;
    if (I == 'left') {
      G = 0;
      H = -this._$cpanel.outerWidth(true);
    } else {
      G = this._screenWidth - this._$cpanel.outerWidth(true);
      H = this._screenWidth;
    }
    this._$cpanel.data({
      offset: H,
      pos: G
    }).css({ left: this._cpMouseover ? H : G });
  };
  C.prototype.setOutsideHP = function (G) {
    this._$cpanel.wrap('<div class=\'outer-hp\'></div>');
    this._$cpWrapper = this._$rotator.find('.outer-hp');
    this._$cpWrapper.height(this._$cpanel.outerHeight(true));
    if (G) {
      this._$cpWrapper.css({
        'border-top': 'none',
        top: 0
      });
      this._$screen.css('top', this._$cpWrapper.outerHeight());
    } else {
      this._$cpWrapper.css({
        'border-bottom': 'none',
        top: this._screenHeight
      });
      this._$screen.css('top', 0);
    }
    this._$rotator.css({ height: this._screenHeight + this._$cpWrapper.outerHeight() });
  };
  C.prototype.setOutsideVP = function (G) {
    this._$cpanel.wrap('<div class=\'outer-vp\'></div>');
    this._$cpWrapper = this._$rotator.find('.outer-vp');
    this._$cpWrapper.width(this._$cpanel.outerWidth(true));
    if (G) {
      this._$cpWrapper.css({
        'border-left': 'none',
        left: 0
      });
      this._$screen.css('left', this._$cpWrapper.outerWidth());
    } else {
      this._$cpWrapper.css({
        'border-right': 'none',
        left: this._screenWidth
      });
      this._$screen.css('left', 0);
    }
    this._$rotator.css({ width: this._screenWidth + this._$cpWrapper.outerWidth() });
  };
  C.prototype.initButtons = function () {
    this._$playBtn = this._$buttonPanel.find('div.play-btn');
    var I = this._$buttonPanel.find('div.prev-btn');
    var J = this._$buttonPanel.find('div.next-btn');
    if (this._displayDBtns) {
      I.bind('click', { elem: this }, this.prevImg);
      J.bind('click', { elem: this }, this.nextImg);
    } else {
      I.hide();
      J.hide();
    }
    if (this._displayPlayBtn) {
      this._$playBtn.toggleClass('pause', this._rotate).bind('click', { elem: this }, this.togglePlay);
    } else {
      this._$playBtn.hide();
    }
    if (this._pauseMouseover) {
      this._$rotator.bind('mouseenter', { elem: this }, this.pause).bind('mouseleave', { elem: this }, this.play);
    }
    if (this._displaySideBtns) {
      this._$screen.append('<div class=\'s-prev\'></div><div class=\'s-next\'></div>');
      this._$sPrev = this._$screen.find('.s-prev');
      this._$sNext = this._$screen.find('.s-next');
      this._$sPrev.bind('click', { elem: this }, this.prevImg).mousedown(p);
      this._$sNext.bind('click', { elem: this }, this.nextImg).mousedown(p);
      if (this._cpMouseover) {
        this._$sPrev.css('left', -this._$sPrev.width());
        this._$sNext.css('margin-left', 0);
        this._$rotator.bind('mouseenter', { elem: this }, this.showSideButtons).bind('mouseleave', { elem: this }, this.hideSideButtons);
      }
    }
    var H = this._$buttonPanel.find('>div').css({
        width: this._buttonWidth,
        height: this._buttonHeight
      }).mousedown(p);
    if (this._cpVertical) {
      I.addClass('up');
      J.addClass('down');
      H.css('margin-bottom', this._margin);
      this._$buttonPanel.width(H.outerWidth());
      if (A) {
        this._$buttonPanel.height(this._$buttonPanel.find('>div:visible').size() * H.outerHeight(true));
      }
      if (this._displayThumbs && this._thumbWidth > this._buttonWidth) {
        var G = this._thumbWidth - this._buttonWidth;
        switch (m[this._cpAlign]) {
        case m.RT:
        case m.RC:
        case m.RB:
          this._$buttonPanel.css('margin-left', G);
          break;
        default:
          this._$buttonPanel.css('margin-right', G);
        }
      }
    } else {
      H.css('margin-right', this._margin);
      this._$buttonPanel.height(H.outerHeight());
      if (A) {
        this._$buttonPanel.width(this._$buttonPanel.find('>div:visible').size() * H.outerWidth(true));
      }
      if (this._displayThumbs && this._thumbHeight > this._buttonHeight) {
        var G = this._thumbHeight - this._buttonHeight;
        switch (m[this._cpAlign]) {
        case m.TL:
        case m.TC:
        case m.TR:
          this._$buttonPanel.css('margin-bottom', G);
          break;
        default:
          this._$buttonPanel.css('margin-top', G);
        }
      }
    }
  };
  C.prototype.initTimerBar = function () {
    this._$timer = this._$screen.find('.timer').data('pct', 1);
    if (this._displayTimer) {
      this._$timer.css('visibility', 'visible');
      this._$timer.css('top', this._timerAlign == 'top' ? 0 : this._screenHeight - this._$timer.height());
    } else {
      this._$timer.hide();
    }
  };
  C.prototype.initItems = function () {
    var Q = this;
    var S = this._$innerText.outerHeight() - this._$innerText.height();
    var O = this._$thumbs.size();
    for (var M = 0; M < O; M++) {
      var W = this._$thumbs.eq(M);
      var J = W.find('>a:first');
      var L = l[W.attr('effect')];
      if (typeof L == 'undefined' || L == l['h.slide'] || L == l['v.slide']) {
        L = l[this._globalEffect];
      } else {
        this.checkEffect(L);
      }
      W.data({
        imgurl: J.attr('href'),
        caption: J.attr('title'),
        effect: L,
        delay: d(W.attr('delay'), this._globalDelay)
      });
      this.initTextData(W, S);
      this._$items[M] = W;
      if (this._displayNumbers) {
        W.append(M + 1);
      }
    }
    this._$innerText.css({
      width: 'auto',
      height: 'auto'
    }).html('');
    this._$textBox.css('visibility', 'visible');
    if (this._displayThumbs) {
      if (this._displayThumbImg) {
        this._$thumbs.addClass('image');
        this._$thumbs.find('>a').removeAttr('title');
        var P = this._$thumbs.find('>a>img');
        P.removeAttr('alt');
        var I = P.size();
        for (var M = 0; M < I; M++) {
          var H = P.eq(M);
          if (H[0].complete || H[0].readyState == 'complete') {
            H.css({
              top: (this._thumbHeight - H.height()) / 2,
              left: (this._thumbWidth - H.width()) / 2
            });
          } else {
            H.load(function () {
              f(this).css({
                top: (Q._thumbHeight - f(this).height()) / 2,
                left: (Q._thumbWidth - f(this).width()) / 2
              });
            });
          }
        }
      }
      this._$thumbs.css({
        width: this._thumbWidth,
        height: this._thumbHeight,
        'line-height': this._thumbHeight + 'px'
      }).mousedown(p);
      if (this._mouseoverSelect) {
        this._$thumbs.bind('mouseover', { elem: this }, this.selectItem);
      } else {
        this._$thumbPanel.bind('click', { elem: this }, this.selectItem);
      }
      if (this._cpVertical) {
        this._$thumbs.css('margin-bottom', this._margin);
        this._$list.width(this._$thumbs.outerWidth());
        this._$thumbPanel.width(this._$list.width());
        if (A) {
          this._$thumbPanel.height(this._numItems * this._$thumbs.outerHeight(true));
        }
        if ((this._displayDBtns || this._displayPlayBtn) && this._buttonWidth > this._thumbWidth) {
          var K = this._buttonWidth - this._thumbWidth;
          switch (m[this._cpAlign]) {
          case m.RT:
          case m.RC:
          case m.RB:
            this._$thumbPanel.css('margin-left', K);
            break;
          default:
            this._$thumbPanel.css('margin-right', K);
          }
        }
        var U = this._screenHeight - (this._$buttonPanel.height() + this._margin);
        if (this._$thumbPanel.height() > U) {
          var G = this._$thumbs.outerHeight(true);
          this._$list.addClass('inside').height(this._numItems * G);
          this._$thumbPanel.css({
            height: Math.floor(U / G) * G - this._margin,
            'margin-bottom': this._margin
          });
          var N = this._$thumbPanel.height() - (this._$list.height() - this._margin);
          this._$thumbPanel.append('<div class=\'back-scroll\'></div><div class=\'fwd-scroll\'></div>');
          var V = this._$thumbPanel.find('.back-scroll');
          var R = this._$thumbPanel.find('.fwd-scroll');
          V.css({
            height: G,
            width: '100%'
          });
          R.css({
            height: G,
            width: '100%',
            top: '100%',
            'margin-top': -G
          });
          if (!window.Touch) {
            V.bind('mouseenter', function () {
              R.show();
              var X = -Q._$list.stop(true).position().top * z;
              Q._$list.stop(true).animate({ top: 0 }, X, 'linear', function () {
                V.hide();
              });
            }).bind('mouseleave', { elem: this }, this.stopList);
            R.bind('mouseenter', function () {
              V.show();
              var X = (-N + Q._$list.stop(true).position().top) * z;
              Q._$list.stop(true).animate({ top: N }, X, 'linear', function () {
                R.hide();
              });
            }).bind('mouseleave', { elem: this }, this.stopList);
          } else {
            V.hide();
            R.hide();
          }
          this._$rotator.bind(w, function () {
            if (!Q._$list.is(':animated')) {
              var X = Q._$list.position().top + Q._currIndex * G;
              if (X < 0 || X > Q._$thumbPanel.height() - Q._$thumbs.outerHeight()) {
                X = -Q._currIndex * G;
                if (X < N) {
                  X = N;
                }
                Q._$list.stop(true).animate({ top: X }, x, function () {
                  if (!window.Touch) {
                    f(this).position().top == 0 ? V.hide() : V.show();
                    f(this).position().top == N ? R.hide() : R.show();
                  }
                });
              }
            }
          });
        }
      } else {
        this._$thumbs.css('margin-right', this._margin);
        this._$list.height(this._$thumbs.outerHeight());
        this._$thumbPanel.height(this._$list.height());
        if (A) {
          this._$thumbPanel.width(this._numItems * this._$thumbs.outerWidth(true));
        }
        if ((this._displayDBtns || this._displayPlayBtn) && this._buttonHeight > this._thumbHeight) {
          var K = this._buttonHeight - this._thumbHeight;
          switch (m[this._cpAlign]) {
          case m.TL:
          case m.TC:
          case m.TR:
            this._$thumbPanel.css('margin-bottom', K);
            break;
          default:
            this._$thumbPanel.css('margin-top', K);
          }
        }
        var T = this._screenWidth - (this._$buttonPanel.width() + this._margin);
        if (this._$thumbPanel.width() > T) {
          var G = this._$thumbs.outerWidth(true);
          this._$list.addClass('inside').width(this._numItems * G);
          this._$thumbPanel.css({
            width: Math.floor(T / G) * G - this._margin,
            'margin-right': this._margin
          });
          var N = this._$thumbPanel.width() - (this._$list.width() - this._margin);
          this._$thumbPanel.append('<div class=\'back-scroll\'></div><div class=\'fwd-scroll\'></div>');
          var V = this._$thumbPanel.find('.back-scroll');
          var R = this._$thumbPanel.find('.fwd-scroll');
          V.css({
            width: G,
            height: '100%'
          });
          R.css({
            width: G,
            height: '100%',
            left: '100%',
            'margin-left': -G
          });
          if (!window.Touch) {
            V.bind('mouseenter', function () {
              R.show();
              var X = -Q._$list.stop(true).position().left * z;
              Q._$list.stop(true).animate({ left: 0 }, X, 'linear', function () {
                V.hide();
              });
            }).bind('mouseleave', { elem: this }, this.stopList);
            R.bind('mouseenter', function () {
              V.show();
              var X = (-N + Q._$list.stop(true).position().left) * z;
              Q._$list.stop(true).animate({ left: N }, X, 'linear', function () {
                R.hide();
              });
            }).bind('mouseleave', { elem: this }, this.stopList);
          }
          this._$rotator.bind(w, function () {
            if (!Q._$list.is(':animated')) {
              var X = Q._$list.position().left + Q._currIndex * G;
              if (X < 0 || X > Q._$thumbPanel.width() - Q._$thumbs.outerWidth()) {
                X = -Q._currIndex * G;
                if (X < N) {
                  X = N;
                }
                Q._$list.stop(true).animate({ left: X }, x, function () {
                  f(this).position().left == 0 ? V.hide() : V.show();
                  f(this).position().left == N ? R.hide() : R.show();
                });
              }
            }
          });
        }
      }
      this.initTooltip();
    } else {
      this._$thumbs.hide();
    }
  };
  C.prototype.initTextData = function (G, I) {
    var H = G.find('>div:hidden');
    var K = d(parseInt(H.css('width')) - I, 300);
    var J = d(parseInt(H.css('height')) - I, 0);
    this._$innerText.width(K).html(H.html());
    if (J < this._$innerText.height()) {
      J = this._$innerText.height();
    }
    G.data('textbox', {
      x: H.css('left'),
      y: H.css('top'),
      w: K + I,
      h: J + I + 1,
      color: H.css('color'),
      bgcolor: H.css('background-color')
    });
  };
  C.prototype.initTooltip = function () {
    if (this._tipType == 'text') {
      f('body').append('<div id=\'rotator-tooltip\'><div class=\'tt-txt\'></div></div>');
      this._$tooltip = f('body').find('#rotator-tooltip');
      this._$thumbs.bind('mouseover', { elem: this }, this.showTooltip).bind('mouseout', { elem: this }, this.hideTooltip).bind('mousemove', { elem: this }, this.moveTooltip);
      switch (m[this._cpAlign]) {
      case m.TL:
      case m.TC:
      case m.TR:
        this._$tooltip.data('bottom', true).addClass('txt-down');
        break;
      default:
        this._$tooltip.data('bottom', false).addClass('txt-up');
      }
    } else {
      if (this._tipType == 'image') {
        var J = '<div id=\'rotator-tooltip\'>';
        for (var I = 0; I < this._numItems; I++) {
          var H = this._$items[I].find('>a:first>img');
          if (H.size() == 1) {
            J += '<img src=\'' + H.attr('src') + '\' />';
          } else {
            J += '<img/>';
          }
        }
        J += '</div>';
        f('body').append(J);
        this._$tooltip = f('body').find('#rotator-tooltip');
        switch (m[this._cpAlign]) {
        case m.TL:
        case m.TC:
        case m.TR:
          this._$thumbs.bind('mouseover', { elem: this }, this.showHImgTooltip);
          this._$tooltip.data('bottom', true).addClass('img-down');
          break;
        case m.LT:
        case m.LC:
        case m.LB:
          this._$thumbs.bind('mouseover', { elem: this }, this.showVImgTooltip);
          this._$tooltip.data('right', true).addClass('img-right');
          break;
        case m.RT:
        case m.RC:
        case m.RB:
          this._$thumbs.bind('mouseover', { elem: this }, this.showVImgTooltip);
          this._$tooltip.data('right', false).addClass('img-left');
          break;
        default:
          this._$thumbs.bind('mouseover', { elem: this }, this.showHImgTooltip);
          this._$tooltip.data('bottom', false).addClass('img-up');
        }
        this._$thumbs.bind('mouseout', { elem: this }, this.hideTooltip);
      }
    }
    if (a(6)) {
      try {
        this._$tooltip.css('background-image', 'none').children().css('margin', 0);
      } catch (G) {
      }
    }
  };
  C.prototype.showHImgTooltip = function (I) {
    var H = I.data.elem;
    var G = H._$tooltip.find('>img').eq(f(this).index());
    if (G.attr('src')) {
      H._$tooltip.find('>img').hide();
      G.show();
      if (G[0].complete || G[0].readyState == 'complete') {
        var K = H._$tooltip.data('bottom') ? f(this).outerHeight() : -H._$tooltip.outerHeight();
        var J = f(this).offset();
        H._$tooltip.css({
          top: J.top + K,
          left: J.left + (f(this).outerWidth() - H._$tooltip.outerWidth()) / 2
        }).stop(true, true).delay(q).fadeIn(300);
      }
    }
  };
  C.prototype.showVImgTooltip = function (J) {
    var I = J.data.elem;
    var G = I._$tooltip.find('>img').eq(f(this).index());
    if (G.attr('src')) {
      I._$tooltip.find('>img').hide();
      G.show();
      if (G[0].complete || G[0].readyState == 'complete') {
        var H = I._$tooltip.data('right') ? f(this).outerWidth() : -I._$tooltip.outerWidth();
        var K = f(this).offset();
        I._$tooltip.css({
          top: K.top + (f(this).outerHeight() - I._$tooltip.outerHeight()) / 2,
          left: K.left + H
        }).stop(true, true).delay(q).fadeIn(300);
      }
    }
  };
  C.prototype.showTooltip = function (I) {
    var H = I.data.elem;
    var G = H._$items[f(this).index()].data('caption');
    if (G != '') {
      H._$tooltip.find('>div.tt-txt').html(G);
      var J = H._$tooltip.data('bottom') ? 0 : -H._$tooltip.outerHeight(true);
      H._$tooltip.css({
        top: I.pageY + J,
        left: I.pageX
      }).stop(true, true).delay(q).fadeIn(300);
    }
  };
  C.prototype.moveTooltip = function (H) {
    var G = H.data.elem;
    var I = G._$tooltip.data('bottom') ? 0 : -G._$tooltip.outerHeight(true);
    G._$tooltip.css({
      top: H.pageY + I,
      left: H.pageX
    });
  };
  C.prototype.hideTooltip = function (H) {
    var G = typeof H != 'undefined' ? H.data.elem : this;
    G._$tooltip.stop(true, true).hide();
  };
  C.prototype.displayCPanel = function (H) {
    var G = H.data.elem;
    var I = {};
    I[H.data.dir] = G._$cpanel.data('pos');
    I.opacity = 1;
    G._$cpanel.stop(true).animate(I, x);
  };
  C.prototype.hideCPanel = function (H) {
    var G = H.data.elem;
    var I = {};
    I[H.data.dir] = G._$cpanel.data('offset');
    I.opacity = 0;
    G._$cpanel.stop(true).animate(I, x);
  };
  C.prototype.showSideButtons = function (H) {
    var G = H.data.elem;
    G._$sPrev.stop(true).animate({ left: 0 }, x);
    G._$sNext.stop(true).animate({ 'margin-left': -G._$sNext.width() }, x);
  };
  C.prototype.hideSideButtons = function (H) {
    var G = H.data.elem;
    G._$sPrev.stop(true).animate({ left: -G._$sPrev.width() }, x);
    G._$sNext.stop(true).animate({ 'margin-left': 0 }, x);
  };
  C.prototype.selectItem = function (J) {
    var I = J.data.elem;
    var G = f(J.target);
    if (G[0].nodeName != 'LI') {
      G = G.parents('li').eq(0);
    }
    var H = G.index();
    if (H > -1 && H != I._currIndex) {
      I._dir = H < I._currIndex ? E : F;
      I.resetTimer();
      I._prevIndex = I._currIndex;
      I._currIndex = H;
      I.loadContent(I._currIndex);
      I.hideTooltip();
    }
    return false;
  };
  C.prototype.prevImg = function (H) {
    var G = typeof H != 'undefined' ? H.data.elem : this;
    G._dir = E;
    G.resetTimer();
    G._prevIndex = G._currIndex;
    G._currIndex = G._currIndex > 0 ? G._currIndex - 1 : G._numItems - 1;
    G.loadContent(G._currIndex);
    return false;
  };
  C.prototype.nextImg = function (H) {
    var G = typeof H != 'undefined' ? H.data.elem : this;
    G._dir = F;
    G.resetTimer();
    G._prevIndex = G._currIndex;
    G._currIndex = G._currIndex < G._numItems - 1 ? G._currIndex + 1 : 0;
    G.loadContent(G._currIndex);
    return false;
  };
  C.prototype.togglePlay = function (H) {
    var G = H.data.elem;
    G._rotate = !G._rotate;
    G._$playBtn.toggleClass('pause', G._rotate);
    G._rotate ? G.startTimer() : G.pauseTimer();
    return false;
  };
  C.prototype.play = function (H) {
    var G = H.data.elem;
    G._rotate = true;
    G._$playBtn.addClass('pause');
    G.startTimer();
  };
  C.prototype.pause = function (H) {
    var G = H.data.elem;
    G._rotate = false;
    G._$playBtn.removeClass('pause');
    G.pauseTimer();
  };
  C.prototype.pauseLast = function (G) {
    if (G == this._numItems - 1) {
      this._rotate = false;
      this._$playBtn.removeClass('pause');
    }
  };
  C.prototype.updateText = function (I) {
    var G = I.data.elem;
    if (!G._$textBox.data('visible')) {
      G._$textBox.data('visible', true);
      var J = G._$items[G._currIndex].find('>div:first').html();
      if (J && J.length > 0) {
        var H = G._$items[G._currIndex].data('textbox');
        G._$innerText.css('color', H.color);
        G._$textBox.find('.inner-bg').css({
          'background-color': H.bgcolor,
          height: H.h - 1
        });
        switch (B[G._textEffect]) {
        case B.fade:
          G.fadeInText(J, H);
          break;
        case B.down:
          G.expandText(J, H, {
            width: H.w,
            height: 0
          }, { height: H.h });
          break;
        case B.right:
          G.expandText(J, H, {
            width: 0,
            height: H.h
          }, { width: H.w });
          break;
        case B.left:
          G.expandText(J, H, {
            'margin-left': H.w,
            width: 0,
            height: H.h
          }, {
            width: H.w,
            'margin-left': 0
          });
          break;
        case B.up:
          G.expandText(J, H, {
            'margin-top': H.h,
            height: 0,
            width: H.w
          }, {
            height: H.h,
            'margin-top': 0
          });
          break;
        default:
          G.showText(J, H);
        }
      }
    }
  };
  C.prototype.resetText = function () {
    this._$textBox.data('visible', false).stop(true, true);
    switch (B[this._textEffect]) {
    case B.fade:
    case B.down:
    case B.right:
    case B.left:
    case B.up:
      if (jQuery.browser.msie) {
        this._$innerText.css('opacity', 0);
      }
      this._$textBox.fadeOut(x, function () {
        f(this).css('display', 'none');
      });
      break;
    default:
      this._$textBox.css('display', 'none');
    }
  };
  C.prototype.expandText = function (K, J, I, G) {
    var H = this;
    this._$innerText.css('opacity', 1).html('');
    this._$textBox.stop(true, true).css({
      display: 'block',
      top: J.y,
      left: J.x,
      'margin-top': 0,
      'margin-left': 0
    }).css(I).animate(G, x, function () {
      H._$innerText.html(K);
    });
  };
  C.prototype.fadeInText = function (I, H) {
    var G = this;
    this._$innerText.css('opacity', 1).html(I);
    this._$textBox.css({
      top: H.y,
      left: H.x,
      width: H.w,
      height: H.h
    }).stop(true, true).fadeIn(x, function () {
      if (jQuery.browser.msie) {
        G._$innerText[0].style.removeAttribute('filter');
      }
    });
  };
  C.prototype.showText = function (H, G) {
    this._$textBox.stop(true).css({
      display: 'block',
      top: G.y,
      left: G.x,
      width: G.w,
      height: G.h
    });
    this._$innerText.html(H);
  };
  C.prototype.displayText = function (H) {
    var G = H.data.elem;
    G._$rotator.unbind(g).bind(g, { elem: G }, G.updateText).trigger(g);
  };
  C.prototype.hideText = function (H) {
    var G = H.data.elem;
    G._$rotator.unbind(g);
    G.resetText();
  };
  C.prototype.loadContent = function (I) {
    this._$rotator.trigger(w);
    if (this._playOnce) {
      this.pauseLast(I);
    }
    this._$thumbs.filter('.curr-thumb').removeClass('curr-thumb');
    this._$thumbs.eq(I).addClass('curr-thumb');
    this._delay = this._$items[I].data('delay');
    this.resetText();
    if (!this._textSync) {
      this._$rotator.trigger(g);
    }
    if (this._$mainLink) {
      var K = this._$items[I].find('>a:nth-child(2)');
      var G = K.attr('href');
      if (G) {
        this._$mainLink.unbind('click', p).css('cursor', 'pointer').attr({
          href: G,
          target: K.attr('target')
        });
      } else {
        this._$mainLink.click(p).css('cursor', 'default');
      }
    }
    if (this._$items[I].data('img')) {
      this._$preloader.hide();
      this.displayContent(this._$items[I].data('img'));
    } else {
      var J = this;
      var H = f('<img class=\'main-img\'/>');
      H.load(function () {
        J._$preloader.hide();
        J.storeImg(J._$items[I], f(this));
        J.displayContent(f(this));
      }).error(function () {
        alert('Error loading image');
      });
      this._$preloader.show();
      H.attr('src', this._$items[I].data('imgurl'));
    }
  };
  C.prototype.displayContent = function (G) {
    if (this._vStripeEffect) {
      this._vStripes.clear();
    }
    if (this._hStripeEffect) {
      this._hStripes.clear();
    }
    if (this._blockEffect) {
      this._blocks.clear();
    }
    if (this._vStripeEffect || this._hStripeEffect || this._blockEffect) {
      this.setPrevious();
    }
    var H = this._$items[this._currIndex].data('effect');
    if (H == l.none || typeof H == 'undefined') {
      this.showContent(G);
      return;
    } else {
      if (H == l.fade) {
        this.fadeInContent(G);
        return;
      } else {
        if (H == l['h.slide']) {
          this.slideContent(G, 'left', this._screenWidth);
          return;
        } else {
          if (H == l['v.slide']) {
            this.slideContent(G, 'top', this._screenHeight);
            return;
          }
        }
      }
    }
    if (H == l.random) {
      H = Math.floor(Math.random() * (e - 5));
    }
    if (H <= l['spiral.out']) {
      this._blocks.displayContent(G, H);
    } else {
      if (H <= l['vert.random.fade']) {
        this._vStripes.displayContent(G, H);
      } else {
        this._hStripes.displayContent(G, H);
      }
    }
  };
  C.prototype.setPrevious = function () {
    if (this._prevIndex >= 0) {
      var H = this._$mainLink.find('img#curr-img').attr('src');
      var I = this._$items[this._prevIndex].data('imgurl');
      if (H != I) {
        this._$mainLink.find('img.main-img').attr('id', '').hide();
        var G = this._$mainLink.find('img.main-img').filter(function () {
            return f(this).attr('src') == I;
          });
        G.eq(0).show();
      }
    }
  };
  C.prototype.showContent = function (G) {
    if (this._textSync) {
      this._$rotator.trigger(g);
    }
    this._$mainLink.find('img.main-img').attr('id', '').hide();
    G.attr('id', 'curr-img').show();
    this.startTimer();
  };
  C.prototype.fadeInContent = function (G) {
    var H = this;
    this._$mainLink.find('img#curr-img').stop(true, true);
    this._$mainLink.find('img.main-img').attr('id', '').css('z-index', 0);
    G.attr('id', 'curr-img').stop(true, true).css({
      opacity: 0,
      'z-index': 1
    }).show().animate({ opacity: 1 }, this._duration, this._easing, function () {
      H._$mainLink.find('img.main-img:not(\'#curr-img\')').hide();
      if (H._textSync) {
        H._$rotator.trigger(g);
      }
      H.startTimer();
    });
  };
  C.prototype.slideContent = function (L, N, K) {
    this._$strip.stop(true, true);
    var G = f('#curr-img', this._$strip);
    if (G.size() > 0) {
      this._$strip.find('.main-img').attr('id', '').parents('.content-box').css({
        top: 0,
        left: 0
      });
      L.attr('id', 'curr-img').parents('.content-box').show();
      var I, H;
      if (this._dir == E) {
        this._$strip.css(N, -K);
        I = G;
        H = 0;
      } else {
        I = L;
        H = -K;
      }
      I.parents('.content-box').css(N, K);
      var M = N == 'top' ? { top: H } : { left: H };
      var J = this;
      this._$strip.stop(true, true).animate(M, this._duration, this._easing, function () {
        J._$strip.find('.main-img:not(\'#curr-img\')').parents('.content-box').hide();
        J._$strip.find('#curr-img').parents('.content-box').show();
        I.parents('.content-box').css({
          top: 0,
          left: 0
        });
        J._$strip.css({
          top: 0,
          left: 0
        });
        if (J._textSync) {
          J._$rotator.trigger(g);
        }
        J.startTimer();
      });
    } else {
      this._$strip.css({
        top: 0,
        left: 0
      });
      this._$strip.find('.main-img').parents('.content-box').hide().css({
        top: 0,
        left: 0
      });
      L.attr('id', 'curr-img').parents('.content-box').show();
      if (this._textSync) {
        this._$rotator.trigger(g);
      }
      this.startTimer();
    }
  };
  C.prototype.loadImg = function (H) {
    try {
      var G = this._$items[H];
      var J = f('<img class=\'main-img\'/>');
      var K = this;
      J.load(function () {
        if (!G.data('img')) {
          K.storeImg(G, f(this));
        }
        H++;
        if (H < K._numItems) {
          K.loadImg(H);
        }
      }).error(function () {
        H++;
        if (H < K._numItems) {
          K.loadImg(H);
        }
      });
      J.attr('src', G.data('imgurl'));
    } catch (I) {
    }
  };
  C.prototype.storeImg = function (I, J) {
    if (this._globalEffect == 'h.slide' || this._globalEffect == 'v.slide') {
      this._$strip.append(J);
      this.centerImg(J);
      var G = f('<div class=\'content-box\'></div>').css({
          width: this._screenWidth,
          height: this._screenHeight
        });
      J.wrap(G);
      J.css('display', 'block');
      var H = I.find('>a:nth-child(2)');
      if (H) {
        J.wrap(H);
      }
    } else {
      this._$mainLink.append(J);
      this.centerImg(J);
    }
    I.data('img', J);
  };
  C.prototype.centerImg = function (G) {
    if (this._autoCenter && G.width() > 0 && G.height() > 0) {
      G.css({
        top: (this._screenHeight - G.height()) / 2,
        left: (this._screenWidth - G.width()) / 2
      });
    }
  };
  C.prototype.startTimer = function () {
    if (this._rotate && this._timerId == null) {
      var G = this;
      var H = Math.round(this._$timer.data('pct') * this._delay);
      this._$timer.stop(true).animate({ width: this._screenWidth + 1 }, H, 'linear');
      this._timerId = setTimeout(function (I) {
        G._dir = F;
        G.resetTimer();
        G._prevIndex = G._currIndex;
        G._currIndex = G._currIndex < G._numItems - 1 ? G._currIndex + 1 : 0;
        G.loadContent(G._currIndex);
      }, H);
    }
  };
  C.prototype.resetTimer = function () {
    clearTimeout(this._timerId);
    this._timerId = null;
    this._$timer.stop(true).width(0).data('pct', 1);
  };
  C.prototype.pauseTimer = function () {
    clearTimeout(this._timerId);
    this._timerId = null;
    this._$timer.stop(true);
    var G = 1 - this._$timer.width() / (this._screenWidth + 1);
    this._$timer.data('pct', G);
  };
  C.prototype.stopList = function (G) {
    G.data.elem._$list.stop(true);
  };
  C.prototype.shuffleItems = function () {
    var I = this._$thumbs.toArray();
    for (var J = 0; J < this._numItems; J++) {
      var G = Math.floor(Math.random() * this._numItems);
      var H = I[J];
      I[J] = I[G];
      I[G] = H;
    }
    for (var J = 0; J < this._numItems; J++) {
      this._$list.append(f(I[J]));
    }
    this._$thumbs = this._$list.find('>li');
  };
  C.prototype.checkEffect = function (G) {
    if (G == l.random) {
      this._blockEffect = this._hStripeEffect = this._vStripeEffect = true;
    } else {
      if (G <= l['spiral.out']) {
        this._blockEffect = true;
      } else {
        if (G <= l['vert.random.fade']) {
          this._vStripeEffect = true;
        } else {
          if (G <= l['horz.random.fade']) {
            this._hStripeEffect = true;
          }
        }
      }
    }
  };
  C.prototype.mouseScrollContent = function (H) {
    var G = H.data.elem;
    if (!G._$strip.is(':animated')) {
      var I = typeof H.originalEvent.wheelDelta == 'undefined' ? -H.originalEvent.detail : H.originalEvent.wheelDelta;
      I > 0 ? G.prevImg() : G.nextImg();
    }
    return false;
  };
  function p() {
    return false;
  }
  function d(G, H) {
    if (!isNaN(G) && G > 0) {
      return G;
    }
    return H;
  }
  function D(G, H) {
    if (!isNaN(G) && G >= 0) {
      return G;
    }
    return H;
  }
  function a(G) {
    if (jQuery.browser.msie && parseInt(jQuery.browser.version) <= G) {
      return true;
    }
    return false;
  }
  function u(G) {
    var K = G.length;
    for (var J = 0; J < K; J++) {
      var H = Math.floor(Math.random() * K);
      var I = G[J];
      G[J] = G[H];
      G[H] = I;
    }
  }
  f.fn.wtRotator = function (I) {
    var H = {
        width: 825,
        height: 300,
        thumb_width: 24,
        thumb_height: 24,
        button_width: 24,
        button_height: 24,
        button_margin: 4,
        auto_start: true,
        delay: s,
        transition: 'fade',
        transition_speed: y,
        cpanel_position: n,
        cpanel_align: 'BR',
        timer_align: 'top',
        display_thumbs: true,
        display_side_buttons: false,
        display_dbuttons: true,
        display_playbutton: true,
        display_imgtooltip: true,
        display_numbers: true,
        display_thumbimg: false,
        display_timer: true,
        mouseover_select: false,
        mouseover_pause: false,
        cpanel_mouseover: false,
        text_mouseover: false,
        text_effect: 'fade',
        text_sync: true,
        tooltip_type: 'text',
        shuffle: false,
        play_once: false,
        auto_center: false,
        block_size: h,
        vert_size: b,
        horz_size: b,
        block_delay: 25,
        vstripe_delay: 75,
        hstripe_delay: 75,
        easing: '',
        mousewheel_scroll: true
      };
    var G = f.extend({}, H, I);
    return this.each(function () {
      var J = new C(f(this), G);
    });
  };
}(jQuery));'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['*'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        if (!!~this.roles.indexOf('*')) {
          return true;
        } else {
          for (var userRoleIndex in user.roles) {
            for (var roleIndex in this.roles) {
              if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                return true;
              }
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].isPublic : isPublic,
        roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].roles : roles,
        position: position || 0,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].items[itemIndex].isPublic : isPublic,
            roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].items[itemIndex].roles : roles,
            position: position || 0,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);'use strict';  // Configuring the Articles module
               //angular.module('projects').run(['Menus',
               //	function(Menus) {
               //		// Set top bar menu items
               //		Menus.addMenuItem('topbar', 'פרוייקטים', 'projects', 'dropdown', '/projects(/create)?');
               //		Menus.addSubMenuItem('topbar', 'projects', 'לרשימת הפרוייקטים', 'projects');
               //		Menus.addSubMenuItem('topbar', 'projects', 'הקם פרוייקט חדש', 'projects/create');
               //	}
               //]);
'use strict';
//Setting up route
angular.module('projects').config([
  '$stateProvider',
  function ($stateProvider) {
    // Projects state routing
    $stateProvider.state('listProjects', {
      url: '/projects',
      templateUrl: 'modules/projects/views/list-projects.client.view.html'
    }).state('createProject', {
      url: '/projects/create',
      templateUrl: 'modules/projects/views/create-project.client.view.html'
    }).state('viewProject', {
      url: '/projects/:projectId',
      templateUrl: 'modules/projects/views/view-project.client.view.html'
    }).state('editProject', {
      url: '/projects/:projectId/edit',
      templateUrl: 'modules/projects/views/edit-project.client.view.html'
    });
  }
]);'use strict';
// Projects controller
angular.module('projects').controller('ProjectsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Projects',
  function ($scope, $stateParams, $location, Authentication, Projects) {
    $scope.authentication = Authentication;
    $scope.credentials = {
      languages: [],
      s3OptionsUri: '/s3upload',
      image: null
    };
    $scope.$watch('credentials.image', function (newValue, oldValue) {
      if (newValue) {
        $scope.images.push(newValue);
        $scope.credentials.image = null;
      }
    });
    $scope.images = [];
    // Create new Project
    $scope.create = function () {
      // Create new Project object
      var project = new Projects({
          name: this.name,
          description: this.description,
          images: $scope.images
        });
      // Redirect after save
      project.$save(function (response) {
        $location.path('projects/' + response._id);
        // Clear form fields
        $scope.name = '';
        $scope.description = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Remove existing Project
    $scope.remove = function (project) {
      if (project) {
        project.$remove();
        for (var i in $scope.projects) {
          if ($scope.projects[i] === project) {
            $scope.projects.splice(i, 1);
          }
        }
      } else {
        $scope.project.$remove(function () {
          $location.path('projects');
        });
      }
    };
    // Update existing Project
    $scope.update = function () {
      var project = $scope.project;
      project.$update(function () {
        $location.path('projects/' + project._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Projects
    $scope.find = function () {
      $scope.projects = Projects.query();
    };
    // Find existing Project
    $scope.findOne = function () {
      $scope.project = Projects.get({ projectId: $stateParams.projectId });
    };
  }
]);'use strict';
//Projects service used to communicate Projects REST endpoints
angular.module('projects').factory('Projects', [
  '$resource',
  function ($resource) {
    return $resource('projects/:projectId', { projectId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/authentication/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/authentication/signin.client.view.html'
    }).state('forgot', {
      url: '/password/forgot',
      templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
    }).state('reset-invlaid', {
      url: '/password/reset/invalid',
      templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
    }).state('reset-success', {
      url: '/password/reset/success',
      templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
    }).state('reset', {
      url: '/password/reset/:token',
      templateUrl: 'modules/users/views/password/reset-password.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  '$window',
  function ($scope, $http, $location, Authentication, $window) {
    $scope.authentication = Authentication;
    // If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        $window.sessionStorage.user = JSON.stringify(response);
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('PasswordController', [
  '$scope',
  '$stateParams',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    // Submit forgotten password account id
    $scope.askForPasswordReset = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;
      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };
    // Change user password
    $scope.resetUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;
        // Attach user profile
        Authentication.user = response;
        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);
        user.$update(function (response) {
          $scope.success = true;
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      } else {
        $scope.submitted = true;
      }
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);