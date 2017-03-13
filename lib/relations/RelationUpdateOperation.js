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

var _UpdateOperation2 = require('../queryBuilder/operations/UpdateOperation');

var _UpdateOperation3 = _interopRequireDefault(_UpdateOperation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RelationUpdateOperation = function (_UpdateOperation) {
  (0, _inherits3.default)(RelationUpdateOperation, _UpdateOperation);

  function RelationUpdateOperation(name, opt) {
    (0, _classCallCheck3.default)(this, RelationUpdateOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UpdateOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owner = opt.owner;
    return _this;
  }

  RelationUpdateOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    _UpdateOperation.prototype.onBeforeBuild.call(this, builder);

    this.relation.findQuery(builder, {
      ownerIds: [this.owner.$values(this.relation.ownerProp)]
    });
  };

  return RelationUpdateOperation;
}(_UpdateOperation3.default);

exports.default = RelationUpdateOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlbGF0aW9uVXBkYXRlT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIlJlbGF0aW9uVXBkYXRlT3BlcmF0aW9uIiwibmFtZSIsIm9wdCIsInJlbGF0aW9uIiwib3duZXIiLCJvbkJlZm9yZUJ1aWxkIiwiYnVpbGRlciIsImZpbmRRdWVyeSIsIm93bmVySWRzIiwiJHZhbHVlcyIsIm93bmVyUHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLHVCOzs7QUFFbkIsbUNBQVlDLElBQVosRUFBa0JDLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsK0RBQ3JCLDRCQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBR3JCLFVBQUtDLFFBQUwsR0FBZ0JELElBQUlDLFFBQXBCO0FBQ0EsVUFBS0MsS0FBTCxHQUFhRixJQUFJRSxLQUFqQjtBQUpxQjtBQUt0Qjs7b0NBRURDLGEsMEJBQWNDLE8sRUFBUztBQUNyQiwrQkFBTUQsYUFBTixZQUFvQkMsT0FBcEI7O0FBRUEsU0FBS0gsUUFBTCxDQUFjSSxTQUFkLENBQXdCRCxPQUF4QixFQUFpQztBQUMvQkUsZ0JBQVUsQ0FBQyxLQUFLSixLQUFMLENBQVdLLE9BQVgsQ0FBbUIsS0FBS04sUUFBTCxDQUFjTyxTQUFqQyxDQUFEO0FBRHFCLEtBQWpDO0FBR0QsRzs7Ozs7a0JBZmtCVix1QiIsImZpbGUiOiJSZWxhdGlvblVwZGF0ZU9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVcGRhdGVPcGVyYXRpb24gZnJvbSAnLi4vcXVlcnlCdWlsZGVyL29wZXJhdGlvbnMvVXBkYXRlT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVsYXRpb25VcGRhdGVPcGVyYXRpb24gZXh0ZW5kcyBVcGRhdGVPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG5cbiAgICB0aGlzLnJlbGF0aW9uID0gb3B0LnJlbGF0aW9uO1xuICAgIHRoaXMub3duZXIgPSBvcHQub3duZXI7XG4gIH1cblxuICBvbkJlZm9yZUJ1aWxkKGJ1aWxkZXIpIHtcbiAgICBzdXBlci5vbkJlZm9yZUJ1aWxkKGJ1aWxkZXIpO1xuXG4gICAgdGhpcy5yZWxhdGlvbi5maW5kUXVlcnkoYnVpbGRlciwge1xuICAgICAgb3duZXJJZHM6IFt0aGlzLm93bmVyLiR2YWx1ZXModGhpcy5yZWxhdGlvbi5vd25lclByb3ApXVxuICAgIH0pO1xuICB9XG59Il19