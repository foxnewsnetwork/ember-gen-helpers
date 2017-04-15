"use strict";



define('dummy/app', ['exports', 'ember', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _ember, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  _ember.default.MODEL_FACTORY_INJECTIONS = true;

  App = _ember.default.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('dummy/controllers/sandbox', ['exports', 'ember'], function (exports, _ember) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var readOnly = _ember.default.computed.readOnly;
    exports.default = _ember.default.Controller.extend({
        panstar: readOnly('model.panstar'),
        x1: readOnly('model.The'),
        actions: {
            vanillaDone: function vanillaDone() {
                this.set('vanillaResults', 'peppercorn');
            },
            exprDone: function exprDone(str) {
                this.set('exprResults', str);
            },
            controlDone: function controlDone() {
                this.set('controlResults', 'peppercorn');
            }
        }
    });
});
define('dummy/helpers/cancel-all', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cancelHelper = cancelHelper;
  function cancelHelper(args) {
    var cancelable = args[0];
    if (!cancelable || typeof cancelable.cancelAll !== 'function') {
      _ember.default.assert('The first argument passed to the `cancel-all` helper should be a Task or TaskGroup (without quotes); you passed ' + cancelable, false);
    }

    return (0, _helpers.taskHelperClosure)('cancelAll', args);
  }

  exports.default = _ember.default.Helper.helper(cancelHelper);
});
define('dummy/helpers/gen-wrap-transform-class', ['exports', 'ember-gen-helpers/helpers/gen-wrap-transform-class'], function (exports, _genWrapTransformClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _genWrapTransformClass.default;
    }
  });
  Object.defineProperty(exports, 'genWrapTransformClass', {
    enumerable: true,
    get: function () {
      return _genWrapTransformClass.genWrapTransformClass;
    }
  });
});
define('dummy/helpers/gen-wrap', ['exports', 'ember-gen-helpers/helpers/gen-wrap'], function (exports, _genWrap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _genWrap.default;
    }
  });
  Object.defineProperty(exports, 'genWrap', {
    enumerable: true,
    get: function () {
      return _genWrap.genWrap;
    }
  });
});
define('dummy/helpers/perform', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.performHelper = performHelper;
  function performHelper(args, hash) {
    return (0, _helpers.taskHelperClosure)('perform', args, hash);
  }

  exports.default = _ember.default.Helper.helper(performHelper);
});
define('dummy/helpers/task', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }

  function taskHelper(_ref) {
    var _ref2 = _toArray(_ref),
        task = _ref2[0],
        args = _ref2.slice(1);

    return task._curry.apply(task, _toConsumableArray(args));
  }

  exports.default = _ember.default.Helper.helper(taskHelper);
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/initializers/ember-concurrency', ['exports', 'ember-concurrency'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-concurrency',
    initialize: function initialize() {}
  };
});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = _ember.default.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('sandbox');
  });

  exports.default = Router;
});
define('dummy/routes/sandbox', ['exports', 'ember', 'dummy/utils/asyncs'], function (exports, _ember, _asyncs) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marked = [panstar].map(regeneratorRuntime.mark);

    var The = 'The';

    function panstar(The) {
        var quick, brown, fox, jumped, over, the, lazy, dog;
        return regeneratorRuntime.wrap(function panstar$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return The;

                    case 2:
                        _context.next = 4;
                        return (0, _asyncs.r200)(The + ' quick');

                    case 4:
                        quick = _context.sent;
                        _context.next = 7;
                        return (0, _asyncs.r200)(quick + ' brown');

                    case 7:
                        brown = _context.sent;
                        _context.next = 10;
                        return (0, _asyncs.r200)(brown + ' fox');

                    case 10:
                        fox = _context.sent;
                        _context.next = 13;
                        return (0, _asyncs.r200)(fox + ' jumped');

                    case 13:
                        jumped = _context.sent;
                        _context.next = 16;
                        return (0, _asyncs.r200)(jumped + ' over');

                    case 16:
                        over = _context.sent;
                        _context.next = 19;
                        return (0, _asyncs.r200)(over + ' the');

                    case 19:
                        the = _context.sent;
                        _context.next = 22;
                        return (0, _asyncs.r200)(the + ' lazy');

                    case 22:
                        lazy = _context.sent;
                        _context.next = 25;
                        return (0, _asyncs.r200)(lazy + ' dog');

                    case 25:
                        dog = _context.sent;
                        return _context.abrupt('return', dog);

                    case 27:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked[0], this);
    }

    exports.default = _ember.default.Route.extend({
        model: function model() {
            return { panstar: panstar, The: The };
        }
    });
});
define('dummy/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("dummy/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2jynzPnX", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/application.hbs" } });
});
define("dummy/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YHIxFJjr", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"index\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"index__control\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"let\"],[[\"helper\",[\"get\"],[[\"helper\",[\"gen-wrap-transform-class\"],[[\"get\",[\"isAnimating\"]],\"index__anime-square--x1-y0\",\"index__anime-square--x1-y1\",\"index__anime-square--x0-y1\",\"index__anime-square--x0-y0\"],[[\"onDone\"],[[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"isAnimating\"]]],null],false],null]]]],\"value\"],null]],null,1],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"index__gen-anime\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"let\"],[[\"helper\",[\"get\"],[[\"helper\",[\"gen-wrap-transform-class\"],[[\"get\",[\"isTransforming\"]],\"index__anime-square--x1-y0\",\"index__anime-square--x1-y1\",\"index__anime-square--x0-y1\",\"index__anime-square--x0-y0\"],[[\"onDone\"],[[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"isTransforming\"]]],null],false],null]]]],\"value\"],null]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"index__anime-square \",[\"get\",[\"animationClass\"]]]]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/star-cf3a9560d705f124c0edfcb3fa6afcd4.png\"],[\"static-attr\",\"class\",\"index__anime-image\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"index__anime-debug\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"get\",[\"animationClass\"]],false],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"index__anime-controls\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"index__anime-btn\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"isTransforming\"]]],null],true]],[\"flush-element\"],[\"text\",\"\\n          Animate!\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"animationClass\"]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"index__anime-square \",[\"get\",[\"animationClass\"]]]]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/star-cf3a9560d705f124c0edfcb3fa6afcd4.png\"],[\"static-attr\",\"class\",\"index__anime-image\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"index__anime-debug\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"get\",[\"animationClass\"]],false],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"index__anime-controls\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"index__anime-btn\"],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"isAnimating\"]]],null],true]],[\"flush-element\"],[\"text\",\"\\n          Animate!\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"animationClass\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/index.hbs" } });
});
define("dummy/templates/sandbox", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+M9ivsCR", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"sandbox__gen-take-vanilla\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"get\"],[[\"helper\",[\"gen-wrap\"],[[\"get\",[\"panstar\"]],[\"get\",[\"x1\"]]],[[\"onDone\"],[[\"helper\",[\"action\"],[[\"get\",[null]],\"vanillaDone\"],null]]]],\"value\"],null],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"sandbox__gen-take-vanilla-results\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"vanillaResults\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"sandbox__gen-take-expr\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"let\"],[[\"helper\",[\"hash\"],null,[[\"xxx\"],[[\"helper\",[\"get\"],[[\"helper\",[\"gen-wrap\"],[[\"get\",[\"panstar\"]],[\"get\",[\"x1\"]]],[[\"onDone\"],[[\"helper\",[\"action\"],[[\"get\",[null]],\"exprDone\",\"peppercorn\"],null]]]],\"value\"],null]]]]],null,0],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"sandbox__gen-take-expr-results\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"exprResults\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"sandbox__gen-take-control\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"get\"],[[\"helper\",[\"gen-wrap\"],[[\"get\",[\"panstar\"]],[\"get\",[\"x1\"]]],[[\"onDone\"],[[\"helper\",[\"action\"],[[\"get\",[null]],\"controlDone\"],null]]]],\"value\"],null],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"sandbox__gen-take-control-results\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"controlResults\"]],false],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"append\",[\"unknown\",[\"package\",\"xxx\"]],false],[\"text\",\"\\n\"]],\"locals\":[\"package\"]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/sandbox.hbs" } });
});
define('dummy/utils/asyncs', ['exports', 'ember'], function (exports, _ember) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.r250 = exports.r200 = exports.resolveAfter = undefined;
    var RSVP = _ember.default.RSVP,
        run = _ember.default.run;


    var resolveAfter = function resolveAfter(time) {
        return function (value) {
            return new RSVP.Promise(function (resolve) {
                return run.later(function () {
                    return resolve(value);
                }, time);
            });
        };
    };

    var r200 = resolveAfter(200);
    var r250 = resolveAfter(250);

    exports.resolveAfter = resolveAfter;
    exports.r200 = r200;
    exports.r250 = r250;
});


define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("dummy/app")["default"].create({});
}
