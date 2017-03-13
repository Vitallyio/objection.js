'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = normalizeIds;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalizeIds(ids, expectedProperties, opt) {
  opt = opt || {};

  if (!_lodash2.default.isArray(expectedProperties)) {
    throw new Error('expected expectedProperties to be an array, got ' + expectedProperties);
  }

  if (expectedProperties.length === 0) {
    throw new Error('expectedProperties must not be empty');
  }

  var isComposite = expectedProperties.length > 1;
  var ret = void 0;

  if (isComposite) {
    // For composite ids these are okay:
    //
    // 1. [1, 'foo', 4]
    // 2. {a: 1, b: 'foo', c: 4}
    // 3. [[1, 'foo', 4], [4, 'bar', 1]]
    // 4. [{a: 1, b: 'foo', c: 4}, {a: 4, b: 'bar', c: 1}]
    //
    if (Array.isArray(ids)) {
      if (Array.isArray(ids[0])) {
        ret = new Array(ids.length);

        // 3.
        for (var i = 0, l = ids.length; i < l; ++i) {
          ret[i] = convertIdArrayToObject(ids[i], expectedProperties);
        }
      } else if (_lodash2.default.isObject(ids[0])) {
        ret = new Array(ids.length);

        // 4.
        for (var _i = 0, _l = ids.length; _i < _l; ++_i) {
          ret[_i] = ensureObject(ids[_i], expectedProperties);
        }
      } else {
        // 1.
        ret = [convertIdArrayToObject(ids, expectedProperties)];
      }
    } else if (_lodash2.default.isObject(ids)) {
      // 2.
      ret = [ids];
    } else {
      throw new Error('invalid composite key ' + (0, _stringify2.default)(ids));
    }
  } else {
    // For non-composite ids, these are okay:
    //
    // 1. 1
    // 2. {id: 1}
    // 3. [1, 'foo', 4]
    // 4. [{id: 1}, {id: 'foo'}, {id: 4}]
    //
    if (_lodash2.default.isArray(ids)) {
      if (_lodash2.default.isObject(ids[0])) {
        ret = new Array(ids.length);

        // 4.
        for (var _i2 = 0, _l2 = ids.length; _i2 < _l2; ++_i2) {
          ret[_i2] = ensureObject(ids[_i2]);
        }
      } else {
        ret = new Array(ids.length);

        // 3.
        for (var _i3 = 0, _l3 = ids.length; _i3 < _l3; ++_i3) {
          ret[_i3] = (0, _defineProperty3.default)({}, expectedProperties[0], ids[_i3]);
        }
      }
    } else if (_lodash2.default.isObject(ids)) {
      // 2.
      ret = [ids];
    } else {
      // 1.
      ret = [(0, _defineProperty3.default)({}, expectedProperties[0], ids)];
    }
  }

  checkProperties(ret, expectedProperties);

  if (opt.arrayOutput) {
    return normalizedToArray(ret, expectedProperties);
  } else {
    return ret;
  }
};

function convertIdArrayToObject(ids, expectedProperties) {
  if (!Array.isArray(ids)) {
    throw new Error('invalid composite key ' + (0, _stringify2.default)(ids));
  }

  if (ids.length != expectedProperties.length) {
    throw new Error('composite identifier ' + (0, _stringify2.default)(ids) + ' should have ' + expectedProperties.length + ' values');
  }

  return _lodash2.default.zipObject(expectedProperties, ids);
}

function ensureObject(ids) {
  if (_lodash2.default.isObject(ids)) {
    return ids;
  } else {
    throw new Error('invalid composite key ' + (0, _stringify2.default)(ids));
  }
}

function checkProperties(ret, expectedProperties) {
  for (var i = 0, l = ret.length; i < l; ++i) {
    var obj = ret[i];

    for (var j = 0, lp = expectedProperties.length; j < lp; ++j) {
      var prop = expectedProperties[j];

      if (typeof obj[prop] === 'undefined') {
        throw new Error('expected id ' + (0, _stringify2.default)(obj) + ' to have property ' + prop);
      }
    }
  }
}

