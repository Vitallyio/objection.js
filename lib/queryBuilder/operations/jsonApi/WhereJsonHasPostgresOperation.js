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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _postgresJsonApi = require('./postgresJsonApi');

var _postgresJsonApi2 = _interopRequireDefault(_postgresJsonApi);

var _WrappingQueryBuilderOperation = require('../WrappingQueryBuilderOperation');

var _WrappingQueryBuilderOperation2 = _interopRequireDefault(_WrappingQueryBuilderOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WhereJsonHasPostgresOperation = function (_WrappingQueryBuilder) {
  (0, _inherits3.default)(WhereJsonHasPostgresOperation, _WrappingQueryBuilder);

  function WhereJsonHasPostgresOperation(builder, name, opt) {
    (0, _classCallCheck3.default)(this, WhereJsonHasPostgresOperation);

    /**
     * @type {string}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, _WrappingQueryBuilder.call(this, builder, name, opt));

    _this.sql = null;
    return _this;
  }

  WhereJsonHasPostgresOperation.prototype.call = function call(builder, args) {
    _WrappingQueryBuilder.prototype.call.call(this, builder, args);

    this.sql = _postgresJsonApi2.default.whereJsonFieldRightStringArrayOnLeftQuery(builder, this.args[0], this.opt.operator, this.args[1]);

    return true;
  };

  WhereJsonHasPostgresOperation.prototype.onBuild = function onBuild(knexBuilder) {
    if (this.opt.bool === 'or') {
      knexBuilder.orWhereRaw(this.sql);
    } else {
      knexBuilder.whereRaw(this.sql);
    }
  };

  return WhereJsonHasPostgresOperation;
}(_WrappingQueryBuilderOperation2.default);

exports.default = WhereJsonHasPostgresOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldoZXJlSnNvbkhhc1Bvc3RncmVzT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIldoZXJlSnNvbkhhc1Bvc3RncmVzT3BlcmF0aW9uIiwiYnVpbGRlciIsIm5hbWUiLCJvcHQiLCJzcWwiLCJjYWxsIiwiYXJncyIsIndoZXJlSnNvbkZpZWxkUmlnaHRTdHJpbmdBcnJheU9uTGVmdFF1ZXJ5Iiwib3BlcmF0b3IiLCJvbkJ1aWxkIiwia25leEJ1aWxkZXIiLCJib29sIiwib3JXaGVyZVJhdyIsIndoZXJlUmF3Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLDZCOzs7QUFFbkIseUNBQVlDLE9BQVosRUFBcUJDLElBQXJCLEVBQTJCQyxHQUEzQixFQUFnQztBQUFBOztBQUU5Qjs7O0FBRjhCLCtEQUM5QixpQ0FBTUYsT0FBTixFQUFlQyxJQUFmLEVBQXFCQyxHQUFyQixDQUQ4Qjs7QUFLOUIsVUFBS0MsR0FBTCxHQUFXLElBQVg7QUFMOEI7QUFNL0I7OzBDQUVEQyxJLGlCQUFLSixPLEVBQVNLLEksRUFBTTtBQUNsQixvQ0FBTUQsSUFBTixZQUFXSixPQUFYLEVBQW9CSyxJQUFwQjs7QUFFQSxTQUFLRixHQUFMLEdBQVcsMEJBQVFHLHlDQUFSLENBQWtETixPQUFsRCxFQUEyRCxLQUFLSyxJQUFMLENBQVUsQ0FBVixDQUEzRCxFQUF5RSxLQUFLSCxHQUFMLENBQVNLLFFBQWxGLEVBQTRGLEtBQUtGLElBQUwsQ0FBVSxDQUFWLENBQTVGLENBQVg7O0FBRUEsV0FBTyxJQUFQO0FBQ0QsRzs7MENBRURHLE8sb0JBQVFDLFcsRUFBYTtBQUNuQixRQUFJLEtBQUtQLEdBQUwsQ0FBU1EsSUFBVCxLQUFrQixJQUF0QixFQUE0QjtBQUMxQkQsa0JBQVlFLFVBQVosQ0FBdUIsS0FBS1IsR0FBNUI7QUFDRCxLQUZELE1BRU87QUFDTE0sa0JBQVlHLFFBQVosQ0FBcUIsS0FBS1QsR0FBMUI7QUFDRDtBQUNGLEc7Ozs7O2tCQXhCa0JKLDZCIiwiZmlsZSI6IldoZXJlSnNvbkhhc1Bvc3RncmVzT3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBqc29uQXBpIGZyb20gJy4vcG9zdGdyZXNKc29uQXBpJztcbmltcG9ydCBXcmFwcGluZ1F1ZXJ5QnVpbGRlck9wZXJhdGlvbiBmcm9tICcuLi9XcmFwcGluZ1F1ZXJ5QnVpbGRlck9wZXJhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdoZXJlSnNvbkhhc1Bvc3RncmVzT3BlcmF0aW9uIGV4dGVuZHMgV3JhcHBpbmdRdWVyeUJ1aWxkZXJPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKGJ1aWxkZXIsIG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKGJ1aWxkZXIsIG5hbWUsIG9wdCk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnNxbCA9IG51bGw7XG4gIH1cblxuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICBzdXBlci5jYWxsKGJ1aWxkZXIsIGFyZ3MpO1xuXG4gICAgdGhpcy5zcWwgPSBqc29uQXBpLndoZXJlSnNvbkZpZWxkUmlnaHRTdHJpbmdBcnJheU9uTGVmdFF1ZXJ5KGJ1aWxkZXIsIHRoaXMuYXJnc1swXSwgdGhpcy5vcHQub3BlcmF0b3IsIHRoaXMuYXJnc1sxXSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG9uQnVpbGQoa25leEJ1aWxkZXIpIHtcbiAgICBpZiAodGhpcy5vcHQuYm9vbCA9PT0gJ29yJykge1xuICAgICAga25leEJ1aWxkZXIub3JXaGVyZVJhdyh0aGlzLnNxbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtuZXhCdWlsZGVyLndoZXJlUmF3KHRoaXMuc3FsKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==