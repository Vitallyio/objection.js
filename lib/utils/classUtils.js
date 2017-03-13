"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.inherits = inherits;
exports.isSubclassOf = isSubclassOf;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Makes the `Constructor` inherit `SuperConstructor`.
 *
 * Calls node.js `util.inherits` but also copies the "static" properties from
 * `SuperConstructor` to `Constructor`.
 *
 * This function is taken from Babel transpiler.
 *
 * @param {Object} subClass
 * @param {Object} superClass
 */
function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (superClass) {
    subClass.__proto__ = superClass;
  }

  return subClass;
}

/**
 * Tests if a constructor function inherits another constructor function.
 *
 * @param {Object} Constructor
 * @param {Object} SuperConstructor
 * @returns {boolean}
 */
function isSubclassOf(Constructor, SuperConstructor) {
  if (!_lodash2.default.isFunction(SuperConstructor)) {
    return false;
  }

  while (_lodash2.default.isFunction(Constructor)) {
    if (Constructor === SuperConstructor) return true;
    var proto = Constructor.prototype.__proto__;
    Constructor = proto && proto.constructor;
  }

  return false;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzVXRpbHMuanMiXSwibmFtZXMiOlsiaW5oZXJpdHMiLCJpc1N1YmNsYXNzT2YiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJUeXBlRXJyb3IiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwiZW51bWVyYWJsZSIsIndyaXRhYmxlIiwiY29uZmlndXJhYmxlIiwiX19wcm90b19fIiwiQ29uc3RydWN0b3IiLCJTdXBlckNvbnN0cnVjdG9yIiwiaXNGdW5jdGlvbiIsInByb3RvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztRQWFnQkEsUSxHQUFBQSxRO1FBNEJBQyxZLEdBQUFBLFk7O0FBekNoQjs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7O0FBV08sU0FBU0QsUUFBVCxDQUFrQkUsUUFBbEIsRUFBNEJDLFVBQTVCLEVBQXdDO0FBQzdDLE1BQUksT0FBT0EsVUFBUCxLQUFzQixVQUF0QixJQUFvQ0EsZUFBZSxJQUF2RCxFQUE2RDtBQUMzRCxVQUFNLElBQUlDLFNBQUosQ0FBYyxxRUFBb0VELFVBQXBFLHVEQUFvRUEsVUFBcEUsRUFBZCxDQUFOO0FBQ0Q7O0FBRURELFdBQVNHLFNBQVQsR0FBcUIsc0JBQWNGLGNBQWNBLFdBQVdFLFNBQXZDLEVBQWtEO0FBQ3JFQyxpQkFBYTtBQUNYQyxhQUFPTCxRQURJO0FBRVhNLGtCQUFZLEtBRkQ7QUFHWEMsZ0JBQVUsSUFIQztBQUlYQyxvQkFBYztBQUpIO0FBRHdELEdBQWxELENBQXJCOztBQVNBLE1BQUlQLFVBQUosRUFBZ0I7QUFDZEQsYUFBU1MsU0FBVCxHQUFxQlIsVUFBckI7QUFDRDs7QUFFRCxTQUFPRCxRQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPTyxTQUFTRCxZQUFULENBQXNCVyxXQUF0QixFQUFtQ0MsZ0JBQW5DLEVBQXFEO0FBQzFELE1BQUksQ0FBQyxpQkFBRUMsVUFBRixDQUFhRCxnQkFBYixDQUFMLEVBQXFDO0FBQ25DLFdBQU8sS0FBUDtBQUNEOztBQUVELFNBQU8saUJBQUVDLFVBQUYsQ0FBYUYsV0FBYixDQUFQLEVBQWtDO0FBQ2hDLFFBQUlBLGdCQUFnQkMsZ0JBQXBCLEVBQXNDLE9BQU8sSUFBUDtBQUN0QyxRQUFJRSxRQUFRSCxZQUFZUCxTQUFaLENBQXNCTSxTQUFsQztBQUNBQyxrQkFBY0csU0FBU0EsTUFBTVQsV0FBN0I7QUFDRDs7QUFFRCxTQUFPLEtBQVA7QUFDRCIsImZpbGUiOiJjbGFzc1V0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBNYWtlcyB0aGUgYENvbnN0cnVjdG9yYCBpbmhlcml0IGBTdXBlckNvbnN0cnVjdG9yYC5cbiAqXG4gKiBDYWxscyBub2RlLmpzIGB1dGlsLmluaGVyaXRzYCBidXQgYWxzbyBjb3BpZXMgdGhlIFwic3RhdGljXCIgcHJvcGVydGllcyBmcm9tXG4gKiBgU3VwZXJDb25zdHJ1Y3RvcmAgdG8gYENvbnN0cnVjdG9yYC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHRha2VuIGZyb20gQmFiZWwgdHJhbnNwaWxlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3ViQ2xhc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdXBlckNsYXNzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHN1cGVyQ2xhc3MpIHtcbiAgICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xuICB9XG5cbiAgcmV0dXJuIHN1YkNsYXNzO1xufVxuXG4vKipcbiAqIFRlc3RzIGlmIGEgY29uc3RydWN0b3IgZnVuY3Rpb24gaW5oZXJpdHMgYW5vdGhlciBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gQ29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBTdXBlckNvbnN0cnVjdG9yXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3ViY2xhc3NPZihDb25zdHJ1Y3RvciwgU3VwZXJDb25zdHJ1Y3Rvcikge1xuICBpZiAoIV8uaXNGdW5jdGlvbihTdXBlckNvbnN0cnVjdG9yKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHdoaWxlIChfLmlzRnVuY3Rpb24oQ29uc3RydWN0b3IpKSB7XG4gICAgaWYgKENvbnN0cnVjdG9yID09PSBTdXBlckNvbnN0cnVjdG9yKSByZXR1cm4gdHJ1ZTtcbiAgICBsZXQgcHJvdG8gPSBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuX19wcm90b19fO1xuICAgIENvbnN0cnVjdG9yID0gcHJvdG8gJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=