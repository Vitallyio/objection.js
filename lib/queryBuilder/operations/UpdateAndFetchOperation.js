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

var _UpdateOperation = require('./UpdateOperation');

var _UpdateOperation2 = _interopRequireDefault(_UpdateOperation);

var _promiseUtils = require('../../utils/promiseUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UpdateAndFetchOperation = function (_DelegateOperation) {
  (0, _inherits3.default)(UpdateAndFetchOperation, _DelegateOperation);

  function UpdateAndFetchOperation(name, opt) {
    (0, _classCallCheck3.default)(this, UpdateAndFetchOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _DelegateOperation.call(this, name, opt));

    if (!_this.delegate.is(_UpdateOperation2.default)) {
      throw new Error('Invalid delegate');
    }

    _this.id = null;
    return _this;
  }

  UpdateAndFetchOperation.prototype.call = function call(builder, args) {
    this.id = args[0];
    return this.delegate.call(builder, args.slice(1));
  };

  UpdateAndFetchOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    _DelegateOperation.prototype.onBeforeBuild.call(this, builder);
    builder.whereComposite(builder.modelClass().getFullIdColumn(), this.id);
  };

  UpdateAndFetchOperation.prototype.onAfterInternal = function onAfterInternal(builder, numUpdated) {
    var _this2 = this;

    if (numUpdated == 0) {
      // If nothing was updated, we should fetch nothing.
      return (0, _promiseUtils.afterReturn)(_DelegateOperation.prototype.onAfterInternal.call(this, builder, numUpdated), undefined);
    }

    return builder.modelClass().query().childQueryOf(builder).whereComposite(builder.modelClass().getFullIdColumn(), this.id).first().then(function (fetched) {
      var retVal = null;

      if (fetched) {
        _this2.model.$set(fetched);
        retVal = _this2.model;
      }

      return (0, _promiseUtils.afterReturn)(_DelegateOperation.prototype.onAfterInternal.call(_this2, builder, numUpdated), retVal);
    });
  };

  (0, _createClass3.default)(UpdateAndFetchOperation, [{
    key: 'model',
    get: function get() {
      return this.delegate.model;
    }
  }]);
  return UpdateAndFetchOperation;
}(_DelegateOperation3.default);

