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

var ReplaceValueDependency = function (_Dependency) {
  (0, _inherits3.default)(ReplaceValueDependency, _Dependency);

  function ReplaceValueDependency(node, path, refProp, inverse) {
    (0, _classCallCheck3.default)(this, ReplaceValueDependency);

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
     * @type boolean
     */
    _this.inverse = inverse;
    return _this;
  }

  ReplaceValueDependency.prototype.resolve = function resolve(model) {
    if (!this.inverse) {
      _lodash2.default.set(model, this.path, this.node.model[this.refProp]);
    } else {
      _lodash2.default.set(this.node.model, this.path, model[this.refProp]);
    }
  };

  return ReplaceValueDependency;
}(_Dependency3.default);

exports.default = ReplaceValueDependency;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcGxhY2VWYWx1ZURlcGVuZGVuY3kuanMiXSwibmFtZXMiOlsiUmVwbGFjZVZhbHVlRGVwZW5kZW5jeSIsIm5vZGUiLCJwYXRoIiwicmVmUHJvcCIsImludmVyc2UiLCJzbGljZSIsInJlc29sdmUiLCJtb2RlbCIsInNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsc0I7OztBQUVuQixrQ0FBWUMsSUFBWixFQUFrQkMsSUFBbEIsRUFBd0JDLE9BQXhCLEVBQWdDQyxPQUFoQyxFQUF5QztBQUFBOztBQUd2Qzs7O0FBSHVDLCtEQUN2Qyx1QkFBTUgsSUFBTixDQUR1Qzs7QUFNdkMsVUFBS0MsSUFBTCxHQUFZQSxLQUFLRyxLQUFMLEVBQVo7O0FBRUE7OztBQUdBLFVBQUtGLE9BQUwsR0FBZUEsT0FBZjs7QUFFQTs7O0FBR0EsVUFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBaEJ1QztBQWlCeEM7O21DQUVERSxPLG9CQUFRQyxLLEVBQU87QUFDYixRQUFJLENBQUMsS0FBS0gsT0FBVixFQUFtQjtBQUNqQix1QkFBRUksR0FBRixDQUFNRCxLQUFOLEVBQWEsS0FBS0wsSUFBbEIsRUFBd0IsS0FBS0QsSUFBTCxDQUFVTSxLQUFWLENBQWdCLEtBQUtKLE9BQXJCLENBQXhCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsdUJBQUVLLEdBQUYsQ0FBTSxLQUFLUCxJQUFMLENBQVVNLEtBQWhCLEVBQXVCLEtBQUtMLElBQTVCLEVBQWtDSyxNQUFNLEtBQUtKLE9BQVgsQ0FBbEM7QUFDRDtBQUNGLEc7Ozs7O2tCQTNCa0JILHNCIiwiZmlsZSI6IlJlcGxhY2VWYWx1ZURlcGVuZGVuY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IERlcGVuZGVuY3kgZnJvbSAnLi9EZXBlbmRlbmN5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwbGFjZVZhbHVlRGVwZW5kZW5jeSBleHRlbmRzIERlcGVuZGVuY3kge1xuXG4gIGNvbnN0cnVjdG9yKG5vZGUsIHBhdGgsIHJlZlByb3AsaW52ZXJzZSkge1xuICAgIHN1cGVyKG5vZGUpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fVxuICAgICAqL1xuICAgIHRoaXMucGF0aCA9IHBhdGguc2xpY2UoKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5yZWZQcm9wID0gcmVmUHJvcDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgKi9cbiAgICB0aGlzLmludmVyc2UgPSBpbnZlcnNlO1xuICB9XG5cbiAgcmVzb2x2ZShtb2RlbCkge1xuICAgIGlmICghdGhpcy5pbnZlcnNlKSB7XG4gICAgICBfLnNldChtb2RlbCwgdGhpcy5wYXRoLCB0aGlzLm5vZGUubW9kZWxbdGhpcy5yZWZQcm9wXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF8uc2V0KHRoaXMubm9kZS5tb2RlbCwgdGhpcy5wYXRoLCBtb2RlbFt0aGlzLnJlZlByb3BdKTtcbiAgICB9XG4gIH1cbn0iXX0=