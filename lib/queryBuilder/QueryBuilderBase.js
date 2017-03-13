'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _desc, _value, _class, _class2, _temp;

var _queryBuilderOperation = require('./decorators/queryBuilderOperation');

var _queryBuilderOperation2 = _interopRequireDefault(_queryBuilderOperation);

var _QueryBuilderOperationSupport = require('./QueryBuilderOperationSupport');

var _QueryBuilderOperationSupport2 = _interopRequireDefault(_QueryBuilderOperationSupport);

var _KnexOperation = require('./operations/KnexOperation');

var _KnexOperation2 = _interopRequireDefault(_KnexOperation);

var _SelectOperation = require('./operations/SelectOperation');

var _SelectOperation2 = _interopRequireDefault(_SelectOperation);

var _WhereRefOperation = require('./operations/WhereRefOperation');

var _WhereRefOperation2 = _interopRequireDefault(_WhereRefOperation);

var _WhereCompositeOperation = require('./operations/WhereCompositeOperation');

var _WhereCompositeOperation2 = _interopRequireDefault(_WhereCompositeOperation);

var _WhereInCompositeOperation = require('./operations/WhereInCompositeOperation');

var _WhereInCompositeOperation2 = _interopRequireDefault(_WhereInCompositeOperation);

var _WhereInCompositeSqliteOperation = require('./operations/WhereInCompositeSqliteOperation');

var _WhereInCompositeSqliteOperation2 = _interopRequireDefault(_WhereInCompositeSqliteOperation);

var _WhereJsonPostgresOperation = require('./operations/jsonApi/WhereJsonPostgresOperation');

var _WhereJsonPostgresOperation2 = _interopRequireDefault(_WhereJsonPostgresOperation);

var _WhereJsonHasPostgresOperation = require('./operations/jsonApi/WhereJsonHasPostgresOperation');

var _WhereJsonHasPostgresOperation2 = _interopRequireDefault(_WhereJsonHasPostgresOperation);

var _WhereJsonFieldPostgresOperation = require('./operations/jsonApi/WhereJsonFieldPostgresOperation');

var _WhereJsonFieldPostgresOperation2 = _interopRequireDefault(_WhereJsonFieldPostgresOperation);

var _WhereJsonNotObjectPostgresOperation = require('./operations/jsonApi/WhereJsonNotObjectPostgresOperation');

var _WhereJsonNotObjectPostgresOperation2 = _interopRequireDefault(_WhereJsonNotObjectPostgresOperation);

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
 * This class is a thin wrapper around knex query builder. This class allows us to add our own
 * query builder methods without monkey patching knex query builder.
 */

