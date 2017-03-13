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

var _WrappingQueryBuilderOperation = require('./WrappingQueryBuilderOperation');

var _WrappingQueryBuilderOperation2 = _interopRequireDefault(_WrappingQueryBuilderOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectOperation = function (_WrappingQueryBuilder) {
  (0, _inherits3.default)(SelectOperation, _WrappingQueryBuilder);

  function SelectOperation(name, opt) {
    (0, _classCallCheck3.default)(this, SelectOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _WrappingQueryBuilder.call(this, name, opt));

    _this.selections = [];
    return _this;
  }

  SelectOperation.parseSelection = function parseSelection(selection) {
    if (!_lodash2.default.isString(selection)) {
      return null;
    }

    // Discard the possible alias.
    selection = selection.split(/\s+as\s+}/i)[0].trim();
    var dotIdx = selection.indexOf('.');

    if (dotIdx !== -1) {
      return {
        table: selection.substr(0, dotIdx),
        column: selection.substr(dotIdx + 1)
      };
    } else {
      return {
        table: null,
        column: selection
      };
    }
  };

  SelectOperation.prototype.call = function call(builder, args) {
    var selections = _lodash2.default.flatten(args);
    var ret = _WrappingQueryBuilder.prototype.call.call(this, builder, selections);

    for (var i = 0, l = selections.length; i < l; ++i) {
      var selection = SelectOperation.parseSelection(selections[i]);

      if (selection) {
        this.selections.push(selection);
      }
    }

    return ret;
  };

  SelectOperation.prototype.onBuild = function onBuild(builder) {
    builder[this.name].apply(builder, this.args);
  };

  SelectOperation.prototype.hasSelection = function hasSelection(fromTable, selection) {
    var select1 = SelectOperation.parseSelection(selection);

    if (!select1) {
      return false;
    }

    for (var i = 0, l = this.selections.length; i < l; ++i) {
      var select2 = this.selections[i];

      var match = select1.table === select2.table && select1.column === select2.column || select1.table === select2.table && select2.column === '*' || select1.table === null && select2.table === fromTable && select1.column === select2.column || select2.table === null && select1.table === fromTable && select1.column === select2.column;

      if (match) {
        return true;
      }
    }

    return false;
  };

  return SelectOperation;
}(_WrappingQueryBuilderOperation2.default);

