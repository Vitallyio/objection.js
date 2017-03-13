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

var _BelongsToOneInsertOperation = require('./BelongsToOneInsertOperation');

var _BelongsToOneInsertOperation2 = _interopRequireDefault(_BelongsToOneInsertOperation);

var _BelongsToOneRelateOperation = require('./BelongsToOneRelateOperation');

var _BelongsToOneRelateOperation2 = _interopRequireDefault(_BelongsToOneRelateOperation);

var _BelongsToOneUnrelateOperation = require('./BelongsToOneUnrelateOperation');

var _BelongsToOneUnrelateOperation2 = _interopRequireDefault(_BelongsToOneUnrelateOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BelongsToOneRelation = function (_Relation) {
  (0, _inherits3.default)(BelongsToOneRelation, _Relation);

  function BelongsToOneRelation() {
    (0, _classCallCheck3.default)(this, BelongsToOneRelation);
    return (0, _possibleConstructorReturn3.default)(this, _Relation.apply(this, arguments));
  }

  BelongsToOneRelation.prototype.isOneToOne = function isOneToOne() {
    return true;
  };

  BelongsToOneRelation.prototype.insert = function insert(builder, owner) {
    return new _BelongsToOneInsertOperation2.default('insert', {
      relation: this,
      owner: owner
    });
  };

  BelongsToOneRelation.prototype.relate = function relate(builder, owner) {
    return new _BelongsToOneRelateOperation2.default('relate', {
      relation: this,
      owner: owner
    });
  };

  BelongsToOneRelation.prototype.unrelate = function unrelate(builder, owner) {
    return new _BelongsToOneUnrelateOperation2.default('unrelate', {
      relation: this,
      owner: owner
    });
  };

  return BelongsToOneRelation;
}(_Relation3.default);

exports.default = BelongsToOneRelation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJlbG9uZ3NUb09uZVJlbGF0aW9uLmpzIl0sIm5hbWVzIjpbIkJlbG9uZ3NUb09uZVJlbGF0aW9uIiwiaXNPbmVUb09uZSIsImluc2VydCIsImJ1aWxkZXIiLCJvd25lciIsInJlbGF0aW9uIiwicmVsYXRlIiwidW5yZWxhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxvQjs7Ozs7Ozs7aUNBRW5CQyxVLHlCQUFhO0FBQ1gsV0FBTyxJQUFQO0FBQ0QsRzs7aUNBRURDLE0sbUJBQU9DLE8sRUFBU0MsSyxFQUFPO0FBQ3JCLFdBQU8sMENBQWdDLFFBQWhDLEVBQTBDO0FBQy9DQyxnQkFBVSxJQURxQztBQUUvQ0QsYUFBT0E7QUFGd0MsS0FBMUMsQ0FBUDtBQUlELEc7O2lDQUVERSxNLG1CQUFPSCxPLEVBQVNDLEssRUFBTztBQUNyQixXQUFPLDBDQUFnQyxRQUFoQyxFQUEwQztBQUMvQ0MsZ0JBQVUsSUFEcUM7QUFFL0NELGFBQU9BO0FBRndDLEtBQTFDLENBQVA7QUFJRCxHOztpQ0FFREcsUSxxQkFBU0osTyxFQUFTQyxLLEVBQU87QUFDdkIsV0FBTyw0Q0FBa0MsVUFBbEMsRUFBOEM7QUFDbkRDLGdCQUFVLElBRHlDO0FBRW5ERCxhQUFPQTtBQUY0QyxLQUE5QyxDQUFQO0FBSUQsRzs7Ozs7a0JBekJrQkosb0IiLCJmaWxlIjoiQmVsb25nc1RvT25lUmVsYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVsYXRpb24gZnJvbSAnLi4vUmVsYXRpb24nO1xuaW1wb3J0IEJlbG9uZ3NUb09uZUluc2VydE9wZXJhdGlvbiBmcm9tICcuL0JlbG9uZ3NUb09uZUluc2VydE9wZXJhdGlvbic7XG5pbXBvcnQgQmVsb25nc1RvT25lUmVsYXRlT3BlcmF0aW9uIGZyb20gJy4vQmVsb25nc1RvT25lUmVsYXRlT3BlcmF0aW9uJztcbmltcG9ydCBCZWxvbmdzVG9PbmVVbnJlbGF0ZU9wZXJhdGlvbiBmcm9tICcuL0JlbG9uZ3NUb09uZVVucmVsYXRlT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVsb25nc1RvT25lUmVsYXRpb24gZXh0ZW5kcyBSZWxhdGlvbiB7XG5cbiAgaXNPbmVUb09uZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGluc2VydChidWlsZGVyLCBvd25lcikge1xuICAgIHJldHVybiBuZXcgQmVsb25nc1RvT25lSW5zZXJ0T3BlcmF0aW9uKCdpbnNlcnQnLCB7XG4gICAgICByZWxhdGlvbjogdGhpcyxcbiAgICAgIG93bmVyOiBvd25lclxuICAgIH0pO1xuICB9XG5cbiAgcmVsYXRlKGJ1aWxkZXIsIG93bmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCZWxvbmdzVG9PbmVSZWxhdGVPcGVyYXRpb24oJ3JlbGF0ZScsIHtcbiAgICAgIHJlbGF0aW9uOiB0aGlzLFxuICAgICAgb3duZXI6IG93bmVyXG4gICAgfSk7XG4gIH1cblxuICB1bnJlbGF0ZShidWlsZGVyLCBvd25lcikge1xuICAgIHJldHVybiBuZXcgQmVsb25nc1RvT25lVW5yZWxhdGVPcGVyYXRpb24oJ3VucmVsYXRlJywge1xuICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICBvd25lcjogb3duZXJcbiAgICB9KTtcbiAgfVxufSJdfQ==