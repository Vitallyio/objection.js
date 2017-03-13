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

var _UpdateOperation2 = require('./UpdateOperation');

var _UpdateOperation3 = _interopRequireDefault(_UpdateOperation2);

var _promiseUtils = require('../../utils/promiseUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InstanceUpdateOperation = function (_UpdateOperation) {
  (0, _inherits3.default)(InstanceUpdateOperation, _UpdateOperation);

  function InstanceUpdateOperation(name, opt) {
    (0, _classCallCheck3.default)(this, InstanceUpdateOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UpdateOperation.call(this, name, opt));

    _this.instance = opt.instance;
    _this.modelOptions.old = opt.instance;
    return _this;
  }

  InstanceUpdateOperation.prototype.call = function call(builder, args) {
    var retVal = _UpdateOperation.prototype.call.call(this, builder, args);

    if (!this.model) {
      this.model = this.instance;
    }

    return retVal;
  };

  InstanceUpdateOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    _UpdateOperation.prototype.onBeforeBuild.call(this, builder);
    builder.whereComposite(builder.modelClass().getFullIdColumn(), this.instance.$id());
  };

  InstanceUpdateOperation.prototype.onAfterInternal = function onAfterInternal(builder, numUpdated) {
    var _this2 = this;

    var maybePromise = _UpdateOperation.prototype.onAfterInternal.call(this, builder, numUpdated);
    return (0, _promiseUtils.after)(maybePromise, function (result) {
      _this2.instance.$set(_this2.model);
      return result;
    });
  };

  return InstanceUpdateOperation;
}(_UpdateOperation3.default);

exports.default = InstanceUpdateOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluc3RhbmNlVXBkYXRlT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIkluc3RhbmNlVXBkYXRlT3BlcmF0aW9uIiwibmFtZSIsIm9wdCIsImluc3RhbmNlIiwibW9kZWxPcHRpb25zIiwib2xkIiwiY2FsbCIsImJ1aWxkZXIiLCJhcmdzIiwicmV0VmFsIiwibW9kZWwiLCJvbkJlZm9yZUJ1aWxkIiwid2hlcmVDb21wb3NpdGUiLCJtb2RlbENsYXNzIiwiZ2V0RnVsbElkQ29sdW1uIiwiJGlkIiwib25BZnRlckludGVybmFsIiwibnVtVXBkYXRlZCIsIm1heWJlUHJvbWlzZSIsIiRzZXQiLCJyZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0lBRXFCQSx1Qjs7O0FBRW5CLG1DQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQiw0QkFBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUdyQixVQUFLQyxRQUFMLEdBQWdCRCxJQUFJQyxRQUFwQjtBQUNBLFVBQUtDLFlBQUwsQ0FBa0JDLEdBQWxCLEdBQXdCSCxJQUFJQyxRQUE1QjtBQUpxQjtBQUt0Qjs7b0NBRURHLEksaUJBQUtDLE8sRUFBU0MsSSxFQUFNO0FBQ2xCLFFBQU1DLFNBQVMsMkJBQU1ILElBQU4sWUFBV0MsT0FBWCxFQUFvQkMsSUFBcEIsQ0FBZjs7QUFFQSxRQUFJLENBQUMsS0FBS0UsS0FBVixFQUFpQjtBQUNmLFdBQUtBLEtBQUwsR0FBYSxLQUFLUCxRQUFsQjtBQUNEOztBQUVELFdBQU9NLE1BQVA7QUFDRCxHOztvQ0FFREUsYSwwQkFBY0osTyxFQUFTO0FBQ3JCLCtCQUFNSSxhQUFOLFlBQW9CSixPQUFwQjtBQUNBQSxZQUFRSyxjQUFSLENBQXVCTCxRQUFRTSxVQUFSLEdBQXFCQyxlQUFyQixFQUF2QixFQUErRCxLQUFLWCxRQUFMLENBQWNZLEdBQWQsRUFBL0Q7QUFDRCxHOztvQ0FFREMsZSw0QkFBZ0JULE8sRUFBU1UsVSxFQUFZO0FBQUE7O0FBQ25DLFFBQU1DLGVBQWUsMkJBQU1GLGVBQU4sWUFBc0JULE9BQXRCLEVBQStCVSxVQUEvQixDQUFyQjtBQUNBLFdBQU8seUJBQU1DLFlBQU4sRUFBb0Isa0JBQVU7QUFDbkMsYUFBS2YsUUFBTCxDQUFjZ0IsSUFBZCxDQUFtQixPQUFLVCxLQUF4QjtBQUNBLGFBQU9VLE1BQVA7QUFDRCxLQUhNLENBQVA7QUFJRCxHOzs7OztrQkE5QmtCcEIsdUIiLCJmaWxlIjoiSW5zdGFuY2VVcGRhdGVPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXBkYXRlT3BlcmF0aW9uIGZyb20gJy4vVXBkYXRlT3BlcmF0aW9uJztcbmltcG9ydCB7YWZ0ZXJ9IGZyb20gJy4uLy4uL3V0aWxzL3Byb21pc2VVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc3RhbmNlVXBkYXRlT3BlcmF0aW9uIGV4dGVuZHMgVXBkYXRlT3BlcmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHQpIHtcbiAgICBzdXBlcihuYW1lLCBvcHQpO1xuXG4gICAgdGhpcy5pbnN0YW5jZSA9IG9wdC5pbnN0YW5jZTtcbiAgICB0aGlzLm1vZGVsT3B0aW9ucy5vbGQgPSBvcHQuaW5zdGFuY2U7XG4gIH1cblxuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICBjb25zdCByZXRWYWwgPSBzdXBlci5jYWxsKGJ1aWxkZXIsIGFyZ3MpO1xuXG4gICAgaWYgKCF0aGlzLm1vZGVsKSB7XG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG5cbiAgb25CZWZvcmVCdWlsZChidWlsZGVyKSB7XG4gICAgc3VwZXIub25CZWZvcmVCdWlsZChidWlsZGVyKTtcbiAgICBidWlsZGVyLndoZXJlQ29tcG9zaXRlKGJ1aWxkZXIubW9kZWxDbGFzcygpLmdldEZ1bGxJZENvbHVtbigpLCB0aGlzLmluc3RhbmNlLiRpZCgpKTtcbiAgfVxuXG4gIG9uQWZ0ZXJJbnRlcm5hbChidWlsZGVyLCBudW1VcGRhdGVkKSB7XG4gICAgY29uc3QgbWF5YmVQcm9taXNlID0gc3VwZXIub25BZnRlckludGVybmFsKGJ1aWxkZXIsIG51bVVwZGF0ZWQpO1xuICAgIHJldHVybiBhZnRlcihtYXliZVByb21pc2UsIHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLmluc3RhbmNlLiRzZXQodGhpcy5tb2RlbCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuICB9XG59Il19