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

var _QueryBuilderOperation = require('./QueryBuilderOperation');

var _QueryBuilderOperation2 = _interopRequireDefault(_QueryBuilderOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JoinRelationOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(JoinRelationOperation, _QueryBuilderOperatio);

  function JoinRelationOperation(name, opt) {
    (0, _classCallCheck3.default)(this, JoinRelationOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.call(this, name, opt));

    _this.joinOperation = opt.joinOperation;
    _this.relationName = null;
    _this.callOpt = null;
    return _this;
  }

  JoinRelationOperation.prototype.call = function call(builder, args) {
    this.relationName = args[0];
    this.callOpt = args[1] || {};
    return true;
  };

  JoinRelationOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    var relation = builder.modelClass().getRelation(this.relationName);
    var alias = null;

    if (this.callOpt.alias === false) {
      alias = relation.relatedModelClass.tableName;
    } else if (this.callOpt.alias === true || !this.callOpt.alias) {
      alias = relation.name;
    } else if (_lodash2.default.isString(this.callOpt.alias)) {
      alias = this.callOpt.alias;
    }

    relation.join(builder, {
      joinOperation: this.joinOperation,
      relatedTableAlias: alias
    });
  };

  return JoinRelationOperation;
}(_QueryBuilderOperation2.default);

exports.default = JoinRelationOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpvaW5SZWxhdGlvbk9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJKb2luUmVsYXRpb25PcGVyYXRpb24iLCJuYW1lIiwib3B0Iiwiam9pbk9wZXJhdGlvbiIsInJlbGF0aW9uTmFtZSIsImNhbGxPcHQiLCJjYWxsIiwiYnVpbGRlciIsImFyZ3MiLCJvbkJlZm9yZUJ1aWxkIiwicmVsYXRpb24iLCJtb2RlbENsYXNzIiwiZ2V0UmVsYXRpb24iLCJhbGlhcyIsInJlbGF0ZWRNb2RlbENsYXNzIiwidGFibGVOYW1lIiwiaXNTdHJpbmciLCJqb2luIiwicmVsYXRlZFRhYmxlQWxpYXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLHFCOzs7QUFFbkIsaUNBQVlDLElBQVosRUFBa0JDLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsK0RBQ3JCLGlDQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBR3JCLFVBQUtDLGFBQUwsR0FBcUJELElBQUlDLGFBQXpCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixJQUFwQjtBQUNBLFVBQUtDLE9BQUwsR0FBZSxJQUFmO0FBTHFCO0FBTXRCOztrQ0FFREMsSSxpQkFBS0MsTyxFQUFTQyxJLEVBQU07QUFDbEIsU0FBS0osWUFBTCxHQUFvQkksS0FBSyxDQUFMLENBQXBCO0FBQ0EsU0FBS0gsT0FBTCxHQUFlRyxLQUFLLENBQUwsS0FBVyxFQUExQjtBQUNBLFdBQU8sSUFBUDtBQUNELEc7O2tDQUVEQyxhLDBCQUFjRixPLEVBQVM7QUFDckIsUUFBTUcsV0FBV0gsUUFBUUksVUFBUixHQUFxQkMsV0FBckIsQ0FBaUMsS0FBS1IsWUFBdEMsQ0FBakI7QUFDQSxRQUFJUyxRQUFRLElBQVo7O0FBRUEsUUFBSSxLQUFLUixPQUFMLENBQWFRLEtBQWIsS0FBdUIsS0FBM0IsRUFBa0M7QUFDaENBLGNBQVFILFNBQVNJLGlCQUFULENBQTJCQyxTQUFuQztBQUNELEtBRkQsTUFFTyxJQUFJLEtBQUtWLE9BQUwsQ0FBYVEsS0FBYixLQUF1QixJQUF2QixJQUErQixDQUFDLEtBQUtSLE9BQUwsQ0FBYVEsS0FBakQsRUFBd0Q7QUFDN0RBLGNBQVFILFNBQVNULElBQWpCO0FBQ0QsS0FGTSxNQUVBLElBQUksaUJBQUVlLFFBQUYsQ0FBVyxLQUFLWCxPQUFMLENBQWFRLEtBQXhCLENBQUosRUFBb0M7QUFDekNBLGNBQVEsS0FBS1IsT0FBTCxDQUFhUSxLQUFyQjtBQUNEOztBQUVESCxhQUFTTyxJQUFULENBQWNWLE9BQWQsRUFBdUI7QUFDckJKLHFCQUFlLEtBQUtBLGFBREM7QUFFckJlLHlCQUFtQkw7QUFGRSxLQUF2QjtBQUlELEc7Ozs7O2tCQWhDa0JiLHFCIiwiZmlsZSI6IkpvaW5SZWxhdGlvbk9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIGZyb20gJy4vUXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9pblJlbGF0aW9uT3BlcmF0aW9uIGV4dGVuZHMgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHQpIHtcbiAgICBzdXBlcihuYW1lLCBvcHQpO1xuXG4gICAgdGhpcy5qb2luT3BlcmF0aW9uID0gb3B0LmpvaW5PcGVyYXRpb247XG4gICAgdGhpcy5yZWxhdGlvbk5hbWUgPSBudWxsO1xuICAgIHRoaXMuY2FsbE9wdCA9IG51bGw7XG4gIH1cblxuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICB0aGlzLnJlbGF0aW9uTmFtZSA9IGFyZ3NbMF07XG4gICAgdGhpcy5jYWxsT3B0ID0gYXJnc1sxXSB8fCB7fTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG9uQmVmb3JlQnVpbGQoYnVpbGRlcikge1xuICAgIGNvbnN0IHJlbGF0aW9uID0gYnVpbGRlci5tb2RlbENsYXNzKCkuZ2V0UmVsYXRpb24odGhpcy5yZWxhdGlvbk5hbWUpO1xuICAgIGxldCBhbGlhcyA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5jYWxsT3B0LmFsaWFzID09PSBmYWxzZSkge1xuICAgICAgYWxpYXMgPSByZWxhdGlvbi5yZWxhdGVkTW9kZWxDbGFzcy50YWJsZU5hbWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNhbGxPcHQuYWxpYXMgPT09IHRydWUgfHwgIXRoaXMuY2FsbE9wdC5hbGlhcykge1xuICAgICAgYWxpYXMgPSByZWxhdGlvbi5uYW1lO1xuICAgIH0gZWxzZSBpZiAoXy5pc1N0cmluZyh0aGlzLmNhbGxPcHQuYWxpYXMpKSB7XG4gICAgICBhbGlhcyA9IHRoaXMuY2FsbE9wdC5hbGlhcztcbiAgICB9XG5cbiAgICByZWxhdGlvbi5qb2luKGJ1aWxkZXIsIHtcbiAgICAgIGpvaW5PcGVyYXRpb246IHRoaXMuam9pbk9wZXJhdGlvbixcbiAgICAgIHJlbGF0ZWRUYWJsZUFsaWFzOiBhbGlhc1xuICAgIH0pO1xuICB9XG59XG4iXX0=