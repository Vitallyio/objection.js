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

var _QueryBuilderContextBase = require('./QueryBuilderContextBase');

var _QueryBuilderContextBase2 = _interopRequireDefault(_QueryBuilderContextBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryBuilderContext = function (_QueryBuilderContextB) {
  (0, _inherits3.default)(QueryBuilderContext, _QueryBuilderContextB);

  function QueryBuilderContext(userContext) {
    (0, _classCallCheck3.default)(this, QueryBuilderContext);

    var _this = (0, _possibleConstructorReturn3.default)(this, _QueryBuilderContextB.call(this, userContext));

    _this.runBefore = [];
    _this.runAfter = [];
    _this.onBuild = [];
    return _this;
  }

  QueryBuilderContext.prototype.clone = function clone() {
    var ctx = _QueryBuilderContextB.prototype.clone.call(this);

    ctx.runBefore = this.runBefore.slice();
    ctx.runAfter = this.runAfter.slice();
    ctx.onBuild = this.onBuild.slice();

    return ctx;
  };

  return QueryBuilderContext;
}(_QueryBuilderContextBase2.default);

exports.default = QueryBuilderContext;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlF1ZXJ5QnVpbGRlckNvbnRleHQuanMiXSwibmFtZXMiOlsiUXVlcnlCdWlsZGVyQ29udGV4dCIsInVzZXJDb250ZXh0IiwicnVuQmVmb3JlIiwicnVuQWZ0ZXIiLCJvbkJ1aWxkIiwiY2xvbmUiLCJjdHgiLCJzbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLG1COzs7QUFFbkIsK0JBQVlDLFdBQVosRUFBeUI7QUFBQTs7QUFBQSwrREFDdkIsaUNBQU1BLFdBQU4sQ0FEdUI7O0FBR3ZCLFVBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxVQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsVUFBS0MsT0FBTCxHQUFlLEVBQWY7QUFMdUI7QUFNeEI7O2dDQUVEQyxLLG9CQUFRO0FBQ04sUUFBSUMsTUFBTSxnQ0FBTUQsS0FBTixXQUFWOztBQUVBQyxRQUFJSixTQUFKLEdBQWdCLEtBQUtBLFNBQUwsQ0FBZUssS0FBZixFQUFoQjtBQUNBRCxRQUFJSCxRQUFKLEdBQWUsS0FBS0EsUUFBTCxDQUFjSSxLQUFkLEVBQWY7QUFDQUQsUUFBSUYsT0FBSixHQUFjLEtBQUtBLE9BQUwsQ0FBYUcsS0FBYixFQUFkOztBQUVBLFdBQU9ELEdBQVA7QUFDRCxHOzs7OztrQkFsQmtCTixtQiIsImZpbGUiOiJRdWVyeUJ1aWxkZXJDb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFF1ZXJ5QnVpbGRlckNvbnRleHRCYXNlIGZyb20gJy4vUXVlcnlCdWlsZGVyQ29udGV4dEJhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWVyeUJ1aWxkZXJDb250ZXh0IGV4dGVuZHMgUXVlcnlCdWlsZGVyQ29udGV4dEJhc2Uge1xuXG4gIGNvbnN0cnVjdG9yKHVzZXJDb250ZXh0KSB7XG4gICAgc3VwZXIodXNlckNvbnRleHQpO1xuXG4gICAgdGhpcy5ydW5CZWZvcmUgPSBbXTtcbiAgICB0aGlzLnJ1bkFmdGVyID0gW107XG4gICAgdGhpcy5vbkJ1aWxkID0gW107XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICBsZXQgY3R4ID0gc3VwZXIuY2xvbmUoKTtcblxuICAgIGN0eC5ydW5CZWZvcmUgPSB0aGlzLnJ1bkJlZm9yZS5zbGljZSgpO1xuICAgIGN0eC5ydW5BZnRlciA9IHRoaXMucnVuQWZ0ZXIuc2xpY2UoKTtcbiAgICBjdHgub25CdWlsZCA9IHRoaXMub25CdWlsZC5zbGljZSgpO1xuXG4gICAgcmV0dXJuIGN0eDtcbiAgfVxufSJdfQ==