var QueryBuilderBase = (_dec = (0, _queryBuilderOperation2.default)(_SelectOperation2.default), _dec2 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec3 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec4 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec5 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default, 'delete'), _dec6 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec7 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec8 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec9 = (0, _queryBuilderOperation2.default)(_SelectOperation2.default), _dec10 = (0, _queryBuilderOperation2.default)(_SelectOperation2.default), _dec11 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec12 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec13 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec14 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec15 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec16 = (0, _queryBuilderOperation2.default)(_SelectOperation2.default), _dec17 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec18 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec19 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec20 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec21 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec22 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec23 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec24 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec25 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec26 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec27 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec28 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec29 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec30 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec31 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec32 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec33 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec34 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec35 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec36 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec37 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec38 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec39 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec40 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec41 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec42 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec43 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec44 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec45 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec46 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec47 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec48 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec49 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec50 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec51 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec52 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec53 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec54 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec55 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec56 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec57 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec58 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec59 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec60 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec61 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec62 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec63 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec64 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec65 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec66 = (0, _queryBuilderOperation2.default)(_SelectOperation2.default), _dec67 = (0, _queryBuilderOperation2.default)(_SelectOperation2.default), _dec68 = (0, _queryBuilderOperation2.default)(_SelectOperation2.default), _dec69 = (0, _queryBuilderOperation2.default)(_SelectOperation2.default), _dec70 = (0, _queryBuilderOperation2.default)(_SelectOperation2.default), _dec71 = (0, _queryBuilderOperation2.default)(_SelectOperation2.default), _dec72 = (0, _queryBuilderOperation2.default)(_SelectOperation2.default), _dec73 = (0, _queryBuilderOperation2.default)(_SelectOperation2.default), _dec74 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec75 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec76 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec77 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec78 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec79 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec80 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec81 = (0, _queryBuilderOperation2.default)([_WhereRefOperation2.default, { bool: 'and' }]), _dec82 = (0, _queryBuilderOperation2.default)([_WhereRefOperation2.default, { bool: 'or' }]), _dec83 = (0, _queryBuilderOperation2.default)(_WhereCompositeOperation2.default), _dec84 = (0, _queryBuilderOperation2.default)({
  default: _WhereInCompositeOperation2.default,
  sqlite3: _WhereInCompositeSqliteOperation2.default
}), _dec85 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '=', bool: 'and' }]), _dec86 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '=', bool: 'or' }]), _dec87 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '!=', bool: 'and' }]), _dec88 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '!=', bool: 'or' }]), _dec89 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '@>', bool: 'and' }]), _dec90 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '@>', bool: 'or' }]), _dec91 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '@>', bool: 'and', prefix: 'not' }]), _dec92 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '@>', bool: 'or', prefix: 'not' }]), _dec93 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '<@', bool: 'and' }]), _dec94 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '<@', bool: 'or' }]), _dec95 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '<@', bool: 'and', prefix: 'not' }]), _dec96 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '<@', bool: 'or', prefix: 'not' }]), _dec97 = (0, _queryBuilderOperation2.default)([_WhereJsonNotObjectPostgresOperation2.default, { bool: 'and', compareValue: [] }]), _dec98 = (0, _queryBuilderOperation2.default)([_WhereJsonNotObjectPostgresOperation2.default, { bool: 'or', compareValue: [] }]), _dec99 = (0, _queryBuilderOperation2.default)([_WhereJsonNotObjectPostgresOperation2.default, { bool: 'and', compareValue: {} }]), _dec100 = (0, _queryBuilderOperation2.default)([_WhereJsonNotObjectPostgresOperation2.default, { bool: 'or', compareValue: {} }]), _dec101 = (0, _queryBuilderOperation2.default)([_WhereJsonHasPostgresOperation2.default, { bool: 'and', operator: '?|' }]), _dec102 = (0, _queryBuilderOperation2.default)([_WhereJsonHasPostgresOperation2.default, { bool: 'or', operator: '?|' }]), _dec103 = (0, _queryBuilderOperation2.default)([_WhereJsonHasPostgresOperation2.default, { bool: 'and', operator: '?&' }]), _dec104 = (0, _queryBuilderOperation2.default)([_WhereJsonHasPostgresOperation2.default, { bool: 'or', operator: '?&' }]), _dec105 = (0, _queryBuilderOperation2.default)([_WhereJsonFieldPostgresOperation2.default, { bool: 'and' }]), _dec106 = (0, _queryBuilderOperation2.default)([_WhereJsonFieldPostgresOperation2.default, { bool: 'or' }]), (_class = (_temp = _class2 = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(QueryBuilderBase, _QueryBuilderOperatio);

  function QueryBuilderBase() {
    (0, _classCallCheck3.default)(this, QueryBuilderBase);
    return (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.apply(this, arguments));
  }

  /**
   * @return {boolean}
   */
  QueryBuilderBase.prototype.isSelectAll = function isSelectAll() {
    return !this.has(QueryBuilderBase.SelectSelector) && !this.has(QueryBuilderBase.WhereSelector);
  };

  /**
   * @param {function} func
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.modify = function modify(func) {
    if (!func) {
      return this;
    }

    if (arguments.length === 1) {
      func.call(this, this);
    } else {
      var args = new Array(arguments.length);

      args[0] = this;
      for (var i = 1, l = args.length; i < l; ++i) {
        args[i] = arguments[i];
      }

      func.apply(this, args);
    }

    return this;
  };

  /**
   * @param {Transaction} trx
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.transacting = function transacting(trx) {
    this._context.knex = trx || null;
    return this;
  };

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.select = function select() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.insert = function insert() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.update = function update() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.delete = function _delete() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.del = function del() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.forUpdate = function forUpdate() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.forShare = function forShare() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.as = function as() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.columns = function columns() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.column = function column() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.from = function from() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.fromJS = function fromJS() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.into = function into() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.withSchema = function withSchema() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.table = function table() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.distinct = function distinct() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.join = function join() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.joinRaw = function joinRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.innerJoin = function innerJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.leftJoin = function leftJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.leftOuterJoin = function leftOuterJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.rightJoin = function rightJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.rightOuterJoin = function rightOuterJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.outerJoin = function outerJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.fullOuterJoin = function fullOuterJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.crossJoin = function crossJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.where = function where() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.andWhere = function andWhere() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhere = function orWhere() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereNot = function whereNot() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereNot = function orWhereNot() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereRaw = function whereRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereWrapped = function whereWrapped() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.havingWrapped = function havingWrapped() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereRaw = function orWhereRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereExists = function whereExists() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereExists = function orWhereExists() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereNotExists = function whereNotExists() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereNotExists = function orWhereNotExists() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereIn = function whereIn() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereIn = function orWhereIn() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereNotIn = function whereNotIn() {};

  /**
   */


  QueryBuilderBase.prototype.orWhereNotIn = function orWhereNotIn() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereNull = function whereNull() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereNull = function orWhereNull() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereNotNull = function whereNotNull() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereNotNull = function orWhereNotNull() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereBetween = function whereBetween() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.andWhereBetween = function andWhereBetween() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereNotBetween = function whereNotBetween() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.andWhereNotBetween = function andWhereNotBetween() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereBetween = function orWhereBetween() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereNotBetween = function orWhereNotBetween() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.groupBy = function groupBy() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.groupByRaw = function groupByRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orderBy = function orderBy() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orderByRaw = function orderByRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.union = function union() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.unionAll = function unionAll() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.having = function having() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.havingRaw = function havingRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orHaving = function orHaving() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orHavingRaw = function orHavingRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.offset = function offset() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.limit = function limit() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.count = function count() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.countDistinct = function countDistinct() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.min = function min() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.max = function max() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.sum = function sum() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.sumDistinct = function sumDistinct() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.avg = function avg() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.avgDistinct = function avgDistinct() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.debug = function debug() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.returning = function returning() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.truncate = function truncate() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.connection = function connection() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.options = function options() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.columnInfo = function columnInfo() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.with = function _with() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereRef = function whereRef(lhs, op, rhs) {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereRef = function orWhereRef(lhs, op, rhs) {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereComposite = function whereComposite(cols, op, values) {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereInComposite = function whereInComposite(columns, values) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonEquals = function whereJsonEquals(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonEquals = function orWhereJsonEquals(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonNotEquals = function whereJsonNotEquals(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonNotEquals = function orWhereJsonNotEquals(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonSupersetOf = function whereJsonSupersetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonSupersetOf = function orWhereJsonSupersetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonNotSupersetOf = function whereJsonNotSupersetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonNotSupersetOf = function orWhereJsonNotSupersetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonSubsetOf = function whereJsonSubsetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonSubsetOf = function orWhereJsonSubsetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonNotSubsetOf = function whereJsonNotSubsetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonNotSubsetOf = function orWhereJsonNotSubsetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonIsArray = function whereJsonIsArray(fieldExpression) {
    return this.whereJsonSupersetOf(fieldExpression, []);
  };

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonIsArray = function orWhereJsonIsArray(fieldExpression) {
    return this.orWhereJsonSupersetOf(fieldExpression, []);
  };

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonIsObject = function whereJsonIsObject(fieldExpression) {
    return this.whereJsonSupersetOf(fieldExpression, {});
  };

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonIsObject = function orWhereJsonIsObject(fieldExpression) {
    return this.orWhereJsonSupersetOf(fieldExpression, {});
  };

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonNotArray = function whereJsonNotArray(fieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonNotArray = function orWhereJsonNotArray(fieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonNotObject = function whereJsonNotObject(fieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonNotObject = function orWhereJsonNotObject(fieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {string|Array.<string>} keys
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonHasAny = function whereJsonHasAny(fieldExpression, keys) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {string|Array.<string>} keys
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonHasAny = function orWhereJsonHasAny(fieldExpression, keys) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {string|Array.<string>} keys
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonHasAll = function whereJsonHasAll(fieldExpression, keys) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {string|Array.<string>} keys
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonHasAll = function orWhereJsonHasAll(fieldExpression, keys) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {string} operator
   * @param {boolean|Number|string|null} value
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonField = function whereJsonField(fieldExpression, operator, value) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {string} operator
   * @param {boolean|Number|string|null} value
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonField = function orWhereJsonField(fieldExpression, operator, value) {};

  return QueryBuilderBase;
}(_QueryBuilderOperationSupport2.default), _class2.SelectSelector = _SelectOperation2.default, _class2.WhereSelector = /where|orWhere|andWhere/, _class2.FromSelector = /^(from|into|table)$/, _temp), (_applyDecoratedDescriptor(_class.prototype, 'select', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'select'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'insert', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'insert'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'update', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'update'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'delete', [_dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'delete'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'del', [_dec5], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'del'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'forUpdate', [_dec6], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'forUpdate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'forShare', [_dec7], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'forShare'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'as', [_dec8], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'as'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'columns', [_dec9], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'columns'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'column', [_dec10], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'column'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'from', [_dec11], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'from'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fromJS', [_dec12], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fromJS'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'into', [_dec13], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'into'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'withSchema', [_dec14], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'withSchema'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'table', [_dec15], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'table'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'distinct', [_dec16], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'distinct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'join', [_dec17], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'join'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'joinRaw', [_dec18], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'joinRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'innerJoin', [_dec19], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'innerJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'leftJoin', [_dec20], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'leftJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'leftOuterJoin', [_dec21], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'leftOuterJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rightJoin', [_dec22], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'rightJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rightOuterJoin', [_dec23], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'rightOuterJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'outerJoin', [_dec24], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'outerJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fullOuterJoin', [_dec25], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fullOuterJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'crossJoin', [_dec26], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'crossJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'where', [_dec27], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'where'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andWhere', [_dec28], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andWhere'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhere', [_dec29], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhere'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereNot', [_dec30], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereNot'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereNot', [_dec31], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereNot'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereRaw', [_dec32], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereWrapped', [_dec33], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereWrapped'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'havingWrapped', [_dec34], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'havingWrapped'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereRaw', [_dec35], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereExists', [_dec36], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereExists', [_dec37], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereNotExists', [_dec38], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereNotExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereNotExists', [_dec39], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereNotExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereIn', [_dec40], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereIn', [_dec41], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereNotIn', [_dec42], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereNotIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereNotIn', [_dec43], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereNotIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereNull', [_dec44], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereNull', [_dec45], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereNotNull', [_dec46], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereNotNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereNotNull', [_dec47], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereNotNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereBetween', [_dec48], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andWhereBetween', [_dec49], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andWhereBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereNotBetween', [_dec50], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereNotBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andWhereNotBetween', [_dec51], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andWhereNotBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereBetween', [_dec52], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereNotBetween', [_dec53], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereNotBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'groupBy', [_dec54], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'groupBy'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'groupByRaw', [_dec55], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'groupByRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orderBy', [_dec56], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orderBy'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orderByRaw', [_dec57], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orderByRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'union', [_dec58], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'union'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'unionAll', [_dec59], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'unionAll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'having', [_dec60], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'having'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'havingRaw', [_dec61], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'havingRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orHaving', [_dec62], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orHaving'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orHavingRaw', [_dec63], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orHavingRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offset', [_dec64], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'limit', [_dec65], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'limit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'count', [_dec66], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'count'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'countDistinct', [_dec67], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'countDistinct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'min', [_dec68], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'min'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'max', [_dec69], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'max'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'sum', [_dec70], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'sum'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'sumDistinct', [_dec71], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'sumDistinct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'avg', [_dec72], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'avg'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'avgDistinct', [_dec73], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'avgDistinct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'debug', [_dec74], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'debug'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'returning', [_dec75], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'returning'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'truncate', [_dec76], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'truncate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'connection', [_dec77], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'connection'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'options', [_dec78], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'options'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'columnInfo', [_dec79], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'columnInfo'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'with', [_dec80], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'with'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereRef', [_dec81], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereRef'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereRef', [_dec82], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereRef'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereComposite', [_dec83], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereComposite'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereInComposite', [_dec84], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereInComposite'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonEquals', [_dec85], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonEquals'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonEquals', [_dec86], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonEquals'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonNotEquals', [_dec87], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonNotEquals'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonNotEquals', [_dec88], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonNotEquals'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonSupersetOf', [_dec89], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonSupersetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonSupersetOf', [_dec90], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonSupersetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonNotSupersetOf', [_dec91], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonNotSupersetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonNotSupersetOf', [_dec92], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonNotSupersetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonSubsetOf', [_dec93], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonSubsetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonSubsetOf', [_dec94], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonSubsetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonNotSubsetOf', [_dec95], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonNotSubsetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonNotSubsetOf', [_dec96], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonNotSubsetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonNotArray', [_dec97], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonNotArray'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonNotArray', [_dec98], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonNotArray'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonNotObject', [_dec99], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonNotObject'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonNotObject', [_dec100], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonNotObject'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonHasAny', [_dec101], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonHasAny'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonHasAny', [_dec102], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonHasAny'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonHasAll', [_dec103], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonHasAll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonHasAll', [_dec104], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonHasAll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonField', [_dec105], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonField'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonField', [_dec106], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonField'), _class.prototype)), _class));
exports.default = QueryBuilderBase;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlF1ZXJ5QnVpbGRlckJhc2UuanMiXSwibmFtZXMiOlsiUXVlcnlCdWlsZGVyQmFzZSIsImJvb2wiLCJkZWZhdWx0Iiwic3FsaXRlMyIsIm9wZXJhdG9yIiwicHJlZml4IiwiY29tcGFyZVZhbHVlIiwiaXNTZWxlY3RBbGwiLCJoYXMiLCJTZWxlY3RTZWxlY3RvciIsIldoZXJlU2VsZWN0b3IiLCJtb2RpZnkiLCJmdW5jIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiY2FsbCIsImFyZ3MiLCJBcnJheSIsImkiLCJsIiwiYXBwbHkiLCJ0cmFuc2FjdGluZyIsInRyeCIsIl9jb250ZXh0Iiwia25leCIsInNlbGVjdCIsImluc2VydCIsInVwZGF0ZSIsImRlbGV0ZSIsImRlbCIsImZvclVwZGF0ZSIsImZvclNoYXJlIiwiYXMiLCJjb2x1bW5zIiwiY29sdW1uIiwiZnJvbSIsImZyb21KUyIsImludG8iLCJ3aXRoU2NoZW1hIiwidGFibGUiLCJkaXN0aW5jdCIsImpvaW4iLCJqb2luUmF3IiwiaW5uZXJKb2luIiwibGVmdEpvaW4iLCJsZWZ0T3V0ZXJKb2luIiwicmlnaHRKb2luIiwicmlnaHRPdXRlckpvaW4iLCJvdXRlckpvaW4iLCJmdWxsT3V0ZXJKb2luIiwiY3Jvc3NKb2luIiwid2hlcmUiLCJhbmRXaGVyZSIsIm9yV2hlcmUiLCJ3aGVyZU5vdCIsIm9yV2hlcmVOb3QiLCJ3aGVyZVJhdyIsIndoZXJlV3JhcHBlZCIsImhhdmluZ1dyYXBwZWQiLCJvcldoZXJlUmF3Iiwid2hlcmVFeGlzdHMiLCJvcldoZXJlRXhpc3RzIiwid2hlcmVOb3RFeGlzdHMiLCJvcldoZXJlTm90RXhpc3RzIiwid2hlcmVJbiIsIm9yV2hlcmVJbiIsIndoZXJlTm90SW4iLCJvcldoZXJlTm90SW4iLCJ3aGVyZU51bGwiLCJvcldoZXJlTnVsbCIsIndoZXJlTm90TnVsbCIsIm9yV2hlcmVOb3ROdWxsIiwid2hlcmVCZXR3ZWVuIiwiYW5kV2hlcmVCZXR3ZWVuIiwid2hlcmVOb3RCZXR3ZWVuIiwiYW5kV2hlcmVOb3RCZXR3ZWVuIiwib3JXaGVyZUJldHdlZW4iLCJvcldoZXJlTm90QmV0d2VlbiIsImdyb3VwQnkiLCJncm91cEJ5UmF3Iiwib3JkZXJCeSIsIm9yZGVyQnlSYXciLCJ1bmlvbiIsInVuaW9uQWxsIiwiaGF2aW5nIiwiaGF2aW5nUmF3Iiwib3JIYXZpbmciLCJvckhhdmluZ1JhdyIsIm9mZnNldCIsImxpbWl0IiwiY291bnQiLCJjb3VudERpc3RpbmN0IiwibWluIiwibWF4Iiwic3VtIiwic3VtRGlzdGluY3QiLCJhdmciLCJhdmdEaXN0aW5jdCIsImRlYnVnIiwicmV0dXJuaW5nIiwidHJ1bmNhdGUiLCJjb25uZWN0aW9uIiwib3B0aW9ucyIsImNvbHVtbkluZm8iLCJ3aXRoIiwid2hlcmVSZWYiLCJsaHMiLCJvcCIsInJocyIsIm9yV2hlcmVSZWYiLCJ3aGVyZUNvbXBvc2l0ZSIsImNvbHMiLCJ2YWx1ZXMiLCJ3aGVyZUluQ29tcG9zaXRlIiwid2hlcmVKc29uRXF1YWxzIiwiZmllbGRFeHByZXNzaW9uIiwianNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uIiwib3JXaGVyZUpzb25FcXVhbHMiLCJ3aGVyZUpzb25Ob3RFcXVhbHMiLCJvcldoZXJlSnNvbk5vdEVxdWFscyIsIndoZXJlSnNvblN1cGVyc2V0T2YiLCJvcldoZXJlSnNvblN1cGVyc2V0T2YiLCJ3aGVyZUpzb25Ob3RTdXBlcnNldE9mIiwib3JXaGVyZUpzb25Ob3RTdXBlcnNldE9mIiwid2hlcmVKc29uU3Vic2V0T2YiLCJvcldoZXJlSnNvblN1YnNldE9mIiwid2hlcmVKc29uTm90U3Vic2V0T2YiLCJvcldoZXJlSnNvbk5vdFN1YnNldE9mIiwid2hlcmVKc29uSXNBcnJheSIsIm9yV2hlcmVKc29uSXNBcnJheSIsIndoZXJlSnNvbklzT2JqZWN0Iiwib3JXaGVyZUpzb25Jc09iamVjdCIsIndoZXJlSnNvbk5vdEFycmF5Iiwib3JXaGVyZUpzb25Ob3RBcnJheSIsIndoZXJlSnNvbk5vdE9iamVjdCIsIm9yV2hlcmVKc29uTm90T2JqZWN0Iiwid2hlcmVKc29uSGFzQW55Iiwia2V5cyIsIm9yV2hlcmVKc29uSGFzQW55Iiwid2hlcmVKc29uSGFzQWxsIiwib3JXaGVyZUpzb25IYXNBbGwiLCJ3aGVyZUpzb25GaWVsZCIsInZhbHVlIiwib3JXaGVyZUpzb25GaWVsZCIsIkZyb21TZWxlY3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7SUFLcUJBLGdCLFdBa0RsQiwrRCxVQU1BLDZELFVBTUEsNkQsVUFNQSw2RCxVQU1BLDhEQUFxQyxRQUFyQyxDLFVBTUEsNkQsVUFNQSw2RCxVQU1BLDZELFVBTUEsK0QsV0FNQSwrRCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSwrRCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FLQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsNkQsV0FNQSw2RCxXQU1BLDZELFdBTUEsK0QsV0FNQSwrRCxXQU1B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QUwsQ0FBeUJMLGVBQXpCLEVBQTBDLEVBQTFDLENBQVA7QUFDRCxHOztBQUVEOzs7Ozs7NkJBSUFnQixtQixnQ0FBb0JoQixlLEVBQWlCO0FBQ25DLFdBQU8sS0FBS00scUJBQUwsQ0FBMkJOLGVBQTNCLEVBQTRDLEVBQTVDLENBQVA7QUFDRCxHOztBQUVEOzs7Ozs7NkJBS0FpQixpQiw4QkFBa0JqQixlLEVBQWlCLENBQUUsQzs7QUFFckM7Ozs7Ozs2QkFLQWtCLG1CLGdDQUFvQmxCLGUsRUFBaUIsQ0FBRSxDOztBQUV2Qzs7Ozs7OzZCQUtBbUIsa0IsK0JBQW1CbkIsZSxFQUFpQixDQUFFLEM7O0FBRXRDOzs7Ozs7NkJBS0FvQixvQixpQ0FBcUJwQixlLEVBQWlCLENBQUUsQzs7QUFFeEM7Ozs7Ozs7NkJBTUFxQixlLDRCQUFnQnJCLGUsRUFBaUJzQixJLEVBQU0sQ0FBRSxDOztBQUV6Qzs7Ozs7Ozs2QkFNQUMsaUIsOEJBQWtCdkIsZSxFQUFpQnNCLEksRUFBTSxDQUFFLEM7O0FBRTNDOzs7Ozs7OzZCQU1BRSxlLDRCQUFnQnhCLGUsRUFBaUJzQixJLEVBQU0sQ0FBRSxDOztBQUV6Qzs7Ozs7Ozs2QkFNQUcsaUIsOEJBQWtCekIsZSxFQUFpQnNCLEksRUFBTSxDQUFFLEM7O0FBRTNDOzs7Ozs7Ozs2QkFPQUksYywyQkFBZTFCLGUsRUFBaUIvRyxRLEVBQVUwSSxLLEVBQU8sQ0FBRSxDOztBQUVuRDs7Ozs7Ozs7NkJBT0FDLGdCLDZCQUFpQjVCLGUsRUFBaUIvRyxRLEVBQVUwSSxLLEVBQU8sQ0FBRSxDOzs7bURBbnZCOUNySSxjLHNDQUNBQyxhLEdBQWdCLHdCLFVBQ2hCc0ksWSxHQUFlLHFCO2tCQUpIaEosZ0IiLCJmaWxlIjoiUXVlcnlCdWlsZGVyQmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBxdWVyeUJ1aWxkZXJPcGVyYXRpb24gZnJvbSAnLi9kZWNvcmF0b3JzL3F1ZXJ5QnVpbGRlck9wZXJhdGlvbic7XG5pbXBvcnQgUXVlcnlCdWlsZGVyT3BlcmF0aW9uU3VwcG9ydCBmcm9tICcuL1F1ZXJ5QnVpbGRlck9wZXJhdGlvblN1cHBvcnQnO1xuXG5pbXBvcnQgS25leE9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvS25leE9wZXJhdGlvbic7XG5pbXBvcnQgU2VsZWN0T3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9TZWxlY3RPcGVyYXRpb24nO1xuaW1wb3J0IFdoZXJlUmVmT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9XaGVyZVJlZk9wZXJhdGlvbic7XG5pbXBvcnQgV2hlcmVDb21wb3NpdGVPcGVyYXRpb24gZnJvbSAnLi9vcGVyYXRpb25zL1doZXJlQ29tcG9zaXRlT3BlcmF0aW9uJztcbmltcG9ydCBXaGVyZUluQ29tcG9zaXRlT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9XaGVyZUluQ29tcG9zaXRlT3BlcmF0aW9uJztcbmltcG9ydCBXaGVyZUluQ29tcG9zaXRlU3FsaXRlT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9XaGVyZUluQ29tcG9zaXRlU3FsaXRlT3BlcmF0aW9uJztcblxuaW1wb3J0IFdoZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9qc29uQXBpL1doZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uJztcbmltcG9ydCBXaGVyZUpzb25IYXNQb3N0Z3Jlc09wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvanNvbkFwaS9XaGVyZUpzb25IYXNQb3N0Z3Jlc09wZXJhdGlvbic7XG5pbXBvcnQgV2hlcmVKc29uRmllbGRQb3N0Z3Jlc09wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvanNvbkFwaS9XaGVyZUpzb25GaWVsZFBvc3RncmVzT3BlcmF0aW9uJztcbmltcG9ydCBXaGVyZUpzb25Ob3RPYmplY3RQb3N0Z3Jlc09wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvanNvbkFwaS9XaGVyZUpzb25Ob3RPYmplY3RQb3N0Z3Jlc09wZXJhdGlvbic7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyBhIHRoaW4gd3JhcHBlciBhcm91bmQga25leCBxdWVyeSBidWlsZGVyLiBUaGlzIGNsYXNzIGFsbG93cyB1cyB0byBhZGQgb3VyIG93blxuICogcXVlcnkgYnVpbGRlciBtZXRob2RzIHdpdGhvdXQgbW9ua2V5IHBhdGNoaW5nIGtuZXggcXVlcnkgYnVpbGRlci5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWVyeUJ1aWxkZXJCYXNlIGV4dGVuZHMgUXVlcnlCdWlsZGVyT3BlcmF0aW9uU3VwcG9ydCB7XG5cbiAgc3RhdGljIFNlbGVjdFNlbGVjdG9yID0gU2VsZWN0T3BlcmF0aW9uO1xuICBzdGF0aWMgV2hlcmVTZWxlY3RvciA9IC93aGVyZXxvcldoZXJlfGFuZFdoZXJlLztcbiAgc3RhdGljIEZyb21TZWxlY3RvciA9IC9eKGZyb218aW50b3x0YWJsZSkkLztcblxuICAvKipcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzU2VsZWN0QWxsKCkge1xuICAgIHJldHVybiAhdGhpcy5oYXMoUXVlcnlCdWlsZGVyQmFzZS5TZWxlY3RTZWxlY3RvcikgJiYgIXRoaXMuaGFzKFF1ZXJ5QnVpbGRlckJhc2UuV2hlcmVTZWxlY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIG1vZGlmeShmdW5jKSB7XG4gICAgaWYgKCFmdW5jKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZnVuYy5jYWxsKHRoaXMsIHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcblxuICAgICAgYXJnc1swXSA9IHRoaXM7XG4gICAgICBmb3IgKGxldCBpID0gMSwgbCA9IGFyZ3MubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICB9XG5cbiAgICAgIGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtUcmFuc2FjdGlvbn0gdHJ4XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgdHJhbnNhY3RpbmcodHJ4KSB7XG4gICAgdGhpcy5fY29udGV4dC5rbmV4ID0gdHJ4IHx8IG51bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFNlbGVjdE9wZXJhdGlvbilcbiAgc2VsZWN0KC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBpbnNlcnQoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHVwZGF0ZSguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgZGVsZXRlKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uLCAnZGVsZXRlJylcbiAgZGVsKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBmb3JVcGRhdGUoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGZvclNoYXJlKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBhcyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oU2VsZWN0T3BlcmF0aW9uKVxuICBjb2x1bW5zKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihTZWxlY3RPcGVyYXRpb24pXG4gIGNvbHVtbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgZnJvbSguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgZnJvbUpTKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBpbnRvKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICB3aXRoU2NoZW1hKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICB0YWJsZSguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oU2VsZWN0T3BlcmF0aW9uKVxuICBkaXN0aW5jdCguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgam9pbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgam9pblJhdyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgaW5uZXJKb2luKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBsZWZ0Sm9pbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgbGVmdE91dGVySm9pbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgcmlnaHRKb2luKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICByaWdodE91dGVySm9pbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3V0ZXJKb2luKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBmdWxsT3V0ZXJKb2luKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBjcm9zc0pvaW4oLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHdoZXJlKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBhbmRXaGVyZSguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3JXaGVyZSguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgd2hlcmVOb3QoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yV2hlcmVOb3QoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHdoZXJlUmF3KC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICB3aGVyZVdyYXBwZWQoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGhhdmluZ1dyYXBwZWQoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yV2hlcmVSYXcoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHdoZXJlRXhpc3RzKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvcldoZXJlRXhpc3RzKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICB3aGVyZU5vdEV4aXN0cyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3JXaGVyZU5vdEV4aXN0cyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgd2hlcmVJbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3JXaGVyZUluKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICB3aGVyZU5vdEluKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yV2hlcmVOb3RJbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgd2hlcmVOdWxsKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvcldoZXJlTnVsbCguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgd2hlcmVOb3ROdWxsKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvcldoZXJlTm90TnVsbCguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgd2hlcmVCZXR3ZWVuKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBhbmRXaGVyZUJldHdlZW4oLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHdoZXJlTm90QmV0d2VlbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgYW5kV2hlcmVOb3RCZXR3ZWVuKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvcldoZXJlQmV0d2VlbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3JXaGVyZU5vdEJldHdlZW4oLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGdyb3VwQnkoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGdyb3VwQnlSYXcoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yZGVyQnkoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yZGVyQnlSYXcoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHVuaW9uKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICB1bmlvbkFsbCguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgaGF2aW5nKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBoYXZpbmdSYXcoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9ySGF2aW5nKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvckhhdmluZ1JhdyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb2Zmc2V0KC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBsaW1pdCguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oU2VsZWN0T3BlcmF0aW9uKVxuICBjb3VudCguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oU2VsZWN0T3BlcmF0aW9uKVxuICBjb3VudERpc3RpbmN0KC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihTZWxlY3RPcGVyYXRpb24pXG4gIG1pbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oU2VsZWN0T3BlcmF0aW9uKVxuICBtYXgoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFNlbGVjdE9wZXJhdGlvbilcbiAgc3VtKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihTZWxlY3RPcGVyYXRpb24pXG4gIHN1bURpc3RpbmN0KC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihTZWxlY3RPcGVyYXRpb24pXG4gIGF2ZyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oU2VsZWN0T3BlcmF0aW9uKVxuICBhdmdEaXN0aW5jdCguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgZGVidWcoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHJldHVybmluZyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgdHJ1bmNhdGUoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGNvbm5lY3Rpb24oLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9wdGlvbnMoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGNvbHVtbkluZm8oLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHdpdGgoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZVJlZk9wZXJhdGlvbiwge2Jvb2w6ICdhbmQnfV0pXG4gIHdoZXJlUmVmKGxocywgb3AsIHJocykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZVJlZk9wZXJhdGlvbiwge2Jvb2w6ICdvcid9XSlcbiAgb3JXaGVyZVJlZihsaHMsIG9wLCByaHMpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihXaGVyZUNvbXBvc2l0ZU9wZXJhdGlvbilcbiAgd2hlcmVDb21wb3NpdGUoY29scywgb3AsIHZhbHVlcykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKHtcbiAgICBkZWZhdWx0OiBXaGVyZUluQ29tcG9zaXRlT3BlcmF0aW9uLFxuICAgIHNxbGl0ZTM6IFdoZXJlSW5Db21wb3NpdGVTcWxpdGVPcGVyYXRpb25cbiAgfSlcbiAgd2hlcmVJbkNvbXBvc2l0ZShjb2x1bW5zLCB2YWx1ZXMpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8RmllbGRFeHByZXNzaW9ufSBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25Qb3N0Z3Jlc09wZXJhdGlvbiwge29wZXJhdG9yOiAnPScsIGJvb2w6ICdhbmQnfV0pXG4gIHdoZXJlSnNvbkVxdWFscyhmaWVsZEV4cHJlc3Npb24sIGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvbikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxGaWVsZEV4cHJlc3Npb259IGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uLCB7b3BlcmF0b3I6ICc9JywgYm9vbDogJ29yJ31dKVxuICBvcldoZXJlSnNvbkVxdWFscyhmaWVsZEV4cHJlc3Npb24sIGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvbikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxGaWVsZEV4cHJlc3Npb259IGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uLCB7b3BlcmF0b3I6ICchPScsIGJvb2w6ICdhbmQnfV0pXG4gIHdoZXJlSnNvbk5vdEVxdWFscyhmaWVsZEV4cHJlc3Npb24sIGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvbikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxGaWVsZEV4cHJlc3Npb259IGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uLCB7b3BlcmF0b3I6ICchPScsIGJvb2w6ICdvcid9XSlcbiAgb3JXaGVyZUpzb25Ob3RFcXVhbHMoZmllbGRFeHByZXNzaW9uLCBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb24pIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8RmllbGRFeHByZXNzaW9ufSBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25Qb3N0Z3Jlc09wZXJhdGlvbiwge29wZXJhdG9yOiAnQD4nLCBib29sOiAnYW5kJ31dKVxuICB3aGVyZUpzb25TdXBlcnNldE9mKGZpZWxkRXhwcmVzc2lvbiwganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fEZpZWxkRXhwcmVzc2lvbn0ganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uUG9zdGdyZXNPcGVyYXRpb24sIHtvcGVyYXRvcjogJ0A+JywgYm9vbDogJ29yJ31dKVxuICBvcldoZXJlSnNvblN1cGVyc2V0T2YoZmllbGRFeHByZXNzaW9uLCBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb24pIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8RmllbGRFeHByZXNzaW9ufSBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25Qb3N0Z3Jlc09wZXJhdGlvbiwge29wZXJhdG9yOiAnQD4nLCBib29sOiAnYW5kJywgcHJlZml4OiAnbm90J31dKVxuICB3aGVyZUpzb25Ob3RTdXBlcnNldE9mKGZpZWxkRXhwcmVzc2lvbiwganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fEZpZWxkRXhwcmVzc2lvbn0ganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uUG9zdGdyZXNPcGVyYXRpb24sIHtvcGVyYXRvcjogJ0A+JywgYm9vbDogJ29yJywgcHJlZml4OiAnbm90J31dKVxuICBvcldoZXJlSnNvbk5vdFN1cGVyc2V0T2YoZmllbGRFeHByZXNzaW9uLCBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb24pIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8RmllbGRFeHByZXNzaW9ufSBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25Qb3N0Z3Jlc09wZXJhdGlvbiwge29wZXJhdG9yOiAnPEAnLCBib29sOiAnYW5kJ31dKVxuICB3aGVyZUpzb25TdWJzZXRPZihmaWVsZEV4cHJlc3Npb24sIGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvbikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxGaWVsZEV4cHJlc3Npb259IGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uLCB7b3BlcmF0b3I6ICc8QCcsIGJvb2w6ICdvcid9XSlcbiAgb3JXaGVyZUpzb25TdWJzZXRPZihmaWVsZEV4cHJlc3Npb24sIGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvbikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxGaWVsZEV4cHJlc3Npb259IGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uLCB7b3BlcmF0b3I6ICc8QCcsIGJvb2w6ICdhbmQnLCBwcmVmaXg6ICdub3QnfV0pXG4gIHdoZXJlSnNvbk5vdFN1YnNldE9mKGZpZWxkRXhwcmVzc2lvbiwganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fEZpZWxkRXhwcmVzc2lvbn0ganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uUG9zdGdyZXNPcGVyYXRpb24sIHtvcGVyYXRvcjogJzxAJywgYm9vbDogJ29yJywgcHJlZml4OiAnbm90J31dKVxuICBvcldoZXJlSnNvbk5vdFN1YnNldE9mKGZpZWxkRXhwcmVzc2lvbiwganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgd2hlcmVKc29uSXNBcnJheShmaWVsZEV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gdGhpcy53aGVyZUpzb25TdXBlcnNldE9mKGZpZWxkRXhwcmVzc2lvbiwgW10pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBvcldoZXJlSnNvbklzQXJyYXkoZmllbGRFeHByZXNzaW9uKSB7XG4gICAgcmV0dXJuIHRoaXMub3JXaGVyZUpzb25TdXBlcnNldE9mKGZpZWxkRXhwcmVzc2lvbiwgW10pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICB3aGVyZUpzb25Jc09iamVjdChmaWVsZEV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gdGhpcy53aGVyZUpzb25TdXBlcnNldE9mKGZpZWxkRXhwcmVzc2lvbiwge30pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBvcldoZXJlSnNvbklzT2JqZWN0KGZpZWxkRXhwcmVzc2lvbikge1xuICAgIHJldHVybiB0aGlzLm9yV2hlcmVKc29uU3VwZXJzZXRPZihmaWVsZEV4cHJlc3Npb24sIHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uTm90T2JqZWN0UG9zdGdyZXNPcGVyYXRpb24sIHtib29sOiAnYW5kJywgY29tcGFyZVZhbHVlOiBbXX1dKVxuICB3aGVyZUpzb25Ob3RBcnJheShmaWVsZEV4cHJlc3Npb24pIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25Ob3RPYmplY3RQb3N0Z3Jlc09wZXJhdGlvbiwge2Jvb2w6ICdvcicsIGNvbXBhcmVWYWx1ZTogW119XSlcbiAgb3JXaGVyZUpzb25Ob3RBcnJheShmaWVsZEV4cHJlc3Npb24pIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25Ob3RPYmplY3RQb3N0Z3Jlc09wZXJhdGlvbiwge2Jvb2w6ICdhbmQnLCBjb21wYXJlVmFsdWU6IHt9fV0pXG4gIHdoZXJlSnNvbk5vdE9iamVjdChmaWVsZEV4cHJlc3Npb24pIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25Ob3RPYmplY3RQb3N0Z3Jlc09wZXJhdGlvbiwge2Jvb2w6ICdvcicsIGNvbXBhcmVWYWx1ZToge319XSlcbiAgb3JXaGVyZUpzb25Ob3RPYmplY3QoZmllbGRFeHByZXNzaW9uKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5LjxzdHJpbmc+fSBrZXlzXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uSGFzUG9zdGdyZXNPcGVyYXRpb24sIHtib29sOiAnYW5kJywgb3BlcmF0b3I6ICc/fCd9XSlcbiAgd2hlcmVKc29uSGFzQW55KGZpZWxkRXhwcmVzc2lvbiwga2V5cykge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheS48c3RyaW5nPn0ga2V5c1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvbkhhc1Bvc3RncmVzT3BlcmF0aW9uLCB7Ym9vbDogJ29yJywgb3BlcmF0b3I6ICc/fCd9XSlcbiAgb3JXaGVyZUpzb25IYXNBbnkoZmllbGRFeHByZXNzaW9uLCBrZXlzKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5LjxzdHJpbmc+fSBrZXlzXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uSGFzUG9zdGdyZXNPcGVyYXRpb24sIHtib29sOiAnYW5kJywgb3BlcmF0b3I6ICc/Jid9XSlcbiAgd2hlcmVKc29uSGFzQWxsKGZpZWxkRXhwcmVzc2lvbiwga2V5cykge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheS48c3RyaW5nPn0ga2V5c1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvbkhhc1Bvc3RncmVzT3BlcmF0aW9uLCB7Ym9vbDogJ29yJywgb3BlcmF0b3I6ICc/Jid9XSlcbiAgb3JXaGVyZUpzb25IYXNBbGwoZmllbGRFeHByZXNzaW9uLCBrZXlzKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcGVyYXRvclxuICAgKiBAcGFyYW0ge2Jvb2xlYW58TnVtYmVyfHN0cmluZ3xudWxsfSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvbkZpZWxkUG9zdGdyZXNPcGVyYXRpb24sIHtib29sOiAnYW5kJ31dKVxuICB3aGVyZUpzb25GaWVsZChmaWVsZEV4cHJlc3Npb24sIG9wZXJhdG9yLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3BlcmF0b3JcbiAgICogQHBhcmFtIHtib29sZWFufE51bWJlcnxzdHJpbmd8bnVsbH0gdmFsdWVcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25GaWVsZFBvc3RncmVzT3BlcmF0aW9uLCB7Ym9vbDogJ29yJ31dKVxuICBvcldoZXJlSnNvbkZpZWxkKGZpZWxkRXhwcmVzc2lvbiwgb3BlcmF0b3IsIHZhbHVlKSB7fVxufVxuIl19