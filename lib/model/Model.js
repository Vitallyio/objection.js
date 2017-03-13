'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _class, _class2, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _AjvValidator = require('./AjvValidator');

var _AjvValidator2 = _interopRequireDefault(_AjvValidator);

var _QueryBuilder = require('../queryBuilder/QueryBuilder');

var _QueryBuilder2 = _interopRequireDefault(_QueryBuilder);

var _inheritModel = require('./inheritModel');

var _inheritModel2 = _interopRequireDefault(_inheritModel);

var _RelationExpression = require('../queryBuilder/RelationExpression');

var _RelationExpression2 = _interopRequireDefault(_RelationExpression);

var _modelVisitor = require('./modelVisitor');

var _classUtils = require('../utils/classUtils');

var _hiddenData = require('../utils/hiddenData');

var _hiddenData2 = require('../utils/decorators/hiddenData');

var _hiddenData3 = _interopRequireDefault(_hiddenData2);

var _memoize = require('../utils/decorators/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

var _Relation = require('../relations/Relation');

var _Relation2 = _interopRequireDefault(_Relation);

var _HasOneRelation = require('../relations/hasOne/HasOneRelation');

var _HasOneRelation2 = _interopRequireDefault(_HasOneRelation);

var _HasManyRelation = require('../relations/hasMany/HasManyRelation');

var _HasManyRelation2 = _interopRequireDefault(_HasManyRelation);

var _ManyToManyRelation = require('../relations/manyToMany/ManyToManyRelation');

var _ManyToManyRelation2 = _interopRequireDefault(_ManyToManyRelation);

var _BelongsToOneRelation = require('../relations/belongsToOne/BelongsToOneRelation');

var _BelongsToOneRelation2 = _interopRequireDefault(_BelongsToOneRelation);

var _HasOneThroughRelation = require('../relations/hasOneThrough/HasOneThroughRelation');

var _HasOneThroughRelation2 = _interopRequireDefault(_HasOneThroughRelation);

var _InstanceFindOperation = require('../queryBuilder/operations/InstanceFindOperation');

var _InstanceFindOperation2 = _interopRequireDefault(_InstanceFindOperation);

var _InstanceInsertOperation = require('../queryBuilder/operations/InstanceInsertOperation');

var _InstanceInsertOperation2 = _interopRequireDefault(_InstanceInsertOperation);

var _InstanceUpdateOperation = require('../queryBuilder/operations/InstanceUpdateOperation');

var _InstanceUpdateOperation2 = _interopRequireDefault(_InstanceUpdateOperation);

var _InstanceDeleteOperation = require('../queryBuilder/operations/InstanceDeleteOperation');

var _InstanceDeleteOperation2 = _interopRequireDefault(_InstanceDeleteOperation);

var _JoinEagerOperation = require('../queryBuilder/operations/JoinEagerOperation');

var _JoinEagerOperation2 = _interopRequireDefault(_JoinEagerOperation);

var _WhereInEagerOperation = require('../queryBuilder/operations/WhereInEagerOperation');

var _WhereInEagerOperation2 = _interopRequireDefault(_WhereInEagerOperation);

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

var JoinEagerAlgorithm = function JoinEagerAlgorithm() {
  return new _JoinEagerOperation2.default('eager');
};

var WhereInEagerAlgorithm = function WhereInEagerAlgorithm() {
  return new _WhereInEagerOperation2.default('eager');
};

/**
 * @typedef {Object} ModelOptions
 *
 * @property {boolean} [patch]
 * @property {boolean} [skipValidation]
 * @property {Model} [old]
 */

var Model = (_dec = (0, _hiddenData3.default)({ name: 'omitFromJson', append: true }), _dec2 = (0, _hiddenData3.default)({ name: 'omitFromDatabaseJson', append: true }), _dec3 = (0, _hiddenData3.default)(), _dec4 = (0, _hiddenData3.default)(), _dec5 = (0, _hiddenData3.default)(), _dec6 = (0, _hiddenData3.default)(), (_class = (_temp = _class2 = function () {
  function Model() {
    (0, _classCallCheck3.default)(this, Model);
  }

  /**
   * @param {*=} id
   * @returns {*}
   */


  /**
   * @type {object}
   */


  /**
   * @type {boolean}
   */


  /**
   * @type {Object.<string, RelationMapping>}
   */


  /**
   * @type {Array.<string>}
   */


  /**
   * @type {string}
   */


  /**
   * @type {string}
   */


  /**
   * @type {Object}
   */
  Model.prototype.$id = function $id(id) {
    if (arguments.length > 0) {
      return setId(this, arguments[0]);
    } else {
      return getId(this);
    }
  };

  /**
   * @returns {knex}
   */


  /**
   * @private
   */


  /**
   * @type {Constructor.<? extends EagerOperation>}
   */


  /**
   * @type {Array.<string>}
   */


  /**
   * @type {Array.<string>}
   */


  /**
   * @type {RegExp}
   */


  /**
   * @type {string}
   */


  /**
   * @type {string|Array.<string>}
   */


  /**
   * @type {string}
   */


  Model.prototype.$knex = function $knex() {
    return this.constructor.knex();
  };

  /**
   * @returns {knex}
   */


  Model.prototype.$transaction = function $transaction() {
    return this.constructor.transaction();
  };

  /**
   * @param {Transaction=} trx
   * @returns {QueryBuilder}
   */


  Model.prototype.$query = function $query(trx) {
    var _this = this;

    var ModelClass = this.constructor;

    return ModelClass.QueryBuilder.forClass(ModelClass).transacting(trx).findOperationFactory(function () {
      return new _InstanceFindOperation2.default('find', { instance: _this });
    }).insertOperationFactory(function () {
      return new _InstanceInsertOperation2.default('insert', { instance: _this });
    }).updateOperationFactory(function () {
      return new _InstanceUpdateOperation2.default('update', { instance: _this });
    }).patchOperationFactory(function () {
      return new _InstanceUpdateOperation2.default('patch', { instance: _this, modelOptions: { patch: true } });
    }).deleteOperationFactory(function () {
      return new _InstanceDeleteOperation2.default('delete', { instance: _this });
    }).relateOperationFactory(function () {
      throw new Error('`relate` makes no sense in this context');
    }).unrelateOperationFactory(function () {
      throw new Error('`unrelate` makes no sense in this context');
    });
  };

  /**
   * @param {string} relationName
   * @param {Transaction=} trx
   * @returns {QueryBuilder}
   */


  Model.prototype.$relatedQuery = function $relatedQuery(relationName, trx) {
    var _this2 = this;

    var ModelClass = this.constructor;
    var relation = ModelClass.getRelation(relationName);
    var RelatedModelClass = relation.relatedModelClass;

    return ModelClass.RelatedQueryBuilder.forClass(RelatedModelClass).transacting(trx).findOperationFactory(function (builder) {
      return relation.find(builder, [_this2]);
    }).insertOperationFactory(function (builder) {
      return relation.insert(builder, _this2);
    }).updateOperationFactory(function (builder) {
      return relation.update(builder, _this2);
    }).patchOperationFactory(function (builder) {
      return relation.patch(builder, _this2);
    }).deleteOperationFactory(function (builder) {
      return relation.delete(builder, _this2);
    }).relateOperationFactory(function (builder) {
      return relation.relate(builder, _this2);
    }).unrelateOperationFactory(function (builder) {
      return relation.unrelate(builder, _this2);
    });
  };

  /**
   * @param {string|RelationExpression} relationExpression
   * @param {Object.<string, function(QueryBuilder)>=} filters
   * @returns {QueryBuilder}
   */


  Model.prototype.$loadRelated = function $loadRelated(relationExpression, filters) {
    return this.constructor.loadRelated(this, relationExpression, filters);
  };

  /**
   * @param {Constructor.<Model>=} filterConstructor
   * @param {function(Model)} callback
   * @return {Model}
   */


  Model.prototype.$traverse = function $traverse(filterConstructor, callback) {
    if (_lodash2.default.isUndefined(callback)) {
      callback = filterConstructor;
      filterConstructor = null;
    }

    this.constructor.traverse(filterConstructor, this, callback);
    return this;
  };

  /**
   * @param {Object} jsonSchema
   * @param {Object} json
   * @param {ModelOptions=} options
   * @return {Object}
   */


  Model.prototype.$beforeValidate = function $beforeValidate(jsonSchema, json, options) {
    /* istanbul ignore next */
    return jsonSchema;
  };

  /**
   * @param {Object=} json
   * @param {ModelOptions=} options
   * @throws {ValidationError}
   * @return {Object}
   */


  Model.prototype.$validate = function $validate() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (json instanceof Model) {
      // Strip away relations and other internal stuff.
      json = cloneModel(json, true, true);
    }

    if (options.skipValidation) {
      return json;
    }

    var validator = this.constructor.getValidator();
    var args = {
      options: options,
      model: this,
      json: json,
      ctx: (0, _create2.default)(null)
    };

    validator.beforeValidate(args);
    json = validator.validate(args);
    validator.afterValidate(args);

    return json;
  };

  /**
   * @param {Object=} json
   * @param {ModelOptions=} options
   */


  Model.prototype.$afterValidate = function $afterValidate(json, options) {}
  // Do nothing by default.


  /**
   * @param {Object} json
   * @return {Object}
   */
  ;

  Model.prototype.$parseDatabaseJson = function $parseDatabaseJson(json) {
    var jsonAttr = this.constructor.getJsonAttributes();

    if (jsonAttr.length) {
      for (var i = 0, l = jsonAttr.length; i < l; ++i) {
        var attr = jsonAttr[i];
        var value = json[attr];

        if (_lodash2.default.isString(value)) {
          var parsed = tryParseJson(value);

          // tryParseJson returns undefined if parsing failed.
          if (parsed !== undefined) {
            json[attr] = parsed;
          }
        }
      }
    }

    return json;
  };

  /**
   * @param {Object} json
   * @return {Object}
   */


  Model.prototype.$formatDatabaseJson = function $formatDatabaseJson(json) {
    var jsonAttr = this.constructor.getJsonAttributes();

    if (jsonAttr.length) {
      for (var i = 0, l = jsonAttr.length; i < l; ++i) {
        var attr = jsonAttr[i];
        var value = json[attr];

        if (_lodash2.default.isObject(value)) {
          json[attr] = (0, _stringify2.default)(value);
        }
      }
    }

    return json;
  };

  /**
   * @param {Object} json
   * @param {ModelOptions=} options
   * @return {Object}
   */


  Model.prototype.$parseJson = function $parseJson(json, options) {
    return json;
  };

  /**
   * @param {Object} json
   * @return {Object}
   */


  Model.prototype.$formatJson = function $formatJson(json) {
    return json;
  };

  /**
   * @param {Object} json
   * @param {ModelOptions=} options
   * @returns {Model}
   * @throws ValidationError
   */


  Model.prototype.$setJson = function $setJson(json) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    json = json || {};

    if (!_lodash2.default.isObject(json) || _lodash2.default.isString(json) || _lodash2.default.isNumber(json) || _lodash2.default.isDate(json) || _lodash2.default.isArray(json) || _lodash2.default.isFunction(json) || _lodash2.default.isTypedArray(json) || _lodash2.default.isRegExp(json)) {

      throw new Error('You should only pass objects to $setJson method. ' + '$setJson method was given an invalid value ' + json);
    }

    json = this.$parseJson(json, options);
    json = this.$validate(json, options);

    // TODO Move to bottom.
    this.$set(json);

    var relations = this.constructor.getRelationArray();
    // Parse relations into Model instances.
    for (var i = 0, l = relations.length; i < l; ++i) {
      var relation = relations[i];
      var relationName = relation.name;

      if (_lodash2.default.has(json, relationName)) {
        var relationJson = json[relationName];

        if (Array.isArray(relationJson)) {
          this[relationName] = relation.relatedModelClass.ensureModelArray(relationJson, options);
        } else if (relationJson) {
          this[relationName] = relation.relatedModelClass.ensureModel(relationJson, options);
        } else {
          this[relationName] = null;
        }
      }
    }
  };

  /**
   * @param {Object} json
   * @returns {Model}
   */


  Model.prototype.$setDatabaseJson = function $setDatabaseJson(json) {
    json = this.$parseDatabaseJson(json);

    if (json) {
      var keys = (0, _keys2.default)(json);

      for (var i = 0, l = keys.length; i < l; ++i) {
        var key = keys[i];
        this[key] = json[key];
      }
    }

    return this;
  };

  /**
   * @param {Object} obj
   * @returns {Model}
   */


  Model.prototype.$set = function $set(obj) {
    if (obj) {
      var keys = (0, _keys2.default)(obj);

      for (var i = 0, l = keys.length; i < l; ++i) {
        var key = keys[i];
        var value = obj[key];

        if (key.charAt(0) !== '$' && typeof value !== 'function') {
          this[key] = value;
        }
      }
    }

    return this;
  };

  /**
   * @param {boolean=} shallow
   */


  Model.prototype.$toJson = function $toJson(shallow) {
    if (shallow) {
      return this.$$toJson(false, this.constructor.getRelations(), null);
    } else {
      return this.$$toJson(false, null, null);
    }
  };

  Model.prototype.toJSON = function toJSON() {
    return this.$toJson();
  };

  /**
   * @override
   */


  Model.prototype.$toDatabaseJson = function $toDatabaseJson() {
    var jsonSchema = this.constructor.getJsonSchema();

    if (jsonSchema && this.constructor.pickJsonSchemaProperties) {
      return this.$$toJson(true, null, jsonSchema.properties);
    } else {
      return this.$$toJson(true, this.constructor.getRelations(), null);
    }
  };

  /**
   * @param {Object} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$beforeInsert = function $beforeInsert(queryContext) {};

  /**
   * @param {Object} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$afterInsert = function $afterInsert(queryContext) {};

  /**
   * @param {ModelOptions} opt
   * @param {QueryBuilderContext} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$beforeUpdate = function $beforeUpdate(opt, queryContext) {};

  /**
   * @param {ModelOptions} opt
   * @param {QueryBuilderContext} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$afterUpdate = function $afterUpdate(opt, queryContext) {};

  /**
   * @param {QueryBuilderContext} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$afterGet = function $afterGet(queryContext) {};

  /**
   * @param {QueryBuilderContext} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$beforeDelete = function $beforeDelete(queryContext) {};

  /**
   * @param {QueryBuilderContext} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$afterDelete = function $afterDelete(queryContext) {};

  /**
   * @param {string|Array.<string>|Object.<string, boolean>} keys
   * @returns {Model}
   */


  Model.prototype.$omit = function $omit() {
    if (arguments.length === 1 && _lodash2.default.isObject(arguments[0])) {
      var keys = arguments[0];

      if (Array.isArray(keys)) {
        omitArray(this, keys);
      } else {
        omitObject(this, keys);
      }
    } else {
      omitArray(this, _lodash2.default.toArray(arguments));
    }

    return this;
  };

  /**
   * @param {string|Array.<string>|Object.<string, boolean>} keys
   * @returns {Model} `this` for chaining.
   */


  Model.prototype.$pick = function $pick() {
    if (arguments.length === 1 && _lodash2.default.isObject(arguments[0])) {
      var keys = arguments[0];

      if (Array.isArray(keys)) {
        pickArray(this, keys);
      } else {
        pickObject(this, keys);
      }
    } else {
      pickArray(this, _lodash2.default.toArray(arguments));
    }

    return this;
  };

  /**
   * @param {Array.<string>} props
   * @return {Array.<*>}
   */


  Model.prototype.$values = function $values() {
    if (arguments.length === 0) {
      return _lodash2.default.values(this);
    } else {
      var args = arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0] : arguments;

      switch (args.length) {
        case 1:
          return [this[args[0]]];
        case 2:
          return [this[args[0]], this[args[1]]];
        case 3:
          return [this[args[0]], this[args[1]], this[args[2]]];
        default:
          {
            var ret = new Array(args.length);

            for (var i = 0, l = args.length; i < l; ++i) {
              ret[i] = this[args[i]];
            }

            return ret;
          }
      }
    }
  };

  /**
   * @param {Array.<string>} props
   * @return {string}
   */


  Model.prototype.$propKey = function $propKey(props) {
    switch (props.length) {
      case 1:
        return this[props[0]] + '';
      case 2:
        return this[props[0]] + ',' + this[props[1]];
      case 3:
        return this[props[0]] + ',' + this[props[1]] + ',' + this[props[2]];
      default:
        {
          var key = '';

          for (var i = 0, l = props.length; i < l; ++i) {
            key += this[props[i]] + (i < props.length - 1 ? ',' : '');
          }

          return key;
        }
    }
  };

  /**
   * @param {boolean} shallow
   * @return {Model}
   */


  Model.prototype.$clone = function $clone(shallow) {
    return cloneModel(this, shallow, false);
  };

  /**
   * @param {Array.<string>=} keys
   * @returns {Array.<string>}
   */


  Model.prototype.$omitFromJson = function $omitFromJson(keys) {};

  /**
   * @param {Array.<string>=} keys
   * @returns {Array.<string>}
   */


  Model.prototype.$omitFromDatabaseJson = function $omitFromDatabaseJson(keys) {};

  /**
   * @protected
   */


  Model.prototype.$$toJson = function $$toJson(createDbJson, omit, pick) {
    var json = toJsonImpl(this, createDbJson, omit, pick);

    if (createDbJson) {
      return this.$formatDatabaseJson(json);
    } else {
      return this.$formatJson(json);
    }
  };

  /**
   * @param {function=} subclassConstructor
   * @return {Constructor.<Model>}
   */


  Model.extend = function extend(subclassConstructor) {
    if (_lodash2.default.isEmpty(subclassConstructor.name)) {
      throw new Error('Each Model subclass constructor must have a name');
    }

    (0, _classUtils.inherits)(subclassConstructor, this);
    return subclassConstructor;
  };

  /**
   * @param {Object=} json
   * @param {ModelOptions=} options
   * @returns {Model}
   * @throws ValidationError
   */


  Model.fromJson = function fromJson(json, options) {
    var model = new this();
    model.$setJson(json || {}, options);
    return model;
  };

  /**
   * @param {Object=} json
   * @returns {Model}
   */


  Model.fromDatabaseJson = function fromDatabaseJson(json) {
    var model = new this();
    model.$setDatabaseJson(json || {});
    return model;
  };

  /**
   * @param {Object} obj
   * @param {string} prop
   */


  Model.omitImpl = function omitImpl(obj, prop) {
    delete obj[prop];
  };

  /**
   * @return {Validator}
   */


  Model.createValidator = function createValidator() {
    return new _AjvValidator2.default({
      onCreateAjv: function onCreateAjv(ajv) {/* Do Nothing by default */},
      options: {
        allErrors: true,
        validateSchema: false,
        ownProperties: true,
        v5: true
      }
    });
  };

  /**
   * @return {Validator}
   */


  Model.getValidator = function getValidator() {
    return this.createValidator();
  };

  /**
   * @return {Object}
   */


  Model.getJsonSchema = function getJsonSchema() {
    // Memoized getter in case jsonSchema is a getter property (usually is with ES6).
    return this.jsonSchema;
  };

  /**
   * @param {string} columnName
   * @returns {string}
   */


  Model.columnNameToPropertyName = function columnNameToPropertyName(columnName) {
    var model = new this();
    var addedProps = _lodash2.default.keys(model.$parseDatabaseJson({}));

    var row = {};
    row[columnName] = null;

    var props = _lodash2.default.keys(model.$parseDatabaseJson(row));
    var propertyName = _lodash2.default.first(_lodash2.default.difference(props, addedProps));

    return propertyName || null;
  };

  /**
   * @param {string} propertyName
   * @returns {string}
   */


  Model.propertyNameToColumnName = function propertyNameToColumnName(propertyName) {
    var model = new this();
    var addedCols = _lodash2.default.keys(model.$formatDatabaseJson({}));

    var obj = {};
    obj[propertyName] = null;

    var cols = _lodash2.default.keys(model.$formatDatabaseJson(obj));
    var columnName = _lodash2.default.first(_lodash2.default.difference(cols, addedCols));

    return columnName || null;
  };

  /**
   * @param {Transaction=} trx
   * @returns {QueryBuilder}
   */


  Model.query = function query(trx) {
    var ModelClass = this;

    return ModelClass.QueryBuilder.forClass(ModelClass).transacting(trx).relateOperationFactory(function () {
      throw new Error('`relate` makes no sense in this context');
    }).unrelateOperationFactory(function () {
      throw new Error('`unrelate` makes no sense in this context');
    });
  };

  /**
   * @param {knex=} knex
   * @returns {knex}
   */


  Model.knex = function knex(_knex) {
    if (arguments.length) {
      this.$$knex = _knex;
    } else {
      return this.$$knex;
    }
  };

  /**
   * @returns {knex}
   */


  Model.transaction = function transaction() {
    return this.knex();
  };

  /**
   * @return {Raw}
   */


  Model.raw = function raw() {
    var knex = this.knex();
    return knex.raw.apply(knex, arguments);
  };

  /**
   * @return {Object}
   */


  Model.fn = function fn() {
    var knex = this.knex();
    return knex.fn;
  };

  /**
   * @return {Formatter}
   */


  Model.formatter = function formatter() {
    return this.knex().client.formatter();
  };

  /**
   * @returns {knex.QueryBuilder}
   */


  Model.knexQuery = function knexQuery() {
    return this.knex().table(this.tableName);
  };

  /**
   * @returns {string}
   */


  Model.uniqueTag = function uniqueTag() {
    return this.tableName;
  };

  /**
   * @param {knex} knex
   * @returns {Constructor.<Model>}
   */


  Model.bindKnex = function bindKnex(knex) {
    var ModelClass = this;

    if (!knex.$$objection) {
      Object.defineProperty(knex, '$$objection', {
        enumerable: false,
        writable: false,
        value: {
          boundModels: (0, _create2.default)(null)
        }
      });
    }

    // Check if this model class has already been bound to the given knex.
    if (knex.$$objection.boundModels[ModelClass.uniqueTag()]) {
      return knex.$$objection.boundModels[ModelClass.uniqueTag()];
    }

    // Create a new subclass of this class.
    var BoundModelClass = (0, _inheritModel2.default)(ModelClass);

    // The bound model is equal to the source model in every way. We want to copy
    // the hidden data as-is from the source so that we don't get the performance
    // penalty of calculating all memoized etc. values again.
    (0, _hiddenData.inheritHiddenData)(ModelClass, BoundModelClass);

    BoundModelClass.knex(knex);
    knex.$$objection.boundModels[ModelClass.uniqueTag()] = BoundModelClass;

    var boundRelations = (0, _create2.default)(null);
    var relations = ModelClass.getRelationArray();

    for (var i = 0, l = relations.length; i < l; ++i) {
      var relation = relations[i];
      boundRelations[relation.name] = relation.bindKnex(knex);
    }

    BoundModelClass.relations = boundRelations;
    BoundModelClass.relationArray = _lodash2.default.values(boundRelations);

    return BoundModelClass;
  };

  /**
   * @param {knex} trx
   * @returns {Constructor.<Model>}
   */


  Model.bindTransaction = function bindTransaction(trx) {
    return this.bindKnex(trx);
  };

  /**
   * @param {Model|Object} model
   * @param {ModelOptions=} options
   * @returns {Model}
   */


  Model.ensureModel = function ensureModel(model, options) {
    var ModelClass = this;

    if (!model) {
      return null;
    }

    if (model instanceof ModelClass) {
      return model;
    } else {
      return ModelClass.fromJson(model, options);
    }
  };

  /**
   * @param {Array.<Model|Object>} input
   * @param {ModelOptions=} options
   * @returns {Array.<Model>}
   */


  Model.ensureModelArray = function ensureModelArray(input, options) {
    if (!input) {
      return [];
    }

    if (Array.isArray(input)) {
      var models = new Array(input.length);

      for (var i = 0, l = input.length; i < l; ++i) {
        models[i] = this.ensureModel(input[i], options);
      }

      return models;
    } else {
      return [this.ensureModel(input, options)];
    }
  };

  /**
   * @returns {Array.<string>}
   */


  Model.getIdColumnArray = function getIdColumnArray() {
    if (Array.isArray(this.idColumn)) {
      return this.idColumn;
    } else {
      return [this.idColumn];
    }
  };

  /**
   * @returns {string|Array.<string>}
   */


  Model.getFullIdColumn = function getFullIdColumn() {
    var _this3 = this;

    if (Array.isArray(this.idColumn)) {
      return this.idColumn.map(function (col) {
        return _this3.tableName + '.' + col;
      });
    } else {
      return this.tableName + '.' + this.idColumn;
    }
  };

  /**
   * @returns {Array.<string>}
   */


  Model.getIdPropertyArray = function getIdPropertyArray() {
    var _this4 = this;

    return this.getIdColumnArray().map(function (col) {
      return idColumnToIdProperty(_this4, col);
    });
  };

  /**
   * @returns {string|Array.<string>}
   */


  Model.getIdProperty = function getIdProperty() {
    var _this5 = this;

    if (Array.isArray(this.idColumn)) {
      return this.idColumn.map(function (col) {
        return idColumnToIdProperty(_this5, col);
      });
    } else {
      return idColumnToIdProperty(this, this.idColumn);
    }
  };

  /**
   * @private
   */


  /**
   * @return {Object.<string, Relation>}
   */
  Model.getRelations = function getRelations() {
    var _this6 = this;

    var relations = this.relations;

    if (!relations) {
      relations = _lodash2.default.reduce(_lodash2.default.result(this, 'relationMappings'), function (relations, mapping, relationName) {
        relations[relationName] = new mapping.relation(relationName, _this6);
        relations[relationName].setMapping(mapping);
        return relations;
      }, (0, _create2.default)(null));

      this.relations = relations;
    }

    return relations;
  };

  /**
   * @return {Array.<Relation>}
   */


  Model.getRelationArray = function getRelationArray() {
    var relationArray = this.relationArray;

    if (!relationArray) {
      relationArray = _lodash2.default.values(this.getRelations());
      this.relationArray = relationArray;
    }

    return relationArray;
  };

  /**
   * @return {Relation}
   */


  Model.getRelation = function getRelation(name) {
    var relation = this.getRelations()[name];

    if (!relation) {
      throw new Error('A model class (tableName = ' + this.tableName + ') doesn\'t have relation ' + name);
    }

    return relation;
  };

  /**
   * @param {Array.<Model|Object>} $models
   * @param {string|RelationExpression} expression
   * @param {Object.<string, function(QueryBuilder)>=} filters
   * @returns {QueryBuilder}
   */


  Model.loadRelated = function loadRelated($models, expression, filters) {
    return this.query().resolve(this.ensureModelArray($models)).findOptions({ dontCallAfterGet: true }).eager(expression, filters).runAfter(function (models) {
      return Array.isArray($models) ? models : models[0];
    });
  };

  /**
   * @param {Constructor.<Model>=} filterConstructor
   * @param {Model|Array.<Model>} models
   * @param {function(Model, Model, string)} traverser
   * @return {Model}
   */


  Model.traverse = function traverse(filterConstructor, models, traverser) {
    filterConstructor = filterConstructor || null;

    if (_lodash2.default.isUndefined(traverser)) {
      traverser = models;
      models = filterConstructor;
      filterConstructor = null;
    }

    if (!_lodash2.default.isFunction(traverser)) {
      throw new Error('traverser must be a function');
    }

    if (_lodash2.default.isEmpty(models)) {
      return this;
    }

    var modelClass = Array.isArray(models) ? models[0].constructor : models.constructor;

    (0, _modelVisitor.visitModels)(models, modelClass, function (model, modelClass, parent, relation) {
      if (!filterConstructor || model instanceof filterConstructor) {
        traverser(model, parent, relation && relation.name);
      }
    });

    return this;
  };

  /**
   * @protected
   * @returns {Array.<string>}
   */


  Model.getJsonAttributes = function getJsonAttributes() {
    var _this7 = this;

    // If the jsonAttributes property is not set, try to create it based
    // on the jsonSchema. All properties that are objects or arrays must
    // be converted to JSON.
    if (!this.jsonAttributes && this.getJsonSchema()) {
      this.jsonAttributes = [];

      _lodash2.default.forOwn(this.getJsonSchema().properties, function (prop, propName) {
        var types = _lodash2.default.compact(ensureArray(prop.type));

        if (types.length === 0 && Array.isArray(prop.anyOf)) {
          types = _lodash2.default.flattenDeep(_lodash2.default.map(prop.anyOf, 'type'));
        }

        if (types.length === 0 && Array.isArray(prop.oneOf)) {
          types = _lodash2.default.flattenDeep(_lodash2.default.map(prop.oneOf, 'type'));
        }

        if (_lodash2.default.includes(types, 'object') || _lodash2.default.includes(types, 'array')) {
          _this7.jsonAttributes.push(propName);
        }
      });
    }

    if (!Array.isArray(this.jsonAttributes)) {
      this.jsonAttributes = [];
    }

    return this.jsonAttributes;
  };

  (0, _createClass3.default)(Model, null, [{
    key: 'relations',
    get: function get() {}

    /**
     * @private
     */
    ,
    set: function set(value) {}

    /**
     * @private
     */

  }, {
    key: 'relationArray',
    get: function get() {}

    /**
     * @private
     */
    ,
    set: function set(value) {}
  }]);
  return Model;
}(), _class2.QueryBuilder = _QueryBuilder2.default, _class2.RelatedQueryBuilder = _QueryBuilder2.default, _class2.HasOneRelation = _HasOneRelation2.default, _class2.HasManyRelation = _HasManyRelation2.default, _class2.ManyToManyRelation = _ManyToManyRelation2.default, _class2.BelongsToOneRelation = _BelongsToOneRelation2.default, _class2.HasOneThroughRelation = _HasOneThroughRelation2.default, _class2.JoinEagerAlgorithm = JoinEagerAlgorithm, _class2.WhereInEagerAlgorithm = WhereInEagerAlgorithm, _class2.tableName = null, _class2.jsonSchema = null, _class2.idColumn = 'id', _class2.uidProp = '#id', _class2.uidRefProp = '#ref', _class2.dbRefProp = '#dbRef', _class2.propRefRegex = /#ref{([^\.]+)\.([^}]+)}/g, _class2.jsonAttributes = null, _class2.virtualAttributes = null, _class2.relationMappings = null, _class2.modelPaths = [], _class2.pickJsonSchemaProperties = true, _class2.defaultEagerAlgorithm = WhereInEagerAlgorithm, _class2.defaultEagerOptions = null, _class2.$$knex = null, _temp), (_applyDecoratedDescriptor(_class.prototype, '$omitFromJson', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '$omitFromJson'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '$omitFromDatabaseJson', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '$omitFromDatabaseJson'), _class.prototype), _applyDecoratedDescriptor(_class, 'getValidator', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'getValidator'), _class), _applyDecoratedDescriptor(_class, 'getJsonSchema', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'getJsonSchema'), _class), _applyDecoratedDescriptor(_class, 'columnNameToPropertyName', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'columnNameToPropertyName'), _class), _applyDecoratedDescriptor(_class, 'propertyNameToColumnName', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'propertyNameToColumnName'), _class), _applyDecoratedDescriptor(_class, 'getIdColumnArray', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'getIdColumnArray'), _class), _applyDecoratedDescriptor(_class, 'getFullIdColumn', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'getFullIdColumn'), _class), _applyDecoratedDescriptor(_class, 'getIdPropertyArray', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'getIdPropertyArray'), _class), _applyDecoratedDescriptor(_class, 'getIdProperty', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'getIdProperty'), _class), _applyDecoratedDescriptor(_class, 'relations', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_class, 'relations'), _class), _applyDecoratedDescriptor(_class, 'relationArray', [_dec4], (0, _getOwnPropertyDescriptor2.default)(_class, 'relationArray'), _class), _applyDecoratedDescriptor(_class, 'relations', [_dec5], (0, _getOwnPropertyDescriptor2.default)(_class, 'relations'), _class), _applyDecoratedDescriptor(_class, 'relationArray', [_dec6], (0, _getOwnPropertyDescriptor2.default)(_class, 'relationArray'), _class)), _class));
exports.default = Model;


function setId(model, id) {
  var idProp = model.constructor.getIdProperty();
  var isArray = Array.isArray(idProp);

  if (Array.isArray(id)) {
    if (isArray) {
      if (id.length !== idProp.length) {
        throw new Error('trying to set an invalid identifier for a model');
      }

      for (var i = 0; i < id.length; ++i) {
        model[idProp[i]] = id[i];
      }
    } else {
      if (id.length !== 1) {
        throw new Error('trying to set an invalid identifier for a model');
      }

      model[idProp] = id[0];
    }
  } else {
    if (isArray) {
      if (idProp.length > 1) {
        throw new Error('trying to set an invalid identifier for a model');
      }

      model[idProp[0]] = id;
    } else {
      model[idProp] = id;
    }
  }
}

function getId(model) {
  var idProp = model.constructor.getIdProperty();

  if (Array.isArray(idProp)) {
    return model.$values(idProp);
  } else {
    return model[idProp];
  }
}

function tryParseJson(maybeJsonStr) {
  try {
    return JSON.parse(maybeJsonStr);
  } catch (err) {
    // Ignore error.
  }

  return undefined;
}

function toJsonImpl(model, createDbJson, omit, pick) {
  if (createDbJson) {
    return toDatabaseJsonImpl(model, omit, pick);
  } else {
    return toExternalJsonImpl(model, omit, pick);
  }
}

function toDatabaseJsonImpl(model, omit, pick) {
  var json = {};
  var omitFromJson = model.$omitFromDatabaseJson();
  var keys = (0, _keys2.default)(model);

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];
    assignJsonValue(json, key, model[key], omit, pick, omitFromJson, true);
  }

  return json;
}

