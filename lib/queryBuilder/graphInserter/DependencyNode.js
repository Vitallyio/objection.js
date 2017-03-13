"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DependencyNode = function DependencyNode(model, modelClass) {
  (0, _classCallCheck3.default)(this, DependencyNode);

  this.id = model[modelClass.uidProp];

  /**
   * @type {Model}
   */
  this.model = model;

  /**
   * @type {Constructor.<Model>}
   */
  this.modelClass = modelClass;

  /**
   * @type {Array.<Dependency>}
   */
  this.needs = [];

  /**
   * @type {Array.<Dependency>}
   */
  this.isNeededBy = [];

  /**
   * @type {Array.<ManyToManyConnection>}
   */
  this.manyToManyConnections = [];

  this.numHandledNeeds = 0;
  this.handled = false;
  this.visited = false;
  this.recursion = false;
};

exports.default = DependencyNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlcGVuZGVuY3lOb2RlLmpzIl0sIm5hbWVzIjpbIkRlcGVuZGVuY3lOb2RlIiwibW9kZWwiLCJtb2RlbENsYXNzIiwiaWQiLCJ1aWRQcm9wIiwibmVlZHMiLCJpc05lZWRlZEJ5IiwibWFueVRvTWFueUNvbm5lY3Rpb25zIiwibnVtSGFuZGxlZE5lZWRzIiwiaGFuZGxlZCIsInZpc2l0ZWQiLCJyZWN1cnNpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFBcUJBLGMsR0FFbkIsd0JBQVlDLEtBQVosRUFBbUJDLFVBQW5CLEVBQStCO0FBQUE7O0FBQzdCLE9BQUtDLEVBQUwsR0FBVUYsTUFBTUMsV0FBV0UsT0FBakIsQ0FBVjs7QUFFQTs7O0FBR0EsT0FBS0gsS0FBTCxHQUFhQSxLQUFiOztBQUVBOzs7QUFHQSxPQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjs7QUFFQTs7O0FBR0EsT0FBS0csS0FBTCxHQUFhLEVBQWI7O0FBRUE7OztBQUdBLE9BQUtDLFVBQUwsR0FBa0IsRUFBbEI7O0FBRUE7OztBQUdBLE9BQUtDLHFCQUFMLEdBQTZCLEVBQTdCOztBQUVBLE9BQUtDLGVBQUwsR0FBdUIsQ0FBdkI7QUFDQSxPQUFLQyxPQUFMLEdBQWUsS0FBZjtBQUNBLE9BQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0EsT0FBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNELEM7O2tCQWxDa0JYLGMiLCJmaWxlIjoiRGVwZW5kZW5jeU5vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBEZXBlbmRlbmN5Tm9kZSB7XG5cbiAgY29uc3RydWN0b3IobW9kZWwsIG1vZGVsQ2xhc3MpIHtcbiAgICB0aGlzLmlkID0gbW9kZWxbbW9kZWxDbGFzcy51aWRQcm9wXTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtNb2RlbH1cbiAgICAgKi9cbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Q29uc3RydWN0b3IuPE1vZGVsPn1cbiAgICAgKi9cbiAgICB0aGlzLm1vZGVsQ2xhc3MgPSBtb2RlbENsYXNzO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxEZXBlbmRlbmN5Pn1cbiAgICAgKi9cbiAgICB0aGlzLm5lZWRzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPERlcGVuZGVuY3k+fVxuICAgICAqL1xuICAgIHRoaXMuaXNOZWVkZWRCeSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxNYW55VG9NYW55Q29ubmVjdGlvbj59XG4gICAgICovXG4gICAgdGhpcy5tYW55VG9NYW55Q29ubmVjdGlvbnMgPSBbXTtcblxuICAgIHRoaXMubnVtSGFuZGxlZE5lZWRzID0gMDtcbiAgICB0aGlzLmhhbmRsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnZpc2l0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlY3Vyc2lvbiA9IGZhbHNlO1xuICB9XG5cbn0iXX0=