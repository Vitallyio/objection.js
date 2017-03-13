'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _relationExpressionParser = require('./parsers/relationExpressionParser');

var _relationExpressionParser2 = _interopRequireDefault(_relationExpressionParser);

var _ValidationError = require('../model/ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RECURSIVE_REGEX = /^\^(\d*)$/;
var ALL_RECURSIVE_REGEX = /^\*$/;

var RelationExpression = function () {
  function RelationExpression(node, recursionDepth, filters) {
    (0, _classCallCheck3.default)(this, RelationExpression);

    node = node || {};

    this.name = node.name || null;
    this.args = node.args || [];
    this.numChildren = node.numChildren || 0;
    this.children = node.children || {};

    Object.defineProperty(this, '_recursionDepth', {
      enumerable: false,
      value: recursionDepth || 0
    });

    Object.defineProperty(this, '_filters', {
      enumerable: false,
      writable: true,
      value: filters || {}
    });
  }

  /**
   * @param {string|RelationExpression} expr
   * @returns {RelationExpression}
   */


  RelationExpression.parse = function parse(expr) {
    if (expr instanceof RelationExpression) {
      return expr;
    } else if (!_lodash2.default.isString(expr) || _lodash2.default.isEmpty(expr.trim())) {
      return new RelationExpression();
    } else {
      try {
        return new RelationExpression(_relationExpressionParser2.default.parse(expr));
      } catch (err) {
        throw new _ValidationError2.default({
          message: 'Invalid relation expression "' + expr + '"',
          cause: err.message
        });
      }
    }
  };

  /**
   * @param {Object|Array} graph
   */


  RelationExpression.fromGraph = function fromGraph(graph) {
    if (!graph) {
      return new RelationExpression();
    }

    return new RelationExpression(modelGraphToNode(graph, newNode()));
  };

  /**
   * @param {string|RelationExpression} expr
   * @returns {RelationExpression}
   */
  RelationExpression.prototype.merge = function merge(expr) {
    var merged = this.clone();
    expr = RelationExpression.parse(expr);

    merged.numChildren += expr.numChildren;
    merged.children = _lodash2.default.merge(merged.children, expr.children);
    merged.args = _lodash2.default.merge(merged.args, expr.args);
    merged.filters = _lodash2.default.merge(merged.filters, expr.filters);

    // Handle recursive and all recursive nodes.
    visit(merged, function (node, childNames) {
      var maxName = null;
      var maxDepth = 0;
      var recurCount = 0;

      for (var i = 0, l = childNames.length; i < l; ++i) {
        var name = childNames[i];
        var depth = _maxRecursionDepth(name);

        if (depth > 0) {
          recurCount++;
        }

        if (depth > maxDepth) {
          maxDepth = depth;
          maxName = name;
        }
      }

      if (recurCount > 0) {
        delete node.children[node.name];
      }

      if (recurCount > 1) {
        for (var _i = 0, _l = childNames.length; _i < _l; ++_i) {
          var _name = childNames[_i];

          if (_name !== maxName) {
            delete node.children[_name];
          }
        }
      }
    });

    return merged;
  };

  /**
   * @param {string|RelationExpression} expr
   * @returns {boolean}
   */


  RelationExpression.prototype.isSubExpression = function isSubExpression(expr) {
    var _this = this;

    expr = RelationExpression.parse(expr);

    if (this.isAllRecursive()) {
      return true;
    }

    if (expr.isAllRecursive()) {
      return this.isAllRecursive();
    }

    if (this.name !== expr.name) {
      return false;
    }

    var maxRecursionDepth = expr.maxRecursionDepth();

    if (maxRecursionDepth > 0) {
      return this.isAllRecursive() || this.maxRecursionDepth() >= maxRecursionDepth;
    }

    return _lodash2.default.every(expr.children, function (child, childName) {
      var ownSubExpression = _this.childExpression(childName);
      var subExpression = expr.childExpression(childName);

      return ownSubExpression && ownSubExpression.isSubExpression(subExpression);
    });
  };

  /**
   * @returns {number}
   */


  RelationExpression.prototype.maxRecursionDepth = function maxRecursionDepth() {
    if (this.numChildren !== 1) {
      return 0;
    }

    var key = (0, _keys2.default)(this.children)[0];
    return _maxRecursionDepth(key);
  };

  /**
   * @returns {boolean}
   */


  RelationExpression.prototype.isAllRecursive = function isAllRecursive() {
    if (this.numChildren !== 1) {
      return false;
    }

    var key = (0, _keys2.default)(this.children)[0];
    return ALL_RECURSIVE_REGEX.test(key);
  };

  /**
   * @returns {RelationExpression}
   */


  RelationExpression.prototype.childExpression = function childExpression(childName) {
    if (this.isAllRecursive() || childName === this.name && this._recursionDepth < this.maxRecursionDepth() - 1) {
      return new RelationExpression(this, this._recursionDepth + 1, this._filters);
    }

    if (this.children[childName]) {
      return new RelationExpression(this.children[childName], 0, this._filters);
    } else {
      return null;
    }
  };

  /**
   * @returns {RelationExpression}
   */


  RelationExpression.prototype.clone = function clone() {
    var node = {
      name: this.name,
      args: this.args,
      numChildren: this.numChildren,
      children: _lodash2.default.cloneDeep(this.children)
    };

    var filters = _lodash2.default.clone(this._filters);
    return new RelationExpression(node, this._recursionDepth, filters);
  };

  RelationExpression.prototype.forEachChild = function forEachChild(cb) {
    _lodash2.default.forOwn(this.children, function (child, childName) {
      if (!ALL_RECURSIVE_REGEX.test(childName) && !RECURSIVE_REGEX.test(childName)) {
        cb(child, childName);
      }
    });
  };

  /**
   * @param {string|RelationExpression} path
   * @param {function(QueryBuilder)} filter
   */


  RelationExpression.prototype.addAnonymousFilterAtPath = function addAnonymousFilterAtPath(path, filter) {
    var filterNodes = this._nodesAtPath(path);
    var filters = this.filters;

    var idx = 0;
    var filterName = '_efe0_';

    while (filters[filterName]) {
      filterName = '_efe' + ++idx + '_';
    }

    if (!_lodash2.default.isEmpty(filterNodes)) {
      filters[filterName] = filter;
      _lodash2.default.each(filterNodes, function (node) {
        return node.args.push(filterName);
      });
    }
  };

  /**
   * @returns {string}
   */


  RelationExpression.prototype.toString = function toString() {
    return _toString(this);
  };

  /**
   * @private
   * @return {Array.<Object>}
   */


  RelationExpression.prototype._nodesAtPath = function _nodesAtPath(pathExpression) {
    var path = RelationExpression.parse(pathExpression);
    var nodes = [];

    RelationExpression.nodesAtPath(this, path, nodes);
    return nodes;
  };

  /**
   * @private
   */


  RelationExpression.nodesAtPath = function nodesAtPath(target, path, expressions) {
    var _this2 = this;

    if (path.numChildren == 0) {
      expressions.push(target);
    } else {
      _lodash2.default.forOwn(path.children, function (child) {
        var targetChild = target.children[child.name];

        if (targetChild) {
          _this2.nodesAtPath(targetChild, child, expressions);
        }
      });
    }
  };

  (0, _createClass3.default)(RelationExpression, [{
    key: 'filters',
    get: function get() {
      return this._filters;
    },
    set: function set(filters) {
      this._filters = filters || {};
    }
  }]);
  return RelationExpression;
}();

exports.default = RelationExpression;


function _maxRecursionDepth(key) {
  var rec = RECURSIVE_REGEX.exec(key);

  if (rec) {
    var maxDepth = rec[1];

    if (maxDepth) {
      return parseInt(maxDepth, 10);
    } else {
      return Number.POSITIVE_INFINITY;
    }
  } else {
    return 0;
  }
}

function visit(node, visitor) {
  var keys = (0, _keys2.default)(node.children);

  visitor(node, keys);

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];
    var childNode = node.children[key];

    if (childNode) {
      visit(childNode, visitor);
    }
  }
}

