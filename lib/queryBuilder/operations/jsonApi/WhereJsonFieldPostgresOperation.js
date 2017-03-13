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

var _postgresJsonApi = require('./postgresJsonApi');

var _postgresJsonApi2 = _interopRequireDefault(_postgresJsonApi);

var _WrappingQueryBuilderOperation = require('../WrappingQueryBuilderOperation');

var _WrappingQueryBuilderOperation2 = _interopRequireDefault(_WrappingQueryBuilderOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WhereJsonFieldPostgresOperation = function (_WrappingQueryBuilder) {
  (0, _inherits3.default)(WhereJsonFieldPostgresOperation, _WrappingQueryBuilder);

  function WhereJsonFieldPostgresOperation(builder, name, opt) {
    (0, _classCallCheck3.default)(this, WhereJsonFieldPostgresOperation);

    /**
     * @type {string}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, _WrappingQueryBuilder.call(this, builder, name, opt));

    _this.sql = null;
    return _this;
  }

  WhereJsonFieldPostgresOperation.prototype.call = function call(builder, args) {
    _WrappingQueryBuilder.prototype.call.call(this, builder, args);

    this.sql = _postgresJsonApi2.default.whereJsonFieldQuery(builder.knex(), this.args[0], this.args[1], this.args[2]);

    return true;
  };

  WhereJsonFieldPostgresOperation.prototype.onBuild = function onBuild(knexBuilder) {
    if (this.opt.bool === 'or') {
      knexBuilder.orWhereRaw(this.sql);
    } else {
      knexBuilder.whereRaw(this.sql);
    }
  };

  return WhereJsonFieldPostgresOperation;
}(_WrappingQueryBuilderOperation2.default);

exports.default = WhereJsonFieldPostgresOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldoZXJlSnNvbkZpZWxkUG9zdGdyZXNPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiV2hlcmVKc29uRmllbGRQb3N0Z3Jlc09wZXJhdGlvbiIsImJ1aWxkZXIiLCJuYW1lIiwib3B0Iiwic3FsIiwiY2FsbCIsImFyZ3MiLCJ3aGVyZUpzb25GaWVsZFF1ZXJ5Iiwia25leCIsIm9uQnVpbGQiLCJrbmV4QnVpbGRlciIsImJvb2wiLCJvcldoZXJlUmF3Iiwid2hlcmVSYXciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLCtCOzs7QUFFbkIsMkNBQVlDLE9BQVosRUFBcUJDLElBQXJCLEVBQTJCQyxHQUEzQixFQUFnQztBQUFBOztBQUU5Qjs7O0FBRjhCLCtEQUM5QixpQ0FBTUYsT0FBTixFQUFlQyxJQUFmLEVBQXFCQyxHQUFyQixDQUQ4Qjs7QUFLOUIsVUFBS0MsR0FBTCxHQUFXLElBQVg7QUFMOEI7QUFNL0I7OzRDQUVEQyxJLGlCQUFLSixPLEVBQVNLLEksRUFBTTtBQUNsQixvQ0FBTUQsSUFBTixZQUFXSixPQUFYLEVBQW9CSyxJQUFwQjs7QUFFQSxTQUFLRixHQUFMLEdBQVcsMEJBQVFHLG1CQUFSLENBQTRCTixRQUFRTyxJQUFSLEVBQTVCLEVBQTRDLEtBQUtGLElBQUwsQ0FBVSxDQUFWLENBQTVDLEVBQTBELEtBQUtBLElBQUwsQ0FBVSxDQUFWLENBQTFELEVBQXdFLEtBQUtBLElBQUwsQ0FBVSxDQUFWLENBQXhFLENBQVg7O0FBRUEsV0FBTyxJQUFQO0FBQ0QsRzs7NENBRURHLE8sb0JBQVFDLFcsRUFBYTtBQUNuQixRQUFJLEtBQUtQLEdBQUwsQ0FBU1EsSUFBVCxLQUFrQixJQUF0QixFQUE0QjtBQUMxQkQsa0JBQVlFLFVBQVosQ0FBdUIsS0FBS1IsR0FBNUI7QUFDRCxLQUZELE1BRU87QUFDTE0sa0JBQVlHLFFBQVosQ0FBcUIsS0FBS1QsR0FBMUI7QUFDRDtBQUNGLEc7Ozs7O2tCQXhCa0JKLCtCIiwiZmlsZSI6IldoZXJlSnNvbkZpZWxkUG9zdGdyZXNPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQganNvbkFwaSBmcm9tICcuL3Bvc3RncmVzSnNvbkFwaSc7XG5pbXBvcnQgV3JhcHBpbmdRdWVyeUJ1aWxkZXJPcGVyYXRpb24gZnJvbSAnLi4vV3JhcHBpbmdRdWVyeUJ1aWxkZXJPcGVyYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaGVyZUpzb25GaWVsZFBvc3RncmVzT3BlcmF0aW9uIGV4dGVuZHMgV3JhcHBpbmdRdWVyeUJ1aWxkZXJPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKGJ1aWxkZXIsIG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKGJ1aWxkZXIsIG5hbWUsIG9wdCk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnNxbCA9IG51bGw7XG4gIH1cblxuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICBzdXBlci5jYWxsKGJ1aWxkZXIsIGFyZ3MpO1xuXG4gICAgdGhpcy5zcWwgPSBqc29uQXBpLndoZXJlSnNvbkZpZWxkUXVlcnkoYnVpbGRlci5rbmV4KCksIHRoaXMuYXJnc1swXSwgdGhpcy5hcmdzWzFdLCB0aGlzLmFyZ3NbMl0pO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBvbkJ1aWxkKGtuZXhCdWlsZGVyKSB7XG4gICAgaWYgKHRoaXMub3B0LmJvb2wgPT09ICdvcicpIHtcbiAgICAgIGtuZXhCdWlsZGVyLm9yV2hlcmVSYXcodGhpcy5zcWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrbmV4QnVpbGRlci53aGVyZVJhdyh0aGlzLnNxbCk7XG4gICAgfVxuICB9XG59XG4iXX0=