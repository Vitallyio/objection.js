'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _QueryBuilderOperation = require('./QueryBuilderOperation');

var _QueryBuilderOperation2 = _interopRequireDefault(_QueryBuilderOperation);

var _dbUtils = require('../../utils/dbUtils');

var _ReferenceBuilder = require('../ReferenceBuilder');

var _ReferenceBuilder2 = _interopRequireDefault(_ReferenceBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryBuilderBase = null;
var JoinBuilder = null;

var WrappingQueryBuilderOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(WrappingQueryBuilderOperation, _QueryBuilderOperatio);

  function WrappingQueryBuilderOperation(name, opt) {
    (0, _classCallCheck3.default)(this, WrappingQueryBuilderOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.call(this, name, opt));

    _this.args = null;
    return _this;
  }

  WrappingQueryBuilderOperation.prototype.call = function call(builder, args) {
    var ret = wrapArgs(this, builder, args);
    this.args = args;
    return ret;
  };

  return WrappingQueryBuilderOperation;
}(_QueryBuilderOperation2.default);

exports.default = WrappingQueryBuilderOperation;


function wrapArgs(op, builder, args) {
  // Preventing cyclic deps
  QueryBuilderBase = QueryBuilderBase || requireQueryBuilderBase();

  var skipUndefined = builder.shouldSkipUndefined();
  var knex = builder.knex();

  for (var i = 0, l = args.length; i < l; ++i) {
    var arg = args[i];

    if (arg === undefined) {
      if (skipUndefined) {
        return false;
      } else {
        throw new Error('undefined passed as argument #' + l + ' for \'' + op.name + '\' operation. Call skipUndefined() method to ignore the undefined values.');
      }
    } else if (arg instanceof _ReferenceBuilder2.default) {
      args[i] = knex.raw.apply(knex, (0, _toConsumableArray3.default)(args[i].toRawArgs()));
    } else if (arg instanceof QueryBuilderBase) {
      // Convert QueryBuilderBase instances into knex query builders.
      args[i] = arg.build();
    } else if (Array.isArray(arg)) {
      if (skipUndefined) {
        args[i] = withoutUndefined(arg);
      } else if (includesUndefined(arg)) {
        throw new Error('undefined passed as an item in argument #' + l + ' for \'' + op.name + '\' operation. Call skipUndefined() method to ignore the undefined values.');
      }
      // convert reference builders to knex.raw
      args[i] = args[i].map(function (arg) {
        return arg instanceof _ReferenceBuilder2.default ? knex.raw.apply(knex, (0, _toConsumableArray3.default)(arg.toRawArgs())) : arg;
      });
    } else if (typeof arg === 'function') {
      // If an argument is a function, knex calls it with a query builder as
      // first argument (and as `this` context). We wrap the query builder into
      // a QueryBuilderBase instance.
      args[i] = wrapFunctionArg(arg, knex);
    }
  }

  return true;
}

function wrapFunctionArg(func, knex) {
  // Preventing cyclic deps
  QueryBuilderBase = QueryBuilderBase || requireQueryBuilderBase();
  JoinBuilder = JoinBuilder || requireJoinBuilder();

  return function wrappedKnexFunctionArg() {
    if ((0, _dbUtils.isKnexQueryBuilder)(this)) {
      var knexQueryBuilder = this;
      // Wrap knex query builder into a QueryBuilderBase so that we can use
      // our extended query builder in nested queries.
      var wrappedQueryBuilder = new QueryBuilderBase(knex);
      func.call(wrappedQueryBuilder, wrappedQueryBuilder);
      wrappedQueryBuilder.buildInto(knexQueryBuilder);
    } else if ((0, _dbUtils.isKnexJoinBuilder)(this)) {
      var _knexQueryBuilder = this;
      var joinClauseBuilder = new JoinBuilder(knex);
      func.call(joinClauseBuilder, joinClauseBuilder);
      joinClauseBuilder.buildInto(_knexQueryBuilder);
    } else {
      // maybe someone falls here to the original knex implementation
      return func.apply(this, arguments);
    }
  };
}

function withoutUndefined(arr) {
  var out = [];

  for (var i = 0, l = arr.length; i < l; ++i) {
    if (arr[i] !== undefined) {
      out.push(arr[i]);
    }
  }

  return out;
}

function includesUndefined(arr) {
  for (var i = 0, l = arr.length; i < l; ++i) {
    if (arr[i] === undefined) {
      return true;
    }
  }

  return false;
}

