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

var WhereInCompositeOperation = function (_WrappingQueryBuilder) {
  (0, _inherits3.default)(WhereInCompositeOperation, _WrappingQueryBuilder);

  function WhereInCompositeOperation() {
    (0, _classCallCheck3.default)(this, WhereInCompositeOperation);
    return (0, _possibleConstructorReturn3.default)(this, _WrappingQueryBuilder.apply(this, arguments));
  }

  WhereInCompositeOperation.prototype.onBuild = function onBuild(knexBuilder) {
    this.build(knexBuilder, this.args[0], this.args[1]);
  };

  WhereInCompositeOperation.prototype.build = function build(knexBuilder, columns, values) {
    var isCompositeKey = Array.isArray(columns) && columns.length > 1;

    if (isCompositeKey) {
      this.buildComposite(knexBuilder, columns, values);
    } else {
      this.buildNonComposite(knexBuilder, columns, values);
    }
  };

  WhereInCompositeOperation.prototype.buildComposite = function buildComposite(knexBuilder, columns, values) {
    if (Array.isArray(values)) {
      this.buildCompositeValue(knexBuilder, columns, values);
    } else {
      this.buildCompositeSubquery(knexBuilder, columns, values);
    }
  };

  WhereInCompositeOperation.prototype.buildCompositeValue = function buildCompositeValue(knexBuilder, columns, values) {
    knexBuilder.whereIn(columns, values);
  };

  WhereInCompositeOperation.prototype.buildCompositeSubquery = function buildCompositeSubquery(knexBuilder, columns, subquery) {
    var formatter = knexBuilder.client.formatter();

    var sql = '(';
    for (var i = 0, l = columns.length; i < l; ++i) {
      sql += formatter.wrap(columns[i]);

      if (i !== columns.length - 1) {
        sql += ',';
      }
    }
    sql += ')';

    knexBuilder.whereIn(knexBuilder.client.raw(sql), subquery);
  };

  WhereInCompositeOperation.prototype.buildNonComposite = function buildNonComposite(knexBuilder, columns, values) {
    var col = typeof columns === 'string' ? columns : columns[0];

    if (Array.isArray(values)) {
      values = pickNonNull(values, []);
    } else {
      values = [values];
    }

    knexBuilder.whereIn(col, values);
  };

  return WhereInCompositeOperation;
}(_WrappingQueryBuilderOperation2.default);

