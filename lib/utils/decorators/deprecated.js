'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deprecated;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deprecated(opt) {
  return function (target, property, descriptor) {
    var message = property + ' is deprecated and will be removed in version ' + opt.removedIn + '. Use ' + opt.useInstead + ' instead.';

    var value = descriptor.value;
    var getter = descriptor.get;

    if (_lodash2.default.isFunction(value)) {
      descriptor.value = function () {
        console.warn(message);
        return value.apply(this, arguments);
      };
    }

    if (_lodash2.default.isFunction(getter)) {
      descriptor.get = function () {
        console.warn(message);
        return getter.apply(this, arguments);
      };
    }
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlcHJlY2F0ZWQuanMiXSwibmFtZXMiOlsiZGVwcmVjYXRlZCIsIm9wdCIsInRhcmdldCIsInByb3BlcnR5IiwiZGVzY3JpcHRvciIsIm1lc3NhZ2UiLCJyZW1vdmVkSW4iLCJ1c2VJbnN0ZWFkIiwidmFsdWUiLCJnZXR0ZXIiLCJnZXQiLCJpc0Z1bmN0aW9uIiwiY29uc29sZSIsIndhcm4iLCJhcHBseSIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBRXdCQSxVOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUI7QUFDdEMsU0FBTyxVQUFVQyxNQUFWLEVBQWtCQyxRQUFsQixFQUE0QkMsVUFBNUIsRUFBd0M7QUFDN0MsUUFBTUMsVUFBYUYsUUFBYixzREFBc0VGLElBQUlLLFNBQTFFLGNBQTRGTCxJQUFJTSxVQUFoRyxjQUFOOztBQUVBLFFBQU1DLFFBQVFKLFdBQVdJLEtBQXpCO0FBQ0EsUUFBTUMsU0FBU0wsV0FBV00sR0FBMUI7O0FBRUEsUUFBSSxpQkFBRUMsVUFBRixDQUFhSCxLQUFiLENBQUosRUFBeUI7QUFDdkJKLGlCQUFXSSxLQUFYLEdBQW1CLFlBQVk7QUFDN0JJLGdCQUFRQyxJQUFSLENBQWFSLE9BQWI7QUFDQSxlQUFPRyxNQUFNTSxLQUFOLENBQVksSUFBWixFQUFrQkMsU0FBbEIsQ0FBUDtBQUNELE9BSEQ7QUFJRDs7QUFFRCxRQUFJLGlCQUFFSixVQUFGLENBQWFGLE1BQWIsQ0FBSixFQUEwQjtBQUN4QkwsaUJBQVdNLEdBQVgsR0FBaUIsWUFBWTtBQUMzQkUsZ0JBQVFDLElBQVIsQ0FBYVIsT0FBYjtBQUNBLGVBQU9JLE9BQU9LLEtBQVAsQ0FBYSxJQUFiLEVBQW1CQyxTQUFuQixDQUFQO0FBQ0QsT0FIRDtBQUlEO0FBQ0YsR0FuQkQ7QUFvQkQiLCJmaWxlIjoiZGVwcmVjYXRlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlcHJlY2F0ZWQob3B0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wZXJ0eSwgZGVzY3JpcHRvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtwcm9wZXJ0eX0gaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gJHtvcHQucmVtb3ZlZElufS4gVXNlICR7b3B0LnVzZUluc3RlYWR9IGluc3RlYWQuYDtcblxuICAgIGNvbnN0IHZhbHVlID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgICBjb25zdCBnZXR0ZXIgPSBkZXNjcmlwdG9yLmdldDtcblxuICAgIGlmIChfLmlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoXy5pc0Z1bmN0aW9uKGdldHRlcikpIHtcbiAgICAgIGRlc2NyaXB0b3IuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBnZXR0ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfVxuICB9O1xufSJdfQ==