function toExternalJsonImpl(model, omit, pick) {
  var json = {};
  var omitFromJson = model.$omitFromJson();
  var keys = (0, _keys2.default)(model);

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];
    assignJsonValue(json, key, model[key], omit, pick, omitFromJson, false);
  }

  if (model.constructor.virtualAttributes) {
    var vAttr = model.constructor.virtualAttributes;

    for (var _i = 0, _l = vAttr.length; _i < _l; ++_i) {
      var _key = vAttr[_i];
      var value = model[_key];

      if (_lodash2.default.isFunction(value)) {
        value = value.call(model);
      }

      assignJsonValue(json, _key, value, omit, pick, omitFromJson, false);
    }
  }

  return json;
}

function assignJsonValue(json, key, value, omit, pick, omitFromJson, createDbJson) {
  if (key.charAt(0) !== '$' && !_lodash2.default.isFunction(value) && !_lodash2.default.isUndefined(value) && (!omit || !omit[key]) && (!pick || pick[key]) && (!omitFromJson || !contains(omitFromJson, key))) {

    if (value !== null && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
      json[key] = toJsonObject(value, createDbJson);
    } else {
      json[key] = value;
    }
  }
}

function toJsonObject(value, createDbJson) {
  if (Array.isArray(value)) {
    return toJsonArray(value, createDbJson);
  } else if (value instanceof Model) {
    if (createDbJson) {
      return value.$toDatabaseJson();
    } else {
      return value.$toJson();
    }
  } else if (Buffer.isBuffer(value)) {
    return value;
  } else {
    return _lodash2.default.cloneDeep(value);
  }
}

