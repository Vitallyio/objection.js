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

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

var _QueryBuilderOperation = require('./QueryBuilderOperation');

var _QueryBuilderOperation2 = _interopRequireDefault(_QueryBuilderOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EagerOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(EagerOperation, _QueryBuilderOperatio);

  function EagerOperation(name, opt) {
    (0, _classCallCheck3.default)(this, EagerOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.call(this, name, opt));

    _this.expression = null;
    _this.filters = null;
    return _this;
  }

  EagerOperation.prototype.clone = function clone(props) {
    props = props || {};
    var copy = new this.constructor(this.name, props.opt || (0, _clone3.default)(this.opt));

    copy.isWriteOperation = this.isWriteOperation;
    copy.expression = this.expression.clone();
    copy.filters = (0, _clone3.default)(this.filters);

    return copy;
  };

  EagerOperation.prototype.call = function call(builder, args) {
    this.expression = args[0].clone();
    this.filters = args[1];

    for (var i = 0, l = this.filters.length; i < l; ++i) {
      var filter = this.filters[i];
      this.expression.addAnonymousFilterAtPath(filter.path, filter.filter);
    }

    return true;
  };

  return EagerOperation;
}(_QueryBuilderOperation2.default);

exports.default = EagerOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVhZ2VyT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIkVhZ2VyT3BlcmF0aW9uIiwibmFtZSIsIm9wdCIsImV4cHJlc3Npb24iLCJmaWx0ZXJzIiwiY2xvbmUiLCJwcm9wcyIsImNvcHkiLCJjb25zdHJ1Y3RvciIsImlzV3JpdGVPcGVyYXRpb24iLCJjYWxsIiwiYnVpbGRlciIsImFyZ3MiLCJpIiwibCIsImxlbmd0aCIsImZpbHRlciIsImFkZEFub255bW91c0ZpbHRlckF0UGF0aCIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLGM7OztBQUVuQiwwQkFBWUMsSUFBWixFQUFrQkMsR0FBbEIsRUFBdUI7QUFBQTs7QUFBQSwrREFDckIsaUNBQU1ELElBQU4sRUFBWUMsR0FBWixDQURxQjs7QUFHckIsVUFBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFVBQUtDLE9BQUwsR0FBZSxJQUFmO0FBSnFCO0FBS3RCOzsyQkFFREMsSyxrQkFBTUMsSyxFQUFPO0FBQ1hBLFlBQVFBLFNBQVMsRUFBakI7QUFDQSxRQUFNQyxPQUFPLElBQUksS0FBS0MsV0FBVCxDQUFxQixLQUFLUCxJQUExQixFQUFnQ0ssTUFBTUosR0FBTixJQUFhLHFCQUFNLEtBQUtBLEdBQVgsQ0FBN0MsQ0FBYjs7QUFFQUssU0FBS0UsZ0JBQUwsR0FBd0IsS0FBS0EsZ0JBQTdCO0FBQ0FGLFNBQUtKLFVBQUwsR0FBa0IsS0FBS0EsVUFBTCxDQUFnQkUsS0FBaEIsRUFBbEI7QUFDQUUsU0FBS0gsT0FBTCxHQUFlLHFCQUFNLEtBQUtBLE9BQVgsQ0FBZjs7QUFFQSxXQUFPRyxJQUFQO0FBQ0QsRzs7MkJBRURHLEksaUJBQUtDLE8sRUFBU0MsSSxFQUFNO0FBQ2xCLFNBQUtULFVBQUwsR0FBa0JTLEtBQUssQ0FBTCxFQUFRUCxLQUFSLEVBQWxCO0FBQ0EsU0FBS0QsT0FBTCxHQUFlUSxLQUFLLENBQUwsQ0FBZjs7QUFFQSxTQUFLLElBQUlDLElBQUksQ0FBUixFQUFXQyxJQUFJLEtBQUtWLE9BQUwsQ0FBYVcsTUFBakMsRUFBeUNGLElBQUlDLENBQTdDLEVBQWdELEVBQUVELENBQWxELEVBQXFEO0FBQ25ELFVBQU1HLFNBQVMsS0FBS1osT0FBTCxDQUFhUyxDQUFiLENBQWY7QUFDQSxXQUFLVixVQUFMLENBQWdCYyx3QkFBaEIsQ0FBeUNELE9BQU9FLElBQWhELEVBQXNERixPQUFPQSxNQUE3RDtBQUNEOztBQUVELFdBQU8sSUFBUDtBQUNELEc7Ozs7O2tCQTlCa0JoQixjIiwiZmlsZSI6IkVhZ2VyT3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNsb25lIGZyb20gJ2xvZGFzaC9jbG9uZSc7XG5pbXBvcnQgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIGZyb20gJy4vUXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWFnZXJPcGVyYXRpb24gZXh0ZW5kcyBRdWVyeUJ1aWxkZXJPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG5cbiAgICB0aGlzLmV4cHJlc3Npb24gPSBudWxsO1xuICAgIHRoaXMuZmlsdGVycyA9IG51bGw7XG4gIH1cblxuICBjbG9uZShwcm9wcykge1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgY29uc3QgY29weSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMubmFtZSwgcHJvcHMub3B0IHx8IGNsb25lKHRoaXMub3B0KSk7XG5cbiAgICBjb3B5LmlzV3JpdGVPcGVyYXRpb24gPSB0aGlzLmlzV3JpdGVPcGVyYXRpb247XG4gICAgY29weS5leHByZXNzaW9uID0gdGhpcy5leHByZXNzaW9uLmNsb25lKCk7XG4gICAgY29weS5maWx0ZXJzID0gY2xvbmUodGhpcy5maWx0ZXJzKTtcblxuICAgIHJldHVybiBjb3B5O1xuICB9XG5cbiAgY2FsbChidWlsZGVyLCBhcmdzKSB7XG4gICAgdGhpcy5leHByZXNzaW9uID0gYXJnc1swXS5jbG9uZSgpO1xuICAgIHRoaXMuZmlsdGVycyA9IGFyZ3NbMV07XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuZmlsdGVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IGZpbHRlciA9IHRoaXMuZmlsdGVyc1tpXTtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbi5hZGRBbm9ueW1vdXNGaWx0ZXJBdFBhdGgoZmlsdGVyLnBhdGgsIGZpbHRlci5maWx0ZXIpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59Il19