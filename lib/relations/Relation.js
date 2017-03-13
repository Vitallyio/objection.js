'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _desc, _value, _class;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _memoize = require('../utils/decorators/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

var _classUtils = require('../utils/classUtils');

var _hiddenData = require('../utils/hiddenData');

var _QueryBuilder = require('../queryBuilder/QueryBuilder');

var _QueryBuilder2 = _interopRequireDefault(_QueryBuilder);

var _RelationFindOperation = require('./RelationFindOperation');

var _RelationFindOperation2 = _interopRequireDefault(_RelationFindOperation);

var _RelationUpdateOperation = require('./RelationUpdateOperation');

var _RelationUpdateOperation2 = _interopRequireDefault(_RelationUpdateOperation);

var _RelationDeleteOperation = require('./RelationDeleteOperation');

var _RelationDeleteOperation2 = _interopRequireDefault(_RelationDeleteOperation);

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

/**
 * @typedef {Object} RelationJoin

 * @property {string|Array.<string>} from
 * @property {string|Array.<string>} to
 * @property {Object} through
 * @property {Constructor.<Model>} through.modelClass
 * @property {string|Array.<string>} through.from
 * @property {string|Array.<string>} through.to
 * @property {Array.<string>} through.extra
 */

/**
 * @typedef {Object} RelationMapping
 *
 * @property {Constructor.<Model>|string} modelClass
 * @property {Relation} relation
 * @property {Object|function(QueryBuilder)} modify
 * @property {Object|function(QueryBuilder)} filter
 * @property {RelationJoin} [join]
 */

/**
 * @abstract
 */
