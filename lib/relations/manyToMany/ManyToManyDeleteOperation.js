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

var _DeleteOperation2 = require('../../queryBuilder/operations/DeleteOperation');

var _DeleteOperation3 = _interopRequireDefault(_DeleteOperation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManyToManyDeleteOperation = function (_DeleteOperation) {
  (0, _inherits3.default)(ManyToManyDeleteOperation, _DeleteOperation);

  function ManyToManyDeleteOperation(name, opt) {
    (0, _classCallCheck3.default)(this, ManyToManyDeleteOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _DeleteOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owner = opt.owner;
    return _this;
  }

  ManyToManyDeleteOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    _DeleteOperation.prototype.onBeforeBuild.call(this, builder);
    this.relation.selectForModify(builder, this.owner).modify(this.relation.modify);
  };

  return ManyToManyDeleteOperation;
}(_DeleteOperation3.default);

exports.default = ManyToManyDeleteOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hbnlUb01hbnlEZWxldGVPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiTWFueVRvTWFueURlbGV0ZU9wZXJhdGlvbiIsIm5hbWUiLCJvcHQiLCJyZWxhdGlvbiIsIm93bmVyIiwib25CZWZvcmVCdWlsZCIsImJ1aWxkZXIiLCJzZWxlY3RGb3JNb2RpZnkiLCJtb2RpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSx5Qjs7O0FBRW5CLHFDQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQiw0QkFBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUdyQixVQUFLQyxRQUFMLEdBQWdCRCxJQUFJQyxRQUFwQjtBQUNBLFVBQUtDLEtBQUwsR0FBYUYsSUFBSUUsS0FBakI7QUFKcUI7QUFLdEI7O3NDQUVEQyxhLDBCQUFjQyxPLEVBQVM7QUFDckIsK0JBQU1ELGFBQU4sWUFBb0JDLE9BQXBCO0FBQ0EsU0FBS0gsUUFBTCxDQUFjSSxlQUFkLENBQThCRCxPQUE5QixFQUF1QyxLQUFLRixLQUE1QyxFQUFtREksTUFBbkQsQ0FBMEQsS0FBS0wsUUFBTCxDQUFjSyxNQUF4RTtBQUNELEc7Ozs7O2tCQVprQlIseUIiLCJmaWxlIjoiTWFueVRvTWFueURlbGV0ZU9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWxldGVPcGVyYXRpb24gZnJvbSAnLi4vLi4vcXVlcnlCdWlsZGVyL29wZXJhdGlvbnMvRGVsZXRlT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFueVRvTWFueURlbGV0ZU9wZXJhdGlvbiBleHRlbmRzIERlbGV0ZU9wZXJhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgb3B0KSB7XG4gICAgc3VwZXIobmFtZSwgb3B0KTtcblxuICAgIHRoaXMucmVsYXRpb24gPSBvcHQucmVsYXRpb247XG4gICAgdGhpcy5vd25lciA9IG9wdC5vd25lcjtcbiAgfVxuXG4gIG9uQmVmb3JlQnVpbGQoYnVpbGRlcikge1xuICAgIHN1cGVyLm9uQmVmb3JlQnVpbGQoYnVpbGRlcik7XG4gICAgdGhpcy5yZWxhdGlvbi5zZWxlY3RGb3JNb2RpZnkoYnVpbGRlciwgdGhpcy5vd25lcikubW9kaWZ5KHRoaXMucmVsYXRpb24ubW9kaWZ5KTtcbiAgfVxufVxuIl19