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

var _DeleteOperation2 = require('../../queryBuilder/operations/DeleteOperation');

var _DeleteOperation3 = _interopRequireDefault(_DeleteOperation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManyToManyDeleteSqliteOperation = function (_DeleteOperation) {
  (0, _inherits3.default)(ManyToManyDeleteSqliteOperation, _DeleteOperation);

  function ManyToManyDeleteSqliteOperation(name, opt) {
    (0, _classCallCheck3.default)(this, ManyToManyDeleteSqliteOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _DeleteOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owner = opt.owner;
    return _this;
  }

  ManyToManyDeleteSqliteOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    _DeleteOperation.prototype.onBeforeBuild.call(this, builder);
    this.relation.selectForModifySqlite(builder, this.owner).modify(this.relation.modify);
  };

  return ManyToManyDeleteSqliteOperation;
}(_DeleteOperation3.default);

exports.default = ManyToManyDeleteSqliteOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hbnlUb01hbnlEZWxldGVTcWxpdGVPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiTWFueVRvTWFueURlbGV0ZVNxbGl0ZU9wZXJhdGlvbiIsIm5hbWUiLCJvcHQiLCJyZWxhdGlvbiIsIm93bmVyIiwib25CZWZvcmVCdWlsZCIsImJ1aWxkZXIiLCJzZWxlY3RGb3JNb2RpZnlTcWxpdGUiLCJtb2RpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSwrQjs7O0FBRW5CLDJDQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQiw0QkFBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUdyQixVQUFLQyxRQUFMLEdBQWdCRCxJQUFJQyxRQUFwQjtBQUNBLFVBQUtDLEtBQUwsR0FBYUYsSUFBSUUsS0FBakI7QUFKcUI7QUFLdEI7OzRDQUVEQyxhLDBCQUFjQyxPLEVBQVM7QUFDckIsK0JBQU1ELGFBQU4sWUFBb0JDLE9BQXBCO0FBQ0EsU0FBS0gsUUFBTCxDQUFjSSxxQkFBZCxDQUFvQ0QsT0FBcEMsRUFBNkMsS0FBS0YsS0FBbEQsRUFBeURJLE1BQXpELENBQWdFLEtBQUtMLFFBQUwsQ0FBY0ssTUFBOUU7QUFDRCxHOzs7OztrQkFaa0JSLCtCIiwiZmlsZSI6Ik1hbnlUb01hbnlEZWxldGVTcWxpdGVPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVsZXRlT3BlcmF0aW9uIGZyb20gJy4uLy4uL3F1ZXJ5QnVpbGRlci9vcGVyYXRpb25zL0RlbGV0ZU9wZXJhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbnlUb01hbnlEZWxldGVTcWxpdGVPcGVyYXRpb24gZXh0ZW5kcyBEZWxldGVPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG5cbiAgICB0aGlzLnJlbGF0aW9uID0gb3B0LnJlbGF0aW9uO1xuICAgIHRoaXMub3duZXIgPSBvcHQub3duZXI7XG4gIH1cblxuICBvbkJlZm9yZUJ1aWxkKGJ1aWxkZXIpIHtcbiAgICBzdXBlci5vbkJlZm9yZUJ1aWxkKGJ1aWxkZXIpO1xuICAgIHRoaXMucmVsYXRpb24uc2VsZWN0Rm9yTW9kaWZ5U3FsaXRlKGJ1aWxkZXIsIHRoaXMub3duZXIpLm1vZGlmeSh0aGlzLnJlbGF0aW9uLm1vZGlmeSk7XG4gIH1cbn1cbiJdfQ==