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

var WhereJsonPostgresOperation = function (_WrappingQueryBuilder) {
  (0, _inherits3.default)(WhereJsonPostgresOperation, _WrappingQueryBuilder);

  function WhereJsonPostgresOperation(builder, name, opt) {
    (0, _classCallCheck3.default)(this, WhereJsonPostgresOperation);

    /**
     * @type {Array.<string>}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, _WrappingQueryBuilder.call(this, builder, name, opt));

    _this.rawArgs = null;
    return _this;
  }

  WhereJsonPostgresOperation.prototype.call = function call(builder, args) {
    _WrappingQueryBuilder.prototype.call.call(this, builder, args);

    this.rawArgs = _postgresJsonApi2.default.whereJsonbRefOnLeftJsonbValOrRefOnRightRawQueryParams(this.args[0], this.opt.operator, this.args[1], this.opt.prefix);

    return true;
  };

  WhereJsonPostgresOperation.prototype.onBuild = function onBuild(knexBuilder) {
    if (this.opt.bool === 'or') {
      knexBuilder.orWhereRaw.apply(knexBuilder, this.rawArgs);
    } else {
      knexBuilder.whereRaw.apply(knexBuilder, this.rawArgs);
    }
  };

  return WhereJsonPostgresOperation;
}(_WrappingQueryBuilderOperation2.default);

exports.default = WhereJsonPostgresOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldoZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIldoZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uIiwiYnVpbGRlciIsIm5hbWUiLCJvcHQiLCJyYXdBcmdzIiwiY2FsbCIsImFyZ3MiLCJ3aGVyZUpzb25iUmVmT25MZWZ0SnNvbmJWYWxPclJlZk9uUmlnaHRSYXdRdWVyeVBhcmFtcyIsIm9wZXJhdG9yIiwicHJlZml4Iiwib25CdWlsZCIsImtuZXhCdWlsZGVyIiwiYm9vbCIsIm9yV2hlcmVSYXciLCJhcHBseSIsIndoZXJlUmF3Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSwwQjs7O0FBRW5CLHNDQUFZQyxPQUFaLEVBQXFCQyxJQUFyQixFQUEyQkMsR0FBM0IsRUFBZ0M7QUFBQTs7QUFFOUI7OztBQUY4QiwrREFDOUIsaUNBQU1GLE9BQU4sRUFBZUMsSUFBZixFQUFxQkMsR0FBckIsQ0FEOEI7O0FBSzlCLFVBQUtDLE9BQUwsR0FBZSxJQUFmO0FBTDhCO0FBTS9COzt1Q0FFREMsSSxpQkFBS0osTyxFQUFTSyxJLEVBQU07QUFDbEIsb0NBQU1ELElBQU4sWUFBV0osT0FBWCxFQUFvQkssSUFBcEI7O0FBRUEsU0FBS0YsT0FBTCxHQUFlLDBCQUFRRyxxREFBUixDQUNiLEtBQUtELElBQUwsQ0FBVSxDQUFWLENBRGEsRUFFYixLQUFLSCxHQUFMLENBQVNLLFFBRkksRUFHYixLQUFLRixJQUFMLENBQVUsQ0FBVixDQUhhLEVBSWIsS0FBS0gsR0FBTCxDQUFTTSxNQUpJLENBQWY7O0FBTUEsV0FBTyxJQUFQO0FBQ0QsRzs7dUNBRURDLE8sb0JBQVFDLFcsRUFBYTtBQUNuQixRQUFJLEtBQUtSLEdBQUwsQ0FBU1MsSUFBVCxLQUFrQixJQUF0QixFQUE0QjtBQUMxQkQsa0JBQVlFLFVBQVosQ0FBdUJDLEtBQXZCLENBQTZCSCxXQUE3QixFQUEwQyxLQUFLUCxPQUEvQztBQUNELEtBRkQsTUFFTztBQUNMTyxrQkFBWUksUUFBWixDQUFxQkQsS0FBckIsQ0FBMkJILFdBQTNCLEVBQXdDLEtBQUtQLE9BQTdDO0FBQ0Q7QUFDRixHOzs7OztrQkE1QmtCSiwwQiIsImZpbGUiOiJXaGVyZUpzb25Qb3N0Z3Jlc09wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqc29uQXBpIGZyb20gJy4vcG9zdGdyZXNKc29uQXBpJztcbmltcG9ydCBXcmFwcGluZ1F1ZXJ5QnVpbGRlck9wZXJhdGlvbiBmcm9tICcuLi9XcmFwcGluZ1F1ZXJ5QnVpbGRlck9wZXJhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdoZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uIGV4dGVuZHMgV3JhcHBpbmdRdWVyeUJ1aWxkZXJPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKGJ1aWxkZXIsIG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKGJ1aWxkZXIsIG5hbWUsIG9wdCk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fVxuICAgICAqL1xuICAgIHRoaXMucmF3QXJncyA9IG51bGw7XG4gIH1cblxuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICBzdXBlci5jYWxsKGJ1aWxkZXIsIGFyZ3MpO1xuXG4gICAgdGhpcy5yYXdBcmdzID0ganNvbkFwaS53aGVyZUpzb25iUmVmT25MZWZ0SnNvbmJWYWxPclJlZk9uUmlnaHRSYXdRdWVyeVBhcmFtcyhcbiAgICAgIHRoaXMuYXJnc1swXSxcbiAgICAgIHRoaXMub3B0Lm9wZXJhdG9yLFxuICAgICAgdGhpcy5hcmdzWzFdLFxuICAgICAgdGhpcy5vcHQucHJlZml4KTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgb25CdWlsZChrbmV4QnVpbGRlcikge1xuICAgIGlmICh0aGlzLm9wdC5ib29sID09PSAnb3InKSB7XG4gICAgICBrbmV4QnVpbGRlci5vcldoZXJlUmF3LmFwcGx5KGtuZXhCdWlsZGVyLCB0aGlzLnJhd0FyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrbmV4QnVpbGRlci53aGVyZVJhdy5hcHBseShrbmV4QnVpbGRlciwgdGhpcy5yYXdBcmdzKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==