function _toString(node) {
  var childExpr = _lodash2.default.values(node.children).map(_toString);

  if (childExpr.length > 1) {
    childExpr = '[' + childExpr.join(', ') + ']';
  } else {
    childExpr = childExpr[0];
  }

  var str = node.name;

  if (node.args.length) {
    str += '(' + node.args.join(', ') + ')';
  }

  if (childExpr) {
    if (str) {
      return str + '.' + childExpr;
    } else {
      return childExpr;
    }
  } else {
    return str;
  }
}

function modelGraphToNode(models, node) {
  if (!models) {
    return;
  }

  if (Array.isArray(models)) {
    for (var i = 0, l = models.length; i < l; ++i) {
      modelToNode(models[i], node);
    }
  } else {
    modelToNode(models, node);
  }

  return node;
}

function modelToNode(model, node) {
  var modelClass = model.constructor;
  var relations = modelClass.getRelationArray();

  for (var r = 0, lr = relations.length; r < lr; ++r) {
    var relName = relations[r].name;

    if (model.hasOwnProperty(relName)) {
      var childNode = node.children[relName];

      if (!childNode) {
        childNode = newNode(relName);

        node.children[relName] = childNode;
        node.numChildren++;
      }

      modelGraphToNode(model[relName], childNode);
    }
  }
}

