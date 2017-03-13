'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _ValidationError = require('../../model/ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

var _EagerOperation2 = require('./EagerOperation');

var _EagerOperation3 = _interopRequireDefault(_EagerOperation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WhereInEagerOperation = function (_EagerOperation) {
  (0, _inherits3.default)(WhereInEagerOperation, _EagerOperation);

  function WhereInEagerOperation(name, opt) {
    (0, _classCallCheck3.default)(this, WhereInEagerOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _EagerOperation.call(this, name, opt));

    _this.relationsToFetch = [];
    _this.omitProps = [];
    return _this;
  }

  WhereInEagerOperation.prototype.clone = function clone(props) {
    var copy = _EagerOperation.prototype.clone.call(this);

    copy.relationsToFetch = this.relationsToFetch.slice();
    copy.omitProps = this.omitProps.slice();

    return copy;
  };

  WhereInEagerOperation.prototype.call = function call(builder, args) {
    var ret = _EagerOperation.prototype.call.call(this, builder, args);

    var modelClass = builder.modelClass();
    var relations = modelClass.getRelationArray();

    for (var i = 0, l = relations.length; i < l; ++i) {
      var relation = relations[i];
      var childExpression = this.expression.childExpression(relation.name);

      if (childExpression) {
        this.relationsToFetch.push({
          relation: relation,
          childExpression: childExpression
        });
      }
    }

    return ret;
  };

  WhereInEagerOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    var addedSelects = {};

    for (var i = 0, l = this.relationsToFetch.length; i < l; ++i) {
      var relation = this.relationsToFetch[i].relation;
      var _cols = relation.fullOwnerCol();

      for (var c = 0, lc = _cols.length; c < lc; ++c) {
        var col = _cols[c];

        if (!builder.hasSelection(col) && !addedSelects[col]) {
          this.omitProps.push(relation.ownerProp[c]);
          addedSelects[col] = true;
        }
      }
    }

    var cols = (0, _keys2.default)(addedSelects);

    if (cols.length) {
      builder.select(cols);
    }
  };

  WhereInEagerOperation.prototype.onAfterInternal = function onAfterInternal(builder, result) {
    var _this2 = this;

    var modelClass = builder.modelClass();

    if (!result) {
      return result;
    }

    var models = Array.isArray(result) ? result : [result];

    if (!models.length || !(models[0] instanceof modelClass)) {
      return result;
    }

    var promises = [];

    this.expression.forEachChild(function (child) {
      var relation = modelClass.getRelations()[child.name];

      if (!relation) {
        throw new _ValidationError2.default({ eager: 'unknown relation "' + child.name + '" in an eager expression' });
      }
    });

    for (var i = 0, l = this.relationsToFetch.length; i < l; ++i) {
      var relation = this.relationsToFetch[i].relation;
      var childExpression = this.relationsToFetch[i].childExpression;

      promises.push(this._fetchRelation(builder, models, relation, childExpression));
    }

    return _bluebird2.default.all(promises).then(function () {
      if (!_this2.omitProps.length) {
        return result;
      }

      for (var _i = 0, _l = result.length; _i < _l; ++_i) {
        var model = result[_i];

        for (var c = 0, lc = _this2.omitProps.length; c < lc; ++c) {
          modelClass.omitImpl(model, _this2.omitProps[c]);
        }
      }

      return result;
    });
  };

  WhereInEagerOperation.prototype._fetchRelation = function _fetchRelation(builder, models, relation, childExpression) {
    var queryBuilder = relation.ownerModelClass.RelatedQueryBuilder.forClass(relation.relatedModelClass).childQueryOf(builder).eager(childExpression);

    var findOperation = relation.find(queryBuilder, models);
    findOperation.alwaysReturnArray = true;

    queryBuilder.callQueryBuilderOperation(findOperation, []);

    for (var i = 0, l = childExpression.args.length; i < l; ++i) {
      var filterName = childExpression.args[i];
      var filter = childExpression.filters[filterName];

      if (typeof filter !== 'function') {
        throw new _ValidationError2.default({ eager: 'could not find filter "' + filterName + '" for relation "' + relation.name + '"' });
      }

      filter(queryBuilder);
    }

    return queryBuilder;
  };

  return WhereInEagerOperation;
}(_EagerOperation3.default);

