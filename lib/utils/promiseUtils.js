'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.isPromise = isPromise;
exports.after = after;
exports.afterReturn = afterReturn;
exports.mapAfterAllReturn = mapAfterAllReturn;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPromise(obj) {
  return obj && (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' && typeof obj.then === 'function';
}

function after(obj, func) {
  if (isPromise(obj)) {
    return obj.then(func);
  } else {
    return func(obj);
  }
}

function afterReturn(obj, returnValue) {
  if (obj instanceof _bluebird2.default) {
    return obj.return(returnValue);
  } else if (isPromise(obj)) {
    return obj.then(function () {
      return returnValue;
    });
  } else {
    return returnValue;
  }
}

function mapAfterAllReturn(arr, mapper, returnValue) {
  var results = new Array(arr.length);
  var containsPromise = false;

  for (var i = 0, l = arr.length; i < l; ++i) {
    results[i] = mapper(arr[i]);

    if (isPromise(results[i])) {
      containsPromise = true;
    }
  }

  if (containsPromise) {
    return _bluebird2.default.all(results).return(returnValue);
  } else {
    return returnValue;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21pc2VVdGlscy5qcyJdLCJuYW1lcyI6WyJpc1Byb21pc2UiLCJhZnRlciIsImFmdGVyUmV0dXJuIiwibWFwQWZ0ZXJBbGxSZXR1cm4iLCJvYmoiLCJ0aGVuIiwiZnVuYyIsInJldHVyblZhbHVlIiwicmV0dXJuIiwiYXJyIiwibWFwcGVyIiwicmVzdWx0cyIsIkFycmF5IiwibGVuZ3RoIiwiY29udGFpbnNQcm9taXNlIiwiaSIsImwiLCJhbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7UUFFZ0JBLFMsR0FBQUEsUztRQUlBQyxLLEdBQUFBLEs7UUFRQUMsVyxHQUFBQSxXO1FBVUFDLGlCLEdBQUFBLGlCOztBQXhCaEI7Ozs7OztBQUVPLFNBQVNILFNBQVQsQ0FBbUJJLEdBQW5CLEVBQXdCO0FBQzdCLFNBQU9BLE9BQVEsUUFBT0EsR0FBUCx1REFBT0EsR0FBUCxPQUFlLFFBQXZCLElBQXFDLE9BQU9BLElBQUlDLElBQVgsS0FBb0IsVUFBaEU7QUFDRDs7QUFFTSxTQUFTSixLQUFULENBQWVHLEdBQWYsRUFBb0JFLElBQXBCLEVBQTBCO0FBQy9CLE1BQUlOLFVBQVVJLEdBQVYsQ0FBSixFQUFvQjtBQUNsQixXQUFPQSxJQUFJQyxJQUFKLENBQVNDLElBQVQsQ0FBUDtBQUNELEdBRkQsTUFFTztBQUNMLFdBQU9BLEtBQUtGLEdBQUwsQ0FBUDtBQUNEO0FBQ0Y7O0FBRU0sU0FBU0YsV0FBVCxDQUFxQkUsR0FBckIsRUFBMEJHLFdBQTFCLEVBQXVDO0FBQzVDLE1BQUlILGlDQUFKLEVBQTRCO0FBQzFCLFdBQU9BLElBQUlJLE1BQUosQ0FBV0QsV0FBWCxDQUFQO0FBQ0QsR0FGRCxNQUVPLElBQUlQLFVBQVVJLEdBQVYsQ0FBSixFQUFvQjtBQUN6QixXQUFPQSxJQUFJQyxJQUFKLENBQVM7QUFBQSxhQUFNRSxXQUFOO0FBQUEsS0FBVCxDQUFQO0FBQ0QsR0FGTSxNQUVBO0FBQ0wsV0FBT0EsV0FBUDtBQUNEO0FBQ0Y7O0FBRU0sU0FBU0osaUJBQVQsQ0FBMkJNLEdBQTNCLEVBQWdDQyxNQUFoQyxFQUF3Q0gsV0FBeEMsRUFBcUQ7QUFDMUQsTUFBTUksVUFBVSxJQUFJQyxLQUFKLENBQVVILElBQUlJLE1BQWQsQ0FBaEI7QUFDQSxNQUFJQyxrQkFBa0IsS0FBdEI7O0FBRUEsT0FBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsSUFBSVAsSUFBSUksTUFBeEIsRUFBZ0NFLElBQUlDLENBQXBDLEVBQXVDLEVBQUVELENBQXpDLEVBQTRDO0FBQzFDSixZQUFRSSxDQUFSLElBQWFMLE9BQU9ELElBQUlNLENBQUosQ0FBUCxDQUFiOztBQUVBLFFBQUlmLFVBQVVXLFFBQVFJLENBQVIsQ0FBVixDQUFKLEVBQTJCO0FBQ3pCRCx3QkFBa0IsSUFBbEI7QUFDRDtBQUNGOztBQUVELE1BQUlBLGVBQUosRUFBcUI7QUFDbkIsV0FBTyxtQkFBUUcsR0FBUixDQUFZTixPQUFaLEVBQXFCSCxNQUFyQixDQUE0QkQsV0FBNUIsQ0FBUDtBQUNELEdBRkQsTUFFTztBQUNMLFdBQU9BLFdBQVA7QUFDRDtBQUNGIiwiZmlsZSI6InByb21pc2VVdGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpICYmICh0eXBlb2Ygb2JqLnRoZW4gPT09ICdmdW5jdGlvbicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWZ0ZXIob2JqLCBmdW5jKSB7XG4gIGlmIChpc1Byb21pc2Uob2JqKSkge1xuICAgIHJldHVybiBvYmoudGhlbihmdW5jKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnVuYyhvYmopO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZnRlclJldHVybihvYmosIHJldHVyblZhbHVlKSB7XG4gIGlmIChvYmogaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgcmV0dXJuIG9iai5yZXR1cm4ocmV0dXJuVmFsdWUpO1xuICB9IGVsc2UgaWYgKGlzUHJvbWlzZShvYmopKSB7XG4gICAgcmV0dXJuIG9iai50aGVuKCgpID0+IHJldHVyblZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcEFmdGVyQWxsUmV0dXJuKGFyciwgbWFwcGVyLCByZXR1cm5WYWx1ZSkge1xuICBjb25zdCByZXN1bHRzID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBsZXQgY29udGFpbnNQcm9taXNlID0gZmFsc2U7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgcmVzdWx0c1tpXSA9IG1hcHBlcihhcnJbaV0pO1xuXG4gICAgaWYgKGlzUHJvbWlzZShyZXN1bHRzW2ldKSkge1xuICAgICAgY29udGFpbnNQcm9taXNlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoY29udGFpbnNQcm9taXNlKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHJlc3VsdHMpLnJldHVybihyZXR1cm5WYWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG59Il19