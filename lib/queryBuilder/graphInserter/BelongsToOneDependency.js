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

var BelongsToOneDependency = function (_Dependency) {
  (0, _inherits3.default)(BelongsToOneDependency, _Dependency);

  function BelongsToOneDependency(node, relation) {
    (0, _classCallCheck3.default)(this, BelongsToOneDependency);

    /**
     * @type {Relation}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, _Dependency.call(this, node));

    _this.relation = relation;
    return _this;
  }

  BelongsToOneDependency.prototype.resolve = function resolve(model) {
    for (var i = 0; i < this.relation.relatedProp.length; ++i) {
      this.node.model[this.relation.ownerProp[i]] = model[this.relation.relatedProp[i]];
    }
  };

  return BelongsToOneDependency;
}(_Dependency3.default);

exports.default = BelongsToOneDependency;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJlbG9uZ3NUb09uZURlcGVuZGVuY3kuanMiXSwibmFtZXMiOlsiQmVsb25nc1RvT25lRGVwZW5kZW5jeSIsIm5vZGUiLCJyZWxhdGlvbiIsInJlc29sdmUiLCJtb2RlbCIsImkiLCJyZWxhdGVkUHJvcCIsImxlbmd0aCIsIm93bmVyUHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLHNCOzs7QUFFbkIsa0NBQVlDLElBQVosRUFBa0JDLFFBQWxCLEVBQTRCO0FBQUE7O0FBRzFCOzs7QUFIMEIsK0RBQzFCLHVCQUFNRCxJQUFOLENBRDBCOztBQU0xQixVQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQU4wQjtBQU8zQjs7bUNBRURDLE8sb0JBQVFDLEssRUFBTztBQUNiLFNBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtILFFBQUwsQ0FBY0ksV0FBZCxDQUEwQkMsTUFBOUMsRUFBc0QsRUFBRUYsQ0FBeEQsRUFBMkQ7QUFDekQsV0FBS0osSUFBTCxDQUFVRyxLQUFWLENBQWdCLEtBQUtGLFFBQUwsQ0FBY00sU0FBZCxDQUF3QkgsQ0FBeEIsQ0FBaEIsSUFBOENELE1BQU0sS0FBS0YsUUFBTCxDQUFjSSxXQUFkLENBQTBCRCxDQUExQixDQUFOLENBQTlDO0FBQ0Q7QUFDRixHOzs7OztrQkFma0JMLHNCIiwiZmlsZSI6IkJlbG9uZ3NUb09uZURlcGVuZGVuY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVwZW5kZW5jeSBmcm9tICcuL0RlcGVuZGVuY3knO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZWxvbmdzVG9PbmVEZXBlbmRlbmN5IGV4dGVuZHMgRGVwZW5kZW5jeSB7XG5cbiAgY29uc3RydWN0b3Iobm9kZSwgcmVsYXRpb24pIHtcbiAgICBzdXBlcihub2RlKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtSZWxhdGlvbn1cbiAgICAgKi9cbiAgICB0aGlzLnJlbGF0aW9uID0gcmVsYXRpb247XG4gIH1cblxuICByZXNvbHZlKG1vZGVsKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJlbGF0aW9uLnJlbGF0ZWRQcm9wLmxlbmd0aDsgKytpKSB7XG4gICAgICB0aGlzLm5vZGUubW9kZWxbdGhpcy5yZWxhdGlvbi5vd25lclByb3BbaV1dID0gbW9kZWxbdGhpcy5yZWxhdGlvbi5yZWxhdGVkUHJvcFtpXV07XG4gICAgfVxuICB9XG59Il19