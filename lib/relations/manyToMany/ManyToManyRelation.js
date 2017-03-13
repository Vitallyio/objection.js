'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _desc, _value, _class;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Relation2 = require('../Relation');

var _Relation3 = _interopRequireDefault(_Relation2);

var _inheritModel = require('../../model/inheritModel');

var _inheritModel2 = _interopRequireDefault(_inheritModel);

var _dbUtils = require('../../utils/dbUtils');

var _memoize = require('../../utils/decorators/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

var _ManyToManyFindOperation = require('./ManyToManyFindOperation');

var _ManyToManyFindOperation2 = _interopRequireDefault(_ManyToManyFindOperation);

var _ManyToManyInsertOperation = require('./ManyToManyInsertOperation');

var _ManyToManyInsertOperation2 = _interopRequireDefault(_ManyToManyInsertOperation);

var _ManyToManyRelateOperation = require('./ManyToManyRelateOperation');

var _ManyToManyRelateOperation2 = _interopRequireDefault(_ManyToManyRelateOperation);

var _ManyToManyUnrelateOperation = require('./ManyToManyUnrelateOperation');

var _ManyToManyUnrelateOperation2 = _interopRequireDefault(_ManyToManyUnrelateOperation);

var _ManyToManyUnrelateSqliteOperation = require('./ManyToManyUnrelateSqliteOperation');

var _ManyToManyUnrelateSqliteOperation2 = _interopRequireDefault(_ManyToManyUnrelateSqliteOperation);

var _ManyToManyUpdateOperation = require('./ManyToManyUpdateOperation');

var _ManyToManyUpdateOperation2 = _interopRequireDefault(_ManyToManyUpdateOperation);

var _ManyToManyUpdateSqliteOperation = require('./ManyToManyUpdateSqliteOperation');

var _ManyToManyUpdateSqliteOperation2 = _interopRequireDefault(_ManyToManyUpdateSqliteOperation);

var _ManyToManyDeleteOperation = require('./ManyToManyDeleteOperation');

var _ManyToManyDeleteOperation2 = _interopRequireDefault(_ManyToManyDeleteOperation);

var _ManyToManyDeleteSqliteOperation = require('./ManyToManyDeleteSqliteOperation');

var _ManyToManyDeleteSqliteOperation2 = _interopRequireDefault(_ManyToManyDeleteSqliteOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var sqliteBuiltInRowId = '_rowid_';

var ManyToManyRelation = (_class = function (_Relation) {
  (0, _inherits3.default)(ManyToManyRelation, _Relation);

  function ManyToManyRelation() {
    (0, _classCallCheck3.default)(this, ManyToManyRelation);
    return (0, _possibleConstructorReturn3.default)(this, _Relation.apply(this, arguments));
  }

  ManyToManyRelation.prototype.setMapping = function setMapping(mapping) {
    var retVal = _Relation.prototype.setMapping.call(this, mapping);

    // Avoid require loop and import here.
    var Model = require(__dirname + '/../../model/Model').default;

    if (!_lodash2.default.isObject(mapping.join.through)) {
      this.throwError('join must have the `through` that describes the join table.');
    }

    if (!mapping.join.through.from || !mapping.join.through.to) {
      this.throwError('join.through must be an object that describes the join table. For example: {from: "JoinTable.someId", to: "JoinTable.someOtherId"}');
    }

    var joinFrom = this.parseReference(mapping.join.from);
    var joinTableFrom = this.parseReference(mapping.join.through.from);
    var joinTableTo = this.parseReference(mapping.join.through.to);
    var joinTableExtra = mapping.join.through.extra || [];

    if (!joinTableFrom.table || _lodash2.default.isEmpty(joinTableFrom.columns)) {
      this.throwError('join.through.from must have format JoinTable.columnName. For example "JoinTable.someId" or in case of composite key ["JoinTable.a", "JoinTable.b"].');
    }

    if (!joinTableTo.table || _lodash2.default.isEmpty(joinTableTo.columns)) {
      this.throwError('join.through.to must have format JoinTable.columnName. For example "JoinTable.someId" or in case of composite key ["JoinTable.a", "JoinTable.b"].');
    }

    if (joinTableFrom.table !== joinTableTo.table) {
      this.throwError('join.through `from` and `to` must point to the same join table.');
    }

    this.joinTable = joinTableFrom.table;

    if (joinFrom.table === this.ownerModelClass.tableName) {
      this.joinTableOwnerCol = joinTableFrom.columns;
      this.joinTableRelatedCol = joinTableTo.columns;
    } else {
      this.joinTableRelatedCol = joinTableFrom.columns;
      this.joinTableOwnerCol = joinTableTo.columns;
    }

    if (mapping.join.through.modelClass) {
      this._joinTableModelClass = this.resolveModel(Model, mapping.join.through.modelClass, 'join.through.modelClass');
    } else {
      this._joinTableModelClass = (0, _inheritModel2.default)(Model);
      this._joinTableModelClass.tableName = this.joinTable;
      // We cannot know if the join table has a primary key. Therefore we set some
      // known column as the idColumn so that inserts will work.
      this._joinTableModelClass.idColumn = this.joinTableRelatedCol;
    }

    this.joinTableOwnerProp = this.propertyName(this.joinTableOwnerCol, this._joinTableModelClass);
    this.joinTableRelatedProp = this.propertyName(this.joinTableRelatedCol, this._joinTableModelClass);
    this.joinTableExtras = this.parseExtras(joinTableExtra);

    return retVal;
  };

  /**
   * @returns {Array.<string>}
   */


  ManyToManyRelation.prototype.fullJoinTableOwnerCol = function fullJoinTableOwnerCol() {
    var _this2 = this;

    return this.joinTableOwnerCol.map(function (col) {
      return _this2.joinTable + '.' + col;
    });
  };

  /**
   * @returns {Array.<string>}
   */


  ManyToManyRelation.prototype.fullJoinTableRelatedCol = function fullJoinTableRelatedCol() {
    var _this3 = this;

    return this.joinTableRelatedCol.map(function (col) {
      return _this3.joinTable + '.' + col;
    });
  };

  /**
   * @returns {string}
   */


  ManyToManyRelation.prototype.joinTableAlias = function joinTableAlias() {
    return this.joinTable + '_rel_' + this.name;
  };

  /**
   * @returns {ManyToManyRelation}
   */


  ManyToManyRelation.prototype.bindKnex = function bindKnex(knex) {
    var bound = _Relation.prototype.bindKnex.call(this, knex);
    bound._joinTableModelClass = this._joinTableModelClass.bindKnex(knex);
    return bound;
  };

  /**
   * @returns {QueryBuilder}
   */


  ManyToManyRelation.prototype.findQuery = function findQuery(builder, opt) {
    var _this4 = this;

    builder.join(this.joinTable, function (join) {
      var fullRelatedCol = _this4.fullRelatedCol();
      var fullJoinTableRelatedCol = _this4.fullJoinTableRelatedCol();

      for (var i = 0, l = fullJoinTableRelatedCol.length; i < l; ++i) {
        join.on(fullJoinTableRelatedCol[i], fullRelatedCol[i]);
      }
    });

    if (opt.isColumnRef) {
      var fullJoinTableOwnerCol = this.fullJoinTableOwnerCol();

      for (var i = 0, l = fullJoinTableOwnerCol.length; i < l; ++i) {
        builder.whereRef(fullJoinTableOwnerCol[i], opt.ownerIds[i]);
      }
    } else {
      var hasIds = false;

      for (var _i = 0, _l = opt.ownerIds.length; _i < _l; ++_i) {
        var id = opt.ownerIds[_i];

        if (id) {
          hasIds = true;
          break;
        }
      }

      if (hasIds) {
        builder.whereInComposite(this.fullJoinTableOwnerCol(), opt.ownerIds);
      } else {
        builder.resolve([]);
      }
    }

    return builder.modify(this.modify);
  };

  /**
   * @returns {QueryBuilder}
   */


  ManyToManyRelation.prototype.join = function join(builder, opt) {
    opt = opt || {};

    opt.joinOperation = opt.joinOperation || 'join';
    opt.relatedTableAlias = opt.relatedTableAlias || this.relatedTableAlias();
    opt.relatedJoinSelectQuery = opt.relatedJoinSelectQuery || this.relatedModelClass.query().childQueryOf(builder);
    opt.relatedTable = opt.relatedTable || this.relatedModelClass.tableName;
    opt.ownerTable = opt.ownerTable || this.ownerModelClass.tableName;
    opt.joinTableAlias = opt.joinTableAlias || opt.relatedTableAlias + '_join';

    var joinTableAsAlias = this.joinTable + ' as ' + opt.joinTableAlias;
    var joinTableOwnerCol = this.joinTableOwnerCol.map(function (col) {
      return opt.joinTableAlias + '.' + col;
    });
    var joinTableRelatedCol = this.joinTableRelatedCol.map(function (col) {
      return opt.joinTableAlias + '.' + col;
    });

    var relatedCol = this.relatedCol.map(function (col) {
      return opt.relatedTableAlias + '.' + col;
    });
    var ownerCol = this.ownerCol.map(function (col) {
      return opt.ownerTable + '.' + col;
    });

    var relatedJoinSelect = opt.relatedJoinSelectQuery.modify(this.modify).as(opt.relatedTableAlias);

    if (relatedJoinSelect.isSelectAll()) {
      // No need to join a subquery if the query is `select * from "RelatedTable"`.
      relatedJoinSelect = this.relatedModelClass.tableName + ' as ' + opt.relatedTableAlias;
    }

    return builder[opt.joinOperation](joinTableAsAlias, function (join) {
      for (var i = 0, l = joinTableOwnerCol.length; i < l; ++i) {
        join.on(joinTableOwnerCol[i], ownerCol[i]);
      }
    })[opt.joinOperation](relatedJoinSelect, function (join) {
      for (var i = 0, l = joinTableRelatedCol.length; i < l; ++i) {
        join.on(joinTableRelatedCol[i], relatedCol[i]);
      }
    });
  };

  ManyToManyRelation.prototype.find = function find(builder, owners) {
    return new _ManyToManyFindOperation2.default('find', {
      relation: this,
      owners: owners
    });
  };

  ManyToManyRelation.prototype.insert = function insert(builder, owner) {
    return new _ManyToManyInsertOperation2.default('insert', {
      relation: this,
      owner: owner
    });
  };

  ManyToManyRelation.prototype.update = function update(builder, owner) {
    if ((0, _dbUtils.isSqlite)(builder.knex())) {
      return new _ManyToManyUpdateSqliteOperation2.default('update', {
        relation: this,
        owner: owner
      });
    } else {
      return new _ManyToManyUpdateOperation2.default('update', {
        relation: this,
        owner: owner
      });
    }
  };

  ManyToManyRelation.prototype.patch = function patch(builder, owner) {
    if ((0, _dbUtils.isSqlite)(builder.knex())) {
      return new _ManyToManyUpdateSqliteOperation2.default('patch', {
        relation: this,
        owner: owner,
        modelOptions: { patch: true }
      });
    } else {
      return new _ManyToManyUpdateOperation2.default('patch', {
        relation: this,
        owner: owner,
        modelOptions: { patch: true }
      });
    }
  };

  ManyToManyRelation.prototype.delete = function _delete(builder, owner) {
    if ((0, _dbUtils.isSqlite)(builder.knex())) {
      return new _ManyToManyDeleteSqliteOperation2.default('delete', {
        relation: this,
        owner: owner
      });
    } else {
      return new _ManyToManyDeleteOperation2.default('delete', {
        relation: this,
        owner: owner
      });
    }
  };

  ManyToManyRelation.prototype.relate = function relate(builder, owner) {
    return new _ManyToManyRelateOperation2.default('relate', {
      relation: this,
      owner: owner
    });
  };

  ManyToManyRelation.prototype.unrelate = function unrelate(builder, owner) {
    if ((0, _dbUtils.isSqlite)(builder.knex())) {
      return new _ManyToManyUnrelateSqliteOperation2.default('unrelate', {
        relation: this,
        owner: owner
      });
    } else {
      return new _ManyToManyUnrelateOperation2.default('unrelate', {
        relation: this,
        owner: owner
      });
    }
  };

  ManyToManyRelation.prototype.selectForModify = function selectForModify(builder, owner) {
    var ownerId = owner.$values(this.ownerProp);

    var idQuery = this.joinTableModelClass(builder.knex()).query().childQueryOf(builder).select(this.fullJoinTableRelatedCol()).whereComposite(this.fullJoinTableOwnerCol(), ownerId);

    return builder.whereInComposite(this.fullRelatedCol(), idQuery);
  };

  ManyToManyRelation.prototype.selectForModifySqlite = function selectForModifySqlite(builder, owner) {
    var _this5 = this;

    var relatedTable = this.relatedModelClass.tableName;
    var relatedTableAlias = this.relatedTableAlias();
    var relatedTableAsAlias = relatedTable + ' as ' + relatedTableAlias;
    var relatedTableAliasRowId = relatedTableAlias + '.' + sqliteBuiltInRowId;
    var relatedTableRowId = relatedTable + '.' + sqliteBuiltInRowId;

    var selectRelatedQuery = this.joinTableModelClass(builder.knex()).query().childQueryOf(builder).select(relatedTableAliasRowId).whereComposite(this.fullJoinTableOwnerCol(), owner.$values(this.ownerProp)).join(relatedTableAsAlias, function (join) {
      var fullJoinTableRelatedCols = _this5.fullJoinTableRelatedCol();
      var fullRelatedCol = _this5.fullRelatedCol();

      for (var i = 0, l = fullJoinTableRelatedCols.length; i < l; ++i) {
        join.on(fullJoinTableRelatedCols[i], fullRelatedCol[i]);
      }
    });

    return builder.whereInComposite(relatedTableRowId, selectRelatedQuery);
  };

  ManyToManyRelation.prototype.createJoinModels = function createJoinModels(ownerId, related) {
    var joinModels = new Array(related.length);

    for (var i = 0, lr = related.length; i < lr; ++i) {
      var rel = related[i];
      var joinModel = {};

      for (var j = 0, lp = this.joinTableOwnerProp.length; j < lp; ++j) {
        joinModel[this.joinTableOwnerProp[j]] = ownerId[j];
      }

      for (var _j = 0, _lp = this.joinTableRelatedProp.length; _j < _lp; ++_j) {
        joinModel[this.joinTableRelatedProp[_j]] = rel[this.relatedProp[_j]];
      }

      for (var _j2 = 0, _lp2 = this.joinTableExtras.length; _j2 < _lp2; ++_j2) {
        var extra = this.joinTableExtras[_j2];
        var extraValue = rel[extra.aliasProp];

        if (!_lodash2.default.isUndefined(extraValue)) {
          joinModel[extra.joinTableProp] = extraValue;
        }
      }

      joinModels[i] = joinModel;
    }

    return joinModels;
  };

  ManyToManyRelation.prototype.omitExtraProps = function omitExtraProps(models) {
    if (!_lodash2.default.isEmpty(this.joinTableExtras)) {
      var props = this.joinTableExtras.map(function (extra) {
        return extra.aliasProp;
      });

      for (var i = 0, l = models.length; i < l; ++i) {
        models[i].$omitFromDatabaseJson(props);
      }
    }
  };

  /**
   * @protected
   */


  ManyToManyRelation.prototype.parseExtras = function parseExtras(extras) {
    var _this6 = this;

    if (Array.isArray(extras)) {
      extras = extras.reduce(function (extras, col) {
        extras[col] = col;
        return extras;
      }, {});
    }

    return (0, _keys2.default)(extras).map(function (key) {
      var val = extras[key];

      return {
        joinTableCol: val,
        joinTableProp: _this6._joinTableModelClass.columnNameToPropertyName(val),
        aliasCol: key,
        aliasProp: _this6._joinTableModelClass.columnNameToPropertyName(key)
      };
    });
  };

  return ManyToManyRelation;
}(_Relation3.default), (_applyDecoratedDescriptor(_class.prototype, 'fullJoinTableOwnerCol', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fullJoinTableOwnerCol'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fullJoinTableRelatedCol', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fullJoinTableRelatedCol'), _class.prototype)), _class);
exports.default = ManyToManyRelation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hbnlUb01hbnlSZWxhdGlvbi5qcyJdLCJuYW1lcyI6WyJzcWxpdGVCdWlsdEluUm93SWQiLCJNYW55VG9NYW55UmVsYXRpb24iLCJzZXRNYXBwaW5nIiwibWFwcGluZyIsInJldFZhbCIsIk1vZGVsIiwicmVxdWlyZSIsIl9fZGlybmFtZSIsImRlZmF1bHQiLCJpc09iamVjdCIsImpvaW4iLCJ0aHJvdWdoIiwidGhyb3dFcnJvciIsImZyb20iLCJ0byIsImpvaW5Gcm9tIiwicGFyc2VSZWZlcmVuY2UiLCJqb2luVGFibGVGcm9tIiwiam9pblRhYmxlVG8iLCJqb2luVGFibGVFeHRyYSIsImV4dHJhIiwidGFibGUiLCJpc0VtcHR5IiwiY29sdW1ucyIsImpvaW5UYWJsZSIsIm93bmVyTW9kZWxDbGFzcyIsInRhYmxlTmFtZSIsImpvaW5UYWJsZU93bmVyQ29sIiwiam9pblRhYmxlUmVsYXRlZENvbCIsIm1vZGVsQ2xhc3MiLCJfam9pblRhYmxlTW9kZWxDbGFzcyIsInJlc29sdmVNb2RlbCIsImlkQ29sdW1uIiwiam9pblRhYmxlT3duZXJQcm9wIiwicHJvcGVydHlOYW1lIiwiam9pblRhYmxlUmVsYXRlZFByb3AiLCJqb2luVGFibGVFeHRyYXMiLCJwYXJzZUV4dHJhcyIsImZ1bGxKb2luVGFibGVPd25lckNvbCIsIm1hcCIsImNvbCIsImZ1bGxKb2luVGFibGVSZWxhdGVkQ29sIiwiam9pblRhYmxlQWxpYXMiLCJuYW1lIiwiYmluZEtuZXgiLCJrbmV4IiwiYm91bmQiLCJmaW5kUXVlcnkiLCJidWlsZGVyIiwib3B0IiwiZnVsbFJlbGF0ZWRDb2wiLCJpIiwibCIsImxlbmd0aCIsIm9uIiwiaXNDb2x1bW5SZWYiLCJ3aGVyZVJlZiIsIm93bmVySWRzIiwiaGFzSWRzIiwiaWQiLCJ3aGVyZUluQ29tcG9zaXRlIiwicmVzb2x2ZSIsIm1vZGlmeSIsImpvaW5PcGVyYXRpb24iLCJyZWxhdGVkVGFibGVBbGlhcyIsInJlbGF0ZWRKb2luU2VsZWN0UXVlcnkiLCJyZWxhdGVkTW9kZWxDbGFzcyIsInF1ZXJ5IiwiY2hpbGRRdWVyeU9mIiwicmVsYXRlZFRhYmxlIiwib3duZXJUYWJsZSIsImpvaW5UYWJsZUFzQWxpYXMiLCJyZWxhdGVkQ29sIiwib3duZXJDb2wiLCJyZWxhdGVkSm9pblNlbGVjdCIsImFzIiwiaXNTZWxlY3RBbGwiLCJmaW5kIiwib3duZXJzIiwicmVsYXRpb24iLCJpbnNlcnQiLCJvd25lciIsInVwZGF0ZSIsInBhdGNoIiwibW9kZWxPcHRpb25zIiwiZGVsZXRlIiwicmVsYXRlIiwidW5yZWxhdGUiLCJzZWxlY3RGb3JNb2RpZnkiLCJvd25lcklkIiwiJHZhbHVlcyIsIm93bmVyUHJvcCIsImlkUXVlcnkiLCJqb2luVGFibGVNb2RlbENsYXNzIiwic2VsZWN0Iiwid2hlcmVDb21wb3NpdGUiLCJzZWxlY3RGb3JNb2RpZnlTcWxpdGUiLCJyZWxhdGVkVGFibGVBc0FsaWFzIiwicmVsYXRlZFRhYmxlQWxpYXNSb3dJZCIsInJlbGF0ZWRUYWJsZVJvd0lkIiwic2VsZWN0UmVsYXRlZFF1ZXJ5IiwiZnVsbEpvaW5UYWJsZVJlbGF0ZWRDb2xzIiwiY3JlYXRlSm9pbk1vZGVscyIsInJlbGF0ZWQiLCJqb2luTW9kZWxzIiwiQXJyYXkiLCJsciIsInJlbCIsImpvaW5Nb2RlbCIsImoiLCJscCIsInJlbGF0ZWRQcm9wIiwiZXh0cmFWYWx1ZSIsImFsaWFzUHJvcCIsImlzVW5kZWZpbmVkIiwiam9pblRhYmxlUHJvcCIsIm9taXRFeHRyYVByb3BzIiwibW9kZWxzIiwicHJvcHMiLCIkb21pdEZyb21EYXRhYmFzZUpzb24iLCJleHRyYXMiLCJpc0FycmF5IiwicmVkdWNlIiwidmFsIiwia2V5Iiwiam9pblRhYmxlQ29sIiwiY29sdW1uTmFtZVRvUHJvcGVydHlOYW1lIiwiYWxpYXNDb2wiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNB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QyxFQUEwQyxFQUFFRCxDQUE1QyxFQUErQztBQUM3Q2tFLGVBQU9sRSxDQUFQLEVBQVVvRSxxQkFBVixDQUFnQ0QsS0FBaEM7QUFDRDtBQUNGO0FBQ0YsRzs7QUFFRDs7Ozs7K0JBR0FqRixXLHdCQUFZbUYsTSxFQUFRO0FBQUE7O0FBQ2xCLFFBQUlmLE1BQU1nQixPQUFOLENBQWNELE1BQWQsQ0FBSixFQUEyQjtBQUN6QkEsZUFBU0EsT0FBT0UsTUFBUCxDQUFjLFVBQUNGLE1BQUQsRUFBU2hGLEdBQVQsRUFBaUI7QUFDdENnRixlQUFPaEYsR0FBUCxJQUFjQSxHQUFkO0FBQ0EsZUFBT2dGLE1BQVA7QUFDRCxPQUhRLEVBR04sRUFITSxDQUFUO0FBSUQ7O0FBRUQsV0FBTyxvQkFBWUEsTUFBWixFQUFvQmpGLEdBQXBCLENBQXdCLGVBQU87QUFDcEMsVUFBTW9GLE1BQU1ILE9BQU9JLEdBQVAsQ0FBWjs7QUFFQSxhQUFPO0FBQ0xDLHNCQUFjRixHQURUO0FBRUxSLHVCQUFlLE9BQUtyRixvQkFBTCxDQUEwQmdHLHdCQUExQixDQUFtREgsR0FBbkQsQ0FGVjtBQUdMSSxrQkFBVUgsR0FITDtBQUlMWCxtQkFBVyxPQUFLbkYsb0JBQUwsQ0FBMEJnRyx3QkFBMUIsQ0FBbURGLEdBQW5EO0FBSk4sT0FBUDtBQU1ELEtBVE0sQ0FBUDtBQVVELEc7Ozs7a0JBL1ZrQjNILGtCIiwiZmlsZSI6Ik1hbnlUb01hbnlSZWxhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUmVsYXRpb24gZnJvbSAnLi4vUmVsYXRpb24nO1xuaW1wb3J0IGluaGVyaXRNb2RlbCBmcm9tICcuLi8uLi9tb2RlbC9pbmhlcml0TW9kZWwnO1xuaW1wb3J0IHtpc1NxbGl0ZX0gZnJvbSAnLi4vLi4vdXRpbHMvZGJVdGlscyc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICcuLi8uLi91dGlscy9kZWNvcmF0b3JzL21lbW9pemUnO1xuXG5pbXBvcnQgTWFueVRvTWFueUZpbmRPcGVyYXRpb24gZnJvbSAnLi9NYW55VG9NYW55RmluZE9wZXJhdGlvbic7XG5pbXBvcnQgTWFueVRvTWFueUluc2VydE9wZXJhdGlvbiBmcm9tICcuL01hbnlUb01hbnlJbnNlcnRPcGVyYXRpb24nO1xuaW1wb3J0IE1hbnlUb01hbnlSZWxhdGVPcGVyYXRpb24gZnJvbSAnLi9NYW55VG9NYW55UmVsYXRlT3BlcmF0aW9uJztcbmltcG9ydCBNYW55VG9NYW55VW5yZWxhdGVPcGVyYXRpb24gZnJvbSAnLi9NYW55VG9NYW55VW5yZWxhdGVPcGVyYXRpb24nO1xuaW1wb3J0IE1hbnlUb01hbnlVbnJlbGF0ZVNxbGl0ZU9wZXJhdGlvbiBmcm9tICcuL01hbnlUb01hbnlVbnJlbGF0ZVNxbGl0ZU9wZXJhdGlvbic7XG5pbXBvcnQgTWFueVRvTWFueVVwZGF0ZU9wZXJhdGlvbiBmcm9tICcuL01hbnlUb01hbnlVcGRhdGVPcGVyYXRpb24nO1xuaW1wb3J0IE1hbnlUb01hbnlVcGRhdGVTcWxpdGVPcGVyYXRpb24gZnJvbSAnLi9NYW55VG9NYW55VXBkYXRlU3FsaXRlT3BlcmF0aW9uJztcbmltcG9ydCBNYW55VG9NYW55RGVsZXRlT3BlcmF0aW9uIGZyb20gJy4vTWFueVRvTWFueURlbGV0ZU9wZXJhdGlvbic7XG5pbXBvcnQgTWFueVRvTWFueURlbGV0ZVNxbGl0ZU9wZXJhdGlvbiBmcm9tICcuL01hbnlUb01hbnlEZWxldGVTcWxpdGVPcGVyYXRpb24nO1xuXG5jb25zdCBzcWxpdGVCdWlsdEluUm93SWQgPSAnX3Jvd2lkXyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbnlUb01hbnlSZWxhdGlvbiBleHRlbmRzIFJlbGF0aW9uIHtcblxuICBzZXRNYXBwaW5nKG1hcHBpbmcpIHtcbiAgICBsZXQgcmV0VmFsID0gc3VwZXIuc2V0TWFwcGluZyhtYXBwaW5nKTtcblxuICAgIC8vIEF2b2lkIHJlcXVpcmUgbG9vcCBhbmQgaW1wb3J0IGhlcmUuXG4gICAgbGV0IE1vZGVsID0gcmVxdWlyZShfX2Rpcm5hbWUgKyAnLy4uLy4uL21vZGVsL01vZGVsJykuZGVmYXVsdDtcblxuICAgIGlmICghXy5pc09iamVjdChtYXBwaW5nLmpvaW4udGhyb3VnaCkpIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcignam9pbiBtdXN0IGhhdmUgdGhlIGB0aHJvdWdoYCB0aGF0IGRlc2NyaWJlcyB0aGUgam9pbiB0YWJsZS4nKTtcbiAgICB9XG5cbiAgICBpZiAoIW1hcHBpbmcuam9pbi50aHJvdWdoLmZyb20gfHwgIW1hcHBpbmcuam9pbi50aHJvdWdoLnRvKSB7XG4gICAgICB0aGlzLnRocm93RXJyb3IoJ2pvaW4udGhyb3VnaCBtdXN0IGJlIGFuIG9iamVjdCB0aGF0IGRlc2NyaWJlcyB0aGUgam9pbiB0YWJsZS4gRm9yIGV4YW1wbGU6IHtmcm9tOiBcIkpvaW5UYWJsZS5zb21lSWRcIiwgdG86IFwiSm9pblRhYmxlLnNvbWVPdGhlcklkXCJ9Jyk7XG4gICAgfVxuXG4gICAgbGV0IGpvaW5Gcm9tID0gdGhpcy5wYXJzZVJlZmVyZW5jZShtYXBwaW5nLmpvaW4uZnJvbSk7XG4gICAgbGV0IGpvaW5UYWJsZUZyb20gPSB0aGlzLnBhcnNlUmVmZXJlbmNlKG1hcHBpbmcuam9pbi50aHJvdWdoLmZyb20pO1xuICAgIGxldCBqb2luVGFibGVUbyA9IHRoaXMucGFyc2VSZWZlcmVuY2UobWFwcGluZy5qb2luLnRocm91Z2gudG8pO1xuICAgIGxldCBqb2luVGFibGVFeHRyYSA9IG1hcHBpbmcuam9pbi50aHJvdWdoLmV4dHJhIHx8IFtdO1xuXG4gICAgaWYgKCFqb2luVGFibGVGcm9tLnRhYmxlIHx8IF8uaXNFbXB0eShqb2luVGFibGVGcm9tLmNvbHVtbnMpKSB7XG4gICAgICB0aGlzLnRocm93RXJyb3IoJ2pvaW4udGhyb3VnaC5mcm9tIG11c3QgaGF2ZSBmb3JtYXQgSm9pblRhYmxlLmNvbHVtbk5hbWUuIEZvciBleGFtcGxlIFwiSm9pblRhYmxlLnNvbWVJZFwiIG9yIGluIGNhc2Ugb2YgY29tcG9zaXRlIGtleSBbXCJKb2luVGFibGUuYVwiLCBcIkpvaW5UYWJsZS5iXCJdLicpO1xuICAgIH1cblxuICAgIGlmICgham9pblRhYmxlVG8udGFibGUgfHwgXy5pc0VtcHR5KGpvaW5UYWJsZVRvLmNvbHVtbnMpKSB7XG4gICAgICB0aGlzLnRocm93RXJyb3IoJ2pvaW4udGhyb3VnaC50byBtdXN0IGhhdmUgZm9ybWF0IEpvaW5UYWJsZS5jb2x1bW5OYW1lLiBGb3IgZXhhbXBsZSBcIkpvaW5UYWJsZS5zb21lSWRcIiBvciBpbiBjYXNlIG9mIGNvbXBvc2l0ZSBrZXkgW1wiSm9pblRhYmxlLmFcIiwgXCJKb2luVGFibGUuYlwiXS4nKTtcbiAgICB9XG5cbiAgICBpZiAoam9pblRhYmxlRnJvbS50YWJsZSAhPT0gam9pblRhYmxlVG8udGFibGUpIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcignam9pbi50aHJvdWdoIGBmcm9tYCBhbmQgYHRvYCBtdXN0IHBvaW50IHRvIHRoZSBzYW1lIGpvaW4gdGFibGUuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5qb2luVGFibGUgPSBqb2luVGFibGVGcm9tLnRhYmxlO1xuXG4gICAgaWYgKGpvaW5Gcm9tLnRhYmxlID09PSB0aGlzLm93bmVyTW9kZWxDbGFzcy50YWJsZU5hbWUpIHtcbiAgICAgIHRoaXMuam9pblRhYmxlT3duZXJDb2wgPSBqb2luVGFibGVGcm9tLmNvbHVtbnM7XG4gICAgICB0aGlzLmpvaW5UYWJsZVJlbGF0ZWRDb2wgPSBqb2luVGFibGVUby5jb2x1bW5zO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmpvaW5UYWJsZVJlbGF0ZWRDb2wgPSBqb2luVGFibGVGcm9tLmNvbHVtbnM7XG4gICAgICB0aGlzLmpvaW5UYWJsZU93bmVyQ29sID0gam9pblRhYmxlVG8uY29sdW1ucztcbiAgICB9XG5cbiAgICBpZiAobWFwcGluZy5qb2luLnRocm91Z2gubW9kZWxDbGFzcykge1xuICAgICAgdGhpcy5fam9pblRhYmxlTW9kZWxDbGFzcyA9IHRoaXMucmVzb2x2ZU1vZGVsKE1vZGVsLCBtYXBwaW5nLmpvaW4udGhyb3VnaC5tb2RlbENsYXNzLCAnam9pbi50aHJvdWdoLm1vZGVsQ2xhc3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fam9pblRhYmxlTW9kZWxDbGFzcyA9IGluaGVyaXRNb2RlbChNb2RlbCk7XG4gICAgICB0aGlzLl9qb2luVGFibGVNb2RlbENsYXNzLnRhYmxlTmFtZSA9IHRoaXMuam9pblRhYmxlO1xuICAgICAgLy8gV2UgY2Fubm90IGtub3cgaWYgdGhlIGpvaW4gdGFibGUgaGFzIGEgcHJpbWFyeSBrZXkuIFRoZXJlZm9yZSB3ZSBzZXQgc29tZVxuICAgICAgLy8ga25vd24gY29sdW1uIGFzIHRoZSBpZENvbHVtbiBzbyB0aGF0IGluc2VydHMgd2lsbCB3b3JrLlxuICAgICAgdGhpcy5fam9pblRhYmxlTW9kZWxDbGFzcy5pZENvbHVtbiA9IHRoaXMuam9pblRhYmxlUmVsYXRlZENvbDtcbiAgICB9XG5cbiAgICB0aGlzLmpvaW5UYWJsZU93bmVyUHJvcCA9IHRoaXMucHJvcGVydHlOYW1lKHRoaXMuam9pblRhYmxlT3duZXJDb2wsIHRoaXMuX2pvaW5UYWJsZU1vZGVsQ2xhc3MpO1xuICAgIHRoaXMuam9pblRhYmxlUmVsYXRlZFByb3AgPSB0aGlzLnByb3BlcnR5TmFtZSh0aGlzLmpvaW5UYWJsZVJlbGF0ZWRDb2wsIHRoaXMuX2pvaW5UYWJsZU1vZGVsQ2xhc3MpO1xuICAgIHRoaXMuam9pblRhYmxlRXh0cmFzID0gdGhpcy5wYXJzZUV4dHJhcyhqb2luVGFibGVFeHRyYSk7XG5cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtBcnJheS48c3RyaW5nPn1cbiAgICovXG4gIEBtZW1vaXplXG4gIGZ1bGxKb2luVGFibGVPd25lckNvbCgpIHtcbiAgICByZXR1cm4gdGhpcy5qb2luVGFibGVPd25lckNvbC5tYXAoY29sID0+IGAke3RoaXMuam9pblRhYmxlfS4ke2NvbH1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7QXJyYXkuPHN0cmluZz59XG4gICAqL1xuICBAbWVtb2l6ZVxuICBmdWxsSm9pblRhYmxlUmVsYXRlZENvbCgpIHtcbiAgICByZXR1cm4gdGhpcy5qb2luVGFibGVSZWxhdGVkQ29sLm1hcChjb2wgPT4gYCR7dGhpcy5qb2luVGFibGV9LiR7Y29sfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBqb2luVGFibGVBbGlhcygpIHtcbiAgICByZXR1cm4gdGhpcy5qb2luVGFibGUgKyAnX3JlbF8nICsgdGhpcy5uYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtNYW55VG9NYW55UmVsYXRpb259XG4gICAqL1xuICBiaW5kS25leChrbmV4KSB7XG4gICAgbGV0IGJvdW5kID0gc3VwZXIuYmluZEtuZXgoa25leCk7XG4gICAgYm91bmQuX2pvaW5UYWJsZU1vZGVsQ2xhc3MgPSB0aGlzLl9qb2luVGFibGVNb2RlbENsYXNzLmJpbmRLbmV4KGtuZXgpO1xuICAgIHJldHVybiBib3VuZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgZmluZFF1ZXJ5KGJ1aWxkZXIsIG9wdCkge1xuICAgIGJ1aWxkZXIuam9pbih0aGlzLmpvaW5UYWJsZSwgam9pbiA9PiB7XG4gICAgICBjb25zdCBmdWxsUmVsYXRlZENvbCA9IHRoaXMuZnVsbFJlbGF0ZWRDb2woKTtcbiAgICAgIGNvbnN0IGZ1bGxKb2luVGFibGVSZWxhdGVkQ29sID0gdGhpcy5mdWxsSm9pblRhYmxlUmVsYXRlZENvbCgpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGZ1bGxKb2luVGFibGVSZWxhdGVkQ29sLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICBqb2luLm9uKGZ1bGxKb2luVGFibGVSZWxhdGVkQ29sW2ldLCBmdWxsUmVsYXRlZENvbFtpXSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAob3B0LmlzQ29sdW1uUmVmKSB7XG4gICAgICBjb25zdCBmdWxsSm9pblRhYmxlT3duZXJDb2wgPSB0aGlzLmZ1bGxKb2luVGFibGVPd25lckNvbCgpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGZ1bGxKb2luVGFibGVPd25lckNvbC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgYnVpbGRlci53aGVyZVJlZihmdWxsSm9pblRhYmxlT3duZXJDb2xbaV0sIG9wdC5vd25lcklkc1tpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBoYXNJZHMgPSBmYWxzZTtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBvcHQub3duZXJJZHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGNvbnN0IGlkID0gb3B0Lm93bmVySWRzW2ldO1xuXG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgIGhhc0lkcyA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGhhc0lkcykge1xuICAgICAgICBidWlsZGVyLndoZXJlSW5Db21wb3NpdGUodGhpcy5mdWxsSm9pblRhYmxlT3duZXJDb2woKSwgb3B0Lm93bmVySWRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1aWxkZXIucmVzb2x2ZShbXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkZXIubW9kaWZ5KHRoaXMubW9kaWZ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgam9pbihidWlsZGVyLCBvcHQpIHtcbiAgICBvcHQgPSBvcHQgfHwge307XG5cbiAgICBvcHQuam9pbk9wZXJhdGlvbiA9IG9wdC5qb2luT3BlcmF0aW9uIHx8ICdqb2luJztcbiAgICBvcHQucmVsYXRlZFRhYmxlQWxpYXMgPSBvcHQucmVsYXRlZFRhYmxlQWxpYXMgfHwgdGhpcy5yZWxhdGVkVGFibGVBbGlhcygpO1xuICAgIG9wdC5yZWxhdGVkSm9pblNlbGVjdFF1ZXJ5ID0gb3B0LnJlbGF0ZWRKb2luU2VsZWN0UXVlcnkgfHwgdGhpcy5yZWxhdGVkTW9kZWxDbGFzcy5xdWVyeSgpLmNoaWxkUXVlcnlPZihidWlsZGVyKTtcbiAgICBvcHQucmVsYXRlZFRhYmxlID0gb3B0LnJlbGF0ZWRUYWJsZSB8fCB0aGlzLnJlbGF0ZWRNb2RlbENsYXNzLnRhYmxlTmFtZTtcbiAgICBvcHQub3duZXJUYWJsZSA9IG9wdC5vd25lclRhYmxlIHx8IHRoaXMub3duZXJNb2RlbENsYXNzLnRhYmxlTmFtZTtcbiAgICBvcHQuam9pblRhYmxlQWxpYXMgPSBvcHQuam9pblRhYmxlQWxpYXMgfHwgYCR7b3B0LnJlbGF0ZWRUYWJsZUFsaWFzfV9qb2luYDtcblxuICAgIGNvbnN0IGpvaW5UYWJsZUFzQWxpYXMgPSBgJHt0aGlzLmpvaW5UYWJsZX0gYXMgJHtvcHQuam9pblRhYmxlQWxpYXN9YDtcbiAgICBjb25zdCBqb2luVGFibGVPd25lckNvbCA9IHRoaXMuam9pblRhYmxlT3duZXJDb2wubWFwKGNvbCA9PiBgJHtvcHQuam9pblRhYmxlQWxpYXN9LiR7Y29sfWApO1xuICAgIGNvbnN0IGpvaW5UYWJsZVJlbGF0ZWRDb2wgPSB0aGlzLmpvaW5UYWJsZVJlbGF0ZWRDb2wubWFwKGNvbCA9PiBgJHtvcHQuam9pblRhYmxlQWxpYXN9LiR7Y29sfWApO1xuXG4gICAgY29uc3QgcmVsYXRlZENvbCA9IHRoaXMucmVsYXRlZENvbC5tYXAoY29sID0+IGAke29wdC5yZWxhdGVkVGFibGVBbGlhc30uJHtjb2x9YCk7XG4gICAgY29uc3Qgb3duZXJDb2wgPSB0aGlzLm93bmVyQ29sLm1hcChjb2wgPT4gYCR7b3B0Lm93bmVyVGFibGV9LiR7Y29sfWApO1xuXG4gICAgbGV0IHJlbGF0ZWRKb2luU2VsZWN0ID0gb3B0LnJlbGF0ZWRKb2luU2VsZWN0UXVlcnlcbiAgICAgIC5tb2RpZnkodGhpcy5tb2RpZnkpXG4gICAgICAuYXMob3B0LnJlbGF0ZWRUYWJsZUFsaWFzKTtcblxuICAgIGlmIChyZWxhdGVkSm9pblNlbGVjdC5pc1NlbGVjdEFsbCgpKSB7XG4gICAgICAvLyBObyBuZWVkIHRvIGpvaW4gYSBzdWJxdWVyeSBpZiB0aGUgcXVlcnkgaXMgYHNlbGVjdCAqIGZyb20gXCJSZWxhdGVkVGFibGVcImAuXG4gICAgICByZWxhdGVkSm9pblNlbGVjdCA9IGAke3RoaXMucmVsYXRlZE1vZGVsQ2xhc3MudGFibGVOYW1lfSBhcyAke29wdC5yZWxhdGVkVGFibGVBbGlhc31gXG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkZXJcbiAgICAgIFtvcHQuam9pbk9wZXJhdGlvbl0oam9pblRhYmxlQXNBbGlhcywgam9pbiA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gam9pblRhYmxlT3duZXJDb2wubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgam9pbi5vbihqb2luVGFibGVPd25lckNvbFtpXSwgb3duZXJDb2xbaV0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgW29wdC5qb2luT3BlcmF0aW9uXShyZWxhdGVkSm9pblNlbGVjdCwgam9pbiA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gam9pblRhYmxlUmVsYXRlZENvbC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICBqb2luLm9uKGpvaW5UYWJsZVJlbGF0ZWRDb2xbaV0sIHJlbGF0ZWRDb2xbaV0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGZpbmQoYnVpbGRlciwgb3duZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBNYW55VG9NYW55RmluZE9wZXJhdGlvbignZmluZCcsIHtcbiAgICAgIHJlbGF0aW9uOiB0aGlzLFxuICAgICAgb3duZXJzOiBvd25lcnNcbiAgICB9KTtcbiAgfVxuXG4gIGluc2VydChidWlsZGVyLCBvd25lcikge1xuICAgIHJldHVybiBuZXcgTWFueVRvTWFueUluc2VydE9wZXJhdGlvbignaW5zZXJ0Jywge1xuICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICBvd25lcjogb3duZXJcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZShidWlsZGVyLCBvd25lcikge1xuICAgIGlmIChpc1NxbGl0ZShidWlsZGVyLmtuZXgoKSkpIHtcbiAgICAgIHJldHVybiBuZXcgTWFueVRvTWFueVVwZGF0ZVNxbGl0ZU9wZXJhdGlvbigndXBkYXRlJywge1xuICAgICAgICByZWxhdGlvbjogdGhpcyxcbiAgICAgICAgb3duZXI6IG93bmVyXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBNYW55VG9NYW55VXBkYXRlT3BlcmF0aW9uKCd1cGRhdGUnLCB7XG4gICAgICAgIHJlbGF0aW9uOiB0aGlzLFxuICAgICAgICBvd25lcjogb3duZXJcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHBhdGNoKGJ1aWxkZXIsIG93bmVyKSB7XG4gICAgaWYgKGlzU3FsaXRlKGJ1aWxkZXIua25leCgpKSkge1xuICAgICAgcmV0dXJuIG5ldyBNYW55VG9NYW55VXBkYXRlU3FsaXRlT3BlcmF0aW9uKCdwYXRjaCcsIHtcbiAgICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICAgIG93bmVyOiBvd25lcixcbiAgICAgICAgbW9kZWxPcHRpb25zOiB7cGF0Y2g6IHRydWV9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBNYW55VG9NYW55VXBkYXRlT3BlcmF0aW9uKCdwYXRjaCcsIHtcbiAgICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICAgIG93bmVyOiBvd25lcixcbiAgICAgICAgbW9kZWxPcHRpb25zOiB7cGF0Y2g6IHRydWV9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkZWxldGUoYnVpbGRlciwgb3duZXIpIHtcbiAgICBpZiAoaXNTcWxpdGUoYnVpbGRlci5rbmV4KCkpKSB7XG4gICAgICByZXR1cm4gbmV3IE1hbnlUb01hbnlEZWxldGVTcWxpdGVPcGVyYXRpb24oJ2RlbGV0ZScsIHtcbiAgICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICAgIG93bmVyOiBvd25lclxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgTWFueVRvTWFueURlbGV0ZU9wZXJhdGlvbignZGVsZXRlJywge1xuICAgICAgICByZWxhdGlvbjogdGhpcyxcbiAgICAgICAgb3duZXI6IG93bmVyXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZWxhdGUoYnVpbGRlciwgb3duZXIpIHtcbiAgICByZXR1cm4gbmV3IE1hbnlUb01hbnlSZWxhdGVPcGVyYXRpb24oJ3JlbGF0ZScsIHtcbiAgICAgIHJlbGF0aW9uOiB0aGlzLFxuICAgICAgb3duZXI6IG93bmVyXG4gICAgfSk7XG4gIH1cblxuICB1bnJlbGF0ZShidWlsZGVyLCBvd25lcikge1xuICAgIGlmIChpc1NxbGl0ZShidWlsZGVyLmtuZXgoKSkpIHtcbiAgICAgIHJldHVybiBuZXcgTWFueVRvTWFueVVucmVsYXRlU3FsaXRlT3BlcmF0aW9uKCd1bnJlbGF0ZScsIHtcbiAgICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICAgIG93bmVyOiBvd25lclxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgTWFueVRvTWFueVVucmVsYXRlT3BlcmF0aW9uKCd1bnJlbGF0ZScsIHtcbiAgICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICAgIG93bmVyOiBvd25lclxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0Rm9yTW9kaWZ5KGJ1aWxkZXIsIG93bmVyKSB7XG4gICAgbGV0IG93bmVySWQgPSBvd25lci4kdmFsdWVzKHRoaXMub3duZXJQcm9wKTtcblxuICAgIGxldCBpZFF1ZXJ5ID0gdGhpcy5qb2luVGFibGVNb2RlbENsYXNzKGJ1aWxkZXIua25leCgpKVxuICAgICAgLnF1ZXJ5KClcbiAgICAgIC5jaGlsZFF1ZXJ5T2YoYnVpbGRlcilcbiAgICAgIC5zZWxlY3QodGhpcy5mdWxsSm9pblRhYmxlUmVsYXRlZENvbCgpKVxuICAgICAgLndoZXJlQ29tcG9zaXRlKHRoaXMuZnVsbEpvaW5UYWJsZU93bmVyQ29sKCksIG93bmVySWQpO1xuXG4gICAgcmV0dXJuIGJ1aWxkZXIud2hlcmVJbkNvbXBvc2l0ZSh0aGlzLmZ1bGxSZWxhdGVkQ29sKCksIGlkUXVlcnkpO1xuICB9XG5cbiAgc2VsZWN0Rm9yTW9kaWZ5U3FsaXRlKGJ1aWxkZXIsIG93bmVyKSB7XG4gICAgY29uc3QgcmVsYXRlZFRhYmxlID0gdGhpcy5yZWxhdGVkTW9kZWxDbGFzcy50YWJsZU5hbWU7XG4gICAgY29uc3QgcmVsYXRlZFRhYmxlQWxpYXMgPSB0aGlzLnJlbGF0ZWRUYWJsZUFsaWFzKCk7XG4gICAgY29uc3QgcmVsYXRlZFRhYmxlQXNBbGlhcyA9IHJlbGF0ZWRUYWJsZSArICcgYXMgJyArIHJlbGF0ZWRUYWJsZUFsaWFzO1xuICAgIGNvbnN0IHJlbGF0ZWRUYWJsZUFsaWFzUm93SWQgPSByZWxhdGVkVGFibGVBbGlhcyArICcuJyArIHNxbGl0ZUJ1aWx0SW5Sb3dJZDtcbiAgICBjb25zdCByZWxhdGVkVGFibGVSb3dJZCA9IHJlbGF0ZWRUYWJsZSArICcuJyArIHNxbGl0ZUJ1aWx0SW5Sb3dJZDtcblxuICAgIGNvbnN0IHNlbGVjdFJlbGF0ZWRRdWVyeSA9IHRoaXMuam9pblRhYmxlTW9kZWxDbGFzcyhidWlsZGVyLmtuZXgoKSlcbiAgICAgIC5xdWVyeSgpXG4gICAgICAuY2hpbGRRdWVyeU9mKGJ1aWxkZXIpXG4gICAgICAuc2VsZWN0KHJlbGF0ZWRUYWJsZUFsaWFzUm93SWQpXG4gICAgICAud2hlcmVDb21wb3NpdGUodGhpcy5mdWxsSm9pblRhYmxlT3duZXJDb2woKSwgb3duZXIuJHZhbHVlcyh0aGlzLm93bmVyUHJvcCkpXG4gICAgICAuam9pbihyZWxhdGVkVGFibGVBc0FsaWFzLCBqb2luID0+IHtcbiAgICAgICAgY29uc3QgZnVsbEpvaW5UYWJsZVJlbGF0ZWRDb2xzID0gdGhpcy5mdWxsSm9pblRhYmxlUmVsYXRlZENvbCgpO1xuICAgICAgICBjb25zdCBmdWxsUmVsYXRlZENvbCA9IHRoaXMuZnVsbFJlbGF0ZWRDb2woKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGZ1bGxKb2luVGFibGVSZWxhdGVkQ29scy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICBqb2luLm9uKGZ1bGxKb2luVGFibGVSZWxhdGVkQ29sc1tpXSwgZnVsbFJlbGF0ZWRDb2xbaV0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHJldHVybiBidWlsZGVyLndoZXJlSW5Db21wb3NpdGUocmVsYXRlZFRhYmxlUm93SWQsIHNlbGVjdFJlbGF0ZWRRdWVyeSk7XG4gIH1cblxuICBjcmVhdGVKb2luTW9kZWxzKG93bmVySWQsIHJlbGF0ZWQpIHtcbiAgICBjb25zdCBqb2luTW9kZWxzID0gbmV3IEFycmF5KHJlbGF0ZWQubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsciA9IHJlbGF0ZWQubGVuZ3RoOyBpIDwgbHI7ICsraSkge1xuICAgICAgY29uc3QgcmVsID0gcmVsYXRlZFtpXTtcbiAgICAgIGxldCBqb2luTW9kZWwgPSB7fTtcblxuICAgICAgZm9yIChsZXQgaiA9IDAsIGxwID0gdGhpcy5qb2luVGFibGVPd25lclByb3AubGVuZ3RoOyBqIDwgbHA7ICsraikge1xuICAgICAgICBqb2luTW9kZWxbdGhpcy5qb2luVGFibGVPd25lclByb3Bbal1dID0gb3duZXJJZFtqXTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDAsIGxwID0gdGhpcy5qb2luVGFibGVSZWxhdGVkUHJvcC5sZW5ndGg7IGogPCBscDsgKytqKSB7XG4gICAgICAgIGpvaW5Nb2RlbFt0aGlzLmpvaW5UYWJsZVJlbGF0ZWRQcm9wW2pdXSA9IHJlbFt0aGlzLnJlbGF0ZWRQcm9wW2pdXTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDAsIGxwID0gdGhpcy5qb2luVGFibGVFeHRyYXMubGVuZ3RoOyBqIDwgbHA7ICsraikge1xuICAgICAgICBjb25zdCBleHRyYSA9IHRoaXMuam9pblRhYmxlRXh0cmFzW2pdO1xuICAgICAgICBjb25zdCBleHRyYVZhbHVlID0gcmVsW2V4dHJhLmFsaWFzUHJvcF07XG5cbiAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGV4dHJhVmFsdWUpKSB7XG4gICAgICAgICAgam9pbk1vZGVsW2V4dHJhLmpvaW5UYWJsZVByb3BdID0gZXh0cmFWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBqb2luTW9kZWxzW2ldID0gam9pbk1vZGVsO1xuICAgIH1cblxuICAgIHJldHVybiBqb2luTW9kZWxzO1xuICB9XG5cbiAgb21pdEV4dHJhUHJvcHMobW9kZWxzKSB7XG4gICAgaWYgKCFfLmlzRW1wdHkodGhpcy5qb2luVGFibGVFeHRyYXMpKSB7XG4gICAgICBjb25zdCBwcm9wcyA9IHRoaXMuam9pblRhYmxlRXh0cmFzLm1hcChleHRyYSA9PiBleHRyYS5hbGlhc1Byb3ApO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG1vZGVscy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgbW9kZWxzW2ldLiRvbWl0RnJvbURhdGFiYXNlSnNvbihwcm9wcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHBhcnNlRXh0cmFzKGV4dHJhcykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGV4dHJhcykpIHtcbiAgICAgIGV4dHJhcyA9IGV4dHJhcy5yZWR1Y2UoKGV4dHJhcywgY29sKSA9PiB7XG4gICAgICAgIGV4dHJhc1tjb2xdID0gY29sO1xuICAgICAgICByZXR1cm4gZXh0cmFzO1xuICAgICAgfSwge30pO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhleHRyYXMpLm1hcChrZXkgPT4ge1xuICAgICAgY29uc3QgdmFsID0gZXh0cmFzW2tleV07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGpvaW5UYWJsZUNvbDogdmFsLFxuICAgICAgICBqb2luVGFibGVQcm9wOiB0aGlzLl9qb2luVGFibGVNb2RlbENsYXNzLmNvbHVtbk5hbWVUb1Byb3BlcnR5TmFtZSh2YWwpLFxuICAgICAgICBhbGlhc0NvbDoga2V5LFxuICAgICAgICBhbGlhc1Byb3A6IHRoaXMuX2pvaW5UYWJsZU1vZGVsQ2xhc3MuY29sdW1uTmFtZVRvUHJvcGVydHlOYW1lKGtleSlcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==