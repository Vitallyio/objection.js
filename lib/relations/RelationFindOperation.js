'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _FindOperation2 = require('../queryBuilder/operations/FindOperation');

var _FindOperation3 = _interopRequireDefault(_FindOperation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RelationFindOperation = function (_FindOperation) {
  (0, _inherits3.default)(RelationFindOperation, _FindOperation);

  function RelationFindOperation(name, opt) {
    (0, _classCallCheck3.default)(this, RelationFindOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _FindOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owners = opt.owners;
    _this.alwaysReturnArray = false;
    _this.omitProps = [];
    return _this;
  }

  RelationFindOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    var ids = new Array(this.owners.length);

    for (var i = 0, l = this.owners.length; i < l; ++i) {
      ids[i] = this.owners[i].$values(this.relation.ownerProp);
    }

    this.relation.findQuery(builder, {
      ownerIds: _lodash2.default.uniqBy(ids, join)
    });

    this.addJoinColumnSelects(builder);
  };

  RelationFindOperation.prototype.onAfter = function onAfter(builder, related) {
    this.omitImplicitJoinProps(related);
    return _FindOperation.prototype.onAfter.call(this, builder, related);
  };

  RelationFindOperation.prototype.onAfterInternal = function onAfterInternal(builder, related) {
    this.createRelationProp(this.owners, related);

    if (!this.alwaysReturnArray && this.relation.isOneToOne() && related.length <= 1) {
      return related[0] || undefined;
    } else {
      return related;
    }
  };

  RelationFindOperation.prototype.createRelationProp = function createRelationProp(owners, related) {
    var isOneToOne = this.relation.isOneToOne();
    var relatedByOwnerId = (0, _create2.default)(null);

    for (var i = 0, l = related.length; i < l; ++i) {
      var rel = related[i];
      var key = rel.$propKey(this.relation.relatedProp);
      var arr = relatedByOwnerId[key];

      if (!arr) {
        arr = [];
        relatedByOwnerId[key] = arr;
      }

      arr.push(rel);
    }

    for (var _i = 0, _l = owners.length; _i < _l; ++_i) {
      var own = owners[_i];
      var _key = own.$propKey(this.relation.ownerProp);
      var _related = relatedByOwnerId[_key];

      if (isOneToOne) {
        own[this.relation.name] = _related && _related[0] || null;
      } else {
        own[this.relation.name] = _related || [];
      }
    }
  };

  RelationFindOperation.prototype.addJoinColumnSelects = function addJoinColumnSelects(builder) {
    var addedSelects = {};
    var cols = this.relation.fullRelatedCol();

    for (var c = 0, lc = cols.length; c < lc; ++c) {
      var col = cols[c];

      if (!builder.hasSelection(col) && !addedSelects[col]) {
        this.omitProps.push(this.relation.relatedProp[c]);
        addedSelects[col] = true;
      }
    }

    var selects = (0, _keys2.default)(addedSelects);

    if (selects.length) {
      builder.select(selects);
    }
  };

  RelationFindOperation.prototype.omitImplicitJoinProps = function omitImplicitJoinProps(related) {
    var relatedModelClass = this.relation.relatedModelClass;

    if (!this.omitProps.length || !related) {
      return related;
    }

    if (!Array.isArray(related)) {
      return this.omitImplicitJoinPropsFromOne(relatedModelClass, related);
    }

    if (!related.length) {
      return related;
    }

    for (var i = 0, l = related.length; i < l; ++i) {
      this.omitImplicitJoinPropsFromOne(relatedModelClass, related[i]);
    }

    return related;
  };

  RelationFindOperation.prototype.omitImplicitJoinPropsFromOne = function omitImplicitJoinPropsFromOne(relatedModelClass, model) {
    for (var c = 0, lc = this.omitProps.length; c < lc; ++c) {
      relatedModelClass.omitImpl(model, this.omitProps[c]);
    }

    return model;
  };

  return RelationFindOperation;
}(_FindOperation3.default);

exports.default = RelationFindOperation;


function join(arr) {
  return arr.join();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlbGF0aW9uRmluZE9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJSZWxhdGlvbkZpbmRPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwicmVsYXRpb24iLCJvd25lcnMiLCJhbHdheXNSZXR1cm5BcnJheSIsIm9taXRQcm9wcyIsIm9uQmVmb3JlQnVpbGQiLCJidWlsZGVyIiwiaWRzIiwiQXJyYXkiLCJsZW5ndGgiLCJpIiwibCIsIiR2YWx1ZXMiLCJvd25lclByb3AiLCJmaW5kUXVlcnkiLCJvd25lcklkcyIsInVuaXFCeSIsImpvaW4iLCJhZGRKb2luQ29sdW1uU2VsZWN0cyIsIm9uQWZ0ZXIiLCJyZWxhdGVkIiwib21pdEltcGxpY2l0Sm9pblByb3BzIiwib25BZnRlckludGVybmFsIiwiY3JlYXRlUmVsYXRpb25Qcm9wIiwiaXNPbmVUb09uZSIsInVuZGVmaW5lZCIsInJlbGF0ZWRCeU93bmVySWQiLCJyZWwiLCJrZXkiLCIkcHJvcEtleSIsInJlbGF0ZWRQcm9wIiwiYXJyIiwicHVzaCIsIm93biIsImFkZGVkU2VsZWN0cyIsImNvbHMiLCJmdWxsUmVsYXRlZENvbCIsImMiLCJsYyIsImNvbCIsImhhc1NlbGVjdGlvbiIsInNlbGVjdHMiLCJzZWxlY3QiLCJyZWxhdGVkTW9kZWxDbGFzcyIsImlzQXJyYXkiLCJvbWl0SW1wbGljaXRKb2luUHJvcHNGcm9tT25lIiwibW9kZWwiLCJvbWl0SW1wbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxxQjs7O0FBRW5CLGlDQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQiwwQkFBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUdyQixVQUFLQyxRQUFMLEdBQWdCRCxJQUFJQyxRQUFwQjtBQUNBLFVBQUtDLE1BQUwsR0FBY0YsSUFBSUUsTUFBbEI7QUFDQSxVQUFLQyxpQkFBTCxHQUF5QixLQUF6QjtBQUNB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TCxDQUFrQ0YsaUJBQWxDLEVBQXFEdkIsUUFBUVYsQ0FBUixDQUFyRDtBQUNEOztBQUVELFdBQU9VLE9BQVA7QUFDRCxHOztrQ0FFRHlCLDRCLHlDQUE2QkYsaUIsRUFBbUJHLEssRUFBTztBQUNyRCxTQUFLLElBQUlULElBQUksQ0FBUixFQUFXQyxLQUFLLEtBQUtsQyxTQUFMLENBQWVLLE1BQXBDLEVBQTRDNEIsSUFBSUMsRUFBaEQsRUFBb0QsRUFBRUQsQ0FBdEQsRUFBeUQ7QUFDdkRNLHdCQUFrQkksUUFBbEIsQ0FBMkJELEtBQTNCLEVBQWtDLEtBQUsxQyxTQUFMLENBQWVpQyxDQUFmLENBQWxDO0FBQ0Q7O0FBRUQsV0FBT1MsS0FBUDtBQUNELEc7Ozs7O2tCQXRIa0JoRCxxQjs7O0FBeUhyQixTQUFTbUIsSUFBVCxDQUFjYyxHQUFkLEVBQW1CO0FBQ2pCLFNBQU9BLElBQUlkLElBQUosRUFBUDtBQUNEIiwiZmlsZSI6IlJlbGF0aW9uRmluZE9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgRmluZE9wZXJhdGlvbiBmcm9tICcuLi9xdWVyeUJ1aWxkZXIvb3BlcmF0aW9ucy9GaW5kT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVsYXRpb25GaW5kT3BlcmF0aW9uIGV4dGVuZHMgRmluZE9wZXJhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgb3B0KSB7XG4gICAgc3VwZXIobmFtZSwgb3B0KTtcblxuICAgIHRoaXMucmVsYXRpb24gPSBvcHQucmVsYXRpb247XG4gICAgdGhpcy5vd25lcnMgPSBvcHQub3duZXJzO1xuICAgIHRoaXMuYWx3YXlzUmV0dXJuQXJyYXkgPSBmYWxzZTtcbiAgICB0aGlzLm9taXRQcm9wcyA9IFtdO1xuICB9XG5cbiAgb25CZWZvcmVCdWlsZChidWlsZGVyKSB7XG4gICAgbGV0IGlkcyA9IG5ldyBBcnJheSh0aGlzLm93bmVycy5sZW5ndGgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLm93bmVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGlkc1tpXSA9IHRoaXMub3duZXJzW2ldLiR2YWx1ZXModGhpcy5yZWxhdGlvbi5vd25lclByb3ApO1xuICAgIH1cblxuICAgIHRoaXMucmVsYXRpb24uZmluZFF1ZXJ5KGJ1aWxkZXIsIHtcbiAgICAgIG93bmVySWRzOiBfLnVuaXFCeShpZHMsIGpvaW4pXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEpvaW5Db2x1bW5TZWxlY3RzKGJ1aWxkZXIpO1xuICB9XG5cbiAgb25BZnRlcihidWlsZGVyLCByZWxhdGVkKSB7XG4gICAgdGhpcy5vbWl0SW1wbGljaXRKb2luUHJvcHMocmVsYXRlZCk7XG4gICAgcmV0dXJuIHN1cGVyLm9uQWZ0ZXIoYnVpbGRlciwgcmVsYXRlZCk7XG4gIH1cblxuICBvbkFmdGVySW50ZXJuYWwoYnVpbGRlciwgcmVsYXRlZCkge1xuICAgIHRoaXMuY3JlYXRlUmVsYXRpb25Qcm9wKHRoaXMub3duZXJzLCByZWxhdGVkKTtcblxuICAgIGlmICghdGhpcy5hbHdheXNSZXR1cm5BcnJheSAmJiB0aGlzLnJlbGF0aW9uLmlzT25lVG9PbmUoKSAmJiByZWxhdGVkLmxlbmd0aCA8PSAxKSB7XG4gICAgICByZXR1cm4gcmVsYXRlZFswXSB8fCB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZWxhdGVkO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVJlbGF0aW9uUHJvcChvd25lcnMsIHJlbGF0ZWQpIHtcbiAgICBjb25zdCBpc09uZVRvT25lID0gdGhpcy5yZWxhdGlvbi5pc09uZVRvT25lKCk7XG4gICAgY29uc3QgcmVsYXRlZEJ5T3duZXJJZCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHJlbGF0ZWQubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCByZWwgPSByZWxhdGVkW2ldO1xuICAgICAgY29uc3Qga2V5ID0gcmVsLiRwcm9wS2V5KHRoaXMucmVsYXRpb24ucmVsYXRlZFByb3ApO1xuICAgICAgbGV0IGFyciA9IHJlbGF0ZWRCeU93bmVySWRba2V5XTtcblxuICAgICAgaWYgKCFhcnIpIHtcbiAgICAgICAgYXJyID0gW107XG4gICAgICAgIHJlbGF0ZWRCeU93bmVySWRba2V5XSA9IGFycjtcbiAgICAgIH1cblxuICAgICAgYXJyLnB1c2gocmVsKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IG93bmVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IG93biA9IG93bmVyc1tpXTtcbiAgICAgIGNvbnN0IGtleSA9IG93bi4kcHJvcEtleSh0aGlzLnJlbGF0aW9uLm93bmVyUHJvcCk7XG4gICAgICBjb25zdCByZWxhdGVkID0gcmVsYXRlZEJ5T3duZXJJZFtrZXldO1xuXG4gICAgICBpZiAoaXNPbmVUb09uZSkge1xuICAgICAgICBvd25bdGhpcy5yZWxhdGlvbi5uYW1lXSA9IChyZWxhdGVkICYmIHJlbGF0ZWRbMF0pIHx8IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvd25bdGhpcy5yZWxhdGlvbi5uYW1lXSA9IHJlbGF0ZWQgfHwgW107XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkSm9pbkNvbHVtblNlbGVjdHMoYnVpbGRlcikge1xuICAgIGNvbnN0IGFkZGVkU2VsZWN0cyA9IHt9O1xuICAgIGNvbnN0IGNvbHMgPSB0aGlzLnJlbGF0aW9uLmZ1bGxSZWxhdGVkQ29sKCk7XG5cbiAgICBmb3IgKGxldCBjID0gMCwgbGMgPSBjb2xzLmxlbmd0aDsgYyA8IGxjOyArK2MpIHtcbiAgICAgIGNvbnN0IGNvbCA9IGNvbHNbY107XG5cbiAgICAgIGlmICghYnVpbGRlci5oYXNTZWxlY3Rpb24oY29sKSAmJiAhYWRkZWRTZWxlY3RzW2NvbF0pIHtcbiAgICAgICAgdGhpcy5vbWl0UHJvcHMucHVzaCh0aGlzLnJlbGF0aW9uLnJlbGF0ZWRQcm9wW2NdKTtcbiAgICAgICAgYWRkZWRTZWxlY3RzW2NvbF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdHMgPSBPYmplY3Qua2V5cyhhZGRlZFNlbGVjdHMpO1xuXG4gICAgaWYgKHNlbGVjdHMubGVuZ3RoKSB7XG4gICAgICBidWlsZGVyLnNlbGVjdChzZWxlY3RzKTtcbiAgICB9XG4gIH1cblxuICBvbWl0SW1wbGljaXRKb2luUHJvcHMocmVsYXRlZCkge1xuICAgIGNvbnN0IHJlbGF0ZWRNb2RlbENsYXNzID0gdGhpcy5yZWxhdGlvbi5yZWxhdGVkTW9kZWxDbGFzcztcblxuICAgIGlmICghdGhpcy5vbWl0UHJvcHMubGVuZ3RoIHx8ICFyZWxhdGVkKSB7XG4gICAgICByZXR1cm4gcmVsYXRlZDtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVsYXRlZCkpIHtcbiAgICAgIHJldHVybiB0aGlzLm9taXRJbXBsaWNpdEpvaW5Qcm9wc0Zyb21PbmUocmVsYXRlZE1vZGVsQ2xhc3MsIHJlbGF0ZWQpO1xuICAgIH1cblxuICAgIGlmICghcmVsYXRlZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiByZWxhdGVkO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gcmVsYXRlZC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIHRoaXMub21pdEltcGxpY2l0Sm9pblByb3BzRnJvbU9uZShyZWxhdGVkTW9kZWxDbGFzcywgcmVsYXRlZFtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbGF0ZWQ7XG4gIH1cblxuICBvbWl0SW1wbGljaXRKb2luUHJvcHNGcm9tT25lKHJlbGF0ZWRNb2RlbENsYXNzLCBtb2RlbCkge1xuICAgIGZvciAobGV0IGMgPSAwLCBsYyA9IHRoaXMub21pdFByb3BzLmxlbmd0aDsgYyA8IGxjOyArK2MpIHtcbiAgICAgIHJlbGF0ZWRNb2RlbENsYXNzLm9taXRJbXBsKG1vZGVsLCB0aGlzLm9taXRQcm9wc1tjXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZGVsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGpvaW4oYXJyKSB7XG4gIHJldHVybiBhcnIuam9pbigpO1xufSJdfQ==