exports.default = WhereInCompositeOperation;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldoZXJlSW5Db21wb3NpdGVPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiV2hlcmVJbkNvbXBvc2l0ZU9wZXJhdGlvbiIsIm9uQnVpbGQiLCJrbmV4QnVpbGRlciIsImJ1aWxkIiwiYXJncyIsImNvbHVtbnMiLCJ2YWx1ZXMiLCJpc0NvbXBvc2l0ZUtleSIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImJ1aWxkQ29tcG9zaXRlIiwiYnVpbGROb25Db21wb3NpdGUiLCJidWlsZENvbXBvc2l0ZVZhbHVlIiwiYnVpbGRDb21wb3NpdGVTdWJxdWVyeSIsIndoZXJlSW4iLCJzdWJxdWVyeSIsImZvcm1hdHRlciIsImNsaWVudCIsInNxbCIsImkiLCJsIiwid3JhcCIsInJhdyIsImNvbCIsInBpY2tOb25OdWxsIiwib3V0cHV0IiwidmFsIiwidW5kZWZpbmVkIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLHlCOzs7Ozs7OztzQ0FFbkJDLE8sb0JBQVFDLFcsRUFBYTtBQUNuQixTQUFLQyxLQUFMLENBQVdELFdBQVgsRUFBd0IsS0FBS0UsSUFBTCxDQUFVLENBQVYsQ0FBeEIsRUFBc0MsS0FBS0EsSUFBTCxDQUFVLENBQVYsQ0FBdEM7QUFDRCxHOztzQ0FFREQsSyxrQkFBTUQsVyxFQUFhRyxPLEVBQVNDLE0sRUFBUTtBQUNsQyxRQUFJQyxpQkFBaUJDLE1BQU1DLE9BQU4sQ0FBY0osT0FBZCxLQUEwQkEsUUFBUUssTUFBUixHQUFpQixDQUFoRTs7QUFFQSxRQUFJSCxjQUFKLEVBQW9CO0FBQ2xCLFdBQUtJLGNBQUwsQ0FBb0JULFdBQXBCLEVBQWlDRyxPQUFqQyxFQUEwQ0MsTUFBMUM7QUFDRCxLQUZELE1BRU87QUFDTCxXQUFLTSxpQkFBTCxDQUF1QlYsV0FBdkIsRUFBb0NHLE9BQXBDLEVBQTZDQyxNQUE3QztBQUNEO0FBQ0YsRzs7c0NBRURLLGMsMkJBQWVULFcsRUFBYUcsTyxFQUFTQyxNLEVBQVE7QUFDM0MsUUFBSUUsTUFBTUMsT0FBTixDQUFjSCxNQUFkLENBQUosRUFBMkI7QUFDekIsV0FBS08sbUJBQUwsQ0FBeUJYLFdBQXpCLEVBQXNDRyxPQUF0QyxFQUErQ0MsTUFBL0M7QUFDRCxLQUZELE1BRU87QUFDTCxXQUFLUSxzQkFBTCxDQUE0QlosV0FBNUIsRUFBeUNHLE9BQXpDLEVBQWtEQyxNQUFsRDtBQUNEO0FBQ0YsRzs7c0NBRURPLG1CLGdDQUFvQlgsVyxFQUFhRyxPLEVBQVNDLE0sRUFBUTtBQUNoREosZ0JBQVlhLE9BQVosQ0FBb0JWLE9BQXBCLEVBQTZCQyxNQUE3QjtBQUNELEc7O3NDQUVEUSxzQixtQ0FBdUJaLFcsRUFBYUcsTyxFQUFTVyxRLEVBQVU7QUFDckQsUUFBTUMsWUFBWWYsWUFBWWdCLE1BQVosQ0FBbUJELFNBQW5CLEVBQWxCOztBQUVBLFFBQUlFLE1BQU0sR0FBVjtBQUNBLFNBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLElBQUloQixRQUFRSyxNQUE1QixFQUFvQ1UsSUFBSUMsQ0FBeEMsRUFBMkMsRUFBRUQsQ0FBN0MsRUFBZ0Q7QUFDOUNELGFBQU9GLFVBQVVLLElBQVYsQ0FBZWpCLFFBQVFlLENBQVIsQ0FBZixDQUFQOztBQUVBLFVBQUlBLE1BQU1mLFFBQVFLLE1BQVIsR0FBaUIsQ0FBM0IsRUFBOEI7QUFDNUJTLGVBQU8sR0FBUDtBQUNEO0FBQ0Y7QUFDREEsV0FBTyxHQUFQOztBQUVBakIsZ0JBQVlhLE9BQVosQ0FBb0JiLFlBQVlnQixNQUFaLENBQW1CSyxHQUFuQixDQUF1QkosR0FBdkIsQ0FBcEIsRUFBaURILFFBQWpEO0FBQ0QsRzs7c0NBRURKLGlCLDhCQUFrQlYsVyxFQUFhRyxPLEVBQVNDLE0sRUFBUTtBQUM5QyxRQUFJa0IsTUFBTyxPQUFPbkIsT0FBUCxLQUFtQixRQUFwQixHQUFnQ0EsT0FBaEMsR0FBMENBLFFBQVEsQ0FBUixDQUFwRDs7QUFFQSxRQUFJRyxNQUFNQyxPQUFOLENBQWNILE1BQWQsQ0FBSixFQUEyQjtBQUN6QkEsZUFBU21CLFlBQVluQixNQUFaLEVBQW9CLEVBQXBCLENBQVQ7QUFDRCxLQUZELE1BRU87QUFDTEEsZUFBUyxDQUFDQSxNQUFELENBQVQ7QUFDRDs7QUFFREosZ0JBQVlhLE9BQVosQ0FBb0JTLEdBQXBCLEVBQXlCbEIsTUFBekI7QUFDRCxHOzs7OztrQkF0RGtCTix5Qjs7O0FBeURyQixTQUFTeUIsV0FBVCxDQUFxQm5CLE1BQXJCLEVBQTZCb0IsTUFBN0IsRUFBcUM7QUFDbkMsT0FBSyxJQUFJTixJQUFJLENBQVIsRUFBV0MsSUFBSWYsT0FBT0ksTUFBM0IsRUFBbUNVLElBQUlDLENBQXZDLEVBQTBDLEVBQUVELENBQTVDLEVBQStDO0FBQzdDLFFBQU1PLE1BQU1yQixPQUFPYyxDQUFQLENBQVo7O0FBRUEsUUFBSVosTUFBTUMsT0FBTixDQUFja0IsR0FBZCxDQUFKLEVBQXdCO0FBQ3RCRixrQkFBWUUsR0FBWixFQUFpQkQsTUFBakI7QUFDRCxLQUZELE1BRU8sSUFBSUMsUUFBUSxJQUFSLElBQWdCQSxRQUFRQyxTQUE1QixFQUF1QztBQUM1Q0YsYUFBT0csSUFBUCxDQUFZRixHQUFaO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPRCxNQUFQO0FBQ0QiLCJmaWxlIjoiV2hlcmVJbkNvbXBvc2l0ZU9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXcmFwcGluZ1F1ZXJ5QnVpbGRlck9wZXJhdGlvbiBmcm9tICcuL1dyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2hlcmVJbkNvbXBvc2l0ZU9wZXJhdGlvbiBleHRlbmRzIFdyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uIHtcblxuICBvbkJ1aWxkKGtuZXhCdWlsZGVyKSB7XG4gICAgdGhpcy5idWlsZChrbmV4QnVpbGRlciwgdGhpcy5hcmdzWzBdLCB0aGlzLmFyZ3NbMV0pO1xuICB9XG5cbiAgYnVpbGQoa25leEJ1aWxkZXIsIGNvbHVtbnMsIHZhbHVlcykge1xuICAgIGxldCBpc0NvbXBvc2l0ZUtleSA9IEFycmF5LmlzQXJyYXkoY29sdW1ucykgJiYgY29sdW1ucy5sZW5ndGggPiAxO1xuXG4gICAgaWYgKGlzQ29tcG9zaXRlS2V5KSB7XG4gICAgICB0aGlzLmJ1aWxkQ29tcG9zaXRlKGtuZXhCdWlsZGVyLCBjb2x1bW5zLCB2YWx1ZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1aWxkTm9uQ29tcG9zaXRlKGtuZXhCdWlsZGVyLCBjb2x1bW5zLCB2YWx1ZXMpO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkQ29tcG9zaXRlKGtuZXhCdWlsZGVyLCBjb2x1bW5zLCB2YWx1ZXMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICB0aGlzLmJ1aWxkQ29tcG9zaXRlVmFsdWUoa25leEJ1aWxkZXIsIGNvbHVtbnMsIHZhbHVlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVpbGRDb21wb3NpdGVTdWJxdWVyeShrbmV4QnVpbGRlciwgY29sdW1ucywgdmFsdWVzKTtcbiAgICB9XG4gIH1cblxuICBidWlsZENvbXBvc2l0ZVZhbHVlKGtuZXhCdWlsZGVyLCBjb2x1bW5zLCB2YWx1ZXMpIHtcbiAgICBrbmV4QnVpbGRlci53aGVyZUluKGNvbHVtbnMsIHZhbHVlcyk7XG4gIH1cblxuICBidWlsZENvbXBvc2l0ZVN1YnF1ZXJ5KGtuZXhCdWlsZGVyLCBjb2x1bW5zLCBzdWJxdWVyeSkge1xuICAgIGNvbnN0IGZvcm1hdHRlciA9IGtuZXhCdWlsZGVyLmNsaWVudC5mb3JtYXR0ZXIoKTtcblxuICAgIGxldCBzcWwgPSAnKCc7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBjb2x1bW5zLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgc3FsICs9IGZvcm1hdHRlci53cmFwKGNvbHVtbnNbaV0pO1xuXG4gICAgICBpZiAoaSAhPT0gY29sdW1ucy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHNxbCArPSAnLCc7XG4gICAgICB9XG4gICAgfVxuICAgIHNxbCArPSAnKSc7XG5cbiAgICBrbmV4QnVpbGRlci53aGVyZUluKGtuZXhCdWlsZGVyLmNsaWVudC5yYXcoc3FsKSwgc3VicXVlcnkpO1xuICB9XG5cbiAgYnVpbGROb25Db21wb3NpdGUoa25leEJ1aWxkZXIsIGNvbHVtbnMsIHZhbHVlcykge1xuICAgIGxldCBjb2wgPSAodHlwZW9mIGNvbHVtbnMgPT09ICdzdHJpbmcnKSA/IGNvbHVtbnMgOiBjb2x1bW5zWzBdO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgdmFsdWVzID0gcGlja05vbk51bGwodmFsdWVzLCBbXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlcyA9IFt2YWx1ZXNdO1xuICAgIH1cblxuICAgIGtuZXhCdWlsZGVyLndoZXJlSW4oY29sLCB2YWx1ZXMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBpY2tOb25OdWxsKHZhbHVlcywgb3V0cHV0KSB7XG4gIGZvciAobGV0IGkgPSAwLCBsID0gdmFsdWVzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IHZhbCA9IHZhbHVlc1tpXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHBpY2tOb25OdWxsKHZhbCwgb3V0cHV0KTtcbiAgICB9IGVsc2UgaWYgKHZhbCAhPT0gbnVsbCAmJiB2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgb3V0cHV0LnB1c2godmFsKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuXG4iXX0=