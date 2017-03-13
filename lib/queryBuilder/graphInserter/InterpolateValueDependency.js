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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Dependency2 = require('./Dependency');

var _Dependency3 = _interopRequireDefault(_Dependency2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InterpolateValueDependency = function (_Dependency) {
  (0, _inherits3.default)(InterpolateValueDependency, _Dependency);

  function InterpolateValueDependency(node, path, refProp, match, inverse) {
    (0, _classCallCheck3.default)(this, InterpolateValueDependency);

    /**
     * @type {Array.<string>}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, _Dependency.call(this, node));

    _this.path = path.slice();

    /**
     * @type {string}
     */
    _this.refProp = refProp;

    /**
     * @type {string}
     */
    _this.match = match;

    /**
     * @type boolean
     */
    _this.inverse = inverse;
    return _this;
  }

  InterpolateValueDependency.prototype.resolve = function resolve(model) {
    if (!this.inverse) {
      var value = _lodash2.default.get(model, this.path);
      value = value.replace(this.match, this.node.model[this.refProp]);
      _lodash2.default.set(model, this.path, value);
    } else {
      var _value = _lodash2.default.get(this.node.model, this.path);
      _value = _value.replace(this.match, model[this.refProp]);
      _lodash2.default.set(this.node.model, this.path, _value);
    }
  };

  return InterpolateValueDependency;
}(_Dependency3.default);

exports.default = InterpolateValueDependency;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkludGVycG9sYXRlVmFsdWVEZXBlbmRlbmN5LmpzIl0sIm5hbWVzIjpbIkludGVycG9sYXRlVmFsdWVEZXBlbmRlbmN5Iiwibm9kZSIsInBhdGgiLCJyZWZQcm9wIiwibWF0Y2giLCJpbnZlcnNlIiwic2xpY2UiLCJyZXNvbHZlIiwibW9kZWwiLCJ2YWx1ZSIsImdldCIsInJlcGxhY2UiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLDBCOzs7QUFFbkIsc0NBQVlDLElBQVosRUFBa0JDLElBQWxCLEVBQXdCQyxPQUF4QixFQUFpQ0MsS0FBakMsRUFBd0NDLE9BQXhDLEVBQWlEO0FBQUE7O0FBRy9DOzs7QUFIK0MsK0RBQy9DLHVCQUFNSixJQUFOLENBRCtDOztBQU0vQyxVQUFLQyxJQUFMLEdBQVlBLEtBQUtJLEtBQUwsRUFBWjs7QUFFQTs7O0FBR0EsVUFBS0gsT0FBTCxHQUFlQSxPQUFmOztBQUVBOzs7QUFHQSxVQUFLQyxLQUFMLEdBQWFBLEtBQWI7O0FBRUE7OztBQUdBLFVBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQXJCK0M7QUFzQmhEOzt1Q0FFREUsTyxvQkFBUUMsSyxFQUFPO0FBQ2IsUUFBSSxDQUFDLEtBQUtILE9BQVYsRUFBbUI7QUFDakIsVUFBSUksUUFBUSxpQkFBRUMsR0FBRixDQUFNRixLQUFOLEVBQWEsS0FBS04sSUFBbEIsQ0FBWjtBQUNBTyxjQUFRQSxNQUFNRSxPQUFOLENBQWMsS0FBS1AsS0FBbkIsRUFBMEIsS0FBS0gsSUFBTCxDQUFVTyxLQUFWLENBQWdCLEtBQUtMLE9BQXJCLENBQTFCLENBQVI7QUFDQSx1QkFBRVMsR0FBRixDQUFNSixLQUFOLEVBQWEsS0FBS04sSUFBbEIsRUFBd0JPLEtBQXhCO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsVUFBSUEsU0FBUSxpQkFBRUMsR0FBRixDQUFNLEtBQUtULElBQUwsQ0FBVU8sS0FBaEIsRUFBdUIsS0FBS04sSUFBNUIsQ0FBWjtBQUNBTyxlQUFRQSxPQUFNRSxPQUFOLENBQWMsS0FBS1AsS0FBbkIsRUFBMEJJLE1BQU0sS0FBS0wsT0FBWCxDQUExQixDQUFSO0FBQ0EsdUJBQUVTLEdBQUYsQ0FBTSxLQUFLWCxJQUFMLENBQVVPLEtBQWhCLEVBQXVCLEtBQUtOLElBQTVCLEVBQWtDTyxNQUFsQztBQUNEO0FBQ0YsRzs7Ozs7a0JBcENrQlQsMEIiLCJmaWxlIjoiSW50ZXJwb2xhdGVWYWx1ZURlcGVuZGVuY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IERlcGVuZGVuY3kgZnJvbSAnLi9EZXBlbmRlbmN5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJwb2xhdGVWYWx1ZURlcGVuZGVuY3kgZXh0ZW5kcyBEZXBlbmRlbmN5IHtcblxuICBjb25zdHJ1Y3Rvcihub2RlLCBwYXRoLCByZWZQcm9wLCBtYXRjaCwgaW52ZXJzZSkge1xuICAgIHN1cGVyKG5vZGUpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fVxuICAgICAqL1xuICAgIHRoaXMucGF0aCA9IHBhdGguc2xpY2UoKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5yZWZQcm9wID0gcmVmUHJvcDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5tYXRjaCA9IG1hdGNoO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgYm9vbGVhblxuICAgICAqL1xuICAgIHRoaXMuaW52ZXJzZSA9IGludmVyc2U7XG4gIH1cblxuICByZXNvbHZlKG1vZGVsKSB7XG4gICAgaWYgKCF0aGlzLmludmVyc2UpIHtcbiAgICAgIGxldCB2YWx1ZSA9IF8uZ2V0KG1vZGVsLCB0aGlzLnBhdGgpO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHRoaXMubWF0Y2gsIHRoaXMubm9kZS5tb2RlbFt0aGlzLnJlZlByb3BdKTtcbiAgICAgIF8uc2V0KG1vZGVsLCB0aGlzLnBhdGgsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHZhbHVlID0gXy5nZXQodGhpcy5ub2RlLm1vZGVsLCB0aGlzLnBhdGgpO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHRoaXMubWF0Y2gsIG1vZGVsW3RoaXMucmVmUHJvcF0pO1xuICAgICAgXy5zZXQodGhpcy5ub2RlLm1vZGVsLCB0aGlzLnBhdGgsIHZhbHVlKTtcbiAgICB9XG4gIH1cbn0iXX0=