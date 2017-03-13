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

var _WrappingQueryBuilderOperation = require('./WrappingQueryBuilderOperation');

var _WrappingQueryBuilderOperation2 = _interopRequireDefault(_WrappingQueryBuilderOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WhereInCompositeSqliteOperation = function (_WrappingQueryBuilder) {
  (0, _inherits3.default)(WhereInCompositeSqliteOperation, _WrappingQueryBuilder);

  function WhereInCompositeSqliteOperation() {
    (0, _classCallCheck3.default)(this, WhereInCompositeSqliteOperation);
    return (0, _possibleConstructorReturn3.default)(this, _WrappingQueryBuilder.apply(this, arguments));
  }

  WhereInCompositeSqliteOperation.prototype.onBuild = function onBuild(knexBuilder) {
    this.build(knexBuilder, this.args[0], this.args[1]);
  };

  WhereInCompositeSqliteOperation.prototype.build = function build(knexBuilder, columns, values) {
    var isCompositeKey = Array.isArray(columns) && columns.length > 1;

    if (isCompositeKey) {
      this.buildComposite(knexBuilder, columns, values);
    } else {
      this.buildNonComposite(knexBuilder, columns, values);
    }
  };

  WhereInCompositeSqliteOperation.prototype.buildComposite = function buildComposite(knexBuilder, columns, values) {
    if (!Array.isArray(values)) {
      // If the `values` is not an array of values but a function or a subquery
      // we have no way to implement this method.
      throw new Error('sqlite doesn\'t support multi-column where in clauses');
    }

    // Sqlite doesn't support the `where in` syntax for multiple columns but
    // we can emulate it using grouped `or` clauses.
    knexBuilder.where(function (builder) {
      values.forEach(function (val) {
        builder.orWhere(function (builder) {
          columns.forEach(function (col, idx) {
            builder.andWhere(col, val[idx]);
          });
        });
      });
    });
  };

  WhereInCompositeSqliteOperation.prototype.buildNonComposite = function buildNonComposite(knexBuilder, columns, values) {
    var col = typeof columns === 'string' ? columns : columns[0];

    if (Array.isArray(values)) {
      values = pickNonNull(values, []);
    } else {
      values = [values];
    }

    // For non-composite keys we can use the normal whereIn.
    knexBuilder.whereIn(col, values);
  };

  return WhereInCompositeSqliteOperation;
}(_WrappingQueryBuilderOperation2.default);

exports.default = WhereInCompositeSqliteOperation;


function pickNonNull(values, output) {
  for (var i = 0, l = values.length; i < l; ++i) {
    var val = values[i];

    if (Array.isArray(val)) {
      pickNonNull(val, output);
    } else if (val !== null && val !== undefined) {
      output.push(val);
    }
  }

  return output;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldoZXJlSW5Db21wb3NpdGVTcWxpdGVPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiV2hlcmVJbkNvbXBvc2l0ZVNxbGl0ZU9wZXJhdGlvbiIsIm9uQnVpbGQiLCJrbmV4QnVpbGRlciIsImJ1aWxkIiwiYXJncyIsImNvbHVtbnMiLCJ2YWx1ZXMiLCJpc0NvbXBvc2l0ZUtleSIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImJ1aWxkQ29tcG9zaXRlIiwiYnVpbGROb25Db21wb3NpdGUiLCJFcnJvciIsIndoZXJlIiwiZm9yRWFjaCIsImJ1aWxkZXIiLCJvcldoZXJlIiwiY29sIiwiaWR4IiwiYW5kV2hlcmUiLCJ2YWwiLCJwaWNrTm9uTnVsbCIsIndoZXJlSW4iLCJvdXRwdXQiLCJpIiwibCIsInVuZGVmaW5lZCIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSwrQjs7Ozs7Ozs7NENBRW5CQyxPLG9CQUFRQyxXLEVBQWE7QUFDbkIsU0FBS0MsS0FBTCxDQUFXRCxXQUFYLEVBQXdCLEtBQUtFLElBQUwsQ0FBVSxDQUFWLENBQXhCLEVBQXNDLEtBQUtBLElBQUwsQ0FBVSxDQUFWLENBQXRDO0FBQ0QsRzs7NENBRURELEssa0JBQU1ELFcsRUFBYUcsTyxFQUFTQyxNLEVBQVE7QUFDbEMsUUFBSUMsaUJBQWlCQyxNQUFNQyxPQUFOLENBQWNKLE9BQWQsS0FBMEJBLFFBQVFLLE1BQVIsR0FBaUIsQ0FBaEU7O0FBRUEsUUFBSUgsY0FBSixFQUFvQjtBQUNsQixXQUFLSSxjQUFMLENBQW9CVCxXQUFwQixFQUFpQ0csT0FBakMsRUFBMENDLE1BQTFDO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsV0FBS00saUJBQUwsQ0FBdUJWLFdBQXZCLEVBQW9DRyxPQUFwQyxFQUE2Q0MsTUFBN0M7QUFDRDtBQUNGLEc7OzRDQUVESyxjLDJCQUFlVCxXLEVBQWFHLE8sRUFBU0MsTSxFQUFRO0FBQzNDLFFBQUksQ0FBQ0UsTUFBTUMsT0FBTixDQUFjSCxNQUFkLENBQUwsRUFBNEI7QUFDMUI7QUFDQTtBQUNBLFlBQU0sSUFBSU8sS0FBSix5REFBTjtBQUNEOztBQUVEO0FBQ0E7QUFDQVgsZ0JBQVlZLEtBQVosQ0FBa0IsbUJBQVc7QUFDM0JSLGFBQU9TLE9BQVAsQ0FBZSxlQUFPO0FBQ3BCQyxnQkFBUUMsT0FBUixDQUFnQixtQkFBVztBQUN6Qlosa0JBQVFVLE9BQVIsQ0FBZ0IsVUFBQ0csR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDNUJILG9CQUFRSSxRQUFSLENBQWlCRixHQUFqQixFQUFzQkcsSUFBSUYsR0FBSixDQUF0QjtBQUNELFdBRkQ7QUFHRCxTQUpEO0FBS0QsT0FORDtBQU9ELEtBUkQ7QUFTRCxHOzs0Q0FFRFAsaUIsOEJBQWtCVixXLEVBQWFHLE8sRUFBU0MsTSxFQUFRO0FBQzlDLFFBQUlZLE1BQU8sT0FBT2IsT0FBUCxLQUFtQixRQUFwQixHQUFnQ0EsT0FBaEMsR0FBMENBLFFBQVEsQ0FBUixDQUFwRDs7QUFFQSxRQUFJRyxNQUFNQyxPQUFOLENBQWNILE1BQWQsQ0FBSixFQUEyQjtBQUN6QkEsZUFBU2dCLFlBQVloQixNQUFaLEVBQW9CLEVBQXBCLENBQVQ7QUFDRCxLQUZELE1BRU87QUFDTEEsZUFBUyxDQUFDQSxNQUFELENBQVQ7QUFDRDs7QUFFRDtBQUNBSixnQkFBWXFCLE9BQVosQ0FBb0JMLEdBQXBCLEVBQXlCWixNQUF6QjtBQUNELEc7Ozs7O2tCQS9Da0JOLCtCOzs7QUFrRHJCLFNBQVNzQixXQUFULENBQXFCaEIsTUFBckIsRUFBNkJrQixNQUE3QixFQUFxQztBQUNuQyxPQUFLLElBQUlDLElBQUksQ0FBUixFQUFXQyxJQUFJcEIsT0FBT0ksTUFBM0IsRUFBbUNlLElBQUlDLENBQXZDLEVBQTBDLEVBQUVELENBQTVDLEVBQStDO0FBQzdDLFFBQU1KLE1BQU1mLE9BQU9tQixDQUFQLENBQVo7O0FBRUEsUUFBSWpCLE1BQU1DLE9BQU4sQ0FBY1ksR0FBZCxDQUFKLEVBQXdCO0FBQ3RCQyxrQkFBWUQsR0FBWixFQUFpQkcsTUFBakI7QUFDRCxLQUZELE1BRU8sSUFBSUgsUUFBUSxJQUFSLElBQWdCQSxRQUFRTSxTQUE1QixFQUF1QztBQUM1Q0gsYUFBT0ksSUFBUCxDQUFZUCxHQUFaO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPRyxNQUFQO0FBQ0QiLCJmaWxlIjoiV2hlcmVJbkNvbXBvc2l0ZVNxbGl0ZU9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXcmFwcGluZ1F1ZXJ5QnVpbGRlck9wZXJhdGlvbiBmcm9tICcuL1dyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2hlcmVJbkNvbXBvc2l0ZVNxbGl0ZU9wZXJhdGlvbiBleHRlbmRzIFdyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uIHtcblxuICBvbkJ1aWxkKGtuZXhCdWlsZGVyKSB7XG4gICAgdGhpcy5idWlsZChrbmV4QnVpbGRlciwgdGhpcy5hcmdzWzBdLCB0aGlzLmFyZ3NbMV0pO1xuICB9XG5cbiAgYnVpbGQoa25leEJ1aWxkZXIsIGNvbHVtbnMsIHZhbHVlcykge1xuICAgIGxldCBpc0NvbXBvc2l0ZUtleSA9IEFycmF5LmlzQXJyYXkoY29sdW1ucykgJiYgY29sdW1ucy5sZW5ndGggPiAxO1xuXG4gICAgaWYgKGlzQ29tcG9zaXRlS2V5KSB7XG4gICAgICB0aGlzLmJ1aWxkQ29tcG9zaXRlKGtuZXhCdWlsZGVyLCBjb2x1bW5zLCB2YWx1ZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1aWxkTm9uQ29tcG9zaXRlKGtuZXhCdWlsZGVyLCBjb2x1bW5zLCB2YWx1ZXMpO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkQ29tcG9zaXRlKGtuZXhCdWlsZGVyLCBjb2x1bW5zLCB2YWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgLy8gSWYgdGhlIGB2YWx1ZXNgIGlzIG5vdCBhbiBhcnJheSBvZiB2YWx1ZXMgYnV0IGEgZnVuY3Rpb24gb3IgYSBzdWJxdWVyeVxuICAgICAgLy8gd2UgaGF2ZSBubyB3YXkgdG8gaW1wbGVtZW50IHRoaXMgbWV0aG9kLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBzcWxpdGUgZG9lc24ndCBzdXBwb3J0IG11bHRpLWNvbHVtbiB3aGVyZSBpbiBjbGF1c2VzYCk7XG4gICAgfVxuXG4gICAgLy8gU3FsaXRlIGRvZXNuJ3Qgc3VwcG9ydCB0aGUgYHdoZXJlIGluYCBzeW50YXggZm9yIG11bHRpcGxlIGNvbHVtbnMgYnV0XG4gICAgLy8gd2UgY2FuIGVtdWxhdGUgaXQgdXNpbmcgZ3JvdXBlZCBgb3JgIGNsYXVzZXMuXG4gICAga25leEJ1aWxkZXIud2hlcmUoYnVpbGRlciA9PiB7XG4gICAgICB2YWx1ZXMuZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgICBidWlsZGVyLm9yV2hlcmUoYnVpbGRlciA9PiB7XG4gICAgICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wsIGlkeCkgPT4ge1xuICAgICAgICAgICAgYnVpbGRlci5hbmRXaGVyZShjb2wsIHZhbFtpZHhdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGJ1aWxkTm9uQ29tcG9zaXRlKGtuZXhCdWlsZGVyLCBjb2x1bW5zLCB2YWx1ZXMpIHtcbiAgICBsZXQgY29sID0gKHR5cGVvZiBjb2x1bW5zID09PSAnc3RyaW5nJykgPyBjb2x1bW5zIDogY29sdW1uc1swXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgIHZhbHVlcyA9IHBpY2tOb25OdWxsKHZhbHVlcywgW10pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZXMgPSBbdmFsdWVzXTtcbiAgICB9XG5cbiAgICAvLyBGb3Igbm9uLWNvbXBvc2l0ZSBrZXlzIHdlIGNhbiB1c2UgdGhlIG5vcm1hbCB3aGVyZUluLlxuICAgIGtuZXhCdWlsZGVyLndoZXJlSW4oY29sLCB2YWx1ZXMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBpY2tOb25OdWxsKHZhbHVlcywgb3V0cHV0KSB7XG4gIGZvciAobGV0IGkgPSAwLCBsID0gdmFsdWVzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IHZhbCA9IHZhbHVlc1tpXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHBpY2tOb25OdWxsKHZhbCwgb3V0cHV0KTtcbiAgICB9IGVsc2UgaWYgKHZhbCAhPT0gbnVsbCAmJiB2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgb3V0cHV0LnB1c2godmFsKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuXG4iXX0=