var Relation = (_class = function () {
  function Relation(relationName, OwnerClass) {
    (0, _classCallCheck3.default)(this, Relation);

    /**
     * @type {string}
     */
    this.name = relationName;

    /**
     * @type {Constructor.<Model>}
     */
    this.ownerModelClass = OwnerClass;

    /**
     * @type {Constructor.<Model>}
     */
    this.relatedModelClass = null;

    /**
     * @type {Constructor.<Model>}
     */
    this._joinTableModelClass = null;

    /**
     * @type {Array.<string>}
     */
    this.ownerCol = null;

    /**
     * @type {Array.<string>}
     */
    this.ownerProp = null;

    /**
     * @type {Array.<string>}
     */
    this.relatedCol = null;

    /**
     * @type {Array.<string>}
     */
    this.relatedProp = null;

    /**
     * @type {string}
     */
    this.joinTable = null;

    /**
     * @type {Array.<string>}
     */
    this.joinTableOwnerCol = null;

    /**
     * @type {Array.<string>}
     */
    this.joinTableOwnerProp = null;

    /**
     * @type {Array.<string>}
     */
    this.joinTableRelatedCol = null;

    /**
     * @type {Array.<string>}
     */
    this.joinTableRelatedProp = null;

    /**
     * @type {Array.<{joinTableCol: string, joinTableProp: string, aliasCol: string, aliasProp: string}>}
     */
    this.joinTableExtras = [];

    /**
     * @type {function (QueryBuilder)}
     */
    this.modify = null;

    (0, _hiddenData.init)(this);
  }

  /**
   * @param {function=} subclassConstructor
   * @return {Constructor.<Model>}
   */


  Relation.extend = function extend(subclassConstructor) {
    (0, _classUtils.inherits)(subclassConstructor, this);
    return subclassConstructor;
  };

  /**
   * @param {RelationMapping} mapping
   */


  Relation.prototype.setMapping = function setMapping(mapping) {
    // Avoid require loop and import here.
    var Model = require(__dirname + '/../model/Model').default;

    if (!(0, _classUtils.isSubclassOf)(this.ownerModelClass, Model)) {
      this.throwError('Relation\'s owner is not a subclass of Model');
    }

    if (!mapping.modelClass) {
      this.throwError('modelClass is not defined');
    }

    this.relatedModelClass = this.resolveModel(Model, mapping.modelClass, 'modelClass');

    if (!mapping.relation) {
      this.throwError('relation is not defined');
    }

    if (!(0, _classUtils.isSubclassOf)(mapping.relation, Relation)) {
      this.throwError('relation is not a subclass of Relation');
    }

    if (!mapping.join || !mapping.join.from || !mapping.join.to) {
      this.throwError('join must be an object that maps the columns of the related models together. For example: {from: "SomeTable.id", to: "SomeOtherTable.someModelId"}');
    }

    var joinOwner = null;
    var joinRelated = null;

    var joinFrom = this.parseReference(mapping.join.from);
    var joinTo = this.parseReference(mapping.join.to);

    if (!joinFrom.table || _lodash2.default.isEmpty(joinFrom.columns)) {
      this.throwError('join.from must have format TableName.columnName. For example "SomeTable.id" or in case of composite key ["SomeTable.a", "SomeTable.b"].');
    }

    if (!joinTo.table || _lodash2.default.isEmpty(joinTo.columns)) {
      this.throwError('join.to must have format TableName.columnName. For example "SomeTable.id" or in case of composite key ["SomeTable.a", "SomeTable.b"].');
    }

    if (joinFrom.table === this.ownerModelClass.tableName) {
      joinOwner = joinFrom;
      joinRelated = joinTo;
    } else if (joinTo.table === this.ownerModelClass.tableName) {
      joinOwner = joinTo;
      joinRelated = joinFrom;
    } else {
      this.throwError('join: either `from` or `to` must point to the owner model table.');
    }

    if (joinRelated.table !== this.relatedModelClass.tableName) {
      this.throwError('join: either `from` or `to` must point to the related model table.');
    }

    this.ownerCol = joinOwner.columns;
    this.ownerProp = this.propertyName(this.ownerCol, this.ownerModelClass);
    this.relatedCol = joinRelated.columns;
    this.relatedProp = this.propertyName(this.relatedCol, this.relatedModelClass);
    this.modify = this.parseModify(mapping);
  };

  /**
   * @return {boolean}
   */


  Relation.prototype.isOneToOne = function isOneToOne() {
    return false;
  };

  /**
   * @type {Constructor.<Model>}
   */


  Relation.prototype.joinTableModelClass = function joinTableModelClass(knex) {
    if (knex && knex !== this._joinTableModelClass.knex()) {
      return this._joinTableModelClass.bindKnex(knex);
    } else {
      return this._joinTableModelClass;
    }
  };

  /**
   * @returns {Array.<string>}
   */


  Relation.prototype.fullRelatedCol = function fullRelatedCol() {
    var _this = this;

    return this.relatedCol.map(function (col) {
      return _this.relatedModelClass.tableName + '.' + col;
    });
  };

  /**
   * @returns {Array.<string>}
   */


  Relation.prototype.fullOwnerCol = function fullOwnerCol() {
    var _this2 = this;

    return this.ownerCol.map(function (col) {
      return _this2.ownerModelClass.tableName + '.' + col;
    });
  };

  /**
   * @returns {string}
   */


  Relation.prototype.relatedTableAlias = function relatedTableAlias() {
    return this.relatedModelClass.tableName + '_rel_' + this.name;
  };

  /**
   * @returns {Relation}
   */


  Relation.prototype.clone = function clone() {
    var relation = new this.constructor(this.name, this.ownerModelClass);

    relation.relatedModelClass = this.relatedModelClass;
    relation.ownerCol = this.ownerCol;
    relation.ownerProp = this.ownerProp;
    relation.relatedCol = this.relatedCol;
    relation.relatedProp = this.relatedProp;
    relation.modify = this.modify;

    relation._joinTableModelClass = this._joinTableModelClass;
    relation.joinTable = this.joinTable;
    relation.joinTableOwnerCol = this.joinTableOwnerCol;
    relation.joinTableOwnerProp = this.joinTableOwnerProp;
    relation.joinTableRelatedCol = this.joinTableRelatedCol;
    relation.joinTableRelatedProp = this.joinTableRelatedProp;
    relation.joinTableExtras = this.joinTableExtras;

    (0, _hiddenData.copyHiddenData)(this, relation);

    return relation;
  };

  /**
   * @param {knex} knex
   * @returns {Relation}
   */


  Relation.prototype.bindKnex = function bindKnex(knex) {
    var bound = this.clone();

    bound.relatedModelClass = this.relatedModelClass.bindKnex(knex);
    bound.ownerModelClass = this.ownerModelClass.bindKnex(knex);

    return bound;
  };

  /**
   * @param {QueryBuilder} builder
   * @param {object} opt
   * @param {Array.<string>|Array.<Array.<(string|number)>>} opt.ownerIds
   * @param {boolean=} opt.isColumnRef
   * @returns {QueryBuilder}
   */


  Relation.prototype.findQuery = function findQuery(builder, opt) {
    var fullRelatedCol = this.fullRelatedCol();

    if (opt.isColumnRef) {
      for (var i = 0, l = fullRelatedCol.length; i < l; ++i) {
        builder.whereRef(fullRelatedCol[i], opt.ownerIds[i]);
      }
    } else if (containsNonNull(opt.ownerIds)) {
      builder.whereInComposite(fullRelatedCol, opt.ownerIds);
    } else {
      builder.resolve([]);
    }

    return builder.modify(this.modify);
  };

  /**
   * @param {QueryBuilder} builder
   * @param {object=} opt
   * @returns {QueryBuilder}
   */


  Relation.prototype.join = function join(builder, opt) {
    opt = opt || {};

    opt.joinOperation = opt.joinOperation || 'join';
    opt.relatedTableAlias = opt.relatedTableAlias || this.relatedTableAlias();
    opt.relatedJoinSelectQuery = opt.relatedJoinSelectQuery || this.relatedModelClass.query().childQueryOf(builder);
    opt.relatedTable = opt.relatedTable || this.relatedModelClass.tableName;
    opt.ownerTable = opt.ownerTable || this.ownerModelClass.tableName;

    var relatedCol = this.relatedCol.map(function (col) {
      return opt.relatedTableAlias + '.' + col;
    });
    var ownerCol = this.ownerCol.map(function (col) {
      return opt.ownerTable + '.' + col;
    });

    var relatedSelect = opt.relatedJoinSelectQuery.modify(this.modify).as(opt.relatedTableAlias);

    if (relatedSelect.isSelectAll()) {
      // No need to join a subquery if the query is `select * from "RelatedTable"`.
      relatedSelect = this.relatedModelClass.tableName + ' as ' + opt.relatedTableAlias;
    }

    return builder[opt.joinOperation](relatedSelect, function (join) {
      for (var i = 0, l = relatedCol.length; i < l; ++i) {
        join.on(relatedCol[i], '=', ownerCol[i]);
      }
    });
  };

  /* istanbul ignore next */
  /**
   * @abstract
   * @param {QueryBuilder} builder
   * @param {Model} owner
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.insert = function insert(builder, owner) {
    this.throwError('not implemented');
  };

  /**
   * @param {QueryBuilder} builder
   * @param {Model} owner
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.update = function update(builder, owner) {
    return new _RelationUpdateOperation2.default('update', {
      relation: this,
      owner: owner
    });
  };

  /**
   * @param {QueryBuilder} builder
   * @param {Model} owner
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.patch = function patch(builder, owner) {
    return new _RelationUpdateOperation2.default('patch', {
      relation: this,
      owner: owner,
      modelOptions: { patch: true }
    });
  };

  /**
   * @param {QueryBuilder} builder
   * @param {Array.<Model>} owners
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.find = function find(builder, owners) {
    return new _RelationFindOperation2.default('find', {
      relation: this,
      owners: owners
    });
  };

  /**
   * @param {QueryBuilder} builder
   * @param {Model} owner
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.delete = function _delete(builder, owner) {
    return new _RelationDeleteOperation2.default('delete', {
      relation: this,
      owner: owner
    });
  };

  /* istanbul ignore next */
  /**
   * @abstract
   * @param {QueryBuilder} builder
   * @param {Model} owner
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.relate = function relate(builder, owner) {
    this.throwError('not implemented');
  };

  /* istanbul ignore next */
  /**
   * @abstract
   * @param {QueryBuilder} builder
   * @param {Model} owner
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.unrelate = function unrelate(builder, owner) {
    this.throwError('not implemented');
  };

  /**
   * @protected
   */


  Relation.prototype.propertyName = function propertyName(columns, modelClass) {
    var _this3 = this;

    return columns.map(function (column) {
      var propertyName = modelClass.columnNameToPropertyName(column);

      if (!propertyName) {
        throw new Error(modelClass.name + '.$parseDatabaseJson probably transforms the value of the column ' + column + '.' + ' This is a no-no because ' + column + ' is needed in the relation ' + _this3.ownerModelClass.tableName + '.' + _this3.name);
      }

      return propertyName;
    });
  };

  /**
   * @protected
   */


  Relation.prototype.parseModify = function parseModify(mapping) {
    var modify = mapping.modify || mapping.filter;

    if (_lodash2.default.isFunction(modify)) {
      return modify;
    } else if (_lodash2.default.isObject(modify)) {
      return function (queryBuilder) {
        queryBuilder.where(modify);
      };
    } else {
      return _lodash2.default.noop;
    }
  };

  /**
   * @protected
   */


  Relation.prototype.parseReference = function parseReference(ref) {
    if (!_lodash2.default.isArray(ref)) {
      ref = [ref];
    }

    var table = null;
    var columns = [];

    for (var i = 0; i < ref.length; ++i) {
      var refItem = ref[i];
      var ndx = refItem.lastIndexOf('.');

      var tableName = refItem.substr(0, ndx).trim();
      var columnName = refItem.substr(ndx + 1, refItem.length).trim();

      if (!tableName || table && table !== tableName || !columnName) {
        return {
          table: null,
          columns: []
        };
      } else {
        table = tableName;
      }

      columns.push(columnName);
    }

    return {
      table: table,
      columns: columns
    };
  };

  /**
   * @protected
   */


  Relation.prototype.mergeModels = function mergeModels(models1, models2) {
    var modelClass = void 0;

    models1 = _lodash2.default.compact(models1);
    models2 = _lodash2.default.compact(models2);

    if (_lodash2.default.isEmpty(models1) && _lodash2.default.isEmpty(models2)) {
      return [];
    }

    if (!_lodash2.default.isEmpty(models1)) {
      modelClass = models1[0].constructor;
    } else {
      modelClass = models2[0].constructor;
    }

    var idProperty = modelClass.getIdPropertyArray();
    var modelsById = (0, _create2.default)(null);

    for (var i = 0, l = models1.length; i < l; ++i) {
      var model = models1[i];
      var key = model.$propKey(idProperty);

      modelsById[key] = model;
    }

    for (var _i = 0, _l = models2.length; _i < _l; ++_i) {
      var _model = models2[_i];
      var _key = _model.$propKey(idProperty);

      modelsById[_key] = _model;
    }

    return _lodash2.default.sortBy(_lodash2.default.values(modelsById), idProperty);
  };

  /**
   * @protected
   */


  Relation.prototype.resolveModel = function resolveModel(Model, modelClass, logPrefix) {
    var requireModel = function requireModel(path) {
      var ModelClass = void 0;

      try {
        // babel 6 style of exposing es6 exports to commonjs https://github.com/babel/babel/issues/2683
        var module = require(path);

        ModelClass = (0, _classUtils.isSubclassOf)(module.default, Model) ? module.default : module;
      } catch (err) {
        return null;
      }

      if (!(0, _classUtils.isSubclassOf)(ModelClass, Model)) {
        return null;
      }

      return ModelClass;
    };

    if (_lodash2.default.isString(modelClass)) {
      var ModelClass = null;

      if (isAbsolutePath(modelClass)) {
        ModelClass = requireModel(modelClass);
      } else {
        // If the path is not a absolute, try the modelPaths of the owner model class.
        _lodash2.default.each(this.ownerModelClass.modelPaths, function (modelPath) {
          ModelClass = requireModel(_path2.default.join(modelPath, modelClass));

          if ((0, _classUtils.isSubclassOf)(ModelClass, Model)) {
            // Break the loop.
            return false;
          }
        });
      }

      if (!(0, _classUtils.isSubclassOf)(ModelClass, Model)) {
        this.throwError(logPrefix + ': ' + modelClass + ' is an invalid file path to a model class');
      }

      return ModelClass;
    } else {
      if (!(0, _classUtils.isSubclassOf)(modelClass, Model)) {
        this.throwError(logPrefix + ' is not a subclass of Model or a file path to a module that exports one.');
      }

      return modelClass;
    }
  };

  /**
   * @protected
   */


  Relation.prototype.throwError = function throwError(message) {
    if (this.ownerModelClass && this.ownerModelClass.name && this.name) {
      throw new Error(this.ownerModelClass.name + '.relationMappings.' + this.name + ': ' + message);
    } else {
      throw new Error(this.constructor.name + ': ' + message);
    }
  };

  return Relation;
}(), (_applyDecoratedDescriptor(_class.prototype, 'fullRelatedCol', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fullRelatedCol'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fullOwnerCol', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fullOwnerCol'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'relatedTableAlias', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'relatedTableAlias'), _class.prototype)), _class);
exports.default = Relation;


function isAbsolutePath(pth) {
  return _path2.default.normalize(pth + '/') === _path2.default.normalize(_path2.default.resolve(pth) + '/');
}

function containsNonNull(arr) {
  for (var i = 0, l = arr.length; i < l; ++i) {
    var val = arr[i];

    if (Array.isArray(val) && containsNonNull(val)) {
      return true;
    } else if (val !== null && val !== undefined) {
      return true;
    }
  }

  return false;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlbGF0aW9uLmpzIl0sIm5hbWVzIjpbIlJlbGF0aW9uIiwicmVsYXRpb25OYW1lIiwiT3duZXJDbGFzcyIsIm5hbWUiLCJvd25lck1vZGVsQ2xhc3MiLCJyZWxhdGVkTW9kZWxDbGFzcyIsIl9qb2luVGFibGVNb2RlbENsYXNzIiwib3duZXJDb2wiLCJvd25lclByb3AiLCJyZWxhdGVkQ29sIiwicmVsYXRlZFByb3AiLCJqb2luVGFibGUiLCJqb2luVGFibGVPd25lckNvbCIsImpvaW5UYWJsZU93bmVyUHJvcCIsImpvaW5UYWJsZVJlbGF0ZWRDb2wiLCJqb2luVGFibGVSZWxhdGVkUHJvcCIsImpvaW5UYWJsZUV4dHJhcyIsIm1vZGlmeSIsImV4dGVuZCIsInN1YmNsYXNzQ29uc3RydWN0b3IiLCJzZXRNYXBwaW5nIiwibWFwcGluZyIsIk1vZGVsIiwicmVxdWlyZSIsIl9fZGlybmFtZSIsImRlZmF1bHQiLCJ0aHJvd0Vycm9yIiwibW9kZWxDbGFzcyIsInJlc29sdmVNb2RlbCIsInJlbGF0aW9uIiwiam9pbiIsImZyb20iLCJ0byIsImpvaW5Pd25lciIsImpvaW5SZWxhdGVkIiwiam9pbkZyb20iLCJwYXJzZVJlZmVyZW5jZSIsImpvaW5UbyIsInRhYmxlIiwiaXNFbXB0eSIsImNvbHVtbnMiLCJ0YWJsZU5hbWUiLCJwcm9wZXJ0eU5hbWUiLCJwYXJzZU1vZGlmeSIsImlzT25lVG9PbmUiLCJqb2luVGFibGVNb2RlbENsYXNzIiwia25leCIsImJpbmRLbmV4IiwiZnVsbFJlbGF0ZWRDb2wiLCJtYXAiLCJjb2wiLCJmdWxsT3duZXJDb2wiLCJyZWxhdGVkVGFibGVBbGlhcyIsImNsb25lIiwiY29uc3RydWN0b3IiLCJib3VuZCIsImZpbmRRdWVyeSIsImJ1aWxkZXIiLCJvcHQiLCJpc0NvbHVtblJlZiIsImkiLCJsIiwibGVuZ3RoIiwid2hlcmVSZWYiLCJvd25lcklkcyIsImNvbnRhaW5zTm9uTnVsbCIsIndoZXJlSW5Db21wb3NpdGUiLCJyZXNvbHZlIiwiam9pbk9wZXJhdGlvbiIsInJlbGF0ZWRKb2luU2VsZWN0UXVlcnkiLCJxdWVyeSIsImNoaWxkUXVlcnlPZiIsInJlbGF0ZWRUYWJsZSIsIm93bmVyVGFibGUiLCJyZWxhdGVkU2VsZWN0IiwiYXMiLCJpc1NlbGVjdEFsbCIsIm9uIiwiaW5zZXJ0Iiwib3duZXIiLCJ1cGRhdGUiLCJwYXRjaCIsIm1vZGVsT3B0aW9ucyIsImZpbmQiLCJvd25lcnMiLCJkZWxldGUiLCJyZWxhdGUiLCJ1bnJlbGF0ZSIsImNvbHVtbk5hbWVUb1Byb3BlcnR5TmFtZSIsImNvbHVtbiIsIkVycm9yIiwiZmlsdGVyIiwiaXNGdW5jdGlvbiIsImlzT2JqZWN0IiwicXVlcnlCdWlsZGVyIiwid2hlcmUiLCJub29wIiwicmVmIiwiaXNBcnJheSIsInJlZkl0ZW0iLCJuZHgiLCJsYXN0SW5kZXhPZiIsInN1YnN0ciIsInRyaW0iLCJjb2x1bW5OYW1lIiwicHVzaCIsIm1lcmdlTW9kZWxzIiwibW9kZWxzMSIsIm1vZGVsczIiLCJjb21wYWN0IiwiaWRQcm9wZXJ0eSIsImdldElkUHJvcGVydHlBcnJheSIsIm1vZGVsc0J5SWQiLCJtb2RlbCIsImtleSIsIiRwcm9wS2V5Iiwic29ydEJ5IiwidmFsdWVzIiwibG9nUHJlZml4IiwicmVxdWlyZU1vZGVsIiwicGF0aCIsIk1vZGVsQ2xhc3MiLCJtb2R1bGUiLCJlcnIiLCJpc1N0cmluZyIsImlzQWJzb2x1dGVQYXRoIiwiZWFjaCIsIm1vZGVsUGF0aHMiLCJtb2RlbFBhdGgiLCJtZXNzYWdlIiwicHRoIiwibm9ybWFsaXplIiwiYXJyIiwidmFsIiwiQXJyYXkiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7Ozs7OztBQVVB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b0U7QUFDbEUsWUFBTSxJQUFJdUYsS0FBSixDQUFhLEtBQUt0RixlQUFMLENBQXFCRCxJQUFsQywwQkFBMkQsS0FBS0EsSUFBaEUsVUFBeUU4SCxPQUF6RSxDQUFOO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsWUFBTSxJQUFJdkMsS0FBSixDQUFhLEtBQUtwQyxXQUFMLENBQWlCbkQsSUFBOUIsVUFBdUM4SCxPQUF2QyxDQUFOO0FBQ0Q7QUFDRixHOzs7O2tCQXJpQmtCakksUTs7O0FBd2lCckIsU0FBUzZILGNBQVQsQ0FBd0JLLEdBQXhCLEVBQTZCO0FBQzNCLFNBQU8sZUFBS0MsU0FBTCxDQUFlRCxNQUFNLEdBQXJCLE1BQThCLGVBQUtDLFNBQUwsQ0FBZSxlQUFLaEUsT0FBTCxDQUFhK0QsR0FBYixJQUFvQixHQUFuQyxDQUFyQztBQUNEOztBQUVELFNBQVNqRSxlQUFULENBQXlCbUUsR0FBekIsRUFBOEI7QUFDNUIsT0FBSyxJQUFJeEUsSUFBSSxDQUFSLEVBQVdDLElBQUl1RSxJQUFJdEUsTUFBeEIsRUFBZ0NGLElBQUlDLENBQXBDLEVBQXVDLEVBQUVELENBQXpDLEVBQTRDO0FBQzFDLFFBQU15RSxNQUFNRCxJQUFJeEUsQ0FBSixDQUFaOztBQUVBLFFBQUkwRSxNQUFNcEMsT0FBTixDQUFjbUMsR0FBZCxLQUFzQnBFLGdCQUFnQm9FLEdBQWhCLENBQTFCLEVBQWdEO0FBQzlDLGFBQU8sSUFBUDtBQUNELEtBRkQsTUFFTyxJQUFJQSxRQUFRLElBQVIsSUFBZ0JBLFFBQVFFLFNBQTVCLEVBQXVDO0FBQzVDLGFBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBRUQsU0FBTyxLQUFQO0FBQ0QiLCJmaWxlIjoiUmVsYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICcuLi91dGlscy9kZWNvcmF0b3JzL21lbW9pemUnO1xuaW1wb3J0IHtpbmhlcml0cywgaXNTdWJjbGFzc09mfSBmcm9tICcuLi91dGlscy9jbGFzc1V0aWxzJztcbmltcG9ydCB7aW5pdCwgY29weUhpZGRlbkRhdGF9IGZyb20gJy4uL3V0aWxzL2hpZGRlbkRhdGEnO1xuaW1wb3J0IFF1ZXJ5QnVpbGRlciBmcm9tICcuLi9xdWVyeUJ1aWxkZXIvUXVlcnlCdWlsZGVyJztcblxuaW1wb3J0IFJlbGF0aW9uRmluZE9wZXJhdGlvbiBmcm9tICcuL1JlbGF0aW9uRmluZE9wZXJhdGlvbic7XG5pbXBvcnQgUmVsYXRpb25VcGRhdGVPcGVyYXRpb24gZnJvbSAnLi9SZWxhdGlvblVwZGF0ZU9wZXJhdGlvbic7XG5pbXBvcnQgUmVsYXRpb25EZWxldGVPcGVyYXRpb24gZnJvbSAnLi9SZWxhdGlvbkRlbGV0ZU9wZXJhdGlvbic7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUmVsYXRpb25Kb2luXG5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfEFycmF5LjxzdHJpbmc+fSBmcm9tXG4gKiBAcHJvcGVydHkge3N0cmluZ3xBcnJheS48c3RyaW5nPn0gdG9cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSB0aHJvdWdoXG4gKiBAcHJvcGVydHkge0NvbnN0cnVjdG9yLjxNb2RlbD59IHRocm91Z2gubW9kZWxDbGFzc1xuICogQHByb3BlcnR5IHtzdHJpbmd8QXJyYXkuPHN0cmluZz59IHRocm91Z2guZnJvbVxuICogQHByb3BlcnR5IHtzdHJpbmd8QXJyYXkuPHN0cmluZz59IHRocm91Z2gudG9cbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPHN0cmluZz59IHRocm91Z2guZXh0cmFcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFJlbGF0aW9uTWFwcGluZ1xuICpcbiAqIEBwcm9wZXJ0eSB7Q29uc3RydWN0b3IuPE1vZGVsPnxzdHJpbmd9IG1vZGVsQ2xhc3NcbiAqIEBwcm9wZXJ0eSB7UmVsYXRpb259IHJlbGF0aW9uXG4gKiBAcHJvcGVydHkge09iamVjdHxmdW5jdGlvbihRdWVyeUJ1aWxkZXIpfSBtb2RpZnlcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fGZ1bmN0aW9uKFF1ZXJ5QnVpbGRlcil9IGZpbHRlclxuICogQHByb3BlcnR5IHtSZWxhdGlvbkpvaW59IFtqb2luXVxuICovXG5cbi8qKlxuICogQGFic3RyYWN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbGF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihyZWxhdGlvbk5hbWUsIE93bmVyQ2xhc3MpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IHJlbGF0aW9uTmFtZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtDb25zdHJ1Y3Rvci48TW9kZWw+fVxuICAgICAqL1xuICAgIHRoaXMub3duZXJNb2RlbENsYXNzID0gT3duZXJDbGFzcztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtDb25zdHJ1Y3Rvci48TW9kZWw+fVxuICAgICAqL1xuICAgIHRoaXMucmVsYXRlZE1vZGVsQ2xhc3MgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0NvbnN0cnVjdG9yLjxNb2RlbD59XG4gICAgICovXG4gICAgdGhpcy5fam9pblRhYmxlTW9kZWxDbGFzcyA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPHN0cmluZz59XG4gICAgICovXG4gICAgdGhpcy5vd25lckNvbCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPHN0cmluZz59XG4gICAgICovXG4gICAgdGhpcy5vd25lclByb3AgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fVxuICAgICAqL1xuICAgIHRoaXMucmVsYXRlZENvbCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPHN0cmluZz59XG4gICAgICovXG4gICAgdGhpcy5yZWxhdGVkUHJvcCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuam9pblRhYmxlID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBcnJheS48c3RyaW5nPn1cbiAgICAgKi9cbiAgICB0aGlzLmpvaW5UYWJsZU93bmVyQ29sID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBcnJheS48c3RyaW5nPn1cbiAgICAgKi9cbiAgICB0aGlzLmpvaW5UYWJsZU93bmVyUHJvcCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPHN0cmluZz59XG4gICAgICovXG4gICAgdGhpcy5qb2luVGFibGVSZWxhdGVkQ29sID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBcnJheS48c3RyaW5nPn1cbiAgICAgKi9cbiAgICB0aGlzLmpvaW5UYWJsZVJlbGF0ZWRQcm9wID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBcnJheS48e2pvaW5UYWJsZUNvbDogc3RyaW5nLCBqb2luVGFibGVQcm9wOiBzdHJpbmcsIGFsaWFzQ29sOiBzdHJpbmcsIGFsaWFzUHJvcDogc3RyaW5nfT59XG4gICAgICovXG4gICAgdGhpcy5qb2luVGFibGVFeHRyYXMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtmdW5jdGlvbiAoUXVlcnlCdWlsZGVyKX1cbiAgICAgKi9cbiAgICB0aGlzLm1vZGlmeSA9IG51bGw7XG5cbiAgICBpbml0KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb249fSBzdWJjbGFzc0NvbnN0cnVjdG9yXG4gICAqIEByZXR1cm4ge0NvbnN0cnVjdG9yLjxNb2RlbD59XG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKHN1YmNsYXNzQ29uc3RydWN0b3IpIHtcbiAgICBpbmhlcml0cyhzdWJjbGFzc0NvbnN0cnVjdG9yLCB0aGlzKTtcbiAgICByZXR1cm4gc3ViY2xhc3NDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1JlbGF0aW9uTWFwcGluZ30gbWFwcGluZ1xuICAgKi9cbiAgc2V0TWFwcGluZyhtYXBwaW5nKSB7XG4gICAgLy8gQXZvaWQgcmVxdWlyZSBsb29wIGFuZCBpbXBvcnQgaGVyZS5cbiAgICBsZXQgTW9kZWwgPSByZXF1aXJlKF9fZGlybmFtZSArICcvLi4vbW9kZWwvTW9kZWwnKS5kZWZhdWx0O1xuXG4gICAgaWYgKCFpc1N1YmNsYXNzT2YodGhpcy5vd25lck1vZGVsQ2xhc3MsIE1vZGVsKSkge1xuICAgICAgdGhpcy50aHJvd0Vycm9yKCdSZWxhdGlvblxcJ3Mgb3duZXIgaXMgbm90IGEgc3ViY2xhc3Mgb2YgTW9kZWwnKTtcbiAgICB9XG5cbiAgICBpZiAoIW1hcHBpbmcubW9kZWxDbGFzcykge1xuICAgICAgdGhpcy50aHJvd0Vycm9yKCdtb2RlbENsYXNzIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWxhdGVkTW9kZWxDbGFzcyA9IHRoaXMucmVzb2x2ZU1vZGVsKE1vZGVsLCBtYXBwaW5nLm1vZGVsQ2xhc3MsICdtb2RlbENsYXNzJyk7XG5cbiAgICBpZiAoIW1hcHBpbmcucmVsYXRpb24pIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcigncmVsYXRpb24gaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzU3ViY2xhc3NPZihtYXBwaW5nLnJlbGF0aW9uLCBSZWxhdGlvbikpIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcigncmVsYXRpb24gaXMgbm90IGEgc3ViY2xhc3Mgb2YgUmVsYXRpb24nKTtcbiAgICB9XG5cbiAgICBpZiAoIW1hcHBpbmcuam9pbiB8fCAhbWFwcGluZy5qb2luLmZyb20gfHwgIW1hcHBpbmcuam9pbi50bykge1xuICAgICAgdGhpcy50aHJvd0Vycm9yKCdqb2luIG11c3QgYmUgYW4gb2JqZWN0IHRoYXQgbWFwcyB0aGUgY29sdW1ucyBvZiB0aGUgcmVsYXRlZCBtb2RlbHMgdG9nZXRoZXIuIEZvciBleGFtcGxlOiB7ZnJvbTogXCJTb21lVGFibGUuaWRcIiwgdG86IFwiU29tZU90aGVyVGFibGUuc29tZU1vZGVsSWRcIn0nKTtcbiAgICB9XG5cbiAgICBsZXQgam9pbk93bmVyID0gbnVsbDtcbiAgICBsZXQgam9pblJlbGF0ZWQgPSBudWxsO1xuXG4gICAgbGV0IGpvaW5Gcm9tID0gdGhpcy5wYXJzZVJlZmVyZW5jZShtYXBwaW5nLmpvaW4uZnJvbSk7XG4gICAgbGV0IGpvaW5UbyA9IHRoaXMucGFyc2VSZWZlcmVuY2UobWFwcGluZy5qb2luLnRvKTtcblxuICAgIGlmICgham9pbkZyb20udGFibGUgfHwgXy5pc0VtcHR5KGpvaW5Gcm9tLmNvbHVtbnMpKSB7XG4gICAgICB0aGlzLnRocm93RXJyb3IoJ2pvaW4uZnJvbSBtdXN0IGhhdmUgZm9ybWF0IFRhYmxlTmFtZS5jb2x1bW5OYW1lLiBGb3IgZXhhbXBsZSBcIlNvbWVUYWJsZS5pZFwiIG9yIGluIGNhc2Ugb2YgY29tcG9zaXRlIGtleSBbXCJTb21lVGFibGUuYVwiLCBcIlNvbWVUYWJsZS5iXCJdLicpO1xuICAgIH1cblxuICAgIGlmICgham9pblRvLnRhYmxlIHx8IF8uaXNFbXB0eShqb2luVG8uY29sdW1ucykpIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcignam9pbi50byBtdXN0IGhhdmUgZm9ybWF0IFRhYmxlTmFtZS5jb2x1bW5OYW1lLiBGb3IgZXhhbXBsZSBcIlNvbWVUYWJsZS5pZFwiIG9yIGluIGNhc2Ugb2YgY29tcG9zaXRlIGtleSBbXCJTb21lVGFibGUuYVwiLCBcIlNvbWVUYWJsZS5iXCJdLicpO1xuICAgIH1cblxuICAgIGlmIChqb2luRnJvbS50YWJsZSA9PT0gdGhpcy5vd25lck1vZGVsQ2xhc3MudGFibGVOYW1lKSB7XG4gICAgICBqb2luT3duZXIgPSBqb2luRnJvbTtcbiAgICAgIGpvaW5SZWxhdGVkID0gam9pblRvO1xuICAgIH0gZWxzZSBpZiAoam9pblRvLnRhYmxlID09PSB0aGlzLm93bmVyTW9kZWxDbGFzcy50YWJsZU5hbWUpIHtcbiAgICAgIGpvaW5Pd25lciA9IGpvaW5UbztcbiAgICAgIGpvaW5SZWxhdGVkID0gam9pbkZyb207XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcignam9pbjogZWl0aGVyIGBmcm9tYCBvciBgdG9gIG11c3QgcG9pbnQgdG8gdGhlIG93bmVyIG1vZGVsIHRhYmxlLicpO1xuICAgIH1cblxuICAgIGlmIChqb2luUmVsYXRlZC50YWJsZSAhPT0gdGhpcy5yZWxhdGVkTW9kZWxDbGFzcy50YWJsZU5hbWUpIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcignam9pbjogZWl0aGVyIGBmcm9tYCBvciBgdG9gIG11c3QgcG9pbnQgdG8gdGhlIHJlbGF0ZWQgbW9kZWwgdGFibGUuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5vd25lckNvbCA9IGpvaW5Pd25lci5jb2x1bW5zO1xuICAgIHRoaXMub3duZXJQcm9wID0gdGhpcy5wcm9wZXJ0eU5hbWUodGhpcy5vd25lckNvbCwgdGhpcy5vd25lck1vZGVsQ2xhc3MpO1xuICAgIHRoaXMucmVsYXRlZENvbCA9IGpvaW5SZWxhdGVkLmNvbHVtbnM7XG4gICAgdGhpcy5yZWxhdGVkUHJvcCA9IHRoaXMucHJvcGVydHlOYW1lKHRoaXMucmVsYXRlZENvbCwgdGhpcy5yZWxhdGVkTW9kZWxDbGFzcyk7XG4gICAgdGhpcy5tb2RpZnkgPSB0aGlzLnBhcnNlTW9kaWZ5KG1hcHBpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpc09uZVRvT25lKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7Q29uc3RydWN0b3IuPE1vZGVsPn1cbiAgICovXG4gIGpvaW5UYWJsZU1vZGVsQ2xhc3Moa25leCkge1xuICAgIGlmIChrbmV4ICYmIGtuZXggIT09IHRoaXMuX2pvaW5UYWJsZU1vZGVsQ2xhc3Mua25leCgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fam9pblRhYmxlTW9kZWxDbGFzcy5iaW5kS25leChrbmV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2pvaW5UYWJsZU1vZGVsQ2xhc3M7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtBcnJheS48c3RyaW5nPn1cbiAgICovXG4gIEBtZW1vaXplXG4gIGZ1bGxSZWxhdGVkQ29sKCkge1xuICAgIHJldHVybiB0aGlzLnJlbGF0ZWRDb2wubWFwKGNvbCA9PiB0aGlzLnJlbGF0ZWRNb2RlbENsYXNzLnRhYmxlTmFtZSArICcuJyArIGNvbCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge0FycmF5LjxzdHJpbmc+fVxuICAgKi9cbiAgQG1lbW9pemVcbiAgZnVsbE93bmVyQ29sKCkge1xuICAgIHJldHVybiB0aGlzLm93bmVyQ29sLm1hcChjb2wgPT4gdGhpcy5vd25lck1vZGVsQ2xhc3MudGFibGVOYW1lICsgJy4nICsgY29sKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgQG1lbW9pemVcbiAgcmVsYXRlZFRhYmxlQWxpYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVsYXRlZE1vZGVsQ2xhc3MudGFibGVOYW1lICsgJ19yZWxfJyArIHRoaXMubmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UmVsYXRpb259XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICBjb25zdCByZWxhdGlvbiA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMubmFtZSwgdGhpcy5vd25lck1vZGVsQ2xhc3MpO1xuXG4gICAgcmVsYXRpb24ucmVsYXRlZE1vZGVsQ2xhc3MgPSB0aGlzLnJlbGF0ZWRNb2RlbENsYXNzO1xuICAgIHJlbGF0aW9uLm93bmVyQ29sID0gdGhpcy5vd25lckNvbDtcbiAgICByZWxhdGlvbi5vd25lclByb3AgPSB0aGlzLm93bmVyUHJvcDtcbiAgICByZWxhdGlvbi5yZWxhdGVkQ29sID0gdGhpcy5yZWxhdGVkQ29sO1xuICAgIHJlbGF0aW9uLnJlbGF0ZWRQcm9wID0gdGhpcy5yZWxhdGVkUHJvcDtcbiAgICByZWxhdGlvbi5tb2RpZnkgPSB0aGlzLm1vZGlmeTtcblxuICAgIHJlbGF0aW9uLl9qb2luVGFibGVNb2RlbENsYXNzID0gdGhpcy5fam9pblRhYmxlTW9kZWxDbGFzcztcbiAgICByZWxhdGlvbi5qb2luVGFibGUgPSB0aGlzLmpvaW5UYWJsZTtcbiAgICByZWxhdGlvbi5qb2luVGFibGVPd25lckNvbCA9IHRoaXMuam9pblRhYmxlT3duZXJDb2w7XG4gICAgcmVsYXRpb24uam9pblRhYmxlT3duZXJQcm9wID0gdGhpcy5qb2luVGFibGVPd25lclByb3A7XG4gICAgcmVsYXRpb24uam9pblRhYmxlUmVsYXRlZENvbCA9IHRoaXMuam9pblRhYmxlUmVsYXRlZENvbDtcbiAgICByZWxhdGlvbi5qb2luVGFibGVSZWxhdGVkUHJvcCA9IHRoaXMuam9pblRhYmxlUmVsYXRlZFByb3A7XG4gICAgcmVsYXRpb24uam9pblRhYmxlRXh0cmFzID0gdGhpcy5qb2luVGFibGVFeHRyYXM7XG5cbiAgICBjb3B5SGlkZGVuRGF0YSh0aGlzLCByZWxhdGlvbik7XG5cbiAgICByZXR1cm4gcmVsYXRpb247XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtrbmV4fSBrbmV4XG4gICAqIEByZXR1cm5zIHtSZWxhdGlvbn1cbiAgICovXG4gIGJpbmRLbmV4KGtuZXgpIHtcbiAgICBjb25zdCBib3VuZCA9IHRoaXMuY2xvbmUoKTtcblxuICAgIGJvdW5kLnJlbGF0ZWRNb2RlbENsYXNzID0gdGhpcy5yZWxhdGVkTW9kZWxDbGFzcy5iaW5kS25leChrbmV4KTtcbiAgICBib3VuZC5vd25lck1vZGVsQ2xhc3MgPSB0aGlzLm93bmVyTW9kZWxDbGFzcy5iaW5kS25leChrbmV4KTtcblxuICAgIHJldHVybiBib3VuZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlcn0gYnVpbGRlclxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0XG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz58QXJyYXkuPEFycmF5Ljwoc3RyaW5nfG51bWJlcik+Pn0gb3B0Lm93bmVySWRzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdC5pc0NvbHVtblJlZlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgZmluZFF1ZXJ5KGJ1aWxkZXIsIG9wdCkge1xuICAgIGNvbnN0IGZ1bGxSZWxhdGVkQ29sID0gdGhpcy5mdWxsUmVsYXRlZENvbCgpO1xuXG4gICAgaWYgKG9wdC5pc0NvbHVtblJlZikge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBmdWxsUmVsYXRlZENvbC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgYnVpbGRlci53aGVyZVJlZihmdWxsUmVsYXRlZENvbFtpXSwgb3B0Lm93bmVySWRzW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5zTm9uTnVsbChvcHQub3duZXJJZHMpKSB7XG4gICAgICBidWlsZGVyLndoZXJlSW5Db21wb3NpdGUoZnVsbFJlbGF0ZWRDb2wsIG9wdC5vd25lcklkcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1aWxkZXIucmVzb2x2ZShbXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkZXIubW9kaWZ5KHRoaXMubW9kaWZ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlcn0gYnVpbGRlclxuICAgKiBAcGFyYW0ge29iamVjdD19IG9wdFxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgam9pbihidWlsZGVyLCBvcHQpIHtcbiAgICBvcHQgPSBvcHQgfHwge307XG5cbiAgICBvcHQuam9pbk9wZXJhdGlvbiA9IG9wdC5qb2luT3BlcmF0aW9uIHx8ICdqb2luJztcbiAgICBvcHQucmVsYXRlZFRhYmxlQWxpYXMgPSBvcHQucmVsYXRlZFRhYmxlQWxpYXMgfHwgdGhpcy5yZWxhdGVkVGFibGVBbGlhcygpO1xuICAgIG9wdC5yZWxhdGVkSm9pblNlbGVjdFF1ZXJ5ID0gb3B0LnJlbGF0ZWRKb2luU2VsZWN0UXVlcnkgfHwgdGhpcy5yZWxhdGVkTW9kZWxDbGFzcy5xdWVyeSgpLmNoaWxkUXVlcnlPZihidWlsZGVyKTtcbiAgICBvcHQucmVsYXRlZFRhYmxlID0gb3B0LnJlbGF0ZWRUYWJsZSB8fCB0aGlzLnJlbGF0ZWRNb2RlbENsYXNzLnRhYmxlTmFtZTtcbiAgICBvcHQub3duZXJUYWJsZSA9IG9wdC5vd25lclRhYmxlIHx8IHRoaXMub3duZXJNb2RlbENsYXNzLnRhYmxlTmFtZTtcblxuICAgIGNvbnN0IHJlbGF0ZWRDb2wgPSB0aGlzLnJlbGF0ZWRDb2wubWFwKGNvbCA9PiBgJHtvcHQucmVsYXRlZFRhYmxlQWxpYXN9LiR7Y29sfWApO1xuICAgIGNvbnN0IG93bmVyQ29sID0gdGhpcy5vd25lckNvbC5tYXAoY29sID0+IGAke29wdC5vd25lclRhYmxlfS4ke2NvbH1gKTtcblxuICAgIGxldCByZWxhdGVkU2VsZWN0ID0gb3B0LnJlbGF0ZWRKb2luU2VsZWN0UXVlcnlcbiAgICAgIC5tb2RpZnkodGhpcy5tb2RpZnkpXG4gICAgICAuYXMob3B0LnJlbGF0ZWRUYWJsZUFsaWFzKTtcblxuICAgIGlmIChyZWxhdGVkU2VsZWN0LmlzU2VsZWN0QWxsKCkpIHtcbiAgICAgIC8vIE5vIG5lZWQgdG8gam9pbiBhIHN1YnF1ZXJ5IGlmIHRoZSBxdWVyeSBpcyBgc2VsZWN0ICogZnJvbSBcIlJlbGF0ZWRUYWJsZVwiYC5cbiAgICAgIHJlbGF0ZWRTZWxlY3QgPSBgJHt0aGlzLnJlbGF0ZWRNb2RlbENsYXNzLnRhYmxlTmFtZX0gYXMgJHtvcHQucmVsYXRlZFRhYmxlQWxpYXN9YFxuICAgIH1cblxuICAgIHJldHVybiBidWlsZGVyXG4gICAgICBbb3B0LmpvaW5PcGVyYXRpb25dKHJlbGF0ZWRTZWxlY3QsIGpvaW4gPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHJlbGF0ZWRDb2wubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgam9pbi5vbihyZWxhdGVkQ29sW2ldLCAnPScsIG93bmVyQ29sW2ldKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQGFic3RyYWN0XG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyfSBidWlsZGVyXG4gICAqIEBwYXJhbSB7TW9kZWx9IG93bmVyXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJPcGVyYXRpb259XG4gICAqL1xuICBpbnNlcnQoYnVpbGRlciwgb3duZXIpIHtcbiAgICB0aGlzLnRocm93RXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyfSBidWlsZGVyXG4gICAqIEBwYXJhbSB7TW9kZWx9IG93bmVyXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJPcGVyYXRpb259XG4gICAqL1xuICB1cGRhdGUoYnVpbGRlciwgb3duZXIpIHtcbiAgICByZXR1cm4gbmV3IFJlbGF0aW9uVXBkYXRlT3BlcmF0aW9uKCd1cGRhdGUnLCB7XG4gICAgICByZWxhdGlvbjogdGhpcyxcbiAgICAgIG93bmVyOiBvd25lclxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyfSBidWlsZGVyXG4gICAqIEBwYXJhbSB7TW9kZWx9IG93bmVyXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJPcGVyYXRpb259XG4gICAqL1xuICBwYXRjaChidWlsZGVyLCBvd25lcikge1xuICAgIHJldHVybiBuZXcgUmVsYXRpb25VcGRhdGVPcGVyYXRpb24oJ3BhdGNoJywge1xuICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICBvd25lcjogb3duZXIsXG4gICAgICBtb2RlbE9wdGlvbnM6IHtwYXRjaDogdHJ1ZX1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlcn0gYnVpbGRlclxuICAgKiBAcGFyYW0ge0FycmF5LjxNb2RlbD59IG93bmVyc1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyT3BlcmF0aW9ufVxuICAgKi9cbiAgZmluZChidWlsZGVyLCBvd25lcnMpIHtcbiAgICByZXR1cm4gbmV3IFJlbGF0aW9uRmluZE9wZXJhdGlvbignZmluZCcsIHtcbiAgICAgIHJlbGF0aW9uOiB0aGlzLFxuICAgICAgb3duZXJzOiBvd25lcnNcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlcn0gYnVpbGRlclxuICAgKiBAcGFyYW0ge01vZGVsfSBvd25lclxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyT3BlcmF0aW9ufVxuICAgKi9cbiAgZGVsZXRlKGJ1aWxkZXIsIG93bmVyKSB7XG4gICAgcmV0dXJuIG5ldyBSZWxhdGlvbkRlbGV0ZU9wZXJhdGlvbignZGVsZXRlJywge1xuICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICBvd25lcjogb3duZXJcbiAgICB9KTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHtRdWVyeUJ1aWxkZXJ9IGJ1aWxkZXJcbiAgICogQHBhcmFtIHtNb2RlbH0gb3duZXJcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlck9wZXJhdGlvbn1cbiAgICovXG4gIHJlbGF0ZShidWlsZGVyLCBvd25lcikge1xuICAgIHRoaXMudGhyb3dFcnJvcignbm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQGFic3RyYWN0XG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyfSBidWlsZGVyXG4gICAqIEBwYXJhbSB7TW9kZWx9IG93bmVyXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJPcGVyYXRpb259XG4gICAqL1xuICB1bnJlbGF0ZShidWlsZGVyLCBvd25lcikge1xuICAgIHRoaXMudGhyb3dFcnJvcignbm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICAvKipcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvcGVydHlOYW1lKGNvbHVtbnMsIG1vZGVsQ2xhc3MpIHtcbiAgICByZXR1cm4gY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSBtb2RlbENsYXNzLmNvbHVtbk5hbWVUb1Byb3BlcnR5TmFtZShjb2x1bW4pO1xuXG4gICAgICBpZiAoIXByb3BlcnR5TmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobW9kZWxDbGFzcy5uYW1lICtcbiAgICAgICAgICAnLiRwYXJzZURhdGFiYXNlSnNvbiBwcm9iYWJseSB0cmFuc2Zvcm1zIHRoZSB2YWx1ZSBvZiB0aGUgY29sdW1uICcgKyBjb2x1bW4gKyAnLicgK1xuICAgICAgICAgICcgVGhpcyBpcyBhIG5vLW5vIGJlY2F1c2UgJyArIGNvbHVtbiArXG4gICAgICAgICAgJyBpcyBuZWVkZWQgaW4gdGhlIHJlbGF0aW9uICcgKyB0aGlzLm93bmVyTW9kZWxDbGFzcy50YWJsZU5hbWUgKyAnLicgKyB0aGlzLm5hbWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvcGVydHlOYW1lO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHBhcnNlTW9kaWZ5KG1hcHBpbmcpIHtcbiAgICBsZXQgbW9kaWZ5ID0gbWFwcGluZy5tb2RpZnkgfHwgbWFwcGluZy5maWx0ZXI7XG5cbiAgICBpZiAoXy5pc0Z1bmN0aW9uKG1vZGlmeSkpIHtcbiAgICAgIHJldHVybiBtb2RpZnk7XG4gICAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KG1vZGlmeSkpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAocXVlcnlCdWlsZGVyKSB7XG4gICAgICAgIHF1ZXJ5QnVpbGRlci53aGVyZShtb2RpZnkpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIF8ubm9vcDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcGFyc2VSZWZlcmVuY2UocmVmKSB7XG4gICAgaWYgKCFfLmlzQXJyYXkocmVmKSkge1xuICAgICAgcmVmID0gW3JlZl07XG4gICAgfVxuXG4gICAgbGV0IHRhYmxlID0gbnVsbDtcbiAgICBsZXQgY29sdW1ucyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWYubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IHJlZkl0ZW0gPSByZWZbaV07XG4gICAgICBjb25zdCBuZHggPSByZWZJdGVtLmxhc3RJbmRleE9mKCcuJyk7XG5cbiAgICAgIGxldCB0YWJsZU5hbWUgPSByZWZJdGVtLnN1YnN0cigwLCBuZHgpLnRyaW0oKTtcbiAgICAgIGxldCBjb2x1bW5OYW1lID0gcmVmSXRlbS5zdWJzdHIobmR4ICsgMSwgcmVmSXRlbS5sZW5ndGgpLnRyaW0oKTtcblxuICAgICAgaWYgKCF0YWJsZU5hbWUgfHwgKHRhYmxlICYmIHRhYmxlICE9PSB0YWJsZU5hbWUpIHx8ICFjb2x1bW5OYW1lKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGFibGU6IG51bGwsXG4gICAgICAgICAgY29sdW1uczogW11cbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhYmxlID0gdGFibGVOYW1lO1xuICAgICAgfVxuXG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uTmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRhYmxlOiB0YWJsZSxcbiAgICAgIGNvbHVtbnM6IGNvbHVtbnNcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIG1lcmdlTW9kZWxzKG1vZGVsczEsIG1vZGVsczIpIHtcbiAgICBsZXQgbW9kZWxDbGFzcztcblxuICAgIG1vZGVsczEgPSBfLmNvbXBhY3QobW9kZWxzMSk7XG4gICAgbW9kZWxzMiA9IF8uY29tcGFjdChtb2RlbHMyKTtcblxuICAgIGlmIChfLmlzRW1wdHkobW9kZWxzMSkgJiYgXy5pc0VtcHR5KG1vZGVsczIpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKCFfLmlzRW1wdHkobW9kZWxzMSkpIHtcbiAgICAgIG1vZGVsQ2xhc3MgPSBtb2RlbHMxWzBdLmNvbnN0cnVjdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb2RlbENsYXNzID0gbW9kZWxzMlswXS5jb25zdHJ1Y3RvcjtcbiAgICB9XG5cbiAgICBsZXQgaWRQcm9wZXJ0eSA9IG1vZGVsQ2xhc3MuZ2V0SWRQcm9wZXJ0eUFycmF5KCk7XG4gICAgbGV0IG1vZGVsc0J5SWQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBtb2RlbHMxLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3QgbW9kZWwgPSBtb2RlbHMxW2ldO1xuICAgICAgY29uc3Qga2V5ID0gbW9kZWwuJHByb3BLZXkoaWRQcm9wZXJ0eSk7XG5cbiAgICAgIG1vZGVsc0J5SWRba2V5XSA9IG1vZGVsO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gbW9kZWxzMi5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IG1vZGVsID0gbW9kZWxzMltpXTtcbiAgICAgIGNvbnN0IGtleSA9IG1vZGVsLiRwcm9wS2V5KGlkUHJvcGVydHkpO1xuXG4gICAgICBtb2RlbHNCeUlkW2tleV0gPSBtb2RlbDtcbiAgICB9XG5cbiAgICByZXR1cm4gXy5zb3J0QnkoXy52YWx1ZXMobW9kZWxzQnlJZCksIGlkUHJvcGVydHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHJlc29sdmVNb2RlbChNb2RlbCwgbW9kZWxDbGFzcywgbG9nUHJlZml4KSB7XG4gICAgY29uc3QgcmVxdWlyZU1vZGVsID0gKHBhdGgpID0+IHtcbiAgICAgIGxldCBNb2RlbENsYXNzO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBiYWJlbCA2IHN0eWxlIG9mIGV4cG9zaW5nIGVzNiBleHBvcnRzIHRvIGNvbW1vbmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9pc3N1ZXMvMjY4M1xuICAgICAgICBsZXQgbW9kdWxlID0gcmVxdWlyZShwYXRoKTtcblxuICAgICAgICBNb2RlbENsYXNzID0gaXNTdWJjbGFzc09mKG1vZHVsZS5kZWZhdWx0LCBNb2RlbClcbiAgICAgICAgICA/IG1vZHVsZS5kZWZhdWx0XG4gICAgICAgICAgOiBtb2R1bGU7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNTdWJjbGFzc09mKE1vZGVsQ2xhc3MsIE1vZGVsKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIE1vZGVsQ2xhc3M7XG4gICAgfTtcblxuICAgIGlmIChfLmlzU3RyaW5nKG1vZGVsQ2xhc3MpKSB7XG4gICAgICBsZXQgTW9kZWxDbGFzcyA9IG51bGw7XG5cbiAgICAgIGlmIChpc0Fic29sdXRlUGF0aChtb2RlbENsYXNzKSkge1xuICAgICAgICBNb2RlbENsYXNzID0gcmVxdWlyZU1vZGVsKG1vZGVsQ2xhc3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgdGhlIHBhdGggaXMgbm90IGEgYWJzb2x1dGUsIHRyeSB0aGUgbW9kZWxQYXRocyBvZiB0aGUgb3duZXIgbW9kZWwgY2xhc3MuXG4gICAgICAgIF8uZWFjaCh0aGlzLm93bmVyTW9kZWxDbGFzcy5tb2RlbFBhdGhzLCBtb2RlbFBhdGggPT4ge1xuICAgICAgICAgIE1vZGVsQ2xhc3MgPSByZXF1aXJlTW9kZWwocGF0aC5qb2luKG1vZGVsUGF0aCwgbW9kZWxDbGFzcykpO1xuXG4gICAgICAgICAgaWYgKGlzU3ViY2xhc3NPZihNb2RlbENsYXNzLCBNb2RlbCkpIHtcbiAgICAgICAgICAgIC8vIEJyZWFrIHRoZSBsb29wLlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNTdWJjbGFzc09mKE1vZGVsQ2xhc3MsIE1vZGVsKSkge1xuICAgICAgICB0aGlzLnRocm93RXJyb3IoYCR7bG9nUHJlZml4fTogJHttb2RlbENsYXNzfSBpcyBhbiBpbnZhbGlkIGZpbGUgcGF0aCB0byBhIG1vZGVsIGNsYXNzYCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBNb2RlbENsYXNzO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWlzU3ViY2xhc3NPZihtb2RlbENsYXNzLCBNb2RlbCkpIHtcbiAgICAgICAgdGhpcy50aHJvd0Vycm9yKGAke2xvZ1ByZWZpeH0gaXMgbm90IGEgc3ViY2xhc3Mgb2YgTW9kZWwgb3IgYSBmaWxlIHBhdGggdG8gYSBtb2R1bGUgdGhhdCBleHBvcnRzIG9uZS5gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1vZGVsQ2xhc3M7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHRocm93RXJyb3IobWVzc2FnZSkge1xuICAgIGlmICh0aGlzLm93bmVyTW9kZWxDbGFzcyAmJiB0aGlzLm93bmVyTW9kZWxDbGFzcy5uYW1lICYmIHRoaXMubmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RoaXMub3duZXJNb2RlbENsYXNzLm5hbWV9LnJlbGF0aW9uTWFwcGluZ3MuJHt0aGlzLm5hbWV9OiAke21lc3NhZ2V9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9OiAke21lc3NhZ2V9YCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzQWJzb2x1dGVQYXRoKHB0aCkge1xuICByZXR1cm4gcGF0aC5ub3JtYWxpemUocHRoICsgJy8nKSA9PT0gcGF0aC5ub3JtYWxpemUocGF0aC5yZXNvbHZlKHB0aCkgKyAnLycpO1xufVxuXG5mdW5jdGlvbiBjb250YWluc05vbk51bGwoYXJyKSB7XG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IHZhbCA9IGFycltpXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkgJiYgY29udGFpbnNOb25OdWxsKHZhbCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAodmFsICE9PSBudWxsICYmIHZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59Il19