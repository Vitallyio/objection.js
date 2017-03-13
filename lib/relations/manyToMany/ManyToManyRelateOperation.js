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

var _normalizeIds = require('../../utils/normalizeIds');

var _normalizeIds2 = _interopRequireDefault(_normalizeIds);

var _QueryBuilderOperation = require('../../queryBuilder/operations/QueryBuilderOperation');

var _QueryBuilderOperation2 = _interopRequireDefault(_QueryBuilderOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManyToManyRelateOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(ManyToManyRelateOperation, _QueryBuilderOperatio);

  function ManyToManyRelateOperation(name, opt) {
    (0, _classCallCheck3.default)(this, ManyToManyRelateOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.call(this, name, opt));

    _this.isWriteOperation = true;
    _this.relation = opt.relation;
    _this.owner = opt.owner;
    _this.input = null;
    _this.ids = null;
    return _this;
  }

  ManyToManyRelateOperation.prototype.call = function call(builder, args) {
    this.input = args[0];
    this.ids = (0, _normalizeIds2.default)(args[0], this.relation.relatedProp);
    return true;
  };

  ManyToManyRelateOperation.prototype.queryExecutor = function queryExecutor(builder) {
    var joinModels = this.relation.createJoinModels(this.owner.$values(this.relation.ownerProp), this.ids);

    return this.relation.joinTableModelClass(builder.knex()).query().childQueryOf(builder).insert(joinModels);
  };

  ManyToManyRelateOperation.prototype.onAfterInternal = function onAfterInternal() {
    return this.input;
  };

  return ManyToManyRelateOperation;
}(_QueryBuilderOperation2.default);

exports.default = ManyToManyRelateOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hbnlUb01hbnlSZWxhdGVPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiTWFueVRvTWFueVJlbGF0ZU9wZXJhdGlvbiIsIm5hbWUiLCJvcHQiLCJpc1dyaXRlT3BlcmF0aW9uIiwicmVsYXRpb24iLCJvd25lciIsImlucHV0IiwiaWRzIiwiY2FsbCIsImJ1aWxkZXIiLCJhcmdzIiwicmVsYXRlZFByb3AiLCJxdWVyeUV4ZWN1dG9yIiwiam9pbk1vZGVscyIsImNyZWF0ZUpvaW5Nb2RlbHMiLCIkdmFsdWVzIiwib3duZXJQcm9wIiwiam9pblRhYmxlTW9kZWxDbGFzcyIsImtuZXgiLCJxdWVyeSIsImNoaWxkUXVlcnlPZiIsImluc2VydCIsIm9uQWZ0ZXJJbnRlcm5hbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVxQkEseUI7OztBQUVuQixxQ0FBWUMsSUFBWixFQUFrQkMsR0FBbEIsRUFBdUI7QUFBQTs7QUFBQSwrREFDckIsaUNBQU1ELElBQU4sRUFBWUMsR0FBWixDQURxQjs7QUFHckIsVUFBS0MsZ0JBQUwsR0FBd0IsSUFBeEI7QUFDQSxVQUFLQyxRQUFMLEdBQWdCRixJQUFJRSxRQUFwQjtBQUNBLFVBQUtDLEtBQUwsR0FBYUgsSUFBSUcsS0FBakI7QUFDQSxVQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNBLFVBQUtDLEdBQUwsR0FBVyxJQUFYO0FBUHFCO0FBUXRCOztzQ0FFREMsSSxpQkFBS0MsTyxFQUFTQyxJLEVBQU07QUFDbEIsU0FBS0osS0FBTCxHQUFhSSxLQUFLLENBQUwsQ0FBYjtBQUNBLFNBQUtILEdBQUwsR0FBVyw0QkFBYUcsS0FBSyxDQUFMLENBQWIsRUFBc0IsS0FBS04sUUFBTCxDQUFjTyxXQUFwQyxDQUFYO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsRzs7c0NBRURDLGEsMEJBQWNILE8sRUFBUztBQUNyQixRQUFJSSxhQUFhLEtBQUtULFFBQUwsQ0FBY1UsZ0JBQWQsQ0FBK0IsS0FBS1QsS0FBTCxDQUFXVSxPQUFYLENBQW1CLEtBQUtYLFFBQUwsQ0FBY1ksU0FBakMsQ0FBL0IsRUFBNEUsS0FBS1QsR0FBakYsQ0FBakI7O0FBRUEsV0FBTyxLQUFLSCxRQUFMLENBQWNhLG1CQUFkLENBQWtDUixRQUFRUyxJQUFSLEVBQWxDLEVBQ0pDLEtBREksR0FFSkMsWUFGSSxDQUVTWCxPQUZULEVBR0pZLE1BSEksQ0FHR1IsVUFISCxDQUFQO0FBSUQsRzs7c0NBRURTLGUsOEJBQWtCO0FBQ2hCLFdBQU8sS0FBS2hCLEtBQVo7QUFDRCxHOzs7OztrQkE3QmtCTix5QiIsImZpbGUiOiJNYW55VG9NYW55UmVsYXRlT3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5vcm1hbGl6ZUlkcyBmcm9tICcuLi8uLi91dGlscy9ub3JtYWxpemVJZHMnO1xuaW1wb3J0IFF1ZXJ5QnVpbGRlck9wZXJhdGlvbiBmcm9tICcuLi8uLi9xdWVyeUJ1aWxkZXIvb3BlcmF0aW9ucy9RdWVyeUJ1aWxkZXJPcGVyYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW55VG9NYW55UmVsYXRlT3BlcmF0aW9uIGV4dGVuZHMgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHQpIHtcbiAgICBzdXBlcihuYW1lLCBvcHQpO1xuXG4gICAgdGhpcy5pc1dyaXRlT3BlcmF0aW9uID0gdHJ1ZTtcbiAgICB0aGlzLnJlbGF0aW9uID0gb3B0LnJlbGF0aW9uO1xuICAgIHRoaXMub3duZXIgPSBvcHQub3duZXI7XG4gICAgdGhpcy5pbnB1dCA9IG51bGw7XG4gICAgdGhpcy5pZHMgPSBudWxsO1xuICB9XG5cbiAgY2FsbChidWlsZGVyLCBhcmdzKSB7XG4gICAgdGhpcy5pbnB1dCA9IGFyZ3NbMF07XG4gICAgdGhpcy5pZHMgPSBub3JtYWxpemVJZHMoYXJnc1swXSwgdGhpcy5yZWxhdGlvbi5yZWxhdGVkUHJvcCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBxdWVyeUV4ZWN1dG9yKGJ1aWxkZXIpIHtcbiAgICBsZXQgam9pbk1vZGVscyA9IHRoaXMucmVsYXRpb24uY3JlYXRlSm9pbk1vZGVscyh0aGlzLm93bmVyLiR2YWx1ZXModGhpcy5yZWxhdGlvbi5vd25lclByb3ApLCB0aGlzLmlkcyk7XG5cbiAgICByZXR1cm4gdGhpcy5yZWxhdGlvbi5qb2luVGFibGVNb2RlbENsYXNzKGJ1aWxkZXIua25leCgpKVxuICAgICAgLnF1ZXJ5KClcbiAgICAgIC5jaGlsZFF1ZXJ5T2YoYnVpbGRlcilcbiAgICAgIC5pbnNlcnQoam9pbk1vZGVscyk7XG4gIH1cblxuICBvbkFmdGVySW50ZXJuYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQ7XG4gIH1cbn1cbiJdfQ==