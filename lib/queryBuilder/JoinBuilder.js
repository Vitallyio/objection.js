'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _desc, _value, _class;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _QueryBuilderOperationSupport = require('./QueryBuilderOperationSupport');

var _QueryBuilderOperationSupport2 = _interopRequireDefault(_QueryBuilderOperationSupport);

var _queryBuilderOperation = require('./decorators/queryBuilderOperation');

var _queryBuilderOperation2 = _interopRequireDefault(_queryBuilderOperation);

var _classUtils = require('../utils/classUtils');

var _QueryBuilderContextBase = require('./QueryBuilderContextBase');

var _QueryBuilderContextBase2 = _interopRequireDefault(_QueryBuilderContextBase);

var _KnexOperation = require('./operations/KnexOperation');

var _KnexOperation2 = _interopRequireDefault(_KnexOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var JoinBuilder = (_dec = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec2 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec3 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec4 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec5 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec6 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec7 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec8 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec9 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec10 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec11 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec12 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec13 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec14 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec15 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec16 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec17 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec18 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec19 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec20 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec21 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec22 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec23 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec24 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec25 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec26 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec27 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec28 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec29 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec30 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), (_class = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(JoinBuilder, _QueryBuilderOperatio);

  function JoinBuilder() {
    (0, _classCallCheck3.default)(this, JoinBuilder);
    return (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.apply(this, arguments));
  }

  JoinBuilder.prototype.using = function using() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.on = function on() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.orOn = function orOn() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.onBetween = function onBetween() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.onNotBetween = function onNotBetween() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.orOnBetween = function orOnBetween() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.orOnNotBetween = function orOnNotBetween() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.onIn = function onIn() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.onNotIn = function onNotIn() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.orOnIn = function orOnIn() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.orOnNotIn = function orOnNotIn() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.onNull = function onNull() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.orOnNull = function orOnNull() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.onNotNull = function onNotNull() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.orOnNotNull = function orOnNotNull() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.onExists = function onExists() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.orOnExists = function orOnExists() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.onNotExists = function onNotExists() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.orOnNotExists = function orOnNotExists() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.type = function type() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.or = function or() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.andOn = function andOn() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.andOnIn = function andOnIn() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.andOnNotIn = function andOnNotIn() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.andOnNull = function andOnNull() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.andOnNotNull = function andOnNotNull() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.andOnExists = function andOnExists() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.andOnNotExists = function andOnNotExists() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.andOnBetween = function andOnBetween() {};

  /**
   * @returns {JoinBuilderBase}
   */


  JoinBuilder.prototype.andOnNotBetween = function andOnNotBetween() {};

  return JoinBuilder;
}(_QueryBuilderOperationSupport2.default), (_applyDecoratedDescriptor(_class.prototype, 'using', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'using'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'on', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'on'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orOn', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orOn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onBetween', [_dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'onBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onNotBetween', [_dec5], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'onNotBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orOnBetween', [_dec6], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orOnBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orOnNotBetween', [_dec7], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orOnNotBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onIn', [_dec8], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'onIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onNotIn', [_dec9], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'onNotIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orOnIn', [_dec10], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orOnIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orOnNotIn', [_dec11], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orOnNotIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onNull', [_dec12], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'onNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orOnNull', [_dec13], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orOnNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onNotNull', [_dec14], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'onNotNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orOnNotNull', [_dec15], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orOnNotNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onExists', [_dec16], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'onExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orOnExists', [_dec17], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orOnExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onNotExists', [_dec18], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'onNotExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orOnNotExists', [_dec19], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orOnNotExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'type', [_dec20], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'type'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'or', [_dec21], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'or'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andOn', [_dec22], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andOn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andOnIn', [_dec23], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andOnIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andOnNotIn', [_dec24], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andOnNotIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andOnNull', [_dec25], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andOnNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andOnNotNull', [_dec26], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andOnNotNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andOnExists', [_dec27], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andOnExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andOnNotExists', [_dec28], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andOnNotExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andOnBetween', [_dec29], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andOnBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andOnNotBetween', [_dec30], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andOnNotBetween'), _class.prototype)), _class));
exports.default = JoinBuilder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpvaW5CdWlsZGVyLmpzIl0sIm5hbWVzIjpbIkpvaW5CdWlsZGVyIiwidXNpbmciLCJvbiIsIm9yT24iLCJvbkJldHdlZW4iLCJvbk5vdEJldHdlZW4iLCJvck9uQmV0d2VlbiIsIm9yT25Ob3RCZXR3ZWVuIiwib25JbiIsIm9uTm90SW4iLCJvck9uSW4iLCJvck9uTm90SW4iLCJvbk51bGwiLCJvck9uTnVsbCIsIm9uTm90TnVsbCIsIm9yT25Ob3ROdWxsIiwib25FeGlzdHMiLCJvck9uRXhpc3RzIiwib25Ob3RFeGlzdHMiLCJvck9uTm90RXhpc3RzIiwidHlwZSIsIm9yIiwiYW5kT24iLCJhbmRPbkluIiwiYW5kT25Ob3RJbiIsImFuZE9uTnVsbCIsImFuZE9uTm90TnVsbCIsImFuZE9uRXhpc3RzIiwiYW5kT25Ob3RFeGlzdHMiLCJhbmRPbkJldHdlZW4iLCJhbmRPbk5vdEJldHdlZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsVyxXQUtsQiw2RCxVQU1BLDZELFVBTUEsNkQsVUFNQSw2RCxVQU1BLDZELFVBTUEsNkQsVUFNQSw2RCxVQU1BLDZELFVBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQ7Ozs7Ozs7O3dCQTdLREMsSyxvQkFBZSxDQUFFLEM7O0FBRWpCOzs7Ozt3QkFJQUMsRSxpQkFBWSxDQUFFLEM7O0FBRWQ7Ozs7O3dCQUlBQyxJLG1CQUFjLENBQUUsQzs7QUFFaEI7Ozs7O3dCQUlBQyxTLHdCQUFtQixDQUFFLEM7O0FBRXJCOzs7Ozt3QkFJQUMsWSwyQkFBc0IsQ0FBRSxDOztBQUV4Qjs7Ozs7d0JBSUFDLFcsMEJBQXFCLENBQUUsQzs7QUFFdkI7Ozs7O3dCQUlBQyxjLDZCQUF3QixDQUFFLEM7O0FBRTFCOzs7Ozt3QkFJQUMsSSxtQkFBYyxDQUFFLEM7O0FBRWhCOzs7Ozt3QkFJQUMsTyxzQkFBaUIsQ0FBRSxDOztBQUVuQjs7Ozs7d0JBSUFDLE0scUJBQWdCLENBQUUsQzs7QUFFbEI7Ozs7O3dCQUlBQyxTLHdCQUFtQixDQUFFLEM7O0FBRXJCOzs7Ozt3QkFJQUMsTSxxQkFBZ0IsQ0FBRSxDOztBQUVsQjs7Ozs7d0JBSUFDLFEsdUJBQWtCLENBQUUsQzs7QUFFcEI7Ozs7O3dCQUlBQyxTLHdCQUFtQixDQUFFLEM7O0FBRXJCOzs7Ozt3QkFJQUMsVywwQkFBcUIsQ0FBRSxDOztBQUV2Qjs7Ozs7d0JBSUFDLFEsdUJBQWtCLENBQUUsQzs7QUFFcEI7Ozs7O3dCQUlBQyxVLHlCQUFvQixDQUFFLEM7O0FBRXRCOzs7Ozt3QkFJQUMsVywwQkFBcUIsQ0FBRSxDOztBQUV2Qjs7Ozs7d0JBSUFDLGEsNEJBQXVCLENBQUUsQzs7QUFFekI7Ozs7O3dCQUlBQyxJLG1CQUFjLENBQUUsQzs7QUFFaEI7Ozs7O3dCQUlBQyxFLGlCQUFZLENBQUUsQzs7QUFFZDs7Ozs7d0JBSUFDLEssb0JBQWUsQ0FBRSxDOztBQUVqQjs7Ozs7d0JBSUFDLE8sc0JBQWlCLENBQUUsQzs7QUFFbkI7Ozs7O3dCQUlBQyxVLHlCQUFvQixDQUFFLEM7O0FBRXRCOzs7Ozt3QkFJQUMsUyx3QkFBbUIsQ0FBRSxDOztBQUVyQjs7Ozs7d0JBSUFDLFksMkJBQXNCLENBQUUsQzs7QUFFeEI7Ozs7O3dCQUlBQyxXLDBCQUFxQixDQUFFLEM7O0FBRXZCOzs7Ozt3QkFJQUMsYyw2QkFBd0IsQ0FBRSxDOztBQUUxQjs7Ozs7d0JBSUFDLFksMkJBQXNCLENBQUUsQzs7QUFFeEI7Ozs7O3dCQUlBQyxlLDhCQUF5QixDQUFFLEM7Ozs7a0JBcExSOUIsVyIsImZpbGUiOiJKb2luQnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUXVlcnlCdWlsZGVyT3BlcmF0aW9uU3VwcG9ydCBmcm9tICcuL1F1ZXJ5QnVpbGRlck9wZXJhdGlvblN1cHBvcnQnO1xuaW1wb3J0IHF1ZXJ5QnVpbGRlck9wZXJhdGlvbiBmcm9tICcuL2RlY29yYXRvcnMvcXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcbmltcG9ydCB7aW5oZXJpdHN9IGZyb20gJy4uL3V0aWxzL2NsYXNzVXRpbHMnO1xuXG5pbXBvcnQgUXVlcnlCdWlsZGVyQ29udGV4dEJhc2UgZnJvbSAnLi9RdWVyeUJ1aWxkZXJDb250ZXh0QmFzZSc7XG5pbXBvcnQgS25leE9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvS25leE9wZXJhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvaW5CdWlsZGVyIGV4dGVuZHMgUXVlcnlCdWlsZGVyT3BlcmF0aW9uU3VwcG9ydCB7XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHVzaW5nKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9uKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yT24oLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge0pvaW5CdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb25CZXR3ZWVuKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9uTm90QmV0d2VlbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Sm9pbkJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvck9uQmV0d2VlbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Sm9pbkJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvck9uTm90QmV0d2VlbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Sm9pbkJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvbkluKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9uTm90SW4oLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge0pvaW5CdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3JPbkluKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yT25Ob3RJbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Sm9pbkJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvbk51bGwoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge0pvaW5CdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3JPbk51bGwoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge0pvaW5CdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb25Ob3ROdWxsKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yT25Ob3ROdWxsKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9uRXhpc3RzKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yT25FeGlzdHMoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge0pvaW5CdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb25Ob3RFeGlzdHMoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge0pvaW5CdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3JPbk5vdEV4aXN0cyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Sm9pbkJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICB0eXBlKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGFuZE9uKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGFuZE9uSW4oLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge0pvaW5CdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgYW5kT25Ob3RJbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Sm9pbkJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBhbmRPbk51bGwoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge0pvaW5CdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgYW5kT25Ob3ROdWxsKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGFuZE9uRXhpc3RzKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGFuZE9uTm90RXhpc3RzKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtKb2luQnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGFuZE9uQmV0d2VlbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Sm9pbkJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBhbmRPbk5vdEJldHdlZW4oLi4uYXJncykge31cblxufVxuIl19