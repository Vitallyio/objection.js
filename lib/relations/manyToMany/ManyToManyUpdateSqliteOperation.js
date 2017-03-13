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

var _UpdateOperation2 = require('../../queryBuilder/operations/UpdateOperation');

var _UpdateOperation3 = _interopRequireDefault(_UpdateOperation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManyToManyUpdateSqliteOperation = function (_UpdateOperation) {
  (0, _inherits3.default)(ManyToManyUpdateSqliteOperation, _UpdateOperation);

  function ManyToManyUpdateSqliteOperation(name, opt) {
    (0, _classCallCheck3.default)(this, ManyToManyUpdateSqliteOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _UpdateOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owner = opt.owner;
    return _this;
  }

  ManyToManyUpdateSqliteOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    _UpdateOperation.prototype.onBeforeBuild.call(this, builder);
    this.relation.selectForModifySqlite(builder, this.owner).modify(this.relation.modify);
  };

  return ManyToManyUpdateSqliteOperation;
}(_UpdateOperation3.default);

exports.default = ManyToManyUpdateSqliteOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hbnlUb01hbnlVcGRhdGVTcWxpdGVPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiTWFueVRvTWFueVVwZGF0ZVNxbGl0ZU9wZXJhdGlvbiIsIm5hbWUiLCJvcHQiLCJyZWxhdGlvbiIsIm93bmVyIiwib25CZWZvcmVCdWlsZCIsImJ1aWxkZXIiLCJzZWxlY3RGb3JNb2RpZnlTcWxpdGUiLCJtb2RpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSwrQjs7O0FBRW5CLDJDQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQiw0QkFBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUdyQixVQUFLQyxRQUFMLEdBQWdCRCxJQUFJQyxRQUFwQjtBQUNBLFVBQUtDLEtBQUwsR0FBYUYsSUFBSUUsS0FBakI7QUFKcUI7QUFLdEI7OzRDQUVEQyxhLDBCQUFjQyxPLEVBQVM7QUFDckIsK0JBQU1ELGFBQU4sWUFBb0JDLE9BQXBCO0FBQ0EsU0FBS0gsUUFBTCxDQUFjSSxxQkFBZCxDQUFvQ0QsT0FBcEMsRUFBNkMsS0FBS0YsS0FBbEQsRUFBeURJLE1BQXpELENBQWdFLEtBQUtMLFFBQUwsQ0FBY0ssTUFBOUU7QUFDRCxHOzs7OztrQkFaa0JSLCtCIiwiZmlsZSI6Ik1hbnlUb01hbnlVcGRhdGVTcWxpdGVPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXBkYXRlT3BlcmF0aW9uIGZyb20gJy4uLy4uL3F1ZXJ5QnVpbGRlci9vcGVyYXRpb25zL1VwZGF0ZU9wZXJhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbnlUb01hbnlVcGRhdGVTcWxpdGVPcGVyYXRpb24gZXh0ZW5kcyBVcGRhdGVPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG5cbiAgICB0aGlzLnJlbGF0aW9uID0gb3B0LnJlbGF0aW9uO1xuICAgIHRoaXMub3duZXIgPSBvcHQub3duZXI7XG4gIH1cblxuICBvbkJlZm9yZUJ1aWxkKGJ1aWxkZXIpIHtcbiAgICBzdXBlci5vbkJlZm9yZUJ1aWxkKGJ1aWxkZXIpO1xuICAgIHRoaXMucmVsYXRpb24uc2VsZWN0Rm9yTW9kaWZ5U3FsaXRlKGJ1aWxkZXIsIHRoaXMub3duZXIpLm1vZGlmeSh0aGlzLnJlbGF0aW9uLm1vZGlmeSk7XG4gIH1cbn1cbiJdfQ==