function requireQueryBuilderBase() {
  return require('../QueryBuilderBase').default;
}

function requireJoinBuilder() {
  return require('../JoinBuilder').default;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIlF1ZXJ5QnVpbGRlckJhc2UiLCJKb2luQnVpbGRlciIsIldyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uIiwibmFtZSIsIm9wdCIsImFyZ3MiLCJjYWxsIiwiYnVpbGRlciIsInJldCIsIndyYXBBcmdzIiwib3AiLCJyZXF1aXJlUXVlcnlCdWlsZGVyQmFzZSIsInNraXBVbmRlZmluZWQiLCJzaG91bGRTa2lwVW5kZWZpbmVkIiwia25leCIsImkiLCJsIiwibGVuZ3RoIiwiYXJnIiwidW5kZWZpbmVkIiwiRXJyb3IiLCJyYXciLCJ0b1Jhd0FyZ3MiLCJidWlsZCIsIkFycmF5IiwiaXNBcnJheSIsIndpdGhvdXRVbmRlZmluZWQiLCJpbmNsdWRlc1VuZGVmaW5lZCIsIm1hcCIsIndyYXBGdW5jdGlvbkFyZyIsImZ1bmMiLCJyZXF1aXJlSm9pbkJ1aWxkZXIiLCJ3cmFwcGVkS25leEZ1bmN0aW9uQXJnIiwia25leFF1ZXJ5QnVpbGRlciIsIndyYXBwZWRRdWVyeUJ1aWxkZXIiLCJidWlsZEludG8iLCJqb2luQ2xhdXNlQnVpbGRlciIsImFwcGx5IiwiYXJndW1lbnRzIiwiYXJyIiwib3V0IiwicHVzaCIsInJlcXVpcmUiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLG1CQUFtQixJQUF2QjtBQUNBLElBQUlDLGNBQWMsSUFBbEI7O0lBRXFCQyw2Qjs7O0FBRW5CLHlDQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQixpQ0FBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUVyQixVQUFLQyxJQUFMLEdBQVksSUFBWjtBQUZxQjtBQUd0Qjs7MENBRURDLEksaUJBQUtDLE8sRUFBU0YsSSxFQUFNO0FBQ2xCLFFBQU1HLE1BQU1DLFNBQVMsSUFB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QUE1QjtBQUVELEtBTk0sTUFNQTtBQUNMO0FBQ0EsYUFBT0gsS0FBS08sS0FBTCxDQUFXLElBQVgsRUFBaUJDLFNBQWpCLENBQVA7QUFDRDtBQUNGLEdBbkJEO0FBb0JEOztBQUVELFNBQVNaLGdCQUFULENBQTBCYSxHQUExQixFQUErQjtBQUM3QixNQUFNQyxNQUFNLEVBQVo7O0FBRUEsT0FBSyxJQUFJekIsSUFBSSxDQUFSLEVBQVdDLElBQUl1QixJQUFJdEIsTUFBeEIsRUFBZ0NGLElBQUlDLENBQXBDLEVBQXVDLEVBQUVELENBQXpDLEVBQTRDO0FBQzFDLFFBQUl3QixJQUFJeEIsQ0FBSixNQUFXSSxTQUFmLEVBQTBCO0FBQ3hCcUIsVUFBSUMsSUFBSixDQUFTRixJQUFJeEIsQ0FBSixDQUFUO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPeUIsR0FBUDtBQUNEOztBQUVELFNBQVNiLGlCQUFULENBQTJCWSxHQUEzQixFQUFnQztBQUM5QixPQUFLLElBQUl4QixJQUFJLENBQVIsRUFBV0MsSUFBSXVCLElBQUl0QixNQUF4QixFQUFnQ0YsSUFBSUMsQ0FBcEMsRUFBdUMsRUFBRUQsQ0FBekMsRUFBNEM7QUFDMUMsUUFBSXdCLElBQUl4QixDQUFKLE1BQVdJLFNBQWYsRUFBMEI7QUFDeEIsYUFBTyxJQUFQO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPLEtBQVA7QUFDRDs7QUFFRCxTQUFTUix1QkFBVCxHQUFtQztBQUNqQyxTQUFPK0IsUUFBUSxxQkFBUixFQUErQkMsT0FBdEM7QUFDRDs7QUFFRCxTQUFTWixrQkFBVCxHQUE4QjtBQUM1QixTQUFPVyxRQUFRLGdCQUFSLEVBQTBCQyxPQUFqQztBQUNEIiwiZmlsZSI6IldyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFF1ZXJ5QnVpbGRlck9wZXJhdGlvbiBmcm9tICcuL1F1ZXJ5QnVpbGRlck9wZXJhdGlvbic7XG5pbXBvcnQge2lzS25leFF1ZXJ5QnVpbGRlciwgaXNLbmV4Sm9pbkJ1aWxkZXJ9IGZyb20gJy4uLy4uL3V0aWxzL2RiVXRpbHMnO1xuaW1wb3J0IFJlZmVyZW5jZUJ1aWxkZXIgZnJvbSAnLi4vUmVmZXJlbmNlQnVpbGRlcic7XG5cbmxldCBRdWVyeUJ1aWxkZXJCYXNlID0gbnVsbDtcbmxldCBKb2luQnVpbGRlciA9IG51bGw7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uIGV4dGVuZHMgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHQpIHtcbiAgICBzdXBlcihuYW1lLCBvcHQpO1xuICAgIHRoaXMuYXJncyA9IG51bGw7XG4gIH1cblxuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICBjb25zdCByZXQgPSB3cmFwQXJncyh0aGlzLCBidWlsZGVyLCBhcmdzKTtcbiAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gd3JhcEFyZ3Mob3AsIGJ1aWxkZXIsIGFyZ3MpIHtcbiAgLy8gUHJldmVudGluZyBjeWNsaWMgZGVwc1xuICBRdWVyeUJ1aWxkZXJCYXNlID0gUXVlcnlCdWlsZGVyQmFzZSB8fCByZXF1aXJlUXVlcnlCdWlsZGVyQmFzZSgpO1xuXG4gIGNvbnN0IHNraXBVbmRlZmluZWQgPSBidWlsZGVyLnNob3VsZFNraXBVbmRlZmluZWQoKTtcbiAgY29uc3Qga25leCA9IGJ1aWxkZXIua25leCgpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJncy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCBhcmcgPSBhcmdzW2ldO1xuXG4gICAgaWYgKGFyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoc2tpcFVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuZGVmaW5lZCBwYXNzZWQgYXMgYXJndW1lbnQgIyR7bH0gZm9yICcke29wLm5hbWV9JyBvcGVyYXRpb24uIENhbGwgc2tpcFVuZGVmaW5lZCgpIG1ldGhvZCB0byBpZ25vcmUgdGhlIHVuZGVmaW5lZCB2YWx1ZXMuYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhcmcgaW5zdGFuY2VvZiBSZWZlcmVuY2VCdWlsZGVyKSB7XG4gICAgICBhcmdzW2ldID0ga25leC5yYXcoLi4uYXJnc1tpXS50b1Jhd0FyZ3MoKSk7XG4gICAgfSBlbHNlIGlmIChhcmcgaW5zdGFuY2VvZiBRdWVyeUJ1aWxkZXJCYXNlKSB7XG4gICAgICAvLyBDb252ZXJ0IFF1ZXJ5QnVpbGRlckJhc2UgaW5zdGFuY2VzIGludG8ga25leCBxdWVyeSBidWlsZGVycy5cbiAgICAgIGFyZ3NbaV0gPSBhcmcuYnVpbGQoKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuICAgICAgaWYgKHNraXBVbmRlZmluZWQpIHtcbiAgICAgICAgYXJnc1tpXSA9IHdpdGhvdXRVbmRlZmluZWQoYXJnKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5jbHVkZXNVbmRlZmluZWQoYXJnKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuZGVmaW5lZCBwYXNzZWQgYXMgYW4gaXRlbSBpbiBhcmd1bWVudCAjJHtsfSBmb3IgJyR7b3AubmFtZX0nIG9wZXJhdGlvbi4gQ2FsbCBza2lwVW5kZWZpbmVkKCkgbWV0aG9kIHRvIGlnbm9yZSB0aGUgdW5kZWZpbmVkIHZhbHVlcy5gKTtcbiAgICAgIH1cbiAgICAgIC8vIGNvbnZlcnQgcmVmZXJlbmNlIGJ1aWxkZXJzIHRvIGtuZXgucmF3XG4gICAgICBhcmdzW2ldID0gYXJnc1tpXS5tYXAoYXJnID0+IHtcbiAgICAgICAgcmV0dXJuIGFyZyBpbnN0YW5jZW9mIFJlZmVyZW5jZUJ1aWxkZXIgPyBrbmV4LnJhdyguLi5hcmcudG9SYXdBcmdzKCkpIDogYXJnO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBJZiBhbiBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLCBrbmV4IGNhbGxzIGl0IHdpdGggYSBxdWVyeSBidWlsZGVyIGFzXG4gICAgICAvLyBmaXJzdCBhcmd1bWVudCAoYW5kIGFzIGB0aGlzYCBjb250ZXh0KS4gV2Ugd3JhcCB0aGUgcXVlcnkgYnVpbGRlciBpbnRvXG4gICAgICAvLyBhIFF1ZXJ5QnVpbGRlckJhc2UgaW5zdGFuY2UuXG4gICAgICBhcmdzW2ldID0gd3JhcEZ1bmN0aW9uQXJnKGFyZywga25leCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHdyYXBGdW5jdGlvbkFyZyhmdW5jLCBrbmV4KSB7XG4gIC8vIFByZXZlbnRpbmcgY3ljbGljIGRlcHNcbiAgUXVlcnlCdWlsZGVyQmFzZSA9IFF1ZXJ5QnVpbGRlckJhc2UgfHwgcmVxdWlyZVF1ZXJ5QnVpbGRlckJhc2UoKTtcbiAgSm9pbkJ1aWxkZXIgPSBKb2luQnVpbGRlciB8fCByZXF1aXJlSm9pbkJ1aWxkZXIoKTtcblxuICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlZEtuZXhGdW5jdGlvbkFyZygpIHtcbiAgICBpZiAoaXNLbmV4UXVlcnlCdWlsZGVyKHRoaXMpKSB7XG4gICAgICBjb25zdCBrbmV4UXVlcnlCdWlsZGVyID0gdGhpcztcbiAgICAgIC8vIFdyYXAga25leCBxdWVyeSBidWlsZGVyIGludG8gYSBRdWVyeUJ1aWxkZXJCYXNlIHNvIHRoYXQgd2UgY2FuIHVzZVxuICAgICAgLy8gb3VyIGV4dGVuZGVkIHF1ZXJ5IGJ1aWxkZXIgaW4gbmVzdGVkIHF1ZXJpZXMuXG4gICAgICBjb25zdCB3cmFwcGVkUXVlcnlCdWlsZGVyID0gbmV3IFF1ZXJ5QnVpbGRlckJhc2Uoa25leCk7XG4gICAgICBmdW5jLmNhbGwod3JhcHBlZFF1ZXJ5QnVpbGRlciwgd3JhcHBlZFF1ZXJ5QnVpbGRlcik7XG4gICAgICB3cmFwcGVkUXVlcnlCdWlsZGVyLmJ1aWxkSW50byhrbmV4UXVlcnlCdWlsZGVyKTtcblxuICAgIH0gZWxzZSBpZiAoaXNLbmV4Sm9pbkJ1aWxkZXIodGhpcykpIHtcbiAgICAgIGNvbnN0IGtuZXhRdWVyeUJ1aWxkZXIgPSB0aGlzO1xuICAgICAgY29uc3Qgam9pbkNsYXVzZUJ1aWxkZXIgPSBuZXcgSm9pbkJ1aWxkZXIoa25leCk7XG4gICAgICBmdW5jLmNhbGwoam9pbkNsYXVzZUJ1aWxkZXIsIGpvaW5DbGF1c2VCdWlsZGVyKTtcbiAgICAgIGpvaW5DbGF1c2VCdWlsZGVyLmJ1aWxkSW50byhrbmV4UXVlcnlCdWlsZGVyKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBtYXliZSBzb21lb25lIGZhbGxzIGhlcmUgdG8gdGhlIG9yaWdpbmFsIGtuZXggaW1wbGVtZW50YXRpb25cbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiB3aXRob3V0VW5kZWZpbmVkKGFycikge1xuICBjb25zdCBvdXQgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoYXJyW2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG91dC5wdXNoKGFycltpXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gaW5jbHVkZXNVbmRlZmluZWQoYXJyKSB7XG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChhcnJbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZXF1aXJlUXVlcnlCdWlsZGVyQmFzZSgpIHtcbiAgcmV0dXJuIHJlcXVpcmUoJy4uL1F1ZXJ5QnVpbGRlckJhc2UnKS5kZWZhdWx0O1xufVxuXG5mdW5jdGlvbiByZXF1aXJlSm9pbkJ1aWxkZXIoKSB7XG4gIHJldHVybiByZXF1aXJlKCcuLi9Kb2luQnVpbGRlcicpLmRlZmF1bHQ7XG59XG4iXX0=