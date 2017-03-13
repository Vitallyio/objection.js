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

var _InsertOperation2 = require('../../queryBuilder/operations/InsertOperation');

var _InsertOperation3 = _interopRequireDefault(_InsertOperation2);

var _promiseUtils = require('../../utils/promiseUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HasManyInsertOperation = function (_InsertOperation) {
  (0, _inherits3.default)(HasManyInsertOperation, _InsertOperation);

  function HasManyInsertOperation(name, opt) {
    (0, _classCallCheck3.default)(this, HasManyInsertOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _InsertOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owner = opt.owner;
    return _this;
  }

  HasManyInsertOperation.prototype.call = function call(builder, args) {
    var retVal = _InsertOperation.prototype.call.call(this, builder, args);

    for (var i = 0, lm = this.models.length; i < lm; ++i) {
      var model = this.models[i];

      for (var j = 0, lp = this.relation.relatedProp.length; j < lp; ++j) {
        var relatedProp = this.relation.relatedProp[j];
        var ownerProp = this.relation.ownerProp[j];

        model[relatedProp] = this.owner[ownerProp];
      }
    }

    return retVal;
  };

  HasManyInsertOperation.prototype.onAfterQuery = function onAfterQuery(builder, inserted) {
    var _this2 = this;

    var maybePromise = _InsertOperation.prototype.onAfterQuery.call(this, builder, inserted);

    var isOneToOne = this.relation.isOneToOne();
    var relName = this.relation.name;
    var owner = this.owner;

    return (0, _promiseUtils.after)(maybePromise, function (inserted) {
      if (isOneToOne) {
        owner[relName] = inserted[0] || null;
      } else {
        owner[relName] = _this2.relation.mergeModels(owner[relName], inserted);
      }

      return inserted;
    });
  };

  return HasManyInsertOperation;
}(_InsertOperation3.default);

exports.default = HasManyInsertOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhhc01hbnlJbnNlcnRPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiSGFzTWFueUluc2VydE9wZXJhdGlvbiIsIm5hbWUiLCJvcHQiLCJyZWxhdGlvbiIsIm93bmVyIiwiY2FsbCIsImJ1aWxkZXIiLCJhcmdzIiwicmV0VmFsIiwiaSIsImxtIiwibW9kZWxzIiwibGVuZ3RoIiwibW9kZWwiLCJqIiwibHAiLCJyZWxhdGVkUHJvcCIsIm93bmVyUHJvcCIsIm9uQWZ0ZXJRdWVyeSIsImluc2VydGVkIiwibWF5YmVQcm9taXNlIiwiaXNPbmVUb09uZSIsInJlbE5hbWUiLCJtZXJnZU1vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7SUFFcUJBLHNCOzs7QUFFbkIsa0NBQVlDLElBQVosRUFBa0JDLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsK0RBQ3JCLDRCQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBR3JCLFVBQUtDLFFBQUwsR0FBZ0JELElBQUlDLFFBQXBCO0FBQ0EsVUFBS0MsS0FBTCxHQUFhRixJQUFJRSxLQUFqQjtBQUpxQjtBQUt0Qjs7bUNBRURDLEksaUJBQUtDLE8sRUFBU0MsSSxFQUFNO0FBQ2xCLFFBQU1DLFNBQVMsMkJBQU1ILElBQU4sWUFBV0MsT0FBWCxFQUFvQkMsSUFBcEIsQ0FBZjs7QUFFQSxTQUFLLElBQUlFLElBQUksQ0FBUixFQUFXQyxLQUFLLEtBQUtDLE1BQUwsQ0FBWUMsTUFBakMsRUFBeUNILElBQUlDLEVBQTdDLEVBQWlELEVBQUVELENBQW5ELEVBQXNEO0FBQ3BELFVBQU1JLFFBQVEsS0FBS0YsTUFBTCxDQUFZRixDQUFaLENBQWQ7O0FBRUEsV0FBSyxJQUFJSyxJQUFJLENBQVIsRUFBV0MsS0FBSyxLQUFLWixRQUFMLENBQWNhLFdBQWQsQ0FBMEJKLE1BQS9DLEVBQXVERSxJQUFJQyxFQUEzRCxFQUErRCxFQUFFRCxDQUFqRSxFQUFvRTtBQUNsRSxZQUFNRSxjQUFjLEtBQUtiLFFBQUwsQ0FBY2EsV0FBZCxDQUEwQkYsQ0FBMUIsQ0FBcEI7QUFDQSxZQUFNRyxZQUFZLEtBQUtkLFFBQUwsQ0FBY2MsU0FBZCxDQUF3QkgsQ0FBeEIsQ0FBbEI7O0FBRUFELGNBQU1HLFdBQU4sSUFBcUIsS0FBS1osS0FBTCxDQUFXYSxTQUFYLENBQXJCO0FBQ0Q7QUFDRjs7QUFFRCxXQUFPVCxNQUFQO0FBQ0QsRzs7bUNBRURVLFkseUJBQWFaLE8sRUFBU2EsUSxFQUFVO0FBQUE7O0FBQzlCLFFBQU1DLGVBQWUsMkJBQU1GLFlBQU4sWUFBbUJaLE9BQW5CLEVBQTRCYSxRQUE1QixDQUFyQjs7QUFFQSxRQUFNRSxhQUFhLEtBQUtsQixRQUFMLENBQWNrQixVQUFkLEVBQW5CO0FBQ0EsUUFBTUMsVUFBVSxLQUFLbkIsUUFBTCxDQUFjRixJQUE5QjtBQUNBLFFBQU1HLFFBQVEsS0FBS0EsS0FBbkI7O0FBRUEsV0FBTyx5QkFBTWdCLFlBQU4sRUFBb0Isb0JBQVk7QUFDckMsVUFBSUMsVUFBSixFQUFnQjtBQUNkakIsY0FBTWtCLE9BQU4sSUFBaUJILFNBQVMsQ0FBVCxLQUFlLElBQWhDO0FBQ0QsT0FGRCxNQUVPO0FBQ0xmLGNBQU1rQixPQUFOLElBQWlCLE9BQUtuQixRQUFMLENBQWNvQixXQUFkLENBQTBCbkIsTUFBTWtCLE9BQU4sQ0FBMUIsRUFBMENILFFBQTFDLENBQWpCO0FBQ0Q7O0FBRUQsYUFBT0EsUUFBUDtBQUNELEtBUk0sQ0FBUDtBQVNELEc7Ozs7O2tCQTFDa0JuQixzQiIsImZpbGUiOiJIYXNNYW55SW5zZXJ0T3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEluc2VydE9wZXJhdGlvbiBmcm9tICcuLi8uLi9xdWVyeUJ1aWxkZXIvb3BlcmF0aW9ucy9JbnNlcnRPcGVyYXRpb24nO1xuaW1wb3J0IHthZnRlcn0gZnJvbSAnLi4vLi4vdXRpbHMvcHJvbWlzZVV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzTWFueUluc2VydE9wZXJhdGlvbiBleHRlbmRzIEluc2VydE9wZXJhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgb3B0KSB7XG4gICAgc3VwZXIobmFtZSwgb3B0KTtcblxuICAgIHRoaXMucmVsYXRpb24gPSBvcHQucmVsYXRpb247XG4gICAgdGhpcy5vd25lciA9IG9wdC5vd25lcjtcbiAgfVxuXG4gIGNhbGwoYnVpbGRlciwgYXJncykge1xuICAgIGNvbnN0IHJldFZhbCA9IHN1cGVyLmNhbGwoYnVpbGRlciwgYXJncyk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbG0gPSB0aGlzLm1vZGVscy5sZW5ndGg7IGkgPCBsbTsgKytpKSB7XG4gICAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxzW2ldO1xuXG4gICAgICBmb3IgKGxldCBqID0gMCwgbHAgPSB0aGlzLnJlbGF0aW9uLnJlbGF0ZWRQcm9wLmxlbmd0aDsgaiA8IGxwOyArK2opIHtcbiAgICAgICAgY29uc3QgcmVsYXRlZFByb3AgPSB0aGlzLnJlbGF0aW9uLnJlbGF0ZWRQcm9wW2pdO1xuICAgICAgICBjb25zdCBvd25lclByb3AgPSB0aGlzLnJlbGF0aW9uLm93bmVyUHJvcFtqXTtcblxuICAgICAgICBtb2RlbFtyZWxhdGVkUHJvcF0gPSB0aGlzLm93bmVyW293bmVyUHJvcF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIG9uQWZ0ZXJRdWVyeShidWlsZGVyLCBpbnNlcnRlZCkge1xuICAgIGNvbnN0IG1heWJlUHJvbWlzZSA9IHN1cGVyLm9uQWZ0ZXJRdWVyeShidWlsZGVyLCBpbnNlcnRlZCk7XG5cbiAgICBjb25zdCBpc09uZVRvT25lID0gdGhpcy5yZWxhdGlvbi5pc09uZVRvT25lKCk7XG4gICAgY29uc3QgcmVsTmFtZSA9IHRoaXMucmVsYXRpb24ubmFtZTtcbiAgICBjb25zdCBvd25lciA9IHRoaXMub3duZXI7XG5cbiAgICByZXR1cm4gYWZ0ZXIobWF5YmVQcm9taXNlLCBpbnNlcnRlZCA9PiB7XG4gICAgICBpZiAoaXNPbmVUb09uZSkge1xuICAgICAgICBvd25lcltyZWxOYW1lXSA9IGluc2VydGVkWzBdIHx8IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvd25lcltyZWxOYW1lXSA9IHRoaXMucmVsYXRpb24ubWVyZ2VNb2RlbHMob3duZXJbcmVsTmFtZV0sIGluc2VydGVkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGluc2VydGVkO1xuICAgIH0pO1xuICB9XG59XG4iXX0=