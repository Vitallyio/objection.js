'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = ValidationError;

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Note: babel cannot inherit from built-in types like Error.
// that's why we use ES5 inheritance here.

/**
 * @param {Object} errors
 */
function ValidationError(errors) {
  Error.call(this);
  Error.captureStackTrace(this, ValidationError);

  /**
   * @type {Object}
   */
  this.data = errors;

  /**
   * @type {number}
   */
  this.statusCode = 400;

  /**
   * @type {string}
   */
  this.message = (0, _stringify2.default)(errors, null, 2);
}

_util2.default.inherits(ValidationError, Error);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZhbGlkYXRpb25FcnJvci5qcyJdLCJuYW1lcyI6WyJWYWxpZGF0aW9uRXJyb3IiLCJlcnJvcnMiLCJFcnJvciIsImNhbGwiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImRhdGEiLCJzdGF0dXNDb2RlIiwibWVzc2FnZSIsImluaGVyaXRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O2tCQVF3QkEsZTs7QUFSeEI7Ozs7OztBQUVBO0FBQ0E7O0FBRUE7OztBQUdlLFNBQVNBLGVBQVQsQ0FBeUJDLE1BQXpCLEVBQWlDO0FBQzlDQyxRQUFNQyxJQUFOLENBQVcsSUFBWDtBQUNBRCxRQUFNRSxpQkFBTixDQUF3QixJQUF4QixFQUE4QkosZUFBOUI7O0FBRUE7OztBQUdBLE9BQUtLLElBQUwsR0FBWUosTUFBWjs7QUFFQTs7O0FBR0EsT0FBS0ssVUFBTCxHQUFrQixHQUFsQjs7QUFFQTs7O0FBR0EsT0FBS0MsT0FBTCxHQUFlLHlCQUFlTixNQUFmLEVBQXVCLElBQXZCLEVBQTZCLENBQTdCLENBQWY7QUFDRDs7QUFFRCxlQUFLTyxRQUFMLENBQWNSLGVBQWQsRUFBK0JFLEtBQS9CIiwiZmlsZSI6IlZhbGlkYXRpb25FcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dGlsIGZyb20gJ3V0aWwnO1xuXG4vLyBOb3RlOiBiYWJlbCBjYW5ub3QgaW5oZXJpdCBmcm9tIGJ1aWx0LWluIHR5cGVzIGxpa2UgRXJyb3IuXG4vLyB0aGF0J3Mgd2h5IHdlIHVzZSBFUzUgaW5oZXJpdGFuY2UgaGVyZS5cblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdH0gZXJyb3JzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFZhbGlkYXRpb25FcnJvcihlcnJvcnMpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcbiAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgVmFsaWRhdGlvbkVycm9yKTtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHRoaXMuZGF0YSA9IGVycm9ycztcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIHRoaXMuc3RhdHVzQ29kZSA9IDQwMDtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMubWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KGVycm9ycywgbnVsbCwgMik7XG59XG5cbnV0aWwuaW5oZXJpdHMoVmFsaWRhdGlvbkVycm9yLCBFcnJvcik7XG5cblxuIl19