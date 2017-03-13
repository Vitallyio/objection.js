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

var _DeleteOperation2 = require('../queryBuilder/operations/DeleteOperation');

var _DeleteOperation3 = _interopRequireDefault(_DeleteOperation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RelationDeleteOperation = function (_DeleteOperation) {
  (0, _inherits3.default)(RelationDeleteOperation, _DeleteOperation);

  function RelationDeleteOperation(name, opt) {
    (0, _classCallCheck3.default)(this, RelationDeleteOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _DeleteOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owner = opt.owner;
    return _this;
  }

  RelationDeleteOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    _DeleteOperation.prototype.onBeforeBuild.call(this, builder);

    this.relation.findQuery(builder, {
      ownerIds: [this.owner.$values(this.relation.ownerProp)]
    });
  };

  return RelationDeleteOperation;
}(_DeleteOperation3.default);

exports.default = RelationDeleteOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlbGF0aW9uRGVsZXRlT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIlJlbGF0aW9uRGVsZXRlT3BlcmF0aW9uIiwibmFtZSIsIm9wdCIsInJlbGF0aW9uIiwib3duZXIiLCJvbkJlZm9yZUJ1aWxkIiwiYnVpbGRlciIsImZpbmRRdWVyeSIsIm93bmVySWRzIiwiJHZhbHVlcyIsIm93bmVyUHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLHVCOzs7QUFFbkIsbUNBQVlDLElBQVosRUFBa0JDLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsK0RBQ3JCLDRCQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBR3JCLFVBQUtDLFFBQUwsR0FBZ0JELElBQUlDLFFBQXBCO0FBQ0EsVUFBS0MsS0FBTCxHQUFhRixJQUFJRSxLQUFqQjtBQUpxQjtBQUt0Qjs7b0NBRURDLGEsMEJBQWNDLE8sRUFBUztBQUNyQiwrQkFBTUQsYUFBTixZQUFvQkMsT0FBcEI7O0FBRUEsU0FBS0gsUUFBTCxDQUFjSSxTQUFkLENBQXdCRCxPQUF4QixFQUFpQztBQUMvQkUsZ0JBQVUsQ0FBQyxLQUFLSixLQUFMLENBQVdLLE9BQVgsQ0FBbUIsS0FBS04sUUFBTCxDQUFjTyxTQUFqQyxDQUFEO0FBRHFCLEtBQWpDO0FBR0QsRzs7Ozs7a0JBZmtCVix1QiIsImZpbGUiOiJSZWxhdGlvbkRlbGV0ZU9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWxldGVPcGVyYXRpb24gZnJvbSAnLi4vcXVlcnlCdWlsZGVyL29wZXJhdGlvbnMvRGVsZXRlT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVsYXRpb25EZWxldGVPcGVyYXRpb24gZXh0ZW5kcyBEZWxldGVPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG5cbiAgICB0aGlzLnJlbGF0aW9uID0gb3B0LnJlbGF0aW9uO1xuICAgIHRoaXMub3duZXIgPSBvcHQub3duZXI7XG4gIH1cblxuICBvbkJlZm9yZUJ1aWxkKGJ1aWxkZXIpIHtcbiAgICBzdXBlci5vbkJlZm9yZUJ1aWxkKGJ1aWxkZXIpO1xuXG4gICAgdGhpcy5yZWxhdGlvbi5maW5kUXVlcnkoYnVpbGRlciwge1xuICAgICAgb3duZXJJZHM6IFt0aGlzLm93bmVyLiR2YWx1ZXModGhpcy5yZWxhdGlvbi5vd25lclByb3ApXVxuICAgIH0pO1xuICB9XG59Il19