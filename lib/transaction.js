'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transaction;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Model = require('./model/Model');

var _Model2 = _interopRequireDefault(_Model);

var _classUtils = require('./utils/classUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @returns {Promise}
 */
function transaction() {
  // There must be at least one model class and the callback.
  if (arguments.length < 2) {
    return _bluebird2.default.reject(new Error('objection.transaction: provide at least one Model class to bind to the transaction or a knex instance'));
  }

  if (!(0, _classUtils.isSubclassOf)(arguments[0], _Model2.default) && _lodash2.default.isFunction(arguments[0].transaction)) {
    var args = _lodash2.default.toArray(arguments);
    var knex = _lodash2.default.first(args);
    args = args.slice(1);

    // If the function is a generator, wrap it using Promise.coroutine.
    if (isGenerator(args[0])) {
      args[0] = _bluebird2.default.coroutine(args[0]);
    }

    return knex.transaction.apply(knex, args);
  } else {
    // The last argument should be the callback and all other Model subclasses.
    var callback = _lodash2.default.last(arguments);
    var modelClasses = _lodash2.default.take(arguments, arguments.length - 1);
    var i = void 0;

    for (i = 0; i < modelClasses.length; ++i) {
      if (!(0, _classUtils.isSubclassOf)(modelClasses[i], _Model2.default)) {
        return _bluebird2.default.reject(new Error('objection.transaction: all but the last argument should be Model subclasses'));
      }
    }

    var _knex = _lodash2.default.first(modelClasses).knex();
    for (i = 0; i < modelClasses.length; ++i) {
      if (modelClasses[i].knex() !== _knex) {
        return _bluebird2.default.reject(new Error('objection.transaction: all Model subclasses must be bound to the same database'));
      }
    }

    // If the function is a generator, wrap it using Promise.coroutine.
    if (isGenerator(callback)) {
      callback = _bluebird2.default.coroutine(callback);
    }

    return _knex.transaction(function (trx) {
      var args = new Array(modelClasses.length + 1);

      for (var _i = 0; _i < modelClasses.length; ++_i) {
        args[_i] = modelClasses[_i].bindTransaction(trx);
      }

      args[args.length - 1] = trx;

      return _bluebird2.default.try(function () {
        return callback.apply(trx, args);
      });
    });
  }
}

/**
 * @param {Constructor.<Model>|knex} modelClassOrKnex
 * @returns {Promise}
 */
transaction.start = function (modelClassOrKnex) {
  var knex = modelClassOrKnex;

  if ((0, _classUtils.isSubclassOf)(modelClassOrKnex, _Model2.default)) {
    knex = modelClassOrKnex.knex();
  }

  if (!_lodash2.default.isFunction(knex.transaction)) {
    return _bluebird2.default.reject(new Error('objection.transaction.start: first argument must be a model class or a knex instance'));
  }

  return new _bluebird2.default(function (resolve, reject) {
    knex.transaction(function (trx) {
      resolve(trx);
    }).catch(function (err) {
      reject(err);
    });
  });
};

function isGenerator(fn) {
  return fn && fn.constructor && fn.constructor.name === 'GeneratorFunction';
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyYW5zYWN0aW9uLmpzIl0sIm5hbWVzIjpbInRyYW5zYWN0aW9uIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwicmVqZWN0IiwiRXJyb3IiLCJpc0Z1bmN0aW9uIiwiYXJncyIsInRvQXJyYXkiLCJrbmV4IiwiZmlyc3QiLCJzbGljZSIsImlzR2VuZXJhdG9yIiwiY29yb3V0aW5lIiwiYXBwbHkiLCJjYWxsYmFjayIsImxhc3QiLCJtb2RlbENsYXNzZXMiLCJ0YWtlIiwiaSIsIkFycmF5IiwiYmluZFRyYW5zYWN0aW9uIiwidHJ4IiwidHJ5Iiwic3RhcnQiLCJtb2RlbENsYXNzT3JLbmV4IiwicmVzb2x2ZSIsImNhdGNoIiwiZXJyIiwiZm4iLCJjb25zdHJ1Y3RvciIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQVF3QkEsVzs7QUFSeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7O0FBR2UsU0FBU0EsV0FBVCxHQUF1QjtBQUNwQztBQUNBLE1BQUlDLFVBQVVDLE1BQVYsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsV0FBTyxtQkFBUUMsTUFBUixDQUFlLElBQUlDLEtBQUosQ0FBVSx1R0FBVixDQUFmLENBQVA7QUFDRDs7QUFFRCxNQUFJLENBQUMsOEJBQWFILFVBQVUsQ0FBVixDQUFiLGtCQUFELElBQXNDLGlCQUFFSSxVQUFGLENBQWFKLFVBQVUsQ0FBVixFQUFhRCxXQUExQixDQUExQyxFQUFrRjtBQUNoRixRQUFJTSxPQUFPLGlCQUFFQyxPQUFGLENBQVVOLFNBQVYsQ0FBWDtBQUNBLFFBQUlPLE9BQU8saUJBQUVDLEtBQUYsQ0FBUUgsSUFBUixDQUFYO0FBQ0FBLFdBQU9BLEtBQUtJLEtBQUwsQ0FBVyxDQUFYLENBQVA7O0FBRUE7QUFDQSxRQUFJQyxZQUFZTCxLQUFLLENBQUwsQ0FBWixDQUFKLEVBQTBCO0FBQ3hCQSxXQUFLLENBQUwsSUFBVSxtQkFBUU0sU0FBUixDQUFrQk4sS0FBSyxDQUFMLENBQWxCLENBQVY7QUFDRDs7QUFF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J2xvZGFzaCc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbC9Nb2RlbCc7XG5pbXBvcnQge2lzU3ViY2xhc3NPZn0gZnJvbSAnLi91dGlscy9jbGFzc1V0aWxzJztcblxuLyoqXG4gKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNhY3Rpb24oKSB7XG4gIC8vIFRoZXJlIG11c3QgYmUgYXQgbGVhc3Qgb25lIG1vZGVsIGNsYXNzIGFuZCB0aGUgY2FsbGJhY2suXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ29iamVjdGlvbi50cmFuc2FjdGlvbjogcHJvdmlkZSBhdCBsZWFzdCBvbmUgTW9kZWwgY2xhc3MgdG8gYmluZCB0byB0aGUgdHJhbnNhY3Rpb24gb3IgYSBrbmV4IGluc3RhbmNlJykpO1xuICB9XG5cbiAgaWYgKCFpc1N1YmNsYXNzT2YoYXJndW1lbnRzWzBdLCBNb2RlbCkgJiYgXy5pc0Z1bmN0aW9uKGFyZ3VtZW50c1swXS50cmFuc2FjdGlvbikpIHtcbiAgICBsZXQgYXJncyA9IF8udG9BcnJheShhcmd1bWVudHMpO1xuICAgIGxldCBrbmV4ID0gXy5maXJzdChhcmdzKTtcbiAgICBhcmdzID0gYXJncy5zbGljZSgxKTtcblxuICAgIC8vIElmIHRoZSBmdW5jdGlvbiBpcyBhIGdlbmVyYXRvciwgd3JhcCBpdCB1c2luZyBQcm9taXNlLmNvcm91dGluZS5cbiAgICBpZiAoaXNHZW5lcmF0b3IoYXJnc1swXSkpIHtcbiAgICAgIGFyZ3NbMF0gPSBQcm9taXNlLmNvcm91dGluZShhcmdzWzBdKTtcbiAgICB9XG5cbiAgICByZXR1cm4ga25leC50cmFuc2FjdGlvbi5hcHBseShrbmV4LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUaGUgbGFzdCBhcmd1bWVudCBzaG91bGQgYmUgdGhlIGNhbGxiYWNrIGFuZCBhbGwgb3RoZXIgTW9kZWwgc3ViY2xhc3Nlcy5cbiAgICBsZXQgY2FsbGJhY2sgPSBfLmxhc3QoYXJndW1lbnRzKTtcbiAgICBsZXQgbW9kZWxDbGFzc2VzID0gXy50YWtlKGFyZ3VtZW50cywgYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG1vZGVsQ2xhc3Nlcy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKCFpc1N1YmNsYXNzT2YobW9kZWxDbGFzc2VzW2ldLCBNb2RlbCkpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignb2JqZWN0aW9uLnRyYW5zYWN0aW9uOiBhbGwgYnV0IHRoZSBsYXN0IGFyZ3VtZW50IHNob3VsZCBiZSBNb2RlbCBzdWJjbGFzc2VzJykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBrbmV4ID0gXy5maXJzdChtb2RlbENsYXNzZXMpLmtuZXgoKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbW9kZWxDbGFzc2VzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAobW9kZWxDbGFzc2VzW2ldLmtuZXgoKSAhPT0ga25leCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdvYmplY3Rpb24udHJhbnNhY3Rpb246IGFsbCBNb2RlbCBzdWJjbGFzc2VzIG11c3QgYmUgYm91bmQgdG8gdGhlIHNhbWUgZGF0YWJhc2UnKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGZ1bmN0aW9uIGlzIGEgZ2VuZXJhdG9yLCB3cmFwIGl0IHVzaW5nIFByb21pc2UuY29yb3V0aW5lLlxuICAgIGlmIChpc0dlbmVyYXRvcihjYWxsYmFjaykpIHtcbiAgICAgIGNhbGxiYWNrID0gUHJvbWlzZS5jb3JvdXRpbmUoY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBrbmV4LnRyYW5zYWN0aW9uKHRyeCA9PiB7XG4gICAgICBsZXQgYXJncyA9IG5ldyBBcnJheShtb2RlbENsYXNzZXMubGVuZ3RoICsgMSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZWxDbGFzc2VzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGFyZ3NbaV0gPSBtb2RlbENsYXNzZXNbaV0uYmluZFRyYW5zYWN0aW9uKHRyeCk7XG4gICAgICB9XG5cbiAgICAgIGFyZ3NbYXJncy5sZW5ndGggLSAxXSA9IHRyeDtcblxuICAgICAgcmV0dXJuIFByb21pc2UudHJ5KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHRyeCwgYXJncyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7Q29uc3RydWN0b3IuPE1vZGVsPnxrbmV4fSBtb2RlbENsYXNzT3JLbmV4XG4gKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAqL1xudHJhbnNhY3Rpb24uc3RhcnQgPSBmdW5jdGlvbiAobW9kZWxDbGFzc09yS25leCkge1xuICBsZXQga25leCA9IG1vZGVsQ2xhc3NPcktuZXg7XG5cbiAgaWYgKGlzU3ViY2xhc3NPZihtb2RlbENsYXNzT3JLbmV4LCBNb2RlbCkpIHtcbiAgICBrbmV4ID0gbW9kZWxDbGFzc09yS25leC5rbmV4KCk7XG4gIH1cblxuICBpZiAoIV8uaXNGdW5jdGlvbihrbmV4LnRyYW5zYWN0aW9uKSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ29iamVjdGlvbi50cmFuc2FjdGlvbi5zdGFydDogZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIG1vZGVsIGNsYXNzIG9yIGEga25leCBpbnN0YW5jZScpKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAga25leC50cmFuc2FjdGlvbih0cnggPT4ge1xuICAgICAgcmVzb2x2ZSh0cngpO1xuICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBpc0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZm4gJiYgZm4uY29uc3RydWN0b3IgJiYgZm4uY29uc3RydWN0b3IubmFtZSA9PT0gJ0dlbmVyYXRvckZ1bmN0aW9uJztcbn1cbiJdfQ==