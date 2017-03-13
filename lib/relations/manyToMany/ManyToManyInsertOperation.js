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

var ManyToManyInsertOperation = function (_InsertOperation) {
  (0, _inherits3.default)(ManyToManyInsertOperation, _InsertOperation);

  function ManyToManyInsertOperation(name, opt) {
    (0, _classCallCheck3.default)(this, ManyToManyInsertOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _InsertOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owner = opt.owner;
    return _this;
  }

  ManyToManyInsertOperation.prototype.call = function call(builder, args) {
    var retVal = _InsertOperation.prototype.call.call(this, builder, args);

    this.relation.omitExtraProps(this.models);

    return retVal;
  };

  ManyToManyInsertOperation.prototype.onAfterQuery = function onAfterQuery(builder, inserted) {
    var _this2 = this;

    var maybePromise = _InsertOperation.prototype.onAfterQuery.call(this, builder, inserted);

    var isOneToOne = this.relation.isOneToOne();
    var relName = this.relation.name;
    var owner = this.owner;

    return (0, _promiseUtils.after)(maybePromise, function (inserted) {
      var ownerId = _this2.owner.$values(_this2.relation.ownerProp);
      var joinModels = _this2.relation.createJoinModels(ownerId, inserted);

      if (isOneToOne) {
        owner[relName] = inserted[0] || null;
      } else {
        owner[relName] = _this2.relation.mergeModels(owner[relName], inserted);
      }

      // Insert the join rows to the join table.
      return _this2.relation.joinTableModelClass(builder.knex()).query().childQueryOf(builder).insert(joinModels).return(inserted);
    });
  };

  return ManyToManyInsertOperation;
}(_InsertOperation3.default);

exports.default = ManyToManyInsertOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hbnlUb01hbnlJbnNlcnRPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiTWFueVRvTWFueUluc2VydE9wZXJhdGlvbiIsIm5hbWUiLCJvcHQiLCJyZWxhdGlvbiIsIm93bmVyIiwiY2FsbCIsImJ1aWxkZXIiLCJhcmdzIiwicmV0VmFsIiwib21pdEV4dHJhUHJvcHMiLCJtb2RlbHMiLCJvbkFmdGVyUXVlcnkiLCJpbnNlcnRlZCIsIm1heWJlUHJvbWlzZSIsImlzT25lVG9PbmUiLCJyZWxOYW1lIiwib3duZXJJZCIsIiR2YWx1ZXMiLCJvd25lclByb3AiLCJqb2luTW9kZWxzIiwiY3JlYXRlSm9pbk1vZGVscyIsIm1lcmdlTW9kZWxzIiwiam9pblRhYmxlTW9kZWxDbGFzcyIsImtuZXgiLCJxdWVyeSIsImNoaWxkUXVlcnlPZiIsImluc2VydCIsInJldHVybiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7SUFFcUJBLHlCOzs7QUFFbkIscUNBQVlDLElBQVosRUFBa0JDLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsK0RBQ3JCLDRCQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBR3JCLFVBQUtDLFFBQUwsR0FBZ0JELElBQUlDLFFBQXBCO0FBQ0EsVUFBS0MsS0FBTCxHQUFhRixJQUFJRSxLQUFqQjtBQUpxQjtBQUt0Qjs7c0NBRURDLEksaUJBQUtDLE8sRUFBU0MsSSxFQUFNO0FBQ2xCLFFBQU1DLFNBQVMsMkJBQU1ILElBQU4sWUFBV0MsT0FBWCxFQUFvQkMsSUFBcEIsQ0FBZjs7QUFFQSxTQUFLSixRQUFMLENBQWNNLGNBQWQsQ0FBNkIsS0FBS0MsTUFBbEM7O0FBRUEsV0FBT0YsTUFBUDtBQUNELEc7O3NDQUVERyxZLHlCQUFhTCxPLEVBQVNNLFEsRUFBVTtBQUFBOztBQUM5QixRQUFNQyxlQUFlLDJCQUFNRixZQUFOLFlBQW1CTCxPQUFuQixFQUE0Qk0sUUFBNUIsQ0FBckI7O0FBRUEsUUFBTUUsYUFBYSxLQUFLWCxRQUFMLENBQWNXLFVBQWQsRUFBbkI7QUFDQSxRQUFNQyxVQUFVLEtBQUtaLFFBQUwsQ0FBY0YsSUFBOUI7QUFDQSxRQUFNRyxRQUFRLEtBQUtBLEtBQW5COztBQUVBLFdBQU8seUJBQU1TLFlBQU4sRUFBb0Isb0JBQVk7QUFDckMsVUFBSUcsVUFBVSxPQUFLWixLQUFMLENBQVdhLE9BQVgsQ0FBbUIsT0FBS2QsUUFBTCxDQUFjZSxTQUFqQyxDQUFkO0FBQ0EsVUFBSUMsYUFBYSxPQUFLaEIsUUFBTCxDQUFjaUIsZ0JBQWQsQ0FBK0JKLE9BQS9CLEVBQXdDSixRQUF4QyxDQUFqQjs7QUFFQSxVQUFJRSxVQUFKLEVBQWdCO0FBQ2RWLGNBQU1XLE9BQU4sSUFBaUJILFNBQVMsQ0FBVCxLQUFlLElBQWhDO0FBQ0QsT0FGRCxNQUVPO0FBQ0xSLGNBQU1XLE9BQU4sSUFBaUIsT0FBS1osUUFBTCxDQUFja0IsV0FBZCxDQUEwQmpCLE1BQU1XLE9BQU4sQ0FBMUIsRUFBMENILFFBQTFDLENBQWpCO0FBQ0Q7O0FBRUQ7QUFDQSxhQUFPLE9BQUtULFFBQUwsQ0FBY21CLG1CQUFkLENBQWtDaEIsUUFBUWlCLElBQVIsRUFBbEMsRUFDSkMsS0FESSxHQUVKQyxZQUZJLENBRVNuQixPQUZULEVBR0pvQixNQUhJLENBR0dQLFVBSEgsRUFJSlEsTUFKSSxDQUlHZixRQUpILENBQVA7QUFLRCxLQWhCTSxDQUFQO0FBaUJELEc7Ozs7O2tCQXpDa0JaLHlCIiwiZmlsZSI6Ik1hbnlUb01hbnlJbnNlcnRPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW5zZXJ0T3BlcmF0aW9uIGZyb20gJy4uLy4uL3F1ZXJ5QnVpbGRlci9vcGVyYXRpb25zL0luc2VydE9wZXJhdGlvbic7XG5pbXBvcnQge2FmdGVyfSBmcm9tICcuLi8uLi91dGlscy9wcm9taXNlVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW55VG9NYW55SW5zZXJ0T3BlcmF0aW9uIGV4dGVuZHMgSW5zZXJ0T3BlcmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHQpIHtcbiAgICBzdXBlcihuYW1lLCBvcHQpO1xuXG4gICAgdGhpcy5yZWxhdGlvbiA9IG9wdC5yZWxhdGlvbjtcbiAgICB0aGlzLm93bmVyID0gb3B0Lm93bmVyO1xuICB9XG5cbiAgY2FsbChidWlsZGVyLCBhcmdzKSB7XG4gICAgY29uc3QgcmV0VmFsID0gc3VwZXIuY2FsbChidWlsZGVyLCBhcmdzKTtcblxuICAgIHRoaXMucmVsYXRpb24ub21pdEV4dHJhUHJvcHModGhpcy5tb2RlbHMpO1xuXG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIG9uQWZ0ZXJRdWVyeShidWlsZGVyLCBpbnNlcnRlZCkge1xuICAgIGNvbnN0IG1heWJlUHJvbWlzZSA9IHN1cGVyLm9uQWZ0ZXJRdWVyeShidWlsZGVyLCBpbnNlcnRlZCk7XG5cbiAgICBjb25zdCBpc09uZVRvT25lID0gdGhpcy5yZWxhdGlvbi5pc09uZVRvT25lKCk7XG4gICAgY29uc3QgcmVsTmFtZSA9IHRoaXMucmVsYXRpb24ubmFtZTtcbiAgICBjb25zdCBvd25lciA9IHRoaXMub3duZXI7XG5cbiAgICByZXR1cm4gYWZ0ZXIobWF5YmVQcm9taXNlLCBpbnNlcnRlZCA9PiB7XG4gICAgICBsZXQgb3duZXJJZCA9IHRoaXMub3duZXIuJHZhbHVlcyh0aGlzLnJlbGF0aW9uLm93bmVyUHJvcCk7XG4gICAgICBsZXQgam9pbk1vZGVscyA9IHRoaXMucmVsYXRpb24uY3JlYXRlSm9pbk1vZGVscyhvd25lcklkLCBpbnNlcnRlZCk7XG5cbiAgICAgIGlmIChpc09uZVRvT25lKSB7XG4gICAgICAgIG93bmVyW3JlbE5hbWVdID0gaW5zZXJ0ZWRbMF0gfHwgbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG93bmVyW3JlbE5hbWVdID0gdGhpcy5yZWxhdGlvbi5tZXJnZU1vZGVscyhvd25lcltyZWxOYW1lXSwgaW5zZXJ0ZWQpO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnNlcnQgdGhlIGpvaW4gcm93cyB0byB0aGUgam9pbiB0YWJsZS5cbiAgICAgIHJldHVybiB0aGlzLnJlbGF0aW9uLmpvaW5UYWJsZU1vZGVsQ2xhc3MoYnVpbGRlci5rbmV4KCkpXG4gICAgICAgIC5xdWVyeSgpXG4gICAgICAgIC5jaGlsZFF1ZXJ5T2YoYnVpbGRlcilcbiAgICAgICAgLmluc2VydChqb2luTW9kZWxzKVxuICAgICAgICAucmV0dXJuKGluc2VydGVkKTtcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=