exports.default = UpdateAndFetchOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwZGF0ZUFuZEZldGNoT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIlVwZGF0ZUFuZEZldGNoT3BlcmF0aW9uIiwibmFtZSIsIm9wdCIsImRlbGVnYXRlIiwiaXMiLCJFcnJvciIsImlkIiwiY2FsbCIsImJ1aWxkZXIiLCJhcmdzIiwic2xpY2UiLCJvbkJlZm9yZUJ1aWxkIiwid2hlcmVDb21wb3NpdGUiLCJtb2RlbENsYXNzIiwiZ2V0RnVsbElkQ29sdW1uIiwib25BZnRlckludGVybmFsIiwibnVtVXBkYXRlZCIsInVuZGVmaW5lZCIsInF1ZXJ5IiwiY2hpbGRRdWVyeU9mIiwiZmlyc3QiLCJ0aGVuIiwicmV0VmFsIiwiZmV0Y2hlZCIsIm1vZGVsIiwiJHNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7SUFFcUJBLHVCOzs7QUFFbkIsbUNBQVlDLElBQVosRUFBa0JDLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsK0RBQ3JCLDhCQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBR3JCLFFBQUksQ0FBQyxNQUFLQyxRQUFMLENBQWNDLEVBQWQsMkJBQUwsRUFBd0M7QUFDdEMsWUFBTSxJQUFJQyxLQUFKLENBQVUsa0JBQVYsQ0FBTjtBQUNEOztBQUVELFVBQUtDLEVBQUwsR0FBVSxJQUFWO0FBUHFCO0FBUXRCOztvQ0FNREMsSSxpQkFBS0MsTyxFQUFTQyxJLEVBQU07QUFDbEIsU0FBS0gsRUFBTCxHQUFVRyxLQUFLLENBQUwsQ0FBVjtBQUNBLFdBQU8sS0FBS04sUUFBTCxDQUFjSSxJQUFkLENBQW1CQyxPQUFuQixFQUE0QkMsS0FBS0MsS0FBTCxDQUFXLENBQVgsQ0FBNUIsQ0FBUDtBQUNELEc7O29DQUVEQyxhLDBCQUFjSCxPLEVBQVM7QUFDckIsaUNBQU1HLGFBQU4sWUFBb0JILE9BQXBCO0FBQ0FBLFlBQVFJLGNBQVIsQ0FBdUJKLFFBQVFLLFVBQVIsR0FBcUJDLGVBQXJCLEVBQXZCLEVBQStELEtBQUtSLEVBQXBFO0FBQ0QsRzs7b0NBRURTLGUsNEJBQWdCUCxPLEVBQVNRLFUsRUFBWTtBQUFBOztBQUNuQyxRQUFJQSxjQUFjLENBQWxCLEVBQXFCO0FBQ25CO0FBQ0EsYUFBTywrQkFBWSw2QkFBTUQsZUFBTixZQUFzQlAsT0FBdEIsRUFBK0JRLFVBQS9CLENBQVosRUFBd0RDLFNBQXhELENBQVA7QUFDRDs7QUFFRCxXQUFPVCxRQUFRSyxVQUFSLEdBQ0pLLEtBREksR0FFSkMsWUFGSSxDQUVTWCxPQUZULEVBR0pJLGNBSEksQ0FHV0osUUFBUUssVUFBUixHQUFxQkMsZUFBckIsRUFIWCxFQUdtRCxLQUFLUixFQUh4RCxFQUlKYyxLQUpJLEdBS0pDLElBTEksQ0FLQyxtQkFBVztBQUNmLFVBQUlDLFNBQVMsSUFBYjs7QUFFQSxVQUFJQyxPQUFKLEVBQWE7QUFDWCxlQUFLQyxLQUFMLENBQVdDLElBQVgsQ0FBZ0JGLE9BQWhCO0FBQ0FELGlCQUFTLE9BQUtFLEtBQWQ7QUFDRDs7QUFFRCxhQUFPLCtCQUFZLDZCQUFNVCxlQUFOLGNBQXNCUCxPQUF0QixFQUErQlEsVUFBL0IsQ0FBWixFQUF3RE0sTUFBeEQsQ0FBUDtBQUNELEtBZEksQ0FBUDtBQWVELEc7Ozs7d0JBbkNXO0FBQ1YsYUFBTyxLQUFLbkIsUUFBTCxDQUFjcUIsS0FBckI7QUFDRDs7Ozs7a0JBZGtCeEIsdUIiLCJmaWxlIjoiVXBkYXRlQW5kRmV0Y2hPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVsZWdhdGVPcGVyYXRpb24gZnJvbSAnLi9EZWxlZ2F0ZU9wZXJhdGlvbic7XG5pbXBvcnQgVXBkYXRlT3BlcmF0aW9uIGZyb20gJy4vVXBkYXRlT3BlcmF0aW9uJztcbmltcG9ydCB7YWZ0ZXJSZXR1cm59IGZyb20gJy4uLy4uL3V0aWxzL3Byb21pc2VVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwZGF0ZUFuZEZldGNoT3BlcmF0aW9uIGV4dGVuZHMgRGVsZWdhdGVPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG5cbiAgICBpZiAoIXRoaXMuZGVsZWdhdGUuaXMoVXBkYXRlT3BlcmF0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGRlbGVnYXRlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5pZCA9IG51bGw7XG4gIH1cblxuICBnZXQgbW9kZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubW9kZWw7XG4gIH1cblxuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICB0aGlzLmlkID0gYXJnc1swXTtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jYWxsKGJ1aWxkZXIsIGFyZ3Muc2xpY2UoMSkpO1xuICB9XG5cbiAgb25CZWZvcmVCdWlsZChidWlsZGVyKSB7XG4gICAgc3VwZXIub25CZWZvcmVCdWlsZChidWlsZGVyKTtcbiAgICBidWlsZGVyLndoZXJlQ29tcG9zaXRlKGJ1aWxkZXIubW9kZWxDbGFzcygpLmdldEZ1bGxJZENvbHVtbigpLCB0aGlzLmlkKTtcbiAgfVxuXG4gIG9uQWZ0ZXJJbnRlcm5hbChidWlsZGVyLCBudW1VcGRhdGVkKSB7XG4gICAgaWYgKG51bVVwZGF0ZWQgPT0gMCkge1xuICAgICAgLy8gSWYgbm90aGluZyB3YXMgdXBkYXRlZCwgd2Ugc2hvdWxkIGZldGNoIG5vdGhpbmcuXG4gICAgICByZXR1cm4gYWZ0ZXJSZXR1cm4oc3VwZXIub25BZnRlckludGVybmFsKGJ1aWxkZXIsIG51bVVwZGF0ZWQpLCB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHJldHVybiBidWlsZGVyLm1vZGVsQ2xhc3MoKVxuICAgICAgLnF1ZXJ5KClcbiAgICAgIC5jaGlsZFF1ZXJ5T2YoYnVpbGRlcilcbiAgICAgIC53aGVyZUNvbXBvc2l0ZShidWlsZGVyLm1vZGVsQ2xhc3MoKS5nZXRGdWxsSWRDb2x1bW4oKSwgdGhpcy5pZClcbiAgICAgIC5maXJzdCgpXG4gICAgICAudGhlbihmZXRjaGVkID0+IHtcbiAgICAgICAgbGV0IHJldFZhbCA9IG51bGw7XG5cbiAgICAgICAgaWYgKGZldGNoZWQpIHtcbiAgICAgICAgICB0aGlzLm1vZGVsLiRzZXQoZmV0Y2hlZCk7XG4gICAgICAgICAgcmV0VmFsID0gdGhpcy5tb2RlbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhZnRlclJldHVybihzdXBlci5vbkFmdGVySW50ZXJuYWwoYnVpbGRlciwgbnVtVXBkYXRlZCksIHJldFZhbCk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19