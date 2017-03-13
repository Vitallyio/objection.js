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

var _InsertOperation2 = require('./InsertOperation');

var _InsertOperation3 = _interopRequireDefault(_InsertOperation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InstanceInsertOperation = function (_InsertOperation) {
  (0, _inherits3.default)(InstanceInsertOperation, _InsertOperation);

  function InstanceInsertOperation(name, opt) {
    (0, _classCallCheck3.default)(this, InstanceInsertOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _InsertOperation.call(this, name, opt));

    _this.instance = opt.instance;
    return _this;
  }

  InstanceInsertOperation.prototype.call = function call(builder, args) {
    this.isArray = false;
    this.models = [this.instance];
    return true;
  };

  return InstanceInsertOperation;
}(_InsertOperation3.default);

exports.default = InstanceInsertOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluc3RhbmNlSW5zZXJ0T3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIkluc3RhbmNlSW5zZXJ0T3BlcmF0aW9uIiwibmFtZSIsIm9wdCIsImluc3RhbmNlIiwiY2FsbCIsImJ1aWxkZXIiLCJhcmdzIiwiaXNBcnJheSIsIm1vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLHVCOzs7QUFFbkIsbUNBQVlDLElBQVosRUFBa0JDLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsK0RBQ3JCLDRCQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBRXJCLFVBQUtDLFFBQUwsR0FBZ0JELElBQUlDLFFBQXBCO0FBRnFCO0FBR3RCOztvQ0FFREMsSSxpQkFBS0MsTyxFQUFTQyxJLEVBQU07QUFDbEIsU0FBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBQyxLQUFLTCxRQUFOLENBQWQ7QUFDQSxXQUFPLElBQVA7QUFDRCxHOzs7OztrQkFYa0JILHVCIiwiZmlsZSI6Ikluc3RhbmNlSW5zZXJ0T3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEluc2VydE9wZXJhdGlvbiBmcm9tICcuL0luc2VydE9wZXJhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc3RhbmNlSW5zZXJ0T3BlcmF0aW9uIGV4dGVuZHMgSW5zZXJ0T3BlcmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHQpIHtcbiAgICBzdXBlcihuYW1lLCBvcHQpO1xuICAgIHRoaXMuaW5zdGFuY2UgPSBvcHQuaW5zdGFuY2U7XG4gIH1cblxuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICB0aGlzLmlzQXJyYXkgPSBmYWxzZTtcbiAgICB0aGlzLm1vZGVscyA9IFt0aGlzLmluc3RhbmNlXTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufSJdfQ==