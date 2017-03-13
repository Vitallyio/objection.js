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

var _Dependency2 = require('./Dependency');

var _Dependency3 = _interopRequireDefault(_Dependency2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HasManyDependency = function (_Dependency) {
  (0, _inherits3.default)(HasManyDependency, _Dependency);

  function HasManyDependency(node, relation) {
    (0, _classCallCheck3.default)(this, HasManyDependency);

    /**
     * @type {Relation}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, _Dependency.call(this, node));

    _this.relation = relation;
    return _this;
  }

  HasManyDependency.prototype.resolve = function resolve(model) {
    for (var i = 0; i < this.relation.relatedProp.length; ++i) {
      this.node.model[this.relation.relatedProp[i]] = model[this.relation.ownerProp[i]];
    }
  };

  return HasManyDependency;
}(_Dependency3.default);

exports.default = HasManyDependency;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhhc01hbnlEZXBlbmRlbmN5LmpzIl0sIm5hbWVzIjpbIkhhc01hbnlEZXBlbmRlbmN5Iiwibm9kZSIsInJlbGF0aW9uIiwicmVzb2x2ZSIsIm1vZGVsIiwiaSIsInJlbGF0ZWRQcm9wIiwibGVuZ3RoIiwib3duZXJQcm9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsaUI7OztBQUVuQiw2QkFBWUMsSUFBWixFQUFrQkMsUUFBbEIsRUFBNEI7QUFBQTs7QUFHMUI7OztBQUgwQiwrREFDMUIsdUJBQU1ELElBQU4sQ0FEMEI7O0FBTTFCLFVBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBTjBCO0FBTzNCOzs4QkFFREMsTyxvQkFBUUMsSyxFQUFPO0FBQ2IsU0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS0gsUUFBTCxDQUFjSSxXQUFkLENBQTBCQyxNQUE5QyxFQUFzRCxFQUFFRixDQUF4RCxFQUEyRDtBQUN6RCxXQUFLSixJQUFMLENBQVVHLEtBQVYsQ0FBZ0IsS0FBS0YsUUFBTCxDQUFjSSxXQUFkLENBQTBCRCxDQUExQixDQUFoQixJQUFnREQsTUFBTSxLQUFLRixRQUFMLENBQWNNLFNBQWQsQ0FBd0JILENBQXhCLENBQU4sQ0FBaEQ7QUFDRDtBQUNGLEc7Ozs7O2tCQWZrQkwsaUIiLCJmaWxlIjoiSGFzTWFueURlcGVuZGVuY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVwZW5kZW5jeSBmcm9tICcuL0RlcGVuZGVuY3knO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNNYW55RGVwZW5kZW5jeSBleHRlbmRzIERlcGVuZGVuY3kge1xuXG4gIGNvbnN0cnVjdG9yKG5vZGUsIHJlbGF0aW9uKSB7XG4gICAgc3VwZXIobm9kZSk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7UmVsYXRpb259XG4gICAgICovXG4gICAgdGhpcy5yZWxhdGlvbiA9IHJlbGF0aW9uO1xuICB9XG5cbiAgcmVzb2x2ZShtb2RlbCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yZWxhdGlvbi5yZWxhdGVkUHJvcC5sZW5ndGg7ICsraSkge1xuICAgICAgdGhpcy5ub2RlLm1vZGVsW3RoaXMucmVsYXRpb24ucmVsYXRlZFByb3BbaV1dID0gbW9kZWxbdGhpcy5yZWxhdGlvbi5vd25lclByb3BbaV1dO1xuICAgIH1cbiAgfVxufSJdfQ==