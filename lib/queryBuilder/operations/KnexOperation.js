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

var _WrappingQueryBuilderOperation = require('./WrappingQueryBuilderOperation');

var _WrappingQueryBuilderOperation2 = _interopRequireDefault(_WrappingQueryBuilderOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KnexOperation = function (_WrappingQueryBuilder) {
  (0, _inherits3.default)(KnexOperation, _WrappingQueryBuilder);

  function KnexOperation() {
    (0, _classCallCheck3.default)(this, KnexOperation);
    return (0, _possibleConstructorReturn3.default)(this, _WrappingQueryBuilder.apply(this, arguments));
  }

  KnexOperation.prototype.onBuild = function onBuild(builder) {
    if (typeof builder[this.name] === 'function') {
      builder[this.name].apply(builder, this.args);
    } else {
      throw new Error('knex doesn\'t have the method \'' + this.name + '\'');
    }
  };

  return KnexOperation;
}(_WrappingQueryBuilderOperation2.default);

exports.default = KnexOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktuZXhPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiS25leE9wZXJhdGlvbiIsIm9uQnVpbGQiLCJidWlsZGVyIiwibmFtZSIsImFwcGx5IiwiYXJncyIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsYTs7Ozs7Ozs7MEJBRW5CQyxPLG9CQUFRQyxPLEVBQVM7QUFDZixRQUFJLE9BQU9BLFFBQVEsS0FBS0MsSUFBYixDQUFQLEtBQThCLFVBQWxDLEVBQThDO0FBQzVDRCxjQUFRLEtBQUtDLElBQWIsRUFBbUJDLEtBQW5CLENBQXlCRixPQUF6QixFQUFrQyxLQUFLRyxJQUF2QztBQUNELEtBRkQsTUFFTztBQUNMLFlBQU0sSUFBSUMsS0FBSixzQ0FBMkMsS0FBS0gsSUFBaEQsUUFBTjtBQUNEO0FBQ0YsRzs7Ozs7a0JBUmtCSCxhIiwiZmlsZSI6IktuZXhPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV3JhcHBpbmdRdWVyeUJ1aWxkZXJPcGVyYXRpb24gZnJvbSAnLi9XcmFwcGluZ1F1ZXJ5QnVpbGRlck9wZXJhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtuZXhPcGVyYXRpb24gZXh0ZW5kcyBXcmFwcGluZ1F1ZXJ5QnVpbGRlck9wZXJhdGlvbiB7XG5cbiAgb25CdWlsZChidWlsZGVyKSB7XG4gICAgaWYgKHR5cGVvZiBidWlsZGVyW3RoaXMubmFtZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGJ1aWxkZXJbdGhpcy5uYW1lXS5hcHBseShidWlsZGVyLCB0aGlzLmFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGtuZXggZG9lc24ndCBoYXZlIHRoZSBtZXRob2QgJyR7dGhpcy5uYW1lfSdgKTtcbiAgICB9XG4gIH1cbn0iXX0=