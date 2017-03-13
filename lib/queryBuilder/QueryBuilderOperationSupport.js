'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _classUtils = require('../utils/classUtils');

var _QueryBuilderContextBase = require('./QueryBuilderContextBase');

var _QueryBuilderContextBase2 = _interopRequireDefault(_QueryBuilderContextBase);

var _KnexOperation = require('./operations/KnexOperation');

var _KnexOperation2 = _interopRequireDefault(_KnexOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base functionality to be able to use query builder operation annotations.
 */

var QueryBuilderOperationSupport = function () {
  function QueryBuilderOperationSupport(knex, QueryBuilderContext) {
    (0, _classCallCheck3.default)(this, QueryBuilderOperationSupport);

    /**
     * @type {knex}
     * @protected
     */
    this._knex = knex;
    /**
     * @type {Array.<QueryBuilderOperation>}
     * @protected
     */
    this._operations = [];
    /**
     * @type {QueryBuilderContextBase}
     * @protected
     */
    this._context = new (QueryBuilderContext || _QueryBuilderContextBase2.default)(this._createUserContextBase());
  }

  /**
   * @param {function=} subclassConstructor
   * @return {Constructor.<QueryBuilderOperationSupport>}
   */


  QueryBuilderOperationSupport.extend = function extend(subclassConstructor) {
    (0, _classUtils.inherits)(subclassConstructor, this);
    return subclassConstructor;
  };

  /**
   * @param {Object=} ctx
   * @returns {Object|QueryBuilderOperationSupport}
   */


  QueryBuilderOperationSupport.prototype.context = function context(ctx) {
    if (arguments.length === 0) {
      return this._context.userContext;
    } else {
      var ctxBase = this._createUserContextBase();
      this._context.userContext = (0, _assign2.default)(ctxBase, ctx);
      return this;
    }
  };

  /**
   * @param {Object=} ctx
   * @returns {QueryBuilderOperationSupport}
   */


  QueryBuilderOperationSupport.prototype.mergeContext = function mergeContext(ctx) {
    var oldCtx = this._context.userContext;
    this._context.userContext = (0, _assign2.default)(oldCtx, ctx);
    return this;
  };

  /**
   * @param {QueryBuilderContextBase=} ctx
   * @returns {QueryBuilderContextBase|QueryBuilderOperationSupport}
   */


  QueryBuilderOperationSupport.prototype.internalContext = function internalContext(ctx) {
    if (arguments.length === 0) {
      return this._context;
    } else {
      this._context = ctx;
      return this;
    }
  };

  /**
   * @param {Object} opt
   * @returns {Object|QueryBuilderOperationSupport}
   */


  QueryBuilderOperationSupport.prototype.internalOptions = function internalOptions(opt) {
    if (arguments.length === 0) {
      return this._context.options;
    } else {
      this._context.options = (0, _assign2.default)({}, this._context.options, opt);
      return this;
    }
  };

  /**
   * @param {knex=} knex
   * @returns {Object|QueryBuilderOperationSupport}
   */


  QueryBuilderOperationSupport.prototype.knex = function knex(_knex) {
    if (arguments.length === 0) {
      var knex = this._context.knex || this._knex;

      if (!knex) {
        throw new Error('no database connection available for a query for table ' + this.modelClass().tableName + '. ' + 'You need to bind the model class or the query to a knex instance.');
      }

      return knex;
    } else {
      this._knex = _knex;
      return this;
    }
  };

  /**
   * @param {RegExp|Constructor.<? extends QueryBuilderOperation>} operationSelector
   * @return {QueryBuilderBase}
   */


  QueryBuilderOperationSupport.prototype.clear = function clear(operationSelector) {
    var operations = [];

    this.forEachOperation(operationSelector, function (op) {
      operations.push(op);
    }, false);

    this._operations = operations;
    return this;
  };

  /**
   * @param {QueryBuilderBase} queryBuilder
   * @param {RegExp|Constructor.<? extends QueryBuilderOperation>} operationSelector
   * @return {QueryBuilderBase}
   */


  QueryBuilderOperationSupport.prototype.copyFrom = function copyFrom(queryBuilder, operationSelector) {
    var _this = this;

    queryBuilder.forEachOperation(operationSelector, function (op) {
      _this._operations.push(op);
    });

    return this;
  };

  /**
   * @param {RegExp|Constructor.<? extends QueryBuilderOperation>} operationSelector
   * @returns {boolean}
   */


  QueryBuilderOperationSupport.prototype.has = function has(operationSelector) {
    var found = false;

    this.forEachOperation(operationSelector, function () {
      found = true;
      return false;
    });

    return found;
  };

  /**
   * @param {RegExp|Constructor.<? extends QueryBuilderOperation>} operationSelector
   * @returns {boolean}
   */


  QueryBuilderOperationSupport.prototype.indexOfOperation = function indexOfOperation(operationSelector) {
    var idx = -1;

    this.forEachOperation(operationSelector, function (op, i) {
      idx = i;
      return false;
    });

    return idx;
  };

  /**
   * @param {RegExp|Constructor.<? extends QueryBuilderOperation>} operationSelector
   * @param {function(QueryBuilderOperation)} callback
   * @param {boolean} match
   * @returns {QueryBuilderBase}
   */


  QueryBuilderOperationSupport.prototype.forEachOperation = function forEachOperation(operationSelector, callback) {
    var match = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (_lodash2.default.isRegExp(operationSelector)) {
      this._forEachOperationRegex(operationSelector, callback, match);
    } else {
      this._forEachOperationInstanceOf(operationSelector, callback, match);
    }

    return this;
  };

  /**
   * @param {QueryBuilderOperation} operation
   * @param {Array.<*>} args
   * @param {Boolean=} pushFront
   * @returns {QueryBuilderOperationSupport}
   */


  QueryBuilderOperationSupport.prototype.callQueryBuilderOperation = function callQueryBuilderOperation(operation, args, pushFront) {
    if (operation.call(this, args || [])) {
      if (pushFront) {
        this._operations.splice(0, 0, operation);
      } else {
        this._operations.push(operation);
      }
    }

    return this;
  };

  /**
   * @param {string} methodName
   * @param {Array.<*>} args
   * @returns {QueryBuilderOperationSupport}
   */


  QueryBuilderOperationSupport.prototype.callKnexQueryBuilderOperation = function callKnexQueryBuilderOperation(methodName, args, pushFront) {
    return this.callQueryBuilderOperation(new _KnexOperation2.default(methodName), args, pushFront);
  };

  /**
   * @returns {QueryBuilderOperationSupport}
   */


  QueryBuilderOperationSupport.prototype.clone = function clone() {
    return this.baseCloneInto(new this.constructor(this.knex()));
  };

  /**
   * @protected
   * @returns {QueryBuilderOperationSupport}
   */


  QueryBuilderOperationSupport.prototype.baseCloneInto = function baseCloneInto(builder) {
    builder._knex = this._knex;
    builder._operations = this._operations.slice();
    builder._context = this._context.clone();

    return builder;
  };

  /**
   * @returns {knex.QueryBuilder}
   */


  QueryBuilderOperationSupport.prototype.build = function build() {
    return this.buildInto(this.knex().queryBuilder());
  };

  /**
   * @protected
   */


  QueryBuilderOperationSupport.prototype.buildInto = function buildInto(knexBuilder) {
    var tmp = new Array(10);

    var i = 0;
    while (i < this._operations.length) {
      var op = this._operations[i];
      var ln = this._operations.length;

      op.onBeforeBuild(this);

      var numNew = this._operations.length - ln;

      // onBeforeBuild may call methods that add more operations. If
      // this was the case, move the operations to be executed next.
      if (numNew > 0) {
        while (tmp.length < numNew) {
          tmp.push(null);
        }

        for (var j = 0; j < numNew; ++j) {
          tmp[j] = this._operations[ln + j];
        }

        for (var _j = ln + numNew - 1; _j > i + numNew; --_j) {
          this._operations[_j] = this._operations[_j - numNew];
        }

        for (var _j2 = 0; _j2 < numNew; ++_j2) {
          this._operations[i + _j2 + 1] = tmp[_j2];
        }
      }

      ++i;
    }

    // onBuild operations should never add new operations. They should only call
    // methods on the knex query builder.
    for (var _i = 0, l = this._operations.length; _i < l; ++_i) {
      this._operations[_i].onBuild(knexBuilder, this);
    }

    return knexBuilder;
  };

  /**
   * @returns {string}
   */


  QueryBuilderOperationSupport.prototype.toString = function toString() {
    return this.build().toString();
  };

  /**
   * @returns {string}
   */


  QueryBuilderOperationSupport.prototype.toSql = function toSql() {
    return this.toString();
  };

  /**
   * @returns {QueryBuilderOperationSupport}
   */


  QueryBuilderOperationSupport.prototype.skipUndefined = function skipUndefined() {
    this._context.skipUndefined = true;
    return this;
  };

  /**
   * @returns {boolean}
   */


  QueryBuilderOperationSupport.prototype.shouldSkipUndefined = function shouldSkipUndefined() {
    return this._context.skipUndefined;
  };

  /**
   * @private
   */


  QueryBuilderOperationSupport.prototype._createUserContextBase = function _createUserContextBase() {
    var _this2 = this;

    var ctxProto = {};

    Object.defineProperty(ctxProto, 'transaction', {
      enumerable: false,
      get: function get() {
        return _this2.knex();
      }
    });

    return (0, _create2.default)(ctxProto);
  };

  /**
   * @private
   */


  QueryBuilderOperationSupport.prototype._forEachOperationRegex = function _forEachOperationRegex(operationSelector, callback, match) {
    for (var i = 0, l = this._operations.length; i < l; ++i) {
      var op = this._operations[i];

      if (operationSelector.test(op.name) === match) {
        if (callback(op, i) === false) {
          break;
        }
      }
    }
  };

  /**
   * @private
   */


  QueryBuilderOperationSupport.prototype._forEachOperationInstanceOf = function _forEachOperationInstanceOf(operationSelector, callback, match) {
    for (var i = 0, l = this._operations.length; i < l; ++i) {
      var op = this._operations[i];

      if (op instanceof operationSelector === match) {
        if (callback(op, i) === false) {
          break;
        }
      }
    }
  };

  return QueryBuilderOperationSupport;
}();

exports.default = QueryBuilderOperationSupport;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlF1ZXJ5QnVpbGRlck9wZXJhdGlvblN1cHBvcnQuanMiXSwibmFtZXMiOlsiUXVlcnlCdWlsZGVyT3BlcmF0aW9uU3VwcG9ydCIsImtuZXgiLCJRdWVyeUJ1aWxkZXJDb250ZXh0IiwiX2tuZXgiLCJfb3BlcmF0aW9ucyIsIl9jb250ZXh0IiwiX2NyZWF0ZVVzZXJDb250ZXh0QmFzZSIsImV4dGVuZCIsInN1YmNsYXNzQ29uc3RydWN0b3IiLCJjb250ZXh0IiwiY3R4IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidXNlckNvbnRleHQiLCJjdHhCYXNlIiwibWVyZ2VDb250ZXh0Iiwib2xkQ3R4IiwiaW50ZXJuYWxDb250ZXh0IiwiaW50ZXJuYWxPcHRpb25zIiwib3B0Iiwib3B0aW9ucyIsIkVycm9yIiwibW9kZWxDbGFzcyIsInRhYmxlTmFtZSIsImNsZWFyIiwib3BlcmF0aW9uU2VsZWN0b3IiLCJvcGVyYXRpb25zIiwiZm9yRWFjaE9wZXJhdGlvbiIsIm9wIiwicHVzaCIsImNvcHlGcm9tIiwicXVlcnlCdWlsZGVyIiwiaGFzIiwiZm91bmQiLCJpbmRleE9mT3BlcmF0aW9uIiwiaWR4IiwiaSIsImNhbGxiYWNrIiwibWF0Y2giLCJpc1JlZ0V4cCIsIl9mb3JFYWNoT3BlcmF0aW9uUmVnZXgiLCJfZm9yRWFjaE9wZXJhdGlvbkluc3RhbmNlT2YiLCJjYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uIiwib3BlcmF0aW9uIiwiYXJncyIsInB1c2hGcm9udCIsImNhbGwiLCJzcGxpY2UiLCJjYWxsS25leFF1ZXJ5QnVpbGRlck9wZXJhdGlvbiIsIm1ldGhvZE5hbWUiLCJjbG9uZSIsImJhc2VDbG9uZUludG8iLCJjb25zdHJ1Y3RvciIsImJ1aWxkZXIiLCJzbGljZSIsImJ1aWxkIiwiYnVpbGRJbnRvIiwia25leEJ1aWxkZXIiLCJ0bXAiLCJBcnJheSIsImxuIiwib25CZWZvcmVCdWlsZCIsIm51bU5ldyIsImoiLCJsIiwib25CdWlsZCIsInRvU3RyaW5nIiwidG9TcWwiLCJza2lwVW5kZWZpbmVkIiwic2hvdWxkU2tpcFVuZGVmaW5lZCIsImN0eFByb3RvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwidGVzdCIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7O0lBSXFCQSw0QjtBQUVuQix3Q0FBWUMsSUFBWixFQUFrQkMsbUJBQWxCLEVBQXVDO0FBQUE7O0FBQ3JDOzs7O0FBSUEsU0FBS0MsS0FBTCxHQUFhRixJQUFiO0FBQ0E7Ozs7QUFJQSxTQUFLRyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0E7Ozs7QUFJQSxTQUFLQyxRQUFMLEdBQWdCLEtBQUtILHdEQUFMLEVBQXFELEtBQUtJLHNCQUFMLEVBQXJELENBQWhCO0FBQ0Q7O0FBRUQ7Ozs7OzsrQkFJT0MsTSxtQkFBT0MsbUIsRUFBcUI7QUFDakMsOEJBQVNBLG1CQUFULEVBQThCLElBQTlCO0FBQ0EsV0FBT0EsbUJBQVA7QUFDRCxHOztBQUVEOzs7Ozs7eUNBSUFDLE8sb0JBQVFDLEcsRUFBSztBQUNYLFFBQUlDLFVBQVVDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsYUFBTyxLQUFLUCxRQUFMLENBQWNRLFdBQXJCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsVUFBTUMsVUFBVSxLQUFLUixzQkFBTCxFQUFoQjtBQUNBLFdBQUtELFFBQUwsQ0FBY1EsV0FBZCxHQUE0QixzQkFBY0MsT0FBZCxFQUF1QkosR0FBdkIsQ0FBNUI7QUFDQSxhQUFPLElBQVA7QUFDRDtBQUNGLEc7O0FBRUQ7Ozs7Ozt5Q0FJQUssWSx5QkFBYUwsRyxFQUFLO0FBQ2hCLFFBQU1NLFNBQVMsS0FBS1gsUUFBTCxDQUFjUSxXQUE3QjtBQUNBLFNBQUtSLFFBQUwsQ0FBY1EsV0FBZCxHQUE0QixzQkFBY0csTUFBZCxFQUFzQk4sR0FBdEIsQ0FBNUI7QUFDQSxXQUFPLElBQVA7QUFDRCxHOztBQUVEOzs7Ozs7eUNBSUFPLGUsNEJBQWdCUCxHLEVBQUs7QUFDbkIsUUFBSUMsVUFBVUMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQixhQUFPLEtBQUtQLFFBQVo7QUFDRCxLQUZELE1BRU87QUFDTCxXQUFLQSxRQUFMLEdBQWdCSyxHQUFoQjtBQUNBLGFBQU8sSUFBUDtBQUNEO0FBQ0YsRzs7QUFFRDs7Ozs7O3lDQUlBUSxlLDRCQUFnQkMsRyxFQUFLO0FBQ25CLFFBQUlSLFVBQVVDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsYUFBTyxLQUFLUCxRQUFMLENBQWNlLE9BQXJCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsV0FBS2YsUUFBTCxDQUFjZSxPQUFkLEdBQXdCLHNCQUFjLEVBQWQsRUFBa0IsS0FBS2YsUUFBTCxDQUFjZSxPQUFoQyxFQUF5Q0QsR0FBekMsQ0FBeEI7QUFDQSxhQUFPLElBQVA7QUFDRDtBQUNGLEc7O0FBRUQ7Ozs7Ozt5Q0FJQWxCLEksaUJBQUtBLEssRUFBTTtBQUNULFFBQUlVLFVBQVVDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBTVgsT0FBTyxLQUFLSSxRQUFMLENBQWNKLElBQWQsSUFBc0IsS0FBS0UsS0FBeEM7O0FBRUEsVUFBSSxDQUFDRixJQUFMLEVBQVc7QUFDVCxjQUFNLElBQUlvQixLQUFKLENBQ0osNERBQTBELEtBQUtDLFVBQUwsR0FBa0JDLFNBQTVFLDZFQURJLENBQU47QUFHRDs7QUFFRCxhQUFPdEIsSUFBUDtBQUNELEtBVkQsTUFVTztBQUNMLFdBQUtFLEtBQUwsR0FBYUYsS0FBYjtBQUNBLGFBQU8sSUFBUDtBQUNEO0FBQ0YsRzs7QUFFRDs7Ozs7O3lDQUlBdUIsSyxrQkFBTUMsaUIsRUFBbUI7QUFDdkIsUUFBTUMsYUFBYSxFQUFuQjs7QUFFQSxTQUFLQyxnQkFBTCxDQUFzQkYsaUJBQXRCLEVBQXlDLFVBQUNHLEVBQUQsRUFBUTtBQUMvQ0YsaUJBQVdHLElBQVgsQ0FBZ0JELEVBQWhCO0FBQ0QsS0FGRCxFQUVHLEtBRkg7O0FBSUEsU0FBS3hCLFdBQUwsR0FBbUJzQixVQUFuQjtBQUNBLFdBQU8sSUFBUDtBQUNELEc7O0FBRUQ7Ozs7Ozs7eUNBS0FJLFEscUJBQVNDLFksRUFBY04saUIsRUFBbUI7QUFBQTs7QUFDeENNLGlCQUFhSixnQkFBYixDQUE4QkYsaUJBQTlCLEVBQWlELFVBQUNHLEVBQUQsRUFBUTtBQUN2RCxZQUFLeEIsV0FBTCxDQUFpQnlCLElBQWpCLENBQXNCRCxFQUF0QjtBQUNELEtBRkQ7O0FBSUEsV0FBTyxJQUFQO0FBQ0QsRzs7QUFFRDs7Ozs7O3lDQUlBSSxHLGdCQUFJUCxpQixFQUFtQjtBQUNyQixRQUFJUSxRQUFRLEtBQVo7O0FBRUEsU0FBS04sZ0JBQUwsQ0FBc0JGLGlCQUF0QixFQUF5QyxZQUFNO0FBQzdDUSxjQUFRLElBQVI7QUFDQSxhQUFPLEtBQVA7QUFDRCxLQUhEOztBQUtBLFdBQU9BLEtBQVA7QUFDRCxHOztBQUVEOzs7Ozs7eUNBSUFDLGdCLDZCQUFpQlQsaUIsRUFBbUI7QUFDbEMsUUFBSVUsTUFBTSxDQUFDLENBQVg7O0FBRUEsU0FBS1IsZ0JBQUwsQ0FBc0JGLGlCQUF0QixFQUF5QyxVQUFDRyxFQUFELEVBQUtRLENBQUwsRUFBVztBQUNsREQsWUFBTUMsQ0FBTjtBQUNBLGFBQU8sS0FBUDtBQUNELEtBSEQ7O0FBS0EsV0FBT0QsR0FBUDtBQUNELEc7O0FBRUQ7Ozs7Ozs7O3lDQU1BUixnQiw2QkFBaUJGLGlCLEVBQW1CWSxRLEVBQXdCO0FBQUEsUUFBZEMsS0FBYyx1RUFBTixJQUFNOztBQUMxRCxRQUFJLGlCQUFFQyxRQUFGLENBQVdkLGlCQUFYLENBQUosRUFBbUM7QUFDakMsV0FBS2Usc0JBQUwsQ0FBNEJmLGlCQUE1QixFQUErQ1ksUUFBL0MsRUFBeURDLEtBQXpEO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsV0FBS0csMkJBQUwsQ0FBaUNoQixpQkFBakMsRUFBb0RZLFFBQXBELEVBQThEQyxLQUE5RDtBQUNEOztBQUVELFdBQU8sSUFBUDtBQUNELEc7O0FBRUQ7Ozs7Ozs7O3lDQU1DSSx5QixzQ0FBMEJDLFMsRUFBV0MsSSxFQUFNQyxTLEVBQVc7QUFDckQsUUFBSUYsVUFBVUcsSUFBVixDQUFlLElBQWYsRUFBcUJGLFFBQVEsRUFBN0IsQ0FBSixFQUFzQztBQUNwQyxVQUFJQyxTQUFKLEVBQWU7QUFDYixhQUFLekMsV0FBTCxDQUFpQjJDLE1BQWpCLENBQXdCLENBQXhCLEVBQTJCLENBQTNCLEVBQThCSixTQUE5QjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUt2QyxXQUFMLENBQWlCeUIsSUFBakIsQ0FBc0JjLFNBQXRCO0FBQ0Q7QUFDRjs7QUFFRCxXQUFPLElBQVA7QUFDRCxHOztBQUVEOzs7Ozs7O3lDQUtBSyw2QiwwQ0FBOEJDLFUsRUFBWUwsSSxFQUFNQyxTLEVBQVc7QUFDekQsV0FBTyxLQUFLSCx5QkFBTCxDQUErQiw0QkFBa0JPLFVBQWxCLENBQS9CLEVBQThETCxJQUE5RCxFQUFvRUMsU0FBcEUsQ0FBUDtBQUNELEc7O0FBRUQ7Ozs7O3lDQUdBSyxLLG9CQUFRO0FBQ04sV0FBTyxLQUFLQyxhQUFMLENBQW1CLElBQUksS0FBS0MsV0FBVCxDQUFxQixLQUFLbkQsSUFBTCxFQUFyQixDQUFuQixDQUFQO0FBQ0QsRzs7QUFFRDs7Ozs7O3lDQUlBa0QsYSwwQkFBY0UsTyxFQUFTO0FBQ3JCQSxZQUFRbEQsS0FBUixHQUFnQixLQUFLQSxLQUFyQjtBQUNBa0QsWUFBUWpELFdBQVIsR0FBc0IsS0FBS0EsV0FBTCxDQUFpQmtELEtBQWpCLEVBQXRCO0FBQ0FELFlBQVFoRCxRQUFSLEdBQW1CLEtBQUtBLFFBQUwsQ0FBYzZDLEtBQWQsRUFBbkI7O0FBRUEsV0FBT0csT0FBUDtBQUNELEc7O0FBRUQ7Ozs7O3lDQUdBRSxLLG9CQUFRO0FBQ04sV0FBTyxLQUFLQyxTQUFMLENBQWUsS0FBS3ZELElBQUwsR0FBWThCLFlBQVosRUFBZixDQUFQO0FBQ0QsRzs7QUFFRDs7Ozs7eUNBR0F5QixTLHNCQUFVQyxXLEVBQWE7QUFDckIsUUFBTUMsTUFBTSxJQUFJQyxLQUFKLENBQVUsRUFBVixDQUFaOztBQUVBLFFBQUl2QixJQUFJLENBQVI7QUFDQSxXQUFPQSxJQUFJLEtBQUtoQyxXQUFMLENBQWlCUSxNQUE1QixFQUFvQztBQUNsQyxVQUFNZ0IsS0FBSyxLQUFLeEIsV0FBTCxDQUFpQmdDLENBQWpCLENBQVg7QUFDQSxVQUFNd0IsS0FBSyxLQUFLeEQsV0FBTCxDQUFpQlEsTUFBNUI7O0FBRUFnQixTQUFHaUMsYUFBSCxDQUFpQixJQUFqQjs7QUFFQSxVQUFNQyxTQUFTLEtBQUsxRCxXQUFMLENBQWlCUSxNQUFqQixHQUEwQmdELEVBQXpDOztBQUVBO0FBQ0E7QUFDQSxVQUFJRSxTQUFTLENBQWIsRUFBZ0I7QUFDZCxlQUFPSixJQUFJOUMsTUFBSixHQUFha0QsTUFBcEIsRUFBNEI7QUFDMUJKLGNBQUk3QixJQUFKLENBQVMsSUFBVDtBQUNEOztBQUVELGFBQUssSUFBSWtDLElBQUksQ0FBYixFQUFnQkEsSUFBSUQsTUFBcEIsRUFBNEIsRUFBRUMsQ0FBOUIsRUFBaUM7QUFDL0JMLGNBQUlLLENBQUosSUFBUyxLQUFLM0QsV0FBTCxDQUFpQndELEtBQUtHLENBQXRCLENBQVQ7QUFDRDs7QUFFRCxhQUFLLElBQUlBLEtBQUlILEtBQUtFLE1BQUwsR0FBYyxDQUEzQixFQUE4QkMsS0FBSTNCLElBQUkwQixNQUF0QyxFQUE4QyxFQUFFQyxFQUFoRCxFQUFtRDtBQUNqRCxlQUFLM0QsV0FBTCxDQUFpQjJELEVBQWpCLElBQXNCLEtBQUszRCxXQUFMLENBQWlCMkQsS0FBSUQsTUFBckIsQ0FBdEI7QUFDRDs7QUFFRCxhQUFLLElBQUlDLE1BQUksQ0FBYixFQUFnQkEsTUFBSUQsTUFBcEIsRUFBNEIsRUFBRUMsR0FBOUIsRUFBaUM7QUFDL0IsZUFBSzNELFdBQUwsQ0FBaUJnQyxJQUFJMkIsR0FBSixHQUFRLENBQXpCLElBQThCTCxJQUFJSyxHQUFKLENBQTlCO0FBQ0Q7QUFDRjs7QUFFRCxRQUFFM0IsQ0FBRjtBQUNEOztBQUVEO0FBQ0E7QUFDQSxTQUFLLElBQUlBLEtBQUksQ0FBUixFQUFXNEIsSUFBSSxLQUFLNUQsV0FBTCxDQUFpQlEsTUFBckMsRUFBNkN3QixLQUFJNEIsQ0FBakQsRUFBb0QsRUFBRTVCLEVBQXRELEVBQXlEO0FBQ3ZELFdBQUtoQyxXQUFMLENBQWlCZ0MsRUFBakIsRUFBb0I2QixPQUFwQixDQUE0QlIsV0FBNUIsRUFBeUMsSUFBekM7QUFDRDs7QUFFRCxXQUFPQSxXQUFQO0FBQ0QsRzs7QUFFRDs7Ozs7eUNBR0FTLFEsdUJBQVc7QUFDVCxXQUFPLEtBQUtYLEtBQUwsR0FBYVcsUUFBYixFQUFQO0FBQ0QsRzs7QUFFRDs7Ozs7eUNBR0FDLEssb0JBQVE7QUFDTixXQUFPLEtBQUtELFFBQUwsRUFBUDtBQUNELEc7O0FBRUQ7Ozs7O3lDQUdBRSxhLDRCQUFnQjtBQUNkLFNBQUsvRCxRQUFMLENBQWMrRCxhQUFkLEdBQThCLElBQTlCO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsRzs7QUFFRDs7Ozs7eUNBR0FDLG1CLGtDQUFzQjtBQUNwQixXQUFPLEtBQUtoRSxRQUFMLENBQWMrRCxhQUFyQjtBQUNELEc7O0FBRUQ7Ozs7O3lDQUdBOUQsc0IscUNBQXlCO0FBQUE7O0FBQ3ZCLFFBQU1nRSxXQUFXLEVBQWpCOztBQUVBQyxXQUFPQyxjQUFQLENBQXNCRixRQUF0QixFQUFnQyxhQUFoQyxFQUErQztBQUM3Q0csa0JBQVksS0FEaUM7QUFFN0NDLFdBQUs7QUFBQSxlQUFNLE9BQUt6RSxJQUFMLEVBQU47QUFBQTtBQUZ3QyxLQUEvQzs7QUFLQSxXQUFPLHNCQUFjcUUsUUFBZCxDQUFQO0FBQ0QsRzs7QUFFRDs7Ozs7eUNBR0E5QixzQixtQ0FBdUJmLGlCLEVBQW1CWSxRLEVBQVVDLEssRUFBTztBQUN6RCxTQUFLLElBQUlGLElBQUksQ0FBUixFQUFXNEIsSUFBSSxLQUFLNUQsV0FBTCxDQUFpQlEsTUFBckMsRUFBNkN3QixJQUFJNEIsQ0FBakQsRUFBb0QsRUFBRTVCLENBQXRELEVBQXlEO0FBQ3ZELFVBQU1SLEtBQUssS0FBS3hCLFdBQUwsQ0FBaUJnQyxDQUFqQixDQUFYOztBQUVBLFVBQUlYLGtCQUFrQmtELElBQWxCLENBQXVCL0MsR0FBR2dELElBQTFCLE1BQW9DdEMsS0FBeEMsRUFBK0M7QUFDN0MsWUFBSUQsU0FBU1QsRUFBVCxFQUFhUSxDQUFiLE1BQW9CLEtBQXhCLEVBQStCO0FBQzdCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsRzs7QUFFRDs7Ozs7eUNBR0FLLDJCLHdDQUE0QmhCLGlCLEVBQW1CWSxRLEVBQVVDLEssRUFBTztBQUM5RCxTQUFLLElBQUlGLElBQUksQ0FBUixFQUFXNEIsSUFBSSxLQUFLNUQsV0FBTCxDQUFpQlEsTUFBckMsRUFBNkN3QixJQUFJNEIsQ0FBakQsRUFBb0QsRUFBRTVCLENBQXRELEVBQXlEO0FBQ3ZELFVBQU1SLEtBQUssS0FBS3hCLFdBQUwsQ0FBaUJnQyxDQUFqQixDQUFYOztBQUVBLFVBQUtSLGNBQWNILGlCQUFmLEtBQXNDYSxLQUExQyxFQUFpRDtBQUMvQyxZQUFJRCxTQUFTVCxFQUFULEVBQWFRLENBQWIsTUFBb0IsS0FBeEIsRUFBK0I7QUFDN0I7QUFDRDtBQUNGO0FBQ0Y7QUFDRixHOzs7OztrQkF6VmtCcEMsNEIiLCJmaWxlIjoiUXVlcnlCdWlsZGVyT3BlcmF0aW9uU3VwcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge2luaGVyaXRzfSBmcm9tICcuLi91dGlscy9jbGFzc1V0aWxzJztcbmltcG9ydCBRdWVyeUJ1aWxkZXJDb250ZXh0QmFzZSBmcm9tICcuL1F1ZXJ5QnVpbGRlckNvbnRleHRCYXNlJztcbmltcG9ydCBLbmV4T3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9LbmV4T3BlcmF0aW9uJztcblxuLyoqXG4gKiBCYXNlIGZ1bmN0aW9uYWxpdHkgdG8gYmUgYWJsZSB0byB1c2UgcXVlcnkgYnVpbGRlciBvcGVyYXRpb24gYW5ub3RhdGlvbnMuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVlcnlCdWlsZGVyT3BlcmF0aW9uU3VwcG9ydCB7XG5cbiAgY29uc3RydWN0b3Ioa25leCwgUXVlcnlCdWlsZGVyQ29udGV4dCkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtrbmV4fVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICB0aGlzLl9rbmV4ID0ga25leDtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPFF1ZXJ5QnVpbGRlck9wZXJhdGlvbj59XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHRoaXMuX29wZXJhdGlvbnMgPSBbXTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7UXVlcnlCdWlsZGVyQ29udGV4dEJhc2V9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHRoaXMuX2NvbnRleHQgPSBuZXcgKFF1ZXJ5QnVpbGRlckNvbnRleHQgfHwgUXVlcnlCdWlsZGVyQ29udGV4dEJhc2UpKHRoaXMuX2NyZWF0ZVVzZXJDb250ZXh0QmFzZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uPX0gc3ViY2xhc3NDb25zdHJ1Y3RvclxuICAgKiBAcmV0dXJuIHtDb25zdHJ1Y3Rvci48UXVlcnlCdWlsZGVyT3BlcmF0aW9uU3VwcG9ydD59XG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKHN1YmNsYXNzQ29uc3RydWN0b3IpIHtcbiAgICBpbmhlcml0cyhzdWJjbGFzc0NvbnN0cnVjdG9yLCB0aGlzKTtcbiAgICByZXR1cm4gc3ViY2xhc3NDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdD19IGN0eFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fFF1ZXJ5QnVpbGRlck9wZXJhdGlvblN1cHBvcnR9XG4gICAqL1xuICBjb250ZXh0KGN0eCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udGV4dC51c2VyQ29udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY3R4QmFzZSA9IHRoaXMuX2NyZWF0ZVVzZXJDb250ZXh0QmFzZSgpO1xuICAgICAgdGhpcy5fY29udGV4dC51c2VyQ29udGV4dCA9IE9iamVjdC5hc3NpZ24oY3R4QmFzZSwgY3R4KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdD19IGN0eFxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyT3BlcmF0aW9uU3VwcG9ydH1cbiAgICovXG4gIG1lcmdlQ29udGV4dChjdHgpIHtcbiAgICBjb25zdCBvbGRDdHggPSB0aGlzLl9jb250ZXh0LnVzZXJDb250ZXh0O1xuICAgIHRoaXMuX2NvbnRleHQudXNlckNvbnRleHQgPSBPYmplY3QuYXNzaWduKG9sZEN0eCwgY3R4KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlckNvbnRleHRCYXNlPX0gY3R4XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJDb250ZXh0QmFzZXxRdWVyeUJ1aWxkZXJPcGVyYXRpb25TdXBwb3J0fVxuICAgKi9cbiAgaW50ZXJuYWxDb250ZXh0KGN0eCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY29udGV4dCA9IGN0eDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0XG4gICAqIEByZXR1cm5zIHtPYmplY3R8UXVlcnlCdWlsZGVyT3BlcmF0aW9uU3VwcG9ydH1cbiAgICovXG4gIGludGVybmFsT3B0aW9ucyhvcHQpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQub3B0aW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY29udGV4dC5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fY29udGV4dC5vcHRpb25zLCBvcHQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7a25leD19IGtuZXhcbiAgICogQHJldHVybnMge09iamVjdHxRdWVyeUJ1aWxkZXJPcGVyYXRpb25TdXBwb3J0fVxuICAgKi9cbiAga25leChrbmV4KSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IGtuZXggPSB0aGlzLl9jb250ZXh0LmtuZXggfHwgdGhpcy5fa25leDtcblxuICAgICAgaWYgKCFrbmV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgbm8gZGF0YWJhc2UgY29ubmVjdGlvbiBhdmFpbGFibGUgZm9yIGEgcXVlcnkgZm9yIHRhYmxlICR7dGhpcy5tb2RlbENsYXNzKCkudGFibGVOYW1lfS4gYCArXG4gICAgICAgICAgYFlvdSBuZWVkIHRvIGJpbmQgdGhlIG1vZGVsIGNsYXNzIG9yIHRoZSBxdWVyeSB0byBhIGtuZXggaW5zdGFuY2UuYCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBrbmV4O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9rbmV4ID0ga25leDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1JlZ0V4cHxDb25zdHJ1Y3Rvci48PyBleHRlbmRzIFF1ZXJ5QnVpbGRlck9wZXJhdGlvbj59IG9wZXJhdGlvblNlbGVjdG9yXG4gICAqIEByZXR1cm4ge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBjbGVhcihvcGVyYXRpb25TZWxlY3Rvcikge1xuICAgIGNvbnN0IG9wZXJhdGlvbnMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaE9wZXJhdGlvbihvcGVyYXRpb25TZWxlY3RvciwgKG9wKSA9PiB7XG4gICAgICBvcGVyYXRpb25zLnB1c2gob3ApO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuX29wZXJhdGlvbnMgPSBvcGVyYXRpb25zO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyQmFzZX0gcXVlcnlCdWlsZGVyXG4gICAqIEBwYXJhbSB7UmVnRXhwfENvbnN0cnVjdG9yLjw/IGV4dGVuZHMgUXVlcnlCdWlsZGVyT3BlcmF0aW9uPn0gb3BlcmF0aW9uU2VsZWN0b3JcbiAgICogQHJldHVybiB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIGNvcHlGcm9tKHF1ZXJ5QnVpbGRlciwgb3BlcmF0aW9uU2VsZWN0b3IpIHtcbiAgICBxdWVyeUJ1aWxkZXIuZm9yRWFjaE9wZXJhdGlvbihvcGVyYXRpb25TZWxlY3RvciwgKG9wKSA9PiB7XG4gICAgICB0aGlzLl9vcGVyYXRpb25zLnB1c2gob3ApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtSZWdFeHB8Q29uc3RydWN0b3IuPD8gZXh0ZW5kcyBRdWVyeUJ1aWxkZXJPcGVyYXRpb24+fSBvcGVyYXRpb25TZWxlY3RvclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGhhcyhvcGVyYXRpb25TZWxlY3Rvcikge1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5mb3JFYWNoT3BlcmF0aW9uKG9wZXJhdGlvblNlbGVjdG9yLCAoKSA9PiB7XG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtSZWdFeHB8Q29uc3RydWN0b3IuPD8gZXh0ZW5kcyBRdWVyeUJ1aWxkZXJPcGVyYXRpb24+fSBvcGVyYXRpb25TZWxlY3RvclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGluZGV4T2ZPcGVyYXRpb24ob3BlcmF0aW9uU2VsZWN0b3IpIHtcbiAgICBsZXQgaWR4ID0gLTE7XG5cbiAgICB0aGlzLmZvckVhY2hPcGVyYXRpb24ob3BlcmF0aW9uU2VsZWN0b3IsIChvcCwgaSkgPT4ge1xuICAgICAgaWR4ID0gaTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpZHg7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtSZWdFeHB8Q29uc3RydWN0b3IuPD8gZXh0ZW5kcyBRdWVyeUJ1aWxkZXJPcGVyYXRpb24+fSBvcGVyYXRpb25TZWxlY3RvclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFF1ZXJ5QnVpbGRlck9wZXJhdGlvbil9IGNhbGxiYWNrXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWF0Y2hcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBmb3JFYWNoT3BlcmF0aW9uKG9wZXJhdGlvblNlbGVjdG9yLCBjYWxsYmFjaywgbWF0Y2ggPSB0cnVlKSB7XG4gICAgaWYgKF8uaXNSZWdFeHAob3BlcmF0aW9uU2VsZWN0b3IpKSB7XG4gICAgICB0aGlzLl9mb3JFYWNoT3BlcmF0aW9uUmVnZXgob3BlcmF0aW9uU2VsZWN0b3IsIGNhbGxiYWNrLCBtYXRjaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZvckVhY2hPcGVyYXRpb25JbnN0YW5jZU9mKG9wZXJhdGlvblNlbGVjdG9yLCBjYWxsYmFjaywgbWF0Y2gpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyT3BlcmF0aW9ufSBvcGVyYXRpb25cbiAgICogQHBhcmFtIHtBcnJheS48Kj59IGFyZ3NcbiAgICogQHBhcmFtIHtCb29sZWFuPX0gcHVzaEZyb250XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJPcGVyYXRpb25TdXBwb3J0fVxuICAgKi9cbiAgIGNhbGxRdWVyeUJ1aWxkZXJPcGVyYXRpb24ob3BlcmF0aW9uLCBhcmdzLCBwdXNoRnJvbnQpIHtcbiAgICBpZiAob3BlcmF0aW9uLmNhbGwodGhpcywgYXJncyB8fCBbXSkpIHtcbiAgICAgIGlmIChwdXNoRnJvbnQpIHtcbiAgICAgICAgdGhpcy5fb3BlcmF0aW9ucy5zcGxpY2UoMCwgMCwgb3BlcmF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX29wZXJhdGlvbnMucHVzaChvcGVyYXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lXG4gICAqIEBwYXJhbSB7QXJyYXkuPCo+fSBhcmdzXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJPcGVyYXRpb25TdXBwb3J0fVxuICAgKi9cbiAgY2FsbEtuZXhRdWVyeUJ1aWxkZXJPcGVyYXRpb24obWV0aG9kTmFtZSwgYXJncywgcHVzaEZyb250KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbFF1ZXJ5QnVpbGRlck9wZXJhdGlvbihuZXcgS25leE9wZXJhdGlvbihtZXRob2ROYW1lKSwgYXJncywgcHVzaEZyb250KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyT3BlcmF0aW9uU3VwcG9ydH1cbiAgICovXG4gIGNsb25lKCkge1xuICAgIHJldHVybiB0aGlzLmJhc2VDbG9uZUludG8obmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5rbmV4KCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJPcGVyYXRpb25TdXBwb3J0fVxuICAgKi9cbiAgYmFzZUNsb25lSW50byhidWlsZGVyKSB7XG4gICAgYnVpbGRlci5fa25leCA9IHRoaXMuX2tuZXg7XG4gICAgYnVpbGRlci5fb3BlcmF0aW9ucyA9IHRoaXMuX29wZXJhdGlvbnMuc2xpY2UoKTtcbiAgICBidWlsZGVyLl9jb250ZXh0ID0gdGhpcy5fY29udGV4dC5jbG9uZSgpO1xuXG4gICAgcmV0dXJuIGJ1aWxkZXI7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge2tuZXguUXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgYnVpbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVpbGRJbnRvKHRoaXMua25leCgpLnF1ZXJ5QnVpbGRlcigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBidWlsZEludG8oa25leEJ1aWxkZXIpIHtcbiAgICBjb25zdCB0bXAgPSBuZXcgQXJyYXkoMTApO1xuXG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChpIDwgdGhpcy5fb3BlcmF0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG9wID0gdGhpcy5fb3BlcmF0aW9uc1tpXTtcbiAgICAgIGNvbnN0IGxuID0gdGhpcy5fb3BlcmF0aW9ucy5sZW5ndGg7XG5cbiAgICAgIG9wLm9uQmVmb3JlQnVpbGQodGhpcyk7XG5cbiAgICAgIGNvbnN0IG51bU5ldyA9IHRoaXMuX29wZXJhdGlvbnMubGVuZ3RoIC0gbG47XG5cbiAgICAgIC8vIG9uQmVmb3JlQnVpbGQgbWF5IGNhbGwgbWV0aG9kcyB0aGF0IGFkZCBtb3JlIG9wZXJhdGlvbnMuIElmXG4gICAgICAvLyB0aGlzIHdhcyB0aGUgY2FzZSwgbW92ZSB0aGUgb3BlcmF0aW9ucyB0byBiZSBleGVjdXRlZCBuZXh0LlxuICAgICAgaWYgKG51bU5ldyA+IDApIHtcbiAgICAgICAgd2hpbGUgKHRtcC5sZW5ndGggPCBudW1OZXcpIHtcbiAgICAgICAgICB0bXAucHVzaChudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtTmV3OyArK2opIHtcbiAgICAgICAgICB0bXBbal0gPSB0aGlzLl9vcGVyYXRpb25zW2xuICsgal07XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBqID0gbG4gKyBudW1OZXcgLSAxOyBqID4gaSArIG51bU5ldzsgLS1qKSB7XG4gICAgICAgICAgdGhpcy5fb3BlcmF0aW9uc1tqXSA9IHRoaXMuX29wZXJhdGlvbnNbaiAtIG51bU5ld107XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bU5ldzsgKytqKSB7XG4gICAgICAgICAgdGhpcy5fb3BlcmF0aW9uc1tpICsgaiArIDFdID0gdG1wW2pdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICsraTtcbiAgICB9XG5cbiAgICAvLyBvbkJ1aWxkIG9wZXJhdGlvbnMgc2hvdWxkIG5ldmVyIGFkZCBuZXcgb3BlcmF0aW9ucy4gVGhleSBzaG91bGQgb25seSBjYWxsXG4gICAgLy8gbWV0aG9kcyBvbiB0aGUga25leCBxdWVyeSBidWlsZGVyLlxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5fb3BlcmF0aW9ucy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIHRoaXMuX29wZXJhdGlvbnNbaV0ub25CdWlsZChrbmV4QnVpbGRlciwgdGhpcylcbiAgICB9XG5cbiAgICByZXR1cm4ga25leEJ1aWxkZXI7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmJ1aWxkKCkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgdG9TcWwoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyT3BlcmF0aW9uU3VwcG9ydH1cbiAgICovXG4gIHNraXBVbmRlZmluZWQoKSB7XG4gICAgdGhpcy5fY29udGV4dC5za2lwVW5kZWZpbmVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHNob3VsZFNraXBVbmRlZmluZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuc2tpcFVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2NyZWF0ZVVzZXJDb250ZXh0QmFzZSgpIHtcbiAgICBjb25zdCBjdHhQcm90byA9IHt9O1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eFByb3RvLCAndHJhbnNhY3Rpb24nLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGdldDogKCkgPT4gdGhpcy5rbmV4KClcbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKGN0eFByb3RvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2ZvckVhY2hPcGVyYXRpb25SZWdleChvcGVyYXRpb25TZWxlY3RvciwgY2FsbGJhY2ssIG1hdGNoKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLl9vcGVyYXRpb25zLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3Qgb3AgPSB0aGlzLl9vcGVyYXRpb25zW2ldO1xuXG4gICAgICBpZiAob3BlcmF0aW9uU2VsZWN0b3IudGVzdChvcC5uYW1lKSA9PT0gbWF0Y2gpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKG9wLCBpKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2ZvckVhY2hPcGVyYXRpb25JbnN0YW5jZU9mKG9wZXJhdGlvblNlbGVjdG9yLCBjYWxsYmFjaywgbWF0Y2gpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuX29wZXJhdGlvbnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBvcCA9IHRoaXMuX29wZXJhdGlvbnNbaV07XG5cbiAgICAgIGlmICgob3AgaW5zdGFuY2VvZiBvcGVyYXRpb25TZWxlY3RvcikgPT09IG1hdGNoKSB7XG4gICAgICAgIGlmIChjYWxsYmFjayhvcCwgaSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==