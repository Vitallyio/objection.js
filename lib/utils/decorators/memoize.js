'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

exports.default = memoize;

var _upperFirst = require('lodash/upperFirst');

var _upperFirst2 = _interopRequireDefault(_upperFirst);

var _hiddenData = require('../hiddenData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function memoize(target, property, descriptor) {
  var cacheProp = 'memoized' + (0, _upperFirst2.default)(property);
  var impl = descriptor.value;

  if (impl.length === 0) {
    descriptor.value = memoizeZeroArgs(impl, cacheProp);
  } else {
    descriptor.value = memoizeSingleArg(impl, cacheProp);
  }
}

function memoizeZeroArgs(impl, cacheProp) {
  var get = (0, _hiddenData.createGetter)(cacheProp);
  var set = (0, _hiddenData.createSetter)(cacheProp);

  return function decorator$memoize() {
    var value = get(this);

    if (value === undefined) {
      value = impl.call(this);
      set(this, value);
    }

    return value;
  };
}

function memoizeSingleArg(impl, cacheProp) {
  var get = (0, _hiddenData.createGetter)(cacheProp);
  var set = (0, _hiddenData.createSetter)(cacheProp);

  return function decorator$memoize(input) {
    var cache = get(this);

    if (cache === undefined) {
      cache = (0, _create2.default)(null);
      set(this, cache);
    }

    if (cache[input] !== undefined) {
      return cache[input];
    } else {
      var value = impl.call(this, input);
      cache[input] = value;
      return value;
    }
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbW9pemUuanMiXSwibmFtZXMiOlsibWVtb2l6ZSIsInRhcmdldCIsInByb3BlcnR5IiwiZGVzY3JpcHRvciIsImNhY2hlUHJvcCIsImltcGwiLCJ2YWx1ZSIsImxlbmd0aCIsIm1lbW9pemVaZXJvQXJncyIsIm1lbW9pemVTaW5nbGVBcmciLCJnZXQiLCJzZXQiLCJkZWNvcmF0b3IkbWVtb2l6ZSIsInVuZGVmaW5lZCIsImNhbGwiLCJpbnB1dCIsImNhY2hlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O2tCQUd3QkEsTzs7QUFIeEI7Ozs7QUFDQTs7OztBQUVlLFNBQVNBLE9BQVQsQ0FBaUJDLE1BQWpCLEVBQXlCQyxRQUF6QixFQUFtQ0MsVUFBbkMsRUFBK0M7QUFDNUQsTUFBTUMsWUFBWSxhQUFhLDBCQUFXRixRQUFYLENBQS9CO0FBQ0EsTUFBTUcsT0FBT0YsV0FBV0csS0FBeEI7O0FBRUEsTUFBSUQsS0FBS0UsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUNyQkosZUFBV0csS0FBWCxHQUFtQkUsZ0JBQWdCSCxJQUFoQixFQUFzQkQsU0FBdEIsQ0FBbkI7QUFDRCxHQUZELE1BRU87QUFDTEQsZUFBV0csS0FBWCxHQUFtQkcsaUJBQWlCSixJQUFqQixFQUF1QkQsU0FBdkIsQ0FBbkI7QUFDRDtBQUNGOztBQUVELFNBQVNJLGVBQVQsQ0FBeUJILElBQXpCLEVBQStCRCxTQUEvQixFQUEwQztBQUN4QyxNQUFNTSxNQUFNLDhCQUFhTixTQUFiLENBQVo7QUFDQSxNQUFNTyxNQUFNLDhCQUFhUCxTQUFiLENBQVo7O0FBRUEsU0FBTyxTQUFTUSxpQkFBVCxHQUE2QjtBQUNsQyxRQUFJTixRQUFRSSxJQUFJLElBQUosQ0FBWjs7QUFFQSxRQUFJSixVQUFVTyxTQUFkLEVBQXlCO0FBQ3ZCUCxjQUFRRCxLQUFLUyxJQUFMLENBQVUsSUFBVixDQUFSO0FBQ0FILFVBQUksSUFBSixFQUFVTCxLQUFWO0FBQ0Q7O0FBRUQsV0FBT0EsS0FBUDtBQUNELEdBVEQ7QUFVRDs7QUFFRCxTQUFTRyxnQkFBVCxDQUEwQkosSUFBMUIsRUFBZ0NELFNBQWhDLEVBQTJDO0FBQ3pDLE1BQU1NLE1BQU0sOEJBQWFOLFNBQWIsQ0FBWjtBQUNBLE1BQU1PLE1BQU0sOEJBQWFQLFNBQWIsQ0FBWjs7QUFFQSxTQUFPLFNBQVNRLGlCQUFULENBQTJCRyxLQUEzQixFQUFrQztBQUN2QyxRQUFJQyxRQUFRTixJQUFJLElBQUosQ0FBWjs7QUFFQSxRQUFJTSxVQUFVSCxTQUFkLEVBQXlCO0FBQ3ZCRyxjQUFRLHNCQUFjLElBQWQsQ0FBUjtBQUNBTCxVQUFJLElBQUosRUFBVUssS0FBVjtBQUNEOztBQUVELFFBQUlBLE1BQU1ELEtBQU4sTUFBaUJGLFNBQXJCLEVBQWdDO0FBQzlCLGFBQU9HLE1BQU1ELEtBQU4sQ0FBUDtBQUNELEtBRkQsTUFFTztBQUNMLFVBQUlULFFBQVFELEtBQUtTLElBQUwsQ0FBVSxJQUFWLEVBQWdCQyxLQUFoQixDQUFaO0FBQ0FDLFlBQU1ELEtBQU4sSUFBZVQsS0FBZjtBQUNBLGFBQU9BLEtBQVA7QUFDRDtBQUNGLEdBZkQ7QUFnQkQiLCJmaWxlIjoibWVtb2l6ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1cHBlckZpcnN0IGZyb20gJ2xvZGFzaC91cHBlckZpcnN0JztcbmltcG9ydCB7Y3JlYXRlR2V0dGVyLCBjcmVhdGVTZXR0ZXJ9IGZyb20gJy4uL2hpZGRlbkRhdGEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZW1vaXplKHRhcmdldCwgcHJvcGVydHksIGRlc2NyaXB0b3IpIHtcbiAgY29uc3QgY2FjaGVQcm9wID0gJ21lbW9pemVkJyArIHVwcGVyRmlyc3QocHJvcGVydHkpO1xuICBjb25zdCBpbXBsID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICBpZiAoaW1wbC5sZW5ndGggPT09IDApIHtcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gbWVtb2l6ZVplcm9BcmdzKGltcGwsIGNhY2hlUHJvcCk7XG4gIH0gZWxzZSB7XG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IG1lbW9pemVTaW5nbGVBcmcoaW1wbCwgY2FjaGVQcm9wKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtZW1vaXplWmVyb0FyZ3MoaW1wbCwgY2FjaGVQcm9wKSB7XG4gIGNvbnN0IGdldCA9IGNyZWF0ZUdldHRlcihjYWNoZVByb3ApO1xuICBjb25zdCBzZXQgPSBjcmVhdGVTZXR0ZXIoY2FjaGVQcm9wKTtcblxuICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdG9yJG1lbW9pemUoKSB7XG4gICAgbGV0IHZhbHVlID0gZ2V0KHRoaXMpO1xuXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbHVlID0gaW1wbC5jYWxsKHRoaXMpO1xuICAgICAgc2V0KHRoaXMsIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG1lbW9pemVTaW5nbGVBcmcoaW1wbCwgY2FjaGVQcm9wKSB7XG4gIGNvbnN0IGdldCA9IGNyZWF0ZUdldHRlcihjYWNoZVByb3ApO1xuICBjb25zdCBzZXQgPSBjcmVhdGVTZXR0ZXIoY2FjaGVQcm9wKTtcblxuICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdG9yJG1lbW9pemUoaW5wdXQpIHtcbiAgICBsZXQgY2FjaGUgPSBnZXQodGhpcyk7XG5cbiAgICBpZiAoY2FjaGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgc2V0KHRoaXMsIGNhY2hlKTtcbiAgICB9XG5cbiAgICBpZiAoY2FjaGVbaW5wdXRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBjYWNoZVtpbnB1dF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB2YWx1ZSA9IGltcGwuY2FsbCh0aGlzLCBpbnB1dCk7XG4gICAgICBjYWNoZVtpbnB1dF0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH07XG59XG5cbiJdfQ==