exports.default = SelectOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlbGVjdE9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJTZWxlY3RPcGVyYXRpb24iLCJuYW1lIiwib3B0Iiwic2VsZWN0aW9ucyIsInBhcnNlU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiaXNTdHJpbmciLCJzcGxpdCIsInRyaW0iLCJkb3RJZHgiLCJpbmRleE9mIiwidGFibGUiLCJzdWJzdHIiLCJjb2x1bW4iLCJjYWxsIiwiYnVpbGRlciIsImFyZ3MiLCJmbGF0dGVuIiwicmV0IiwiaSIsImwiLCJsZW5ndGgiLCJwdXNoIiwib25CdWlsZCIsImFwcGx5IiwiaGFzU2VsZWN0aW9uIiwiZnJvbVRhYmxlIiwic2VsZWN0MSIsInNlbGVjdDIiLCJtYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsZTs7O0FBRW5CLDJCQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQixpQ0FBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUVyQixVQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBRnFCO0FBR3RCOztrQkFFTUMsYywyQkFBZUMsUyxFQUFXO0FBQy9CLFFBQUksQ0FBQyxpQkFBRUMsUUFBRixDQUFXRCxTQUFYLENBQUwsRUFBNEI7QUFDMUIsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7QUFDQUEsZ0JBQVlBLFVBQVVFLEtBQVYsQ0FBZ0IsWUFBaEIsRUFBOEIsQ0FBOUIsRUFBaUNDLElBQWpDLEVBQVo7QUFDQSxRQUFNQyxTQUFTSixVQUFVSyxPQUFWLENBQWtCLEdBQWxCLENBQWY7O0FBRUEsUUFBSUQsV0FBVyxDQUFDLENBQWhCLEVBQW1CO0FBQ2pCLGFBQU87QUFDTEUsZUFBT04sVUFBVU8sTUFBVixDQUFpQixDQUFqQixFQUFvQkgsTUFBcEIsQ0FERjtBQUVMSSxnQkFBUVIsVUFBVU8sTUFBVixDQUFpQkgsU0FBUyxDQUExQjtBQUZILE9BQVA7QUFJRCxLQUxELE1BS087QUFDTCxhQUFPO0FBQ0xFLGVBQU8sSUFERjtBQUVMRSxnQkFBUVI7QUFGSCxPQUFQO0FBSUQ7QUFDRixHOzs0QkFFRFMsSSxpQkFBS0MsTyxFQUFTQyxJLEVBQU07QUFDbEIsUUFBTWIsYUFBYSxpQkFBRWMsT0FBRixDQUFVRCxJQUFWLENBQW5CO0FBQ0EsUUFBTUUsTUFBTSxnQ0FBTUosSUFBTixZQUFXQyxPQUFYLEVBQW9CWixVQUFwQixDQUFaOztBQUVBLFNBQUssSUFBSWdCLElBQUksQ0FBUixFQUFXQyxJQUFJakIsV0FBV2tCLE1BQS9CLEVBQXVDRixJQUFJQyxDQUEzQyxFQUE4QyxFQUFFRCxDQUFoRCxFQUFtRDtBQUNqRCxVQUFNZCxZQUFZTCxnQkFBZ0JJLGNBQWhCLENBQStCRCxXQUFXZ0IsQ0FBWCxDQUEvQixDQUFsQjs7QUFFQSxVQUFJZCxTQUFKLEVBQWU7QUFDYixhQUFLRixVQUFMLENBQWdCbUIsSUFBaEIsQ0FBcUJqQixTQUFyQjtBQUNEO0FBQ0Y7O0FBRUQsV0FBT2EsR0FBUDtBQUNELEc7OzRCQUVESyxPLG9CQUFRUixPLEVBQVM7QUFDZkEsWUFBUSxLQUFLZCxJQUFiLEVBQW1CdUIsS0FBbkIsQ0FBeUJULE9BQXpCLEVBQWtDLEtBQUtDLElBQXZDO0FBQ0QsRzs7NEJBRURTLFkseUJBQWFDLFMsRUFBV3JCLFMsRUFBVztBQUNqQyxRQUFNc0IsVUFBVTNCLGdCQUFnQkksY0FBaEIsQ0FBK0JDLFNBQS9CLENBQWhCOztBQUVBLFFBQUksQ0FBQ3NCLE9BQUwsRUFBYztBQUNaLGFBQU8sS0FBUDtBQUNEOztBQUVELFNBQUssSUFBSVIsSUFBSSxDQUFSLEVBQVdDLElBQUksS0FBS2pCLFVBQUwsQ0FBZ0JrQixNQUFwQyxFQUE0Q0YsSUFBSUMsQ0FBaEQsRUFBbUQsRUFBRUQsQ0FBckQsRUFBd0Q7QUFDdEQsVUFBTVMsVUFBVSxLQUFLekIsVUFBTCxDQUFnQmdCLENBQWhCLENBQWhCOztBQUVBLFVBQU1VLFFBQVNGLFFBQVFoQixLQUFSLEtBQWtCaUIsUUFBUWpCLEtBQTFCLElBQW1DZ0IsUUFBUWQsTUFBUixLQUFtQmUsUUFBUWYsTUFBL0QsSUFDUmMsUUFBUWhCLEtBQVIsS0FBa0JpQixRQUFRakIsS0FBMUIsSUFBbUNpQixRQUFRZixNQUFSLEtBQW1CLEdBRDlDLElBRVJjLFFBQVFoQixLQUFSLEtBQWtCLElBQWxCLElBQTBCaUIsUUFBUWpCLEtBQVIsS0FBa0JlLFNBQTVDLElBQXlEQyxRQUFRZCxNQUFSLEtBQW1CZSxRQUFRZixNQUY1RSxJQUdSZSxRQUFRakIsS0FBUixLQUFrQixJQUFsQixJQUEwQmdCLFFBQVFoQixLQUFSLEtBQWtCZSxTQUE1QyxJQUF5REMsUUFBUWQsTUFBUixLQUFtQmUsUUFBUWYsTUFIMUY7O0FBS0EsVUFBSWdCLEtBQUosRUFBVztBQUNULGVBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBRUQsV0FBTyxLQUFQO0FBQ0QsRzs7Ozs7a0JBckVrQjdCLGUiLCJmaWxlIjoiU2VsZWN0T3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBXcmFwcGluZ1F1ZXJ5QnVpbGRlck9wZXJhdGlvbiBmcm9tICcuL1dyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0T3BlcmF0aW9uIGV4dGVuZHMgV3JhcHBpbmdRdWVyeUJ1aWxkZXJPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG4gICAgdGhpcy5zZWxlY3Rpb25zID0gW107XG4gIH1cblxuICBzdGF0aWMgcGFyc2VTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XG4gICAgaWYgKCFfLmlzU3RyaW5nKHNlbGVjdGlvbikpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIERpc2NhcmQgdGhlIHBvc3NpYmxlIGFsaWFzLlxuICAgIHNlbGVjdGlvbiA9IHNlbGVjdGlvbi5zcGxpdCgvXFxzK2FzXFxzK30vaSlbMF0udHJpbSgpO1xuICAgIGNvbnN0IGRvdElkeCA9IHNlbGVjdGlvbi5pbmRleE9mKCcuJyk7XG5cbiAgICBpZiAoZG90SWR4ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFibGU6IHNlbGVjdGlvbi5zdWJzdHIoMCwgZG90SWR4KSxcbiAgICAgICAgY29sdW1uOiBzZWxlY3Rpb24uc3Vic3RyKGRvdElkeCArIDEpXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0YWJsZTogbnVsbCxcbiAgICAgICAgY29sdW1uOiBzZWxlY3Rpb25cbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgY2FsbChidWlsZGVyLCBhcmdzKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9ucyA9IF8uZmxhdHRlbihhcmdzKTtcbiAgICBjb25zdCByZXQgPSBzdXBlci5jYWxsKGJ1aWxkZXIsIHNlbGVjdGlvbnMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzZWxlY3Rpb25zLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3Qgc2VsZWN0aW9uID0gU2VsZWN0T3BlcmF0aW9uLnBhcnNlU2VsZWN0aW9uKHNlbGVjdGlvbnNbaV0pO1xuXG4gICAgICBpZiAoc2VsZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9ucy5wdXNoKHNlbGVjdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIG9uQnVpbGQoYnVpbGRlcikge1xuICAgIGJ1aWxkZXJbdGhpcy5uYW1lXS5hcHBseShidWlsZGVyLCB0aGlzLmFyZ3MpO1xuICB9XG5cbiAgaGFzU2VsZWN0aW9uKGZyb21UYWJsZSwgc2VsZWN0aW9uKSB7XG4gICAgY29uc3Qgc2VsZWN0MSA9IFNlbGVjdE9wZXJhdGlvbi5wYXJzZVNlbGVjdGlvbihzZWxlY3Rpb24pO1xuXG4gICAgaWYgKCFzZWxlY3QxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLnNlbGVjdGlvbnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBzZWxlY3QyID0gdGhpcy5zZWxlY3Rpb25zW2ldO1xuXG4gICAgICBjb25zdCBtYXRjaCA9IChzZWxlY3QxLnRhYmxlID09PSBzZWxlY3QyLnRhYmxlICYmIHNlbGVjdDEuY29sdW1uID09PSBzZWxlY3QyLmNvbHVtbilcbiAgICAgICAgfHwgKHNlbGVjdDEudGFibGUgPT09IHNlbGVjdDIudGFibGUgJiYgc2VsZWN0Mi5jb2x1bW4gPT09ICcqJylcbiAgICAgICAgfHwgKHNlbGVjdDEudGFibGUgPT09IG51bGwgJiYgc2VsZWN0Mi50YWJsZSA9PT0gZnJvbVRhYmxlICYmIHNlbGVjdDEuY29sdW1uID09PSBzZWxlY3QyLmNvbHVtbilcbiAgICAgICAgfHwgKHNlbGVjdDIudGFibGUgPT09IG51bGwgJiYgc2VsZWN0MS50YWJsZSA9PT0gZnJvbVRhYmxlICYmIHNlbGVjdDEuY29sdW1uID09PSBzZWxlY3QyLmNvbHVtbik7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0iXX0=