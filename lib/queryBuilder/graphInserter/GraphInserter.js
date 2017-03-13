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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _DependencyGraph = require('./DependencyGraph');

var _DependencyGraph2 = _interopRequireDefault(_DependencyGraph);

var _TableInsertion = require('./TableInsertion');

var _TableInsertion2 = _interopRequireDefault(_TableInsertion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GraphInserter = function () {
  function GraphInserter(_ref) {
    var modelClass = _ref.modelClass,
        models = _ref.models,
        allowedRelations = _ref.allowedRelations,
        knex = _ref.knex;
    (0, _classCallCheck3.default)(this, GraphInserter);

    /**
     * @type {Constructor.<Model>}
     */
    this.modelClass = modelClass;

    /**
     * @type {Model|Array.<Model>}
     */
    this.models = models;

    /**
     * @type {RelationExpression}
     */
    this.allowedRelations = allowedRelations || null;

    /**
     * @type {boolean}
     */
    this.done = false;

    /**
     * @type {DependencyGraph}
     */
    this.graph = this._buildDependencyGraph();

    /**
     * @type {knex}
     */
    this.knex = knex;
  }

  /**
   * @param {function(TableInsertion)} inserter
   * @return {Promise}
   */


  GraphInserter.prototype.execute = function execute(inserter) {
    return this._executeNextBatch(inserter);
  };

  /**
   * @returns {DependencyGraph}
   * @private
   */


  GraphInserter.prototype._buildDependencyGraph = function _buildDependencyGraph() {
    var graph = new _DependencyGraph2.default(this.allowedRelations);
    graph.build(this.modelClass, this.models);
    return graph;
  };

  /**
   * @param {function(TableInsertion)} inserter
   * @returns {Promise}
   * @private
   */


  GraphInserter.prototype._executeNextBatch = function _executeNextBatch(inserter) {
    var _this = this;

    var batch = this._nextBatch();

    if (!batch) {
      // If we get here, we are done. All we need to do now is to finalize the object graph
      // and return it as the final output.
      return this._finalize();
    }

    // Insert the batch using the `inserter` function.
    return _bluebird2.default.all((0, _keys2.default)(batch).map(function (tableName) {
      var tableInsertion = batch[tableName];
      var uids = void 0;

      if (!tableInsertion.isJoinTableInsertion) {
        // We need to omit the uid properties so that they don't get inserted
        // into the database. Join table insertions never have uids.
        uids = _this._omitUids(tableInsertion);
      }

      return inserter(tableInsertion).then(function () {
        if (!tableInsertion.isJoinTableInsertion) {
          // Resolve dependencies to the inserted objects. Join table insertions
          // never resolve any dependencies.
          _this._resolveDepsForInsertion(tableInsertion, uids);
        }
      });
    })).then(function () {
      return _this._executeNextBatch(inserter);
    });
  };

  /**
   * @private
   * @returns {Object.<string, TableInsertion>}
   */


  GraphInserter.prototype._nextBatch = function _nextBatch() {
    if (this.done) {
      return null;
    }

    var batch = this._createBatch();

    if (_lodash2.default.isEmpty(batch)) {
      this.done = true;
      return this._createManyToManyRelationJoinRowBatch();
    } else {
      this._markBatchHandled(batch);
      return batch;
    }
  };

  /**
   * @private
   * @returns {Object.<string, TableInsertion>}
   */


  GraphInserter.prototype._createBatch = function _createBatch() {
    var batch = (0, _create2.default)(null);
    var nodes = this.graph.nodes;

    for (var n = 0, ln = nodes.length; n < ln; ++n) {
      var node = nodes[n];

      if (!node.handled && node.needs.length === node.numHandledNeeds) {
        var tableInsertion = batch[node.modelClass.tableName];

        if (!tableInsertion) {
          tableInsertion = new _TableInsertion2.default(node.modelClass, false);
          batch[node.modelClass.tableName] = tableInsertion;
        }

        tableInsertion.models.push(node.model);
        tableInsertion.isInputModel.push(!!this.graph.inputNodesById[node.id]);
      }
    }

    return batch;
  };

  /**
   * @private
   * @param {Object.<string, TableInsertion>} batch
   */


  GraphInserter.prototype._markBatchHandled = function _markBatchHandled(batch) {
    var models = _lodash2.default.flatten(_lodash2.default.map(batch, 'models'));
    var nodes = this.graph.nodesById;

    for (var m = 0, lm = models.length; m < lm; ++m) {
      var id = models[m][models[m].constructor.uidProp];
      var node = nodes[id];

      for (var nb = 0, lnb = node.isNeededBy.length; nb < lnb; ++nb) {
        var dep = node.isNeededBy[nb];
        dep.node.numHandledNeeds++;
      }

      node.handled = true;
    }
  };

  /**
   * @private
   * @returns {Object.<string, TableInsertion>}
   */


  GraphInserter.prototype._createManyToManyRelationJoinRowBatch = function _createManyToManyRelationJoinRowBatch() {
    var batch = (0, _create2.default)(null);

    for (var n = 0, ln = this.graph.nodes.length; n < ln; ++n) {
      var node = this.graph.nodes[n];

      for (var m = 0, lm = node.manyToManyConnections.length; m < lm; ++m) {
        var conn = node.manyToManyConnections[m];
        var tableInsertion = batch[conn.relation.joinTable];

        var ownerProp = node.model.$values(conn.relation.ownerProp);
        var modelClass = conn.relation.joinTableModelClass(this.knex);
        var joinModel = conn.relation.createJoinModels(ownerProp, [conn.node.model])[0];

        if (conn.refNode) {
          // Also take extra properties from the referring model, it there was one.
          for (var k = 0, lk = conn.relation.joinTableExtras.length; k < lk; ++k) {
            var extra = conn.relation.joinTableExtras[k];

            if (!_lodash2.default.isUndefined(conn.refNode.model[extra.aliasProp])) {
              joinModel[extra.joinTableProp] = conn.refNode.model[extra.aliasProp];
            }
          }
        }

        joinModel = modelClass.fromJson(joinModel);

        if (!tableInsertion) {
          tableInsertion = new _TableInsertion2.default(modelClass, true);
          batch[modelClass.tableName] = tableInsertion;
        }

        tableInsertion.models.push(joinModel);
        tableInsertion.isInputModel.push(false);
      }
    }

    var modelNames = (0, _keys2.default)(batch);
    // Remove duplicates.
    for (var i = 0, l = modelNames.length; i < l; ++i) {
      var modelName = modelNames[i];
      var _tableInsertion = batch[modelName];

      if (_tableInsertion.models.length) {
        (function () {
          var keys = _lodash2.default.uniq(_lodash2.default.flatMap(_tableInsertion.models, _lodash2.default.keys));

          _tableInsertion.models = _lodash2.default.uniqBy(_tableInsertion.models, function (model) {
            return model.$propKey(keys);
          });
          _tableInsertion.isInputModel = _lodash2.default.times(_tableInsertion.models.length, _lodash2.default.constant(false));
        })();
      }
    }

    return batch;
  };

  /**
   * @private
   */


  GraphInserter.prototype._omitUids = function _omitUids(tableInsertion) {
    var ids = _lodash2.default.map(tableInsertion.models, tableInsertion.modelClass.uidProp);

    for (var m = 0, lm = tableInsertion.models.length; m < lm; ++m) {
      tableInsertion.models[m].$omit(tableInsertion.modelClass.uidProp);
    }

    return ids;
  };

  /**
   * @private
   * @param {TableInsertion} tableInsertion
   * @param {Array.<string>} uids
   */


  GraphInserter.prototype._resolveDepsForInsertion = function _resolveDepsForInsertion(tableInsertion, uids) {
    for (var m = 0, lm = tableInsertion.models.length; m < lm; ++m) {
      var node = this.graph.nodesById[uids[m]];
      var model = tableInsertion.models[m];

      for (var d = 0, ld = node.isNeededBy.length; d < ld; ++d) {
        node.isNeededBy[d].resolve(model);
      }
    }
  };

  /**
   * @private
   * @return {Promise}
   */


  GraphInserter.prototype._finalize = function _finalize() {
    for (var n = 0, ln = this.graph.nodes.length; n < ln; ++n) {
      var refNode = this.graph.nodes[n];
      var ref = refNode.model[refNode.modelClass.uidRefProp];

      if (ref) {
        // Copy all the properties to the reference nodes.
        var actualNode = this.graph.nodesById[ref];
        var relations = actualNode.modelClass.getRelations();
        var keys = (0, _keys2.default)(actualNode.model);

        for (var i = 0, l = keys.length; i < l; ++i) {
          var key = keys[i];
          var value = actualNode.model[key];

          if (!relations[key] && !_lodash2.default.isFunction(value)) {
            refNode.model[key] = value;
          }
        }

        refNode.model.$omit(refNode.modelClass.uidProp, refNode.modelClass.uidRefProp);
      }
    }

    return _bluebird2.default.resolve(this.models);
  };

  return GraphInserter;
}();

exports.default = GraphInserter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyYXBoSW5zZXJ0ZXIuanMiXSwibmFtZXMiOlsiR3JhcGhJbnNlcnRlciIsIm1vZGVsQ2xhc3MiLCJtb2RlbHMiLCJhbGxvd2VkUmVsYXRpb25zIiwia25leCIsImRvbmUiLCJncmFwaCIsIl9idWlsZERlcGVuZGVuY3lHcmFwaCIsImV4ZWN1dGUiLCJpbnNlcnRlciIsIl9leGVjdXRlTmV4dEJhdGNoIiwiYnVpbGQiLCJiYXRjaCIsIl9uZXh0QmF0Y2giLCJfZmluYWxpemUiLCJhbGwiLCJtYXAiLCJ0YWJsZUluc2VydGlvbiIsInRhYmxlTmFtZSIsInVpZHMiLCJpc0pvaW5UYWJsZUluc2VydGlvbiIsIl9vbWl0VWlkcyIsInRoZW4iLCJfcmVzb2x2ZURlcHNGb3JJbnNlcnRpb24iLCJfY3JlYXRlQmF0Y2giLCJpc0VtcHR5IiwiX2NyZWF0ZU1hbnlUb01hbnlSZWxhdGlvbkpvaW5Sb3dCYXRjaCIsIl9tYXJrQmF0Y2hIYW5kbGVkIiwibm9kZXMiLCJuIiwibG4iLCJsZW5ndGgiLCJub2RlIiwiaGFuZGxlZCIsIm5lZWRzIiwibnVtSGFuZGxlZE5lZWRzIiwicHVzaCIsIm1vZGVsIiwiaXNJbnB1dE1vZGVsIiwiaW5wdXROb2Rlc0J5SWQiLCJpZCIsImZsYXR0ZW4iLCJub2Rlc0J5SWQiLCJtIiwibG0iLCJjb25zdHJ1Y3RvciIsInVpZFByb3AiLCJuYiIsImxuYiIsImlzTmVlZGVkQnkiLCJkZXAiLCJtYW55VG9NYW55Q29ubmVjdGlvbnMiLCJjb25uIiwicmVsYXRpb24iLCJqb2luVGFibGUiLCJvd25lclByb3AiLCIkdmFsdWVzIiwiam9pblRhYmxlTW9kZWxDbGFzcyIsImpvaW5Nb2RlbCIsImNyZWF0ZUpvaW5Nb2RlbHMiLCJyZWZOb2RlIiwiayIsImxrIiwiam9pblRhYmxlRXh0cmFzIiwiZXh0cmEiLCJpc1VuZGVmaW5lZCIsImFsaWFzUHJvcCIsImpvaW5UYWJsZVByb3AiLCJmcm9tSnNvbiIsIm1vZGVsTmFtZXMiLCJpIiwibCIsIm1vZGVsTmFtZSIsImtleXMiLCJ1bmlxIiwiZmxhdE1hcCIsInVuaXFCeSIsIiRwcm9wS2V5IiwidGltZXMiLCJjb25zdGFudCIsImlkcyIsIiRvbWl0IiwiZCIsImxkIiwicmVzb2x2ZSIsInJlZiIsInVpZFJlZlByb3AiLCJhY3R1YWxOb2RlIiwicmVsYXRpb25zIiwiZ2V0UmVsYXRpb25zIiwia2V5IiwidmFsdWUiLCJpc0Z1bmN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsYTtBQUVuQiwrQkFBMEQ7QUFBQSxRQUE3Q0MsVUFBNkMsUUFBN0NBLFVBQTZDO0FBQUEsUUFBakNDLE1BQWlDLFFBQWpDQSxNQUFpQztBQUFBLFFBQXpCQyxnQkFBeUIsUUFBekJBLGdCQUF5QjtBQUFBLFFBQVBDLElBQU8sUUFBUEEsSUFBTztBQUFBOztBQUN4RDs7O0FBR0EsU0FBS0gsVUFBTCxHQUFrQkEsVUFBbEI7O0FBRUE7OztBQUdBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDs7QUFFQTs7O0FBR0EsU0FBS0MsZ0JBQUwsR0FBd0JBLG9CQUFvQixJQUE1Qzs7QUFFQTs7O0FBR0EsU0FBS0UsSUFBTCxHQUFZLEtBQVo7O0FBRUE7OztBQUdBLFNBQUtDLEtBQUwsR0FBYSxLQUFLQyxxQkFBTCxFQUFiOztBQUVBOzs7QUFHQSxTQUFLSCxJQUFMLEdBQVlBLElBQVo7QUFDRDs7QUFFRDs7Ozs7OzBCQUlBSSxPLG9CQUFRQyxRLEVBQVU7QUFDaEIsV0FBTyxLQUFLQyxpQkFBTCxDQUF1QkQsUUFBdkIsQ0FBUDtBQUNELEc7O0FBRUQ7Ozs7OzswQkFJQUYscUIsb0NBQXdCO0FBQ3RCLFFBQUlELFFBQVEsOEJBQW9CLEtBQUtILGdCQUF6QixDQUFaO0FBQ0FHLFVBQU1LLEtBQU4sQ0FBWSxLQUFLVixVQUFqQixFQUE2QixLQUFLQyxNQUFsQztBQUNBLFdBQU9JLEtBQVA7QUFDRCxHOztBQUVEOzs7Ozs7OzBCQUtBSSxpQiw4QkFBa0JELFEs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aEIsT0FBTyxvQkFBWWMsV0FBV2xELEtBQXZCLENBQWI7O0FBRUEsYUFBSyxJQUFJaUMsSUFBSSxDQUFSLEVBQVdDLElBQUlFLEtBQUsxQyxNQUF6QixFQUFpQ3VDLElBQUlDLENBQXJDLEVBQXdDLEVBQUVELENBQTFDLEVBQTZDO0FBQzNDLGNBQU1vQixNQUFNakIsS0FBS0gsQ0FBTCxDQUFaO0FBQ0EsY0FBTXFCLFFBQVFKLFdBQVdsRCxLQUFYLENBQWlCcUQsR0FBakIsQ0FBZDs7QUFFQSxjQUFJLENBQUNGLFVBQVVFLEdBQVYsQ0FBRCxJQUFtQixDQUFDLGlCQUFFRSxVQUFGLENBQWFELEtBQWIsQ0FBeEIsRUFBNkM7QUFDM0MvQixvQkFBUXZCLEtBQVIsQ0FBY3FELEdBQWQsSUFBcUJDLEtBQXJCO0FBQ0Q7QUFDRjs7QUFFRC9CLGdCQUFRdkIsS0FBUixDQUFjNEMsS0FBZCxDQUFvQnJCLFFBQVEzRCxVQUFSLENBQW1CNkMsT0FBdkMsRUFBZ0RjLFFBQVEzRCxVQUFSLENBQW1CcUYsVUFBbkU7QUFDRDtBQUNGOztBQUVELFdBQU8sbUJBQVFGLE9BQVIsQ0FBZ0IsS0FBS2xGLE1BQXJCLENBQVA7QUFDRCxHOzs7OztrQkFqUmtCRixhIiwiZmlsZSI6IkdyYXBoSW5zZXJ0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG5pbXBvcnQgRGVwZW5kZW5jeUdyYXBoIGZyb20gJy4vRGVwZW5kZW5jeUdyYXBoJztcbmltcG9ydCBUYWJsZUluc2VydGlvbiBmcm9tICcuL1RhYmxlSW5zZXJ0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhJbnNlcnRlciB7XG5cbiAgY29uc3RydWN0b3Ioe21vZGVsQ2xhc3MsIG1vZGVscywgYWxsb3dlZFJlbGF0aW9ucywga25leH0pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Q29uc3RydWN0b3IuPE1vZGVsPn1cbiAgICAgKi9cbiAgICB0aGlzLm1vZGVsQ2xhc3MgPSBtb2RlbENsYXNzO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge01vZGVsfEFycmF5LjxNb2RlbD59XG4gICAgICovXG4gICAgdGhpcy5tb2RlbHMgPSBtb2RlbHM7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7UmVsYXRpb25FeHByZXNzaW9ufVxuICAgICAqL1xuICAgIHRoaXMuYWxsb3dlZFJlbGF0aW9ucyA9IGFsbG93ZWRSZWxhdGlvbnMgfHwgbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0RlcGVuZGVuY3lHcmFwaH1cbiAgICAgKi9cbiAgICB0aGlzLmdyYXBoID0gdGhpcy5fYnVpbGREZXBlbmRlbmN5R3JhcGgoKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtrbmV4fVxuICAgICAqL1xuICAgIHRoaXMua25leCA9IGtuZXg7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbihUYWJsZUluc2VydGlvbil9IGluc2VydGVyXG4gICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAqL1xuICBleGVjdXRlKGluc2VydGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX2V4ZWN1dGVOZXh0QmF0Y2goaW5zZXJ0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtEZXBlbmRlbmN5R3JhcGh9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYnVpbGREZXBlbmRlbmN5R3JhcGgoKSB7XG4gICAgbGV0IGdyYXBoID0gbmV3IERlcGVuZGVuY3lHcmFwaCh0aGlzLmFsbG93ZWRSZWxhdGlvbnMpO1xuICAgIGdyYXBoLmJ1aWxkKHRoaXMubW9kZWxDbGFzcywgdGhpcy5tb2RlbHMpO1xuICAgIHJldHVybiBncmFwaDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFRhYmxlSW5zZXJ0aW9uKX0gaW5zZXJ0ZXJcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXhlY3V0ZU5leHRCYXRjaChpbnNlcnRlcikge1xuICAgIGxldCBiYXRjaCA9IHRoaXMuX25leHRCYXRjaCgpO1xuXG4gICAgaWYgKCFiYXRjaCkge1xuICAgICAgLy8gSWYgd2UgZ2V0IGhlcmUsIHdlIGFyZSBkb25lLiBBbGwgd2UgbmVlZCB0byBkbyBub3cgaXMgdG8gZmluYWxpemUgdGhlIG9iamVjdCBncmFwaFxuICAgICAgLy8gYW5kIHJldHVybiBpdCBhcyB0aGUgZmluYWwgb3V0cHV0LlxuICAgICAgcmV0dXJuIHRoaXMuX2ZpbmFsaXplKCk7XG4gICAgfVxuXG4gICAgLy8gSW5zZXJ0IHRoZSBiYXRjaCB1c2luZyB0aGUgYGluc2VydGVyYCBmdW5jdGlvbi5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoYmF0Y2gpLm1hcCh0YWJsZU5hbWUgPT4ge1xuICAgICAgY29uc3QgdGFibGVJbnNlcnRpb24gPSBiYXRjaFt0YWJsZU5hbWVdO1xuICAgICAgbGV0IHVpZHM7XG5cbiAgICAgIGlmICghdGFibGVJbnNlcnRpb24uaXNKb2luVGFibGVJbnNlcnRpb24pIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBvbWl0IHRoZSB1aWQgcHJvcGVydGllcyBzbyB0aGF0IHRoZXkgZG9uJ3QgZ2V0IGluc2VydGVkXG4gICAgICAgIC8vIGludG8gdGhlIGRhdGFiYXNlLiBKb2luIHRhYmxlIGluc2VydGlvbnMgbmV2ZXIgaGF2ZSB1aWRzLlxuICAgICAgICB1aWRzID0gdGhpcy5fb21pdFVpZHModGFibGVJbnNlcnRpb24pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5zZXJ0ZXIodGFibGVJbnNlcnRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAoIXRhYmxlSW5zZXJ0aW9uLmlzSm9pblRhYmxlSW5zZXJ0aW9uKSB7XG4gICAgICAgICAgLy8gUmVzb2x2ZSBkZXBlbmRlbmNpZXMgdG8gdGhlIGluc2VydGVkIG9iamVjdHMuIEpvaW4gdGFibGUgaW5zZXJ0aW9uc1xuICAgICAgICAgIC8vIG5ldmVyIHJlc29sdmUgYW55IGRlcGVuZGVuY2llcy5cbiAgICAgICAgICB0aGlzLl9yZXNvbHZlRGVwc0Zvckluc2VydGlvbih0YWJsZUluc2VydGlvbiwgdWlkcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9leGVjdXRlTmV4dEJhdGNoKGluc2VydGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsIFRhYmxlSW5zZXJ0aW9uPn1cbiAgICovXG4gIF9uZXh0QmF0Y2goKSB7XG4gICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGJhdGNoID0gdGhpcy5fY3JlYXRlQmF0Y2goKTtcblxuICAgIGlmIChfLmlzRW1wdHkoYmF0Y2gpKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZU1hbnlUb01hbnlSZWxhdGlvbkpvaW5Sb3dCYXRjaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tYXJrQmF0Y2hIYW5kbGVkKGJhdGNoKTtcbiAgICAgIHJldHVybiBiYXRjaDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCBUYWJsZUluc2VydGlvbj59XG4gICAqL1xuICBfY3JlYXRlQmF0Y2goKSB7XG4gICAgbGV0IGJhdGNoID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBsZXQgbm9kZXMgPSB0aGlzLmdyYXBoLm5vZGVzO1xuXG4gICAgZm9yIChsZXQgbiA9IDAsIGxuID0gbm9kZXMubGVuZ3RoOyBuIDwgbG47ICsrbikge1xuICAgICAgbGV0IG5vZGUgPSBub2Rlc1tuXTtcblxuICAgICAgaWYgKCFub2RlLmhhbmRsZWQgJiYgbm9kZS5uZWVkcy5sZW5ndGggPT09IG5vZGUubnVtSGFuZGxlZE5lZWRzKSB7XG4gICAgICAgIGxldCB0YWJsZUluc2VydGlvbiA9IGJhdGNoW25vZGUubW9kZWxDbGFzcy50YWJsZU5hbWVdO1xuXG4gICAgICAgIGlmICghdGFibGVJbnNlcnRpb24pIHtcbiAgICAgICAgICB0YWJsZUluc2VydGlvbiA9IG5ldyBUYWJsZUluc2VydGlvbihub2RlLm1vZGVsQ2xhc3MsIGZhbHNlKTtcbiAgICAgICAgICBiYXRjaFtub2RlLm1vZGVsQ2xhc3MudGFibGVOYW1lXSA9IHRhYmxlSW5zZXJ0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFibGVJbnNlcnRpb24ubW9kZWxzLnB1c2gobm9kZS5tb2RlbCk7XG4gICAgICAgIHRhYmxlSW5zZXJ0aW9uLmlzSW5wdXRNb2RlbC5wdXNoKCEhdGhpcy5ncmFwaC5pbnB1dE5vZGVzQnlJZFtub2RlLmlkXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhdGNoO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsIFRhYmxlSW5zZXJ0aW9uPn0gYmF0Y2hcbiAgICovXG4gIF9tYXJrQmF0Y2hIYW5kbGVkKGJhdGNoKSB7XG4gICAgbGV0IG1vZGVscyA9IF8uZmxhdHRlbihfLm1hcChiYXRjaCwgJ21vZGVscycpKTtcbiAgICBsZXQgbm9kZXMgPSB0aGlzLmdyYXBoLm5vZGVzQnlJZDtcblxuICAgIGZvciAobGV0IG0gPSAwLCBsbSA9IG1vZGVscy5sZW5ndGg7IG0gPCBsbTsgKyttKSB7XG4gICAgICBsZXQgaWQgPSBtb2RlbHNbbV1bbW9kZWxzW21dLmNvbnN0cnVjdG9yLnVpZFByb3BdO1xuICAgICAgbGV0IG5vZGUgPSBub2Rlc1tpZF07XG5cbiAgICAgIGZvciAobGV0IG5iID0gMCwgbG5iID0gbm9kZS5pc05lZWRlZEJ5Lmxlbmd0aDsgbmIgPCBsbmI7ICsrbmIpIHtcbiAgICAgICAgbGV0IGRlcCA9IG5vZGUuaXNOZWVkZWRCeVtuYl07XG4gICAgICAgIGRlcC5ub2RlLm51bUhhbmRsZWROZWVkcysrO1xuICAgICAgfVxuXG4gICAgICBub2RlLmhhbmRsZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsIFRhYmxlSW5zZXJ0aW9uPn1cbiAgICovXG4gIF9jcmVhdGVNYW55VG9NYW55UmVsYXRpb25Kb2luUm93QmF0Y2goKSB7XG4gICAgbGV0IGJhdGNoID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIGZvciAobGV0IG4gPSAwLCBsbiA9IHRoaXMuZ3JhcGgubm9kZXMubGVuZ3RoOyBuIDwgbG47ICsrbikge1xuICAgICAgbGV0IG5vZGUgPSB0aGlzLmdyYXBoLm5vZGVzW25dO1xuXG4gICAgICBmb3IgKGxldCBtID0gMCwgbG0gPSBub2RlLm1hbnlUb01hbnlDb25uZWN0aW9ucy5sZW5ndGg7IG0gPCBsbTsgKyttKSB7XG4gICAgICAgIGxldCBjb25uID0gbm9kZS5tYW55VG9NYW55Q29ubmVjdGlvbnNbbV07XG4gICAgICAgIGxldCB0YWJsZUluc2VydGlvbiA9IGJhdGNoW2Nvbm4ucmVsYXRpb24uam9pblRhYmxlXTtcblxuICAgICAgICBsZXQgb3duZXJQcm9wID0gbm9kZS5tb2RlbC4kdmFsdWVzKGNvbm4ucmVsYXRpb24ub3duZXJQcm9wKTtcbiAgICAgICAgbGV0IG1vZGVsQ2xhc3MgPSBjb25uLnJlbGF0aW9uLmpvaW5UYWJsZU1vZGVsQ2xhc3ModGhpcy5rbmV4KTtcbiAgICAgICAgbGV0IGpvaW5Nb2RlbCA9IGNvbm4ucmVsYXRpb24uY3JlYXRlSm9pbk1vZGVscyhvd25lclByb3AsIFtjb25uLm5vZGUubW9kZWxdKVswXTtcblxuICAgICAgICBpZiAoY29ubi5yZWZOb2RlKSB7XG4gICAgICAgICAgLy8gQWxzbyB0YWtlIGV4dHJhIHByb3BlcnRpZXMgZnJvbSB0aGUgcmVmZXJyaW5nIG1vZGVsLCBpdCB0aGVyZSB3YXMgb25lLlxuICAgICAgICAgIGZvciAobGV0IGsgPSAwLCBsayA9IGNvbm4ucmVsYXRpb24uam9pblRhYmxlRXh0cmFzLmxlbmd0aDsgayA8IGxrOyArK2spIHtcbiAgICAgICAgICAgIGxldCBleHRyYSA9IGNvbm4ucmVsYXRpb24uam9pblRhYmxlRXh0cmFzW2tdO1xuXG4gICAgICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQoY29ubi5yZWZOb2RlLm1vZGVsW2V4dHJhLmFsaWFzUHJvcF0pKSB7XG4gICAgICAgICAgICAgIGpvaW5Nb2RlbFtleHRyYS5qb2luVGFibGVQcm9wXSA9IGNvbm4ucmVmTm9kZS5tb2RlbFtleHRyYS5hbGlhc1Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGpvaW5Nb2RlbCA9IG1vZGVsQ2xhc3MuZnJvbUpzb24oam9pbk1vZGVsKTtcblxuICAgICAgICBpZiAoIXRhYmxlSW5zZXJ0aW9uKSB7XG4gICAgICAgICAgdGFibGVJbnNlcnRpb24gPSBuZXcgVGFibGVJbnNlcnRpb24obW9kZWxDbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgYmF0Y2hbbW9kZWxDbGFzcy50YWJsZU5hbWVdID0gdGFibGVJbnNlcnRpb247XG4gICAgICAgIH1cblxuICAgICAgICB0YWJsZUluc2VydGlvbi5tb2RlbHMucHVzaChqb2luTW9kZWwpO1xuICAgICAgICB0YWJsZUluc2VydGlvbi5pc0lucHV0TW9kZWwucHVzaChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbW9kZWxOYW1lcyA9IE9iamVjdC5rZXlzKGJhdGNoKTtcbiAgICAvLyBSZW1vdmUgZHVwbGljYXRlcy5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IG1vZGVsTmFtZXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBtb2RlbE5hbWUgPSBtb2RlbE5hbWVzW2ldO1xuICAgICAgY29uc3QgdGFibGVJbnNlcnRpb24gPSBiYXRjaFttb2RlbE5hbWVdO1xuXG4gICAgICBpZiAodGFibGVJbnNlcnRpb24ubW9kZWxzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBrZXlzID0gXy51bmlxKF8uZmxhdE1hcCh0YWJsZUluc2VydGlvbi5tb2RlbHMsIF8ua2V5cykpO1xuXG4gICAgICAgIHRhYmxlSW5zZXJ0aW9uLm1vZGVscyA9IF8udW5pcUJ5KHRhYmxlSW5zZXJ0aW9uLm1vZGVscywgbW9kZWwgPT4gbW9kZWwuJHByb3BLZXkoa2V5cykpO1xuICAgICAgICB0YWJsZUluc2VydGlvbi5pc0lucHV0TW9kZWwgPSBfLnRpbWVzKHRhYmxlSW5zZXJ0aW9uLm1vZGVscy5sZW5ndGgsIF8uY29uc3RhbnQoZmFsc2UpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYmF0Y2g7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9vbWl0VWlkcyh0YWJsZUluc2VydGlvbikge1xuICAgIGxldCBpZHMgPSBfLm1hcCh0YWJsZUluc2VydGlvbi5tb2RlbHMsIHRhYmxlSW5zZXJ0aW9uLm1vZGVsQ2xhc3MudWlkUHJvcCk7XG5cbiAgICBmb3IgKGxldCBtID0gMCwgbG0gPSB0YWJsZUluc2VydGlvbi5tb2RlbHMubGVuZ3RoOyBtIDwgbG07ICsrbSkge1xuICAgICAgdGFibGVJbnNlcnRpb24ubW9kZWxzW21dLiRvbWl0KHRhYmxlSW5zZXJ0aW9uLm1vZGVsQ2xhc3MudWlkUHJvcCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge1RhYmxlSW5zZXJ0aW9ufSB0YWJsZUluc2VydGlvblxuICAgKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSB1aWRzXG4gICAqL1xuICBfcmVzb2x2ZURlcHNGb3JJbnNlcnRpb24odGFibGVJbnNlcnRpb24sIHVpZHMpIHtcbiAgICBmb3IgKGxldCBtID0gMCwgbG0gPSB0YWJsZUluc2VydGlvbi5tb2RlbHMubGVuZ3RoOyBtIDwgbG07ICsrbSkge1xuICAgICAgbGV0IG5vZGUgPSB0aGlzLmdyYXBoLm5vZGVzQnlJZFt1aWRzW21dXTtcbiAgICAgIGxldCBtb2RlbCA9IHRhYmxlSW5zZXJ0aW9uLm1vZGVsc1ttXTtcblxuICAgICAgZm9yIChsZXQgZCA9IDAsIGxkID0gbm9kZS5pc05lZWRlZEJ5Lmxlbmd0aDsgZCA8IGxkOyArK2QpIHtcbiAgICAgICAgbm9kZS5pc05lZWRlZEJ5W2RdLnJlc29sdmUobW9kZWwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgKi9cbiAgX2ZpbmFsaXplKCkge1xuICAgIGZvciAobGV0IG4gPSAwLCBsbiA9IHRoaXMuZ3JhcGgubm9kZXMubGVuZ3RoOyBuIDwgbG47ICsrbikge1xuICAgICAgbGV0IHJlZk5vZGUgPSB0aGlzLmdyYXBoLm5vZGVzW25dO1xuICAgICAgbGV0IHJlZiA9IHJlZk5vZGUubW9kZWxbcmVmTm9kZS5tb2RlbENsYXNzLnVpZFJlZlByb3BdO1xuXG4gICAgICBpZiAocmVmKSB7XG4gICAgICAgIC8vIENvcHkgYWxsIHRoZSBwcm9wZXJ0aWVzIHRvIHRoZSByZWZlcmVuY2Ugbm9kZXMuXG4gICAgICAgIGNvbnN0IGFjdHVhbE5vZGUgPSB0aGlzLmdyYXBoLm5vZGVzQnlJZFtyZWZdO1xuICAgICAgICBjb25zdCByZWxhdGlvbnMgPSBhY3R1YWxOb2RlLm1vZGVsQ2xhc3MuZ2V0UmVsYXRpb25zKCk7XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhY3R1YWxOb2RlLm1vZGVsKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGFjdHVhbE5vZGUubW9kZWxba2V5XTtcblxuICAgICAgICAgIGlmICghcmVsYXRpb25zW2tleV0gJiYgIV8uaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJlZk5vZGUubW9kZWxba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlZk5vZGUubW9kZWwuJG9taXQocmVmTm9kZS5tb2RlbENsYXNzLnVpZFByb3AsIHJlZk5vZGUubW9kZWxDbGFzcy51aWRSZWZQcm9wKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMubW9kZWxzKTtcbiAgfVxufVxuIl19