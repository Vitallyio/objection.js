"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryBuilderContextBase = function () {
  function QueryBuilderContextBase(userContext) {
    (0, _classCallCheck3.default)(this, QueryBuilderContextBase);

    this.userContext = userContext;
    this.skipUndefined = false;
    this.options = {};
    this.knex = null;
  }

  QueryBuilderContextBase.prototype.clone = function clone() {
    var ctx = new this.constructor();

    ctx.userContext = this.userContext;
    ctx.skipUndefined = this.skipUndefined;
    ctx.options = (0, _assign2.default)({}, this.options);
    ctx.knex = this.knex;

    return ctx;
  };

  return QueryBuilderContextBase;
}();

exports.default = QueryBuilderContextBase;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlF1ZXJ5QnVpbGRlckNvbnRleHRCYXNlLmpzIl0sIm5hbWVzIjpbIlF1ZXJ5QnVpbGRlckNvbnRleHRCYXNlIiwidXNlckNvbnRleHQiLCJza2lwVW5kZWZpbmVkIiwib3B0aW9ucyIsImtuZXgiLCJjbG9uZSIsImN0eCIsImNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztJQUFxQkEsdUI7QUFFbkIsbUNBQVlDLFdBQVosRUFBeUI7QUFBQTs7QUFDdkIsU0FBS0EsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxTQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNEOztvQ0FFREMsSyxvQkFBUTtBQUNOLFFBQU1DLE1BQU0sSUFBSSxLQUFLQyxXQUFULEVBQVo7O0FBRUFELFFBQUlMLFdBQUosR0FBa0IsS0FBS0EsV0FBdkI7QUFDQUssUUFBSUosYUFBSixHQUFvQixLQUFLQSxhQUF6QjtBQUNBSSxRQUFJSCxPQUFKLEdBQWMsc0JBQWMsRUFBZCxFQUFrQixLQUFLQSxPQUF2QixDQUFkO0FBQ0FHLFFBQUlGLElBQUosR0FBVyxLQUFLQSxJQUFoQjs7QUFFQSxXQUFPRSxHQUFQO0FBQ0QsRzs7Ozs7a0JBbEJrQk4sdUIiLCJmaWxlIjoiUXVlcnlCdWlsZGVyQ29udGV4dEJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBRdWVyeUJ1aWxkZXJDb250ZXh0QmFzZSB7XG5cbiAgY29uc3RydWN0b3IodXNlckNvbnRleHQpIHtcbiAgICB0aGlzLnVzZXJDb250ZXh0ID0gdXNlckNvbnRleHQ7XG4gICAgdGhpcy5za2lwVW5kZWZpbmVkID0gZmFsc2U7XG4gICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgdGhpcy5rbmV4ID0gbnVsbDtcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIGNvbnN0IGN0eCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKCk7XG5cbiAgICBjdHgudXNlckNvbnRleHQgPSB0aGlzLnVzZXJDb250ZXh0O1xuICAgIGN0eC5za2lwVW5kZWZpbmVkID0gdGhpcy5za2lwVW5kZWZpbmVkO1xuICAgIGN0eC5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRpb25zKTtcbiAgICBjdHgua25leCA9IHRoaXMua25leDtcblxuICAgIHJldHVybiBjdHg7XG4gIH1cbn0iXX0=