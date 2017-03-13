"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManyToManyConnection = function ManyToManyConnection(node, relation) {
  (0, _classCallCheck3.default)(this, ManyToManyConnection);

  /**
   * @type {DependencyNode}
   */
  this.node = node;

  /**
   * @type {DependencyNode}
   */
  this.refNode = null;

  /**
   * @type {Relation}
   */
  this.relation = relation;

  relation.omitExtraProps([node.model]);
};

exports.default = ManyToManyConnection;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hbnlUb01hbnlDb25uZWN0aW9uLmpzIl0sIm5hbWVzIjpbIk1hbnlUb01hbnlDb25uZWN0aW9uIiwibm9kZSIsInJlbGF0aW9uIiwicmVmTm9kZSIsIm9taXRFeHRyYVByb3BzIiwibW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFBcUJBLG9CLEdBRW5CLDhCQUFZQyxJQUFaLEVBQWtCQyxRQUFsQixFQUE0QjtBQUFBOztBQUMxQjs7O0FBR0EsT0FBS0QsSUFBTCxHQUFZQSxJQUFaOztBQUVBOzs7QUFHQSxPQUFLRSxPQUFMLEdBQWUsSUFBZjs7QUFFQTs7O0FBR0EsT0FBS0QsUUFBTCxHQUFnQkEsUUFBaEI7O0FBRUFBLFdBQVNFLGNBQVQsQ0FBd0IsQ0FBQ0gsS0FBS0ksS0FBTixDQUF4QjtBQUNELEM7O2tCQW5Ca0JMLG9CIiwiZmlsZSI6Ik1hbnlUb01hbnlDb25uZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFueVRvTWFueUNvbm5lY3Rpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5vZGUsIHJlbGF0aW9uKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0RlcGVuZGVuY3lOb2RlfVxuICAgICAqL1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7RGVwZW5kZW5jeU5vZGV9XG4gICAgICovXG4gICAgdGhpcy5yZWZOb2RlID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtSZWxhdGlvbn1cbiAgICAgKi9cbiAgICB0aGlzLnJlbGF0aW9uID0gcmVsYXRpb247XG5cbiAgICByZWxhdGlvbi5vbWl0RXh0cmFQcm9wcyhbbm9kZS5tb2RlbF0pO1xuICB9XG5cbn0iXX0=