function toJsonArray(value, createDbJson) {
  var ret = new Array(value.length);

  for (var i = 0, l = ret.length; i < l; ++i) {
    ret[i] = toJsonObject(value[i], createDbJson);
  }

  return ret;
}

function cloneModel(model, shallow, stripInternal) {
  var clone = new model.constructor();
  var relations = model.constructor.getRelations();
  var keys = (0, _keys2.default)(model);

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];
    var value = model[key];

    if (shallow && relations[key]) {
      continue;
    }

    if (stripInternal && key.charAt(0) === '$') {
      continue;
    }

    if (_lodash2.default.isObject(value)) {
      clone[key] = cloneObject(value);
    } else {
      clone[key] = value;
    }
  }

  if (model.$omitFromDatabaseJson()) {
    clone.$omitFromDatabaseJson(model.$omitFromDatabaseJson());
  }

  if (model.$omitFromJson()) {
    clone.$omitFromJson(model.$omitFromJson());
  }

  return clone;
}

function cloneObject(value) {
  if (Array.isArray(value)) {
    return cloneArray(value);
  } else if (value instanceof Model) {
    return value.$clone();
  } else if (Buffer.isBuffer(value)) {
    return new Buffer(value);
  } else {
    return _lodash2.default.cloneDeep(value);
  }
}

function cloneArray(value) {
  var ret = new Array(value.length);

  for (var i = 0, l = ret.length; i < l; ++i) {
    ret[i] = cloneObject(value[i]);
  }

  return ret;
}

function omitObject(model, keyObj) {
  var ModelClass = model.constructor;
  var keys = (0, _keys2.default)(keyObj);

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];
    var value = keyObj[key];

    if (value && key.charAt(0) !== '$' && _lodash2.default.has(model, key)) {
      ModelClass.omitImpl(model, key);
    }
  }
}

function omitArray(model, keys) {
  var ModelClass = model.constructor;

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];

    if (key.charAt(0) !== '$' && _lodash2.default.has(model, key)) {
      ModelClass.omitImpl(model, key);
    }
  }
}

function pickObject(model, keyObj) {
  var ModelClass = model.constructor;
  var keys = (0, _keys2.default)(model);

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];

    if (key.charAt(0) !== '$' && !keyObj[key]) {
      ModelClass.omitImpl(model, key);
    }
  }
}

function pickArray(model, pick) {
  var ModelClass = model.constructor;
  var keys = (0, _keys2.default)(model);

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];

    if (key.charAt(0) !== '$' && !contains(pick, key)) {
      ModelClass.omitImpl(model, key);
    }
  }
}

function contains(arr, value) {
  for (var i = 0, l = arr.length; i < l; ++i) {
    if (arr[i] === value) {
      return true;
    }
  }
  return false;
}

function ensureArray(obj) {
  if (Array.isArray(obj)) {
    return obj;
  } else {
    return [obj];
  }
}

