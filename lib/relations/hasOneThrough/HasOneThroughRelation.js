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

var _ManyToManyRelation2 = require('../manyToMany/ManyToManyRelation');

var _ManyToManyRelation3 = _interopRequireDefault(_ManyToManyRelation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HasOneThroughRelation = function (_ManyToManyRelation) {
  (0, _inherits3.default)(HasOneThroughRelation, _ManyToManyRelation);

  function HasOneThroughRelation() {
    (0, _classCallCheck3.default)(this, HasOneThroughRelation);
    return (0, _possibleConstructorReturn3.default)(this, _ManyToManyRelation.apply(this, arguments));
  }

  HasOneThroughRelation.prototype.isOneToOne = function isOneToOne() {
    return true;
  };

  return HasOneThroughRelation;
}(_ManyToManyRelation3.default);

exports.default = HasOneThroughRelation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhhc09uZVRocm91Z2hSZWxhdGlvbi5qcyJdLCJuYW1lcyI6WyJIYXNPbmVUaHJvdWdoUmVsYXRpb24iLCJpc09uZVRvT25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEscUI7Ozs7Ozs7O2tDQUVuQkMsVSx5QkFBYTtBQUNYLFdBQU8sSUFBUDtBQUNELEc7Ozs7O2tCQUprQkQscUIiLCJmaWxlIjoiSGFzT25lVGhyb3VnaFJlbGF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hbnlUb01hbnlSZWxhdGlvbiBmcm9tICcuLi9tYW55VG9NYW55L01hbnlUb01hbnlSZWxhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc09uZVRocm91Z2hSZWxhdGlvbiBleHRlbmRzIE1hbnlUb01hbnlSZWxhdGlvbiB7XG5cbiAgaXNPbmVUb09uZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufSJdfQ==