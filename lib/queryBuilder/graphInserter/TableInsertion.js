"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableInsertion = function TableInsertion(modelClass, isJoinTableInsertion) {
  (0, _classCallCheck3.default)(this, TableInsertion);

  /**
   * @type {Constructor.<Model>}
   */
  this.modelClass = modelClass;

  /**
   * @type {boolean}
   */
  this.isJoinTableInsertion = isJoinTableInsertion;

  /**
   * @type {Array.<Model>}
   */
  this.models = [];

  /**
   * @type {Array.<Boolean>}
   */
  this.isInputModel = [];
};

exports.default = TableInsertion;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlSW5zZXJ0aW9uLmpzIl0sIm5hbWVzIjpbIlRhYmxlSW5zZXJ0aW9uIiwibW9kZWxDbGFzcyIsImlzSm9pblRhYmxlSW5zZXJ0aW9uIiwibW9kZWxzIiwiaXNJbnB1dE1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQXFCQSxjLEdBRW5CLHdCQUFZQyxVQUFaLEVBQXdCQyxvQkFBeEIsRUFBOEM7QUFBQTs7QUFDNUM7OztBQUdBLE9BQUtELFVBQUwsR0FBa0JBLFVBQWxCOztBQUVBOzs7QUFHQSxPQUFLQyxvQkFBTCxHQUE0QkEsb0JBQTVCOztBQUVBOzs7QUFHQSxPQUFLQyxNQUFMLEdBQWMsRUFBZDs7QUFFQTs7O0FBR0EsT0FBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNELEM7O2tCQXRCa0JKLGMiLCJmaWxlIjoiVGFibGVJbnNlcnRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZUluc2VydGlvbiB7XG5cbiAgY29uc3RydWN0b3IobW9kZWxDbGFzcywgaXNKb2luVGFibGVJbnNlcnRpb24pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Q29uc3RydWN0b3IuPE1vZGVsPn1cbiAgICAgKi9cbiAgICB0aGlzLm1vZGVsQ2xhc3MgPSBtb2RlbENsYXNzO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5pc0pvaW5UYWJsZUluc2VydGlvbiA9IGlzSm9pblRhYmxlSW5zZXJ0aW9uO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxNb2RlbD59XG4gICAgICovXG4gICAgdGhpcy5tb2RlbHMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBcnJheS48Qm9vbGVhbj59XG4gICAgICovXG4gICAgdGhpcy5pc0lucHV0TW9kZWwgPSBbXTtcbiAgfVxufSJdfQ==