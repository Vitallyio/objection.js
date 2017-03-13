'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _RelationFindOperation = require('../RelationFindOperation');

var _RelationFindOperation2 = _interopRequireDefault(_RelationFindOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ownerJoinColumnAliasPrefix = 'objectiontmpjoin';

var ManyToManyFindOperation = function (_RelationFindOperatio) {
  (0, _inherits3.default)(ManyToManyFindOperation, _RelationFindOperatio);

  function ManyToManyFindOperation(name, opt) {
    (0, _classCallCheck3.default)(this, ManyToManyFindOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _RelationFindOperatio.call(this, name, opt));

    _this.ownerJoinColumnAlias = new Array(_this.relation.joinTableOwnerCol.length);

    for (var i = 0, l = _this.relation.joinTableOwnerCol.length; i < l; ++i) {
      _this.ownerJoinColumnAlias[i] = ownerJoinColumnAliasPrefix + i;
    }
    return _this;
  }

  ManyToManyFindOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    var relatedModelClass = this.relation.relatedModelClass;
    var ids = new Array(this.owners.length);

    for (var i = 0, l = this.owners.length; i < l; ++i) {
      ids[i] = this.owners[i].$values(this.relation.ownerProp);
    }

    if (!builder.has(builder.constructor.SelectSelector)) {
      // If the user hasn't specified a select clause, select the related model's columns.
      // If we don't do this we also get the join table's columns.
      builder.select(relatedModelClass.tableName + '.*');

      // Also select all extra columns.
      for (var _i = 0, _l = this.relation.joinTableExtras.length; _i < _l; ++_i) {
        var extra = this.relation.joinTableExtras[_i];
        var joinTable = this.relation.joinTable;

        builder.select(joinTable + '.' + extra.joinTableCol + ' as ' + extra.aliasCol);
      }
    }

    this.relation.findQuery(builder, {
      ownerIds: _lodash2.default.uniqBy(ids, join)
    });

    var fullJoinTableOwnerCol = this.relation.fullJoinTableOwnerCol();
    // We must select the owner join columns so that we know for which owner model the related
    // models belong to after the requests.
    for (var _i2 = 0, _l2 = fullJoinTableOwnerCol.length; _i2 < _l2; ++_i2) {
      builder.select(fullJoinTableOwnerCol[_i2] + ' as ' + this.ownerJoinColumnAlias[_i2]);

      // Mark them to be omitted later.
      this.omitProps.push(relatedModelClass.columnNameToPropertyName(this.ownerJoinColumnAlias[_i2]));
    }

    this.addJoinColumnSelects(builder);
  };

  ManyToManyFindOperation.prototype.onAfterInternal = function onAfterInternal(builder, related) {
    var isOneToOne = this.relation.isOneToOne();
    var relatedByOwnerId = (0, _create2.default)(null);

    for (var i = 0, l = related.length; i < l; ++i) {
      var rel = related[i];
      var key = rel.$propKey(this.ownerJoinColumnAlias);
      var arr = relatedByOwnerId[key];

      if (!arr) {
        arr = [];
        relatedByOwnerId[key] = arr;
      }

      arr.push(rel);
    }

    for (var _i3 = 0, _l3 = this.owners.length; _i3 < _l3; ++_i3) {
      var own = this.owners[_i3];
      var _key = own.$propKey(this.relation.ownerProp);
      var _related = relatedByOwnerId[_key];

      if (isOneToOne) {
        own[this.relation.name] = _related && _related[0] || null;
      } else {
        own[this.relation.name] = _related || [];
      }
    }

    if (this.alwaysReturnArray) {
      return related;
    } else {
      return isOneToOne ? related[0] || undefined : related;
    }
  };

  return ManyToManyFindOperation;
}(_RelationFindOperation2.default);

exports.default = ManyToManyFindOperation;


