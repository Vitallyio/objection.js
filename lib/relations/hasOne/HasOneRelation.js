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

var _HasManyRelation2 = require('../hasMany/HasManyRelation');

var _HasManyRelation3 = _interopRequireDefault(_HasManyRelation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HasOneRelation = function (_HasManyRelation) {
  (0, _inherits3.default)(HasOneRelation, _HasManyRelation);

  function HasOneRelation() {
    (0, _classCallCheck3.default)(this, HasOneRelation);
    return (0, _possibleConstructorReturn3.default)(this, _HasManyRelation.apply(this, arguments));
  }

  HasOneRelation.prototype.isOneToOne = function isOneToOne() {
    return true;
  };

  return HasOneRelation;
}(_HasManyRelation3.default);

exports.default = HasOneRelation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhhc09uZVJlbGF0aW9uLmpzIl0sIm5hbWVzIjpbIkhhc09uZVJlbGF0aW9uIiwiaXNPbmVUb09uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLGM7Ozs7Ozs7OzJCQUVuQkMsVSx5QkFBYTtBQUNYLFdBQU8sSUFBUDtBQUNELEc7Ozs7O2tCQUprQkQsYyIsImZpbGUiOiJIYXNPbmVSZWxhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIYXNNYW55UmVsYXRpb24gZnJvbSAnLi4vaGFzTWFueS9IYXNNYW55UmVsYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNPbmVSZWxhdGlvbiBleHRlbmRzIEhhc01hbnlSZWxhdGlvbiB7XG5cbiAgaXNPbmVUb09uZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufSJdfQ==