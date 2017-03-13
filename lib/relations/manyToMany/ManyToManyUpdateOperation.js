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

var _UpdateOperation2 = require('../../queryBuilder/operations/UpdateOperation');

var _UpdateOperation3 = _interopRequireDefault(_UpdateOperation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManyToManyUpdateOperation = function (_UpdateOperation) {
  (0, _inherits3.default)(ManyToManyUpdateOperation, _UpdateOperation);

  function ManyToManyUpdateOperation(name, opt) {
    (0, _classCallCheck3.default)(this, ManyToManyUpdateOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UpdateOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owner = opt.owner;
    return _this;
  }

  ManyToManyUpdateOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    _UpdateOperation.prototype.onBeforeBuild.call(this, builder);
    this.relation.selectForModify(builder, this.owner).modify(this.relation.modify);
  };

  return ManyToManyUpdateOperation;
}(_UpdateOperation3.default);

exports.default = ManyToManyUpdateOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hbnlUb01hbnlVcGRhdGVPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiTWFueVRvTWFueVVwZGF0ZU9wZXJhdGlvbiIsIm5hbWUiLCJvcHQiLCJyZWxhdGlvbiIsIm93bmVyIiwib25CZWZvcmVCdWlsZCIsImJ1aWxkZXIiLCJzZWxlY3RGb3JNb2RpZnkiLCJtb2RpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSx5Qjs7O0FBRW5CLHFDQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQiw0QkFBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUdyQixVQUFLQyxRQUFMLEdBQWdCRCxJQUFJQyxRQUFwQjtBQUNBLFVBQUtDLEtBQUwsR0FBYUYsSUFBSUUsS0FBakI7QUFKcUI7QUFLdEI7O3NDQUVEQyxhLDBCQUFjQyxPLEVBQVM7QUFDckIsK0JBQU1ELGFBQU4sWUFBb0JDLE9BQXBCO0FBQ0EsU0FBS0gsUUFBTCxDQUFjSSxlQUFkLENBQThCRCxPQUE5QixFQUF1QyxLQUFLRixLQUE1QyxFQUFtREksTUFBbkQsQ0FBMEQsS0FBS0wsUUFBTCxDQUFjSyxNQUF4RTtBQUNELEc7Ozs7O2tCQVprQlIseUIiLCJmaWxlIjoiTWFueVRvTWFueVVwZGF0ZU9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVcGRhdGVPcGVyYXRpb24gZnJvbSAnLi4vLi4vcXVlcnlCdWlsZGVyL29wZXJhdGlvbnMvVXBkYXRlT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFueVRvTWFueVVwZGF0ZU9wZXJhdGlvbiBleHRlbmRzIFVwZGF0ZU9wZXJhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgb3B0KSB7XG4gICAgc3VwZXIobmFtZSwgb3B0KTtcblxuICAgIHRoaXMucmVsYXRpb24gPSBvcHQucmVsYXRpb247XG4gICAgdGhpcy5vd25lciA9IG9wdC5vd25lcjtcbiAgfVxuXG4gIG9uQmVmb3JlQnVpbGQoYnVpbGRlcikge1xuICAgIHN1cGVyLm9uQmVmb3JlQnVpbGQoYnVpbGRlcik7XG4gICAgdGhpcy5yZWxhdGlvbi5zZWxlY3RGb3JNb2RpZnkoYnVpbGRlciwgdGhpcy5vd25lcikubW9kaWZ5KHRoaXMucmVsYXRpb24ubW9kaWZ5KTtcbiAgfVxufVxuIl19