exports.default = WhereInEagerOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldoZXJlSW5FYWdlck9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJXaGVyZUluRWFnZXJPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwicmVsYXRpb25zVG9GZXRjaCIsIm9taXRQcm9wcyIsImNsb25lIiwicHJvcHMiLCJjb3B5Iiwic2xpY2UiLCJjYWxsIiwiYnVpbGRlciIsImFyZ3MiLCJyZXQiLCJtb2RlbENsYXNzIiwicmVsYXRpb25zIiwiZ2V0UmVsYXRpb25BcnJheSIsImkiLCJsIiwibGVuZ3RoIiwicmVsYXRpb24iLCJjaGlsZEV4cHJlc3Npb24iLCJleHByZXNzaW9uIiwicHVzaCIsIm9uQmVmb3JlQnVpbGQiLCJhZGRlZFNlbGVjdHMiLCJjb2xzIiwiZnVsbE93bmVyQ29sIiwiYyIsImxjIiwiY29sIiwiaGFzU2VsZWN0aW9uIiwib3duZXJQcm9wIiwic2VsZWN0Iiwib25BZnRlckludGVybmFsIiwicmVzdWx0IiwibW9kZWxzIiwiQXJyYXkiLCJpc0FycmF5IiwicHJvbWlzZXMiLCJmb3JFYWNoQ2hpbGQiLCJnZXRSZWxhdGlvbnMiLCJjaGlsZCIsImVhZ2VyIiwiX2ZldGNoUmVsYXRpb24iLCJhbGwiLCJ0aGVuIiwibW9kZWwiLCJvbWl0SW1wbCIsInF1ZXJ5QnVpbGRlciIsIm93bmVyTW9kZWxDbGFzcyIsIlJlbGF0ZWRRdWVyeUJ1aWxkZXIiLCJmb3JDbGFzcyIsInJlbGF0ZWRNb2RlbENsYXNzIiwiY2hpbGRRdWVyeU9mIiwiZmluZE9wZXJhdGlvbiIsImZpbmQiLCJhbHdheXNSZXR1cm5BcnJheSIsImNhbGxRdWVyeUJ1aWxkZXJPcGVyYXRpb24iLCJmaWx0ZXJOYW1lIiwiZmlsdGVyIiwiZmlsdGVycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEscUI7OztBQUVuQixpQ0FBWUMsSUFBWixFQUFrQkMsR0FBbEIsRUFBdUI7QUFBQTs7QUFBQSwrREFDckIsMkJB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QUsxQyxTQUFMLENBQWV1QixDQUFmLENBQTNCO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPTyxNQUFQO0FBQ0QsS0FkTSxDQUFQO0FBZUQsRzs7a0NBRURTLGMsMkJBQWVqQyxPLEVBQVN5QixNLEVBQVFoQixRLEVBQVVDLGUsRUFBaUI7QUFDekQsUUFBTTRCLGVBQWU3QixTQUFTOEIsZUFBVCxDQUF5QkMsbUJBQXpCLENBQ2xCQyxRQURrQixDQUNUaEMsU0FBU2lDLGlCQURBLEVBRWxCQyxZQUZrQixDQUVMM0MsT0FGSyxFQUdsQmdDLEtBSGtCLENBR1p0QixlQUhZLENBQXJCOztBQUtBLFFBQU1rQyxnQkFBZ0JuQyxTQUFTb0MsSUFBVCxDQUFjUCxZQUFkLEVBQTRCYixNQUE1QixDQUF0QjtBQUNBbUIsa0JBQWNFLGlCQUFkLEdBQWtDLElBQWxDOztBQUVBUixpQkFBYVMseUJBQWIsQ0FBdUNILGFBQXZDLEVBQXNELEVBQXREOztBQUVBLFNBQUssSUFBSXRDLElBQUksQ0FBUixFQUFXQyxJQUFJRyxnQkFBZ0JULElBQWhCLENBQXFCTyxNQUF6QyxFQUFpREYsSUFBSUMsQ0FBckQsRUFBd0QsRUFBRUQsQ0FBMUQsRUFBNkQ7QUFDM0QsVUFBTTBDLGFBQWF0QyxnQkFBZ0JULElBQWhCLENBQXFCSyxDQUFyQixDQUFuQjtBQUNBLFVBQU0yQyxTQUFTdkMsZ0JBQWdCd0MsT0FBaEIsQ0FBd0JGLFVBQXhCLENBQWY7O0FBRUEsVUFBSSxPQUFPQyxNQUFQLEtBQWtCLFVBQXRCLEVBQWtDO0FBQ2hDLGNBQU0sOEJBQW9CLEVBQUNqQixtQ0FBaUNnQixVQUFqQyx3QkFBOER2QyxTQUFTbEIsSUFBdkUsTUFBRCxFQUFwQixDQUFOO0FBQ0Q7O0FBRUQwRCxhQUFPWCxZQUFQO0FBQ0Q7O0FBRUQsV0FBT0EsWUFBUDtBQUNELEc7Ozs7O2tCQXJJa0JoRCxxQiIsImZpbGUiOiJXaGVyZUluRWFnZXJPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgVmFsaWRhdGlvbkVycm9yIGZyb20gJy4uLy4uL21vZGVsL1ZhbGlkYXRpb25FcnJvcidcbmltcG9ydCBFYWdlck9wZXJhdGlvbiBmcm9tICcuL0VhZ2VyT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2hlcmVJbkVhZ2VyT3BlcmF0aW9uIGV4dGVuZHMgRWFnZXJPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG5cbiAgICB0aGlzLnJlbGF0aW9uc1RvRmV0Y2ggPSBbXTtcbiAgICB0aGlzLm9taXRQcm9wcyA9IFtdO1xuICB9XG5cbiAgY2xvbmUocHJvcHMpIHtcbiAgICBjb25zdCBjb3B5ID0gc3VwZXIuY2xvbmUoKTtcblxuICAgIGNvcHkucmVsYXRpb25zVG9GZXRjaCA9IHRoaXMucmVsYXRpb25zVG9GZXRjaC5zbGljZSgpO1xuICAgIGNvcHkub21pdFByb3BzID0gdGhpcy5vbWl0UHJvcHMuc2xpY2UoKTtcblxuICAgIHJldHVybiBjb3B5O1xuICB9XG5cbiAgY2FsbChidWlsZGVyLCBhcmdzKSB7XG4gICAgY29uc3QgcmV0ID0gc3VwZXIuY2FsbChidWlsZGVyLCBhcmdzKTtcblxuICAgIGNvbnN0IG1vZGVsQ2xhc3MgPSBidWlsZGVyLm1vZGVsQ2xhc3MoKTtcbiAgICBjb25zdCByZWxhdGlvbnMgPSBtb2RlbENsYXNzLmdldFJlbGF0aW9uQXJyYXkoKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gcmVsYXRpb25zLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3QgcmVsYXRpb24gPSByZWxhdGlvbnNbaV07XG4gICAgICBjb25zdCBjaGlsZEV4cHJlc3Npb24gPSB0aGlzLmV4cHJlc3Npb24uY2hpbGRFeHByZXNzaW9uKHJlbGF0aW9uLm5hbWUpO1xuXG4gICAgICBpZiAoY2hpbGRFeHByZXNzaW9uKSB7XG4gICAgICAgIHRoaXMucmVsYXRpb25zVG9GZXRjaC5wdXNoKHtcbiAgICAgICAgICByZWxhdGlvbixcbiAgICAgICAgICBjaGlsZEV4cHJlc3Npb25cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIG9uQmVmb3JlQnVpbGQoYnVpbGRlcikge1xuICAgIGNvbnN0IGFkZGVkU2VsZWN0cyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLnJlbGF0aW9uc1RvRmV0Y2gubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCByZWxhdGlvbiA9IHRoaXMucmVsYXRpb25zVG9GZXRjaFtpXS5yZWxhdGlvbjtcbiAgICAgIGNvbnN0IGNvbHMgPSByZWxhdGlvbi5mdWxsT3duZXJDb2woKTtcblxuICAgICAgZm9yIChsZXQgYyA9IDAsIGxjID0gY29scy5sZW5ndGg7IGMgPCBsYzsgKytjKSB7XG4gICAgICAgIGNvbnN0IGNvbCA9IGNvbHNbY107XG5cbiAgICAgICAgaWYgKCFidWlsZGVyLmhhc1NlbGVjdGlvbihjb2wpICYmICFhZGRlZFNlbGVjdHNbY29sXSkge1xuICAgICAgICAgIHRoaXMub21pdFByb3BzLnB1c2gocmVsYXRpb24ub3duZXJQcm9wW2NdKTtcbiAgICAgICAgICBhZGRlZFNlbGVjdHNbY29sXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjb2xzID0gT2JqZWN0LmtleXMoYWRkZWRTZWxlY3RzKTtcblxuICAgIGlmIChjb2xzLmxlbmd0aCkge1xuICAgICAgYnVpbGRlci5zZWxlY3QoY29scyk7XG4gICAgfVxuICB9XG5cbiAgb25BZnRlckludGVybmFsKGJ1aWxkZXIsIHJlc3VsdCkge1xuICAgIGNvbnN0IG1vZGVsQ2xhc3MgPSBidWlsZGVyLm1vZGVsQ2xhc3MoKTtcblxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGVscyA9IEFycmF5LmlzQXJyYXkocmVzdWx0KSA/IHJlc3VsdCA6IFtyZXN1bHRdO1xuXG4gICAgaWYgKCFtb2RlbHMubGVuZ3RoIHx8ICEobW9kZWxzWzBdIGluc3RhbmNlb2YgbW9kZWxDbGFzcykpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIHRoaXMuZXhwcmVzc2lvbi5mb3JFYWNoQ2hpbGQoY2hpbGQgPT4ge1xuICAgICAgbGV0IHJlbGF0aW9uID0gbW9kZWxDbGFzcy5nZXRSZWxhdGlvbnMoKVtjaGlsZC5uYW1lXTtcblxuICAgICAgaWYgKCFyZWxhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKHtlYWdlcjogYHVua25vd24gcmVsYXRpb24gXCIke2NoaWxkLm5hbWV9XCIgaW4gYW4gZWFnZXIgZXhwcmVzc2lvbmB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5yZWxhdGlvbnNUb0ZldGNoLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3QgcmVsYXRpb24gPSB0aGlzLnJlbGF0aW9uc1RvRmV0Y2hbaV0ucmVsYXRpb247XG4gICAgICBjb25zdCBjaGlsZEV4cHJlc3Npb24gPSB0aGlzLnJlbGF0aW9uc1RvRmV0Y2hbaV0uY2hpbGRFeHByZXNzaW9uO1xuXG4gICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2ZldGNoUmVsYXRpb24oYnVpbGRlciwgbW9kZWxzLCByZWxhdGlvbiwgY2hpbGRFeHByZXNzaW9uKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5vbWl0UHJvcHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gcmVzdWx0Lmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHJlc3VsdFtpXTtcblxuICAgICAgICBmb3IgKGxldCBjID0gMCwgbGMgPSB0aGlzLm9taXRQcm9wcy5sZW5ndGg7IGMgPCBsYzsgKytjKSB7XG4gICAgICAgICAgbW9kZWxDbGFzcy5vbWl0SW1wbChtb2RlbCwgdGhpcy5vbWl0UHJvcHNbY10pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSlcbiAgfVxuXG4gIF9mZXRjaFJlbGF0aW9uKGJ1aWxkZXIsIG1vZGVscywgcmVsYXRpb24sIGNoaWxkRXhwcmVzc2lvbikge1xuICAgIGNvbnN0IHF1ZXJ5QnVpbGRlciA9IHJlbGF0aW9uLm93bmVyTW9kZWxDbGFzcy5SZWxhdGVkUXVlcnlCdWlsZGVyXG4gICAgICAuZm9yQ2xhc3MocmVsYXRpb24ucmVsYXRlZE1vZGVsQ2xhc3MpXG4gICAgICAuY2hpbGRRdWVyeU9mKGJ1aWxkZXIpXG4gICAgICAuZWFnZXIoY2hpbGRFeHByZXNzaW9uKTtcblxuICAgIGNvbnN0IGZpbmRPcGVyYXRpb24gPSByZWxhdGlvbi5maW5kKHF1ZXJ5QnVpbGRlciwgbW9kZWxzKTtcbiAgICBmaW5kT3BlcmF0aW9uLmFsd2F5c1JldHVybkFycmF5ID0gdHJ1ZTtcblxuICAgIHF1ZXJ5QnVpbGRlci5jYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uKGZpbmRPcGVyYXRpb24sIFtdKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gY2hpbGRFeHByZXNzaW9uLmFyZ3MubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBmaWx0ZXJOYW1lID0gY2hpbGRFeHByZXNzaW9uLmFyZ3NbaV07XG4gICAgICBjb25zdCBmaWx0ZXIgPSBjaGlsZEV4cHJlc3Npb24uZmlsdGVyc1tmaWx0ZXJOYW1lXTtcblxuICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcih7ZWFnZXI6IGBjb3VsZCBub3QgZmluZCBmaWx0ZXIgXCIke2ZpbHRlck5hbWV9XCIgZm9yIHJlbGF0aW9uIFwiJHtyZWxhdGlvbi5uYW1lfVwiYH0pO1xuICAgICAgfVxuXG4gICAgICBmaWx0ZXIocXVlcnlCdWlsZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcXVlcnlCdWlsZGVyO1xuICB9XG59Il19