function normalizedToArray(ret, expectedProperties) {
  var arr = new Array(ret.length);

  for (var i = 0, l = ret.length; i < l; ++i) {
    var obj = ret[i];
    var ids = new Array(expectedProperties.length);

    for (var j = 0, lp = expectedProperties.length; j < lp; ++j) {
      var prop = expectedProperties[j];
      ids[j] = obj[prop];
    }

    arr[i] = ids;
  }

  return arr;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vcm1hbGl6ZUlkcy5qcyJdLCJuYW1lcyI6WyJub3JtYWxpemVJZHMiLCJpZHMiLCJleHBlY3RlZFByb3BlcnRpZXMiLCJvcHQiLCJpc0FycmF5IiwiRXJyb3IiLCJsZW5ndGgiLCJpc0NvbXBvc2l0ZSIsInJldCIsIkFycmF5IiwiaSIsImwiLCJjb252ZXJ0SWRBcnJheVRvT2JqZWN0IiwiaXNPYmplY3QiLCJlbnN1cmVPYmplY3QiLCJjaGVja1Byb3BlcnRpZXMiLCJhcnJheU91dHB1dCIsIm5vcm1hbGl6ZWRUb0FycmF5IiwiemlwT2JqZWN0Iiwib2JqIiwiaiIsImxwIiwicHJvcCIsImFyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7a0JBRXdCQSxZOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBU0EsWUFBVCxDQUFzQkMsR0FBdEIsRUFBMkJDLGtCQUEzQixFQUErQ0MsR0FBL0MsRUFBb0Q7QUFDakVBLFFBQU1BLE9BQU8sRUFBYjs7QUFFQSxNQUFJLENBQUMsaUJBQUVDLE9BQUYsQ0FBVUYsa0JBQVYsQ0FBTCxFQUFvQztBQUNsQyxVQUFNLElBQUlHLEtBQUosc0RBQTZESCxrQkFBN0QsQ0FBTjtBQUNEOztBQUVELE1BQUlBLG1CQUFtQkksTUFBbkIsS0FBOEIsQ0FBbEMsRUFBcUM7QUFDbkMsVUFBTSxJQUFJRCxLQUFKLHdDQUFOO0FBQ0Q7O0FBRUQsTUFBSUUsY0FBY0wsbUJBQW1CSSxNQUFuQixHQUE0QixDQUE5QztBQUNBLE1BQUlFLFlBQUo7O0FBRUEsTUFBSUQsV0FBSixFQUFpQjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBSUUsTUFBTUwsT0FBTixDQUFjSCxHQUFkLENBQUosRUFBd0I7QUFDdEIsVUFBSVEsTUFBTUwsT0FBTixDQUFjSCxJQUFJLENBQUosQ0FBZCxDQUFKLEVBQTJCO0FBQ3pCTyxjQUFNLElBQUlDLEtBQUosQ0FBVVIsSUFBSUssTUFBZCxDQUFOOztBQUVBO0FBQ0EsYUFBSyxJQUFJSSxJ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RUFBZ0NJLElBQUlDLENBQXBDLEVBQXVDLEVBQUVELENBQXpDLEVBQTRDO0FBQzFDLFFBQU1TLE1BQU1YLElBQUlFLENBQUosQ0FBWjtBQUNBLFFBQU1ULE1BQU0sSUFBSVEsS0FBSixDQUFVUCxtQkFBbUJJLE1BQTdCLENBQVo7O0FBRUEsU0FBSyxJQUFJYyxJQUFJLENBQVIsRUFBV0MsS0FBS25CLG1CQUFtQkksTUFBeEMsRUFBZ0RjLElBQUlDLEVBQXBELEVBQXdELEVBQUVELENBQTFELEVBQTZEO0FBQzNELFVBQU1FLE9BQU9wQixtQkFBbUJrQixDQUFuQixDQUFiO0FBQ0FuQixVQUFJbUIsQ0FBSixJQUFTRCxJQUFJRyxJQUFKLENBQVQ7QUFDRDs7QUFFREMsUUFBSWIsQ0FBSixJQUFTVCxHQUFUO0FBQ0Q7O0FBRUQsU0FBT3NCLEdBQVA7QUFDRCIsImZpbGUiOiJub3JtYWxpemVJZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3JtYWxpemVJZHMoaWRzLCBleHBlY3RlZFByb3BlcnRpZXMsIG9wdCkge1xuICBvcHQgPSBvcHQgfHwge307XG5cbiAgaWYgKCFfLmlzQXJyYXkoZXhwZWN0ZWRQcm9wZXJ0aWVzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgZXhwZWN0ZWQgZXhwZWN0ZWRQcm9wZXJ0aWVzIHRvIGJlIGFuIGFycmF5LCBnb3QgJHtleHBlY3RlZFByb3BlcnRpZXN9YCk7XG4gIH1cblxuICBpZiAoZXhwZWN0ZWRQcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgZXhwZWN0ZWRQcm9wZXJ0aWVzIG11c3Qgbm90IGJlIGVtcHR5YCk7XG4gIH1cblxuICBsZXQgaXNDb21wb3NpdGUgPSBleHBlY3RlZFByb3BlcnRpZXMubGVuZ3RoID4gMTtcbiAgbGV0IHJldDtcblxuICBpZiAoaXNDb21wb3NpdGUpIHtcbiAgICAvLyBGb3IgY29tcG9zaXRlIGlkcyB0aGVzZSBhcmUgb2theTpcbiAgICAvL1xuICAgIC8vIDEuIFsxLCAnZm9vJywgNF1cbiAgICAvLyAyLiB7YTogMSwgYjogJ2ZvbycsIGM6IDR9XG4gICAgLy8gMy4gW1sxLCAnZm9vJywgNF0sIFs0LCAnYmFyJywgMV1dXG4gICAgLy8gNC4gW3thOiAxLCBiOiAnZm9vJywgYzogNH0sIHthOiA0LCBiOiAnYmFyJywgYzogMX1dXG4gICAgLy9cbiAgICBpZiAoQXJyYXkuaXNBcnJheShpZHMpKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShpZHNbMF0pKSB7XG4gICAgICAgIHJldCA9IG5ldyBBcnJheShpZHMubGVuZ3RoKTtcblxuICAgICAgICAvLyAzLlxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGlkcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICByZXRbaV0gPSBjb252ZXJ0SWRBcnJheVRvT2JqZWN0KGlkc1tpXSwgZXhwZWN0ZWRQcm9wZXJ0aWVzKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKF8uaXNPYmplY3QoaWRzWzBdKSkge1xuICAgICAgICByZXQgPSBuZXcgQXJyYXkoaWRzLmxlbmd0aCk7XG5cbiAgICAgICAgLy8gNC5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBpZHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgcmV0W2ldID0gZW5zdXJlT2JqZWN0KGlkc1tpXSwgZXhwZWN0ZWRQcm9wZXJ0aWVzKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAxLlxuICAgICAgICByZXQgPSBbY29udmVydElkQXJyYXlUb09iamVjdChpZHMsIGV4cGVjdGVkUHJvcGVydGllcyldO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXy5pc09iamVjdChpZHMpKSB7XG4gICAgICAvLyAyLlxuICAgICAgcmV0ID0gW2lkc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBjb21wb3NpdGUga2V5ICR7SlNPTi5zdHJpbmdpZnkoaWRzKX1gKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gRm9yIG5vbi1jb21wb3NpdGUgaWRzLCB0aGVzZSBhcmUgb2theTpcbiAgICAvL1xuICAgIC8vIDEuIDFcbiAgICAvLyAyLiB7aWQ6IDF9XG4gICAgLy8gMy4gWzEsICdmb28nLCA0XVxuICAgIC8vIDQuIFt7aWQ6IDF9LCB7aWQ6ICdmb28nfSwge2lkOiA0fV1cbiAgICAvL1xuICAgIGlmIChfLmlzQXJyYXkoaWRzKSkge1xuICAgICAgaWYgKF8uaXNPYmplY3QoaWRzWzBdKSkge1xuICAgICAgICByZXQgPSBuZXcgQXJyYXkoaWRzLmxlbmd0aCk7XG5cbiAgICAgICAgLy8gNC5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBpZHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgcmV0W2ldID0gZW5zdXJlT2JqZWN0KGlkc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IG5ldyBBcnJheShpZHMubGVuZ3RoKTtcblxuICAgICAgICAvLyAzLlxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGlkcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICByZXRbaV0gPSB7W2V4cGVjdGVkUHJvcGVydGllc1swXV06IGlkc1tpXX07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKF8uaXNPYmplY3QoaWRzKSkge1xuICAgICAgLy8gMi5cbiAgICAgIHJldCA9IFtpZHNdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyAxLlxuICAgICAgcmV0ID0gW3tbZXhwZWN0ZWRQcm9wZXJ0aWVzWzBdXTogaWRzfV07XG4gICAgfVxuICB9XG5cbiAgY2hlY2tQcm9wZXJ0aWVzKHJldCwgZXhwZWN0ZWRQcm9wZXJ0aWVzKTtcblxuICBpZiAob3B0LmFycmF5T3V0cHV0KSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRUb0FycmF5KHJldCwgZXhwZWN0ZWRQcm9wZXJ0aWVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmV0O1xuICB9XG59O1xuXG5mdW5jdGlvbiBjb252ZXJ0SWRBcnJheVRvT2JqZWN0KGlkcywgZXhwZWN0ZWRQcm9wZXJ0aWVzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShpZHMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGNvbXBvc2l0ZSBrZXkgJHtKU09OLnN0cmluZ2lmeShpZHMpfWApO1xuICB9XG5cbiAgaWYgKGlkcy5sZW5ndGggIT0gZXhwZWN0ZWRQcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgY29tcG9zaXRlIGlkZW50aWZpZXIgJHtKU09OLnN0cmluZ2lmeShpZHMpfSBzaG91bGQgaGF2ZSAke2V4cGVjdGVkUHJvcGVydGllcy5sZW5ndGh9IHZhbHVlc2ApO1xuICB9XG5cbiAgcmV0dXJuIF8uemlwT2JqZWN0KGV4cGVjdGVkUHJvcGVydGllcywgaWRzKTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlT2JqZWN0KGlkcykge1xuICBpZiAoXy5pc09iamVjdChpZHMpKSB7XG4gICAgcmV0dXJuIGlkcztcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgY29tcG9zaXRlIGtleSAke0pTT04uc3RyaW5naWZ5KGlkcyl9YCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tQcm9wZXJ0aWVzKHJldCwgZXhwZWN0ZWRQcm9wZXJ0aWVzKSB7XG4gIGZvciAobGV0IGkgPSAwLCBsID0gcmV0Lmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IG9iaiA9IHJldFtpXTtcblxuICAgIGZvciAobGV0IGogPSAwLCBscCA9IGV4cGVjdGVkUHJvcGVydGllcy5sZW5ndGg7IGogPCBscDsgKytqKSB7XG4gICAgICBjb25zdCBwcm9wID0gZXhwZWN0ZWRQcm9wZXJ0aWVzW2pdO1xuXG4gICAgICBpZiAodHlwZW9mIG9ialtwcm9wXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBleHBlY3RlZCBpZCAke0pTT04uc3RyaW5naWZ5KG9iail9IHRvIGhhdmUgcHJvcGVydHkgJHtwcm9wfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVkVG9BcnJheShyZXQsIGV4cGVjdGVkUHJvcGVydGllcykge1xuICBsZXQgYXJyID0gbmV3IEFycmF5KHJldC5sZW5ndGgpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gcmV0Lmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IG9iaiA9IHJldFtpXTtcbiAgICBjb25zdCBpZHMgPSBuZXcgQXJyYXkoZXhwZWN0ZWRQcm9wZXJ0aWVzLmxlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBqID0gMCwgbHAgPSBleHBlY3RlZFByb3BlcnRpZXMubGVuZ3RoOyBqIDwgbHA7ICsraikge1xuICAgICAgY29uc3QgcHJvcCA9IGV4cGVjdGVkUHJvcGVydGllc1tqXTtcbiAgICAgIGlkc1tqXSA9IG9ialtwcm9wXTtcbiAgICB9XG5cbiAgICBhcnJbaV0gPSBpZHM7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufSJdfQ==