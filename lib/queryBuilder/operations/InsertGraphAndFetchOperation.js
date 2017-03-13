'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _DelegateOperation2 = require('./DelegateOperation');

var _DelegateOperation3 = _interopRequireDefault(_DelegateOperation2);

var _RelationExpression = require('../RelationExpression');

var _RelationExpression2 = _interopRequireDefault(_RelationExpression);

var _InsertGraphOperation = require('./InsertGraphOperation');

var _InsertGraphOperation2 = _interopRequireDefault(_InsertGraphOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InsertGraphAndFetchOperation = function (_DelegateOperation) {
  (0, _inherits3.default)(InsertGraphAndFetchOperation, _DelegateOperation);

  function InsertGraphAndFetchOperation(name, opt) {
    (0, _classCallCheck3.default)(this, InsertGraphAndFetchOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _DelegateOperation.call(this, name, opt));

    if (!_this.delegate.is(_InsertGraphOperation2.default)) {
      throw new Error('Invalid delegate');
    }
    return _this;
  }

  InsertGraphAndFetchOperation.prototype.onAfterInternal = function onAfterInternal(builder) {
    var _this2 = this;

    var eager = _RelationExpression2.default.fromGraph(this.models);
    var modelClass = this.models[0].constructor;
    var ids = new Array(this.models.length);

    for (var i = 0, l = this.models.length; i < l; ++i) {
      ids[i] = this.models[i].$id();
    }

    return modelClass.query().childQueryOf(builder).whereIn(modelClass.getFullIdColumn(), ids).eager(eager).then(function (models) {
      return _this2.isArray ? models : models[0] || null;
    });
  };

  (0, _createClass3.default)(InsertGraphAndFetchOperation, [{
    key: 'models',
    get: function get() {
      return this.delegate.models;
    }
  }, {
    key: 'isArray',
    get: function get() {
      return this.delegate.isArray;
    }
  }]);
  return InsertGraphAndFetchOperation;
}(_DelegateOperation3.default);

exports.default = InsertGraphAndFetchOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluc2VydEdyYXBoQW5kRmV0Y2hPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiSW5zZXJ0R3JhcGhBbmRGZXRjaE9wZXJhdGlvbiIsIm5hbWUiLCJvcHQiLCJkZWxlZ2F0ZSIsImlzIiwiRXJyb3IiLCJvbkFmdGVySW50ZXJuYWwiLCJidWlsZGVyIiwiZWFnZXIiLCJmcm9tR3JhcGgiLCJtb2RlbHMiLCJtb2RlbENsYXNzIiwiY29uc3RydWN0b3IiLCJpZHMiLCJBcnJheSIsImxlbmd0aCIsImkiLCJsIiwiJGlkIiwicXVlcnkiLCJjaGlsZFF1ZXJ5T2YiLCJ3aGVyZUluIiwiZ2V0RnVsbElkQ29sdW1uIiwidGhlbiIsImlzQXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLDRCOzs7QUFFbkIsd0NBQVlDLElBQVosRUFBa0JDLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsK0RBQ3JCLDhCQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBR3JCLFFBQUksQ0FBQyxNQUFLQyxRQUFMLENBQWNDLEVBQWQsZ0NBQUwsRUFBNkM7QUFDM0MsWUFBTSxJQUFJQyxLQUFKLENBQVUsa0JBQVYsQ0FBTjtBQUNEO0FBTG9CO0FBTXRCOzt5Q0FVREMsZSw0QkFBZ0JDLE8sRUFBUztBQUFBOztBQUN2QixRQUFNQyxRQUFRLDZCQUFtQkMsU0FBbkIsQ0FBNkIsS0FBS0MsTUFBbEMsQ0FBZDtBQUNBLFFBQU1DLGFBQWEsS0FBS0QsTUFBTCxDQUFZLENBQVosRUFBZUUsV0FBbEM7QUFDQSxRQUFNQyxNQUFNLElBQUlDLEtBQUosQ0FBVSxLQUFLSixNQUFMLENBQVlLLE1BQXRCLENBQVo7O0FBRUEsU0FBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsSUFBSSxLQUFLUCxNQUFMLENBQVlLLE1BQWhDLEVBQXdDQyxJQUFJQyxDQUE1QyxFQUErQyxFQUFFRCxDQUFqRCxFQUFvRDtBQUNsREgsVUFBSUcsQ0FBSixJQUFTLEtBQUtOLE1BQUwsQ0FBWU0sQ0FBWixFQUFlRSxHQUFmLEVBQVQ7QUFDRDs7QUFFRCxXQUFPUCxXQUNKUSxLQURJLEdBRUpDLFlBRkksQ0FFU2IsT0FGVCxFQUdKYyxPQUhJLENBR0lWLFdBQVdXLGVBQVgsRUFISixFQUdrQ1QsR0FIbEMsRUFJSkwsS0FKSSxDQUlFQSxLQUpGLEVBS0plLElBTEksQ0FLQyxrQkFBVTtBQUNkLGFBQU8sT0FBS0MsT0FBTCxHQUFlZCxNQUFmLEdBQXlCQSxPQUFPLENBQVAsS0FBYSxJQUE3QztBQUNELEtBUEksQ0FBUDtBQVFELEc7Ozs7d0JBekJZO0FBQ1gsYUFBTyxLQUFLUCxRQUFMLENBQWNPLE1BQXJCO0FBQ0Q7Ozt3QkFFYTtBQUNaLGFBQU8sS0FBS1AsUUFBTCxDQUFjcUIsT0FBckI7QUFDRDs7Ozs7a0JBaEJrQnhCLDRCIiwiZmlsZSI6Ikluc2VydEdyYXBoQW5kRmV0Y2hPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVsZWdhdGVPcGVyYXRpb24gZnJvbSAnLi9EZWxlZ2F0ZU9wZXJhdGlvbic7XG5pbXBvcnQgUmVsYXRpb25FeHByZXNzaW9uIGZyb20gJy4uL1JlbGF0aW9uRXhwcmVzc2lvbic7XG5pbXBvcnQgSW5zZXJ0R3JhcGhPcGVyYXRpb24gZnJvbSAnLi9JbnNlcnRHcmFwaE9wZXJhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc2VydEdyYXBoQW5kRmV0Y2hPcGVyYXRpb24gZXh0ZW5kcyBEZWxlZ2F0ZU9wZXJhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgb3B0KSB7XG4gICAgc3VwZXIobmFtZSwgb3B0KTtcblxuICAgIGlmICghdGhpcy5kZWxlZ2F0ZS5pcyhJbnNlcnRHcmFwaE9wZXJhdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkZWxlZ2F0ZScpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBtb2RlbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubW9kZWxzO1xuICB9XG5cbiAgZ2V0IGlzQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuaXNBcnJheTtcbiAgfVxuXG4gIG9uQWZ0ZXJJbnRlcm5hbChidWlsZGVyKSB7XG4gICAgY29uc3QgZWFnZXIgPSBSZWxhdGlvbkV4cHJlc3Npb24uZnJvbUdyYXBoKHRoaXMubW9kZWxzKTtcbiAgICBjb25zdCBtb2RlbENsYXNzID0gdGhpcy5tb2RlbHNbMF0uY29uc3RydWN0b3I7XG4gICAgY29uc3QgaWRzID0gbmV3IEFycmF5KHRoaXMubW9kZWxzLmxlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMubW9kZWxzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgaWRzW2ldID0gdGhpcy5tb2RlbHNbaV0uJGlkKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZGVsQ2xhc3NcbiAgICAgIC5xdWVyeSgpXG4gICAgICAuY2hpbGRRdWVyeU9mKGJ1aWxkZXIpXG4gICAgICAud2hlcmVJbihtb2RlbENsYXNzLmdldEZ1bGxJZENvbHVtbigpLCBpZHMpXG4gICAgICAuZWFnZXIoZWFnZXIpXG4gICAgICAudGhlbihtb2RlbHMgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0FycmF5ID8gbW9kZWxzIDogKG1vZGVsc1swXSB8fCBudWxsKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbiJdfQ==