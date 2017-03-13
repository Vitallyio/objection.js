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

var DeleteOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(DeleteOperation, _QueryBuilderOperatio);

  function DeleteOperation(name, opt) {
    (0, _classCallCheck3.default)(this, DeleteOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.call(this, name, opt));

    _this.isWriteOperation = true;
    return _this;
  }

  DeleteOperation.prototype.onBuild = function onBuild(knexBuilder, builder) {
    knexBuilder.delete();
  };

  return DeleteOperation;
}(_QueryBuilderOperation2.default);

exports.default = DeleteOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlbGV0ZU9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJEZWxldGVPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwiaXNXcml0ZU9wZXJhdGlvbiIsIm9uQnVpbGQiLCJrbmV4QnVpbGRlciIsImJ1aWxkZXIiLCJkZWxldGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxlOzs7QUFFbkIsMkJBQVlDLElBQVosRUFBa0JDLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsK0RBQ3JCLGlDQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBRXJCLFVBQUtDLGdCQUFMLEdBQXdCLElBQXhCO0FBRnFCO0FBR3RCOzs0QkFFREMsTyxvQkFBUUMsVyxFQUFhQyxPLEVBQVM7QUFDNUJELGdCQUFZRSxNQUFaO0FBQ0QsRzs7Ozs7a0JBVGtCUCxlIiwiZmlsZSI6IkRlbGV0ZU9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBRdWVyeUJ1aWxkZXJPcGVyYXRpb24gZnJvbSAnLi9RdWVyeUJ1aWxkZXJPcGVyYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWxldGVPcGVyYXRpb24gZXh0ZW5kcyBRdWVyeUJ1aWxkZXJPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG4gICAgdGhpcy5pc1dyaXRlT3BlcmF0aW9uID0gdHJ1ZTtcbiAgfVxuXG4gIG9uQnVpbGQoa25leEJ1aWxkZXIsIGJ1aWxkZXIpIHtcbiAgICBrbmV4QnVpbGRlci5kZWxldGUoKTtcbiAgfVxufVxuIl19