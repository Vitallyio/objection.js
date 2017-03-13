'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ref = exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _jsonFieldExpressionParser = require('./parsers/jsonFieldExpressionParser');

var _jsonFieldExpressionParser2 = _interopRequireDefault(_jsonFieldExpressionParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReferenceBuilder = function () {
  function ReferenceBuilder(fieldExpression) {
    (0, _classCallCheck3.default)(this, ReferenceBuilder);

    // for premature optimization _reference could be lazy memoized getter... 
    this._reference = _jsonFieldExpressionParser2.default.parse(fieldExpression);
    this._cast = null;
    this._toJson = false;
    this._as = null; // TODO: UNIT TEST
  }

  ReferenceBuilder.prototype.castText = function castText() {
    return this.castType('text');
  };

  ReferenceBuilder.prototype.castInt = function castInt() {
    return this.castType('integer');
  };

  ReferenceBuilder.prototype.castBigInt = function castBigInt() {
    return this.castType('bigint');
  };

  ReferenceBuilder.prototype.castFloat = function castFloat() {
    return this.castType('float');
  };

  ReferenceBuilder.prototype.castDecimal = function castDecimal() {
    return this.castType('decimal');
  };

  ReferenceBuilder.prototype.castReal = function castReal() {
    return this.castType('real');
  };

  ReferenceBuilder.prototype.castBool = function castBool() {
    return this.castType('boolean');
  };

  ReferenceBuilder.prototype.castJson = function castJson() {
    // maybe different for mysql, no need to support postgres plain json
    this._toJson = true;
    return this;
  };

  ReferenceBuilder.prototype.castType = function castType(sqlType) {
    // we could maybe check some valid values here... at least fail on invalid chars 
    this._cast = sqlType;
    return this;
  };

  ReferenceBuilder.prototype.as = function as(_as) {
    this._as = _as;
    return this;
  };

  ReferenceBuilder.prototype.toRawArgs = function toRawArgs() {
    var referenceSql = '??';

    // if json field ref
    if (this._reference.access.length > 0) {
      // TODO: for mysql this needs separate implementation... maybe something like SELECT JSON_EXTRACT('{"id": 14, "name": "Aztalan"}', '$.name');
      var extractor = this._cast ? '#>>' : '#>';
      var jsonFieldRef = this._reference.access.map(function (field) {
        return field.ref;
      }).join(',');
      referenceSql = '??' + extractor + '\'{' + jsonFieldRef + '}\'';
    }

    var castedRefQuery = this._cast ? 'CAST(' + referenceSql + ' AS ' + this._cast + ')' : referenceSql;
    var toJsonQuery = this._toJson ? 'to_jsonb(' + castedRefQuery + ')' : castedRefQuery;

    if (this._as) {
      return [toJsonQuery + ' AS ??', [this._reference.columnName, this._as]];
    } else {
      return [toJsonQuery, [this._reference.columnName]];
    }
  };

  return ReferenceBuilder;
}();

exports.default = ReferenceBuilder;


var ref = function ref(fieldExpression) {
  return new ReferenceBuilder(fieldExpression);
};

exports.ref = ref;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlZmVyZW5jZUJ1aWxkZXIuanMiXSwibmFtZXMiOlsiUmVmZXJlbmNlQnVpbGRlciIsImZpZWxkRXhwcmVzc2lvbiIsIl9yZWZlcmVuY2UiLCJwYXJzZSIsIl9jYXN0IiwiX3RvSnNvbiIsIl9hcyIsImNhc3RUZXh0IiwiY2FzdFR5cGUiLCJjYXN0SW50IiwiY2FzdEJpZ0ludCIsImNhc3RGbG9hdCIsImNhc3REZWNpbWFsIiwiY2FzdFJlYWwiLCJjYXN0Qm9vbCIsImNhc3RKc29uIiwic3FsVHlwZSIsImFzIiwidG9SYXdBcmdzIiwicmVmZXJlbmNlU3FsIiwiYWNjZXNzIiwibGVuZ3RoIiwiZXh0cmFjdG9yIiwianNvbkZpZWxkUmVmIiwibWFwIiwiZmllbGQiLCJyZWYiLCJqb2luIiwiY2FzdGVkUmVmUXVlcnkiLCJ0b0pzb25RdWVyeSIsImNvbHVtbk5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsZ0I7QUFFbkIsNEJBQVlDLGVBQVosRUFBNkI7QUFBQTs7QUFDM0I7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLG9DQUEwQkMsS0FBMUIsQ0FBZ0NGLGVBQWhDLENBQWxCO0FBQ0EsU0FBS0csS0FBTCxHQUFhLElBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsS0FBZjtBQUNBLFNBQUtDLEdBQUwsR0FBVyxJQUFYLENBTDJCLENBS1Y7QUFDbEI7OzZCQUVEQyxRLHVCQUFXO0FBQ1QsV0FBTyxLQUFLQyxRQUFMLENBQWMsTUFBZCxDQUFQO0FBQ0QsRzs7NkJBRURDLE8sc0JBQVU7QUFDUixXQUFPLEtBQUtELFFBQUwsQ0FBYyxTQUFkLENBQVA7QUFDRCxHOzs2QkFFREUsVSx5QkFBYTtBQUNYLFdBQU8sS0FBS0YsUUFBTCxDQUFjLFFBQWQsQ0FBUDtBQUNELEc7OzZCQUVERyxTLHdCQUFZO0FBQ1YsV0FBTyxLQUFLSCxRQUFMLENBQWMsT0FBZCxDQUFQO0FBQ0QsRzs7NkJBRURJLFcsMEJBQWM7QUFDWixXQUFPLEtBQUtKLFFBQUwsQ0FBYyxTQUFkLENBQVA7QUFDRCxHOzs2QkFFREssUSx1QkFBVztBQUNULFdBQU8sS0FBS0wsUUFBTCxDQUFjLE1BQWQsQ0FBUDtBQUNELEc7OzZCQUVETSxRLHVCQUFXO0FBQ1QsV0FBTyxLQUFLTixRQUFMLENBQWMsU0FBZCxDQUFQO0FBQ0QsRzs7NkJBRURPLFEsdUJBQVc7QUFDVDtBQUNBLFNBQUtWLE9BQUwsR0FBZSxJQUFmO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsRzs7NkJBRURHLFEscUJBQVNRLE8sRUFBUztBQUNoQjtBQUNBLFNBQUtaLEtBQUwsR0FBYVksT0FBYjtBQUNBLFdBQU8sSUFBUDtBQUNELEc7OzZCQUVEQyxFLGVBQUdBLEcsRUFBSTtBQUNMLFNBQUtYLEdBQUwsR0FBV1csR0FBWDtBQUNBLFdBQU8sSUFBUDtBQUNELEc7OzZCQUVEQyxTLHdCQUFZO0FBQ1YsUUFBSUMsbUJBQUo7O0FBRUE7QUFDQSxRQUFJLEtBQUtqQixVQUFMLENBQWdCa0IsTUFBaEIsQ0FBdUJDLE1BQXZCLEdBQWdDLENBQXBDLEVBQXVDO0FBQ3JDO0FBQ0EsVUFBSUMsWUFBWSxLQUFLbEIsS0FBTCxHQUFhLEtBQWIsR0FBcUIsSUFBckM7QUFDQSxVQUFJbUIsZUFBZSxLQUFLckIsVUFBTCxDQUFnQmtCLE1BQWhCLENBQXVCSSxHQUF2QixDQUEyQjtBQUFBLGVBQVNDLE1BQU1DLEdBQWY7QUFBQSxPQUEzQixFQUErQ0MsSUFBL0MsQ0FBb0QsR0FBcEQsQ0FBbkI7QUFDQVIsNEJBQW9CRyxTQUFwQixXQUFrQ0MsWUFBbEM7QUFDRDs7QUFFRCxRQUFJSyxpQkFBaUIsS0FBS3hCLEtBQUwsYUFBcUJlLFlBQXJCLFlBQXdDLEtBQUtmLEtBQTdDLFNBQXdEZSxZQUE3RTtBQUNBLFFBQUlVLGNBQWMsS0FBS3hCLE9BQUwsaUJBQTJCdUIsY0FBM0IsU0FBK0NBLGNBQWpFOztBQUVBLFFBQUksS0FBS3RCLEdBQVQsRUFBYztBQUNaLGFBQU8sQ0FBSXVCLFdBQUosYUFBeUIsQ0FBQyxLQUFLM0IsVUFBTCxDQUFnQjRCLFVBQWpCLEVBQTZCLEtBQUt4QixHQUFsQyxDQUF6QixDQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsYUFBTyxDQUFDdUIsV0FBRCxFQUFjLENBQUMsS0FBSzNCLFVBQUwsQ0FBZ0I0QixVQUFqQixDQUFkLENBQVA7QUFDRDtBQUNGLEc7Ozs7O2tCQTFFa0I5QixnQjs7O0FBOEVyQixJQUFJMEIsTUFBTSxTQUFOQSxHQUFNO0FBQUEsU0FBbUIsSUFBSTFCLGdCQUFKLENBQXFCQyxlQUFyQixDQUFuQjtBQUFBLENBQVY7O1FBRVN5QixHLEdBQUFBLEciLCJmaWxlIjoiUmVmZXJlbmNlQnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqc29uRmllbGRFeHByZXNzaW9uUGFyc2VyIGZyb20gJy4vcGFyc2Vycy9qc29uRmllbGRFeHByZXNzaW9uUGFyc2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVmZXJlbmNlQnVpbGRlciB7XG5cbiAgY29uc3RydWN0b3IoZmllbGRFeHByZXNzaW9uKSB7XG4gICAgLy8gZm9yIHByZW1hdHVyZSBvcHRpbWl6YXRpb24gX3JlZmVyZW5jZSBjb3VsZCBiZSBsYXp5IG1lbW9pemVkIGdldHRlci4uLiBcbiAgICB0aGlzLl9yZWZlcmVuY2UgPSBqc29uRmllbGRFeHByZXNzaW9uUGFyc2VyLnBhcnNlKGZpZWxkRXhwcmVzc2lvbik7XG4gICAgdGhpcy5fY2FzdCA9IG51bGw7XG4gICAgdGhpcy5fdG9Kc29uID0gZmFsc2U7XG4gICAgdGhpcy5fYXMgPSBudWxsOyAvLyBUT0RPOiBVTklUIFRFU1RcbiAgfVxuXG4gIGNhc3RUZXh0KCkge1xuICAgIHJldHVybiB0aGlzLmNhc3RUeXBlKCd0ZXh0Jyk7XG4gIH1cblxuICBjYXN0SW50KCkge1xuICAgIHJldHVybiB0aGlzLmNhc3RUeXBlKCdpbnRlZ2VyJyk7XG4gIH1cblxuICBjYXN0QmlnSW50KCkge1xuICAgIHJldHVybiB0aGlzLmNhc3RUeXBlKCdiaWdpbnQnKTtcbiAgfVxuXG4gIGNhc3RGbG9hdCgpIHtcbiAgICByZXR1cm4gdGhpcy5jYXN0VHlwZSgnZmxvYXQnKTtcbiAgfVxuXG4gIGNhc3REZWNpbWFsKCkge1xuICAgIHJldHVybiB0aGlzLmNhc3RUeXBlKCdkZWNpbWFsJyk7XG4gIH1cblxuICBjYXN0UmVhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5jYXN0VHlwZSgncmVhbCcpO1xuICB9XG5cbiAgY2FzdEJvb2woKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FzdFR5cGUoJ2Jvb2xlYW4nKTtcbiAgfVxuXG4gIGNhc3RKc29uKCkge1xuICAgIC8vIG1heWJlIGRpZmZlcmVudCBmb3IgbXlzcWwsIG5vIG5lZWQgdG8gc3VwcG9ydCBwb3N0Z3JlcyBwbGFpbiBqc29uXG4gICAgdGhpcy5fdG9Kc29uID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNhc3RUeXBlKHNxbFR5cGUpIHtcbiAgICAvLyB3ZSBjb3VsZCBtYXliZSBjaGVjayBzb21lIHZhbGlkIHZhbHVlcyBoZXJlLi4uIGF0IGxlYXN0IGZhaWwgb24gaW52YWxpZCBjaGFycyBcbiAgICB0aGlzLl9jYXN0ID0gc3FsVHlwZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFzKGFzKSB7XG4gICAgdGhpcy5fYXMgPSBhcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRvUmF3QXJncygpIHtcbiAgICBsZXQgcmVmZXJlbmNlU3FsID0gYD8/YDtcbiBcbiAgICAvLyBpZiBqc29uIGZpZWxkIHJlZlxuICAgIGlmICh0aGlzLl9yZWZlcmVuY2UuYWNjZXNzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIFRPRE86IGZvciBteXNxbCB0aGlzIG5lZWRzIHNlcGFyYXRlIGltcGxlbWVudGF0aW9uLi4uIG1heWJlIHNvbWV0aGluZyBsaWtlIFNFTEVDVCBKU09OX0VYVFJBQ1QoJ3tcImlkXCI6IDE0LCBcIm5hbWVcIjogXCJBenRhbGFuXCJ9JywgJyQubmFtZScpO1xuICAgICAgbGV0IGV4dHJhY3RvciA9IHRoaXMuX2Nhc3QgPyAnIz4+JyA6ICcjPic7XG4gICAgICBsZXQganNvbkZpZWxkUmVmID0gdGhpcy5fcmVmZXJlbmNlLmFjY2Vzcy5tYXAoZmllbGQgPT4gZmllbGQucmVmKS5qb2luKCcsJyk7ICBcbiAgICAgIHJlZmVyZW5jZVNxbCA9IGA/PyR7ZXh0cmFjdG9yfSd7JHtqc29uRmllbGRSZWZ9fSdgO1xuICAgIH1cblxuICAgIGxldCBjYXN0ZWRSZWZRdWVyeSA9IHRoaXMuX2Nhc3QgPyBgQ0FTVCgke3JlZmVyZW5jZVNxbH0gQVMgJHt0aGlzLl9jYXN0fSlgIDogcmVmZXJlbmNlU3FsO1xuICAgIGxldCB0b0pzb25RdWVyeSA9IHRoaXMuX3RvSnNvbiA/IGB0b19qc29uYigke2Nhc3RlZFJlZlF1ZXJ5fSlgIDogY2FzdGVkUmVmUXVlcnk7XG5cbiAgICBpZiAodGhpcy5fYXMpIHtcbiAgICAgIHJldHVybiBbYCR7dG9Kc29uUXVlcnl9IEFTID8/YCwgW3RoaXMuX3JlZmVyZW5jZS5jb2x1bW5OYW1lLCB0aGlzLl9hc11dO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW3RvSnNvblF1ZXJ5LCBbdGhpcy5fcmVmZXJlbmNlLmNvbHVtbk5hbWVdXTtcbiAgICB9XG4gIH1cblxufVxuXG5sZXQgcmVmID0gZmllbGRFeHByZXNzaW9uID0+IG5ldyBSZWZlcmVuY2VCdWlsZGVyKGZpZWxkRXhwcmVzc2lvbik7XG5cbmV4cG9ydCB7IHJlZiB9O1xuIl19