function newNode(name) {
  return {
    name: name || '',
    args: [],
    children: (0, _create2.default)(null),
    numChildren: 0
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlbGF0aW9uRXhwcmVzc2lvbi5qcyJdLCJuYW1lcyI6WyJSRUNVUlNJVkVfUkVHRVgiLCJBTExfUkVDVVJTSVZFX1JFR0VYIiwiUmVsYXRpb25FeHByZXNzaW9uIiwibm9kZSIsInJlY3Vyc2lvbkRlcHRoIiwiZmlsdGVycyIsIm5hbWUiLCJhcmdzIiwibnVtQ2hpbGRyZW4iLCJjaGlsZHJlbiIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsInZhbHVlIiwid3JpdGFibGUiLCJwYXJzZSIsImV4cHIiLCJpc1N0cmluZyIsImlzRW1wdHkiLCJ0cmltIiwiZXJyIiwibWVzc2FnZSIsImNhdXNlIiwiZnJvbUdyYXBoIiwiZ3JhcGgiLCJtb2RlbEdyYXBoVG9Ob2RlIiwibmV3Tm9kZSIsIm1lcmdlIiwibWVyZ2VkIiwiY2xvbmUiLCJ2aXNpdCIsImNoaWxkTmFtZXMiLCJtYXhOYW1lIiwibWF4RGVwdGgiLCJyZWN1ckNvdW50IiwiaSIsImwiLCJsZW5ndGgiLCJkZXB0aCIsIm1heFJlY3Vyc2lvbkRlcHRoIiwiaXNTdWJFeHByZXNzaW9uIiwiaXNBbGxSZWN1cnNpdmUiLCJldmVyeSIsImNoaWxkIiwiY2hpbGROYW1lIiwib3duU3ViRXhwcmVzc2lvbiIsImNoaWxkRXhwcmVzc2lvbiIsInN1YkV4cHJlc3Npb24iLCJrZXkiLCJ0ZXN0IiwiX3JlY3Vyc2lvbkRlcHRoIiwiX2ZpbHRlcnMiLCJjbG9uZURlZXAiLCJmb3JFYWNoQ2hpbGQiLCJjYiIsImZvck93biIsImFkZEFub255bW91c0ZpbHRlckF0UGF0aCIsInBhdGgiLCJmaWx0ZXIiLCJmaWx0ZXJOb2RlcyIsIl9ub2Rlc0F0UGF0aCIsImlkeCIsImZpbHRlck5hbWUiLCJlYWNoIiwicHVzaCIsInRvU3RyaW5nIiwicGF0aEV4cHJlc3Npb24iLCJub2RlcyIsIm5vZGVzQXRQYXRoIiwidGFyZ2V0IiwiZXhwcmVzc2lvbnMiLCJ0YXJnZXRDaGlsZCIsInJlYyIsImV4ZWMiLCJwYXJzZUludCIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwidmlzaXRvciIsImtleXMiLCJjaGlsZE5vZGUiLCJjaGlsZEV4cHIiLCJ2YWx1ZXMiLCJtYXAiLCJqb2luIiwic3RyIiwibW9kZWxzIiwiQXJyYXkiLCJpc0FycmF5IiwibW9kZWxUb05vZGUiLCJtb2RlbCIsIm1vZGVsQ2xhc3MiLCJjb25zdHJ1Y3RvciIsInJlbGF0aW9ucyIsImdldFJlbGF0aW9uQXJyYXkiLCJyIiwibHIiLCJyZWxOYW1lIiwiaGFzT3duUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxrQkFBa0IsV0FBeEI7QUFDQSxJQUFNQyxzQkFBc0IsTUFBNUI7O0lBRXFCQyxrQjtBQUVuQiw4QkFBWUMsSUFBWixFQUFrQkMsY0FBbEIsRUFBa0NDLE9BQWxDLEVBQTJDO0FBQUE7O0FBQ3pDRixXQUFPQSxRQUFRLEVBQWY7O0FBRUEsU0FBS0csSUFBTCxHQUFZSCxLQUFLRyxJQUFMLElBQWEsSUFBekI7QUFDQSxTQUFLQyxJQUFMLEdBQVlKLEtBQUtJLElBQUwsSUFBYSxFQUF6QjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJMLEtBQUtLLFdBQUwsSUFBb0IsQ0FBdkM7QUFDQSxTQUFLQyxRQUFMLEdBQWdCTixLQUFLTSxRQUFMLElBQWlCLEVBQWpDOztBQUVBQyxXQUFPQyxjQUFQLENBQXNCLElBQXRCLEVBQTRCLGlCQUE1QixFQUErQztBQUM3Q0Msa0JBQVksS0FEaUM7QUFFN0NDLGFBQU9ULGtCQUFrQjtBQUZvQixLQUEvQzs7QUFLQU0sV0FBT0MsY0FBUCxDQUFzQixJQUF0QixFQUE0QixVQUE1QixFQUF3QztBQUN0Q0Msa0JBQVksS0FEMEI7QUFFdENFLGdCQUFVLElBRjRCO0FBR3RDRCxhQUFPUixXQUFXO0FBSG9CLEtBQXhDO0FBS0Q7O0FBRUQ7Ozs7OztxQkFJT1UsSyxrQkFBTUMsSSxFQUFNO0FBQ2pCLFFBQUlBLGdCQUFn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RCxrQkFBWUgsT0FBT2xELENBQVAsQ0FBWixFQUF1QmhDLElBQXZCO0FBQ0Q7QUFDRixHQUpELE1BSU87QUFDTHFGLGdCQUFZSCxNQUFaLEVBQW9CbEYsSUFBcEI7QUFDRDs7QUFFRCxTQUFPQSxJQUFQO0FBQ0Q7O0FBRUQsU0FBU3FGLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCdEYsSUFBNUIsRUFBa0M7QUFDaEMsTUFBTXVGLGFBQWFELE1BQU1FLFdBQXpCO0FBQ0EsTUFBTUMsWUFBWUYsV0FBV0csZ0JBQVgsRUFBbEI7O0FBRUEsT0FBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsS0FBS0gsVUFBVXZELE1BQS9CLEVBQXVDeUQsSUFBSUMsRUFBM0MsRUFBK0MsRUFBRUQsQ0FBakQsRUFBb0Q7QUFDbEQsUUFBTUUsVUFBVUosVUFBVUUsQ0FBVixFQUFheEYsSUFBN0I7O0FBRUEsUUFBSW1GLE1BQU1RLGNBQU4sQ0FBcUJELE9BQXJCLENBQUosRUFBbUM7QUFDakMsVUFBSWpCLFlBQVk1RSxLQUFLTSxRQUFMLENBQWN1RixPQUFkLENBQWhCOztBQUVBLFVBQUksQ0FBQ2pCLFNBQUwsRUFBZ0I7QUFDZEEsb0JBQVlyRCxRQUFRc0UsT0FBUixDQUFaOztBQUVBN0YsYUFBS00sUUFBTCxDQUFjdUYsT0FBZCxJQUF5QmpCLFNBQXpCO0FBQ0E1RSxhQUFLSyxXQUFMO0FBQ0Q7O0FBRURpQix1QkFBaUJnRSxNQUFNTyxPQUFOLENBQWpCLEVBQWlDakIsU0FBakM7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsU0FBU3JELE9BQVQsQ0FBaUJwQixJQUFqQixFQUF1QjtBQUNyQixTQUFPO0FBQ0xBLFVBQU1BLFFBQVEsRUFEVDtBQUVMQyxVQUFNLEVBRkQ7QUFHTEUsY0FBVSxzQkFBYyxJQUFkLENBSEw7QUFJTEQsaUJBQWE7QUFKUixHQUFQO0FBTUQiLCJmaWxlIjoiUmVsYXRpb25FeHByZXNzaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBwYXJzZXIgZnJvbSAnLi9wYXJzZXJzL3JlbGF0aW9uRXhwcmVzc2lvblBhcnNlcic7XG5pbXBvcnQgVmFsaWRhdGlvbkVycm9yIGZyb20gJy4uL21vZGVsL1ZhbGlkYXRpb25FcnJvcic7XG5cbmNvbnN0IFJFQ1VSU0lWRV9SRUdFWCA9IC9eXFxeKFxcZCopJC87XG5jb25zdCBBTExfUkVDVVJTSVZFX1JFR0VYID0gL15cXCokLztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVsYXRpb25FeHByZXNzaW9uIHtcblxuICBjb25zdHJ1Y3Rvcihub2RlLCByZWN1cnNpb25EZXB0aCwgZmlsdGVycykge1xuICAgIG5vZGUgPSBub2RlIHx8IHt9O1xuXG4gICAgdGhpcy5uYW1lID0gbm9kZS5uYW1lIHx8IG51bGw7XG4gICAgdGhpcy5hcmdzID0gbm9kZS5hcmdzIHx8IFtdO1xuICAgIHRoaXMubnVtQ2hpbGRyZW4gPSBub2RlLm51bUNoaWxkcmVuIHx8IDA7XG4gICAgdGhpcy5jaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW4gfHwge307XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19yZWN1cnNpb25EZXB0aCcsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHJlY3Vyc2lvbkRlcHRoIHx8IDBcbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2ZpbHRlcnMnLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGZpbHRlcnMgfHwge31cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xSZWxhdGlvbkV4cHJlc3Npb259IGV4cHJcbiAgICogQHJldHVybnMge1JlbGF0aW9uRXhwcmVzc2lvbn1cbiAgICovXG4gIHN0YXRpYyBwYXJzZShleHByKSB7XG4gICAgaWYgKGV4cHIgaW5zdGFuY2VvZiBSZWxhdGlvbkV4cHJlc3Npb24pIHtcbiAgICAgIHJldHVybiBleHByO1xuICAgIH0gZWxzZSBpZiAoIV8uaXNTdHJpbmcoZXhwcikgfHwgXy5pc0VtcHR5KGV4cHIudHJpbSgpKSkge1xuICAgICAgcmV0dXJuIG5ldyBSZWxhdGlvbkV4cHJlc3Npb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWxhdGlvbkV4cHJlc3Npb24ocGFyc2VyLnBhcnNlKGV4cHIpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKHtcbiAgICAgICAgICBtZXNzYWdlOiAnSW52YWxpZCByZWxhdGlvbiBleHByZXNzaW9uIFwiJyArIGV4cHIgKyAnXCInLFxuICAgICAgICAgIGNhdXNlOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IGdyYXBoXG4gICAqL1xuICBzdGF0aWMgZnJvbUdyYXBoKGdyYXBoKSB7XG4gICAgaWYgKCFncmFwaCkge1xuICAgICAgcmV0dXJuIG5ldyBSZWxhdGlvbkV4cHJlc3Npb24oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlbGF0aW9uRXhwcmVzc2lvbihtb2RlbEdyYXBoVG9Ob2RlKGdyYXBoLCBuZXdOb2RlKCkpKTtcbiAgfVxuXG4gIGdldCBmaWx0ZXJzKCkge1xuICAgIHJldHVybiB0aGlzLl9maWx0ZXJzO1xuICB9XG5cbiAgc2V0IGZpbHRlcnMoZmlsdGVycykge1xuICAgIHRoaXMuX2ZpbHRlcnMgPSBmaWx0ZXJzIHx8IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlbGF0aW9uRXhwcmVzc2lvbn0gZXhwclxuICAgKiBAcmV0dXJucyB7UmVsYXRpb25FeHByZXNzaW9ufVxuICAgKi9cbiAgbWVyZ2UoZXhwcikge1xuICAgIGNvbnN0IG1lcmdlZCA9IHRoaXMuY2xvbmUoKTtcbiAgICBleHByID0gUmVsYXRpb25FeHByZXNzaW9uLnBhcnNlKGV4cHIpO1xuXG4gICAgbWVyZ2VkLm51bUNoaWxkcmVuICs9IGV4cHIubnVtQ2hpbGRyZW47XG4gICAgbWVyZ2VkLmNoaWxkcmVuID0gXy5tZXJnZShtZXJnZWQuY2hpbGRyZW4sIGV4cHIuY2hpbGRyZW4pO1xuICAgIG1lcmdlZC5hcmdzID0gXy5tZXJnZShtZXJnZWQuYXJncywgZXhwci5hcmdzKTtcbiAgICBtZXJnZWQuZmlsdGVycyA9IF8ubWVyZ2UobWVyZ2VkLmZpbHRlcnMsIGV4cHIuZmlsdGVycyk7XG5cbiAgICAvLyBIYW5kbGUgcmVjdXJzaXZlIGFuZCBhbGwgcmVjdXJzaXZlIG5vZGVzLlxuICAgIHZpc2l0KG1lcmdlZCwgKG5vZGUsIGNoaWxkTmFtZXMpID0+IHtcbiAgICAgIGxldCBtYXhOYW1lID0gbnVsbDtcbiAgICAgIGxldCBtYXhEZXB0aCA9IDA7XG4gICAgICBsZXQgcmVjdXJDb3VudCA9IDA7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gY2hpbGROYW1lcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IGNoaWxkTmFtZXNbaV07XG4gICAgICAgIGNvbnN0IGRlcHRoID0gbWF4UmVjdXJzaW9uRGVwdGgobmFtZSk7XG5cbiAgICAgICAgaWYgKGRlcHRoID4gMCkge1xuICAgICAgICAgIHJlY3VyQ291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZXB0aCA+IG1heERlcHRoKSB7XG4gICAgICAgICAgbWF4RGVwdGggPSBkZXB0aDtcbiAgICAgICAgICBtYXhOYW1lID0gbmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocmVjdXJDb3VudCA+IDApIHtcbiAgICAgICAgZGVsZXRlIG5vZGUuY2hpbGRyZW5bbm9kZS5uYW1lXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY3VyQ291bnQgPiAxKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gY2hpbGROYW1lcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICBjb25zdCBuYW1lID0gY2hpbGROYW1lc1tpXTtcblxuICAgICAgICAgIGlmIChuYW1lICE9PSBtYXhOYW1lKSB7XG4gICAgICAgICAgICBkZWxldGUgbm9kZS5jaGlsZHJlbltuYW1lXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtZXJnZWQ7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVsYXRpb25FeHByZXNzaW9ufSBleHByXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNTdWJFeHByZXNzaW9uKGV4cHIpIHtcbiAgICBleHByID0gUmVsYXRpb25FeHByZXNzaW9uLnBhcnNlKGV4cHIpO1xuXG4gICAgaWYgKHRoaXMuaXNBbGxSZWN1cnNpdmUoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGV4cHIuaXNBbGxSZWN1cnNpdmUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNBbGxSZWN1cnNpdmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uYW1lICE9PSBleHByLm5hbWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXhSZWN1cnNpb25EZXB0aCA9IGV4cHIubWF4UmVjdXJzaW9uRGVwdGgoKTtcblxuICAgIGlmIChtYXhSZWN1cnNpb25EZXB0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmlzQWxsUmVjdXJzaXZlKCkgfHwgdGhpcy5tYXhSZWN1cnNpb25EZXB0aCgpID49IG1heFJlY3Vyc2lvbkRlcHRoO1xuICAgIH1cblxuICAgIHJldHVybiBfLmV2ZXJ5KGV4cHIuY2hpbGRyZW4sIChjaGlsZCwgY2hpbGROYW1lKSA9PiB7XG4gICAgICB2YXIgb3duU3ViRXhwcmVzc2lvbiA9IHRoaXMuY2hpbGRFeHByZXNzaW9uKGNoaWxkTmFtZSk7XG4gICAgICB2YXIgc3ViRXhwcmVzc2lvbiA9IGV4cHIuY2hpbGRFeHByZXNzaW9uKGNoaWxkTmFtZSk7XG5cbiAgICAgIHJldHVybiBvd25TdWJFeHByZXNzaW9uICYmIG93blN1YkV4cHJlc3Npb24uaXNTdWJFeHByZXNzaW9uKHN1YkV4cHJlc3Npb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBtYXhSZWN1cnNpb25EZXB0aCgpIHtcbiAgICBpZiAodGhpcy5udW1DaGlsZHJlbiAhPT0gMSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXModGhpcy5jaGlsZHJlbilbMF07XG4gICAgcmV0dXJuIG1heFJlY3Vyc2lvbkRlcHRoKGtleSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FsbFJlY3Vyc2l2ZSgpIHtcbiAgICBpZiAodGhpcy5udW1DaGlsZHJlbiAhPT0gMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKHRoaXMuY2hpbGRyZW4pWzBdO1xuICAgIHJldHVybiBBTExfUkVDVVJTSVZFX1JFR0VYLnRlc3Qoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UmVsYXRpb25FeHByZXNzaW9ufVxuICAgKi9cbiAgY2hpbGRFeHByZXNzaW9uKGNoaWxkTmFtZSkge1xuICAgIGlmICh0aGlzLmlzQWxsUmVjdXJzaXZlKCkgfHwgKGNoaWxkTmFtZSA9PT0gdGhpcy5uYW1lICYmIHRoaXMuX3JlY3Vyc2lvbkRlcHRoIDwgdGhpcy5tYXhSZWN1cnNpb25EZXB0aCgpIC0gMSkpIHtcbiAgICAgIHJldHVybiBuZXcgUmVsYXRpb25FeHByZXNzaW9uKHRoaXMsIHRoaXMuX3JlY3Vyc2lvbkRlcHRoICsgMSwgdGhpcy5fZmlsdGVycyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2hpbGRyZW5bY2hpbGROYW1lXSkge1xuICAgICAgcmV0dXJuIG5ldyBSZWxhdGlvbkV4cHJlc3Npb24odGhpcy5jaGlsZHJlbltjaGlsZE5hbWVdLCAwLCB0aGlzLl9maWx0ZXJzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtSZWxhdGlvbkV4cHJlc3Npb259XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICBjb25zdCBub2RlID0ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgYXJnczogdGhpcy5hcmdzLFxuICAgICAgbnVtQ2hpbGRyZW46IHRoaXMubnVtQ2hpbGRyZW4sXG4gICAgICBjaGlsZHJlbjogXy5jbG9uZURlZXAodGhpcy5jaGlsZHJlbilcbiAgICB9O1xuXG4gICAgY29uc3QgZmlsdGVycyA9IF8uY2xvbmUodGhpcy5fZmlsdGVycyk7XG4gICAgcmV0dXJuIG5ldyBSZWxhdGlvbkV4cHJlc3Npb24obm9kZSwgdGhpcy5fcmVjdXJzaW9uRGVwdGgsIGZpbHRlcnMpO1xuICB9XG5cbiAgZm9yRWFjaENoaWxkKGNiKSB7XG4gICAgXy5mb3JPd24odGhpcy5jaGlsZHJlbiwgKGNoaWxkLCBjaGlsZE5hbWUpID0+IHtcbiAgICAgIGlmICghQUxMX1JFQ1VSU0lWRV9SRUdFWC50ZXN0KGNoaWxkTmFtZSkgJiYgIVJFQ1VSU0lWRV9SRUdFWC50ZXN0KGNoaWxkTmFtZSkpIHtcbiAgICAgICAgY2IoY2hpbGQsIGNoaWxkTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVsYXRpb25FeHByZXNzaW9ufSBwYXRoXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oUXVlcnlCdWlsZGVyKX0gZmlsdGVyXG4gICAqL1xuICBhZGRBbm9ueW1vdXNGaWx0ZXJBdFBhdGgocGF0aCwgZmlsdGVyKSB7XG4gICAgbGV0IGZpbHRlck5vZGVzID0gdGhpcy5fbm9kZXNBdFBhdGgocGF0aCk7XG4gICAgbGV0IGZpbHRlcnMgPSB0aGlzLmZpbHRlcnM7XG5cbiAgICBsZXQgaWR4ID0gMDtcbiAgICBsZXQgZmlsdGVyTmFtZSA9IGBfZWZlMF9gO1xuXG4gICAgd2hpbGUgKGZpbHRlcnNbZmlsdGVyTmFtZV0pIHtcbiAgICAgIGZpbHRlck5hbWUgPSBgX2VmZSR7KytpZHh9X2A7XG4gICAgfVxuXG4gICAgaWYgKCFfLmlzRW1wdHkoZmlsdGVyTm9kZXMpKSB7XG4gICAgICBmaWx0ZXJzW2ZpbHRlck5hbWVdID0gZmlsdGVyO1xuICAgICAgXy5lYWNoKGZpbHRlck5vZGVzLCBub2RlID0+IG5vZGUuYXJncy5wdXNoKGZpbHRlck5hbWUpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0b1N0cmluZyh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHtBcnJheS48T2JqZWN0Pn1cbiAgICovXG4gIF9ub2Rlc0F0UGF0aChwYXRoRXhwcmVzc2lvbikge1xuICAgIGxldCBwYXRoID0gUmVsYXRpb25FeHByZXNzaW9uLnBhcnNlKHBhdGhFeHByZXNzaW9uKTtcbiAgICBsZXQgbm9kZXMgPSBbXTtcblxuICAgIFJlbGF0aW9uRXhwcmVzc2lvbi5ub2Rlc0F0UGF0aCh0aGlzLCBwYXRoLCBub2Rlcyk7XG4gICAgcmV0dXJuIG5vZGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdGF0aWMgbm9kZXNBdFBhdGgodGFyZ2V0LCBwYXRoLCBleHByZXNzaW9ucykge1xuICAgIGlmIChwYXRoLm51bUNoaWxkcmVuID09IDApIHtcbiAgICAgIGV4cHJlc3Npb25zLnB1c2godGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgXy5mb3JPd24ocGF0aC5jaGlsZHJlbiwgY2hpbGQgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRDaGlsZCA9IHRhcmdldC5jaGlsZHJlbltjaGlsZC5uYW1lXTtcblxuICAgICAgICBpZiAodGFyZ2V0Q2hpbGQpIHtcbiAgICAgICAgICB0aGlzLm5vZGVzQXRQYXRoKHRhcmdldENoaWxkLCBjaGlsZCwgZXhwcmVzc2lvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF4UmVjdXJzaW9uRGVwdGgoa2V5KSB7XG4gIGNvbnN0IHJlYyA9IFJFQ1VSU0lWRV9SRUdFWC5leGVjKGtleSk7XG5cbiAgaWYgKHJlYykge1xuICAgIGNvbnN0IG1heERlcHRoID0gcmVjWzFdO1xuXG4gICAgaWYgKG1heERlcHRoKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQobWF4RGVwdGgsIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gdmlzaXQobm9kZSwgdmlzaXRvcikge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobm9kZS5jaGlsZHJlbik7XG5cbiAgdmlzaXRvcihub2RlLCBrZXlzKTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICBjb25zdCBjaGlsZE5vZGUgPSBub2RlLmNoaWxkcmVuW2tleV07XG5cbiAgICBpZiAoY2hpbGROb2RlKSB7XG4gICAgICB2aXNpdChjaGlsZE5vZGUsIHZpc2l0b3IpO1xuICAgIH1cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHRvU3RyaW5nKG5vZGUpIHtcbiAgbGV0IGNoaWxkRXhwciA9IF8udmFsdWVzKG5vZGUuY2hpbGRyZW4pLm1hcCh0b1N0cmluZyk7XG5cbiAgaWYgKGNoaWxkRXhwci5sZW5ndGggPiAxKSB7XG4gICAgY2hpbGRFeHByID0gYFske2NoaWxkRXhwci5qb2luKCcsICcpfV1gO1xuICB9IGVsc2Uge1xuICAgIGNoaWxkRXhwciA9IGNoaWxkRXhwclswXTtcbiAgfVxuXG4gIGxldCBzdHIgPSBub2RlLm5hbWU7XG5cbiAgaWYgKG5vZGUuYXJncy5sZW5ndGgpIHtcbiAgICBzdHIgKz0gYCgke25vZGUuYXJncy5qb2luKCcsICcpfSlgO1xuICB9XG5cbiAgaWYgKGNoaWxkRXhwcikge1xuICAgIGlmIChzdHIpIHtcbiAgICAgIHJldHVybiBgJHtzdHJ9LiR7Y2hpbGRFeHByfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjaGlsZEV4cHI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuZnVuY3Rpb24gbW9kZWxHcmFwaFRvTm9kZShtb2RlbHMsIG5vZGUpIHtcbiAgaWYgKCFtb2RlbHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShtb2RlbHMpKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBtb2RlbHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBtb2RlbFRvTm9kZShtb2RlbHNbaV0sIG5vZGUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBtb2RlbFRvTm9kZShtb2RlbHMsIG5vZGUpO1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59XG5cbmZ1bmN0aW9uIG1vZGVsVG9Ob2RlKG1vZGVsLCBub2RlKSB7XG4gIGNvbnN0IG1vZGVsQ2xhc3MgPSBtb2RlbC5jb25zdHJ1Y3RvcjtcbiAgY29uc3QgcmVsYXRpb25zID0gbW9kZWxDbGFzcy5nZXRSZWxhdGlvbkFycmF5KCk7XG5cbiAgZm9yIChsZXQgciA9IDAsIGxyID0gcmVsYXRpb25zLmxlbmd0aDsgciA8IGxyOyArK3IpIHtcbiAgICBjb25zdCByZWxOYW1lID0gcmVsYXRpb25zW3JdLm5hbWU7XG5cbiAgICBpZiAobW9kZWwuaGFzT3duUHJvcGVydHkocmVsTmFtZSkpIHtcbiAgICAgIGxldCBjaGlsZE5vZGUgPSBub2RlLmNoaWxkcmVuW3JlbE5hbWVdO1xuXG4gICAgICBpZiAoIWNoaWxkTm9kZSkge1xuICAgICAgICBjaGlsZE5vZGUgPSBuZXdOb2RlKHJlbE5hbWUpO1xuXG4gICAgICAgIG5vZGUuY2hpbGRyZW5bcmVsTmFtZV0gPSBjaGlsZE5vZGU7XG4gICAgICAgIG5vZGUubnVtQ2hpbGRyZW4rKztcbiAgICAgIH1cblxuICAgICAgbW9kZWxHcmFwaFRvTm9kZShtb2RlbFtyZWxOYW1lXSwgY2hpbGROb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbmV3Tm9kZShuYW1lKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogbmFtZSB8fCAnJyxcbiAgICBhcmdzOiBbXSxcbiAgICBjaGlsZHJlbjogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICBudW1DaGlsZHJlbjogMFxuICB9O1xufSJdfQ==