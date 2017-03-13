'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _Model = require('../../model/Model');

var _Model2 = _interopRequireDefault(_Model);

var _HasManyRelation = require('../../relations/hasMany/HasManyRelation');

var _HasManyRelation2 = _interopRequireDefault(_HasManyRelation);

var _RelationExpression = require('../RelationExpression');

var _RelationExpression2 = _interopRequireDefault(_RelationExpression);

var _ManyToManyRelation = require('../../relations/manyToMany/ManyToManyRelation');

var _ManyToManyRelation2 = _interopRequireDefault(_ManyToManyRelation);

var _BelongsToOneRelation = require('../../relations/belongsToOne/BelongsToOneRelation');

var _BelongsToOneRelation2 = _interopRequireDefault(_BelongsToOneRelation);

var _ValidationError = require('../../model/ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

var _DependencyNode = require('./DependencyNode');

var _DependencyNode2 = _interopRequireDefault(_DependencyNode);

var _HasManyDependency = require('./HasManyDependency');

var _HasManyDependency2 = _interopRequireDefault(_HasManyDependency);

var _ManyToManyConnection = require('./ManyToManyConnection');

var _ManyToManyConnection2 = _interopRequireDefault(_ManyToManyConnection);

var _ReplaceValueDependency = require('./ReplaceValueDependency');

var _ReplaceValueDependency2 = _interopRequireDefault(_ReplaceValueDependency);

var _BelongsToOneDependency = require('./BelongsToOneDependency');

var _BelongsToOneDependency2 = _interopRequireDefault(_BelongsToOneDependency);

var _InterpolateValueDependency = require('./InterpolateValueDependency');

var _InterpolateValueDependency2 = _interopRequireDefault(_InterpolateValueDependency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DependencyGraph = function () {
  function DependencyGraph(allowedRelations) {
    (0, _classCallCheck3.default)(this, DependencyGraph);

    /**
     * @type {RelationExpression}
     */
    this.allowedRelations = allowedRelations;

    /**
     * @type {Object.<string, DependencyNode>}
     */
    this.nodesById = (0, _create2.default)(null);

    /**
     * @type {Object.<string, DependencyNode>}
     */
    this.inputNodesById = (0, _create2.default)(null);

    /**
     * @type {Array.<DependencyNode>}
     */
    this.nodes = [];

    /**
     * @type {number}
     */
    this.uid = 0;
  }

  DependencyGraph.prototype.build = function build(modelClass, models) {
    this.nodesById = (0, _create2.default)(null);
    this.nodes = [];

    if (Array.isArray(models)) {
      for (var i = 0, l = models.length; i < l; ++i) {
        this.buildForModel(modelClass, models[i], null, null, this.allowedRelations);
      }
    } else {
      this.buildForModel(modelClass, models, null, null, this.allowedRelations);
    }

    this.solveReferences();
    this.createNonRelationDeps();

    if (this.isCyclic(this.nodes)) {
      throw new _ValidationError2.default({ cyclic: 'the object graph contains cyclic references' });
    }

    return this.nodes;
  };

  DependencyGraph.prototype.buildForModel = function buildForModel(modelClass, model, parentNode, rel, allowedRelations) {
    if (!(model instanceof _Model2.default)) {
      throw new _ValidationError2.default({ notModel: 'not a model' });
    }

    if (!model[modelClass.uidProp]) {
      model[modelClass.uidProp] = this.createUid();
    }

    var node = new _DependencyNode2.default(model, modelClass);

    this.nodesById[node.id] = node;
    this.nodes.push(node);

    if (!parentNode) {
      this.inputNodesById[node.id] = node;
    }

    if (rel instanceof _HasManyRelation2.default) {

      node.needs.push(new _HasManyDependency2.default(parentNode, rel));
      parentNode.isNeededBy.push(new _HasManyDependency2.default(node, rel));
    } else if (rel instanceof _BelongsToOneRelation2.default) {

      node.isNeededBy.push(new _BelongsToOneDependency2.default(parentNode, rel));
      parentNode.needs.push(new _BelongsToOneDependency2.default(node, rel));
    } else if (rel instanceof _ManyToManyRelation2.default) {

      // ManyToManyRelations create no dependencies since we can create the
      // join table rows after everything else has been inserted.
      parentNode.manyToManyConnections.push(new _ManyToManyConnection2.default(node, rel));
    }

    this.buildForRelations(modelClass, model, node, allowedRelations);
  };

  DependencyGraph.prototype.buildForRelations = function buildForRelations(modelClass, model, node, allowedRelations) {
    var relations = modelClass.getRelationArray();

    for (var i = 0, l = relations.length; i < l; ++i) {
      var rel = relations[i];
      var relName = rel.name;
      var relModels = model[relName];

      var nextAllowed = null;

      if (relModels && allowedRelations instanceof _RelationExpression2.default) {
        nextAllowed = allowedRelations.childExpression(relName);

        if (!nextAllowed) {
          throw new _ValidationError2.default({ allowedRelations: 'trying to insert an unallowed relation' });
        }
      }

      if (Array.isArray(relModels)) {
        for (var _i = 0, _l = relModels.length; _i < _l; ++_i) {
          this.buildForItem(rel.relatedModelClass, relModels[_i], node, rel, nextAllowed);
        }
      } else if (relModels) {
        this.buildForItem(rel.relatedModelClass, relModels, node, rel, nextAllowed);
      }
    }
  };

  DependencyGraph.prototype.buildForItem = function buildForItem(modelClass, item, parentNode, rel, allowedRelations) {
    if (rel instanceof _ManyToManyRelation2.default && item[modelClass.dbRefProp]) {
      this.buildForId(modelClass, item, parentNode, rel, allowedRelations);
    } else {
      this.buildForModel(modelClass, item, parentNode, rel, allowedRelations);
    }
  };

  DependencyGraph.prototype.buildForId = function buildForId(modelClass, item, parentNode, rel) {
    var node = new _DependencyNode2.default(item, modelClass);
    node.handled = true;

    item.$id(item[modelClass.dbRefProp]);
    parentNode.manyToManyConnections.push(new _ManyToManyConnection2.default(node, rel));
  };

  DependencyGraph.prototype.solveReferences = function solveReferences() {
    var refMap = (0, _create2.default)(null);

    // First merge all reference nodes into the actual node.
    this.mergeReferences(refMap);

    // Replace all reference nodes with the actual nodes.
    this.replaceReferenceNodes(refMap);
  };

  DependencyGraph.prototype.mergeReferences = function mergeReferences(refMap) {
    for (var n = 0, ln = this.nodes.length; n < ln; ++n) {
      var refNode = this.nodes[n];

      if (refNode.handled) {
        continue;
      }

      var ref = refNode.model[refNode.modelClass.uidRefProp];

      if (ref) {
        var actualNode = this.nodesById[ref];

        if (!actualNode) {
          throw new _ValidationError2.default({ ref: 'could not resolve reference "' + ref + '"' });
        }

        var d = void 0,
            ld = void 0;

        for (d = 0, ld = refNode.needs.length; d < ld; ++d) {
          actualNode.needs.push(refNode.needs[d]);
        }

        for (d = 0, ld = refNode.isNeededBy.length; d < ld; ++d) {
          actualNode.isNeededBy.push(refNode.isNeededBy[d]);
        }

        for (var m = 0, lm = refNode.manyToManyConnections.length; m < lm; ++m) {
          actualNode.manyToManyConnections.push(refNode.manyToManyConnections[m]);
        }

        refMap[refNode.id] = actualNode;
        refNode.handled = true;
      }
    }
  };

  DependencyGraph.prototype.replaceReferenceNodes = function replaceReferenceNodes(refMap) {
    for (var n = 0, ln = this.nodes.length; n < ln; ++n) {
      var node = this.nodes[n];
      var d = void 0,
          ld = void 0,
          dep = void 0,
          actualNode = void 0;

      for (d = 0, ld = node.needs.length; d < ld; ++d) {
        dep = node.needs[d];
        actualNode = refMap[dep.node.id];

        if (actualNode) {
          dep.node = actualNode;
        }
      }

      for (d = 0, ld = node.isNeededBy.length; d < ld; ++d) {
        dep = node.isNeededBy[d];
        actualNode = refMap[dep.node.id];

        if (actualNode) {
          dep.node = actualNode;
        }
      }

      for (var m = 0, lm = node.manyToManyConnections.length; m < lm; ++m) {
        var conn = node.manyToManyConnections[m];
        actualNode = refMap[conn.node.id];

        if (actualNode) {
          conn.refNode = conn.node;
          conn.node = actualNode;
        }
      }
    }
  };

  DependencyGraph.prototype.createNonRelationDeps = function createNonRelationDeps() {
    for (var n = 0, ln = this.nodes.length; n < ln; ++n) {
      var node = this.nodes[n];

      if (!node.handled) {
        this.createNonRelationDepsForObject(node.model, node, []);
      }
    }
  };

  DependencyGraph.prototype.createNonRelationDepsForObject = function createNonRelationDepsForObject(obj, node, path) {
    var _this = this;

    var propRefRegex = node.modelClass.propRefRegex;
    var relations = node.modelClass.getRelations();
    var isModel = obj instanceof _Model2.default;
    var keys = (0, _keys2.default)(obj);

    var _loop = function _loop(i, l) {
      var key = keys[i];
      var value = obj[key];

      if (isModel && relations[key]) {
        // Don't traverse the relations of model instances.
        return {
          v: void 0
        };
      }

      path.push(key);

      if (typeof value === 'string') {
        allMatches(propRefRegex, value, function (matchResult) {
          var match = matchResult[0];
          var refId = matchResult[1];
          var refProp = matchResult[2];
          var refNode = _this.nodesById[refId];

          if (!refNode) {
            throw new _ValidationError2.default({ ref: 'could not resolve reference "' + value + '"' });
          }

          if (value === match) {
            // If the match is the whole string, replace the value with the resolved value.
            // This means that the value will have the same type as the resolved value
            // (date, number, etc).
            node.needs.push(new _ReplaceValueDependency2.default(refNode, path, refProp, false));
            refNode.isNeededBy.push(new _ReplaceValueDependency2.default(node, path, refProp, true));
          } else {
            // If the match is inside a string, replace the reference inside the string with
            // the resolved value.
            node.needs.push(new _InterpolateValueDependency2.default(refNode, path, refProp, match, false));
            refNode.isNeededBy.push(new _InterpolateValueDependency2.default(node, path, refProp, match, true));
          }
        });
      } else if (value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
        _this.createNonRelationDepsForObject(value, node, path);
      }

      path.pop();
    };

    for (var i = 0, l = keys.length; i < l; ++i) {
      var _ret = _loop(i, l);

      if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
    }
  };

  DependencyGraph.prototype.isCyclic = function isCyclic(nodes) {
    var isCyclic = false;

    for (var n = 0, ln = nodes.length; n < ln; ++n) {
      var node = nodes[n];

      if (node.handled) {
        continue;
      }

      if (this.isCyclicNode(node)) {
        isCyclic = true;
        break;
      }
    }

    this.clearFlags(this.nodes);
    return isCyclic;
  };

  DependencyGraph.prototype.isCyclicNode = function isCyclicNode(node) {
    if (!node.visited) {
      node.visited = true;
      node.recursion = true;

      for (var d = 0, ld = node.needs.length; d < ld; ++d) {
        var dep = node.needs[d];

        if (!dep.node.visited && this.isCyclicNode(dep.node)) {
          return true;
        } else if (dep.node.recursion) {
          return true;
        }
      }
    }

    node.recursion = false;
    return false;
  };

  DependencyGraph.prototype.clearFlags = function clearFlags(nodes) {
    for (var n = 0, ln = nodes.length; n < ln; ++n) {
      var node = nodes[n];

      node.visited = false;
      node.recursion = false;
    }
  };

  DependencyGraph.prototype.createUid = function createUid() {
    return '__objection_uid(' + ++this.uid + ')__';
  };

  return DependencyGraph;
}();

exports.default = DependencyGraph;


function allMatches(regex, str, cb) {
  var matchResult = regex.exec(str);

  while (matchResult) {
    cb(matchResult);
    matchResult = regex.exec(str);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlcGVuZGVuY3lHcmFwaC5qcyJdLCJuYW1lcyI6WyJEZXBlbmRlbmN5R3JhcGgiLCJhbGxvd2VkUmVsYXRpb25zIiwibm9kZXNCeUlkIiwiaW5wdXROb2Rlc0J5SWQiLCJub2RlcyIsInVpZCIsImJ1aWxkIiwibW9kZWxDbGFzcyIsIm1vZGVscyIsIkFycmF5IiwiaXNBcnJheSIsImkiLCJsIiwibGVuZ3RoIiwiYnVpbGRGb3JNb2RlbCIsInNvbHZlUmVmZXJlbmNlcyIsImNyZWF0ZU5vblJlbGF0aW9uRGVwcyIsImlzQ3ljbGljIiwiY3ljbGljIiwibW9kZWwiLCJwYXJlbnROb2RlIiwicmVsIiwibm90TW9kZWwiLCJ1aWRQcm9wIiwiY3JlYXRlVWlkIiwibm9kZSIsImlkIiwicHVzaCIsIm5lZWRzIiwiaXNOZWVkZWRCeSIsIm1hbnlUb01hbnlDb25uZWN0aW9ucyIsImJ1aWxkRm9yUmVsYXRpb25zIiwicmVsYXRpb25zIiwiZ2V0UmVsYXRpb25BcnJheSIsInJlbE5hbWUiLCJuYW1lIiwicmVsTW9kZWxzIiwibmV4dEFsbG93ZWQiLCJjaGlsZEV4cHJlc3Npb24iLCJidWlsZEZvckl0ZW0iLCJyZWxhdGVkTW9kZWxDbGFzcyIsIml0ZW0iLCJkYlJlZlByb3AiLCJidWlsZEZvcklkIiwiaGFuZGxlZCIsIiRpZCIsInJlZk1hcCIsIm1lcmdlUmVmZXJlbmNlcyIsInJlcGxhY2VSZWZlcmVuY2VOb2RlcyIsIm4iLCJsbiIsInJlZk5vZGUiLCJyZWYiLCJ1aWRSZWZQcm9wIiwiYWN0dWFsTm9kZSIsImQiLCJsZCIsIm0iLCJsbSIsImRlcCIsImNvbm4iLCJjcmVhdGVOb25SZWxhdGlvbkRlcHNGb3JPYmplY3QiLCJvYmoiLCJwYXRoIiwicHJvcFJlZlJlZ2V4IiwiZ2V0UmVsYXRpb25zIiwiaXNNb2RlbCIsImtleXMiLCJrZXkiLCJ2YWx1ZSIsImFsbE1hdGNoZXMiLCJtYXRjaCIsIm1hdGNoUmVzdWx0IiwicmVmSWQiLCJyZWZQcm9wIiwicG9wIiwiaXNDeWNsaWNOb2RlIiwiY2xlYXJGbGFncyIsInZpc2l0ZWQiLCJyZWN1cnNpb24iLCJyZWdleCIsInN0ciIsImNiIiwiZXhlYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsZTtBQUVuQiwyQkFBWUMsZ0JBQVosRUFBOEI7QUFBQTs7QUFDNUI7OztBQUdBLFNBQUtBLGdCQUFMLEdBQXdCQSxnQkFBeEI7O0FBRUE7OztBQUdBLFNBQUtDLFNBQUwsR0FBaUIsc0JBQWMsSUFBZCxDQUFqQjs7QUFFQTs7O0FBR0EsU0FBS0MsY0FBTCxHQUFzQixzQkFBYyxJQUFkLENBQXRCOztBQUVBOzs7QUFHQSxTQUFLQyxLQUFMLEdBQWEsRUFBYjs7QUFFQTs7O0FBR0EsU0FBS0MsR0FBTCxHQUFXLENBQVg7QUFDRDs7NEJBRURDLEssa0JBQU1DLFUsRUFBWUMsTSxFQUFRO0FBQ3hCLFNBQUtOLFNBQUwsR0FBaUIsc0JBQWMsSUFBZCxDQUFqQjtBQUNBLFNBQUtFLEtBQUwsR0FBYSxFQUFiOztBQUVBLFFBQUlLLE1BQU1DLE9BQU4sQ0FBY0YsTUFBZCxDQUFKLEVBQTJCO0FBQ3pCLFdBQUssSUFBSUcsSUFBSSxDQUFSLEVBQVdDLElBQUlKLE9BQU9LLE1BQTNCLEVBQW1DRixJQUFJQyxDQUF2QyxFQUEwQyxFQUFFRCxDQUE1QyxFQUErQztBQUM3QyxhQUFLRyxhQUFMLENBQW1CUCxVQUFuQixFQUErQkMsT0FBT0csQ0FBUCxDQUEvQixFQUEwQyxJQUExQyxFQUFnRCxJQUFoRCxFQUFzRCxLQUFLVixnQkFBM0Q7QUFDRDtBQUNGLEtBSkQsTUFJTztBQUNMLFdBQUthLGFBQUwsQ0FBbUJQLFVBQW5CLEVBQStCQyxNQUEvQixFQUF1QyxJQUF2QyxFQUE2QyxJQUE3QyxFQUFtRCxLQUFLUCxnQkFBeEQ7QUFDRDs7QUFF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QSxrQkFBY1EsTUFBTUcsSUFBTixDQUFXRixHQUFYLENBQWQ7QUFDRDtBQUNGIiwiZmlsZSI6IkRlcGVuZGVuY3lHcmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbCBmcm9tICcuLi8uLi9tb2RlbC9Nb2RlbCc7XG5pbXBvcnQgSGFzTWFueVJlbGF0aW9uIGZyb20gJy4uLy4uL3JlbGF0aW9ucy9oYXNNYW55L0hhc01hbnlSZWxhdGlvbic7XG5pbXBvcnQgUmVsYXRpb25FeHByZXNzaW9uIGZyb20gJy4uL1JlbGF0aW9uRXhwcmVzc2lvbic7XG5pbXBvcnQgTWFueVRvTWFueVJlbGF0aW9uIGZyb20gJy4uLy4uL3JlbGF0aW9ucy9tYW55VG9NYW55L01hbnlUb01hbnlSZWxhdGlvbic7XG5pbXBvcnQgQmVsb25nc1RvT25lUmVsYXRpb24gZnJvbSAnLi4vLi4vcmVsYXRpb25zL2JlbG9uZ3NUb09uZS9CZWxvbmdzVG9PbmVSZWxhdGlvbic7XG5pbXBvcnQgVmFsaWRhdGlvbkVycm9yIGZyb20gJy4uLy4uL21vZGVsL1ZhbGlkYXRpb25FcnJvcic7XG5cbmltcG9ydCBEZXBlbmRlbmN5Tm9kZSBmcm9tICcuL0RlcGVuZGVuY3lOb2RlJztcbmltcG9ydCBIYXNNYW55RGVwZW5kZW5jeSBmcm9tICcuL0hhc01hbnlEZXBlbmRlbmN5JztcbmltcG9ydCBNYW55VG9NYW55Q29ubmVjdGlvbiBmcm9tICcuL01hbnlUb01hbnlDb25uZWN0aW9uJztcbmltcG9ydCBSZXBsYWNlVmFsdWVEZXBlbmRlbmN5IGZyb20gJy4vUmVwbGFjZVZhbHVlRGVwZW5kZW5jeSc7XG5pbXBvcnQgQmVsb25nc1RvT25lRGVwZW5kZW5jeSBmcm9tICcuL0JlbG9uZ3NUb09uZURlcGVuZGVuY3knO1xuaW1wb3J0IEludGVycG9sYXRlVmFsdWVEZXBlbmRlbmN5IGZyb20gJy4vSW50ZXJwb2xhdGVWYWx1ZURlcGVuZGVuY3knO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXBlbmRlbmN5R3JhcGgge1xuXG4gIGNvbnN0cnVjdG9yKGFsbG93ZWRSZWxhdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7UmVsYXRpb25FeHByZXNzaW9ufVxuICAgICAqL1xuICAgIHRoaXMuYWxsb3dlZFJlbGF0aW9ucyA9IGFsbG93ZWRSZWxhdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsIERlcGVuZGVuY3lOb2RlPn1cbiAgICAgKi9cbiAgICB0aGlzLm5vZGVzQnlJZCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsIERlcGVuZGVuY3lOb2RlPn1cbiAgICAgKi9cbiAgICB0aGlzLmlucHV0Tm9kZXNCeUlkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBcnJheS48RGVwZW5kZW5jeU5vZGU+fVxuICAgICAqL1xuICAgIHRoaXMubm9kZXMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy51aWQgPSAwO1xuICB9XG5cbiAgYnVpbGQobW9kZWxDbGFzcywgbW9kZWxzKSB7XG4gICAgdGhpcy5ub2Rlc0J5SWQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMubm9kZXMgPSBbXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG1vZGVscykpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbW9kZWxzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICB0aGlzLmJ1aWxkRm9yTW9kZWwobW9kZWxDbGFzcywgbW9kZWxzW2ldLCBudWxsLCBudWxsLCB0aGlzLmFsbG93ZWRSZWxhdGlvbnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1aWxkRm9yTW9kZWwobW9kZWxDbGFzcywgbW9kZWxzLCBudWxsLCBudWxsLCB0aGlzLmFsbG93ZWRSZWxhdGlvbnMpO1xuICAgIH1cblxuICAgIHRoaXMuc29sdmVSZWZlcmVuY2VzKCk7XG4gICAgdGhpcy5jcmVhdGVOb25SZWxhdGlvbkRlcHMoKTtcblxuICAgIGlmICh0aGlzLmlzQ3ljbGljKHRoaXMubm9kZXMpKSB7XG4gICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKHtjeWNsaWM6ICd0aGUgb2JqZWN0IGdyYXBoIGNvbnRhaW5zIGN5Y2xpYyByZWZlcmVuY2VzJ30pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm5vZGVzO1xuICB9O1xuXG4gIGJ1aWxkRm9yTW9kZWwobW9kZWxDbGFzcywgbW9kZWwsIHBhcmVudE5vZGUsIHJlbCwgYWxsb3dlZFJlbGF0aW9ucykge1xuICAgIGlmICghKG1vZGVsIGluc3RhbmNlb2YgTW9kZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKHtub3RNb2RlbDogJ25vdCBhIG1vZGVsJ30pO1xuICAgIH1cblxuICAgIGlmICghbW9kZWxbbW9kZWxDbGFzcy51aWRQcm9wXSkge1xuICAgICAgbW9kZWxbbW9kZWxDbGFzcy51aWRQcm9wXSA9IHRoaXMuY3JlYXRlVWlkKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZSA9IG5ldyBEZXBlbmRlbmN5Tm9kZShtb2RlbCwgbW9kZWxDbGFzcyk7XG5cbiAgICB0aGlzLm5vZGVzQnlJZFtub2RlLmlkXSA9IG5vZGU7XG4gICAgdGhpcy5ub2Rlcy5wdXNoKG5vZGUpO1xuXG4gICAgaWYgKCFwYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLmlucHV0Tm9kZXNCeUlkW25vZGUuaWRdID0gbm9kZTtcbiAgICB9XG5cbiAgICBpZiAocmVsIGluc3RhbmNlb2YgSGFzTWFueVJlbGF0aW9uKSB7XG5cbiAgICAgIG5vZGUubmVlZHMucHVzaChuZXcgSGFzTWFueURlcGVuZGVuY3kocGFyZW50Tm9kZSwgcmVsKSk7XG4gICAgICBwYXJlbnROb2RlLmlzTmVlZGVkQnkucHVzaChuZXcgSGFzTWFueURlcGVuZGVuY3kobm9kZSwgcmVsKSk7XG5cbiAgICB9IGVsc2UgaWYgKHJlbCBpbnN0YW5jZW9mIEJlbG9uZ3NUb09uZVJlbGF0aW9uKSB7XG5cbiAgICAgIG5vZGUuaXNOZWVkZWRCeS5wdXNoKG5ldyBCZWxvbmdzVG9PbmVEZXBlbmRlbmN5KHBhcmVudE5vZGUsIHJlbCkpO1xuICAgICAgcGFyZW50Tm9kZS5uZWVkcy5wdXNoKG5ldyBCZWxvbmdzVG9PbmVEZXBlbmRlbmN5KG5vZGUsIHJlbCkpO1xuXG4gICAgfSBlbHNlIGlmIChyZWwgaW5zdGFuY2VvZiBNYW55VG9NYW55UmVsYXRpb24pIHtcblxuICAgICAgLy8gTWFueVRvTWFueVJlbGF0aW9ucyBjcmVhdGUgbm8gZGVwZW5kZW5jaWVzIHNpbmNlIHdlIGNhbiBjcmVhdGUgdGhlXG4gICAgICAvLyBqb2luIHRhYmxlIHJvd3MgYWZ0ZXIgZXZlcnl0aGluZyBlbHNlIGhhcyBiZWVuIGluc2VydGVkLlxuICAgICAgcGFyZW50Tm9kZS5tYW55VG9NYW55Q29ubmVjdGlvbnMucHVzaChuZXcgTWFueVRvTWFueUNvbm5lY3Rpb24obm9kZSwgcmVsKSk7XG5cbiAgICB9XG5cbiAgICB0aGlzLmJ1aWxkRm9yUmVsYXRpb25zKG1vZGVsQ2xhc3MsIG1vZGVsLCBub2RlLCBhbGxvd2VkUmVsYXRpb25zKTtcbiAgfVxuXG4gIGJ1aWxkRm9yUmVsYXRpb25zKG1vZGVsQ2xhc3MsIG1vZGVsLCBub2RlLCBhbGxvd2VkUmVsYXRpb25zKSB7XG4gICAgY29uc3QgcmVsYXRpb25zID0gbW9kZWxDbGFzcy5nZXRSZWxhdGlvbkFycmF5KCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHJlbGF0aW9ucy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IHJlbCA9IHJlbGF0aW9uc1tpXTtcbiAgICAgIGNvbnN0IHJlbE5hbWUgPSByZWwubmFtZTtcbiAgICAgIGNvbnN0IHJlbE1vZGVscyA9IG1vZGVsW3JlbE5hbWVdO1xuXG4gICAgICBsZXQgbmV4dEFsbG93ZWQgPSBudWxsO1xuXG4gICAgICBpZiAocmVsTW9kZWxzICYmIGFsbG93ZWRSZWxhdGlvbnMgaW5zdGFuY2VvZiBSZWxhdGlvbkV4cHJlc3Npb24pIHtcbiAgICAgICAgbmV4dEFsbG93ZWQgPSBhbGxvd2VkUmVsYXRpb25zLmNoaWxkRXhwcmVzc2lvbihyZWxOYW1lKTtcblxuICAgICAgICBpZiAoIW5leHRBbGxvd2VkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcih7YWxsb3dlZFJlbGF0aW9uczogJ3RyeWluZyB0byBpbnNlcnQgYW4gdW5hbGxvd2VkIHJlbGF0aW9uJ30pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbE1vZGVscykpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSByZWxNb2RlbHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgdGhpcy5idWlsZEZvckl0ZW0ocmVsLnJlbGF0ZWRNb2RlbENsYXNzLCByZWxNb2RlbHNbaV0sIG5vZGUsIHJlbCwgbmV4dEFsbG93ZWQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHJlbE1vZGVscykge1xuICAgICAgICB0aGlzLmJ1aWxkRm9ySXRlbShyZWwucmVsYXRlZE1vZGVsQ2xhc3MsIHJlbE1vZGVscywgbm9kZSwgcmVsLCBuZXh0QWxsb3dlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYnVpbGRGb3JJdGVtKG1vZGVsQ2xhc3MsIGl0ZW0sIHBhcmVudE5vZGUsIHJlbCwgYWxsb3dlZFJlbGF0aW9ucykge1xuICAgIGlmIChyZWwgaW5zdGFuY2VvZiBNYW55VG9NYW55UmVsYXRpb24gJiYgaXRlbVttb2RlbENsYXNzLmRiUmVmUHJvcF0pIHtcbiAgICAgIHRoaXMuYnVpbGRGb3JJZChtb2RlbENsYXNzLCBpdGVtLCBwYXJlbnROb2RlLCByZWwsIGFsbG93ZWRSZWxhdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1aWxkRm9yTW9kZWwobW9kZWxDbGFzcywgaXRlbSwgcGFyZW50Tm9kZSwgcmVsLCBhbGxvd2VkUmVsYXRpb25zKTtcbiAgICB9XG4gIH1cblxuICBidWlsZEZvcklkKG1vZGVsQ2xhc3MsIGl0ZW0sIHBhcmVudE5vZGUsIHJlbCkge1xuICAgIGNvbnN0IG5vZGUgPSBuZXcgRGVwZW5kZW5jeU5vZGUoaXRlbSwgbW9kZWxDbGFzcyk7XG4gICAgbm9kZS5oYW5kbGVkID0gdHJ1ZTtcblxuICAgIGl0ZW0uJGlkKGl0ZW1bbW9kZWxDbGFzcy5kYlJlZlByb3BdKTtcbiAgICBwYXJlbnROb2RlLm1hbnlUb01hbnlDb25uZWN0aW9ucy5wdXNoKG5ldyBNYW55VG9NYW55Q29ubmVjdGlvbihub2RlLCByZWwpKTtcbiAgfVxuXG4gIHNvbHZlUmVmZXJlbmNlcygpIHtcbiAgICBsZXQgcmVmTWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIC8vIEZpcnN0IG1lcmdlIGFsbCByZWZlcmVuY2Ugbm9kZXMgaW50byB0aGUgYWN0dWFsIG5vZGUuXG4gICAgdGhpcy5tZXJnZVJlZmVyZW5jZXMocmVmTWFwKTtcblxuICAgIC8vIFJlcGxhY2UgYWxsIHJlZmVyZW5jZSBub2RlcyB3aXRoIHRoZSBhY3R1YWwgbm9kZXMuXG4gICAgdGhpcy5yZXBsYWNlUmVmZXJlbmNlTm9kZXMocmVmTWFwKTtcbiAgfVxuXG4gIG1lcmdlUmVmZXJlbmNlcyhyZWZNYXApIHtcbiAgICBmb3IgKGxldCBuID0gMCwgbG4gPSB0aGlzLm5vZGVzLmxlbmd0aDsgbiA8IGxuOyArK24pIHtcbiAgICAgIGxldCByZWZOb2RlID0gdGhpcy5ub2Rlc1tuXTtcblxuICAgICAgaWYgKHJlZk5vZGUuaGFuZGxlZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlZiA9IHJlZk5vZGUubW9kZWxbcmVmTm9kZS5tb2RlbENsYXNzLnVpZFJlZlByb3BdO1xuXG4gICAgICBpZiAocmVmKSB7XG4gICAgICAgIGxldCBhY3R1YWxOb2RlID0gdGhpcy5ub2Rlc0J5SWRbcmVmXTtcblxuICAgICAgICBpZiAoIWFjdHVhbE5vZGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKHtyZWY6IGBjb3VsZCBub3QgcmVzb2x2ZSByZWZlcmVuY2UgXCIke3JlZn1cImB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkLCBsZDtcblxuICAgICAgICBmb3IgKGQgPSAwLCBsZCA9IHJlZk5vZGUubmVlZHMubGVuZ3RoOyBkIDwgbGQ7ICsrZCkge1xuICAgICAgICAgIGFjdHVhbE5vZGUubmVlZHMucHVzaChyZWZOb2RlLm5lZWRzW2RdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoZCA9IDAsIGxkID0gcmVmTm9kZS5pc05lZWRlZEJ5Lmxlbmd0aDsgZCA8IGxkOyArK2QpIHtcbiAgICAgICAgICBhY3R1YWxOb2RlLmlzTmVlZGVkQnkucHVzaChyZWZOb2RlLmlzTmVlZGVkQnlbZF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbSA9IDAsIGxtID0gcmVmTm9kZS5tYW55VG9NYW55Q29ubmVjdGlvbnMubGVuZ3RoOyBtIDwgbG07ICsrbSkge1xuICAgICAgICAgIGFjdHVhbE5vZGUubWFueVRvTWFueUNvbm5lY3Rpb25zLnB1c2gocmVmTm9kZS5tYW55VG9NYW55Q29ubmVjdGlvbnNbbV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmTWFwW3JlZk5vZGUuaWRdID0gYWN0dWFsTm9kZTtcbiAgICAgICAgcmVmTm9kZS5oYW5kbGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXBsYWNlUmVmZXJlbmNlTm9kZXMocmVmTWFwKSB7XG4gICAgZm9yIChsZXQgbiA9IDAsIGxuID0gdGhpcy5ub2Rlcy5sZW5ndGg7IG4gPCBsbjsgKytuKSB7XG4gICAgICBsZXQgbm9kZSA9IHRoaXMubm9kZXNbbl07XG4gICAgICBsZXQgZCwgbGQsIGRlcCwgYWN0dWFsTm9kZTtcblxuICAgICAgZm9yIChkID0gMCwgbGQgPSBub2RlLm5lZWRzLmxlbmd0aDsgZCA8IGxkOyArK2QpIHtcbiAgICAgICAgZGVwID0gbm9kZS5uZWVkc1tkXTtcbiAgICAgICAgYWN0dWFsTm9kZSA9IHJlZk1hcFtkZXAubm9kZS5pZF07XG5cbiAgICAgICAgaWYgKGFjdHVhbE5vZGUpIHtcbiAgICAgICAgICBkZXAubm9kZSA9IGFjdHVhbE5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChkID0gMCwgbGQgPSBub2RlLmlzTmVlZGVkQnkubGVuZ3RoOyBkIDwgbGQ7ICsrZCkge1xuICAgICAgICBkZXAgPSBub2RlLmlzTmVlZGVkQnlbZF07XG4gICAgICAgIGFjdHVhbE5vZGUgPSByZWZNYXBbZGVwLm5vZGUuaWRdO1xuXG4gICAgICAgIGlmIChhY3R1YWxOb2RlKSB7XG4gICAgICAgICAgZGVwLm5vZGUgPSBhY3R1YWxOb2RlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IG0gPSAwLCBsbSA9IG5vZGUubWFueVRvTWFueUNvbm5lY3Rpb25zLmxlbmd0aDsgbSA8IGxtOyArK20pIHtcbiAgICAgICAgbGV0IGNvbm4gPSBub2RlLm1hbnlUb01hbnlDb25uZWN0aW9uc1ttXTtcbiAgICAgICAgYWN0dWFsTm9kZSA9IHJlZk1hcFtjb25uLm5vZGUuaWRdO1xuXG4gICAgICAgIGlmIChhY3R1YWxOb2RlKSB7XG4gICAgICAgICAgY29ubi5yZWZOb2RlID0gY29ubi5ub2RlO1xuICAgICAgICAgIGNvbm4ubm9kZSA9IGFjdHVhbE5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVOb25SZWxhdGlvbkRlcHMoKSB7XG4gICAgZm9yIChsZXQgbiA9IDAsIGxuID0gdGhpcy5ub2Rlcy5sZW5ndGg7IG4gPCBsbjsgKytuKSB7XG4gICAgICBsZXQgbm9kZSA9IHRoaXMubm9kZXNbbl07XG5cbiAgICAgIGlmICghbm9kZS5oYW5kbGVkKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlTm9uUmVsYXRpb25EZXBzRm9yT2JqZWN0KG5vZGUubW9kZWwsIG5vZGUsIFtdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVOb25SZWxhdGlvbkRlcHNGb3JPYmplY3Qob2JqLCBub2RlLCBwYXRoKSB7XG4gICAgY29uc3QgcHJvcFJlZlJlZ2V4ID0gbm9kZS5tb2RlbENsYXNzLnByb3BSZWZSZWdleDtcbiAgICBjb25zdCByZWxhdGlvbnMgPSBub2RlLm1vZGVsQ2xhc3MuZ2V0UmVsYXRpb25zKCk7XG4gICAgY29uc3QgaXNNb2RlbCA9IG9iaiBpbnN0YW5jZW9mIE1vZGVsO1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleV07XG5cbiAgICAgIGlmIChpc01vZGVsICYmIHJlbGF0aW9uc1trZXldKSB7XG4gICAgICAgIC8vIERvbid0IHRyYXZlcnNlIHRoZSByZWxhdGlvbnMgb2YgbW9kZWwgaW5zdGFuY2VzLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHBhdGgucHVzaChrZXkpO1xuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICBhbGxNYXRjaGVzKHByb3BSZWZSZWdleCwgdmFsdWUsIG1hdGNoUmVzdWx0ID0+IHtcbiAgICAgICAgICBsZXQgbWF0Y2ggPSBtYXRjaFJlc3VsdFswXTtcbiAgICAgICAgICBsZXQgcmVmSWQgPSBtYXRjaFJlc3VsdFsxXTtcbiAgICAgICAgICBsZXQgcmVmUHJvcCA9IG1hdGNoUmVzdWx0WzJdO1xuICAgICAgICAgIGxldCByZWZOb2RlID0gdGhpcy5ub2Rlc0J5SWRbcmVmSWRdO1xuXG4gICAgICAgICAgaWYgKCFyZWZOb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKHtyZWY6IGBjb3VsZCBub3QgcmVzb2x2ZSByZWZlcmVuY2UgXCIke3ZhbHVlfVwiYH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbWF0Y2gpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBtYXRjaCBpcyB0aGUgd2hvbGUgc3RyaW5nLCByZXBsYWNlIHRoZSB2YWx1ZSB3aXRoIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAgICAgICAgICAgIC8vIFRoaXMgbWVhbnMgdGhhdCB0aGUgdmFsdWUgd2lsbCBoYXZlIHRoZSBzYW1lIHR5cGUgYXMgdGhlIHJlc29sdmVkIHZhbHVlXG4gICAgICAgICAgICAvLyAoZGF0ZSwgbnVtYmVyLCBldGMpLlxuICAgICAgICAgICAgbm9kZS5uZWVkcy5wdXNoKG5ldyBSZXBsYWNlVmFsdWVEZXBlbmRlbmN5KHJlZk5vZGUsIHBhdGgsIHJlZlByb3AsIGZhbHNlKSk7XG4gICAgICAgICAgICByZWZOb2RlLmlzTmVlZGVkQnkucHVzaChuZXcgUmVwbGFjZVZhbHVlRGVwZW5kZW5jeShub2RlLCBwYXRoLCByZWZQcm9wLCB0cnVlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBtYXRjaCBpcyBpbnNpZGUgYSBzdHJpbmcsIHJlcGxhY2UgdGhlIHJlZmVyZW5jZSBpbnNpZGUgdGhlIHN0cmluZyB3aXRoXG4gICAgICAgICAgICAvLyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gICAgICAgICAgICBub2RlLm5lZWRzLnB1c2gobmV3IEludGVycG9sYXRlVmFsdWVEZXBlbmRlbmN5KHJlZk5vZGUsIHBhdGgsIHJlZlByb3AsIG1hdGNoLCBmYWxzZSkpO1xuICAgICAgICAgICAgcmVmTm9kZS5pc05lZWRlZEJ5LnB1c2gobmV3IEludGVycG9sYXRlVmFsdWVEZXBlbmRlbmN5KG5vZGUsIHBhdGgsIHJlZlByb3AsIG1hdGNoLCB0cnVlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB0aGlzLmNyZWF0ZU5vblJlbGF0aW9uRGVwc0Zvck9iamVjdCh2YWx1ZSwgbm9kZSwgcGF0aCk7XG4gICAgICB9XG5cbiAgICAgIHBhdGgucG9wKCk7XG4gICAgfVxuICB9XG5cbiAgaXNDeWNsaWMobm9kZXMpIHtcbiAgICBsZXQgaXNDeWNsaWMgPSBmYWxzZTtcblxuICAgIGZvciAobGV0IG4gPSAwLCBsbiA9IG5vZGVzLmxlbmd0aDsgbiA8IGxuOyArK24pIHtcbiAgICAgIGxldCBub2RlID0gbm9kZXNbbl07XG5cbiAgICAgIGlmIChub2RlLmhhbmRsZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzQ3ljbGljTm9kZShub2RlKSkge1xuICAgICAgICBpc0N5Y2xpYyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY2xlYXJGbGFncyh0aGlzLm5vZGVzKTtcbiAgICByZXR1cm4gaXNDeWNsaWM7XG4gIH1cblxuICBpc0N5Y2xpY05vZGUobm9kZSkge1xuICAgIGlmICghbm9kZS52aXNpdGVkKSB7XG4gICAgICBub2RlLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgbm9kZS5yZWN1cnNpb24gPSB0cnVlO1xuXG4gICAgICBmb3IgKGxldCBkID0gMCwgbGQgPSBub2RlLm5lZWRzLmxlbmd0aDsgZCA8IGxkOyArK2QpIHtcbiAgICAgICAgbGV0IGRlcCA9IG5vZGUubmVlZHNbZF07XG5cbiAgICAgICAgaWYgKCFkZXAubm9kZS52aXNpdGVkICYmIHRoaXMuaXNDeWNsaWNOb2RlKGRlcC5ub2RlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGRlcC5ub2RlLnJlY3Vyc2lvbikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbm9kZS5yZWN1cnNpb24gPSBmYWxzZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjbGVhckZsYWdzKG5vZGVzKSB7XG4gICAgZm9yIChsZXQgbiA9IDAsIGxuID0gbm9kZXMubGVuZ3RoOyBuIDwgbG47ICsrbikge1xuICAgICAgbGV0IG5vZGUgPSBub2Rlc1tuXTtcblxuICAgICAgbm9kZS52aXNpdGVkID0gZmFsc2U7XG4gICAgICBub2RlLnJlY3Vyc2lvbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVVpZCgpIHtcbiAgICByZXR1cm4gYF9fb2JqZWN0aW9uX3VpZCgkeysrdGhpcy51aWR9KV9fYDtcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxNYXRjaGVzKHJlZ2V4LCBzdHIsIGNiKSB7XG4gIGxldCBtYXRjaFJlc3VsdCA9IHJlZ2V4LmV4ZWMoc3RyKTtcblxuICB3aGlsZSAobWF0Y2hSZXN1bHQpIHtcbiAgICBjYihtYXRjaFJlc3VsdCk7XG4gICAgbWF0Y2hSZXN1bHQgPSByZWdleC5leGVjKHN0cik7XG4gIH1cbn0iXX0=