function idColumnToIdProperty(ModelClass, idColumn) {
  var idProperty = ModelClass.columnNameToPropertyName(idColumn);

  if (!idProperty) {
    throw new Error(ModelClass.tableName + '.$parseDatabaseJson probably changes the value of the id column `' + idColumn + '` which is a no-no.');
  }

  return idProperty;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZGVsLmpzIl0sIm5hbWVzIjpbIkpvaW5FYWdlckFsZ29yaXRobSIsIldoZXJlSW5FYWdlckFsZ29yaXRobSIsIk1vZGVsIiwibmFtZSIsImFwcGVuZCIsIiRpZCIsImlkIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic2V0SWQiLCJnZXRJZCIsIiRrbmV4IiwiY29uc3RydWN0b3IiLCJrbmV4IiwiJHRyYW5zYWN0aW9uIiwidHJhbnNhY3Rpb24iLCIkcXVlcnkiLCJ0cngiLCJNb2RlbENsYXNzIiwiUXVlcnlCdWlsZGVyIiwiZm9yQ2xhc3MiLCJ0cmFuc2FjdGluZyIsImZpbmRPcGVyYXRpb25GYWN0b3J5IiwiaW5zdGFuY2UiLCJpbnNlcnRPcGVyYXRpb25GYWN0b3J5IiwidXBkYXRlT3BlcmF0aW9uRmFjdG9yeSIsInBhdGNoT3BlcmF0aW9uRmFjdG9yeSIsIm1vZGVsT3B0aW9ucyIsInBhdGNoIiwiZGVsZXRlT3BlcmF0aW9uRmFjdG9yeSIsInJlbGF0ZU9wZXJhdGlvbkZhY3RvcnkiLCJFcnJvciIsInVucmVsYXRlT3BlcmF0aW9uRmFjdG9yeSIsIiRyZWxhdGVkUXVlcnkiLCJyZWxhdGlvbk5hbWUiLCJyZWxhdGlvbiIsImdldFJlbGF0aW9uIiwiUmVsYXRlZE1vZGVsQ2xhc3MiLCJyZWxhdGVkTW9kZWxDbGFzcyIsIlJlbGF0ZWRRdWVyeUJ1aWxkZXIiLCJmaW5kIiwiYnVpbGRlciIsImluc2VydCIsInVwZGF0ZSIsImRlbGV0ZSIsInJlbGF0ZSIsInVucmVsYXRlIiwiJGxvYWRSZWxhdGVkIiwicmVsYXRpb25FeHByZXNzaW9uIiwiZmlsdGVycyIsImxvYWRSZWxhdGVkIiwiJHRyYXZlcnNlIiwiZmlsdGVyQ29uc3RydWN0b3IiLCJjYWxsYmFjayIsImlzVW5kZWZpbmVkIiwidHJhdmVyc2UiLCIkYmVmb3JlVmFsaWRhdGUiLCJqc29uU2NoZW1hIiwianNvbiIsIm9wdGlvbnMiLCIkdmFsaWRhdGUiLCJjbG9uZU1vZGVsIiwic2tpcFZhbGlkYXRpb24iLCJ2YWxpZGF0b3IiLCJnZXRWYWxpZGF0b3IiLCJhcmdzIiwibW9kZWwiLCJjdHgiLCJiZWZvcmVWYWxpZGF0ZSIsInZhbGlkYXRlIiwiYWZ0ZXJWYWxpZGF0ZSIsIiRhZnRlclZhbGlkYXRlIiwiJHBhcnNlRGF0YWJhc2VKc29uIiwianNvbkF0dHIiLCJnZXRKc29uQXR0cmlidXRlcyIsImkiLCJsIiwiYXR0ciIsInZhbHVlIiwiaXNTdHJpbmciLCJwYXJzZWQiLCJ0cnlQYXJzZUpzb24iLCJ1bmRlZmluZWQiLCIkZm9ybWF0RGF0YWJhc2VKc29uIiwiaXNPYmplY3QiLCIkcGFyc2VKc29uIiwiJGZvcm1hdEpzb24iLCIkc2V0SnNvbiIsImlzTnVtYmVyIiwiaXNEYXRlIiwiaXNBcnJheSIsImlzRnVuY3Rpb24iLCJpc1R5cGVkQXJyYXkiLCJpc1JlZ0V4cCIsIiRzZXQiLCJyZWxhdGlvbnMiLCJnZXRSZWxhdGlvbkFycmF5IiwiaGFzIiwicmVsYXRpb25Kc29uIiwiQXJyYXkiLCJlbnN1cmVNb2RlbEFycmF5IiwiZW5zdXJlTW9kZWwiLCIkc2V0RGF0YWJhc2VKc29uIiwia2V5cyIsImtleSIsIm9iaiIsImNoYXJBdCIsIiR0b0pzb24iLCJzaGFsbG93IiwiJCR0b0pzb24iLCJnZXRSZWxhdGlvbnMiLCJ0b0pTT04iLCIkdG9EYXRhYmFzZUpzb24iLCJnZXRKc29uU2NoZW1hIiwicGlja0pzb25TY2hlbWFQcm9wZXJ0aWVzIiwicHJvcGVydGllcyIsIiRiZWZvcmVJbnNlcnQiLCJxdWVyeUNvbnRleHQiLCIkYWZ0ZXJJbnNlcnQiLCIkYmVmb3JlVXBkYXRlIiwib3B0IiwiJGFmdGVyVXBkYXRlIiwiJGFmdGVyR2V0IiwiJGJlZm9yZURlbGV0ZSIsIiRhZnRlckRlbGV0ZSIsIiRvbWl0Iiwib21pdEFycmF5Iiwib21pdE9iamVjdCIsInRvQXJyYXkiLCIkcGljayIsInBpY2tBcnJheSIsInBpY2tPYmplY3QiLCIkdmFsdWVzIiwidmFsdWVzIiwicmV0IiwiJHByb3BLZXkiLCJwcm9wcyIsIiRjbG9uZSIsIiRvbWl0RnJvbUpzb24iLCIkb21pdEZyb21EYXRhYmFzZUpzb24iLCJjcmVhdGVEYkpzb24iLCJvbWl0IiwicGljayIsInRvSnNvbkltcGwiLCJleHRlbmQiLCJzdWJjbGFzc0NvbnN0cnVjdG9yIiwiaXNFbXB0eSIsImZyb21Kc29uIiwiZnJvbURhdGFiYXNlSnNvbiIsIm9taXRJbXBsIiwicHJvcCIsImNyZWF0ZVZhbGlkYXRvciIsIm9uQ3JlYXRlQWp2IiwiYWp2IiwiYWxsRXJyb3JzIiwidmFsaWRhdGVTY2hlbWEiLCJvd25Qcm9wZXJ0aWVzIiwidjUiLCJjb2x1bW5OYW1lVG9Qcm9wZXJ0eU5hbWUiLCJjb2x1bW5OYW1lIiwiYWRkZWRQcm9wcyIsInJvdyIsInByb3BlcnR5TmFtZSIsImZpcnN0IiwiZGlmZmVyZW5jZSIsInByb3BlcnR5TmFtZVRvQ29sdW1uTmFtZSIsImFkZGVkQ29scyIsImNvbHMiLCJxdWVyeSIsIiQka25leCIsInJhdyIsImFwcGx5IiwiZm4iLCJmb3JtYXR0ZXIiLCJjbGllbnQiLCJrbmV4UXVlcnkiLCJ0YWJsZSIsInRhYmxlTmFtZSIsInVuaXF1ZVRhZyIsImJpbmRLbmV4IiwiJCRvYmplY3Rpb24iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJ3cml0YWJsZSIsImJvdW5kTW9kZWxzIiwiQm91bmRNb2RlbENsYXNzIiwiYm91bmRSZWxhdGlvbnMiLCJyZWxhdGlvbkFycmF5IiwiYmluZFRyYW5zYWN0aW9uIiwiaW5wdXQiLCJtb2RlbHMiLCJnZXRJZENvbHVtbkFycmF5IiwiaWRDb2x1bW4iLCJnZXRGdWxsSWRDb2x1bW4iLCJtYXAiLCJjb2wiLCJnZXRJZFByb3BlcnR5QXJyYXkiLCJpZENvbHVtblRvSWRQcm9wZXJ0eSIsImdldElkUHJvcGVydHkiLCJyZWR1Y2UiLCJyZXN1bHQiLCJtYXBwaW5nIiwic2V0TWFwcGluZyIsIiRtb2RlbHMiLCJleHByZXNzaW9uIiwicmVzb2x2ZSIsImZpbmRPcHRpb25zIiwiZG9udENhbGxBZnRlckdldCIsImVhZ2VyIiwicnVuQWZ0ZXIiLCJ0cmF2ZXJzZXIiLCJtb2RlbENsYXNzIiwicGFyZW50IiwianNvbkF0dHJpYnV0ZXMiLCJmb3JPd24iLCJwcm9wTmFtZSIsInR5cGVzIiwiY29tcGFjdCIsImVuc3VyZUFycmF5IiwidHlwZSIsImFueU9mIiwiZmxhdHRlbkRlZXAiLCJvbmVPZiIsImluY2x1ZGVzIiwicHVzaCIsIkhhc09uZVJlbGF0aW9uIiwiSGFzTWFueVJlbGF0aW9uIiwiTWFueVRvTWFueVJlbGF0aW9uIiwiQmVsb25nc1RvT25lUmVsYXRpb24iLCJIYXNPbmVUaHJvdWdoUmVsYXRpb24iLCJ1aWRQcm9wIiwidWlkUmVmUHJvcCIsImRiUmVmUHJvcCIsInByb3BSZWZSZWdleCIsInZpcnR1YWxBdHRyaWJ1dGVzIiwicmVsYXRpb25NYXBwaW5ncyIsIm1vZGVsUGF0aHMiLCJkZWZhdWx0RWFnZXJBbGdvcml0aG0iLCJkZWZhdWx0RWFnZXJPcHRpb25zIiwiaWRQcm9wIiwibWF5YmVKc29uU3RyIiwiSlNPTiIsInBhcnNlIiwiZXJyIiwidG9EYXRhYmFzZUpzb25JbXBsIiwidG9FeHRlcm5hbEpzb25JbXBsIiwib21pdEZyb21Kc29uIiwiYXNzaWduSnNvblZhbHVlIiwidkF0dHIiLCJjYWxsIiwiY29udGFpbnMiLCJ0b0pzb25PYmplY3QiLCJ0b0pzb25BcnJheSIsIkJ1ZmZlciIsImlzQnVmZmVyIiwiY2xvbmVEZWVwIiwic3RyaXBJbnRlcm5hbCIsImNsb25lIiwiY2xvbmVPYmplY3QiLCJjbG9uZUFycmF5Iiwia2V5T2JqIiwiYXJyIiwiaWRQcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7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QUNmLFVBQU0sSUFBSXhPLEtBQUosQ0FBVWIsV0FBVytKLFNBQVgsR0FBdUIsbUVBQXZCLEdBQTZGZ0IsUUFBN0YsR0FBd0cscUJBQWxILENBQU47QUFDRDs7QUFFRCxTQUFPc0UsVUFBUDtBQUNEIiwiZmlsZSI6Ik1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBBanZWYWxpZGF0b3IgZnJvbSAnLi9BanZWYWxpZGF0b3InO1xuaW1wb3J0IFF1ZXJ5QnVpbGRlciBmcm9tICcuLi9xdWVyeUJ1aWxkZXIvUXVlcnlCdWlsZGVyJztcbmltcG9ydCBpbmhlcml0TW9kZWwgZnJvbSAnLi9pbmhlcml0TW9kZWwnO1xuaW1wb3J0IFJlbGF0aW9uRXhwcmVzc2lvbiBmcm9tICcuLi9xdWVyeUJ1aWxkZXIvUmVsYXRpb25FeHByZXNzaW9uJztcbmltcG9ydCB7dmlzaXRNb2RlbHN9IGZyb20gJy4vbW9kZWxWaXNpdG9yJztcblxuaW1wb3J0IHtpbmhlcml0c30gZnJvbSAnLi4vdXRpbHMvY2xhc3NVdGlscyc7XG5pbXBvcnQge2luaGVyaXRIaWRkZW5EYXRhfSBmcm9tICcuLi91dGlscy9oaWRkZW5EYXRhJztcbmltcG9ydCBoaWRkZW5EYXRhIGZyb20gJy4uL3V0aWxzL2RlY29yYXRvcnMvaGlkZGVuRGF0YSc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICcuLi91dGlscy9kZWNvcmF0b3JzL21lbW9pemUnO1xuXG5pbXBvcnQgUmVsYXRpb24gZnJvbSAnLi4vcmVsYXRpb25zL1JlbGF0aW9uJztcbmltcG9ydCBIYXNPbmVSZWxhdGlvbiBmcm9tICcuLi9yZWxhdGlvbnMvaGFzT25lL0hhc09uZVJlbGF0aW9uJztcbmltcG9ydCBIYXNNYW55UmVsYXRpb24gZnJvbSAnLi4vcmVsYXRpb25zL2hhc01hbnkvSGFzTWFueVJlbGF0aW9uJztcbmltcG9ydCBNYW55VG9NYW55UmVsYXRpb24gZnJvbSAnLi4vcmVsYXRpb25zL21hbnlUb01hbnkvTWFueVRvTWFueVJlbGF0aW9uJztcbmltcG9ydCBCZWxvbmdzVG9PbmVSZWxhdGlvbiBmcm9tICcuLi9yZWxhdGlvbnMvYmVsb25nc1RvT25lL0JlbG9uZ3NUb09uZVJlbGF0aW9uJztcbmltcG9ydCBIYXNPbmVUaHJvdWdoUmVsYXRpb24gZnJvbSAnLi4vcmVsYXRpb25zL2hhc09uZVRocm91Z2gvSGFzT25lVGhyb3VnaFJlbGF0aW9uJztcblxuaW1wb3J0IEluc3RhbmNlRmluZE9wZXJhdGlvbiBmcm9tICcuLi9xdWVyeUJ1aWxkZXIvb3BlcmF0aW9ucy9JbnN0YW5jZUZpbmRPcGVyYXRpb24nO1xuaW1wb3J0IEluc3RhbmNlSW5zZXJ0T3BlcmF0aW9uIGZyb20gJy4uL3F1ZXJ5QnVpbGRlci9vcGVyYXRpb25zL0luc3RhbmNlSW5zZXJ0T3BlcmF0aW9uJztcbmltcG9ydCBJbnN0YW5jZVVwZGF0ZU9wZXJhdGlvbiBmcm9tICcuLi9xdWVyeUJ1aWxkZXIvb3BlcmF0aW9ucy9JbnN0YW5jZVVwZGF0ZU9wZXJhdGlvbic7XG5pbXBvcnQgSW5zdGFuY2VEZWxldGVPcGVyYXRpb24gZnJvbSAnLi4vcXVlcnlCdWlsZGVyL29wZXJhdGlvbnMvSW5zdGFuY2VEZWxldGVPcGVyYXRpb24nO1xuXG5pbXBvcnQgSm9pbkVhZ2VyT3BlcmF0aW9uIGZyb20gJy4uL3F1ZXJ5QnVpbGRlci9vcGVyYXRpb25zL0pvaW5FYWdlck9wZXJhdGlvbic7XG5pbXBvcnQgV2hlcmVJbkVhZ2VyT3BlcmF0aW9uIGZyb20gJy4uL3F1ZXJ5QnVpbGRlci9vcGVyYXRpb25zL1doZXJlSW5FYWdlck9wZXJhdGlvbic7XG5cbmNvbnN0IEpvaW5FYWdlckFsZ29yaXRobSA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBKb2luRWFnZXJPcGVyYXRpb24oJ2VhZ2VyJyk7XG59O1xuXG5jb25zdCBXaGVyZUluRWFnZXJBbGdvcml0aG0gPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgV2hlcmVJbkVhZ2VyT3BlcmF0aW9uKCdlYWdlcicpO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBNb2RlbE9wdGlvbnNcbiAqXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtwYXRjaF1cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3NraXBWYWxpZGF0aW9uXVxuICogQHByb3BlcnR5IHtNb2RlbH0gW29sZF1cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbCB7XG5cbiAgc3RhdGljIFF1ZXJ5QnVpbGRlciA9IFF1ZXJ5QnVpbGRlcjtcbiAgc3RhdGljIFJlbGF0ZWRRdWVyeUJ1aWxkZXIgPSBRdWVyeUJ1aWxkZXI7XG5cbiAgc3RhdGljIEhhc09uZVJlbGF0aW9uID0gSGFzT25lUmVsYXRpb247XG4gIHN0YXRpYyBIYXNNYW55UmVsYXRpb24gPSBIYXNNYW55UmVsYXRpb247XG4gIHN0YXRpYyBNYW55VG9NYW55UmVsYXRpb24gPSBNYW55VG9NYW55UmVsYXRpb247XG4gIHN0YXRpYyBCZWxvbmdzVG9PbmVSZWxhdGlvbiA9IEJlbG9uZ3NUb09uZVJlbGF0aW9uO1xuICBzdGF0aWMgSGFzT25lVGhyb3VnaFJlbGF0aW9uID0gSGFzT25lVGhyb3VnaFJlbGF0aW9uO1xuXG4gIHN0YXRpYyBKb2luRWFnZXJBbGdvcml0aG0gPSBKb2luRWFnZXJBbGdvcml0aG07XG4gIHN0YXRpYyBXaGVyZUluRWFnZXJBbGdvcml0aG0gPSBXaGVyZUluRWFnZXJBbGdvcml0aG07XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgdGFibGVOYW1lID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBqc29uU2NoZW1hID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ3xBcnJheS48c3RyaW5nPn1cbiAgICovXG4gIHN0YXRpYyBpZENvbHVtbiA9ICdpZCc7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgdWlkUHJvcCA9ICcjaWQnO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIHVpZFJlZlByb3AgPSAnI3JlZic7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgZGJSZWZQcm9wID0gJyNkYlJlZic7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtSZWdFeHB9XG4gICAqL1xuICBzdGF0aWMgcHJvcFJlZlJlZ2V4ID0gLyNyZWZ7KFteXFwuXSspXFwuKFtefV0rKX0vZztcblxuICAvKipcbiAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fVxuICAgKi9cbiAgc3RhdGljIGpzb25BdHRyaWJ1dGVzID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fVxuICAgKi9cbiAgc3RhdGljIHZpcnR1YWxBdHRyaWJ1dGVzID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdC48c3RyaW5nLCBSZWxhdGlvbk1hcHBpbmc+fVxuICAgKi9cbiAgc3RhdGljIHJlbGF0aW9uTWFwcGluZ3MgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXkuPHN0cmluZz59XG4gICAqL1xuICBzdGF0aWMgbW9kZWxQYXRocyA9IFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBwaWNrSnNvblNjaGVtYVByb3BlcnRpZXMgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Q29uc3RydWN0b3IuPD8gZXh0ZW5kcyBFYWdlck9wZXJhdGlvbj59XG4gICAqL1xuICBzdGF0aWMgZGVmYXVsdEVhZ2VyQWxnb3JpdGhtID0gV2hlcmVJbkVhZ2VyQWxnb3JpdGhtO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRFYWdlck9wdGlvbnMgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3RhdGljICQka25leCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Kj19IGlkXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgJGlkKGlkKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gc2V0SWQodGhpcywgYXJndW1lbnRzWzBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldElkKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7a25leH1cbiAgICovXG4gICRrbmV4KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmtuZXgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7a25leH1cbiAgICovXG4gICR0cmFuc2FjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50cmFuc2FjdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VHJhbnNhY3Rpb249fSB0cnhcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gICRxdWVyeSh0cngpIHtcbiAgICBjb25zdCBNb2RlbENsYXNzID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBNb2RlbENsYXNzLlF1ZXJ5QnVpbGRlclxuICAgICAgLmZvckNsYXNzKE1vZGVsQ2xhc3MpXG4gICAgICAudHJhbnNhY3RpbmcodHJ4KVxuICAgICAgLmZpbmRPcGVyYXRpb25GYWN0b3J5KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnN0YW5jZUZpbmRPcGVyYXRpb24oJ2ZpbmQnLCB7aW5zdGFuY2U6IHRoaXN9KTtcbiAgICAgIH0pXG4gICAgICAuaW5zZXJ0T3BlcmF0aW9uRmFjdG9yeSgoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgSW5zdGFuY2VJbnNlcnRPcGVyYXRpb24oJ2luc2VydCcsIHtpbnN0YW5jZTogdGhpc30pO1xuICAgICAgfSlcbiAgICAgIC51cGRhdGVPcGVyYXRpb25GYWN0b3J5KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnN0YW5jZVVwZGF0ZU9wZXJhdGlvbigndXBkYXRlJywge2luc3RhbmNlOiB0aGlzfSk7XG4gICAgICB9KVxuICAgICAgLnBhdGNoT3BlcmF0aW9uRmFjdG9yeSgoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgSW5zdGFuY2VVcGRhdGVPcGVyYXRpb24oJ3BhdGNoJywge2luc3RhbmNlOiB0aGlzLCBtb2RlbE9wdGlvbnM6IHtwYXRjaDogdHJ1ZX19KTtcbiAgICAgIH0pXG4gICAgICAuZGVsZXRlT3BlcmF0aW9uRmFjdG9yeSgoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgSW5zdGFuY2VEZWxldGVPcGVyYXRpb24oJ2RlbGV0ZScsIHtpbnN0YW5jZTogdGhpc30pO1xuICAgICAgfSlcbiAgICAgIC5yZWxhdGVPcGVyYXRpb25GYWN0b3J5KCgpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgcmVsYXRlYCBtYWtlcyBubyBzZW5zZSBpbiB0aGlzIGNvbnRleHQnKTtcbiAgICAgIH0pXG4gICAgICAudW5yZWxhdGVPcGVyYXRpb25GYWN0b3J5KCgpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgdW5yZWxhdGVgIG1ha2VzIG5vIHNlbnNlIGluIHRoaXMgY29udGV4dCcpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICAgKiBAcGFyYW0ge1RyYW5zYWN0aW9uPX0gdHJ4XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICAkcmVsYXRlZFF1ZXJ5KHJlbGF0aW9uTmFtZSwgdHJ4KSB7XG4gICAgY29uc3QgTW9kZWxDbGFzcyA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgY29uc3QgcmVsYXRpb24gPSBNb2RlbENsYXNzLmdldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSk7XG4gICAgY29uc3QgUmVsYXRlZE1vZGVsQ2xhc3MgPSByZWxhdGlvbi5yZWxhdGVkTW9kZWxDbGFzcztcblxuICAgIHJldHVybiBNb2RlbENsYXNzLlJlbGF0ZWRRdWVyeUJ1aWxkZXJcbiAgICAgIC5mb3JDbGFzcyhSZWxhdGVkTW9kZWxDbGFzcylcbiAgICAgIC50cmFuc2FjdGluZyh0cngpXG4gICAgICAuZmluZE9wZXJhdGlvbkZhY3RvcnkoYnVpbGRlciA9PiB7XG4gICAgICAgIHJldHVybiByZWxhdGlvbi5maW5kKGJ1aWxkZXIsIFt0aGlzXSk7XG4gICAgICB9KVxuICAgICAgLmluc2VydE9wZXJhdGlvbkZhY3RvcnkoYnVpbGRlciA9PiB7XG4gICAgICAgIHJldHVybiByZWxhdGlvbi5pbnNlcnQoYnVpbGRlciwgdGhpcyk7XG4gICAgICB9KVxuICAgICAgLnVwZGF0ZU9wZXJhdGlvbkZhY3RvcnkoYnVpbGRlciA9PiB7XG4gICAgICAgIHJldHVybiByZWxhdGlvbi51cGRhdGUoYnVpbGRlciwgdGhpcyk7XG4gICAgICB9KVxuICAgICAgLnBhdGNoT3BlcmF0aW9uRmFjdG9yeShidWlsZGVyID0+IHtcbiAgICAgICAgcmV0dXJuIHJlbGF0aW9uLnBhdGNoKGJ1aWxkZXIsIHRoaXMpO1xuICAgICAgfSlcbiAgICAgIC5kZWxldGVPcGVyYXRpb25GYWN0b3J5KGJ1aWxkZXIgPT4ge1xuICAgICAgICByZXR1cm4gcmVsYXRpb24uZGVsZXRlKGJ1aWxkZXIsIHRoaXMpO1xuICAgICAgfSlcbiAgICAgIC5yZWxhdGVPcGVyYXRpb25GYWN0b3J5KGJ1aWxkZXIgPT4ge1xuICAgICAgICByZXR1cm4gcmVsYXRpb24ucmVsYXRlKGJ1aWxkZXIsIHRoaXMpO1xuICAgICAgfSlcbiAgICAgIC51bnJlbGF0ZU9wZXJhdGlvbkZhY3RvcnkoYnVpbGRlciA9PiB7XG4gICAgICAgIHJldHVybiByZWxhdGlvbi51bnJlbGF0ZShidWlsZGVyLCB0aGlzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlbGF0aW9uRXhwcmVzc2lvbn0gcmVsYXRpb25FeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsIGZ1bmN0aW9uKFF1ZXJ5QnVpbGRlcik+PX0gZmlsdGVyc1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgJGxvYWRSZWxhdGVkKHJlbGF0aW9uRXhwcmVzc2lvbiwgZmlsdGVycykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmxvYWRSZWxhdGVkKHRoaXMsIHJlbGF0aW9uRXhwcmVzc2lvbiwgZmlsdGVycyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb25zdHJ1Y3Rvci48TW9kZWw+PX0gZmlsdGVyQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtmdW5jdGlvbihNb2RlbCl9IGNhbGxiYWNrXG4gICAqIEByZXR1cm4ge01vZGVsfVxuICAgKi9cbiAgJHRyYXZlcnNlKGZpbHRlckNvbnN0cnVjdG9yLCBjYWxsYmFjaykge1xuICAgIGlmIChfLmlzVW5kZWZpbmVkKGNhbGxiYWNrKSkge1xuICAgICAgY2FsbGJhY2sgPSBmaWx0ZXJDb25zdHJ1Y3RvcjtcbiAgICAgIGZpbHRlckNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnN0cnVjdG9yLnRyYXZlcnNlKGZpbHRlckNvbnN0cnVjdG9yLCB0aGlzLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGpzb25TY2hlbWFcbiAgICogQHBhcmFtIHtPYmplY3R9IGpzb25cbiAgICogQHBhcmFtIHtNb2RlbE9wdGlvbnM9fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gICRiZWZvcmVWYWxpZGF0ZShqc29uU2NoZW1hLCBqc29uLCBvcHRpb25zKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICByZXR1cm4ganNvblNjaGVtYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdD19IGpzb25cbiAgICogQHBhcmFtIHtNb2RlbE9wdGlvbnM9fSBvcHRpb25zXG4gICAqIEB0aHJvd3Mge1ZhbGlkYXRpb25FcnJvcn1cbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgJHZhbGlkYXRlKGpzb24gPSB0aGlzLCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAoanNvbiBpbnN0YW5jZW9mIE1vZGVsKSB7XG4gICAgICAvLyBTdHJpcCBhd2F5IHJlbGF0aW9ucyBhbmQgb3RoZXIgaW50ZXJuYWwgc3R1ZmYuXG4gICAgICBqc29uID0gY2xvbmVNb2RlbChqc29uLCB0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5za2lwVmFsaWRhdGlvbikge1xuICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuXG4gICAgY29uc3QgdmFsaWRhdG9yID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRWYWxpZGF0b3IoKTtcbiAgICBjb25zdCBhcmdzID0ge1xuICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgIG1vZGVsOiB0aGlzLFxuICAgICAganNvbjoganNvbixcbiAgICAgIGN0eDogT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuYmVmb3JlVmFsaWRhdGUoYXJncyk7XG4gICAganNvbiA9IHZhbGlkYXRvci52YWxpZGF0ZShhcmdzKTtcbiAgICB2YWxpZGF0b3IuYWZ0ZXJWYWxpZGF0ZShhcmdzKTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0ganNvblxuICAgKiBAcGFyYW0ge01vZGVsT3B0aW9ucz19IG9wdGlvbnNcbiAgICovXG4gICRhZnRlclZhbGlkYXRlKGpzb24sIG9wdGlvbnMpIHtcbiAgICAvLyBEbyBub3RoaW5nIGJ5IGRlZmF1bHQuXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGpzb25cbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgJHBhcnNlRGF0YWJhc2VKc29uKGpzb24pIHtcbiAgICBjb25zdCBqc29uQXR0ciA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SnNvbkF0dHJpYnV0ZXMoKTtcblxuICAgIGlmIChqc29uQXR0ci5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0ganNvbkF0dHIubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGNvbnN0IGF0dHIgPSBqc29uQXR0cltpXTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBqc29uW2F0dHJdO1xuXG4gICAgICAgIGlmIChfLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHRyeVBhcnNlSnNvbih2YWx1ZSk7XG5cbiAgICAgICAgICAvLyB0cnlQYXJzZUpzb24gcmV0dXJucyB1bmRlZmluZWQgaWYgcGFyc2luZyBmYWlsZWQuXG4gICAgICAgICAgaWYgKHBhcnNlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBqc29uW2F0dHJdID0gcGFyc2VkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBqc29uXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gICRmb3JtYXREYXRhYmFzZUpzb24oanNvbikge1xuICAgIGNvbnN0IGpzb25BdHRyID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRKc29uQXR0cmlidXRlcygpO1xuXG4gICAgaWYgKGpzb25BdHRyLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBqc29uQXR0ci5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgY29uc3QgYXR0ciA9IGpzb25BdHRyW2ldO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGpzb25bYXR0cl07XG5cbiAgICAgICAgaWYgKF8uaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAganNvblthdHRyXSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBqc29uXG4gICAqIEBwYXJhbSB7TW9kZWxPcHRpb25zPX0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICAkcGFyc2VKc29uKGpzb24sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0ganNvblxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICAkZm9ybWF0SnNvbihqc29uKSB7XG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGpzb25cbiAgICogQHBhcmFtIHtNb2RlbE9wdGlvbnM9fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtNb2RlbH1cbiAgICogQHRocm93cyBWYWxpZGF0aW9uRXJyb3JcbiAgICovXG4gICRzZXRKc29uKGpzb24sIG9wdGlvbnMgPSB7fSkge1xuICAgIGpzb24gPSBqc29uIHx8IHt9O1xuXG4gICAgaWYgKCFfLmlzT2JqZWN0KGpzb24pXG4gICAgICB8fCBfLmlzU3RyaW5nKGpzb24pXG4gICAgICB8fCBfLmlzTnVtYmVyKGpzb24pXG4gICAgICB8fCBfLmlzRGF0ZShqc29uKVxuICAgICAgfHwgXy5pc0FycmF5KGpzb24pXG4gICAgICB8fCBfLmlzRnVuY3Rpb24oanNvbilcbiAgICAgIHx8IF8uaXNUeXBlZEFycmF5KGpzb24pXG4gICAgICB8fCBfLmlzUmVnRXhwKGpzb24pKSB7XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IHNob3VsZCBvbmx5IHBhc3Mgb2JqZWN0cyB0byAkc2V0SnNvbiBtZXRob2QuICdcbiAgICAgICAgKyAnJHNldEpzb24gbWV0aG9kIHdhcyBnaXZlbiBhbiBpbnZhbGlkIHZhbHVlICdcbiAgICAgICAgKyBqc29uKTtcbiAgICB9XG5cblxuICAgIGpzb24gPSB0aGlzLiRwYXJzZUpzb24oanNvbiwgb3B0aW9ucyk7XG4gICAganNvbiA9IHRoaXMuJHZhbGlkYXRlKGpzb24sIG9wdGlvbnMpO1xuXG4gICAgLy8gVE9ETyBNb3ZlIHRvIGJvdHRvbS5cbiAgICB0aGlzLiRzZXQoanNvbik7XG5cbiAgICBjb25zdCByZWxhdGlvbnMgPSB0aGlzLmNvbnN0cnVjdG9yLmdldFJlbGF0aW9uQXJyYXkoKTtcbiAgICAvLyBQYXJzZSByZWxhdGlvbnMgaW50byBNb2RlbCBpbnN0YW5jZXMuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSByZWxhdGlvbnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCByZWxhdGlvbiA9IHJlbGF0aW9uc1tpXTtcbiAgICAgIGNvbnN0IHJlbGF0aW9uTmFtZSA9IHJlbGF0aW9uLm5hbWU7XG5cbiAgICAgIGlmIChfLmhhcyhqc29uLCByZWxhdGlvbk5hbWUpKSB7XG4gICAgICAgIGNvbnN0IHJlbGF0aW9uSnNvbiA9IGpzb25bcmVsYXRpb25OYW1lXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZWxhdGlvbkpzb24pKSB7XG4gICAgICAgICAgdGhpc1tyZWxhdGlvbk5hbWVdID0gcmVsYXRpb24ucmVsYXRlZE1vZGVsQ2xhc3MuZW5zdXJlTW9kZWxBcnJheShyZWxhdGlvbkpzb24sIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlbGF0aW9uSnNvbikge1xuICAgICAgICAgIHRoaXNbcmVsYXRpb25OYW1lXSA9IHJlbGF0aW9uLnJlbGF0ZWRNb2RlbENsYXNzLmVuc3VyZU1vZGVsKHJlbGF0aW9uSnNvbiwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpc1tyZWxhdGlvbk5hbWVdID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0ganNvblxuICAgKiBAcmV0dXJucyB7TW9kZWx9XG4gICAqL1xuICAkc2V0RGF0YWJhc2VKc29uKGpzb24pIHtcbiAgICBqc29uID0gdGhpcy4kcGFyc2VEYXRhYmFzZUpzb24oanNvbik7XG5cbiAgICBpZiAoanNvbikge1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGpzb24pO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICAgIHRoaXNba2V5XSA9IGpzb25ba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAqIEByZXR1cm5zIHtNb2RlbH1cbiAgICovXG4gICRzZXQob2JqKSB7XG4gICAgaWYgKG9iaikge1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBvYmpba2V5XTtcblxuICAgICAgICBpZiAoa2V5LmNoYXJBdCgwKSAhPT0gJyQnICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFuPX0gc2hhbGxvd1xuICAgKi9cbiAgJHRvSnNvbihzaGFsbG93KSB7XG4gICAgaWYgKHNoYWxsb3cpIHtcbiAgICAgIHJldHVybiB0aGlzLiQkdG9Kc29uKGZhbHNlLCB0aGlzLmNvbnN0cnVjdG9yLmdldFJlbGF0aW9ucygpLCBudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuJCR0b0pzb24oZmFsc2UsIG51bGwsIG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy4kdG9Kc29uKCk7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICAkdG9EYXRhYmFzZUpzb24oKSB7XG4gICAgY29uc3QganNvblNjaGVtYSA9IHRoaXMuY29uc3RydWN0b3IuZ2V0SnNvblNjaGVtYSgpO1xuXG4gICAgaWYgKGpzb25TY2hlbWEgJiYgdGhpcy5jb25zdHJ1Y3Rvci5waWNrSnNvblNjaGVtYVByb3BlcnRpZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLiQkdG9Kc29uKHRydWUsIG51bGwsIGpzb25TY2hlbWEucHJvcGVydGllcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLiQkdG9Kc29uKHRydWUsIHRoaXMuY29uc3RydWN0b3IuZ2V0UmVsYXRpb25zKCksIG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcXVlcnlDb250ZXh0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfCp9XG4gICAqL1xuICAkYmVmb3JlSW5zZXJ0KHF1ZXJ5Q29udGV4dCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHF1ZXJ5Q29udGV4dFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZXwqfVxuICAgKi9cbiAgJGFmdGVySW5zZXJ0KHF1ZXJ5Q29udGV4dCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtNb2RlbE9wdGlvbnN9IG9wdFxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlckNvbnRleHR9IHF1ZXJ5Q29udGV4dFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZXwqfVxuICAgKi9cbiAgJGJlZm9yZVVwZGF0ZShvcHQsIHF1ZXJ5Q29udGV4dCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtNb2RlbE9wdGlvbnN9IG9wdFxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlckNvbnRleHR9IHF1ZXJ5Q29udGV4dFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZXwqfVxuICAgKi9cbiAgJGFmdGVyVXBkYXRlKG9wdCwgcXVlcnlDb250ZXh0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlckNvbnRleHR9IHF1ZXJ5Q29udGV4dFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZXwqfVxuICAgKi9cbiAgJGFmdGVyR2V0KHF1ZXJ5Q29udGV4dCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtRdWVyeUJ1aWxkZXJDb250ZXh0fSBxdWVyeUNvbnRleHRcbiAgICogQHJldHVybnMge1Byb21pc2V8Kn1cbiAgICovXG4gICRiZWZvcmVEZWxldGUocXVlcnlDb250ZXh0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlckNvbnRleHR9IHF1ZXJ5Q29udGV4dFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZXwqfVxuICAgKi9cbiAgJGFmdGVyRGVsZXRlKHF1ZXJ5Q29udGV4dCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXkuPHN0cmluZz58T2JqZWN0LjxzdHJpbmcsIGJvb2xlYW4+fSBrZXlzXG4gICAqIEByZXR1cm5zIHtNb2RlbH1cbiAgICovXG4gICRvbWl0KCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIF8uaXNPYmplY3QoYXJndW1lbnRzWzBdKSkge1xuICAgICAgY29uc3Qga2V5cyA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5cykpIHtcbiAgICAgICAgb21pdEFycmF5KHRoaXMsIGtleXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb21pdE9iamVjdCh0aGlzLCBrZXlzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb21pdEFycmF5KHRoaXMsIF8udG9BcnJheShhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheS48c3RyaW5nPnxPYmplY3QuPHN0cmluZywgYm9vbGVhbj59IGtleXNcbiAgICogQHJldHVybnMge01vZGVsfSBgdGhpc2AgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgJHBpY2soKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgXy5pc09iamVjdChhcmd1bWVudHNbMF0pKSB7XG4gICAgICBjb25zdCBrZXlzID0gYXJndW1lbnRzWzBdO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShrZXlzKSkge1xuICAgICAgICBwaWNrQXJyYXkodGhpcywga2V5cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwaWNrT2JqZWN0KHRoaXMsIGtleXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwaWNrQXJyYXkodGhpcywgXy50b0FycmF5KGFyZ3VtZW50cykpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IHByb3BzXG4gICAqIEByZXR1cm4ge0FycmF5LjwqPn1cbiAgICovXG4gICR2YWx1ZXMoKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBfLnZhbHVlcyh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIEFycmF5LmlzQXJyYXkoYXJndW1lbnRzWzBdKSlcbiAgICAgICAgPyBhcmd1bWVudHNbMF1cbiAgICAgICAgOiBhcmd1bWVudHM7XG5cbiAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAxOiByZXR1cm4gW3RoaXNbYXJnc1swXV1dO1xuICAgICAgICBjYXNlIDI6IHJldHVybiBbdGhpc1thcmdzWzBdXSwgdGhpc1thcmdzWzFdXV07XG4gICAgICAgIGNhc2UgMzogcmV0dXJuIFt0aGlzW2FyZ3NbMF1dLCB0aGlzW2FyZ3NbMV1dLCB0aGlzW2FyZ3NbMl1dXTtcbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIGNvbnN0IHJldCA9IG5ldyBBcnJheShhcmdzLmxlbmd0aCk7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3MubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICByZXRbaV0gPSB0aGlzW2FyZ3NbaV1dO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gcHJvcHNcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgJHByb3BLZXkocHJvcHMpIHtcbiAgICBzd2l0Y2ggKHByb3BzLmxlbmd0aCkge1xuICAgICAgY2FzZSAxOiByZXR1cm4gdGhpc1twcm9wc1swXV0gKyAnJztcbiAgICAgIGNhc2UgMjogcmV0dXJuIHRoaXNbcHJvcHNbMF1dICsgJywnICsgdGhpc1twcm9wc1sxXV07XG4gICAgICBjYXNlIDM6IHJldHVybiB0aGlzW3Byb3BzWzBdXSArICcsJyArIHRoaXNbcHJvcHNbMV1dICsgJywnICsgdGhpc1twcm9wc1syXV07XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGxldCBrZXkgPSAnJztcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHByb3BzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgIGtleSArPSB0aGlzW3Byb3BzW2ldXSArICgoaSA8IHByb3BzLmxlbmd0aCAtIDEpID8gJywnIDogJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSBzaGFsbG93XG4gICAqIEByZXR1cm4ge01vZGVsfVxuICAgKi9cbiAgJGNsb25lKHNoYWxsb3cpIHtcbiAgICByZXR1cm4gY2xvbmVNb2RlbCh0aGlzLCBzaGFsbG93LCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPj19IGtleXNcbiAgICogQHJldHVybnMge0FycmF5LjxzdHJpbmc+fVxuICAgKi9cbiAgQGhpZGRlbkRhdGEoe25hbWU6ICdvbWl0RnJvbUpzb24nLCBhcHBlbmQ6IHRydWV9KVxuICAkb21pdEZyb21Kc29uKGtleXMpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz49fSBrZXlzXG4gICAqIEByZXR1cm5zIHtBcnJheS48c3RyaW5nPn1cbiAgICovXG4gIEBoaWRkZW5EYXRhKHtuYW1lOiAnb21pdEZyb21EYXRhYmFzZUpzb24nLCBhcHBlbmQ6IHRydWV9KVxuICAkb21pdEZyb21EYXRhYmFzZUpzb24oa2V5cykge31cblxuICAvKipcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgJCR0b0pzb24oY3JlYXRlRGJKc29uLCBvbWl0LCBwaWNrKSB7XG4gICAgbGV0IGpzb24gPSB0b0pzb25JbXBsKHRoaXMsIGNyZWF0ZURiSnNvbiwgb21pdCwgcGljayk7XG5cbiAgICBpZiAoY3JlYXRlRGJKc29uKSB7XG4gICAgICByZXR1cm4gdGhpcy4kZm9ybWF0RGF0YWJhc2VKc29uKGpzb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy4kZm9ybWF0SnNvbihqc29uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbj19IHN1YmNsYXNzQ29uc3RydWN0b3JcbiAgICogQHJldHVybiB7Q29uc3RydWN0b3IuPE1vZGVsPn1cbiAgICovXG4gIHN0YXRpYyBleHRlbmQoc3ViY2xhc3NDb25zdHJ1Y3Rvcikge1xuICAgIGlmIChfLmlzRW1wdHkoc3ViY2xhc3NDb25zdHJ1Y3Rvci5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFYWNoIE1vZGVsIHN1YmNsYXNzIGNvbnN0cnVjdG9yIG11c3QgaGF2ZSBhIG5hbWUnKTtcbiAgICB9XG5cbiAgICBpbmhlcml0cyhzdWJjbGFzc0NvbnN0cnVjdG9yLCB0aGlzKTtcbiAgICByZXR1cm4gc3ViY2xhc3NDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdD19IGpzb25cbiAgICogQHBhcmFtIHtNb2RlbE9wdGlvbnM9fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtNb2RlbH1cbiAgICogQHRocm93cyBWYWxpZGF0aW9uRXJyb3JcbiAgICovXG4gIHN0YXRpYyBmcm9tSnNvbihqc29uLCBvcHRpb25zKSB7XG4gICAgbGV0IG1vZGVsID0gbmV3IHRoaXMoKTtcbiAgICBtb2RlbC4kc2V0SnNvbihqc29uIHx8IHt9LCBvcHRpb25zKTtcbiAgICByZXR1cm4gbW9kZWw7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3Q9fSBqc29uXG4gICAqIEByZXR1cm5zIHtNb2RlbH1cbiAgICovXG4gIHN0YXRpYyBmcm9tRGF0YWJhc2VKc29uKGpzb24pIHtcbiAgICBsZXQgbW9kZWwgPSBuZXcgdGhpcygpO1xuICAgIG1vZGVsLiRzZXREYXRhYmFzZUpzb24oanNvbiB8fCB7fSk7XG4gICAgcmV0dXJuIG1vZGVsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BcbiAgICovXG4gIHN0YXRpYyBvbWl0SW1wbChvYmosIHByb3ApIHtcbiAgICBkZWxldGUgb2JqW3Byb3BdO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge1ZhbGlkYXRvcn1cbiAgICovXG4gIHN0YXRpYyBjcmVhdGVWYWxpZGF0b3IoKSB7XG4gICAgcmV0dXJuIG5ldyBBanZWYWxpZGF0b3Ioe1xuICAgICAgb25DcmVhdGVBanY6IChhanYpID0+IHsgLyogRG8gTm90aGluZyBieSBkZWZhdWx0ICovIH0sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGFsbEVycm9yczogdHJ1ZSxcbiAgICAgICAgdmFsaWRhdGVTY2hlbWE6IGZhbHNlLFxuICAgICAgICBvd25Qcm9wZXJ0aWVzOiB0cnVlLFxuICAgICAgICB2NTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge1ZhbGlkYXRvcn1cbiAgICovXG4gIEBtZW1vaXplXG4gIHN0YXRpYyBnZXRWYWxpZGF0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVmFsaWRhdG9yKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgQG1lbW9pemVcbiAgc3RhdGljIGdldEpzb25TY2hlbWEoKSB7XG4gICAgLy8gTWVtb2l6ZWQgZ2V0dGVyIGluIGNhc2UganNvblNjaGVtYSBpcyBhIGdldHRlciBwcm9wZXJ0eSAodXN1YWxseSBpcyB3aXRoIEVTNikuXG4gICAgcmV0dXJuIHRoaXMuanNvblNjaGVtYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29sdW1uTmFtZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgQG1lbW9pemVcbiAgc3RhdGljIGNvbHVtbk5hbWVUb1Byb3BlcnR5TmFtZShjb2x1bW5OYW1lKSB7XG4gICAgbGV0IG1vZGVsID0gbmV3IHRoaXMoKTtcbiAgICBsZXQgYWRkZWRQcm9wcyA9IF8ua2V5cyhtb2RlbC4kcGFyc2VEYXRhYmFzZUpzb24oe30pKTtcblxuICAgIGxldCByb3cgPSB7fTtcbiAgICByb3dbY29sdW1uTmFtZV0gPSBudWxsO1xuXG4gICAgbGV0IHByb3BzID0gXy5rZXlzKG1vZGVsLiRwYXJzZURhdGFiYXNlSnNvbihyb3cpKTtcbiAgICBsZXQgcHJvcGVydHlOYW1lID0gXy5maXJzdChfLmRpZmZlcmVuY2UocHJvcHMsIGFkZGVkUHJvcHMpKTtcblxuICAgIHJldHVybiBwcm9wZXJ0eU5hbWUgfHwgbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBAbWVtb2l6ZVxuICBzdGF0aWMgcHJvcGVydHlOYW1lVG9Db2x1bW5OYW1lKHByb3BlcnR5TmFtZSkge1xuICAgIGxldCBtb2RlbCA9IG5ldyB0aGlzKCk7XG4gICAgbGV0IGFkZGVkQ29scyA9IF8ua2V5cyhtb2RlbC4kZm9ybWF0RGF0YWJhc2VKc29uKHt9KSk7XG5cbiAgICBsZXQgb2JqID0ge307XG4gICAgb2JqW3Byb3BlcnR5TmFtZV0gPSBudWxsO1xuXG4gICAgbGV0IGNvbHMgPSBfLmtleXMobW9kZWwuJGZvcm1hdERhdGFiYXNlSnNvbihvYmopKTtcbiAgICBsZXQgY29sdW1uTmFtZSA9IF8uZmlyc3QoXy5kaWZmZXJlbmNlKGNvbHMsIGFkZGVkQ29scykpO1xuXG4gICAgcmV0dXJuIGNvbHVtbk5hbWUgfHwgbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1RyYW5zYWN0aW9uPX0gdHJ4XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBzdGF0aWMgcXVlcnkodHJ4KSB7XG4gICAgY29uc3QgTW9kZWxDbGFzcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gTW9kZWxDbGFzcy5RdWVyeUJ1aWxkZXJcbiAgICAgIC5mb3JDbGFzcyhNb2RlbENsYXNzKVxuICAgICAgLnRyYW5zYWN0aW5nKHRyeClcbiAgICAgIC5yZWxhdGVPcGVyYXRpb25GYWN0b3J5KCgpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgcmVsYXRlYCBtYWtlcyBubyBzZW5zZSBpbiB0aGlzIGNvbnRleHQnKTtcbiAgICAgIH0pXG4gICAgICAudW5yZWxhdGVPcGVyYXRpb25GYWN0b3J5KCgpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgdW5yZWxhdGVgIG1ha2VzIG5vIHNlbnNlIGluIHRoaXMgY29udGV4dCcpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtrbmV4PX0ga25leFxuICAgKiBAcmV0dXJucyB7a25leH1cbiAgICovXG4gIHN0YXRpYyBrbmV4KGtuZXgpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy4kJGtuZXggPSBrbmV4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy4kJGtuZXg7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtrbmV4fVxuICAgKi9cbiAgc3RhdGljIHRyYW5zYWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmtuZXgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtSYXd9XG4gICAqL1xuICBzdGF0aWMgcmF3KCkge1xuICAgIGNvbnN0IGtuZXggPSB0aGlzLmtuZXgoKTtcbiAgICByZXR1cm4ga25leC5yYXcuYXBwbHkoa25leCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgZm4oKSB7XG4gICAgY29uc3Qga25leCA9IHRoaXMua25leCgpO1xuICAgIHJldHVybiBrbmV4LmZuO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge0Zvcm1hdHRlcn1cbiAgICovXG4gIHN0YXRpYyBmb3JtYXR0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMua25leCgpLmNsaWVudC5mb3JtYXR0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7a25leC5RdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBzdGF0aWMga25leFF1ZXJ5KCkge1xuICAgIHJldHVybiB0aGlzLmtuZXgoKS50YWJsZSh0aGlzLnRhYmxlTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyB1bmlxdWVUYWcoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFibGVOYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7a25leH0ga25leFxuICAgKiBAcmV0dXJucyB7Q29uc3RydWN0b3IuPE1vZGVsPn1cbiAgICovXG4gIHN0YXRpYyBiaW5kS25leChrbmV4KSB7XG4gICAgY29uc3QgTW9kZWxDbGFzcyA9IHRoaXM7XG5cbiAgICBpZiAoIWtuZXguJCRvYmplY3Rpb24pIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShrbmV4LCAnJCRvYmplY3Rpb24nLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgYm91bmRNb2RlbHM6IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgdGhpcyBtb2RlbCBjbGFzcyBoYXMgYWxyZWFkeSBiZWVuIGJvdW5kIHRvIHRoZSBnaXZlbiBrbmV4LlxuICAgIGlmIChrbmV4LiQkb2JqZWN0aW9uLmJvdW5kTW9kZWxzW01vZGVsQ2xhc3MudW5pcXVlVGFnKCldKSB7XG4gICAgICByZXR1cm4ga25leC4kJG9iamVjdGlvbi5ib3VuZE1vZGVsc1tNb2RlbENsYXNzLnVuaXF1ZVRhZygpXTtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgc3ViY2xhc3Mgb2YgdGhpcyBjbGFzcy5cbiAgICBjb25zdCBCb3VuZE1vZGVsQ2xhc3MgPSBpbmhlcml0TW9kZWwoTW9kZWxDbGFzcyk7XG5cbiAgICAvLyBUaGUgYm91bmQgbW9kZWwgaXMgZXF1YWwgdG8gdGhlIHNvdXJjZSBtb2RlbCBpbiBldmVyeSB3YXkuIFdlIHdhbnQgdG8gY29weVxuICAgIC8vIHRoZSBoaWRkZW4gZGF0YSBhcy1pcyBmcm9tIHRoZSBzb3VyY2Ugc28gdGhhdCB3ZSBkb24ndCBnZXQgdGhlIHBlcmZvcm1hbmNlXG4gICAgLy8gcGVuYWx0eSBvZiBjYWxjdWxhdGluZyBhbGwgbWVtb2l6ZWQgZXRjLiB2YWx1ZXMgYWdhaW4uXG4gICAgaW5oZXJpdEhpZGRlbkRhdGEoTW9kZWxDbGFzcywgQm91bmRNb2RlbENsYXNzKTtcblxuICAgIEJvdW5kTW9kZWxDbGFzcy5rbmV4KGtuZXgpO1xuICAgIGtuZXguJCRvYmplY3Rpb24uYm91bmRNb2RlbHNbTW9kZWxDbGFzcy51bmlxdWVUYWcoKV0gPSBCb3VuZE1vZGVsQ2xhc3M7XG5cbiAgICBjb25zdCBib3VuZFJlbGF0aW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgY29uc3QgcmVsYXRpb25zID0gTW9kZWxDbGFzcy5nZXRSZWxhdGlvbkFycmF5KCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHJlbGF0aW9ucy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IHJlbGF0aW9uID0gcmVsYXRpb25zW2ldO1xuICAgICAgYm91bmRSZWxhdGlvbnNbcmVsYXRpb24ubmFtZV0gPSByZWxhdGlvbi5iaW5kS25leChrbmV4KTtcbiAgICB9XG5cbiAgICBCb3VuZE1vZGVsQ2xhc3MucmVsYXRpb25zID0gYm91bmRSZWxhdGlvbnM7XG4gICAgQm91bmRNb2RlbENsYXNzLnJlbGF0aW9uQXJyYXkgPSBfLnZhbHVlcyhib3VuZFJlbGF0aW9ucyk7XG5cbiAgICByZXR1cm4gQm91bmRNb2RlbENsYXNzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7a25leH0gdHJ4XG4gICAqIEByZXR1cm5zIHtDb25zdHJ1Y3Rvci48TW9kZWw+fVxuICAgKi9cbiAgc3RhdGljIGJpbmRUcmFuc2FjdGlvbih0cngpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5kS25leCh0cngpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TW9kZWx8T2JqZWN0fSBtb2RlbFxuICAgKiBAcGFyYW0ge01vZGVsT3B0aW9ucz19IG9wdGlvbnNcbiAgICogQHJldHVybnMge01vZGVsfVxuICAgKi9cbiAgc3RhdGljIGVuc3VyZU1vZGVsKG1vZGVsLCBvcHRpb25zKSB7XG4gICAgY29uc3QgTW9kZWxDbGFzcyA9IHRoaXM7XG5cbiAgICBpZiAoIW1vZGVsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAobW9kZWwgaW5zdGFuY2VvZiBNb2RlbENsYXNzKSB7XG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBNb2RlbENsYXNzLmZyb21Kc29uKG1vZGVsLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBcnJheS48TW9kZWx8T2JqZWN0Pn0gaW5wdXRcbiAgICogQHBhcmFtIHtNb2RlbE9wdGlvbnM9fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtBcnJheS48TW9kZWw+fVxuICAgKi9cbiAgc3RhdGljIGVuc3VyZU1vZGVsQXJyYXkoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICBsZXQgbW9kZWxzID0gbmV3IEFycmF5KGlucHV0Lmxlbmd0aCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaW5wdXQubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIG1vZGVsc1tpXSA9IHRoaXMuZW5zdXJlTW9kZWwoaW5wdXRbaV0sIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbW9kZWxzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW3RoaXMuZW5zdXJlTW9kZWwoaW5wdXQsIG9wdGlvbnMpXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge0FycmF5LjxzdHJpbmc+fVxuICAgKi9cbiAgQG1lbW9pemVcbiAgc3RhdGljIGdldElkQ29sdW1uQXJyYXkoKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5pZENvbHVtbikpIHtcbiAgICAgIHJldHVybiB0aGlzLmlkQ29sdW1uO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW3RoaXMuaWRDb2x1bW5dO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfEFycmF5LjxzdHJpbmc+fVxuICAgKi9cbiAgQG1lbW9pemVcbiAgc3RhdGljIGdldEZ1bGxJZENvbHVtbigpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmlkQ29sdW1uKSkge1xuICAgICAgcmV0dXJuIHRoaXMuaWRDb2x1bW4ubWFwKGNvbCA9PiB0aGlzLnRhYmxlTmFtZSArICcuJyArIGNvbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnRhYmxlTmFtZSArICcuJyArIHRoaXMuaWRDb2x1bW47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtBcnJheS48c3RyaW5nPn1cbiAgICovXG4gIEBtZW1vaXplXG4gIHN0YXRpYyBnZXRJZFByb3BlcnR5QXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SWRDb2x1bW5BcnJheSgpLm1hcChjb2wgPT4gaWRDb2x1bW5Ub0lkUHJvcGVydHkodGhpcywgY29sKSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ3xBcnJheS48c3RyaW5nPn1cbiAgICovXG4gIEBtZW1vaXplXG4gIHN0YXRpYyBnZXRJZFByb3BlcnR5KCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuaWRDb2x1bW4pKSB7XG4gICAgICByZXR1cm4gdGhpcy5pZENvbHVtbi5tYXAoY29sID0+IGlkQ29sdW1uVG9JZFByb3BlcnR5KHRoaXMsIGNvbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaWRDb2x1bW5Ub0lkUHJvcGVydHkodGhpcywgdGhpcy5pZENvbHVtbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBAaGlkZGVuRGF0YSgpXG4gIHN0YXRpYyBnZXQgcmVsYXRpb25zKCkge31cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEBoaWRkZW5EYXRhKClcbiAgc3RhdGljIGdldCByZWxhdGlvbkFycmF5KCkge31cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEBoaWRkZW5EYXRhKClcbiAgc3RhdGljIHNldCByZWxhdGlvbnModmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBAaGlkZGVuRGF0YSgpXG4gIHN0YXRpYyBzZXQgcmVsYXRpb25BcnJheSh2YWx1ZSkge31cblxuICAvKipcbiAgICogQHJldHVybiB7T2JqZWN0LjxzdHJpbmcsIFJlbGF0aW9uPn1cbiAgICovXG4gIHN0YXRpYyBnZXRSZWxhdGlvbnMoKSB7XG4gICAgbGV0IHJlbGF0aW9ucyA9IHRoaXMucmVsYXRpb25zO1xuXG4gICAgaWYgKCFyZWxhdGlvbnMpIHtcbiAgICAgIHJlbGF0aW9ucyA9IF8ucmVkdWNlKF8ucmVzdWx0KHRoaXMsICdyZWxhdGlvbk1hcHBpbmdzJyksIChyZWxhdGlvbnMsIG1hcHBpbmcsIHJlbGF0aW9uTmFtZSkgPT4ge1xuICAgICAgICByZWxhdGlvbnNbcmVsYXRpb25OYW1lXSA9IG5ldyBtYXBwaW5nLnJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgdGhpcyk7XG4gICAgICAgIHJlbGF0aW9uc1tyZWxhdGlvbk5hbWVdLnNldE1hcHBpbmcobWFwcGluZyk7XG4gICAgICAgIHJldHVybiByZWxhdGlvbnM7XG4gICAgICB9LCBPYmplY3QuY3JlYXRlKG51bGwpKTtcblxuICAgICAgdGhpcy5yZWxhdGlvbnMgPSByZWxhdGlvbnM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbGF0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtBcnJheS48UmVsYXRpb24+fVxuICAgKi9cbiAgc3RhdGljIGdldFJlbGF0aW9uQXJyYXkoKSB7XG4gICAgbGV0IHJlbGF0aW9uQXJyYXkgPSB0aGlzLnJlbGF0aW9uQXJyYXk7XG5cbiAgICBpZiAoIXJlbGF0aW9uQXJyYXkpIHtcbiAgICAgIHJlbGF0aW9uQXJyYXkgPSBfLnZhbHVlcyh0aGlzLmdldFJlbGF0aW9ucygpKTtcbiAgICAgIHRoaXMucmVsYXRpb25BcnJheSA9IHJlbGF0aW9uQXJyYXk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbGF0aW9uQXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7UmVsYXRpb259XG4gICAqL1xuICBzdGF0aWMgZ2V0UmVsYXRpb24obmFtZSkge1xuICAgIGNvbnN0IHJlbGF0aW9uID0gdGhpcy5nZXRSZWxhdGlvbnMoKVtuYW1lXTtcblxuICAgIGlmICghcmVsYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQSBtb2RlbCBjbGFzcyAodGFibGVOYW1lID0gJHt0aGlzLnRhYmxlTmFtZX0pIGRvZXNuJ3QgaGF2ZSByZWxhdGlvbiAke25hbWV9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbGF0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXkuPE1vZGVsfE9iamVjdD59ICRtb2RlbHNcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVsYXRpb25FeHByZXNzaW9ufSBleHByZXNzaW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsIGZ1bmN0aW9uKFF1ZXJ5QnVpbGRlcik+PX0gZmlsdGVyc1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgc3RhdGljIGxvYWRSZWxhdGVkKCRtb2RlbHMsIGV4cHJlc3Npb24sIGZpbHRlcnMpIHtcbiAgICByZXR1cm4gdGhpc1xuICAgICAgLnF1ZXJ5KClcbiAgICAgIC5yZXNvbHZlKHRoaXMuZW5zdXJlTW9kZWxBcnJheSgkbW9kZWxzKSlcbiAgICAgIC5maW5kT3B0aW9ucyh7ZG9udENhbGxBZnRlckdldDogdHJ1ZX0pXG4gICAgICAuZWFnZXIoZXhwcmVzc2lvbiwgZmlsdGVycylcbiAgICAgIC5ydW5BZnRlcihmdW5jdGlvbiAobW9kZWxzKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KCRtb2RlbHMpID8gbW9kZWxzIDogbW9kZWxzWzBdO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb25zdHJ1Y3Rvci48TW9kZWw+PX0gZmlsdGVyQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtNb2RlbHxBcnJheS48TW9kZWw+fSBtb2RlbHNcbiAgICogQHBhcmFtIHtmdW5jdGlvbihNb2RlbCwgTW9kZWwsIHN0cmluZyl9IHRyYXZlcnNlclxuICAgKiBAcmV0dXJuIHtNb2RlbH1cbiAgICovXG4gIHN0YXRpYyB0cmF2ZXJzZShmaWx0ZXJDb25zdHJ1Y3RvciwgbW9kZWxzLCB0cmF2ZXJzZXIpIHtcbiAgICBmaWx0ZXJDb25zdHJ1Y3RvciA9IGZpbHRlckNvbnN0cnVjdG9yIHx8IG51bGw7XG5cbiAgICBpZiAoXy5pc1VuZGVmaW5lZCh0cmF2ZXJzZXIpKSB7XG4gICAgICB0cmF2ZXJzZXIgPSBtb2RlbHM7XG4gICAgICBtb2RlbHMgPSBmaWx0ZXJDb25zdHJ1Y3RvcjtcbiAgICAgIGZpbHRlckNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIV8uaXNGdW5jdGlvbih0cmF2ZXJzZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RyYXZlcnNlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICBpZiAoXy5pc0VtcHR5KG1vZGVscykpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGVsQ2xhc3MgPSBBcnJheS5pc0FycmF5KG1vZGVscylcbiAgICAgID8gbW9kZWxzWzBdLmNvbnN0cnVjdG9yXG4gICAgICA6IG1vZGVscy5jb25zdHJ1Y3RvcjtcblxuICAgIHZpc2l0TW9kZWxzKG1vZGVscywgbW9kZWxDbGFzcywgKG1vZGVsLCBtb2RlbENsYXNzLCBwYXJlbnQsIHJlbGF0aW9uKSA9PiB7XG4gICAgICBpZiAoIWZpbHRlckNvbnN0cnVjdG9yIHx8IG1vZGVsIGluc3RhbmNlb2YgZmlsdGVyQ29uc3RydWN0b3IpIHtcbiAgICAgICAgdHJhdmVyc2VyKG1vZGVsLCBwYXJlbnQsIHJlbGF0aW9uICYmIHJlbGF0aW9uLm5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHByb3RlY3RlZFxuICAgKiBAcmV0dXJucyB7QXJyYXkuPHN0cmluZz59XG4gICAqL1xuICBzdGF0aWMgZ2V0SnNvbkF0dHJpYnV0ZXMoKSB7XG4gICAgLy8gSWYgdGhlIGpzb25BdHRyaWJ1dGVzIHByb3BlcnR5IGlzIG5vdCBzZXQsIHRyeSB0byBjcmVhdGUgaXQgYmFzZWRcbiAgICAvLyBvbiB0aGUganNvblNjaGVtYS4gQWxsIHByb3BlcnRpZXMgdGhhdCBhcmUgb2JqZWN0cyBvciBhcnJheXMgbXVzdFxuICAgIC8vIGJlIGNvbnZlcnRlZCB0byBKU09OLlxuICAgIGlmICghdGhpcy5qc29uQXR0cmlidXRlcyAmJiB0aGlzLmdldEpzb25TY2hlbWEoKSkge1xuICAgICAgdGhpcy5qc29uQXR0cmlidXRlcyA9IFtdO1xuXG4gICAgICBfLmZvck93bih0aGlzLmdldEpzb25TY2hlbWEoKS5wcm9wZXJ0aWVzLCAocHJvcCwgcHJvcE5hbWUpID0+IHtcbiAgICAgICAgdmFyIHR5cGVzID0gXy5jb21wYWN0KGVuc3VyZUFycmF5KHByb3AudHlwZSkpO1xuXG4gICAgICAgIGlmICh0eXBlcy5sZW5ndGggPT09IDAgJiYgQXJyYXkuaXNBcnJheShwcm9wLmFueU9mKSkge1xuICAgICAgICAgIHR5cGVzID0gXy5mbGF0dGVuRGVlcChfLm1hcChwcm9wLmFueU9mLCAndHlwZScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlcy5sZW5ndGggPT09IDAgJiYgQXJyYXkuaXNBcnJheShwcm9wLm9uZU9mKSkge1xuICAgICAgICAgIHR5cGVzID0gXy5mbGF0dGVuRGVlcChfLm1hcChwcm9wLm9uZU9mLCAndHlwZScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLmluY2x1ZGVzKHR5cGVzLCAnb2JqZWN0JykgfHwgXy5pbmNsdWRlcyh0eXBlcywgJ2FycmF5JykpIHtcbiAgICAgICAgICB0aGlzLmpzb25BdHRyaWJ1dGVzLnB1c2gocHJvcE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5qc29uQXR0cmlidXRlcykpIHtcbiAgICAgIHRoaXMuanNvbkF0dHJpYnV0ZXMgPSBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5qc29uQXR0cmlidXRlcztcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRJZChtb2RlbCwgaWQpIHtcbiAgY29uc3QgaWRQcm9wID0gbW9kZWwuY29uc3RydWN0b3IuZ2V0SWRQcm9wZXJ0eSgpO1xuICBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShpZFByb3ApO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGlkKSkge1xuICAgIGlmIChpc0FycmF5KSB7XG4gICAgICBpZiAoaWQubGVuZ3RoICE9PSBpZFByb3AubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndHJ5aW5nIHRvIHNldCBhbiBpbnZhbGlkIGlkZW50aWZpZXIgZm9yIGEgbW9kZWwnKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZC5sZW5ndGg7ICsraSkge1xuICAgICAgICBtb2RlbFtpZFByb3BbaV1dID0gaWRbaV07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpZC5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0cnlpbmcgdG8gc2V0IGFuIGludmFsaWQgaWRlbnRpZmllciBmb3IgYSBtb2RlbCcpO1xuICAgICAgfVxuXG4gICAgICBtb2RlbFtpZFByb3BdID0gaWRbMF07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChpc0FycmF5KSB7XG4gICAgICBpZiAoaWRQcm9wLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0cnlpbmcgdG8gc2V0IGFuIGludmFsaWQgaWRlbnRpZmllciBmb3IgYSBtb2RlbCcpO1xuICAgICAgfVxuXG4gICAgICBtb2RlbFtpZFByb3BbMF1dID0gaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vZGVsW2lkUHJvcF0gPSBpZDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0SWQobW9kZWwpIHtcbiAgY29uc3QgaWRQcm9wID0gbW9kZWwuY29uc3RydWN0b3IuZ2V0SWRQcm9wZXJ0eSgpO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGlkUHJvcCkpIHtcbiAgICByZXR1cm4gbW9kZWwuJHZhbHVlcyhpZFByb3ApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtb2RlbFtpZFByb3BdO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRyeVBhcnNlSnNvbihtYXliZUpzb25TdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShtYXliZUpzb25TdHIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBJZ25vcmUgZXJyb3IuXG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB0b0pzb25JbXBsKG1vZGVsLCBjcmVhdGVEYkpzb24sIG9taXQsIHBpY2spIHtcbiAgaWYgKGNyZWF0ZURiSnNvbikge1xuICAgIHJldHVybiB0b0RhdGFiYXNlSnNvbkltcGwobW9kZWwsIG9taXQsIHBpY2spO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0b0V4dGVybmFsSnNvbkltcGwobW9kZWwsIG9taXQsIHBpY2spO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvRGF0YWJhc2VKc29uSW1wbChtb2RlbCwgb21pdCwgcGljaykge1xuICBjb25zdCBqc29uID0ge307XG4gIGNvbnN0IG9taXRGcm9tSnNvbiA9IG1vZGVsLiRvbWl0RnJvbURhdGFiYXNlSnNvbigpO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobW9kZWwpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgIGFzc2lnbkpzb25WYWx1ZShqc29uLCBrZXksIG1vZGVsW2tleV0sIG9taXQsIHBpY2ssIG9taXRGcm9tSnNvbiwgdHJ1ZSk7XG4gIH1cblxuICByZXR1cm4ganNvbjtcbn1cblxuZnVuY3Rpb24gdG9FeHRlcm5hbEpzb25JbXBsKG1vZGVsLCBvbWl0LCBwaWNrKSB7XG4gIGNvbnN0IGpzb24gPSB7fTtcbiAgY29uc3Qgb21pdEZyb21Kc29uID0gbW9kZWwuJG9taXRGcm9tSnNvbigpO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobW9kZWwpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgIGFzc2lnbkpzb25WYWx1ZShqc29uLCBrZXksIG1vZGVsW2tleV0sIG9taXQsIHBpY2ssIG9taXRGcm9tSnNvbiwgZmFsc2UpO1xuICB9XG5cbiAgaWYgKG1vZGVsLmNvbnN0cnVjdG9yLnZpcnR1YWxBdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgdkF0dHIgPSBtb2RlbC5jb25zdHJ1Y3Rvci52aXJ0dWFsQXR0cmlidXRlcztcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdkF0dHIubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBrZXkgPSB2QXR0cltpXTtcbiAgICAgIGxldCB2YWx1ZSA9IG1vZGVsW2tleV07XG5cbiAgICAgIGlmIChfLmlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChtb2RlbCk7XG4gICAgICB9XG5cbiAgICAgIGFzc2lnbkpzb25WYWx1ZShqc29uLCBrZXksIHZhbHVlLCBvbWl0LCBwaWNrLCBvbWl0RnJvbUpzb24sIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ganNvbjtcbn1cblxuZnVuY3Rpb24gYXNzaWduSnNvblZhbHVlKGpzb24sIGtleSwgdmFsdWUsIG9taXQsIHBpY2ssIG9taXRGcm9tSnNvbiwgY3JlYXRlRGJKc29uKSB7XG4gIGlmIChrZXkuY2hhckF0KDApICE9PSAnJCdcbiAgICAmJiAhXy5pc0Z1bmN0aW9uKHZhbHVlKVxuICAgICYmICFfLmlzVW5kZWZpbmVkKHZhbHVlKVxuICAgICYmICghb21pdCB8fCAhb21pdFtrZXldKVxuICAgICYmICghcGljayB8fCBwaWNrW2tleV0pXG4gICAgJiYgKCFvbWl0RnJvbUpzb24gfHwgIWNvbnRhaW5zKG9taXRGcm9tSnNvbiwga2V5KSkpIHtcblxuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBqc29uW2tleV0gPSB0b0pzb25PYmplY3QodmFsdWUsIGNyZWF0ZURiSnNvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGpzb25ba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB0b0pzb25PYmplY3QodmFsdWUsIGNyZWF0ZURiSnNvbikge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdG9Kc29uQXJyYXkodmFsdWUsIGNyZWF0ZURiSnNvbik7XG4gIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBNb2RlbCkge1xuICAgIGlmIChjcmVhdGVEYkpzb24pIHtcbiAgICAgIHJldHVybiB2YWx1ZS4kdG9EYXRhYmFzZUpzb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlLiR0b0pzb24oKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXy5jbG9uZURlZXAodmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvSnNvbkFycmF5KHZhbHVlLCBjcmVhdGVEYkpzb24pIHtcbiAgY29uc3QgcmV0ID0gbmV3IEFycmF5KHZhbHVlLmxlbmd0aCk7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSByZXQubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgcmV0W2ldID0gdG9Kc29uT2JqZWN0KHZhbHVlW2ldLCBjcmVhdGVEYkpzb24pXG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBjbG9uZU1vZGVsKG1vZGVsLCBzaGFsbG93LCBzdHJpcEludGVybmFsKSB7XG4gIGNvbnN0IGNsb25lID0gbmV3IG1vZGVsLmNvbnN0cnVjdG9yKCk7XG4gIGNvbnN0IHJlbGF0aW9ucyA9IG1vZGVsLmNvbnN0cnVjdG9yLmdldFJlbGF0aW9ucygpO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobW9kZWwpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgIGNvbnN0IHZhbHVlID0gbW9kZWxba2V5XTtcblxuICAgIGlmIChzaGFsbG93ICYmIHJlbGF0aW9uc1trZXldKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc3RyaXBJbnRlcm5hbCAmJiBrZXkuY2hhckF0KDApID09PSAnJCcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChfLmlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgY2xvbmVba2V5XSA9IGNsb25lT2JqZWN0KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xvbmVba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtb2RlbC4kb21pdEZyb21EYXRhYmFzZUpzb24oKSkge1xuICAgIGNsb25lLiRvbWl0RnJvbURhdGFiYXNlSnNvbihtb2RlbC4kb21pdEZyb21EYXRhYmFzZUpzb24oKSk7XG4gIH1cblxuICBpZiAobW9kZWwuJG9taXRGcm9tSnNvbigpKSB7XG4gICAgY2xvbmUuJG9taXRGcm9tSnNvbihtb2RlbC4kb21pdEZyb21Kc29uKCkpO1xuICB9XG5cbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBjbG9uZU9iamVjdCh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gY2xvbmVBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBNb2RlbCkge1xuICAgIHJldHVybiB2YWx1ZS4kY2xvbmUoKTtcbiAgfSBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBfLmNsb25lRGVlcCh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xvbmVBcnJheSh2YWx1ZSkge1xuICBjb25zdCByZXQgPSBuZXcgQXJyYXkodmFsdWUubGVuZ3RoKTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IHJldC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICByZXRbaV0gPSBjbG9uZU9iamVjdCh2YWx1ZVtpXSlcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9taXRPYmplY3QobW9kZWwsIGtleU9iaikge1xuICBjb25zdCBNb2RlbENsYXNzID0gbW9kZWwuY29uc3RydWN0b3I7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhrZXlPYmopO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgIGNvbnN0IHZhbHVlID0ga2V5T2JqW2tleV07XG5cbiAgICBpZiAodmFsdWUgJiYga2V5LmNoYXJBdCgwKSAhPT0gJyQnICYmIF8uaGFzKG1vZGVsLCBrZXkpKSB7XG4gICAgICBNb2RlbENsYXNzLm9taXRJbXBsKG1vZGVsLCBrZXkpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBvbWl0QXJyYXkobW9kZWwsIGtleXMpIHtcbiAgY29uc3QgTW9kZWxDbGFzcyA9IG1vZGVsLmNvbnN0cnVjdG9yO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuXG4gICAgaWYgKGtleS5jaGFyQXQoMCkgIT09ICckJyAmJiBfLmhhcyhtb2RlbCwga2V5KSkge1xuICAgICAgTW9kZWxDbGFzcy5vbWl0SW1wbChtb2RlbCwga2V5KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcGlja09iamVjdChtb2RlbCwga2V5T2JqKSB7XG4gIGNvbnN0IE1vZGVsQ2xhc3MgPSBtb2RlbC5jb25zdHJ1Y3RvcjtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG1vZGVsKTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcblxuICAgIGlmIChrZXkuY2hhckF0KDApICE9PSAnJCcgJiYgIWtleU9ialtrZXldKSB7XG4gICAgICBNb2RlbENsYXNzLm9taXRJbXBsKG1vZGVsLCBrZXkpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwaWNrQXJyYXkobW9kZWwsIHBpY2spIHtcbiAgY29uc3QgTW9kZWxDbGFzcyA9IG1vZGVsLmNvbnN0cnVjdG9yO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobW9kZWwpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuXG4gICAgaWYgKGtleS5jaGFyQXQoMCkgIT09ICckJyAmJiAhY29udGFpbnMocGljaywga2V5KSkge1xuICAgICAgTW9kZWxDbGFzcy5vbWl0SW1wbChtb2RlbCwga2V5KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY29udGFpbnMoYXJyLCB2YWx1ZSkge1xuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoYXJyW2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlQXJyYXkob2JqKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbb2JqXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpZENvbHVtblRvSWRQcm9wZXJ0eShNb2RlbENsYXNzLCBpZENvbHVtbikge1xuICBsZXQgaWRQcm9wZXJ0eSA9IE1vZGVsQ2xhc3MuY29sdW1uTmFtZVRvUHJvcGVydHlOYW1lKGlkQ29sdW1uKTtcblxuICBpZiAoIWlkUHJvcGVydHkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoTW9kZWxDbGFzcy50YWJsZU5hbWUgKyAnLiRwYXJzZURhdGFiYXNlSnNvbiBwcm9iYWJseSBjaGFuZ2VzIHRoZSB2YWx1ZSBvZiB0aGUgaWQgY29sdW1uIGAnICsgaWRDb2x1bW4gKyAnYCB3aGljaCBpcyBhIG5vLW5vLicpO1xuICB9XG5cbiAgcmV0dXJuIGlkUHJvcGVydHk7XG59Il19