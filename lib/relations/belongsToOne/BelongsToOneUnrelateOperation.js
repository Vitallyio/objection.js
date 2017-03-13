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

var _BelongsToOneRelateOperation = require('./BelongsToOneRelateOperation');

var _BelongsToOneRelateOperation2 = _interopRequireDefault(_BelongsToOneRelateOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BelongsToOneUnrelateOperation = function (_BelongsToOneRelateOp) {
  (0, _inherits3.default)(BelongsToOneUnrelateOperation, _BelongsToOneRelateOp);

  function BelongsToOneUnrelateOperation() {
    (0, _classCallCheck3.default)(this, BelongsToOneUnrelateOperation);
    return (0, _possibleConstructorReturn3.default)(this, _BelongsToOneRelateOp.apply(this, arguments));
  }

  BelongsToOneUnrelateOperation.prototype.call = function call(builder, args) {
    var ids = new Array(this.relation.ownerProp.length);

    for (var i = 0, l = this.relation.ownerProp.length; i < l; ++i) {
      ids[i] = null;
    }

    this.ids = [ids];
    return true;
  };

  BelongsToOneUnrelateOperation.prototype.onAfterInternal = function onAfterInternal(builder, result) {
    return result;
  };

  return BelongsToOneUnrelateOperation;
}(_BelongsToOneRelateOperation2.default);

exports.default = BelongsToOneUnrelateOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJlbG9uZ3NUb09uZVVucmVsYXRlT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIkJlbG9uZ3NUb09uZVVucmVsYXRlT3BlcmF0aW9uIiwiY2FsbCIsImJ1aWxkZXIiLCJhcmdzIiwiaWRzIiwiQXJyYXkiLCJyZWxhdGlvbiIsIm93bmVyUHJvcCIsImxlbmd0aCIsImkiLCJsIiwib25BZnRlckludGVybmFsIiwicmVzdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsNkI7Ozs7Ozs7OzBDQUVuQkMsSSxpQkFBS0MsTyxFQUFTQyxJLEVBQU07QUFDbEIsUUFBTUMsTUFBTSxJQUFJQyxLQUFKLENBQVUsS0FBS0MsUUFBTCxDQUFjQyxTQUFkLENBQXdCQyxNQUFsQyxDQUFaOztBQUVBLFNBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLElBQUksS0FBS0osUUFBTCxDQUFjQyxTQUFkLENBQXdCQyxNQUE1QyxFQUFvREMsSUFBSUMsQ0FBeEQsRUFBMkQsRUFBRUQsQ0FBN0QsRUFBZ0U7QUFDOURMLFVBQUlLLENBQUosSUFBUyxJQUFUO0FBQ0Q7O0FBRUQsU0FBS0wsR0FBTCxHQUFXLENBQUNBLEdBQUQsQ0FBWDtBQUNBLFdBQU8sSUFBUDtBQUNELEc7OzBDQUVETyxlLDRCQUFnQlQsTyxFQUFTVSxNLEVBQVE7QUFDL0IsV0FBT0EsTUFBUDtBQUNELEc7Ozs7O2tCQWZrQlosNkIiLCJmaWxlIjoiQmVsb25nc1RvT25lVW5yZWxhdGVPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmVsb25nc1RvT25lUmVsYXRlT3BlcmF0aW9uIGZyb20gJy4vQmVsb25nc1RvT25lUmVsYXRlT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVsb25nc1RvT25lVW5yZWxhdGVPcGVyYXRpb24gZXh0ZW5kcyBCZWxvbmdzVG9PbmVSZWxhdGVPcGVyYXRpb24ge1xuXG4gIGNhbGwoYnVpbGRlciwgYXJncykge1xuICAgIGNvbnN0IGlkcyA9IG5ldyBBcnJheSh0aGlzLnJlbGF0aW9uLm93bmVyUHJvcC5sZW5ndGgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLnJlbGF0aW9uLm93bmVyUHJvcC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGlkc1tpXSA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5pZHMgPSBbaWRzXTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG9uQWZ0ZXJJbnRlcm5hbChidWlsZGVyLCByZXN1bHQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=