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

var WhereCompositeOperation = function (_WrappingQueryBuilder) {
  (0, _inherits3.default)(WhereCompositeOperation, _WrappingQueryBuilder);

  function WhereCompositeOperation() {
    (0, _classCallCheck3.default)(this, WhereCompositeOperation);
    return (0, _possibleConstructorReturn3.default)(this, _WrappingQueryBuilder.apply(this, arguments));
  }

  WhereCompositeOperation.prototype.onBuild = function onBuild(knexBuilder) {
    if (this.args.length === 2) {
      this.build(knexBuilder, this.args[0], '=', this.args[1]);
    } else if (this.args.length === 3) {
      this.build(knexBuilder, this.args[0], this.args[1], this.args[2]);
    } else {
      throw new Error('invalid number of arguments ' + this.args.length);
    }
  };

  WhereCompositeOperation.prototype.build = function build(knexBuilder, cols, op, values) {
    var colsIsArray = Array.isArray(cols);
    var valuesIsArray = Array.isArray(values);

    if (!colsIsArray && !valuesIsArray) {
      knexBuilder.where(cols, op, values);
    } else if (colsIsArray && cols.length === 1 && !valuesIsArray) {
      knexBuilder.where(cols[0], op, values);
    } else if (colsIsArray && valuesIsArray && cols.length === values.length) {
      for (var i = 0, l = cols.length; i < l; ++i) {
        knexBuilder.where(cols[i], op, values[i]);
      }
    } else {
      throw new Error('both cols and values must have same dimensions');
    }
  };

  return WhereCompositeOperation;
}(_WrappingQueryBuilderOperation2.default);

