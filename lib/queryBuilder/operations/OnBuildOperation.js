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

var OnBuildOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(OnBuildOperation, _QueryBuilderOperatio);

  function OnBuildOperation() {
    (0, _classCallCheck3.default)(this, OnBuildOperation);
    return (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.apply(this, arguments));
  }

  OnBuildOperation.prototype.call = function call(builder, args) {
    this.func = args[0];
    return true;
  };

  OnBuildOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    return this.func.call(builder, builder);
  };

  return OnBuildOperation;
}(_QueryBuilderOperation2.default);

exports.default = OnBuildOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9uQnVpbGRPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiT25CdWlsZE9wZXJhdGlvbiIsImNhbGwiLCJidWlsZGVyIiwiYXJncyIsImZ1bmMiLCJvbkJlZm9yZUJ1aWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsZ0I7Ozs7Ozs7OzZCQUVuQkMsSSxpQkFBS0MsTyxFQUFTQyxJLEVBQU07QUFDbEIsU0FBS0MsSUFBTCxHQUFZRCxLQUFLLENBQUwsQ0FBWjtBQUNBLFdBQU8sSUFBUDtBQUNELEc7OzZCQUVERSxhLDBCQUFjSCxPLEVBQVM7QUFDckIsV0FBTyxLQUFLRSxJQUFMLENBQVVILElBQVYsQ0FBZUMsT0FBZixFQUF3QkEsT0FBeEIsQ0FBUDtBQUNELEc7Ozs7O2tCQVRrQkYsZ0IiLCJmaWxlIjoiT25CdWlsZE9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBRdWVyeUJ1aWxkZXJPcGVyYXRpb24gZnJvbSAnLi9RdWVyeUJ1aWxkZXJPcGVyYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPbkJ1aWxkT3BlcmF0aW9uIGV4dGVuZHMgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIHtcblxuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICB0aGlzLmZ1bmMgPSBhcmdzWzBdO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgb25CZWZvcmVCdWlsZChidWlsZGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuZnVuYy5jYWxsKGJ1aWxkZXIsIGJ1aWxkZXIpO1xuICB9XG59XG4iXX0=