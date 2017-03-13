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

var BelongsToOneInsertOperation = function (_InsertOperation) {
  (0, _inherits3.default)(BelongsToOneInsertOperation, _InsertOperation);

  function BelongsToOneInsertOperation(name, opt) {
    (0, _classCallCheck3.default)(this, BelongsToOneInsertOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _InsertOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owner = opt.owner;
    return _this;
  }

  BelongsToOneInsertOperation.prototype.call = function call(builder, args) {
    var retVal = _InsertOperation.prototype.call.call(this, builder, args);

    if (this.models.length > 1) {
      this.relation.throwError('can only insert one model to a BelongsToOneRelation');
    }

    return retVal;
  };

  BelongsToOneInsertOperation.prototype.onAfterQuery = function onAfterQuery(builder, inserted) {
    var _this2 = this;

    var maybePromise = _InsertOperation.prototype.onAfterQuery.call(this, builder, inserted);

    return (0, _promiseUtils.after)(maybePromise, function (inserted) {
      _this2.owner[_this2.relation.name] = inserted[0] || null;
      var patch = {};

      for (var i = 0, l = _this2.relation.ownerProp.length; i < l; ++i) {
        var ownerProp = _this2.relation.ownerProp[i];
        var relatedProp = _this2.relation.relatedProp[i];
        var relatedValue = inserted[0][relatedProp];

        _this2.owner[ownerProp] = inserted[0][relatedProp];
        patch[ownerProp] = relatedValue;
      }

      return _this2.relation.ownerModelClass.query().childQueryOf(builder).patch(patch).whereComposite(_this2.relation.ownerModelClass.getFullIdColumn(), _this2.owner.$id()).return(inserted);
    });
  };

  return BelongsToOneInsertOperation;
}(_InsertOperation3.default);

exports.default = BelongsToOneInsertOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJlbG9uZ3NUb09uZUluc2VydE9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJCZWxvbmdzVG9PbmVJbnNlcnRPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwicmVsYXRpb24iLCJvd25lciIsImNhbGwiLCJidWlsZGVyIiwiYXJncyIsInJldFZhbCIsIm1vZGVscyIsImxlbmd0aCIsInRocm93RXJyb3IiLCJvbkFmdGVyUXVlcnkiLCJpbnNlcnRlZCIsIm1heWJlUHJvbWlzZSIsInBhdGNoIiwiaSIsImwiLCJvd25lclByb3AiLCJyZWxhdGVkUHJvcCIsInJlbGF0ZWRWYWx1ZSIsIm93bmVyTW9kZWxDbGFzcyIsInF1ZXJ5IiwiY2hpbGRRdWVyeU9mIiwid2hlcmVDb21wb3NpdGUiLCJnZXRGdWxsSWRDb2x1bW4iLCIkaWQiLCJyZXR1cm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0lBRXFCQSwyQjs7O0FBRW5CLHVDQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQiw0QkFBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUdyQixVQUFLQyxRQUFMLEdBQWdCRCxJQUFJQyxRQUFwQjtBQUNBLFVBQUtDLEtBQUwsR0FBYUYsSUFBSUUsS0FBakI7QUFKcUI7QUFLdEI7O3dDQUVEQyxJLGlCQUFLQyxPLEVBQVNDLEksRUFBTTtBQUNsQixRQUFNQyxTQUFTLDJCQUFNSCxJQUFOLFlBQVdDLE9BQVgsRUFBb0JDLElBQXBCLENBQWY7O0FBRUEsUUFBSSxLQUFLRSxNQUFMLENBQVlDLE1BQVosR0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsV0FBS1AsUUFBTCxDQUFjUSxVQUFkLENBQXlCLHFEQUF6QjtBQUNEOztBQUVELFdBQU9ILE1BQVA7QUFDRCxHOzt3Q0FFREksWSx5QkFBYU4sTyxFQUFTTyxRLEVBQVU7QUFBQTs7QUFDOUIsUUFBTUMsZUFBZSwyQkFBTUYsWUFBTixZQUFtQk4sT0FBbkIsRUFBNEJPLFFBQTVCLENBQXJCOztBQUVBLFdBQU8seUJBQU1DLFlBQU4sRUFBb0Isb0JBQVk7QUFDckMsYUFBS1YsS0FBTCxDQUFXLE9BQUtELFFBQUwsQ0FBY0YsSUFBekIsSUFBaUNZLFNBQVMsQ0FBVCxLQUFlLElBQWhEO0FBQ0EsVUFBSUUsUUFBUSxFQUFaOztBQUVBLFdBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLElBQUksT0FBS2QsUUFBTCxDQUFjZSxTQUFkLENBQXdCUixNQUE1QyxFQUFvRE0sSUFBSUMsQ0FBeEQsRUFBMkQsRUFBRUQsQ0FBN0QsRUFBZ0U7QUFDOUQsWUFBTUUsWUFBWSxPQUFLZixRQUFMLENBQWNlLFNBQWQsQ0FBd0JGLENBQXhCLENBQWxCO0FBQ0EsWUFBTUcsY0FBYyxPQUFLaEIsUUFBTCxDQUFjZ0IsV0FBZCxDQUEwQkgsQ0FBMUIsQ0FBcEI7QUFDQSxZQUFNSSxlQUFlUCxTQUFTLENBQVQsRUFBWU0sV0FBWixDQUFyQjs7QUFFQSxlQUFLZixLQUFMLENBQVdjLFNBQVgsSUFBd0JMLFNBQVMsQ0FBVCxFQUFZTSxXQUFaLENBQXhCO0FBQ0FKLGNBQU1HLFNBQU4sSUFBbUJFLFlBQW5CO0FBQ0Q7O0FBRUQsYUFBTyxPQUFLakIsUUFBTCxDQUFja0IsZUFBZCxDQUNKQyxLQURJLEdBRUpDLFlBRkksQ0FFU2pCLE9BRlQsRUFHSlMsS0FISSxDQUdFQSxLQUhGLEVBSUpTLGNBSkksQ0FJVyxPQUFLckIsUUFBTCxDQUFja0IsZUFBZCxDQUE4QkksZUFBOUIsRUFKWCxFQUk0RCxPQUFLckIsS0FBTCxDQUFXc0IsR0FBWCxFQUo1RCxFQUtKQyxNQUxJLENBS0dkLFFBTEgsQ0FBUDtBQU1ELEtBbkJNLENBQVA7QUFxQkQsRzs7Ozs7a0JBM0NrQmIsMkIiLCJmaWxlIjoiQmVsb25nc1RvT25lSW5zZXJ0T3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEluc2VydE9wZXJhdGlvbiBmcm9tICcuLi8uLi9xdWVyeUJ1aWxkZXIvb3BlcmF0aW9ucy9JbnNlcnRPcGVyYXRpb24nO1xuaW1wb3J0IHthZnRlcn0gZnJvbSAnLi4vLi4vdXRpbHMvcHJvbWlzZVV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVsb25nc1RvT25lSW5zZXJ0T3BlcmF0aW9uIGV4dGVuZHMgSW5zZXJ0T3BlcmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHQpIHtcbiAgICBzdXBlcihuYW1lLCBvcHQpO1xuXG4gICAgdGhpcy5yZWxhdGlvbiA9IG9wdC5yZWxhdGlvbjtcbiAgICB0aGlzLm93bmVyID0gb3B0Lm93bmVyO1xuICB9XG5cbiAgY2FsbChidWlsZGVyLCBhcmdzKSB7XG4gICAgY29uc3QgcmV0VmFsID0gc3VwZXIuY2FsbChidWlsZGVyLCBhcmdzKTtcblxuICAgIGlmICh0aGlzLm1vZGVscy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLnJlbGF0aW9uLnRocm93RXJyb3IoJ2NhbiBvbmx5IGluc2VydCBvbmUgbW9kZWwgdG8gYSBCZWxvbmdzVG9PbmVSZWxhdGlvbicpO1xuICAgIH1cblxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBvbkFmdGVyUXVlcnkoYnVpbGRlciwgaW5zZXJ0ZWQpIHtcbiAgICBjb25zdCBtYXliZVByb21pc2UgPSBzdXBlci5vbkFmdGVyUXVlcnkoYnVpbGRlciwgaW5zZXJ0ZWQpO1xuXG4gICAgcmV0dXJuIGFmdGVyKG1heWJlUHJvbWlzZSwgaW5zZXJ0ZWQgPT4ge1xuICAgICAgdGhpcy5vd25lclt0aGlzLnJlbGF0aW9uLm5hbWVdID0gaW5zZXJ0ZWRbMF0gfHwgbnVsbDtcbiAgICAgIGxldCBwYXRjaCA9IHt9O1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMucmVsYXRpb24ub3duZXJQcm9wLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICBjb25zdCBvd25lclByb3AgPSB0aGlzLnJlbGF0aW9uLm93bmVyUHJvcFtpXTtcbiAgICAgICAgY29uc3QgcmVsYXRlZFByb3AgPSB0aGlzLnJlbGF0aW9uLnJlbGF0ZWRQcm9wW2ldO1xuICAgICAgICBjb25zdCByZWxhdGVkVmFsdWUgPSBpbnNlcnRlZFswXVtyZWxhdGVkUHJvcF07XG5cbiAgICAgICAgdGhpcy5vd25lcltvd25lclByb3BdID0gaW5zZXJ0ZWRbMF1bcmVsYXRlZFByb3BdO1xuICAgICAgICBwYXRjaFtvd25lclByb3BdID0gcmVsYXRlZFZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZWxhdGlvbi5vd25lck1vZGVsQ2xhc3NcbiAgICAgICAgLnF1ZXJ5KClcbiAgICAgICAgLmNoaWxkUXVlcnlPZihidWlsZGVyKVxuICAgICAgICAucGF0Y2gocGF0Y2gpXG4gICAgICAgIC53aGVyZUNvbXBvc2l0ZSh0aGlzLnJlbGF0aW9uLm93bmVyTW9kZWxDbGFzcy5nZXRGdWxsSWRDb2x1bW4oKSwgdGhpcy5vd25lci4kaWQoKSlcbiAgICAgICAgLnJldHVybihpbnNlcnRlZCk7XG4gICAgfSk7XG5cbiAgfVxuXG59XG4iXX0=