function join(arr) {
  return arr.join();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hbnlUb01hbnlGaW5kT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIm93bmVySm9pbkNvbHVtbkFsaWFzUHJlZml4IiwiTWFueVRvTWFueUZpbmRPcGVyYXRpb24iLCJuYW1lIiwib3B0Iiwib3duZXJKb2luQ29sdW1uQWxpYXMiLCJBcnJheSIsInJlbGF0aW9uIiwiam9pblRhYmxlT3duZXJDb2wiLCJsZW5ndGgiLCJpIiwibCIsIm9uQmVmb3JlQnVpbGQiLCJidWlsZGVyIiwicmVsYXRlZE1vZGVsQ2xhc3MiLCJpZHMiLCJvd25lcnMiLCIkdmFsdWVzIiwib3duZXJQcm9wIiwiaGFzIiwiY29uc3RydWN0b3IiLCJTZWxlY3RTZWxlY3RvciIsInNlbGVjdCIsInRhYmxlTmFtZSIsImpvaW5UYWJsZUV4dHJhcyIsImV4dHJhIiwiam9pblRhYmxlIiwiam9pblRhYmxlQ29sIiwiYWxpYXNDb2wiLCJmaW5kUXVlcnkiLCJvd25lcklkcyIsInVuaXFCeSIsImpvaW4iLCJmdWxsSm9pblRhYmxlT3duZXJDb2wiLCJvbWl0UHJvcHMiLCJwdXNoIiwiY29sdW1uTmFtZVRvUHJvcGVydHlOYW1lIiwiYWRkSm9pbkNvbHVtblNlbGVjdHMiLCJvbkFmdGVySW50ZXJuYWwiLCJyZWxhdGVkIiwiaXNPbmVUb09uZSIsInJlbGF0ZWRCeU93bmVySWQiLCJyZWwiLCJrZXkiLCIkcHJvcEtleSIsImFyciIsIm93biIsImFsd2F5c1JldHVybkFycmF5IiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLDZCQUE2QixrQkFBbkM7O0lBRXFCQyx1Qjs7O0FBRW5CLG1DQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQixpQ0FBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUdyQixVQUFLQyxvQkFBTCxHQUE0QixJQUFJQyxLQUFKLENBQVUsTUFBS0MsUUFB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QU1KLGlCQUFpQkUsR0FBakIsQ0FBVjs7QUFFQSxVQUFJLENBQUNFLEdBQUwsRUFBVTtBQUNSQSxjQUFNLEVBQU47QUFDQUoseUJBQWlCRSxHQUFqQixJQUF3QkUsR0FBeEI7QUFDRDs7QUFFREEsVUFBSVYsSUFBSixDQUFTTyxHQUFUO0FBQ0Q7O0FBRUQsU0FBSyxJQUFJaEMsTUFBSSxDQUFSLEVBQVdDLE1BQUksS0FBS0ssTUFBTCxDQUFZUCxNQUFoQyxFQUF3Q0MsTUFBSUMsR0FBNUMsRUFBK0MsRUFBRUQsR0FBakQsRUFBb0Q7QUFDbEQsVUFBTW9DLE1BQU0sS0FBSzlCLE1BQUwsQ0FBWU4sR0FBWixDQUFaO0FBQ0EsVUFBTWlDLE9BQU1HLElBQUlGLFFBQUosQ0FBYSxLQUFLckMsUUFBTCxDQUFjVyxTQUEzQixDQUFaO0FBQ0EsVUFBTXFCLFdBQVVFLGlCQUFpQkUsSUFBakIsQ0FBaEI7O0FBRUEsVUFBSUgsVUFBSixFQUFnQjtBQUNkTSxZQUFJLEtBQUt2QyxRQUFMLENBQWNKLElBQWxCLElBQTJCb0MsWUFBV0EsU0FBUSxDQUFSLENBQVosSUFBMkIsSUFBckQ7QUFDRCxPQUZELE1BRU87QUFDTE8sWUFBSSxLQUFLdkMsUUFBTCxDQUFjSixJQUFsQixJQUEwQm9DLFlBQVcsRUFBckM7QUFDRDtBQUNGOztBQUVELFFBQUksS0FBS1EsaUJBQVQsRUFBNEI7QUFDMUIsYUFBT1IsT0FBUDtBQUNELEtBRkQsTUFFTztBQUNMLGFBQU9DLGFBQWFELFFBQVEsQ0FBUixLQUFjUyxTQUEzQixHQUF1Q1QsT0FBOUM7QUFDRDtBQUNGLEc7Ozs7O2tCQXJGa0JyQyx1Qjs7O0FBd0ZyQixTQUFTOEIsSUFBVCxDQUFjYSxHQUFkLEVBQW1CO0FBQ2pCLFNBQU9BLElBQUliLElBQUosRUFBUDtBQUNEIiwiZmlsZSI6Ik1hbnlUb01hbnlGaW5kT3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBSZWxhdGlvbkZpbmRPcGVyYXRpb24gZnJvbSAnLi4vUmVsYXRpb25GaW5kT3BlcmF0aW9uJztcblxuY29uc3Qgb3duZXJKb2luQ29sdW1uQWxpYXNQcmVmaXggPSAnb2JqZWN0aW9udG1wam9pbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbnlUb01hbnlGaW5kT3BlcmF0aW9uIGV4dGVuZHMgUmVsYXRpb25GaW5kT3BlcmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHQpIHtcbiAgICBzdXBlcihuYW1lLCBvcHQpO1xuXG4gICAgdGhpcy5vd25lckpvaW5Db2x1bW5BbGlhcyA9IG5ldyBBcnJheSh0aGlzLnJlbGF0aW9uLmpvaW5UYWJsZU93bmVyQ29sLmxlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMucmVsYXRpb24uam9pblRhYmxlT3duZXJDb2wubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICB0aGlzLm93bmVySm9pbkNvbHVtbkFsaWFzW2ldID0gb3duZXJKb2luQ29sdW1uQWxpYXNQcmVmaXggKyBpO1xuICAgIH1cbiAgfVxuXG4gIG9uQmVmb3JlQnVpbGQoYnVpbGRlcikge1xuICAgIGNvbnN0IHJlbGF0ZWRNb2RlbENsYXNzID0gdGhpcy5yZWxhdGlvbi5yZWxhdGVkTW9kZWxDbGFzcztcbiAgICBjb25zdCBpZHMgPSBuZXcgQXJyYXkodGhpcy5vd25lcnMubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5vd25lcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBpZHNbaV0gPSB0aGlzLm93bmVyc1tpXS4kdmFsdWVzKHRoaXMucmVsYXRpb24ub3duZXJQcm9wKTtcbiAgICB9XG5cbiAgICBpZiAoIWJ1aWxkZXIuaGFzKGJ1aWxkZXIuY29uc3RydWN0b3IuU2VsZWN0U2VsZWN0b3IpKSB7XG4gICAgICAvLyBJZiB0aGUgdXNlciBoYXNuJ3Qgc3BlY2lmaWVkIGEgc2VsZWN0IGNsYXVzZSwgc2VsZWN0IHRoZSByZWxhdGVkIG1vZGVsJ3MgY29sdW1ucy5cbiAgICAgIC8vIElmIHdlIGRvbid0IGRvIHRoaXMgd2UgYWxzbyBnZXQgdGhlIGpvaW4gdGFibGUncyBjb2x1bW5zLlxuICAgICAgYnVpbGRlci5zZWxlY3QocmVsYXRlZE1vZGVsQ2xhc3MudGFibGVOYW1lICsgJy4qJyk7XG5cbiAgICAgIC8vIEFsc28gc2VsZWN0IGFsbCBleHRyYSBjb2x1bW5zLlxuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLnJlbGF0aW9uLmpvaW5UYWJsZUV4dHJhcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgY29uc3QgZXh0cmEgPSB0aGlzLnJlbGF0aW9uLmpvaW5UYWJsZUV4dHJhc1tpXTtcbiAgICAgICAgY29uc3Qgam9pblRhYmxlID0gdGhpcy5yZWxhdGlvbi5qb2luVGFibGU7XG5cbiAgICAgICAgYnVpbGRlci5zZWxlY3QoYCR7am9pblRhYmxlfS4ke2V4dHJhLmpvaW5UYWJsZUNvbH0gYXMgJHtleHRyYS5hbGlhc0NvbH1gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlbGF0aW9uLmZpbmRRdWVyeShidWlsZGVyLCB7XG4gICAgICBvd25lcklkczogXy51bmlxQnkoaWRzLCBqb2luKVxuICAgIH0pO1xuXG4gICAgY29uc3QgZnVsbEpvaW5UYWJsZU93bmVyQ29sID0gdGhpcy5yZWxhdGlvbi5mdWxsSm9pblRhYmxlT3duZXJDb2woKTtcbiAgICAvLyBXZSBtdXN0IHNlbGVjdCB0aGUgb3duZXIgam9pbiBjb2x1bW5zIHNvIHRoYXQgd2Uga25vdyBmb3Igd2hpY2ggb3duZXIgbW9kZWwgdGhlIHJlbGF0ZWRcbiAgICAvLyBtb2RlbHMgYmVsb25nIHRvIGFmdGVyIHRoZSByZXF1ZXN0cy5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGZ1bGxKb2luVGFibGVPd25lckNvbC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGJ1aWxkZXIuc2VsZWN0KGZ1bGxKb2luVGFibGVPd25lckNvbFtpXSArICcgYXMgJyArIHRoaXMub3duZXJKb2luQ29sdW1uQWxpYXNbaV0pO1xuXG4gICAgICAvLyBNYXJrIHRoZW0gdG8gYmUgb21pdHRlZCBsYXRlci5cbiAgICAgIHRoaXMub21pdFByb3BzLnB1c2gocmVsYXRlZE1vZGVsQ2xhc3MuY29sdW1uTmFtZVRvUHJvcGVydHlOYW1lKHRoaXMub3duZXJKb2luQ29sdW1uQWxpYXNbaV0pKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZEpvaW5Db2x1bW5TZWxlY3RzKGJ1aWxkZXIpO1xuICB9XG5cbiAgb25BZnRlckludGVybmFsKGJ1aWxkZXIsIHJlbGF0ZWQpIHtcbiAgICBjb25zdCBpc09uZVRvT25lID0gdGhpcy5yZWxhdGlvbi5pc09uZVRvT25lKCk7XG4gICAgY29uc3QgcmVsYXRlZEJ5T3duZXJJZCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHJlbGF0ZWQubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCByZWwgPSByZWxhdGVkW2ldO1xuICAgICAgY29uc3Qga2V5ID0gcmVsLiRwcm9wS2V5KHRoaXMub3duZXJKb2luQ29sdW1uQWxpYXMpO1xuICAgICAgbGV0IGFyciA9IHJlbGF0ZWRCeU93bmVySWRba2V5XTtcblxuICAgICAgaWYgKCFhcnIpIHtcbiAgICAgICAgYXJyID0gW107XG4gICAgICAgIHJlbGF0ZWRCeU93bmVySWRba2V5XSA9IGFycjtcbiAgICAgIH1cblxuICAgICAgYXJyLnB1c2gocmVsKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMub3duZXJzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3Qgb3duID0gdGhpcy5vd25lcnNbaV07XG4gICAgICBjb25zdCBrZXkgPSBvd24uJHByb3BLZXkodGhpcy5yZWxhdGlvbi5vd25lclByb3ApO1xuICAgICAgY29uc3QgcmVsYXRlZCA9IHJlbGF0ZWRCeU93bmVySWRba2V5XTtcblxuICAgICAgaWYgKGlzT25lVG9PbmUpIHtcbiAgICAgICAgb3duW3RoaXMucmVsYXRpb24ubmFtZV0gPSAocmVsYXRlZCAmJiByZWxhdGVkWzBdKSB8fCBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3duW3RoaXMucmVsYXRpb24ubmFtZV0gPSByZWxhdGVkIHx8IFtdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmFsd2F5c1JldHVybkFycmF5KSB7XG4gICAgICByZXR1cm4gcmVsYXRlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzT25lVG9PbmUgPyByZWxhdGVkWzBdIHx8IHVuZGVmaW5lZCA6IHJlbGF0ZWQ7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGpvaW4oYXJyKSB7XG4gIHJldHVybiBhcnIuam9pbigpO1xufSJdfQ==