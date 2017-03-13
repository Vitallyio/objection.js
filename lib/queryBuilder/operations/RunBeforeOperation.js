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

var RunBeforeOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(RunBeforeOperation, _QueryBuilderOperatio);

  function RunBeforeOperation() {
    (0, _classCallCheck3.default)(this, RunBeforeOperation);
    return (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.apply(this, arguments));
  }

  RunBeforeOperation.prototype.call = function call(builder, args) {
    this.func = args[0];
    return true;
  };

  RunBeforeOperation.prototype.onBefore = function onBefore(builder, result) {
    return this.func.call(builder, result, builder);
  };

  return RunBeforeOperation;
}(_QueryBuilderOperation2.default);

exports.default = RunBeforeOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJ1bkJlZm9yZU9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJSdW5CZWZvcmVPcGVyYXRpb24iLCJjYWxsIiwiYnVpbGRlciIsImFyZ3MiLCJmdW5jIiwib25CZWZvcmUiLCJyZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxrQjs7Ozs7Ozs7K0JBRW5CQyxJLGlCQUFLQyxPLEVBQVNDLEksRUFBTTtBQUNsQixTQUFLQyxJQUFMLEdBQVlELEtBQUssQ0FBTCxDQUFaO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsRzs7K0JBRURFLFEscUJBQVNILE8sRUFBU0ksTSxFQUFRO0FBQ3hCLFdBQU8sS0FBS0YsSUFBTCxDQUFVSCxJQUFWLENBQWVDLE9BQWYsRUFBd0JJLE1BQXhCLEVBQWdDSixPQUFoQyxDQUFQO0FBQ0QsRzs7Ozs7a0JBVGtCRixrQiIsImZpbGUiOiJSdW5CZWZvcmVPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIGZyb20gJy4vUXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVuQmVmb3JlT3BlcmF0aW9uIGV4dGVuZHMgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIHtcblxuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICB0aGlzLmZ1bmMgPSBhcmdzWzBdO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgb25CZWZvcmUoYnVpbGRlciwgcmVzdWx0KSB7XG4gICAgcmV0dXJuIHRoaXMuZnVuYy5jYWxsKGJ1aWxkZXIsIHJlc3VsdCwgYnVpbGRlcik7XG4gIH1cbn1cbiJdfQ==