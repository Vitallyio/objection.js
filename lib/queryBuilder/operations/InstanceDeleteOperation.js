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

var _DeleteOperation2 = require('./DeleteOperation');

var _DeleteOperation3 = _interopRequireDefault(_DeleteOperation2);

var _promiseUtils = require('../../utils/promiseUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InstanceDeleteOperation = function (_DeleteOperation) {
  (0, _inherits3.default)(InstanceDeleteOperation, _DeleteOperation);

  function InstanceDeleteOperation(name, opt) {
    (0, _classCallCheck3.default)(this, InstanceDeleteOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _DeleteOperation.call(this, name, opt));

    _this.instance = opt.instance;
    return _this;
  }

  InstanceDeleteOperation.prototype.onBeforeInternal = function onBeforeInternal(builder, result) {
    var maybePromise = this.instance.$beforeDelete(builder.context());
    return (0, _promiseUtils.afterReturn)(maybePromise, result);
  };

  InstanceDeleteOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    _DeleteOperation.prototype.onBeforeBuild.call(this, builder);
    builder.whereComposite(builder.modelClass().getFullIdColumn(), this.instance.$id());
  };

  InstanceDeleteOperation.prototype.onAfterInternal = function onAfterInternal(builder, result) {
    var maybePromise = this.instance.$afterDelete(builder.context());
    return (0, _promiseUtils.afterReturn)(maybePromise, result);
  };

  return InstanceDeleteOperation;
}(_DeleteOperation3.default);

exports.default = InstanceDeleteOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluc3RhbmNlRGVsZXRlT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIkluc3RhbmNlRGVsZXRlT3BlcmF0aW9uIiwibmFtZSIsIm9wdCIsImluc3RhbmNlIiwib25CZWZvcmVJbnRlcm5hbCIsImJ1aWxkZXIiLCJyZXN1bHQiLCJtYXliZVByb21pc2UiLCIkYmVmb3JlRGVsZXRlIiwiY29udGV4dCIsIm9uQmVmb3JlQnVpbGQiLCJ3aGVyZUNvbXBvc2l0ZSIsIm1vZGVsQ2xhc3MiLCJnZXRGdWxsSWRDb2x1bW4iLCIkaWQiLCJvbkFmdGVySW50ZXJuYWwiLCIkYWZ0ZXJEZWxldGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0lBRXFCQSx1Qjs7O0FBRW5CLG1DQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQiw0QkFBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUVyQixVQUFLQyxRQUFMLEdBQWdCRCxJQUFJQyxRQUFwQjtBQUZxQjtBQUd0Qjs7b0NBRURDLGdCLDZCQUFpQkMsTyxFQUFTQyxNLEVBQVE7QUFDaEMsUUFBTUMsZUFBZSxLQUFLSixRQUFMLENBQWNLLGFBQWQsQ0FBNEJILFFBQVFJLE9BQVIsRUFBNUIsQ0FBckI7QUFDQSxXQUFPLCtCQUFZRixZQUFaLEVBQTBCRCxNQUExQixDQUFQO0FBQ0QsRzs7b0NBRURJLGEsMEJBQWNMLE8sRUFBUztBQUNyQiwrQkFBTUssYUFBTixZQUFvQkwsT0FBcEI7QUFDQUEsWUFBUU0sY0FBUixDQUF1Qk4sUUFBUU8sVUFBUixHQUFxQkMsZUFBckIsRUFBdkIsRUFBK0QsS0FBS1YsUUFBTCxDQUFjVyxHQUFkLEVBQS9EO0FBQ0QsRzs7b0NBRURDLGUsNEJBQWdCVixPLEVBQVNDLE0sRUFBUTtBQUMvQixRQUFNQyxlQUFlLEtBQUtKLFFBQUwsQ0FBY2EsWUFBZCxDQUEyQlgsUUFBUUksT0FBUixFQUEzQixDQUFyQjtBQUNBLFdBQU8sK0JBQVlGLFlBQVosRUFBMEJELE1BQTFCLENBQVA7QUFDRCxHOzs7OztrQkFwQmtCTix1QiIsImZpbGUiOiJJbnN0YW5jZURlbGV0ZU9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWxldGVPcGVyYXRpb24gZnJvbSAnLi9EZWxldGVPcGVyYXRpb24nO1xuaW1wb3J0IHthZnRlclJldHVybn0gZnJvbSAnLi4vLi4vdXRpbHMvcHJvbWlzZVV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5zdGFuY2VEZWxldGVPcGVyYXRpb24gZXh0ZW5kcyBEZWxldGVPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG4gICAgdGhpcy5pbnN0YW5jZSA9IG9wdC5pbnN0YW5jZTtcbiAgfVxuXG4gIG9uQmVmb3JlSW50ZXJuYWwoYnVpbGRlciwgcmVzdWx0KSB7XG4gICAgY29uc3QgbWF5YmVQcm9taXNlID0gdGhpcy5pbnN0YW5jZS4kYmVmb3JlRGVsZXRlKGJ1aWxkZXIuY29udGV4dCgpKTtcbiAgICByZXR1cm4gYWZ0ZXJSZXR1cm4obWF5YmVQcm9taXNlLCByZXN1bHQpO1xuICB9XG5cbiAgb25CZWZvcmVCdWlsZChidWlsZGVyKSB7XG4gICAgc3VwZXIub25CZWZvcmVCdWlsZChidWlsZGVyKTtcbiAgICBidWlsZGVyLndoZXJlQ29tcG9zaXRlKGJ1aWxkZXIubW9kZWxDbGFzcygpLmdldEZ1bGxJZENvbHVtbigpLCB0aGlzLmluc3RhbmNlLiRpZCgpKTtcbiAgfVxuXG4gIG9uQWZ0ZXJJbnRlcm5hbChidWlsZGVyLCByZXN1bHQpIHtcbiAgICBjb25zdCBtYXliZVByb21pc2UgPSB0aGlzLmluc3RhbmNlLiRhZnRlckRlbGV0ZShidWlsZGVyLmNvbnRleHQoKSk7XG4gICAgcmV0dXJuIGFmdGVyUmV0dXJuKG1heWJlUHJvbWlzZSwgcmVzdWx0KTtcbiAgfVxufSJdfQ==