exports.default = WhereCompositeOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldoZXJlQ29tcG9zaXRlT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIldoZXJlQ29tcG9zaXRlT3BlcmF0aW9uIiwib25CdWlsZCIsImtuZXhCdWlsZGVyIiwiYXJncyIsImxlbmd0aCIsImJ1aWxkIiwiRXJyb3IiLCJjb2xzIiwib3AiLCJ2YWx1ZXMiLCJjb2xzSXNBcnJheSIsIkFycmF5IiwiaXNBcnJheSIsInZhbHVlc0lzQXJyYXkiLCJ3aGVyZSIsImkiLCJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsdUI7Ozs7Ozs7O29DQUVuQkMsTyxvQkFBUUMsVyxFQUFhO0FBQ25CLFFBQUksS0FBS0MsSUFBTCxDQUFVQyxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFdBQUtDLEtBQUwsQ0FBV0gsV0FBWCxFQUF3QixLQUFLQyxJQUFMLENBQVUsQ0FBVixDQUF4QixFQUFzQyxHQUF0QyxFQUEyQyxLQUFLQSxJQUFMLENBQVUsQ0FBVixDQUEzQztBQUNELEtBRkQsTUFFTyxJQUFJLEtBQUtBLElBQUwsQ0FBVUMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUNqQyxXQUFLQyxLQUFMLENBQVdILFdBQVgsRUFBd0IsS0FBS0MsSUFBTCxDQUFVLENBQVYsQ0FBeEIsRUFBc0MsS0FBS0EsSUFBTCxDQUFVLENBQVYsQ0FBdEMsRUFBb0QsS0FBS0EsSUFBTCxDQUFVLENBQVYsQ0FBcEQ7QUFDRCxLQUZNLE1BRUE7QUFDTCxZQUFNLElBQUlHLEtBQUosa0NBQXlDLEtBQUtILElBQUwsQ0FBVUMsTUFBbkQsQ0FBTjtBQUNEO0FBQ0YsRzs7b0NBRURDLEssa0JBQU1ILFcsRUFBYUssSSxFQUFNQyxFLEVBQUlDLE0sRUFBUTtBQUNuQyxRQUFNQyxjQUFjQyxNQUFNQyxPQUFOLENBQWNMLElBQWQsQ0FBcEI7QUFDQSxRQUFNTSxnQkFBZ0JGLE1BQU1DLE9BQU4sQ0FBY0gsTUFBZCxDQUF0Qjs7QUFFQSxRQUFJLENBQUNDLFdBQUQsSUFBZ0IsQ0FBQ0csYUFBckIsRUFBb0M7QUFDbENYLGtCQUFZWSxLQUFaLENBQWtCUCxJQUFsQixFQUF3QkMsRUFBeEIsRUFBNEJDLE1BQTVCO0FBQ0QsS0FGRCxNQUVPLElBQUlDLGVBQWVILEtBQUtILE1BQUwsS0FBZ0IsQ0FBL0IsSUFBb0MsQ0FBQ1MsYUFBekMsRUFBd0Q7QUFDN0RYLGtCQUFZWSxLQUFaLENBQWtCUCxLQUFLLENBQUwsQ0FBbEIsRUFBMkJDLEVBQTNCLEVBQStCQyxNQUEvQjtBQUNELEtBRk0sTUFFQSxJQUFJQyxlQUFlRyxhQUFmLElBQWdDTixLQUFLSCxNQUFMLEtBQWdCSyxPQUFPTCxNQUEzRCxFQUFtRTtBQUN4RSxXQUFLLElBQUlXLElBQUksQ0FBUixFQUFXQyxJQUFJVCxLQUFLSCxNQUF6QixFQUFpQ1csSUFBSUMsQ0FBckMsRUFBd0MsRUFBRUQsQ0FBMUMsRUFBNkM7QUFDM0NiLG9CQUFZWSxLQUFaLENBQWtCUCxLQUFLUSxDQUFMLENBQWxCLEVBQTJCUCxFQUEzQixFQUErQkMsT0FBT00sQ0FBUCxDQUEvQjtBQUNEO0FBQ0YsS0FKTSxNQUlBO0FBQ0wsWUFBTSxJQUFJVCxLQUFKLGtEQUFOO0FBQ0Q7QUFDRixHOzs7OztrQkEzQmtCTix1QiIsImZpbGUiOiJXaGVyZUNvbXBvc2l0ZU9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXcmFwcGluZ1F1ZXJ5QnVpbGRlck9wZXJhdGlvbiBmcm9tICcuL1dyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2hlcmVDb21wb3NpdGVPcGVyYXRpb24gZXh0ZW5kcyBXcmFwcGluZ1F1ZXJ5QnVpbGRlck9wZXJhdGlvbiB7XG5cbiAgb25CdWlsZChrbmV4QnVpbGRlcikge1xuICAgIGlmICh0aGlzLmFyZ3MubGVuZ3RoID09PSAyKSB7XG4gICAgICB0aGlzLmJ1aWxkKGtuZXhCdWlsZGVyLCB0aGlzLmFyZ3NbMF0sICc9JywgdGhpcy5hcmdzWzFdKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYXJncy5sZW5ndGggPT09IDMpIHtcbiAgICAgIHRoaXMuYnVpbGQoa25leEJ1aWxkZXIsIHRoaXMuYXJnc1swXSwgdGhpcy5hcmdzWzFdLCB0aGlzLmFyZ3NbMl0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgbnVtYmVyIG9mIGFyZ3VtZW50cyAke3RoaXMuYXJncy5sZW5ndGh9YCk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQoa25leEJ1aWxkZXIsIGNvbHMsIG9wLCB2YWx1ZXMpIHtcbiAgICBjb25zdCBjb2xzSXNBcnJheSA9IEFycmF5LmlzQXJyYXkoY29scyk7XG4gICAgY29uc3QgdmFsdWVzSXNBcnJheSA9IEFycmF5LmlzQXJyYXkodmFsdWVzKTtcblxuICAgIGlmICghY29sc0lzQXJyYXkgJiYgIXZhbHVlc0lzQXJyYXkpIHtcbiAgICAgIGtuZXhCdWlsZGVyLndoZXJlKGNvbHMsIG9wLCB2YWx1ZXMpO1xuICAgIH0gZWxzZSBpZiAoY29sc0lzQXJyYXkgJiYgY29scy5sZW5ndGggPT09IDEgJiYgIXZhbHVlc0lzQXJyYXkpIHtcbiAgICAgIGtuZXhCdWlsZGVyLndoZXJlKGNvbHNbMF0sIG9wLCB2YWx1ZXMpO1xuICAgIH0gZWxzZSBpZiAoY29sc0lzQXJyYXkgJiYgdmFsdWVzSXNBcnJheSAmJiBjb2xzLmxlbmd0aCA9PT0gdmFsdWVzLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBjb2xzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICBrbmV4QnVpbGRlci53aGVyZShjb2xzW2ldLCBvcCwgdmFsdWVzW2ldKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGJvdGggY29scyBhbmQgdmFsdWVzIG11c3QgaGF2ZSBzYW1lIGRpbWVuc2lvbnNgKTtcbiAgICB9XG4gIH1cbn1cblxuIl19