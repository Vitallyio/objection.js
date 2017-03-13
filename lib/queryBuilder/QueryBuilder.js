'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _desc, _value, _class;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _queryBuilderOperation = require('./decorators/queryBuilderOperation');

var _queryBuilderOperation2 = _interopRequireDefault(_queryBuilderOperation);

var _QueryBuilderContext = require('./QueryBuilderContext');

var _QueryBuilderContext2 = _interopRequireDefault(_QueryBuilderContext);

var _RelationExpression = require('./RelationExpression');

var _RelationExpression2 = _interopRequireDefault(_RelationExpression);

var _QueryBuilderBase2 = require('./QueryBuilderBase');

var _QueryBuilderBase3 = _interopRequireDefault(_QueryBuilderBase2);

var _ValidationError = require('../model/ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

var _FindOperation = require('./operations/FindOperation');

var _FindOperation2 = _interopRequireDefault(_FindOperation);

var _DeleteOperation = require('./operations/DeleteOperation');

var _DeleteOperation2 = _interopRequireDefault(_DeleteOperation);

var _UpdateOperation = require('./operations/UpdateOperation');

var _UpdateOperation2 = _interopRequireDefault(_UpdateOperation);

var _InsertOperation = require('./operations/InsertOperation');

var _InsertOperation2 = _interopRequireDefault(_InsertOperation);

var _InsertGraphAndFetchOperation = require('./operations/InsertGraphAndFetchOperation');

var _InsertGraphAndFetchOperation2 = _interopRequireDefault(_InsertGraphAndFetchOperation);

var _InsertAndFetchOperation = require('./operations/InsertAndFetchOperation');

var _InsertAndFetchOperation2 = _interopRequireDefault(_InsertAndFetchOperation);

var _UpdateAndFetchOperation = require('./operations/UpdateAndFetchOperation');

var _UpdateAndFetchOperation2 = _interopRequireDefault(_UpdateAndFetchOperation);

var _QueryBuilderOperation = require('./operations/QueryBuilderOperation');

var _QueryBuilderOperation2 = _interopRequireDefault(_QueryBuilderOperation);

var _JoinRelationOperation = require('./operations/JoinRelationOperation');

var _JoinRelationOperation2 = _interopRequireDefault(_JoinRelationOperation);

var _InsertGraphOperation = require('./operations/InsertGraphOperation');

var _InsertGraphOperation2 = _interopRequireDefault(_InsertGraphOperation);

var _RunBeforeOperation = require('./operations/RunBeforeOperation');

var _RunBeforeOperation2 = _interopRequireDefault(_RunBeforeOperation);

var _RunAfterOperation = require('./operations/RunAfterOperation');

var _RunAfterOperation2 = _interopRequireDefault(_RunAfterOperation);

var _OnBuildOperation = require('./operations/OnBuildOperation');

var _OnBuildOperation2 = _interopRequireDefault(_OnBuildOperation);

var _SelectOperation = require('./operations/SelectOperation');

var _SelectOperation2 = _interopRequireDefault(_SelectOperation);

var _EagerOperation = require('./operations/EagerOperation');

var _EagerOperation2 = _interopRequireDefault(_EagerOperation);

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

var QueryBuilder = (_dec = (0, _queryBuilderOperation2.default)(_RunBeforeOperation2.default), _dec2 = (0, _queryBuilderOperation2.default)(_OnBuildOperation2.default), _dec3 = (0, _queryBuilderOperation2.default)(_RunAfterOperation2.default), _dec4 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'join' }]), _dec5 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'innerJoin' }]), _dec6 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'outerJoin' }]), _dec7 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'leftJoin' }]), _dec8 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'leftOuterJoin' }]), _dec9 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'rightJoin' }]), _dec10 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'rightOuterJoin' }]), _dec11 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'fullOuterJoin' }]), (_class = function (_QueryBuilderBase) {
  (0, _inherits3.default)(QueryBuilder, _QueryBuilderBase);

  function QueryBuilder(modelClass) {
    (0, _classCallCheck3.default)(this, QueryBuilder);

    var _this = (0, _possibleConstructorReturn3.default)(this, _QueryBuilderBase.call(this, modelClass.knex(), _QueryBuilderContext2.default));

    _this._modelClass = modelClass;
    _this._explicitRejectValue = null;
    _this._explicitResolveValue = null;

    _this._eagerExpression = null;
    _this._eagerFilterExpressions = [];
    _this._allowedEagerExpression = null;
    _this._allowedInsertExpression = null;

    _this._findOperationOptions = {};
    _this._eagerOperationOptions = {};

    _this._findOperationFactory = findOperationFactory;
    _this._insertOperationFactory = insertOperationFactory;
    _this._updateOperationFactory = updateOperationFactory;
    _this._patchOperationFactory = patchOperationFactory;
    _this._relateOperationFactory = relateOperationFactory;
    _this._unrelateOperationFactory = unrelateOperationFactory;
    _this._deleteOperationFactory = deleteOperationFactory;
    _this._eagerOperationFactory = modelClass.defaultEagerAlgorithm;
    return _this;
  }

  /**
   * @param {Model} modelClass
   * @returns {QueryBuilder}
   */


  QueryBuilder.forClass = function forClass(modelClass) {
    return new this(modelClass);
  };

  /**
   * @param {QueryBuilderBase} query
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.childQueryOf = function childQueryOf(query) {
    if (query) {
      this.internalContext(query.internalContext());
    }

    return this;
  };

  /**
   * @param {Error} error
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.reject = function reject(error) {
    this._explicitRejectValue = error;
    return this;
  };

  /**
   * @param {*} value
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.resolve = function resolve(value) {
    this._explicitResolveValue = value;
    return this;
  };

  /**
   * @returns {boolean}
   */


  QueryBuilder.prototype.isExecutable = function isExecutable() {
    var hasExecutor = !!this._queryExecutorOperation();
    return !this._explicitRejectValue && !this._explicitResolveValue && !hasExecutor;
  };

  /**
   * @param {function(*, QueryBuilder)} runBefore
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.runBefore = function runBefore(_runBefore) {};

  /**
   * @param {function(QueryBuilder)} onBuild
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.onBuild = function onBuild(_onBuild) {};

  /**
   * @param {function(Model|Array.<Model>, QueryBuilder)} runAfter
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.runAfter = function runAfter(_runAfter) {};

  /**
   * @param {function(QueryBuilder):EagerOperation} algorithm
   * @param {object=} eagerOptions
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.eagerAlgorithm = function eagerAlgorithm(algorithm, eagerOptions) {
    this.eagerOperationFactory(algorithm);

    if (eagerOptions) {
      this.eagerOptions(eagerOptions);
    }

    return this;
  };

  /**
   * @param {function(QueryBuilder):EagerOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.eagerOperationFactory = function eagerOperationFactory(factory) {
    this._eagerOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.findOperationFactory = function findOperationFactory(factory) {
    this._findOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insertOperationFactory = function insertOperationFactory(factory) {
    this._insertOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.updateOperationFactory = function updateOperationFactory(factory) {
    this._updateOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.patchOperationFactory = function patchOperationFactory(factory) {
    this._patchOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.deleteOperationFactory = function deleteOperationFactory(factory) {
    this._deleteOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.relateOperationFactory = function relateOperationFactory(factory) {
    this._relateOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.unrelateOperationFactory = function unrelateOperationFactory(factory) {
    this._unrelateOperationFactory = factory;
    return this;
  };

  /**
   * @param {string|RelationExpression} exp
   * @param {Object.<string, function(QueryBuilder)>=} filters
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.eager = function eager(exp, filters) {
    this._eagerExpression = exp || null;

    if (_lodash2.default.isString(this._eagerExpression)) {
      this._eagerExpression = _RelationExpression2.default.parse(this._eagerExpression);
    }

    if (_lodash2.default.isObject(filters)) {
      this._eagerExpression.filters = filters;
    }

    checkEager(this);
    return this;
  };

  /**
   * @param {string|RelationExpression} exp
   * @param {Object.<string, function(QueryBuilder)>=} filters
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.mergeEager = function mergeEager(exp, filters) {
    if (!this._eagerExpression) {
      return this.eager(exp, filters);
    }

    var expr = _RelationExpression2.default.parse(exp);

    if (_lodash2.default.isObject(filters)) {
      expr.filters = filters;
    }

    this._eagerExpression = this._eagerExpression.merge(expr);

    checkEager(this);
    return this;
  };

  /**
   * @param {string|RelationExpression} exp
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.allowEager = function allowEager(exp) {
    this._allowedEagerExpression = exp || null;

    if (_lodash2.default.isString(this._allowedEagerExpression)) {
      this._allowedEagerExpression = _RelationExpression2.default.parse(this._allowedEagerExpression);
    }

    checkEager(this);
    return this;
  };

  /**
   * @param {string|RelationExpression} path
   * @param {function(QueryBuilder)} modifier
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.modifyEager = function modifyEager(path, modifier) {
    this._eagerFilterExpressions.push({
      path: path,
      filter: modifier
    });

    return this;
  };

  QueryBuilder.prototype.filterEager = function filterEager() {
    return this.modifyEager.apply(this, arguments);
  };

  /**
   * @param {string|RelationExpression} exp
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.allowInsert = function allowInsert(exp) {
    this._allowedInsertExpression = exp || null;

    if (_lodash2.default.isString(this._allowedInsertExpression)) {
      this._allowedInsertExpression = _RelationExpression2.default.parse(this._allowedInsertExpression);
    }

    return this;
  };

  /**
   * @param {object} opt
   * @return {QueryBuilder}
   */


  QueryBuilder.prototype.eagerOptions = function eagerOptions(opt) {
    this._eagerOperationOptions = (0, _assign2.default)({}, this._eagerOperationOptions, opt);
    var opIdx = this.indexOfOperation(_EagerOperation2.default);

    if (opIdx !== -1) {
      this._operations[opIdx] = this._operations[opIdx].clone({
        opt: this._eagerOperationOptions
      });
    }

    return this;
  };

  /**
   * @param {object} opt
   * @return {QueryBuilder}
   */


  QueryBuilder.prototype.findOptions = function findOptions(opt) {
    this._findOperationOptions = (0, _assign2.default)({}, this._findOperationOptions, opt);
    var opIdx = this.indexOfOperation(_FindOperation2.default);

    if (opIdx !== -1) {
      this._operations[opIdx] = this._operations[opIdx].clone({
        opt: this._findOperationOptions
      });
    }

    return this;
  };

  /**
   * @returns {Constructor.<Model>}
   */


  QueryBuilder.prototype.modelClass = function modelClass() {
    return this._modelClass;
  };

  /**
   * @returns {boolean}
   */


  QueryBuilder.prototype.isFindQuery = function isFindQuery() {
    return !_lodash2.default.some(this._operations, function (method) {
      return method.isWriteOperation;
    }) && !this._explicitRejectValue;
  };

  /**
   * @returns {string}
   */


  QueryBuilder.prototype.toString = function toString() {
    return this.build().toString();
  };

  /**
   * @returns {string}
   */


  QueryBuilder.prototype.toSql = function toSql() {
    return this.toString();
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.clone = function clone() {
    var builder = new this.constructor(this._modelClass);
    this.baseCloneInto(builder);

    builder._explicitRejectValue = this._explicitRejectValue;
    builder._explicitResolveValue = this._explicitResolveValue;

    builder._eagerExpression = this._eagerExpression;
    builder._eagerFilterExpressions = this._eagerFilterExpressions.slice();

    builder._allowedEagerExpression = this._allowedEagerExpression;
    builder._allowedInsertExpression = this._allowedInsertExpression;

    builder._findOperationOptions = this._findOperationOptions;
    builder._eagerOperationOptions = this._eagerOperationOptions;

    builder._findOperationFactory = this._findOperationFactory;
    builder._insertOperationFactory = this._insertOperationFactory;
    builder._updateOperationFactory = this._updateOperationFactory;
    builder._patchOperationFactory = this._patchOperationFactory;
    builder._relateOperationFactory = this._relateOperationFactory;
    builder._unrelateOperationFactory = this._unrelateOperationFactory;
    builder._deleteOperationFactory = this._deleteOperationFactory;
    builder._eagerOperationFactory = this._eagerOperationFactory;

    return builder;
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.clearEager = function clearEager() {
    this._eagerExpression = null;
    this._eagerFilterExpressions = [];
    return this;
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.clearReject = function clearReject() {
    this._explicitRejectValue = null;
    return this;
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.clearResolve = function clearResolve() {
    this._explicitResolveValue = null;
    return this;
  };

  /**
   * @param {function=} successHandler
   * @param {function=} errorHandler
   * @returns {Promise}
   */


  QueryBuilder.prototype.then = function then(successHandler, errorHandler) {
    var promise = this.execute();
    return promise.then.apply(promise, arguments);
  };

  /**
   * @param {function} mapper
   * @returns {Promise}
   */


  QueryBuilder.prototype.map = function map(mapper) {
    var promise = this.execute();
    return promise.map.apply(promise, arguments);
  };

  /**
   * @param {function} errorHandler
   * @returns {Promise}
   */


  QueryBuilder.prototype.catch = function _catch(errorHandler) {
    var promise = this.execute();
    return promise.catch.apply(promise, arguments);
  };

  /**
   * @param {*} returnValue
   * @returns {Promise}
   */


  QueryBuilder.prototype.return = function _return(returnValue) {
    var promise = this.execute();
    return promise.return.apply(promise, arguments);
  };

  /**
   * @param {*} context
   * @returns {Promise}
   */


  QueryBuilder.prototype.bind = function bind(context) {
    var promise = this.execute();
    return promise.bind.apply(promise, arguments);
  };

  /**
   * @param {function} callback
   * @returns {Promise}
   */


  QueryBuilder.prototype.asCallback = function asCallback(callback) {
    var promise = this.execute();
    return promise.asCallback.apply(promise, arguments);
  };

  /**
   * @param {function} callback
   * @returns {Promise}
   */


  QueryBuilder.prototype.nodeify = function nodeify(callback) {
    var promise = this.execute();
    return promise.nodeify.apply(promise, arguments);
  };

  /**
   * @returns {Promise}
   */


  QueryBuilder.prototype.resultSize = function resultSize() {
    var knex = this.knex();

    // orderBy is useless here and it can make things a lot slower (at least with postgresql 9.3).
    // Remove it from the count query. We also remove the offset and limit
    var query = this.clone().clear(/orderBy|offset|limit/).build();
    var rawQuery = knex.raw(query).wrap('(', ') as temp');
    var countQuery = knex.count('* as count').from(rawQuery);

    return countQuery.then(function (result) {
      return result[0] ? result[0].count : 0;
    });
  };

  /**
   * @param {number} page
   * @param {number} pageSize
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.page = function page(_page, pageSize) {
    return this.range(_page * pageSize, (_page + 1) * pageSize - 1);
  };

  /**
   * @param {number} start
   * @param {number} end
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.range = function range(start, end) {
    var _this2 = this;

    var resultSizePromise = void 0;

    return this.limit(end - start + 1).offset(start).runBefore(function () {
      // Don't return the promise so that it is executed
      // in parallel with the actual query.
      resultSizePromise = _this2.resultSize();
      return null;
    }).runAfter(function (results) {
      // Now that the actual query is finished, wait until the
      // result size has been calculated.
      return _bluebird2.default.all([results, resultSizePromise]);
    }).runAfter(function (arr) {
      return {
        results: arr[0],
        total: _lodash2.default.parseInt(arr[1])
      };
    });
  };

  /**
   * @returns {knex.QueryBuilder}
   */
  QueryBuilder.prototype.build = function build() {
    // Take a clone so that we don't modify this instance during build.
    var builder = this.clone();

    if (builder.isFindQuery()) {
      // If no write operations have been called at this point this query is a
      // find query and we need to call the custom find implementation.
      builder._callFindOperation();
    }

    if (builder._eagerExpression) {
      builder._callEagerFetchOperation();
    }

    // We need to build the builder even if a query executor operation
    // has been called so that the onBuild hooks get called.
    var knexBuilder = _build(builder);
    var queryExecutorOperation = builder._queryExecutorOperation();

    if (queryExecutorOperation) {
      // If the query executor is set, we build the builder that it returns.
      return queryExecutorOperation.queryExecutor(builder).build();
    } else {
      return knexBuilder;
    }
  };

  /**
   * @returns {Promise}
   */


  QueryBuilder.prototype.execute = function execute() {
    // Take a clone so that we don't modify this instance during execution.
    var builder = this.clone();
    var promiseCtx = { builder: builder };
    var promise = _bluebird2.default.bind(promiseCtx);
    var context = builder.context() || {};
    var internalContext = builder.internalContext();

    if (builder.isFindQuery()) {
      // If no write operations have been called at this point this query is a
      // find query and we need to call the custom find implementation.
      builder._callFindOperation();
    }

    if (builder._eagerExpression) {
      builder._callEagerFetchOperation();
    }

    promise = chainBeforeOperations(promise, builder._operations);
    promise = chainHooks(promise, context.runBefore);
    promise = chainHooks(promise, internalContext.runBefore);
    promise = chainBeforeInternalOperations(promise, builder._operations);

    // Resolve all before hooks before building and executing the query
    // and the rest of the hooks.
    return promise.then(function () {
      var promiseCtx = this;
      var builder = promiseCtx.builder;

      var promise = null;
      var knexBuilder = _build(builder);
      var queryExecutorOperation = builder._queryExecutorOperation();

      if (builder._explicitRejectValue) {
        promise = _bluebird2.default.reject(builder._explicitRejectValue).bind(promiseCtx);
      } else if (builder._explicitResolveValue) {
        promise = _bluebird2.default.resolve(builder._explicitResolveValue).bind(promiseCtx);
      } else if (queryExecutorOperation) {
        promise = queryExecutorOperation.queryExecutor(builder).bind(promiseCtx);
      } else {
        promise = knexBuilder.bind(promiseCtx);
        promise = chainRawResultOperations(promise, builder._operations);
        promise = promise.then(createModels);
      }

      promise = chainAfterQueryOperations(promise, builder._operations);
      promise = chainAfterInternalOperations(promise, builder._operations);
      promise = chainHooks(promise, context.runAfter);
      promise = chainHooks(promise, internalContext.runAfter);
      promise = chainAfterOperations(promise, builder._operations);

      return promise;
    });
  };

  /**
   * @private
   * @returns {QueryBuilderOperation}
   */


  QueryBuilder.prototype._queryExecutorOperation = function _queryExecutorOperation() {
    for (var i = 0, l = this._operations.length; i < l; ++i) {
      var op = this._operations[i];

      if (op.hasQueryExecutor()) {
        return op;
      }
    }

    return null;
  };

  /**
   * @private
   */


  QueryBuilder.prototype._callFindOperation = function _callFindOperation() {
    if (!this.has(_FindOperation2.default)) {
      var operation = this._findOperationFactory(this);

      operation.opt = _lodash2.default.merge(operation.opt, this._findOperationOptions);

      this.callQueryBuilderOperation(operation, [], /* pushFront = */true);
    }
  };

  /**
   * @private
   */


  QueryBuilder.prototype._callEagerFetchOperation = function _callEagerFetchOperation() {
    if (!this.has(_EagerOperation2.default) && this._eagerExpression) {
      var operation = this._eagerOperationFactory(this);

      operation.opt = _lodash2.default.merge(operation.opt, this._modelClass.defaultEagerOptions, this._eagerOperationOptions);

      this.callQueryBuilderOperation(operation, [this._eagerExpression, this._eagerFilterExpressions]);
    }
  };

  /**
   * @param {string} propertyName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.pluck = function pluck(propertyName) {
    return this.runAfter(function (result) {
      if (_lodash2.default.isArray(result)) {
        return _lodash2.default.map(result, propertyName);
      } else {
        return result;
      }
    });
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.first = function first() {
    return this.runAfter(function (result) {
      if (Array.isArray(result)) {
        return result[0];
      } else {
        return result;
      }
    });
  };

  /**
   * @returns {boolean}
   */


  QueryBuilder.prototype.hasSelection = function hasSelection(selection) {
    var explicit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var table = this.modelClass().tableName;
    var noSelectStatements = true;

    for (var i = 0, l = this._operations.length; i < l; ++i) {
      var op = this._operations[i];

      if (op instanceof _SelectOperation2.default) {
        noSelectStatements = false;

        if (op.hasSelection(table, selection)) {
          return true;
        }
      }
    }

    if (noSelectStatements && !explicit) {
      // Implicit `select *`.
      return true;
    } else {
      return false;
    }
  };

  /**
   * @param {Constructor.<Model>=} modelClass
   * @param {function(Model, Model, string)} traverser
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.traverse = function traverse(modelClass, traverser) {
    var _this3 = this;

    if (_lodash2.default.isUndefined(traverser)) {
      traverser = modelClass;
      modelClass = null;
    }

    return this.runAfter(function (result) {
      _this3._modelClass.traverse(modelClass, result, traverser);
      return result;
    });
  };

  /**
   * @param {Constructor.<Model>=} modelClass
   * @param {Array.<string>} properties
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.pick = function pick(modelClass, properties) {
    if (_lodash2.default.isUndefined(properties)) {
      properties = modelClass;
      modelClass = null;
    }

    properties = _lodash2.default.reduce(properties, function (obj, prop) {
      obj[prop] = true;
      return obj;
    }, {});

    return this.traverse(modelClass, function (model) {
      model.$pick(properties);
    });
  };

  /**
   * @param {Constructor.<Model>=} modelClass
   * @param {Array.<string>} properties
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.omit = function omit(modelClass, properties) {
    if (_lodash2.default.isUndefined(properties)) {
      properties = modelClass;
      modelClass = null;
    }

    // Turn the properties into a hash for performance.
    properties = _lodash2.default.reduce(properties, function (obj, prop) {
      obj[prop] = true;
      return obj;
    }, {});

    return this.traverse(modelClass, function (model) {
      model.$omit(properties);
    });
  };

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.joinRelation = function joinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.innerJoinRelation = function innerJoinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.outerJoinRelation = function outerJoinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.leftJoinRelation = function leftJoinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.leftOuterJoinRelation = function leftOuterJoinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.rightJoinRelation = function rightJoinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.rightOuterJoinRelation = function rightOuterJoinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.fullOuterJoinRelation = function fullOuterJoinRelation(relationName) {};

  /**
   * @param {string|number|Array.<string|number>} id
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.findById = function findById(id) {
    return this.whereComposite(this._modelClass.getFullIdColumn(), id).first();
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.withSchema = function withSchema(schema) {
    this.internalContext().onBuild.push(function (builder) {
      if (!builder.has(/withSchema/)) {
        // Need to push this operation to the front because knex doesn't use the
        // schema for operations called before `withSchema`.
        builder.callKnexQueryBuilderOperation('withSchema', [schema], true);
      }
    });

    return this;
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.debug = function debug() {
    this.internalContext().onBuild.push(function (builder) {
      builder.callKnexQueryBuilderOperation('debug', []);
    });

    return this;
  };

  /**
   * @param {Object|Model|Array.<Object>|Array.<Model>} modelsOrObjects
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insert = function insert(modelsOrObjects) {
    var insertOperation = this._insertOperationFactory(this);
    return this.callQueryBuilderOperation(insertOperation, [modelsOrObjects]);
  };

  /**
   * @param {Object|Model|Array.<Object>|Array.<Model>} modelsOrObjects
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insertAndFetch = function insertAndFetch(modelsOrObjects) {
    var insertAndFetchOperation = new _InsertAndFetchOperation2.default('insertAndFetch', {
      delegate: this._insertOperationFactory(this)
    });

    return this.callQueryBuilderOperation(insertAndFetchOperation, [modelsOrObjects]);
  };

  /**
   * @param {Object|Model|Array.<Object>|Array.<Model>} modelsOrObjects
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insertGraph = function insertGraph(modelsOrObjects) {
    var insertGraphOperation = new _InsertGraphOperation2.default('insertGraph', {
      delegate: this._insertOperationFactory(this)
    });

    return this.callQueryBuilderOperation(insertGraphOperation, [modelsOrObjects]);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insertWithRelated = function insertWithRelated() {
    return this.insertGraph.apply(this, arguments);
  };

  /**
   * @param {Object|Model|Array.<Object>|Array.<Model>} modelsOrObjects
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insertGraphAndFetch = function insertGraphAndFetch(modelsOrObjects) {
    var insertGraphAndFetchOperation = new _InsertGraphAndFetchOperation2.default('insertGraphAndFetch', {
      delegate: new _InsertGraphOperation2.default('insertGraph', {
        delegate: this._insertOperationFactory(this)
      })
    });

    return this.callQueryBuilderOperation(insertGraphAndFetchOperation, [modelsOrObjects]);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insertWithRelatedAndFetch = function insertWithRelatedAndFetch() {
    return this.insertGraphAndFetch.apply(this, arguments);
  };

  /**
   * @param {Model|Object=} modelOrObject
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.update = function update(modelOrObject) {
    var updateOperation = this._updateOperationFactory(this);
    return this.callQueryBuilderOperation(updateOperation, [modelOrObject]);
  };

  /**
   * @param {Model|Object=} modelOrObject
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.updateAndFetch = function updateAndFetch(modelOrObject) {
    var delegateOperation = this._updateOperationFactory(this);

    if (!(delegateOperation.instance instanceof this._modelClass)) {
      throw new Error('updateAndFetch can only be called for instance operations');
    }

    var updateAndFetch = new _UpdateAndFetchOperation2.default('updateAndFetch', {
      delegate: delegateOperation
    });

    return this.callQueryBuilderOperation(updateAndFetch, [delegateOperation.instance.$id(), modelOrObject]);
  };

  /**
   * @param {number|string|Array.<number|string>} id
   * @param {Model|Object=} modelOrObject
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.updateAndFetchById = function updateAndFetchById(id, modelOrObject) {
    var updateAndFetch = new _UpdateAndFetchOperation2.default('updateAndFetch', {
      delegate: this._updateOperationFactory(this)
    });

    return this.callQueryBuilderOperation(updateAndFetch, [id, modelOrObject]);
  };

  /**
   * @param {Model|Object=} modelOrObject
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.patch = function patch(modelOrObject) {
    var patchOperation = this._patchOperationFactory(this);
    return this.callQueryBuilderOperation(patchOperation, [modelOrObject]);
  };

  /**
   * @param {Model|Object=} modelOrObject
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.patchAndFetch = function patchAndFetch(modelOrObject) {
    var delegateOperation = this._patchOperationFactory(this);

    if (!(delegateOperation.instance instanceof this._modelClass)) {
      throw new Error('patchAndFetch can only be called for instance operations');
    }

    var patchAndFetch = new _UpdateAndFetchOperation2.default('patchAndFetch', {
      delegate: delegateOperation
    });

    return this.callQueryBuilderOperation(patchAndFetch, [delegateOperation.instance.$id(), modelOrObject]);
  };

  /**
   * @param {number|string|Array.<number|string>} id
   * @param {Model|Object=} modelOrObject
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.patchAndFetchById = function patchAndFetchById(id, modelOrObject) {
    var patchAndFetch = new _UpdateAndFetchOperation2.default('patchAndFetch', {
      delegate: this._patchOperationFactory(this)
    });

    return this.callQueryBuilderOperation(patchAndFetch, [id, modelOrObject]);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.delete = function _delete() {
    var deleteOperation = this._deleteOperationFactory(this);
    return this.callQueryBuilderOperation(deleteOperation, []);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.del = function del() {
    return this.delete();
  };

  /**
   * @param {number|string|Array.<number|string>} id
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.deleteById = function deleteById(id) {
    return this.delete().whereComposite(this._modelClass.getFullIdColumn(), id);
  };

  /**
   * @param {number|string|object|Array.<number|string>|Array.<Array.<number|string>>|Array.<object>} ids
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.relate = function relate(ids) {
    var relateOperation = this._relateOperationFactory(this);
    return this.callQueryBuilderOperation(relateOperation, [ids]);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.unrelate = function unrelate() {
    var unrelateOperation = this._unrelateOperationFactory(this);
    return this.callQueryBuilderOperation(unrelateOperation, []);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.increment = function increment(propertyName, howMuch) {
    var patch = {};
    var columnName = this._modelClass.propertyNameToColumnName(propertyName);
    patch[propertyName] = this.knex().raw('?? + ?', [columnName, howMuch]);
    return this.patch(patch);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.decrement = function decrement(propertyName, howMuch) {
    var patch = {};
    var columnName = this._modelClass.propertyNameToColumnName(propertyName);
    patch[propertyName] = this.knex().raw('?? - ?', [columnName, howMuch]);
    return this.patch(patch);
  };

  return QueryBuilder;
}(_QueryBuilderBase3.default), (_applyDecoratedDescriptor(_class.prototype, 'runBefore', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'runBefore'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onBuild', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'onBuild'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'runAfter', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'runAfter'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'joinRelation', [_dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'joinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'innerJoinRelation', [_dec5], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'innerJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'outerJoinRelation', [_dec6], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'outerJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'leftJoinRelation', [_dec7], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'leftJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'leftOuterJoinRelation', [_dec8], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'leftOuterJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rightJoinRelation', [_dec9], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'rightJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rightOuterJoinRelation', [_dec10], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'rightOuterJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fullOuterJoinRelation', [_dec11], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fullOuterJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'insert', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'insert'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'insertAndFetch', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'insertAndFetch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'insertGraph', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'insertGraph'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'insertGraphAndFetch', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'insertGraphAndFetch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'update', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'update'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateAndFetch', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'updateAndFetch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateAndFetchById', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'updateAndFetchById'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'patch', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'patch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'patchAndFetch', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'patchAndFetch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'patchAndFetchById', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'patchAndFetchById'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'delete', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'delete'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'relate', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'relate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'unrelate', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'unrelate'), _class.prototype)), _class));
exports.default = QueryBuilder;


function writeQueryOperation(target, property, descriptor) {
  var func = descriptor.value;

  descriptor.value = function decorator$writeQueryOperation() {
    if (!this.isFindQuery()) {
      return this.reject(new Error('Double call to a write method. ' + 'You can only call one of the write methods ' + '(insert, update, patch, delete, relate, unrelate, increment, decrement) ' + 'and only once per query builder.'));
    }

    try {
      func.apply(this, arguments);
    } catch (err) {
      this.reject(err);
    }

    return this;
  };
}

function checkEager(builder) {
  if (builder._eagerExpression && builder._allowedEagerExpression) {
    if (!builder._allowedEagerExpression.isSubExpression(builder._eagerExpression)) {
      builder.reject(new _ValidationError2.default({ eager: 'eager expression not allowed' }));
    }
  }
}

function createModels(result) {
  var builder = this.builder;

  if (result === null || result === undefined) {
    return null;
  }

  if (Array.isArray(result)) {
    if (result.length && (0, _typeof3.default)(result[0]) === 'object' && !(result[0] instanceof builder._modelClass)) {
      for (var i = 0, l = result.length; i < l; ++i) {
        result[i] = builder._modelClass.fromDatabaseJson(result[i]);
      }
    }
  } else if ((typeof result === 'undefined' ? 'undefined' : (0, _typeof3.default)(result)) === 'object' && !(result instanceof builder._modelClass)) {
    result = builder._modelClass.fromDatabaseJson(result);
  }

  return result;
}

function _build(builder) {
  var context = builder.context() || {};
  var internalContext = builder.internalContext();
  var knexBuilder = builder.knex().queryBuilder();

  callOnBuildHooks(builder, context.onBuild);
  callOnBuildHooks(builder, internalContext.onBuild);

  knexBuilder = builder.buildInto(knexBuilder);

  if (!builder.has(_QueryBuilderBase3.default.FromSelector)) {
    var table = builder.modelClass().tableName;

    // Set the table only if it hasn't been explicitly set yet.
    knexBuilder.table(table);

    if (!builder.has(_QueryBuilderBase3.default.SelectSelector)) {
      knexBuilder.select(table + '.*');
    }
  }

  return knexBuilder;
}

function chainHooks(promise, func) {
  if (_lodash2.default.isFunction(func)) {
    promise = promise.then(function (result) {
      return func.call(this.builder, result, this.builder);
    });
  } else if (Array.isArray(func)) {
    func.forEach(function (func) {
      promise = promise.then(function (result) {
        return func.call(this.builder, result, this.builder);
      });
    });
  }

  return promise;
}

function callOnBuildHooks(builder, func) {
  if (_lodash2.default.isFunction(func)) {
    func.call(builder, builder);
  } else if (_lodash2.default.isArray(func)) {
    for (var i = 0, l = func.length; i < l; ++i) {
      func[i].call(builder, builder);
    }
  }
}

function createHookCaller(hook) {
  var hasMethod = 'has' + _lodash2.default.upperFirst(hook);

  // Compile the caller function for (measured) performance boost.
  var caller = new Function('promise', 'op', '\n    if (op.' + hasMethod + '()) {\n      return promise.then(function (result) {\n        return op.' + hook + '(this.builder, result);\n      });\n    } else {\n      return promise;\n    }\n  ');

  return function (promise, operations) {
    for (var i = 0, l = operations.length; i < l; ++i) {
      promise = caller(promise, operations[i]);
    }

    return promise;
  };
}

function createOperationFactory(OperationClass, name, options) {
  return function () {
    return new OperationClass(name, options);
  };
}

var chainBeforeOperations = createHookCaller('onBefore');
var chainBeforeInternalOperations = createHookCaller('onBeforeInternal');
var chainRawResultOperations = createHookCaller('onRawResult');
var chainAfterQueryOperations = createHookCaller('onAfterQuery');
var chainAfterInternalOperations = createHookCaller('onAfterInternal');
var chainAfterOperations = createHookCaller('onAfter');

var findOperationFactory = createOperationFactory(_FindOperation2.default, 'find');
var insertOperationFactory = createOperationFactory(_InsertOperation2.default, 'insert');
var updateOperationFactory = createOperationFactory(_UpdateOperation2.default, 'update');
var patchOperationFactory = createOperationFactory(_UpdateOperation2.default, 'patch', { modelOptions: { patch: true } });
var relateOperationFactory = createOperationFactory(_QueryBuilderOperation2.default, 'relate');
var unrelateOperationFactory = createOperationFactory(_QueryBuilderOperation2.default, 'unrelate');
var deleteOperationFactory = createOperationFactory(_DeleteOperation2.default, 'delete');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlF1ZXJ5QnVpbGRlci5qcyJdLCJuYW1lcyI6WyJRdWVyeUJ1aWxkZXIiLCJqb2luT3BlcmF0aW9uIiwibW9kZWxDbGFzcyIsImtuZXgiLCJfbW9kZWxDbGFzcyIsIl9leHBsaWNpdFJlamVjdFZhbHVlIiwiX2V4cGxpY2l0UmVzb2x2ZVZhbHVlIiwiX2VhZ2VyRXhwcmVzc2lvbiIsIl9lYWdlckZpbHRlckV4cHJlc3Npb25zIiwiX2FsbG93ZWRFYWdlckV4cHJlc3Npb24iLCJfYWxsb3dlZEluc2VydEV4cHJlc3Npb24iLCJfZmluZE9wZXJhdGlvbk9wdGlvbnMiLCJfZWFnZXJPcGVyYXRpb25PcHRpb25zIiwiX2ZpbmRPcGVyYXRpb25GYWN0b3J5IiwiZmluZE9wZXJhdGlvbkZhY3RvcnkiLCJfaW5zZXJ0T3BlcmF0aW9uRmFjdG9yeSIsImluc2VydE9wZXJhdGlvbkZhY3RvcnkiLCJfdXBkYXRlT3BlcmF0aW9uRmFjdG9yeSIsInVwZGF0ZU9wZXJhdGlvbkZhY3RvcnkiLCJfcGF0Y2hPcGVyYXRpb25GYWN0b3J5IiwicGF0Y2hPcGVyYXRpb25GYWN0b3J5IiwiX3JlbGF0ZU9wZXJhdGlvbkZhY3RvcnkiLCJyZWxhdGVPcGVyYXRpb25GYWN0b3J5IiwiX3VucmVsYXRlT3BlcmF0aW9uRmFjdG9yeSIsInVucmVsYXRlT3BlcmF0aW9uRmFjdG9yeSIsIl9kZWxldGVPcGVyYXRpb25GYWN0b3J5IiwiZGVsZXRlT3BlcmF0aW9uRmFjdG9yeSIsIl9lYWdlck9wZXJhdGlvbkZhY3RvcnkiLCJkZWZhdWx0RWFnZXJBbGdvcml0aG0iLCJmb3JDbGFzcyIsImNoaWxkUXVlcnlPZiIsInF1ZXJ5IiwiaW50ZXJuYWxDb250ZXh0IiwicmVqZWN0IiwiZXJyb3IiLCJyZXNvbHZlIiwidmFsdWUiLCJpc0V4ZWN1dGFibGUiLCJoYXNFeGVjdXRvciIsIl9xdWVyeUV4ZWN1dG9yT3BlcmF0aW9uIiwicnVuQmVmb3JlIiwib25CdWlsZCIsInJ1bkFmdGVyIiwiZWFnZXJBbGdvcml0aG0iLCJhbGdvcml0aG0iLCJlYWdlck9wdGlvbnMiLCJlYWdlck9wZXJhdGlvbkZhY3RvcnkiLCJmYWN0b3J5IiwiZWFnZXIiLCJleHAiLCJmaWx0ZXJzIiwiaXNTdHJpbmciLCJwYXJzZSIsImlzT2JqZWN0IiwiY2hlY2tFYWdlciIsIm1lcmdlRWFnZXIiLCJleHByIiwibWVyZ2UiLCJhbGxvd0VhZ2VyIiwibW9kaWZ5RWFnZXIiLCJwYXRoIiwibW9kaWZpZXIiLCJwdXNoIiwiZmlsdGVyIiwiZmlsdGVyRWFnZXIiLCJhbGxvd0luc2VydCIsIm9wdCIsIm9wSWR4IiwiaW5kZXhPZk9wZXJhdGlvbiIsIl9vcGVyYXRpb25zIiwiY2xvbmUiLCJmaW5kT3B0aW9ucyIsImlzRmluZFF1ZXJ5Iiwic29tZSIsIm1ldGhvZCIsImlzV3JpdGVPcGVyYXRpb24iLCJ0b1N0cmluZyIsImJ1aWxkIiwidG9TcWwiLCJidWlsZGVyIiwiY29uc3RydWN0b3IiLCJiYXNlQ2xvbmVJbnRvIiwic2xpY2UiLCJjbGVhckVhZ2VyIiwiY2xlYXJSZWplY3QiLCJjbGVhclJlc29sdmUiLCJ0aGVuIiwic3VjY2Vzc0hhbmRsZXIiLCJlcnJvckhhbmRsZXIiLCJwcm9taXNlIiwiZXhlY3V0ZSIsImFwcGx5IiwiYXJndW1lbnRzIiwibWFwIiwibWFwcGVyIiwiY2F0Y2giLCJyZXR1cm4iLCJyZXR1cm5WYWx1ZSIsImJpbmQiLCJjb250ZXh0IiwiYXNDYWxsYmFjayIsImNhbGxiYWNrIiwibm9kZWlmeSIsInJlc3VsdFNpemUiLCJjbGVhciIsInJhd1F1ZXJ5IiwicmF3Iiwid3JhcCIsImNvdW50UXVlcnkiLCJjb3VudCIsImZyb20iLCJyZXN1bHQiLCJwYWdlIiwicGFnZVNpemUiLCJyYW5nZSIsInN0YXJ0IiwiZW5kIiwicmVzdWx0U2l6ZVByb21pc2UiLCJsaW1pdCIsIm9mZnNldCIsImFsbCIsInJlc3VsdHMiLCJhcnIiLCJ0b3RhbCIsInBhcnNlSW50IiwiX2NhbGxGaW5kT3BlcmF0aW9uIiwiX2NhbGxFYWdlckZldGNoT3BlcmF0aW9uIiwia25leEJ1aWxkZXIiLCJxdWVyeUV4ZWN1dG9yT3BlcmF0aW9uIiwicXVlcnlFeGVjdXRvciIsInByb21pc2VDdHgiLCJjaGFpbkJlZm9yZU9wZXJhdGlvbnMiLCJjaGFpbkhvb2tzIiwiY2hhaW5CZWZvcmVJbnRlcm5hbE9wZXJhdGlvbnMiLCJjaGFpblJhd1Jlc3VsdE9wZXJhdGlvbnMiLCJjcmVhdGVNb2RlbHMiLCJjaGFpbkFmdGVyUXVlcnlPcGVyYXRpb25zIiwiY2hhaW5BZnRlckludGVybmFsT3BlcmF0aW9ucyIsImNoYWluQWZ0ZXJPcGVyYXRpb25zIiwiaSIsImwiLCJsZW5ndGgiLCJvcCIsImhhc1F1ZXJ5RXhlY3V0b3IiLCJoYXMiLCJvcGVyYXRpb24iLCJjYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uIiwiZGVmYXVsdEVhZ2VyT3B0aW9ucyIsInBsdWNrIiwicHJvcGVydHlOYW1lIiwiaXNBcnJheSIsImZpcnN0IiwiQXJyYXkiLCJoYXNTZWxlY3Rpb24iLCJzZWxlY3Rpb24iLCJleHBsaWNpdCIsInRhYmxlIiwidGFibGVOYW1lIiwibm9TZWxlY3RTdGF0ZW1lbnRzIiwidHJhdmVyc2UiLCJ0cmF2ZXJzZXIiLCJpc1VuZGVmaW5lZCIsInBpY2siLCJwcm9wZXJ0aWVzIiwicmVkdWNlIiwib2JqIiwicHJvcCIsIm1vZGVsIiwiJHBpY2siLCJvbWl0IiwiJG9taXQiLCJqb2luUmVsYXRpb24iLCJyZWxhdGlvbk5hbWUiLCJpbm5lckpvaW5SZWxhdGlvbiIsIm91dGVySm9pblJlbGF0aW9uIiwibGVmdEpvaW5SZWxhdGlvbiIsImxlZnRPdXRlckpvaW5SZWxhdGlvbiIsInJpZ2h0Sm9pblJlbGF0aW9uIiwicmlnaHRPdXRlckpvaW5SZWxhdGlvbiIsImZ1bGxPdXRlckpvaW5SZWxhdGlvbiIsImZpbmRCeUlkIiwiaWQiLCJ3aGVyZUNvbXBvc2l0ZSIsImdldEZ1bGxJZENvbHVtbiIsIndpdGhTY2hlbWEiLCJzY2hlbWEiLCJjYWxsS25leFF1ZXJ5QnVpbGRlck9wZXJhdGlvbiIsImRlYnVnIiwiaW5zZXJ0IiwibW9kZWxzT3JPYmplY3RzIiwiaW5zZXJ0T3BlcmF0aW9uIiwiaW5zZXJ0QW5kRmV0Y2giLCJpbnNlcnRBbmRGZXRjaE9wZXJhdGlvbiIsImRlbGVnYXRlIiwiaW5zZXJ0R3JhcGgiLCJpbnNlcnRHcmFwaE9wZXJhdGlvbiIsImluc2VydFdpdGhSZWxhdGVkIiwiaW5zZXJ0R3JhcGhBbmRGZXRjaCIsImluc2VydEdyYXBoQW5kRmV0Y2hPcGVyYXRpb24iLCJpbnNlcnRXaXRoUmVsYXRlZEFuZEZldGNoIiwidXBkYXRlIiwibW9kZWxPck9iamVjdCIsInVwZGF0ZU9wZXJhdGlvbiIsInVwZGF0ZUFuZEZldGNoIiwiZGVsZWdhdGVPcGVyYXRpb24iLCJpbnN0YW5jZSIsIkVycm9yIiwiJGlkIiwidXBkYXRlQW5kRmV0Y2hCeUlkIiwicGF0Y2giLCJwYXRjaE9wZXJhdGlvbiIsInBhdGNoQW5kRmV0Y2giLCJwYXRjaEFuZEZldGNoQnlJZCIsImRlbGV0ZSIsImRlbGV0ZU9wZXJhdGlvbiIsImRlbCIsImRlbGV0ZUJ5SWQiLCJyZWxhdGUiLCJpZHMiLCJyZWxhdGVPcGVyYXRpb24iLCJ1bnJlbGF0ZSIsInVucmVsYXRlT3BlcmF0aW9uIiwiaW5jcmVtZW50IiwiaG93TXVjaCIsImNvbHVtbk5hbWUiLCJwcm9wZXJ0eU5hbWVUb0NvbHVtbk5hbWUiLCJkZWNyZW1lbnQiLCJ3cml0ZVF1ZXJ5T3BlcmF0aW9uIiwidGFyZ2V0IiwicHJvcGVydHkiLCJkZXNjcmlwdG9yIiwiZnVuYyIsImRlY29yYXRvciR3cml0ZVF1ZXJ5T3BlcmF0aW9uIiwiZXJyIiwiaXNTdWJFeHByZXNzaW9uIiwidW5kZWZpbmVkIiwiZnJvbURhdGFiYXNlSnNvbiIsInF1ZXJ5QnVpbGRlciIsImNhbGxPbkJ1aWxkSG9va3MiLCJidWlsZEludG8iLCJGcm9tU2VsZWN0b3IiLCJTZWxlY3RTZWxlY3RvciIsInNlbGVjdCIsImlzRnVuY3Rpb24iLCJjYWxsIiwiZm9yRWFjaCIsImNyZWF0ZUhvb2tDYWxsZXIiLCJob29rIiwiaGFzTWV0aG9kIiwidXBwZXJGaXJzdCIsImNhbGxlciIsIkZ1bmN0aW9uIiwib3BlcmF0aW9ucyIsImNyZWF0ZU9wZXJhdGlvbkZhY3RvcnkiLCJPcGVyYXRpb25DbGFzcyIsIm5hbWUiLCJvcHRpb25zIiwibW9kZWxPcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFksV0E2RWxCLGtFLFVBT0EsZ0UsVUFPQSxpRSxVQStwQkEscUNBQXNCLGtDQUF3QixFQUFDQyxlQUFlLE1BQWhCLEVBQXhCLENBQXRCLEMsVUFPQSxxQ0FBc0Isa0NBQXdCLEVBQUNBLGVBQWUsV0FBaEIsRUFBeEIsQ0FBdEIsQyxVQU9BLHFDQUFzQixrQ0FBd0IsRUFBQ0EsZUFBZSxXQUFoQixFQUF4QixDQUF0QixDLFVBT0EscUNBQXNCLGtDQUF3QixFQUFDQSxlQUFlLFVBQWhCLEVBQXhCLENBQXRCLEMsVUFPQSxxQ0FBc0Isa0NBQXdCLEVBQUNBLGVBQWUsZUFBaEIsRUFBeEIsQ0FBdEIsQyxVQU9BLHFDQUFzQixrQ0FBd0IsRUFBQ0EsZUFBZSxXQUFoQixFQUF4QixDQUF0QixDLFdBT0EscUNBQXNCLGtDQUF3QixFQUFDQSxlQUFlLGdCQUFoQixFQUF4QixDQUF0QixDLFdBT0EscUNBQXNCLGtDQUF3QixFQUFDQSxlQUFlLGVBQWhCLEVBQXhCLENBQXRCLEM7OztBQXp5QkQsd0JBQVlDLFVBQVosRUFBd0I7QUFBQTs7QUFBQSwrREFDdEIsNkJBQU1BLFdBQVdDLElBQVgs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QS9CO0FBQ0EsSUFBTTNPLHlCQUF5QjJPLGtEQUF3QyxRQUF4QyxDQUEvQjtBQUNBLElBQU16Tyx3QkFBd0J5TyxrREFBd0MsT0FBeEMsRUFBaUQsRUFBQ0ksY0FBYyxFQUFDaEQsT0FBTyxJQUFSLEVBQWYsRUFBakQsQ0FBOUI7QUFDQSxJQUFNM0wseUJBQXlCdU8sd0RBQThDLFFBQTlDLENBQS9CO0FBQ0EsSUFBTXJPLDJCQUEyQnFPLHdEQUE4QyxVQUE5QyxDQUFqQztBQUNBLElBQU1uTyx5QkFBeUJtTyxrREFBd0MsUUFBeEMsQ0FBL0IiLCJmaWxlIjoiUXVlcnlCdWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBxdWVyeUJ1aWxkZXJPcGVyYXRpb24gZnJvbSAnLi9kZWNvcmF0b3JzL3F1ZXJ5QnVpbGRlck9wZXJhdGlvbic7XG5pbXBvcnQgUXVlcnlCdWlsZGVyQ29udGV4dCBmcm9tICcuL1F1ZXJ5QnVpbGRlckNvbnRleHQnO1xuaW1wb3J0IFJlbGF0aW9uRXhwcmVzc2lvbiBmcm9tICcuL1JlbGF0aW9uRXhwcmVzc2lvbic7XG5pbXBvcnQgUXVlcnlCdWlsZGVyQmFzZSBmcm9tICcuL1F1ZXJ5QnVpbGRlckJhc2UnO1xuaW1wb3J0IFZhbGlkYXRpb25FcnJvciBmcm9tICcuLi9tb2RlbC9WYWxpZGF0aW9uRXJyb3InO1xuXG5pbXBvcnQgRmluZE9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvRmluZE9wZXJhdGlvbic7XG5pbXBvcnQgRGVsZXRlT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9EZWxldGVPcGVyYXRpb24nO1xuaW1wb3J0IFVwZGF0ZU9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvVXBkYXRlT3BlcmF0aW9uJztcbmltcG9ydCBJbnNlcnRPcGVyYXRpb24gZnJvbSAnLi9vcGVyYXRpb25zL0luc2VydE9wZXJhdGlvbic7XG5cbmltcG9ydCBJbnNlcnRHcmFwaEFuZEZldGNoT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9JbnNlcnRHcmFwaEFuZEZldGNoT3BlcmF0aW9uJztcbmltcG9ydCBJbnNlcnRBbmRGZXRjaE9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvSW5zZXJ0QW5kRmV0Y2hPcGVyYXRpb24nO1xuaW1wb3J0IFVwZGF0ZUFuZEZldGNoT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9VcGRhdGVBbmRGZXRjaE9wZXJhdGlvbic7XG5pbXBvcnQgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9RdWVyeUJ1aWxkZXJPcGVyYXRpb24nO1xuaW1wb3J0IEpvaW5SZWxhdGlvbk9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvSm9pblJlbGF0aW9uT3BlcmF0aW9uJztcbmltcG9ydCBJbnNlcnRHcmFwaE9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvSW5zZXJ0R3JhcGhPcGVyYXRpb24nO1xuaW1wb3J0IFJ1bkJlZm9yZU9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvUnVuQmVmb3JlT3BlcmF0aW9uJztcbmltcG9ydCBSdW5BZnRlck9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvUnVuQWZ0ZXJPcGVyYXRpb24nO1xuaW1wb3J0IE9uQnVpbGRPcGVyYXRpb24gZnJvbSAnLi9vcGVyYXRpb25zL09uQnVpbGRPcGVyYXRpb24nO1xuaW1wb3J0IFNlbGVjdE9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvU2VsZWN0T3BlcmF0aW9uJztcbmltcG9ydCBFYWdlck9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvRWFnZXJPcGVyYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWVyeUJ1aWxkZXIgZXh0ZW5kcyBRdWVyeUJ1aWxkZXJCYXNlIHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbENsYXNzKSB7XG4gICAgc3VwZXIobW9kZWxDbGFzcy5rbmV4KCksIFF1ZXJ5QnVpbGRlckNvbnRleHQpO1xuXG4gICAgdGhpcy5fbW9kZWxDbGFzcyA9IG1vZGVsQ2xhc3M7XG4gICAgdGhpcy5fZXhwbGljaXRSZWplY3RWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5fZXhwbGljaXRSZXNvbHZlVmFsdWUgPSBudWxsO1xuXG4gICAgdGhpcy5fZWFnZXJFeHByZXNzaW9uID0gbnVsbDtcbiAgICB0aGlzLl9lYWdlckZpbHRlckV4cHJlc3Npb25zID0gW107XG4gICAgdGhpcy5fYWxsb3dlZEVhZ2VyRXhwcmVzc2lvbiA9IG51bGw7XG4gICAgdGhpcy5fYWxsb3dlZEluc2VydEV4cHJlc3Npb24gPSBudWxsO1xuXG4gICAgdGhpcy5fZmluZE9wZXJhdGlvbk9wdGlvbnMgPSB7fTtcbiAgICB0aGlzLl9lYWdlck9wZXJhdGlvbk9wdGlvbnMgPSB7fTtcblxuICAgIHRoaXMuX2ZpbmRPcGVyYXRpb25GYWN0b3J5ID0gZmluZE9wZXJhdGlvbkZhY3Rvcnk7XG4gICAgdGhpcy5faW5zZXJ0T3BlcmF0aW9uRmFjdG9yeSA9IGluc2VydE9wZXJhdGlvbkZhY3Rvcnk7XG4gICAgdGhpcy5fdXBkYXRlT3BlcmF0aW9uRmFjdG9yeSA9IHVwZGF0ZU9wZXJhdGlvbkZhY3Rvcnk7XG4gICAgdGhpcy5fcGF0Y2hPcGVyYXRpb25GYWN0b3J5ID0gcGF0Y2hPcGVyYXRpb25GYWN0b3J5O1xuICAgIHRoaXMuX3JlbGF0ZU9wZXJhdGlvbkZhY3RvcnkgPSByZWxhdGVPcGVyYXRpb25GYWN0b3J5O1xuICAgIHRoaXMuX3VucmVsYXRlT3BlcmF0aW9uRmFjdG9yeSA9IHVucmVsYXRlT3BlcmF0aW9uRmFjdG9yeTtcbiAgICB0aGlzLl9kZWxldGVPcGVyYXRpb25GYWN0b3J5ID0gZGVsZXRlT3BlcmF0aW9uRmFjdG9yeTtcbiAgICB0aGlzLl9lYWdlck9wZXJhdGlvbkZhY3RvcnkgPSBtb2RlbENsYXNzLmRlZmF1bHRFYWdlckFsZ29yaXRobTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge01vZGVsfSBtb2RlbENsYXNzXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBzdGF0aWMgZm9yQ2xhc3MobW9kZWxDbGFzcykge1xuICAgIHJldHVybiBuZXcgdGhpcyhtb2RlbENsYXNzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlckJhc2V9IHF1ZXJ5XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBjaGlsZFF1ZXJ5T2YocXVlcnkpIHtcbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHRoaXMuaW50ZXJuYWxDb250ZXh0KHF1ZXJ5LmludGVybmFsQ29udGV4dCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgcmVqZWN0KGVycm9yKSB7XG4gICAgdGhpcy5fZXhwbGljaXRSZWplY3RWYWx1ZSA9IGVycm9yO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIHJlc29sdmUodmFsdWUpIHtcbiAgICB0aGlzLl9leHBsaWNpdFJlc29sdmVWYWx1ZSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNFeGVjdXRhYmxlKCkge1xuICAgIGNvbnN0IGhhc0V4ZWN1dG9yID0gISF0aGlzLl9xdWVyeUV4ZWN1dG9yT3BlcmF0aW9uKCk7XG4gICAgcmV0dXJuICF0aGlzLl9leHBsaWNpdFJlamVjdFZhbHVlICYmICF0aGlzLl9leHBsaWNpdFJlc29sdmVWYWx1ZSAmJiAhaGFzRXhlY3V0b3I7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbigqLCBRdWVyeUJ1aWxkZXIpfSBydW5CZWZvcmVcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oUnVuQmVmb3JlT3BlcmF0aW9uKVxuICBydW5CZWZvcmUocnVuQmVmb3JlKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFF1ZXJ5QnVpbGRlcil9IG9uQnVpbGRcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oT25CdWlsZE9wZXJhdGlvbilcbiAgb25CdWlsZChvbkJ1aWxkKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE1vZGVsfEFycmF5LjxNb2RlbD4sIFF1ZXJ5QnVpbGRlcil9IHJ1bkFmdGVyXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFJ1bkFmdGVyT3BlcmF0aW9uKVxuICBydW5BZnRlcihydW5BZnRlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbihRdWVyeUJ1aWxkZXIpOkVhZ2VyT3BlcmF0aW9ufSBhbGdvcml0aG1cbiAgICogQHBhcmFtIHtvYmplY3Q9fSBlYWdlck9wdGlvbnNcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGVhZ2VyQWxnb3JpdGhtKGFsZ29yaXRobSwgZWFnZXJPcHRpb25zKSB7XG4gICAgdGhpcy5lYWdlck9wZXJhdGlvbkZhY3RvcnkoYWxnb3JpdGhtKTtcblxuICAgIGlmIChlYWdlck9wdGlvbnMpIHtcbiAgICAgIHRoaXMuZWFnZXJPcHRpb25zKGVhZ2VyT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbihRdWVyeUJ1aWxkZXIpOkVhZ2VyT3BlcmF0aW9ufSBmYWN0b3J5XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBlYWdlck9wZXJhdGlvbkZhY3RvcnkoZmFjdG9yeSkge1xuICAgIHRoaXMuX2VhZ2VyT3BlcmF0aW9uRmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbihRdWVyeUJ1aWxkZXIpOlF1ZXJ5QnVpbGRlck9wZXJhdGlvbn0gZmFjdG9yeVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgZmluZE9wZXJhdGlvbkZhY3RvcnkoZmFjdG9yeSkge1xuICAgIHRoaXMuX2ZpbmRPcGVyYXRpb25GYWN0b3J5ID0gZmFjdG9yeTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFF1ZXJ5QnVpbGRlcik6UXVlcnlCdWlsZGVyT3BlcmF0aW9ufSBmYWN0b3J5XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBpbnNlcnRPcGVyYXRpb25GYWN0b3J5KGZhY3RvcnkpIHtcbiAgICB0aGlzLl9pbnNlcnRPcGVyYXRpb25GYWN0b3J5ID0gZmFjdG9yeTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFF1ZXJ5QnVpbGRlcik6UXVlcnlCdWlsZGVyT3BlcmF0aW9ufSBmYWN0b3J5XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICB1cGRhdGVPcGVyYXRpb25GYWN0b3J5KGZhY3RvcnkpIHtcbiAgICB0aGlzLl91cGRhdGVPcGVyYXRpb25GYWN0b3J5ID0gZmFjdG9yeTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFF1ZXJ5QnVpbGRlcik6UXVlcnlCdWlsZGVyT3BlcmF0aW9ufSBmYWN0b3J5XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBwYXRjaE9wZXJhdGlvbkZhY3RvcnkoZmFjdG9yeSkge1xuICAgIHRoaXMuX3BhdGNoT3BlcmF0aW9uRmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbihRdWVyeUJ1aWxkZXIpOlF1ZXJ5QnVpbGRlck9wZXJhdGlvbn0gZmFjdG9yeVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgZGVsZXRlT3BlcmF0aW9uRmFjdG9yeShmYWN0b3J5KSB7XG4gICAgdGhpcy5fZGVsZXRlT3BlcmF0aW9uRmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbihRdWVyeUJ1aWxkZXIpOlF1ZXJ5QnVpbGRlck9wZXJhdGlvbn0gZmFjdG9yeVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgcmVsYXRlT3BlcmF0aW9uRmFjdG9yeShmYWN0b3J5KSB7XG4gICAgdGhpcy5fcmVsYXRlT3BlcmF0aW9uRmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbihRdWVyeUJ1aWxkZXIpOlF1ZXJ5QnVpbGRlck9wZXJhdGlvbn0gZmFjdG9yeVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgdW5yZWxhdGVPcGVyYXRpb25GYWN0b3J5KGZhY3RvcnkpIHtcbiAgICB0aGlzLl91bnJlbGF0ZU9wZXJhdGlvbkZhY3RvcnkgPSBmYWN0b3J5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlbGF0aW9uRXhwcmVzc2lvbn0gZXhwXG4gICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsIGZ1bmN0aW9uKFF1ZXJ5QnVpbGRlcik+PX0gZmlsdGVyc1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgZWFnZXIoZXhwLCBmaWx0ZXJzKSB7XG4gICAgdGhpcy5fZWFnZXJFeHByZXNzaW9uID0gZXhwIHx8IG51bGw7XG5cbiAgICBpZiAoXy5pc1N0cmluZyh0aGlzLl9lYWdlckV4cHJlc3Npb24pKSB7XG4gICAgICB0aGlzLl9lYWdlckV4cHJlc3Npb24gPSBSZWxhdGlvbkV4cHJlc3Npb24ucGFyc2UodGhpcy5fZWFnZXJFeHByZXNzaW9uKTtcbiAgICB9XG5cbiAgICBpZiAoXy5pc09iamVjdChmaWx0ZXJzKSkge1xuICAgICAgdGhpcy5fZWFnZXJFeHByZXNzaW9uLmZpbHRlcnMgPSBmaWx0ZXJzO1xuICAgIH1cblxuICAgIGNoZWNrRWFnZXIodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVsYXRpb25FeHByZXNzaW9ufSBleHBcbiAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywgZnVuY3Rpb24oUXVlcnlCdWlsZGVyKT49fSBmaWx0ZXJzXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBtZXJnZUVhZ2VyKGV4cCwgZmlsdGVycykge1xuICAgIGlmICghdGhpcy5fZWFnZXJFeHByZXNzaW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWdlcihleHAsIGZpbHRlcnMpO1xuICAgIH1cblxuICAgIGNvbnN0IGV4cHIgPSBSZWxhdGlvbkV4cHJlc3Npb24ucGFyc2UoZXhwKTtcblxuICAgIGlmIChfLmlzT2JqZWN0KGZpbHRlcnMpKSB7XG4gICAgICBleHByLmZpbHRlcnMgPSBmaWx0ZXJzO1xuICAgIH1cblxuICAgIHRoaXMuX2VhZ2VyRXhwcmVzc2lvbiA9IHRoaXMuX2VhZ2VyRXhwcmVzc2lvbi5tZXJnZShleHByKTtcblxuICAgIGNoZWNrRWFnZXIodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVsYXRpb25FeHByZXNzaW9ufSBleHBcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGFsbG93RWFnZXIoZXhwKSB7XG4gICAgdGhpcy5fYWxsb3dlZEVhZ2VyRXhwcmVzc2lvbiA9IGV4cCB8fCBudWxsO1xuXG4gICAgaWYgKF8uaXNTdHJpbmcodGhpcy5fYWxsb3dlZEVhZ2VyRXhwcmVzc2lvbikpIHtcbiAgICAgIHRoaXMuX2FsbG93ZWRFYWdlckV4cHJlc3Npb24gPSBSZWxhdGlvbkV4cHJlc3Npb24ucGFyc2UodGhpcy5fYWxsb3dlZEVhZ2VyRXhwcmVzc2lvbik7XG4gICAgfVxuXG4gICAgY2hlY2tFYWdlcih0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xSZWxhdGlvbkV4cHJlc3Npb259IHBhdGhcbiAgICogQHBhcmFtIHtmdW5jdGlvbihRdWVyeUJ1aWxkZXIpfSBtb2RpZmllclxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgbW9kaWZ5RWFnZXIocGF0aCwgbW9kaWZpZXIpIHtcbiAgICB0aGlzLl9lYWdlckZpbHRlckV4cHJlc3Npb25zLnB1c2goe1xuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIGZpbHRlcjogbW9kaWZpZXJcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZmlsdGVyRWFnZXIoLi4uYXJncykge1xuICAgIHJldHVybiB0aGlzLm1vZGlmeUVhZ2VyKC4uLmFyZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlbGF0aW9uRXhwcmVzc2lvbn0gZXhwXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBhbGxvd0luc2VydChleHApIHtcbiAgICB0aGlzLl9hbGxvd2VkSW5zZXJ0RXhwcmVzc2lvbiA9IGV4cCB8fCBudWxsO1xuXG4gICAgaWYgKF8uaXNTdHJpbmcodGhpcy5fYWxsb3dlZEluc2VydEV4cHJlc3Npb24pKSB7XG4gICAgICB0aGlzLl9hbGxvd2VkSW5zZXJ0RXhwcmVzc2lvbiA9IFJlbGF0aW9uRXhwcmVzc2lvbi5wYXJzZSh0aGlzLl9hbGxvd2VkSW5zZXJ0RXhwcmVzc2lvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdFxuICAgKiBAcmV0dXJuIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBlYWdlck9wdGlvbnMob3B0KSB7XG4gICAgdGhpcy5fZWFnZXJPcGVyYXRpb25PcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fZWFnZXJPcGVyYXRpb25PcHRpb25zLCBvcHQpO1xuICAgIGNvbnN0IG9wSWR4ID0gdGhpcy5pbmRleE9mT3BlcmF0aW9uKEVhZ2VyT3BlcmF0aW9uKTtcblxuICAgIGlmIChvcElkeCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX29wZXJhdGlvbnNbb3BJZHhdID0gdGhpcy5fb3BlcmF0aW9uc1tvcElkeF0uY2xvbmUoe1xuICAgICAgICBvcHQ6IHRoaXMuX2VhZ2VyT3BlcmF0aW9uT3B0aW9uc1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdFxuICAgKiBAcmV0dXJuIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBmaW5kT3B0aW9ucyhvcHQpIHtcbiAgICB0aGlzLl9maW5kT3BlcmF0aW9uT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2ZpbmRPcGVyYXRpb25PcHRpb25zLCBvcHQpO1xuICAgIGNvbnN0IG9wSWR4ID0gdGhpcy5pbmRleE9mT3BlcmF0aW9uKEZpbmRPcGVyYXRpb24pO1xuXG4gICAgaWYgKG9wSWR4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fb3BlcmF0aW9uc1tvcElkeF0gPSB0aGlzLl9vcGVyYXRpb25zW29wSWR4XS5jbG9uZSh7XG4gICAgICAgIG9wdDogdGhpcy5fZmluZE9wZXJhdGlvbk9wdGlvbnNcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtDb25zdHJ1Y3Rvci48TW9kZWw+fVxuICAgKi9cbiAgbW9kZWxDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWxDbGFzcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzRmluZFF1ZXJ5KCkge1xuICAgIHJldHVybiAhXy5zb21lKHRoaXMuX29wZXJhdGlvbnMsIG1ldGhvZCA9PiBtZXRob2QuaXNXcml0ZU9wZXJhdGlvbikgJiYgIXRoaXMuX2V4cGxpY2l0UmVqZWN0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmJ1aWxkKCkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgdG9TcWwoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgY2xvbmUoKSB7XG4gICAgY29uc3QgYnVpbGRlciA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMuX21vZGVsQ2xhc3MpO1xuICAgIHRoaXMuYmFzZUNsb25lSW50byhidWlsZGVyKTtcblxuICAgIGJ1aWxkZXIuX2V4cGxpY2l0UmVqZWN0VmFsdWUgPSB0aGlzLl9leHBsaWNpdFJlamVjdFZhbHVlO1xuICAgIGJ1aWxkZXIuX2V4cGxpY2l0UmVzb2x2ZVZhbHVlID0gdGhpcy5fZXhwbGljaXRSZXNvbHZlVmFsdWU7XG5cbiAgICBidWlsZGVyLl9lYWdlckV4cHJlc3Npb24gPSB0aGlzLl9lYWdlckV4cHJlc3Npb247XG4gICAgYnVpbGRlci5fZWFnZXJGaWx0ZXJFeHByZXNzaW9ucyA9IHRoaXMuX2VhZ2VyRmlsdGVyRXhwcmVzc2lvbnMuc2xpY2UoKTtcblxuICAgIGJ1aWxkZXIuX2FsbG93ZWRFYWdlckV4cHJlc3Npb24gPSB0aGlzLl9hbGxvd2VkRWFnZXJFeHByZXNzaW9uO1xuICAgIGJ1aWxkZXIuX2FsbG93ZWRJbnNlcnRFeHByZXNzaW9uID0gdGhpcy5fYWxsb3dlZEluc2VydEV4cHJlc3Npb247XG5cbiAgICBidWlsZGVyLl9maW5kT3BlcmF0aW9uT3B0aW9ucyA9IHRoaXMuX2ZpbmRPcGVyYXRpb25PcHRpb25zO1xuICAgIGJ1aWxkZXIuX2VhZ2VyT3BlcmF0aW9uT3B0aW9ucyA9IHRoaXMuX2VhZ2VyT3BlcmF0aW9uT3B0aW9ucztcblxuICAgIGJ1aWxkZXIuX2ZpbmRPcGVyYXRpb25GYWN0b3J5ID0gdGhpcy5fZmluZE9wZXJhdGlvbkZhY3Rvcnk7XG4gICAgYnVpbGRlci5faW5zZXJ0T3BlcmF0aW9uRmFjdG9yeSA9IHRoaXMuX2luc2VydE9wZXJhdGlvbkZhY3Rvcnk7XG4gICAgYnVpbGRlci5fdXBkYXRlT3BlcmF0aW9uRmFjdG9yeSA9IHRoaXMuX3VwZGF0ZU9wZXJhdGlvbkZhY3Rvcnk7XG4gICAgYnVpbGRlci5fcGF0Y2hPcGVyYXRpb25GYWN0b3J5ID0gdGhpcy5fcGF0Y2hPcGVyYXRpb25GYWN0b3J5O1xuICAgIGJ1aWxkZXIuX3JlbGF0ZU9wZXJhdGlvbkZhY3RvcnkgPSB0aGlzLl9yZWxhdGVPcGVyYXRpb25GYWN0b3J5O1xuICAgIGJ1aWxkZXIuX3VucmVsYXRlT3BlcmF0aW9uRmFjdG9yeSA9IHRoaXMuX3VucmVsYXRlT3BlcmF0aW9uRmFjdG9yeTtcbiAgICBidWlsZGVyLl9kZWxldGVPcGVyYXRpb25GYWN0b3J5ID0gdGhpcy5fZGVsZXRlT3BlcmF0aW9uRmFjdG9yeTtcbiAgICBidWlsZGVyLl9lYWdlck9wZXJhdGlvbkZhY3RvcnkgPSB0aGlzLl9lYWdlck9wZXJhdGlvbkZhY3Rvcnk7XG5cbiAgICByZXR1cm4gYnVpbGRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgY2xlYXJFYWdlcigpIHtcbiAgICB0aGlzLl9lYWdlckV4cHJlc3Npb24gPSBudWxsO1xuICAgIHRoaXMuX2VhZ2VyRmlsdGVyRXhwcmVzc2lvbnMgPSBbXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgY2xlYXJSZWplY3QoKSB7XG4gICAgdGhpcy5fZXhwbGljaXRSZWplY3RWYWx1ZSA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGNsZWFyUmVzb2x2ZSgpIHtcbiAgICB0aGlzLl9leHBsaWNpdFJlc29sdmVWYWx1ZSA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbj19IHN1Y2Nlc3NIYW5kbGVyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb249fSBlcnJvckhhbmRsZXJcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICB0aGVuKHN1Y2Nlc3NIYW5kbGVyLCBlcnJvckhhbmRsZXIpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuZXhlY3V0ZSgpO1xuICAgIHJldHVybiBwcm9taXNlLnRoZW4uYXBwbHkocHJvbWlzZSwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtYXBwZXJcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBtYXAobWFwcGVyKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLmV4ZWN1dGUoKTtcbiAgICByZXR1cm4gcHJvbWlzZS5tYXAuYXBwbHkocHJvbWlzZSwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBlcnJvckhhbmRsZXJcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBjYXRjaChlcnJvckhhbmRsZXIpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuZXhlY3V0ZSgpO1xuICAgIHJldHVybiBwcm9taXNlLmNhdGNoLmFwcGx5KHByb21pc2UsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsqfSByZXR1cm5WYWx1ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIHJldHVybihyZXR1cm5WYWx1ZSkge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5leGVjdXRlKCk7XG4gICAgcmV0dXJuIHByb21pc2UucmV0dXJuLmFwcGx5KHByb21pc2UsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsqfSBjb250ZXh0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgYmluZChjb250ZXh0KSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLmV4ZWN1dGUoKTtcbiAgICByZXR1cm4gcHJvbWlzZS5iaW5kLmFwcGx5KHByb21pc2UsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBhc0NhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLmV4ZWN1dGUoKTtcbiAgICByZXR1cm4gcHJvbWlzZS5hc0NhbGxiYWNrLmFwcGx5KHByb21pc2UsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBub2RlaWZ5KGNhbGxiYWNrKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLmV4ZWN1dGUoKTtcbiAgICByZXR1cm4gcHJvbWlzZS5ub2RlaWZ5LmFwcGx5KHByb21pc2UsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICByZXN1bHRTaXplKCkge1xuICAgIGNvbnN0IGtuZXggPSB0aGlzLmtuZXgoKTtcblxuICAgIC8vIG9yZGVyQnkgaXMgdXNlbGVzcyBoZXJlIGFuZCBpdCBjYW4gbWFrZSB0aGluZ3MgYSBsb3Qgc2xvd2VyIChhdCBsZWFzdCB3aXRoIHBvc3RncmVzcWwgOS4zKS5cbiAgICAvLyBSZW1vdmUgaXQgZnJvbSB0aGUgY291bnQgcXVlcnkuIFdlIGFsc28gcmVtb3ZlIHRoZSBvZmZzZXQgYW5kIGxpbWl0XG4gICAgbGV0IHF1ZXJ5ID0gdGhpcy5jbG9uZSgpLmNsZWFyKC9vcmRlckJ5fG9mZnNldHxsaW1pdC8pLmJ1aWxkKCk7XG4gICAgbGV0IHJhd1F1ZXJ5ID0ga25leC5yYXcocXVlcnkpLndyYXAoJygnLCAnKSBhcyB0ZW1wJyk7XG4gICAgbGV0IGNvdW50UXVlcnkgPSBrbmV4LmNvdW50KCcqIGFzIGNvdW50JykuZnJvbShyYXdRdWVyeSk7XG5cbiAgICByZXR1cm4gY291bnRRdWVyeS50aGVuKHJlc3VsdCA9PiByZXN1bHRbMF0gPyByZXN1bHRbMF0uY291bnQgOiAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGFnZVxuICAgKiBAcGFyYW0ge251bWJlcn0gcGFnZVNpemVcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIHBhZ2UocGFnZSwgcGFnZVNpemUpIHtcbiAgICByZXR1cm4gdGhpcy5yYW5nZShwYWdlICogcGFnZVNpemUsIChwYWdlICsgMSkgKiBwYWdlU2l6ZSAtIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFxuICAgKiBAcGFyYW0ge251bWJlcn0gZW5kXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICByYW5nZShzdGFydCwgZW5kKSB7XG4gICAgbGV0IHJlc3VsdFNpemVQcm9taXNlO1xuXG4gICAgcmV0dXJuIHRoaXNcbiAgICAgIC5saW1pdChlbmQgLSBzdGFydCArIDEpXG4gICAgICAub2Zmc2V0KHN0YXJ0KVxuICAgICAgLnJ1bkJlZm9yZSgoKSA9PiB7XG4gICAgICAgIC8vIERvbid0IHJldHVybiB0aGUgcHJvbWlzZSBzbyB0aGF0IGl0IGlzIGV4ZWN1dGVkXG4gICAgICAgIC8vIGluIHBhcmFsbGVsIHdpdGggdGhlIGFjdHVhbCBxdWVyeS5cbiAgICAgICAgcmVzdWx0U2l6ZVByb21pc2UgPSB0aGlzLnJlc3VsdFNpemUoKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KVxuICAgICAgLnJ1bkFmdGVyKHJlc3VsdHMgPT4ge1xuICAgICAgICAvLyBOb3cgdGhhdCB0aGUgYWN0dWFsIHF1ZXJ5IGlzIGZpbmlzaGVkLCB3YWl0IHVudGlsIHRoZVxuICAgICAgICAvLyByZXN1bHQgc2l6ZSBoYXMgYmVlbiBjYWxjdWxhdGVkLlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3Jlc3VsdHMsIHJlc3VsdFNpemVQcm9taXNlXSk7XG4gICAgICB9KVxuICAgICAgLnJ1bkFmdGVyKGFyciA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmVzdWx0czogYXJyWzBdLFxuICAgICAgICAgIHRvdGFsOiBfLnBhcnNlSW50KGFyclsxXSlcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7a25leC5RdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBidWlsZCgpIHtcbiAgICAvLyBUYWtlIGEgY2xvbmUgc28gdGhhdCB3ZSBkb24ndCBtb2RpZnkgdGhpcyBpbnN0YW5jZSBkdXJpbmcgYnVpbGQuXG4gICAgY29uc3QgYnVpbGRlciA9IHRoaXMuY2xvbmUoKTtcblxuICAgIGlmIChidWlsZGVyLmlzRmluZFF1ZXJ5KCkpIHtcbiAgICAgIC8vIElmIG5vIHdyaXRlIG9wZXJhdGlvbnMgaGF2ZSBiZWVuIGNhbGxlZCBhdCB0aGlzIHBvaW50IHRoaXMgcXVlcnkgaXMgYVxuICAgICAgLy8gZmluZCBxdWVyeSBhbmQgd2UgbmVlZCB0byBjYWxsIHRoZSBjdXN0b20gZmluZCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIGJ1aWxkZXIuX2NhbGxGaW5kT3BlcmF0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKGJ1aWxkZXIuX2VhZ2VyRXhwcmVzc2lvbikge1xuICAgICAgYnVpbGRlci5fY2FsbEVhZ2VyRmV0Y2hPcGVyYXRpb24oKTtcbiAgICB9XG5cbiAgICAvLyBXZSBuZWVkIHRvIGJ1aWxkIHRoZSBidWlsZGVyIGV2ZW4gaWYgYSBxdWVyeSBleGVjdXRvciBvcGVyYXRpb25cbiAgICAvLyBoYXMgYmVlbiBjYWxsZWQgc28gdGhhdCB0aGUgb25CdWlsZCBob29rcyBnZXQgY2FsbGVkLlxuICAgIGNvbnN0IGtuZXhCdWlsZGVyID0gYnVpbGQoYnVpbGRlcik7XG4gICAgY29uc3QgcXVlcnlFeGVjdXRvck9wZXJhdGlvbiA9IGJ1aWxkZXIuX3F1ZXJ5RXhlY3V0b3JPcGVyYXRpb24oKTtcblxuICAgIGlmIChxdWVyeUV4ZWN1dG9yT3BlcmF0aW9uKSB7XG4gICAgICAvLyBJZiB0aGUgcXVlcnkgZXhlY3V0b3IgaXMgc2V0LCB3ZSBidWlsZCB0aGUgYnVpbGRlciB0aGF0IGl0IHJldHVybnMuXG4gICAgICByZXR1cm4gcXVlcnlFeGVjdXRvck9wZXJhdGlvbi5xdWVyeUV4ZWN1dG9yKGJ1aWxkZXIpLmJ1aWxkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBrbmV4QnVpbGRlcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBleGVjdXRlKCkge1xuICAgIC8vIFRha2UgYSBjbG9uZSBzbyB0aGF0IHdlIGRvbid0IG1vZGlmeSB0aGlzIGluc3RhbmNlIGR1cmluZyBleGVjdXRpb24uXG4gICAgbGV0IGJ1aWxkZXIgPSB0aGlzLmNsb25lKCk7XG4gICAgbGV0IHByb21pc2VDdHggPSB7YnVpbGRlcjogYnVpbGRlcn07XG4gICAgbGV0IHByb21pc2UgPSBQcm9taXNlLmJpbmQocHJvbWlzZUN0eCk7XG4gICAgbGV0IGNvbnRleHQgPSBidWlsZGVyLmNvbnRleHQoKSB8fCB7fTtcbiAgICBsZXQgaW50ZXJuYWxDb250ZXh0ID0gYnVpbGRlci5pbnRlcm5hbENvbnRleHQoKTtcblxuICAgIGlmIChidWlsZGVyLmlzRmluZFF1ZXJ5KCkpIHtcbiAgICAgIC8vIElmIG5vIHdyaXRlIG9wZXJhdGlvbnMgaGF2ZSBiZWVuIGNhbGxlZCBhdCB0aGlzIHBvaW50IHRoaXMgcXVlcnkgaXMgYVxuICAgICAgLy8gZmluZCBxdWVyeSBhbmQgd2UgbmVlZCB0byBjYWxsIHRoZSBjdXN0b20gZmluZCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIGJ1aWxkZXIuX2NhbGxGaW5kT3BlcmF0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKGJ1aWxkZXIuX2VhZ2VyRXhwcmVzc2lvbikge1xuICAgICAgYnVpbGRlci5fY2FsbEVhZ2VyRmV0Y2hPcGVyYXRpb24oKTtcbiAgICB9XG5cbiAgICBwcm9taXNlID0gY2hhaW5CZWZvcmVPcGVyYXRpb25zKHByb21pc2UsIGJ1aWxkZXIuX29wZXJhdGlvbnMpO1xuICAgIHByb21pc2UgPSBjaGFpbkhvb2tzKHByb21pc2UsIGNvbnRleHQucnVuQmVmb3JlKTtcbiAgICBwcm9taXNlID0gY2hhaW5Ib29rcyhwcm9taXNlLCBpbnRlcm5hbENvbnRleHQucnVuQmVmb3JlKTtcbiAgICBwcm9taXNlID0gY2hhaW5CZWZvcmVJbnRlcm5hbE9wZXJhdGlvbnMocHJvbWlzZSwgYnVpbGRlci5fb3BlcmF0aW9ucyk7XG5cbiAgICAvLyBSZXNvbHZlIGFsbCBiZWZvcmUgaG9va3MgYmVmb3JlIGJ1aWxkaW5nIGFuZCBleGVjdXRpbmcgdGhlIHF1ZXJ5XG4gICAgLy8gYW5kIHRoZSByZXN0IG9mIHRoZSBob29rcy5cbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHByb21pc2VDdHggPSB0aGlzO1xuICAgICAgY29uc3QgYnVpbGRlciA9IHByb21pc2VDdHguYnVpbGRlcjtcblxuICAgICAgbGV0IHByb21pc2UgPSBudWxsO1xuICAgICAgbGV0IGtuZXhCdWlsZGVyID0gYnVpbGQoYnVpbGRlcik7XG4gICAgICBsZXQgcXVlcnlFeGVjdXRvck9wZXJhdGlvbiA9IGJ1aWxkZXIuX3F1ZXJ5RXhlY3V0b3JPcGVyYXRpb24oKTtcblxuICAgICAgaWYgKGJ1aWxkZXIuX2V4cGxpY2l0UmVqZWN0VmFsdWUpIHtcbiAgICAgICAgcHJvbWlzZSAgPSBQcm9taXNlLnJlamVjdChidWlsZGVyLl9leHBsaWNpdFJlamVjdFZhbHVlKS5iaW5kKHByb21pc2VDdHgpO1xuICAgICAgfSBlbHNlIGlmIChidWlsZGVyLl9leHBsaWNpdFJlc29sdmVWYWx1ZSkge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGJ1aWxkZXIuX2V4cGxpY2l0UmVzb2x2ZVZhbHVlKS5iaW5kKHByb21pc2VDdHgpO1xuICAgICAgfSBlbHNlIGlmIChxdWVyeUV4ZWN1dG9yT3BlcmF0aW9uKSB7XG4gICAgICAgIHByb21pc2UgPSBxdWVyeUV4ZWN1dG9yT3BlcmF0aW9uLnF1ZXJ5RXhlY3V0b3IoYnVpbGRlcikuYmluZChwcm9taXNlQ3R4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21pc2UgPSBrbmV4QnVpbGRlci5iaW5kKHByb21pc2VDdHgpO1xuICAgICAgICBwcm9taXNlID0gY2hhaW5SYXdSZXN1bHRPcGVyYXRpb25zKHByb21pc2UsIGJ1aWxkZXIuX29wZXJhdGlvbnMpO1xuICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNyZWF0ZU1vZGVscyk7XG4gICAgICB9XG5cbiAgICAgIHByb21pc2UgPSBjaGFpbkFmdGVyUXVlcnlPcGVyYXRpb25zKHByb21pc2UsIGJ1aWxkZXIuX29wZXJhdGlvbnMpO1xuICAgICAgcHJvbWlzZSA9IGNoYWluQWZ0ZXJJbnRlcm5hbE9wZXJhdGlvbnMocHJvbWlzZSwgYnVpbGRlci5fb3BlcmF0aW9ucyk7XG4gICAgICBwcm9taXNlID0gY2hhaW5Ib29rcyhwcm9taXNlLCBjb250ZXh0LnJ1bkFmdGVyKTtcbiAgICAgIHByb21pc2UgPSBjaGFpbkhvb2tzKHByb21pc2UsIGludGVybmFsQ29udGV4dC5ydW5BZnRlcik7XG4gICAgICBwcm9taXNlID0gY2hhaW5BZnRlck9wZXJhdGlvbnMocHJvbWlzZSwgYnVpbGRlci5fb3BlcmF0aW9ucyk7XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJPcGVyYXRpb259XG4gICAqL1xuICBfcXVlcnlFeGVjdXRvck9wZXJhdGlvbigpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuX29wZXJhdGlvbnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBvcCA9IHRoaXMuX29wZXJhdGlvbnNbaV07XG5cbiAgICAgIGlmIChvcC5oYXNRdWVyeUV4ZWN1dG9yKCkpIHtcbiAgICAgICAgcmV0dXJuIG9wO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2FsbEZpbmRPcGVyYXRpb24oKSB7XG4gICAgaWYgKCF0aGlzLmhhcyhGaW5kT3BlcmF0aW9uKSkge1xuICAgICAgY29uc3Qgb3BlcmF0aW9uID0gdGhpcy5fZmluZE9wZXJhdGlvbkZhY3RvcnkodGhpcyk7XG5cbiAgICAgIG9wZXJhdGlvbi5vcHQgPSBfLm1lcmdlKG9wZXJhdGlvbi5vcHQsXG4gICAgICAgIHRoaXMuX2ZpbmRPcGVyYXRpb25PcHRpb25zXG4gICAgICApO1xuXG4gICAgICB0aGlzLmNhbGxRdWVyeUJ1aWxkZXJPcGVyYXRpb24ob3BlcmF0aW9uLCBbXSwgLyogcHVzaEZyb250ID0gKi8gdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2FsbEVhZ2VyRmV0Y2hPcGVyYXRpb24oKSB7XG4gICAgaWYgKCF0aGlzLmhhcyhFYWdlck9wZXJhdGlvbikgJiYgdGhpcy5fZWFnZXJFeHByZXNzaW9uKSB7XG4gICAgICBjb25zdCBvcGVyYXRpb24gPSB0aGlzLl9lYWdlck9wZXJhdGlvbkZhY3RvcnkodGhpcyk7XG5cbiAgICAgIG9wZXJhdGlvbi5vcHQgPSBfLm1lcmdlKG9wZXJhdGlvbi5vcHQsXG4gICAgICAgIHRoaXMuX21vZGVsQ2xhc3MuZGVmYXVsdEVhZ2VyT3B0aW9ucyxcbiAgICAgICAgdGhpcy5fZWFnZXJPcGVyYXRpb25PcHRpb25zXG4gICAgICApO1xuXG4gICAgICB0aGlzLmNhbGxRdWVyeUJ1aWxkZXJPcGVyYXRpb24ob3BlcmF0aW9uLCBbXG4gICAgICAgIHRoaXMuX2VhZ2VyRXhwcmVzc2lvbixcbiAgICAgICAgdGhpcy5fZWFnZXJGaWx0ZXJFeHByZXNzaW9uc1xuICAgICAgXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIHBsdWNrKHByb3BlcnR5TmFtZSkge1xuICAgIHJldHVybiB0aGlzLnJ1bkFmdGVyKHJlc3VsdCA9PiB7XG4gICAgICBpZiAoXy5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICAgICAgcmV0dXJuIF8ubWFwKHJlc3VsdCwgcHJvcGVydHlOYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGZpcnN0KCkge1xuICAgIHJldHVybiB0aGlzLnJ1bkFmdGVyKHJlc3VsdCA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHQpKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzU2VsZWN0aW9uKHNlbGVjdGlvbiwgZXhwbGljaXQgPSBmYWxzZSkge1xuICAgIGNvbnN0IHRhYmxlID0gdGhpcy5tb2RlbENsYXNzKCkudGFibGVOYW1lO1xuICAgIGxldCBub1NlbGVjdFN0YXRlbWVudHMgPSB0cnVlO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLl9vcGVyYXRpb25zLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3Qgb3AgPSB0aGlzLl9vcGVyYXRpb25zW2ldO1xuXG4gICAgICBpZiAob3AgaW5zdGFuY2VvZiBTZWxlY3RPcGVyYXRpb24pIHtcbiAgICAgICAgbm9TZWxlY3RTdGF0ZW1lbnRzID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG9wLmhhc1NlbGVjdGlvbih0YWJsZSwgc2VsZWN0aW9uKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5vU2VsZWN0U3RhdGVtZW50cyAmJiAhZXhwbGljaXQpIHtcbiAgICAgIC8vIEltcGxpY2l0IGBzZWxlY3QgKmAuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbnN0cnVjdG9yLjxNb2RlbD49fSBtb2RlbENsYXNzXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oTW9kZWwsIE1vZGVsLCBzdHJpbmcpfSB0cmF2ZXJzZXJcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIHRyYXZlcnNlKG1vZGVsQ2xhc3MsIHRyYXZlcnNlcikge1xuICAgIGlmIChfLmlzVW5kZWZpbmVkKHRyYXZlcnNlcikpIHtcbiAgICAgIHRyYXZlcnNlciA9IG1vZGVsQ2xhc3M7XG4gICAgICBtb2RlbENsYXNzID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5ydW5BZnRlcihyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5fbW9kZWxDbGFzcy50cmF2ZXJzZShtb2RlbENsYXNzLCByZXN1bHQsIHRyYXZlcnNlcik7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29uc3RydWN0b3IuPE1vZGVsPj19IG1vZGVsQ2xhc3NcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgcGljayhtb2RlbENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKF8uaXNVbmRlZmluZWQocHJvcGVydGllcykpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBtb2RlbENsYXNzO1xuICAgICAgbW9kZWxDbGFzcyA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJvcGVydGllcyA9IF8ucmVkdWNlKHByb3BlcnRpZXMsIChvYmosIHByb3ApID0+IHtcbiAgICAgIG9ialtwcm9wXSA9IHRydWU7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sIHt9KTtcblxuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlKG1vZGVsQ2xhc3MsIG1vZGVsID0+IHtcbiAgICAgIG1vZGVsLiRwaWNrKHByb3BlcnRpZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29uc3RydWN0b3IuPE1vZGVsPj19IG1vZGVsQ2xhc3NcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgb21pdChtb2RlbENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKF8uaXNVbmRlZmluZWQocHJvcGVydGllcykpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBtb2RlbENsYXNzO1xuICAgICAgbW9kZWxDbGFzcyA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gVHVybiB0aGUgcHJvcGVydGllcyBpbnRvIGEgaGFzaCBmb3IgcGVyZm9ybWFuY2UuXG4gICAgcHJvcGVydGllcyA9IF8ucmVkdWNlKHByb3BlcnRpZXMsIChvYmosIHByb3ApID0+IHtcbiAgICAgIG9ialtwcm9wXSA9IHRydWU7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sIHt9KTtcblxuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlKG1vZGVsQ2xhc3MsIG1vZGVsID0+IHtcbiAgICAgIG1vZGVsLiRvbWl0KHByb3BlcnRpZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW0pvaW5SZWxhdGlvbk9wZXJhdGlvbiwge2pvaW5PcGVyYXRpb246ICdqb2luJ31dKVxuICBqb2luUmVsYXRpb24ocmVsYXRpb25OYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtKb2luUmVsYXRpb25PcGVyYXRpb24sIHtqb2luT3BlcmF0aW9uOiAnaW5uZXJKb2luJ31dKVxuICBpbm5lckpvaW5SZWxhdGlvbihyZWxhdGlvbk5hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW0pvaW5SZWxhdGlvbk9wZXJhdGlvbiwge2pvaW5PcGVyYXRpb246ICdvdXRlckpvaW4nfV0pXG4gIG91dGVySm9pblJlbGF0aW9uKHJlbGF0aW9uTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbSm9pblJlbGF0aW9uT3BlcmF0aW9uLCB7am9pbk9wZXJhdGlvbjogJ2xlZnRKb2luJ31dKVxuICBsZWZ0Sm9pblJlbGF0aW9uKHJlbGF0aW9uTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbSm9pblJlbGF0aW9uT3BlcmF0aW9uLCB7am9pbk9wZXJhdGlvbjogJ2xlZnRPdXRlckpvaW4nfV0pXG4gIGxlZnRPdXRlckpvaW5SZWxhdGlvbihyZWxhdGlvbk5hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW0pvaW5SZWxhdGlvbk9wZXJhdGlvbiwge2pvaW5PcGVyYXRpb246ICdyaWdodEpvaW4nfV0pXG4gIHJpZ2h0Sm9pblJlbGF0aW9uKHJlbGF0aW9uTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbSm9pblJlbGF0aW9uT3BlcmF0aW9uLCB7am9pbk9wZXJhdGlvbjogJ3JpZ2h0T3V0ZXJKb2luJ31dKVxuICByaWdodE91dGVySm9pblJlbGF0aW9uKHJlbGF0aW9uTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbSm9pblJlbGF0aW9uT3BlcmF0aW9uLCB7am9pbk9wZXJhdGlvbjogJ2Z1bGxPdXRlckpvaW4nfV0pXG4gIGZ1bGxPdXRlckpvaW5SZWxhdGlvbihyZWxhdGlvbk5hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxBcnJheS48c3RyaW5nfG51bWJlcj59IGlkXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBmaW5kQnlJZChpZCkge1xuICAgIHJldHVybiB0aGlzLndoZXJlQ29tcG9zaXRlKHRoaXMuX21vZGVsQ2xhc3MuZ2V0RnVsbElkQ29sdW1uKCksIGlkKS5maXJzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICB3aXRoU2NoZW1hKHNjaGVtYSkge1xuICAgIHRoaXMuaW50ZXJuYWxDb250ZXh0KCkub25CdWlsZC5wdXNoKGJ1aWxkZXIgPT4ge1xuICAgICAgaWYgKCFidWlsZGVyLmhhcygvd2l0aFNjaGVtYS8pKSB7XG4gICAgICAgIC8vIE5lZWQgdG8gcHVzaCB0aGlzIG9wZXJhdGlvbiB0byB0aGUgZnJvbnQgYmVjYXVzZSBrbmV4IGRvZXNuJ3QgdXNlIHRoZVxuICAgICAgICAvLyBzY2hlbWEgZm9yIG9wZXJhdGlvbnMgY2FsbGVkIGJlZm9yZSBgd2l0aFNjaGVtYWAuXG4gICAgICAgIGJ1aWxkZXIuY2FsbEtuZXhRdWVyeUJ1aWxkZXJPcGVyYXRpb24oJ3dpdGhTY2hlbWEnLCBbc2NoZW1hXSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgZGVidWcoKSB7XG4gICAgdGhpcy5pbnRlcm5hbENvbnRleHQoKS5vbkJ1aWxkLnB1c2goYnVpbGRlciA9PiB7XG4gICAgICBidWlsZGVyLmNhbGxLbmV4UXVlcnlCdWlsZGVyT3BlcmF0aW9uKCdkZWJ1ZycsIFtdKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fE1vZGVsfEFycmF5LjxPYmplY3Q+fEFycmF5LjxNb2RlbD59IG1vZGVsc09yT2JqZWN0c1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHdyaXRlUXVlcnlPcGVyYXRpb25cbiAgaW5zZXJ0KG1vZGVsc09yT2JqZWN0cykge1xuICAgIGNvbnN0IGluc2VydE9wZXJhdGlvbiA9IHRoaXMuX2luc2VydE9wZXJhdGlvbkZhY3RvcnkodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuY2FsbFF1ZXJ5QnVpbGRlck9wZXJhdGlvbihpbnNlcnRPcGVyYXRpb24sIFttb2RlbHNPck9iamVjdHNdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdHxNb2RlbHxBcnJheS48T2JqZWN0PnxBcnJheS48TW9kZWw+fSBtb2RlbHNPck9iamVjdHNcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEB3cml0ZVF1ZXJ5T3BlcmF0aW9uXG4gIGluc2VydEFuZEZldGNoKG1vZGVsc09yT2JqZWN0cykge1xuICAgIGNvbnN0IGluc2VydEFuZEZldGNoT3BlcmF0aW9uID0gbmV3IEluc2VydEFuZEZldGNoT3BlcmF0aW9uKCdpbnNlcnRBbmRGZXRjaCcsIHtcbiAgICAgIGRlbGVnYXRlOiB0aGlzLl9pbnNlcnRPcGVyYXRpb25GYWN0b3J5KHRoaXMpXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5jYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uKGluc2VydEFuZEZldGNoT3BlcmF0aW9uLCBbbW9kZWxzT3JPYmplY3RzXSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R8TW9kZWx8QXJyYXkuPE9iamVjdD58QXJyYXkuPE1vZGVsPn0gbW9kZWxzT3JPYmplY3RzXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAd3JpdGVRdWVyeU9wZXJhdGlvblxuICBpbnNlcnRHcmFwaChtb2RlbHNPck9iamVjdHMpIHtcbiAgICBjb25zdCBpbnNlcnRHcmFwaE9wZXJhdGlvbiA9IG5ldyBJbnNlcnRHcmFwaE9wZXJhdGlvbignaW5zZXJ0R3JhcGgnLCB7XG4gICAgICBkZWxlZ2F0ZTogdGhpcy5faW5zZXJ0T3BlcmF0aW9uRmFjdG9yeSh0aGlzKVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuY2FsbFF1ZXJ5QnVpbGRlck9wZXJhdGlvbihpbnNlcnRHcmFwaE9wZXJhdGlvbiwgW21vZGVsc09yT2JqZWN0c10pO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBpbnNlcnRXaXRoUmVsYXRlZCguLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zZXJ0R3JhcGgoLi4uYXJncyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R8TW9kZWx8QXJyYXkuPE9iamVjdD58QXJyYXkuPE1vZGVsPn0gbW9kZWxzT3JPYmplY3RzXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAd3JpdGVRdWVyeU9wZXJhdGlvblxuICBpbnNlcnRHcmFwaEFuZEZldGNoKG1vZGVsc09yT2JqZWN0cykge1xuICAgIGNvbnN0IGluc2VydEdyYXBoQW5kRmV0Y2hPcGVyYXRpb24gPSBuZXcgSW5zZXJ0R3JhcGhBbmRGZXRjaE9wZXJhdGlvbignaW5zZXJ0R3JhcGhBbmRGZXRjaCcsIHtcbiAgICAgIGRlbGVnYXRlOiBuZXcgSW5zZXJ0R3JhcGhPcGVyYXRpb24oJ2luc2VydEdyYXBoJywge1xuICAgICAgICBkZWxlZ2F0ZTogdGhpcy5faW5zZXJ0T3BlcmF0aW9uRmFjdG9yeSh0aGlzKVxuICAgICAgfSlcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmNhbGxRdWVyeUJ1aWxkZXJPcGVyYXRpb24oaW5zZXJ0R3JhcGhBbmRGZXRjaE9wZXJhdGlvbiwgW21vZGVsc09yT2JqZWN0c10pO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBpbnNlcnRXaXRoUmVsYXRlZEFuZEZldGNoKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnRHcmFwaEFuZEZldGNoKC4uLmFyZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TW9kZWx8T2JqZWN0PX0gbW9kZWxPck9iamVjdFxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHdyaXRlUXVlcnlPcGVyYXRpb25cbiAgdXBkYXRlKG1vZGVsT3JPYmplY3QpIHtcbiAgICBjb25zdCB1cGRhdGVPcGVyYXRpb24gPSB0aGlzLl91cGRhdGVPcGVyYXRpb25GYWN0b3J5KHRoaXMpO1xuICAgIHJldHVybiB0aGlzLmNhbGxRdWVyeUJ1aWxkZXJPcGVyYXRpb24odXBkYXRlT3BlcmF0aW9uLCBbbW9kZWxPck9iamVjdF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TW9kZWx8T2JqZWN0PX0gbW9kZWxPck9iamVjdFxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHdyaXRlUXVlcnlPcGVyYXRpb25cbiAgdXBkYXRlQW5kRmV0Y2gobW9kZWxPck9iamVjdCkge1xuICAgIGNvbnN0IGRlbGVnYXRlT3BlcmF0aW9uID0gdGhpcy5fdXBkYXRlT3BlcmF0aW9uRmFjdG9yeSh0aGlzKTtcblxuICAgIGlmICghKGRlbGVnYXRlT3BlcmF0aW9uLmluc3RhbmNlIGluc3RhbmNlb2YgdGhpcy5fbW9kZWxDbGFzcykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndXBkYXRlQW5kRmV0Y2ggY2FuIG9ubHkgYmUgY2FsbGVkIGZvciBpbnN0YW5jZSBvcGVyYXRpb25zJyk7XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlQW5kRmV0Y2ggPSBuZXcgVXBkYXRlQW5kRmV0Y2hPcGVyYXRpb24oJ3VwZGF0ZUFuZEZldGNoJywge1xuICAgICAgZGVsZWdhdGU6IGRlbGVnYXRlT3BlcmF0aW9uXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5jYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uKHVwZGF0ZUFuZEZldGNoLCBbZGVsZWdhdGVPcGVyYXRpb24uaW5zdGFuY2UuJGlkKCksIG1vZGVsT3JPYmplY3RdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8QXJyYXkuPG51bWJlcnxzdHJpbmc+fSBpZFxuICAgKiBAcGFyYW0ge01vZGVsfE9iamVjdD19IG1vZGVsT3JPYmplY3RcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEB3cml0ZVF1ZXJ5T3BlcmF0aW9uXG4gIHVwZGF0ZUFuZEZldGNoQnlJZChpZCwgbW9kZWxPck9iamVjdCkge1xuICAgIGNvbnN0IHVwZGF0ZUFuZEZldGNoID0gbmV3IFVwZGF0ZUFuZEZldGNoT3BlcmF0aW9uKCd1cGRhdGVBbmRGZXRjaCcsIHtcbiAgICAgIGRlbGVnYXRlOiB0aGlzLl91cGRhdGVPcGVyYXRpb25GYWN0b3J5KHRoaXMpXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5jYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uKHVwZGF0ZUFuZEZldGNoLCBbaWQsIG1vZGVsT3JPYmplY3RdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge01vZGVsfE9iamVjdD19IG1vZGVsT3JPYmplY3RcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEB3cml0ZVF1ZXJ5T3BlcmF0aW9uXG4gIHBhdGNoKG1vZGVsT3JPYmplY3QpIHtcbiAgICBjb25zdCBwYXRjaE9wZXJhdGlvbiA9IHRoaXMuX3BhdGNoT3BlcmF0aW9uRmFjdG9yeSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5jYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uKHBhdGNoT3BlcmF0aW9uLCBbbW9kZWxPck9iamVjdF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TW9kZWx8T2JqZWN0PX0gbW9kZWxPck9iamVjdFxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHdyaXRlUXVlcnlPcGVyYXRpb25cbiAgcGF0Y2hBbmRGZXRjaChtb2RlbE9yT2JqZWN0KSB7XG4gICAgY29uc3QgZGVsZWdhdGVPcGVyYXRpb24gPSB0aGlzLl9wYXRjaE9wZXJhdGlvbkZhY3RvcnkodGhpcyk7XG5cbiAgICBpZiAoIShkZWxlZ2F0ZU9wZXJhdGlvbi5pbnN0YW5jZSBpbnN0YW5jZW9mIHRoaXMuX21vZGVsQ2xhc3MpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BhdGNoQW5kRmV0Y2ggY2FuIG9ubHkgYmUgY2FsbGVkIGZvciBpbnN0YW5jZSBvcGVyYXRpb25zJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGF0Y2hBbmRGZXRjaCA9IG5ldyBVcGRhdGVBbmRGZXRjaE9wZXJhdGlvbigncGF0Y2hBbmRGZXRjaCcsIHtcbiAgICAgIGRlbGVnYXRlOiBkZWxlZ2F0ZU9wZXJhdGlvblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuY2FsbFF1ZXJ5QnVpbGRlck9wZXJhdGlvbihwYXRjaEFuZEZldGNoLCBbZGVsZWdhdGVPcGVyYXRpb24uaW5zdGFuY2UuJGlkKCksIG1vZGVsT3JPYmplY3RdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8QXJyYXkuPG51bWJlcnxzdHJpbmc+fSBpZFxuICAgKiBAcGFyYW0ge01vZGVsfE9iamVjdD19IG1vZGVsT3JPYmplY3RcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEB3cml0ZVF1ZXJ5T3BlcmF0aW9uXG4gIHBhdGNoQW5kRmV0Y2hCeUlkKGlkLCBtb2RlbE9yT2JqZWN0KSB7XG4gICAgY29uc3QgcGF0Y2hBbmRGZXRjaCA9IG5ldyBVcGRhdGVBbmRGZXRjaE9wZXJhdGlvbigncGF0Y2hBbmRGZXRjaCcsIHtcbiAgICAgIGRlbGVnYXRlOiB0aGlzLl9wYXRjaE9wZXJhdGlvbkZhY3RvcnkodGhpcylcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmNhbGxRdWVyeUJ1aWxkZXJPcGVyYXRpb24ocGF0Y2hBbmRGZXRjaCwgW2lkLCBtb2RlbE9yT2JqZWN0XSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEB3cml0ZVF1ZXJ5T3BlcmF0aW9uXG4gIGRlbGV0ZSgpIHtcbiAgICBjb25zdCBkZWxldGVPcGVyYXRpb24gPSB0aGlzLl9kZWxldGVPcGVyYXRpb25GYWN0b3J5KHRoaXMpO1xuICAgIHJldHVybiB0aGlzLmNhbGxRdWVyeUJ1aWxkZXJPcGVyYXRpb24oZGVsZXRlT3BlcmF0aW9uLCBbXSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGRlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxldGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8QXJyYXkuPG51bWJlcnxzdHJpbmc+fSBpZFxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgZGVsZXRlQnlJZChpZCkge1xuICAgIHJldHVybiB0aGlzLmRlbGV0ZSgpLndoZXJlQ29tcG9zaXRlKHRoaXMuX21vZGVsQ2xhc3MuZ2V0RnVsbElkQ29sdW1uKCksIGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8b2JqZWN0fEFycmF5LjxudW1iZXJ8c3RyaW5nPnxBcnJheS48QXJyYXkuPG51bWJlcnxzdHJpbmc+PnxBcnJheS48b2JqZWN0Pn0gaWRzXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAd3JpdGVRdWVyeU9wZXJhdGlvblxuICByZWxhdGUoaWRzKSB7XG4gICAgY29uc3QgcmVsYXRlT3BlcmF0aW9uID0gdGhpcy5fcmVsYXRlT3BlcmF0aW9uRmFjdG9yeSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5jYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uKHJlbGF0ZU9wZXJhdGlvbiwgW2lkc10pO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAd3JpdGVRdWVyeU9wZXJhdGlvblxuICB1bnJlbGF0ZSgpIHtcbiAgICBjb25zdCB1bnJlbGF0ZU9wZXJhdGlvbiA9IHRoaXMuX3VucmVsYXRlT3BlcmF0aW9uRmFjdG9yeSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5jYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uKHVucmVsYXRlT3BlcmF0aW9uLCBbXSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGluY3JlbWVudChwcm9wZXJ0eU5hbWUsIGhvd011Y2gpIHtcbiAgICBsZXQgcGF0Y2ggPSB7fTtcbiAgICBsZXQgY29sdW1uTmFtZSA9IHRoaXMuX21vZGVsQ2xhc3MucHJvcGVydHlOYW1lVG9Db2x1bW5OYW1lKHByb3BlcnR5TmFtZSk7XG4gICAgcGF0Y2hbcHJvcGVydHlOYW1lXSA9IHRoaXMua25leCgpLnJhdygnPz8gKyA/JywgW2NvbHVtbk5hbWUsIGhvd011Y2hdKTtcbiAgICByZXR1cm4gdGhpcy5wYXRjaChwYXRjaCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGRlY3JlbWVudChwcm9wZXJ0eU5hbWUsIGhvd011Y2gpIHtcbiAgICBsZXQgcGF0Y2ggPSB7fTtcbiAgICBsZXQgY29sdW1uTmFtZSA9IHRoaXMuX21vZGVsQ2xhc3MucHJvcGVydHlOYW1lVG9Db2x1bW5OYW1lKHByb3BlcnR5TmFtZSk7XG4gICAgcGF0Y2hbcHJvcGVydHlOYW1lXSA9IHRoaXMua25leCgpLnJhdygnPz8gLSA/JywgW2NvbHVtbk5hbWUsIGhvd011Y2hdKTtcbiAgICByZXR1cm4gdGhpcy5wYXRjaChwYXRjaCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gd3JpdGVRdWVyeU9wZXJhdGlvbih0YXJnZXQsIHByb3BlcnR5LCBkZXNjcmlwdG9yKSB7XG4gIGNvbnN0IGZ1bmMgPSBkZXNjcmlwdG9yLnZhbHVlO1xuXG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiBkZWNvcmF0b3Ikd3JpdGVRdWVyeU9wZXJhdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuaXNGaW5kUXVlcnkoKSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVqZWN0KG5ldyBFcnJvcignRG91YmxlIGNhbGwgdG8gYSB3cml0ZSBtZXRob2QuICcgK1xuICAgICAgICAnWW91IGNhbiBvbmx5IGNhbGwgb25lIG9mIHRoZSB3cml0ZSBtZXRob2RzICcgK1xuICAgICAgICAnKGluc2VydCwgdXBkYXRlLCBwYXRjaCwgZGVsZXRlLCByZWxhdGUsIHVucmVsYXRlLCBpbmNyZW1lbnQsIGRlY3JlbWVudCkgJyArXG4gICAgICAgICdhbmQgb25seSBvbmNlIHBlciBxdWVyeSBidWlsZGVyLicpKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5yZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hlY2tFYWdlcihidWlsZGVyKSB7XG4gIGlmIChidWlsZGVyLl9lYWdlckV4cHJlc3Npb24gJiYgYnVpbGRlci5fYWxsb3dlZEVhZ2VyRXhwcmVzc2lvbikge1xuICAgIGlmICghYnVpbGRlci5fYWxsb3dlZEVhZ2VyRXhwcmVzc2lvbi5pc1N1YkV4cHJlc3Npb24oYnVpbGRlci5fZWFnZXJFeHByZXNzaW9uKSkge1xuICAgICAgYnVpbGRlci5yZWplY3QobmV3IFZhbGlkYXRpb25FcnJvcih7ZWFnZXI6ICdlYWdlciBleHByZXNzaW9uIG5vdCBhbGxvd2VkJ30pKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlTW9kZWxzKHJlc3VsdCkge1xuICBjb25zdCBidWlsZGVyID0gdGhpcy5idWlsZGVyO1xuXG4gIGlmIChyZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCAmJiB0eXBlb2YgcmVzdWx0WzBdID09PSAnb2JqZWN0JyAmJiAhKHJlc3VsdFswXSBpbnN0YW5jZW9mIGJ1aWxkZXIuX21vZGVsQ2xhc3MpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHJlc3VsdC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgcmVzdWx0W2ldID0gYnVpbGRlci5fbW9kZWxDbGFzcy5mcm9tRGF0YWJhc2VKc29uKHJlc3VsdFtpXSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdvYmplY3QnICYmICEocmVzdWx0IGluc3RhbmNlb2YgYnVpbGRlci5fbW9kZWxDbGFzcykpIHtcbiAgICByZXN1bHQgPSBidWlsZGVyLl9tb2RlbENsYXNzLmZyb21EYXRhYmFzZUpzb24ocmVzdWx0KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkKGJ1aWxkZXIpIHtcbiAgbGV0IGNvbnRleHQgPSBidWlsZGVyLmNvbnRleHQoKSB8fCB7fTtcbiAgbGV0IGludGVybmFsQ29udGV4dCA9IGJ1aWxkZXIuaW50ZXJuYWxDb250ZXh0KCk7XG4gIGxldCBrbmV4QnVpbGRlciA9IGJ1aWxkZXIua25leCgpLnF1ZXJ5QnVpbGRlcigpO1xuXG4gIGNhbGxPbkJ1aWxkSG9va3MoYnVpbGRlciwgY29udGV4dC5vbkJ1aWxkKTtcbiAgY2FsbE9uQnVpbGRIb29rcyhidWlsZGVyLCBpbnRlcm5hbENvbnRleHQub25CdWlsZCk7XG5cbiAga25leEJ1aWxkZXIgPSBidWlsZGVyLmJ1aWxkSW50byhrbmV4QnVpbGRlcik7XG5cbiAgaWYgKCFidWlsZGVyLmhhcyhRdWVyeUJ1aWxkZXJCYXNlLkZyb21TZWxlY3RvcikpIHtcbiAgICBjb25zdCB0YWJsZSA9IGJ1aWxkZXIubW9kZWxDbGFzcygpLnRhYmxlTmFtZTtcblxuICAgIC8vIFNldCB0aGUgdGFibGUgb25seSBpZiBpdCBoYXNuJ3QgYmVlbiBleHBsaWNpdGx5IHNldCB5ZXQuXG4gICAga25leEJ1aWxkZXIudGFibGUodGFibGUpO1xuXG4gICAgaWYgKCFidWlsZGVyLmhhcyhRdWVyeUJ1aWxkZXJCYXNlLlNlbGVjdFNlbGVjdG9yKSkge1xuICAgICAga25leEJ1aWxkZXIuc2VsZWN0KGAke3RhYmxlfS4qYCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGtuZXhCdWlsZGVyO1xufVxuXG5mdW5jdGlvbiBjaGFpbkhvb2tzKHByb21pc2UsIGZ1bmMpIHtcbiAgaWYgKF8uaXNGdW5jdGlvbihmdW5jKSkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLmJ1aWxkZXIsIHJlc3VsdCwgdGhpcy5idWlsZGVyKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGZ1bmMpKSB7XG4gICAgZnVuYy5mb3JFYWNoKGZ1bmMgPT4ge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpcy5idWlsZGVyLCByZXN1bHQsIHRoaXMuYnVpbGRlcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBjYWxsT25CdWlsZEhvb2tzKGJ1aWxkZXIsIGZ1bmMpIHtcbiAgaWYgKF8uaXNGdW5jdGlvbihmdW5jKSkge1xuICAgIGZ1bmMuY2FsbChidWlsZGVyLCBidWlsZGVyKTtcbiAgfSBlbHNlIGlmIChfLmlzQXJyYXkoZnVuYykpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGZ1bmMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBmdW5jW2ldLmNhbGwoYnVpbGRlciwgYnVpbGRlcik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhvb2tDYWxsZXIoaG9vaykge1xuICBjb25zdCBoYXNNZXRob2QgPSAnaGFzJyArIF8udXBwZXJGaXJzdChob29rKTtcblxuICAvLyBDb21waWxlIHRoZSBjYWxsZXIgZnVuY3Rpb24gZm9yIChtZWFzdXJlZCkgcGVyZm9ybWFuY2UgYm9vc3QuXG4gIGNvbnN0IGNhbGxlciA9IG5ldyBGdW5jdGlvbigncHJvbWlzZScsICdvcCcsIGBcbiAgICBpZiAob3AuJHtoYXNNZXRob2R9KCkpIHtcbiAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gb3AuJHtob29rfSh0aGlzLmJ1aWxkZXIsIHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICBgKTtcblxuICByZXR1cm4gKHByb21pc2UsIG9wZXJhdGlvbnMpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IG9wZXJhdGlvbnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBwcm9taXNlID0gY2FsbGVyKHByb21pc2UsIG9wZXJhdGlvbnNbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPcGVyYXRpb25GYWN0b3J5KE9wZXJhdGlvbkNsYXNzLCBuYW1lLCBvcHRpb25zKSB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBPcGVyYXRpb25DbGFzcyhuYW1lLCBvcHRpb25zKTtcbiAgfTtcbn1cblxuY29uc3QgY2hhaW5CZWZvcmVPcGVyYXRpb25zID0gY3JlYXRlSG9va0NhbGxlcignb25CZWZvcmUnKTtcbmNvbnN0IGNoYWluQmVmb3JlSW50ZXJuYWxPcGVyYXRpb25zID0gY3JlYXRlSG9va0NhbGxlcignb25CZWZvcmVJbnRlcm5hbCcpO1xuY29uc3QgY2hhaW5SYXdSZXN1bHRPcGVyYXRpb25zID0gY3JlYXRlSG9va0NhbGxlcignb25SYXdSZXN1bHQnKTtcbmNvbnN0IGNoYWluQWZ0ZXJRdWVyeU9wZXJhdGlvbnMgPSBjcmVhdGVIb29rQ2FsbGVyKCdvbkFmdGVyUXVlcnknKTtcbmNvbnN0IGNoYWluQWZ0ZXJJbnRlcm5hbE9wZXJhdGlvbnMgPSBjcmVhdGVIb29rQ2FsbGVyKCdvbkFmdGVySW50ZXJuYWwnKTtcbmNvbnN0IGNoYWluQWZ0ZXJPcGVyYXRpb25zID0gY3JlYXRlSG9va0NhbGxlcignb25BZnRlcicpO1xuXG5jb25zdCBmaW5kT3BlcmF0aW9uRmFjdG9yeSA9IGNyZWF0ZU9wZXJhdGlvbkZhY3RvcnkoRmluZE9wZXJhdGlvbiwgJ2ZpbmQnKTtcbmNvbnN0IGluc2VydE9wZXJhdGlvbkZhY3RvcnkgPSBjcmVhdGVPcGVyYXRpb25GYWN0b3J5KEluc2VydE9wZXJhdGlvbiwgJ2luc2VydCcpO1xuY29uc3QgdXBkYXRlT3BlcmF0aW9uRmFjdG9yeSA9IGNyZWF0ZU9wZXJhdGlvbkZhY3RvcnkoVXBkYXRlT3BlcmF0aW9uLCAndXBkYXRlJyk7XG5jb25zdCBwYXRjaE9wZXJhdGlvbkZhY3RvcnkgPSBjcmVhdGVPcGVyYXRpb25GYWN0b3J5KFVwZGF0ZU9wZXJhdGlvbiwgJ3BhdGNoJywge21vZGVsT3B0aW9uczoge3BhdGNoOiB0cnVlfX0pO1xuY29uc3QgcmVsYXRlT3BlcmF0aW9uRmFjdG9yeSA9IGNyZWF0ZU9wZXJhdGlvbkZhY3RvcnkoUXVlcnlCdWlsZGVyT3BlcmF0aW9uLCAncmVsYXRlJyk7XG5jb25zdCB1bnJlbGF0ZU9wZXJhdGlvbkZhY3RvcnkgPSBjcmVhdGVPcGVyYXRpb25GYWN0b3J5KFF1ZXJ5QnVpbGRlck9wZXJhdGlvbiwgJ3VucmVsYXRlJyk7XG5jb25zdCBkZWxldGVPcGVyYXRpb25GYWN0b3J5ID0gY3JlYXRlT3BlcmF0aW9uRmFjdG9yeShEZWxldGVPcGVyYXRpb24sICdkZWxldGUnKTtcbiJdfQ==