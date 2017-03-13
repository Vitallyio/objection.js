'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _QueryBuilderOperation = require('./QueryBuilderOperation');

var _QueryBuilderOperation2 = _interopRequireDefault(_QueryBuilderOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RunAfterOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(RunAfterOperation, _QueryBuilderOperatio);

  function RunAfterOperation() {
    (0, _classCallCheck3.default)(this, RunAfterOperation);
    return (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.apply(this, arguments));
  }

  RunAfterOperation.prototype.call = function call(builder, args) {
    this.func = args[0];
    return true;
  };

  RunAfterOperation.prototype.onAfter = function onAfter(builder, result) {
    return this.func.call(builder, result, builder);
  };

  return RunAfterOperation;
}(_QueryBuilderOperation2.default);

exports.default = RunAfterOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJ1bkFmdGVyT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIlJ1bkFmdGVyT3BlcmF0aW9uIiwiY2FsbCIsImJ1aWxkZXIiLCJhcmdzIiwiZnVuYyIsIm9uQWZ0ZXIiLCJyZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxpQjs7Ozs7Ozs7OEJBRW5CQyxJLGlCQUFLQyxPLEVBQVNDLEksRUFBTTtBQUNsQixTQUFLQyxJQUFMLEdBQVlELEtBQUssQ0FBTCxDQUFaO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsRzs7OEJBRURFLE8sb0JBQVFILE8sRUFBU0ksTSxFQUFRO0FBQ3ZCLFdBQU8sS0FBS0YsSUFBTCxDQUFVSCxJQUFWLENBQWVDLE9BQWYsRUFBd0JJLE1BQXhCLEVBQWdDSixPQUFoQyxDQUFQO0FBQ0QsRzs7Ozs7a0JBVGtCRixpQiIsImZpbGUiOiJSdW5BZnRlck9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBRdWVyeUJ1aWxkZXJPcGVyYXRpb24gZnJvbSAnLi9RdWVyeUJ1aWxkZXJPcGVyYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdW5BZnRlck9wZXJhdGlvbiBleHRlbmRzIFF1ZXJ5QnVpbGRlck9wZXJhdGlvbiB7XG5cbiAgY2FsbChidWlsZGVyLCBhcmdzKSB7XG4gICAgdGhpcy5mdW5jID0gYXJnc1swXTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG9uQWZ0ZXIoYnVpbGRlciwgcmVzdWx0KSB7XG4gICAgcmV0dXJuIHRoaXMuZnVuYy5jYWxsKGJ1aWxkZXIsIHJlc3VsdCwgYnVpbGRlcik7XG4gIH1cbn1cbiJdfQ==