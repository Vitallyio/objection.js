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

var WhereRefOperation = function (_WrappingQueryBuilder) {
  (0, _inherits3.default)(WhereRefOperation, _WrappingQueryBuilder);

  function WhereRefOperation() {
    (0, _classCallCheck3.default)(this, WhereRefOperation);
    return (0, _possibleConstructorReturn3.default)(this, _WrappingQueryBuilder.apply(this, arguments));
  }

  WhereRefOperation.prototype.onBuild = function onBuild(knexBuilder) {
    if (this.args.length === 2) {
      this.whereRef(knexBuilder, this.args[0], '=', this.args[1]);
    } else if (this.args.length === 3) {
      this.whereRef(knexBuilder, this.args[0], this.args[1], this.args[2]);
    } else {
      throw new Error('expected 2 or 3 arguments');
    }
  };

  WhereRefOperation.prototype.whereRef = function whereRef(knexBuilder, lhs, op, rhs) {
    var formatter = knexBuilder.client.formatter();
    op = formatter.operator(op);

    if (typeof lhs !== 'string' || typeof rhs !== 'string' || typeof op !== 'string') {
      throw new Error('whereRef: invalid operands or operator');
    }

    var sql = formatter.wrap(lhs) + ' ' + op + ' ' + formatter.wrap(rhs);

    if (this.opt.bool === 'or') {
      knexBuilder.orWhereRaw(sql);
    } else {
      knexBuilder.whereRaw(sql);
    }
  };

  return WhereRefOperation;
}(_WrappingQueryBuilderOperation2.default);

exports.default = WhereRefOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldoZXJlUmVmT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIldoZXJlUmVmT3BlcmF0aW9uIiwib25CdWlsZCIsImtuZXhCdWlsZGVyIiwiYXJncyIsImxlbmd0aCIsIndoZXJlUmVmIiwiRXJyb3IiLCJsaHMiLCJvcCIsInJocyIsImZvcm1hdHRlciIsImNsaWVudCIsIm9wZXJhdG9yIiwic3FsIiwid3JhcCIsIm9wdCIsImJvb2wiLCJvcldoZXJlUmF3Iiwid2hlcmVSYXciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxpQjs7Ozs7Ozs7OEJBRW5CQyxPLG9CQUFRQyxXLEVBQWE7QUFDbkIsUUFBSSxLQUFLQyxJQUFMLENBQVVDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsV0FBS0MsUUFBTCxDQUFjSCxXQUFkLEVBQTJCLEtBQUtDLElBQUwsQ0FBVSxDQUFWLENBQTNCLEVBQXlDLEdBQXpDLEVBQThDLEtBQUtBLElBQUwsQ0FBVSxDQUFWLENBQTlDO0FBQ0QsS0FGRCxNQUVPLElBQUksS0FBS0EsSUFBTCxDQUFVQyxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQ2pDLFdBQUtDLFFBQUwsQ0FBY0gsV0FBZCxFQUEyQixLQUFLQyxJQUFMLENBQVUsQ0FBVixDQUEzQixFQUF5QyxLQUFLQSxJQUFMLENBQVUsQ0FBVixDQUF6QyxFQUF1RCxLQUFLQSxJQUFMLENBQVUsQ0FBVixDQUF2RDtBQUNELEtBRk0sTUFFQTtBQUNMLFlBQU0sSUFBSUcsS0FBSixDQUFVLDJCQUFWLENBQU47QUFDRDtBQUNGLEc7OzhCQUVERCxRLHFCQUFTSCxXLEVBQWFLLEcsRUFBS0MsRSxFQUFJQyxHLEVBQUs7QUFDbEMsUUFBTUMsWUFBWVIsWUFBWVMsTUFBWixDQUFtQkQsU0FBbkIsRUFBbEI7QUFDQUYsU0FBS0UsVUFBVUUsUUFBVixDQUFtQkosRUFBbkIsQ0FBTDs7QUFFQSxRQUFJLE9BQU9ELEdBQVAsS0FBZSxRQUFmLElBQTJCLE9BQU9FLEdBQVAsS0FBZSxRQUExQyxJQUFzRCxPQUFPRCxFQUFQLEtBQWMsUUFBeEUsRUFBa0Y7QUFDaEYsWUFBTSxJQUFJRixLQUFKLENBQVUsd0NBQVYsQ0FBTjtBQUNEOztBQUVELFFBQUlPLE1BQU1ILFVBQVVJLElBQVYsQ0FBZVAsR0FBZixJQUFzQixHQUF0QixHQUE0QkMsRUFBNUIsR0FBaUMsR0FBakMsR0FBdUNFLFVBQVVJLElBQVYsQ0FBZUwsR0FBZixDQUFqRDs7QUFFQSxRQUFJLEtBQUtNLEdBQUwsQ0FBU0MsSUFBVCxLQUFrQixJQUF0QixFQUE0QjtBQUMxQmQsa0JBQVllLFVBQVosQ0FBdUJKLEdBQXZCO0FBQ0QsS0FGRCxNQUVPO0FBQ0xYLGtCQUFZZ0IsUUFBWixDQUFxQkwsR0FBckI7QUFDRDtBQUNGLEc7Ozs7O2tCQTNCa0JiLGlCIiwiZmlsZSI6IldoZXJlUmVmT3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uIGZyb20gJy4vV3JhcHBpbmdRdWVyeUJ1aWxkZXJPcGVyYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaGVyZVJlZk9wZXJhdGlvbiBleHRlbmRzIFdyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uIHtcblxuICBvbkJ1aWxkKGtuZXhCdWlsZGVyKSB7XG4gICAgaWYgKHRoaXMuYXJncy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHRoaXMud2hlcmVSZWYoa25leEJ1aWxkZXIsIHRoaXMuYXJnc1swXSwgJz0nLCB0aGlzLmFyZ3NbMV0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hcmdzLmxlbmd0aCA9PT0gMykge1xuICAgICAgdGhpcy53aGVyZVJlZihrbmV4QnVpbGRlciwgdGhpcy5hcmdzWzBdLCB0aGlzLmFyZ3NbMV0sIHRoaXMuYXJnc1syXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgMiBvciAzIGFyZ3VtZW50cycpO1xuICAgIH1cbiAgfVxuXG4gIHdoZXJlUmVmKGtuZXhCdWlsZGVyLCBsaHMsIG9wLCByaHMpIHtcbiAgICBjb25zdCBmb3JtYXR0ZXIgPSBrbmV4QnVpbGRlci5jbGllbnQuZm9ybWF0dGVyKCk7XG4gICAgb3AgPSBmb3JtYXR0ZXIub3BlcmF0b3Iob3ApO1xuXG4gICAgaWYgKHR5cGVvZiBsaHMgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiByaHMgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignd2hlcmVSZWY6IGludmFsaWQgb3BlcmFuZHMgb3Igb3BlcmF0b3InKTtcbiAgICB9XG5cbiAgICBsZXQgc3FsID0gZm9ybWF0dGVyLndyYXAobGhzKSArICcgJyArIG9wICsgJyAnICsgZm9ybWF0dGVyLndyYXAocmhzKTtcblxuICAgIGlmICh0aGlzLm9wdC5ib29sID09PSAnb3InKSB7XG4gICAgICBrbmV4QnVpbGRlci5vcldoZXJlUmF3KHNxbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtuZXhCdWlsZGVyLndoZXJlUmF3KHNxbCk7XG4gICAgfVxuICB9XG59XG5cbiJdfQ==