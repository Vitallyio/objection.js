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

var _Relation2 = require('../Relation');

var _Relation3 = _interopRequireDefault(_Relation2);

var _HasManyInsertOperation = require('./HasManyInsertOperation');

var _HasManyInsertOperation2 = _interopRequireDefault(_HasManyInsertOperation);

var _HasManyRelateOperation = require('./HasManyRelateOperation');

var _HasManyRelateOperation2 = _interopRequireDefault(_HasManyRelateOperation);

var _HasManyUnrelateOperation = require('./HasManyUnrelateOperation');

var _HasManyUnrelateOperation2 = _interopRequireDefault(_HasManyUnrelateOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HasManyRelation = function (_Relation) {
  (0, _inherits3.default)(HasManyRelation, _Relation);

  function HasManyRelation() {
    (0, _classCallCheck3.default)(this, HasManyRelation);
    return (0, _possibleConstructorReturn3.default)(this, _Relation.apply(this, arguments));
  }

  HasManyRelation.prototype.insert = function insert(builder, owner) {
    return new _HasManyInsertOperation2.default('insert', {
      relation: this,
      owner: owner
    });
  };

  HasManyRelation.prototype.relate = function relate(builder, owner) {
    return new _HasManyRelateOperation2.default('relate', {
      relation: this,
      owner: owner
    });
  };

  HasManyRelation.prototype.unrelate = function unrelate(builder, owner) {
    return new _HasManyUnrelateOperation2.default('unrelate', {
      relation: this,
      owner: owner
    });
  };

  return HasManyRelation;
}(_Relation3.default);

exports.default = HasManyRelation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhhc01hbnlSZWxhdGlvbi5qcyJdLCJuYW1lcyI6WyJIYXNNYW55UmVsYXRpb24iLCJpbnNlcnQiLCJidWlsZGVyIiwib3duZXIiLCJyZWxhdGlvbiIsInJlbGF0ZSIsInVucmVsYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsZTs7Ozs7Ozs7NEJBRW5CQyxNLG1CQUFPQyxPLEVBQVNDLEssRUFBTztBQUNyQixXQUFPLHFDQUEyQixRQUEzQixFQUFxQztBQUMxQ0MsZ0JBQVUsSUFEZ0M7QUFFMUNELGFBQU9BO0FBRm1DLEtBQXJDLENBQVA7QUFJRCxHOzs0QkFFREUsTSxtQkFBT0gsTyxFQUFTQyxLLEVBQU87QUFDckIsV0FBTyxxQ0FBMkIsUUFBM0IsRUFBcUM7QUFDMUNDLGdCQUFVLElBRGdDO0FBRTFDRCxhQUFPQTtBQUZtQyxLQUFyQyxDQUFQO0FBSUQsRzs7NEJBRURHLFEscUJBQVNKLE8sRUFBU0MsSyxFQUFPO0FBQ3ZCLFdBQU8sdUNBQTZCLFVBQTdCLEVBQXlDO0FBQzlDQyxnQkFBVSxJQURvQztBQUU5Q0QsYUFBT0E7QUFGdUMsS0FBekMsQ0FBUDtBQUlELEc7Ozs7O2tCQXJCa0JILGUiLCJmaWxlIjoiSGFzTWFueVJlbGF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlbGF0aW9uIGZyb20gJy4uL1JlbGF0aW9uJztcblxuaW1wb3J0IEhhc01hbnlJbnNlcnRPcGVyYXRpb24gZnJvbSAnLi9IYXNNYW55SW5zZXJ0T3BlcmF0aW9uJztcbmltcG9ydCBIYXNNYW55UmVsYXRlT3BlcmF0aW9uIGZyb20gJy4vSGFzTWFueVJlbGF0ZU9wZXJhdGlvbic7XG5pbXBvcnQgSGFzTWFueVVucmVsYXRlT3BlcmF0aW9uIGZyb20gJy4vSGFzTWFueVVucmVsYXRlT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzTWFueVJlbGF0aW9uIGV4dGVuZHMgUmVsYXRpb24ge1xuXG4gIGluc2VydChidWlsZGVyLCBvd25lcikge1xuICAgIHJldHVybiBuZXcgSGFzTWFueUluc2VydE9wZXJhdGlvbignaW5zZXJ0Jywge1xuICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICBvd25lcjogb3duZXJcbiAgICB9KTtcbiAgfVxuXG4gIHJlbGF0ZShidWlsZGVyLCBvd25lcikge1xuICAgIHJldHVybiBuZXcgSGFzTWFueVJlbGF0ZU9wZXJhdGlvbigncmVsYXRlJywge1xuICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICBvd25lcjogb3duZXJcbiAgICB9KTtcbiAgfVxuXG4gIHVucmVsYXRlKGJ1aWxkZXIsIG93bmVyKSB7XG4gICAgcmV0dXJuIG5ldyBIYXNNYW55VW5yZWxhdGVPcGVyYXRpb24oJ3VucmVsYXRlJywge1xuICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICBvd25lcjogb3duZXJcbiAgICB9KTtcbiAgfVxufVxuXG4iXX0=