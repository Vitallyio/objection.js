'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _EagerOperation2 = require('./EagerOperation');

var _EagerOperation3 = _interopRequireDefault(_EagerOperation2);

var _ValidationError = require('../../model/ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var columnInfo = (0, _create2.default)(null);
var idLengthLimit = 63;
var relationRecursionLimit = 64;

var JoinEagerOperation = function (_EagerOperation) {
  (0, _inherits3.default)(JoinEagerOperation, _EagerOperation);

  function JoinEagerOperation(name, opt) {
    (0, _classCallCheck3.default)(this, JoinEagerOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _EagerOperation.call(this, name, opt));

    _this.allRelations = null;
    _this.rootModelClass = null;
    _this.pathInfo = (0, _create2.default)(null);
    _this.encodings = (0, _create2.default)(null);
    _this.decodings = (0, _create2.default)(null);
    _this.encIdx = 0;
    _this.opt = _lodash2.default.defaults(opt, {
      minimize: false,
      separator: ':',
      aliases: {}
    });
    return _this;
  }

  JoinEagerOperation.prototype.clone = function clone() {
    var copy = _EagerOperation.prototype.clone.call(this);

    copy.allRelations = this.allRelations;
    copy.allModelClasses = this.allModelClasses;
    copy.rootModelClass = this.rootModelClass;
    copy.pathInfo = this.pathInfo;
    copy.encodings = this.encodings;
    copy.decodings = this.decodings;
    copy.encIdx = this.encIdx;

    return this;
  };

  JoinEagerOperation.prototype.call = function call(builder, args) {
    var ret = _EagerOperation.prototype.call.call(this, builder, args);
    var ModelClass = builder.modelClass();

    if (ret) {
      this.rootModelClass = ModelClass;
      this.allModelClasses = findAllModels(this.expression, ModelClass);
      this.allRelations = findAllRelations(this.expression, ModelClass);
    }

    return ret;
  };

  JoinEagerOperation.prototype.onBeforeInternal = function onBeforeInternal(builder) {
    return fetchColumnInfo(builder, this.allModelClasses);
  };

  JoinEagerOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    var builderClone = builder.clone();

    builder.table(this.rootModelClass.tableName + ' as ' + this.rootModelClass.tableName);
    builder.findOptions({ callAfterGetDeeply: true });

    this.build({
      expr: this.expression,
      builder: builder,
      modelClass: builder.modelClass(),
      parentInfo: null,
      relation: null,
      path: '',
      selectFilter: function selectFilter(col) {
        return builderClone.hasSelection(col);
      }
    });
  };

  JoinEagerOperation.prototype.onRawResult = function onRawResult(builder, rows) {
    if (_lodash2.default.isEmpty(rows)) {
      return rows;
    }

    var keyInfoByPath = this.createKeyInfo(rows);
    var pathInfo = _lodash2.default.values(this.pathInfo);

    var tree = (0, _create2.default)(null);
    var stack = (0, _create2.default)(null);

    for (var i = 0, lr = rows.length; i < lr; ++i) {
      var row = rows[i];
      var curBranch = tree;

      for (var j = 0, lp = pathInfo.length; j < lp; ++j) {
        var pInfo = pathInfo[j];
        var id = pInfo.idGetter(row);

        if (!id) {
          continue;
        }

        if (pInfo.relation) {
          var parentModel = stack[pInfo.encParentPath];

          curBranch = pInfo.getBranch(parentModel);

          if (!curBranch) {
            curBranch = pInfo.createBranch(parentModel);
          }
        }

        var model = pInfo.getModelFromBranch(curBranch, id);

        if (!model) {
          model = createModel(row, pInfo, keyInfoByPath);
          pInfo.setModelToBranch(curBranch, id, model);
        }

        stack[pInfo.encPath] = model;
      }
    }

    return this.finalize(pathInfo[0], _lodash2.default.values(tree));
  };

  JoinEagerOperation.prototype.createKeyInfo = function createKeyInfo(rows) {
    var keys = (0, _keys2.default)(rows[0]);
    var keyInfo = [];

    for (var i = 0, l = keys.length; i < l; ++i) {
      var key = keys[i];
      var sepIdx = key.lastIndexOf(this.sep);

      if (sepIdx === -1) {
        var pInfo = this.pathInfo[''];
        var col = key;

        if (!pInfo.omitCols[col]) {
          keyInfo.push({
            pInfo: pInfo,
            key: key,
            col: col
          });
        }
      } else {
        var encPath = key.substr(0, sepIdx);
        var path = this.decode(encPath);
        var _col = key.substr(sepIdx + 1);
        var _pInfo = this.pathInfo[path];

        if (!_pInfo.omitCols[_col]) {
          keyInfo.push({
            pInfo: _pInfo,
            key: key,
            col: _col
          });
        }
      }
    }

    return _lodash2.default.groupBy(keyInfo, function (kInfo) {
      return kInfo.pInfo.encPath;
    });
  };

  JoinEagerOperation.prototype.finalize = function finalize(pInfo, models) {
    var relNames = (0, _keys2.default)(pInfo.children);

    if (Array.isArray(models)) {
      for (var m = 0, lm = models.length; m < lm; ++m) {
        this.finalizeOne(pInfo, relNames, models[m]);
      }
    } else if (models) {
      this.finalizeOne(pInfo, relNames, models);
    }

    return models;
  };

  JoinEagerOperation.prototype.finalizeOne = function finalizeOne(pInfo, relNames, model) {
    for (var r = 0, lr = relNames.length; r < lr; ++r) {
      var relName = relNames[r];
      var branch = model[relName];
      var childPathInfo = pInfo.children[relName];

      var finalized = childPathInfo.finalizeBranch(branch, model);
      this.finalize(childPathInfo, finalized);
    }
  };

  JoinEagerOperation.prototype.build = function build(_ref) {
    var _this2 = this;

    var expr = _ref.expr,
        builder = _ref.builder,
        selectFilter = _ref.selectFilter,
        modelClass = _ref.modelClass,
        relation = _ref.relation,
        path = _ref.path,
        parentInfo = _ref.parentInfo;

    var info = this.createPathInfo({
      modelClass: modelClass,
      path: path,
      relation: relation,
      parentInfo: parentInfo
    });

    this.pathInfo[path] = info;

    this.buildSelects({
      builder: builder,
      selectFilter: selectFilter,
      modelClass: modelClass,
      relation: relation,
      info: info
    });

    forEachExpr(expr, modelClass, function (childExpr, relation) {
      var nextPath = _this2.joinPath(path, relation.name);
      var encNextPath = _this2.encode(nextPath);
      var encJoinTablePath = relation.joinTable ? _this2.encode(joinTableForPath(nextPath)) : null;

      var filterQuery = createFilterQuery({
        builder: builder,
        relation: relation,
        expr: childExpr
      });

      var relatedJoinSelectQuery = createRelatedJoinFromQuery({
        filterQuery: filterQuery,
        relation: relation,
        allRelations: _this2.allRelations
      });

      relation.join(builder, {
        joinOperation: 'leftJoin',
        ownerTable: info.encPath,
        relatedTableAlias: encNextPath,
        joinTableAlias: encJoinTablePath,
        relatedJoinSelectQuery: relatedJoinSelectQuery
      });

      // Apply relation.modify since it may also contains selections. Don't move this
      // to the createFilterQuery function because relatedJoinSelectQuery is cloned
      // From the return value of that function and we don't want relation.modify
      // to be called twice for it.
      filterQuery.modify(relation.modify);

      _this2.build({
        expr: childExpr,
        builder: builder,
        modelClass: relation.relatedModelClass,
        relation: relation,
        parentInfo: info,
        path: nextPath,
        selectFilter: function selectFilter(col) {
          return filterQuery.hasSelection(col);
        }
      });
    });
  };

  JoinEagerOperation.prototype.createPathInfo = function createPathInfo(_ref2) {
    var modelClass = _ref2.modelClass,
        path = _ref2.path,
        relation = _ref2.relation,
        parentInfo = _ref2.parentInfo;

    var encPath = this.encode(path);
    var info = void 0;

    if (relation && relation.isOneToOne()) {
      info = new OneToOnePathInfo();
    } else {
      info = new PathInfo();
    }

    info.path = path;
    info.encPath = encPath;
    info.parentPath = parentInfo && parentInfo.path;
    info.encParentPath = parentInfo && parentInfo.encPath;
    info.modelClass = modelClass;
    info.relation = relation;
    info.idGetter = this.createIdGetter(modelClass, encPath);

    if (parentInfo) {
      parentInfo.children[relation.name] = info;
    }

    return info;
  };

  JoinEagerOperation.prototype.buildSelects = function buildSelects(_ref3) {
    var _this3 = this;

    var builder = _ref3.builder,
        selectFilter = _ref3.selectFilter,
        modelClass = _ref3.modelClass,
        relation = _ref3.relation,
        info = _ref3.info;

    var selects = [];
    var idCols = modelClass.getIdColumnArray();
    var rootTable = this.rootModelClass.tableName;

    columnInfo[modelClass.tableName].columns.forEach(function (col) {
      var filterPassed = selectFilter(col);
      var isIdColumn = idCols.indexOf(col) !== -1;

      if (filterPassed || isIdColumn) {
        selects.push({
          col: (info.encPath || rootTable) + '.' + col,
          alias: _this3.joinPath(info.encPath, col)
        });

        if (!filterPassed) {
          info.omitCols[col] = true;
        }
      }
    });

    if (relation && relation.joinTableExtras) {
      var joinTable = this.encode(joinTableForPath(info.path));

      relation.joinTableExtras.forEach(function (extra) {
        if (selectFilter(extra.joinTableCol)) {
          selects.push({
            col: joinTable + '.' + extra.joinTableCol,
            alias: _this3.joinPath(info.encPath, extra.aliasCol)
          });
        }
      });
    }

    var tooLongAliases = selects.filter(function (select) {
      return select.alias.length > idLengthLimit;
    });

    if (tooLongAliases.length) {
      throw new _ValidationError2.default({
        eager: 'identifier ' + tooLongAliases[0].alias + ' is over ' + idLengthLimit + ' characters long ' + 'and would be truncated by the database engine.'
      });
    }

    builder.select(selects.filter(function (select) {
      return !builder.hasSelection(select.col, true);
    }).map(function (select) {
      return select.col + ' as ' + select.alias;
    }));
  };

  JoinEagerOperation.prototype.encode = function encode(path) {
    var _this4 = this;

    if (!this.opt.minimize) {
      var encPath = this.encodings[path];

      if (!encPath) {
        var parts = path.split(this.sep);

        // Don't encode the root.
        if (!path) {
          encPath = path;
        } else {
          encPath = parts.map(function (part) {
            return _this4.opt.aliases[part] || part;
          }).join(this.sep);
        }

        this.encodings[path] = encPath;
        this.decodings[encPath] = path;
      }

      return encPath;
    } else {
      var _encPath = this.encodings[path];

      if (!_encPath) {
        // Don't encode the root.
        if (!path) {
          _encPath = path;
        } else {
          _encPath = this.nextEncodedPath();
        }

        this.encodings[path] = _encPath;
        this.decodings[_encPath] = path;
      }

      return _encPath;
    }
  };

  JoinEagerOperation.prototype.decode = function decode(path) {
    return this.decodings[path];
  };

  JoinEagerOperation.prototype.nextEncodedPath = function nextEncodedPath() {
    return '_t' + ++this.encIdx;
  };

  JoinEagerOperation.prototype.createIdGetter = function createIdGetter(modelClass, path) {
    var _this5 = this;

    var idCols = modelClass.getIdColumnArray().map(function (col) {
      return _this5.joinPath(path, col);
    });

    if (idCols.length === 1) {
      return createSingleIdGetter(idCols);
    } else if (idCols.length === 2) {
      return createTwoIdGetter(idCols);
    } else if (idCols.length === 3) {
      return createThreeIdGetter(idCols);
    } else {
      return createNIdGetter(idCols);
    }
  };

  JoinEagerOperation.prototype.joinPath = function joinPath(path, nextPart) {
    if (path) {
      return '' + path + this.sep + nextPart;
    } else {
      return nextPart;
    }
  };

  (0, _createClass3.default)(JoinEagerOperation, [{
    key: 'sep',
    get: function get() {
      return this.opt.separator;
    }
  }]);
  return JoinEagerOperation;
}(_EagerOperation3.default);

exports.default = JoinEagerOperation;


function findAllModels(expr, modelClass) {
  var models = [];

  findAllModelsImpl(expr, modelClass, models);

  return _lodash2.default.uniqBy(models, 'tableName');
}

function findAllModelsImpl(expr, modelClass, models) {
  models.push(modelClass);

  forEachExpr(expr, modelClass, function (childExpr, relation) {
    findAllModelsImpl(childExpr, relation.relatedModelClass, models);
  });
}

function findAllRelations(expr, modelClass) {
  var relations = [];

  findAllRelationsImpl(expr, modelClass, relations);

  return _lodash2.default.uniqWith(relations, function (lhs, rhs) {
    return lhs === rhs;
  });
}

function findAllRelationsImpl(expr, modelClass, relations) {
  forEachExpr(expr, modelClass, function (childExpr, relation) {
    relations.push(relation);

    findAllRelationsImpl(childExpr, relation.relatedModelClass, relations);
  });
}

function fetchColumnInfo(builder, models) {
  var knex = builder.knex();

  return _bluebird2.default.all(models.map(function (ModelClass) {
    var table = ModelClass.tableName;

    if (columnInfo[table]) {
      return columnInfo[table];
    } else {
      columnInfo[table] = knex(table).columnInfo().then(function (info) {
        var result = {
          columns: (0, _keys2.default)(info)
        };

        columnInfo[table] = result;
        return result;
      });

      return columnInfo[table];
    }
  }));
}

function forEachExpr(expr, modelClass, callback) {
  var relations = modelClass.getRelationArray();

  if (expr.isAllRecursive() || expr.maxRecursionDepth() > relationRecursionLimit) {
    throw new _ValidationError2.default({
      eager: 'recursion depth of eager expression ' + expr.toString() + ' too big for JoinEagerAlgorithm'
    });
  }

  for (var i = 0, l = relations.length; i < l; ++i) {
    var relation = relations[i];
    var childExpr = expr.childExpression(relation.name);

    if (childExpr) {
      callback(childExpr, relation, relation.name);
    }
  }
}

function createSingleIdGetter(idCols) {
  var idCol = idCols[0];

  return function (row) {
    var val = row[idCol];

    if (!val) {
      return null;
    } else {
      return val;
    }
  };
}

function createTwoIdGetter(idCols) {
  var idCol1 = idCols[0];
  var idCol2 = idCols[1];

  return function (row) {
    var val1 = row[idCol1];
    var val2 = row[idCol2];

    if (!val1 || !val2) {
      return null;
    } else {
      return val1 + ',' + val2;
    }
  };
}

function createThreeIdGetter(idCols) {
  var idCol1 = idCols[0];
  var idCol2 = idCols[1];
  var idCol3 = idCols[2];

  return function (row) {
    var val1 = row[idCol1];
    var val2 = row[idCol2];
    var val3 = row[idCol3];

    if (!val1 || !val2 || !val3) {
      return null;
    } else {
      return val1 + ',' + val2 + ',' + val3;
    }
  };
}

function createNIdGetter(idCols) {
  return function (row) {
    var id = '';

    for (var i = 0, l = idCols.length; i < l; ++i) {
      var val = row[idCols[i]];

      if (!val) {
        return null;
      }

      id += (i > 0 ? ',' : '') + val;
    }

    return id;
  };
}

function createFilterQuery(_ref4) {
  var builder = _ref4.builder,
      expr = _ref4.expr,
      relation = _ref4.relation;

  var filterQuery = relation.relatedModelClass.query().childQueryOf(builder);

  for (var i = 0, l = expr.args.length; i < l; ++i) {
    var filterName = expr.args[i];
    var filter = expr.filters[filterName];

    if (typeof filter !== 'function') {
      throw new _ValidationError2.default({ eager: 'could not find filter "' + filterName + '" for relation "' + relation.name + '"' });
    }

    filter(filterQuery);
  }

  return filterQuery;
}

function createRelatedJoinFromQuery(_ref5) {
  var filterQuery = _ref5.filterQuery,
      relation = _ref5.relation,
      allRelations = _ref5.allRelations;

  var relatedJoinFromQuery = filterQuery.clone();

  var allForeignKeys = findAllForeignKeysForModel({
    modelClass: relation.relatedModelClass,
    allRelations: allRelations
  });

  return relatedJoinFromQuery.select(allForeignKeys.filter(function (col) {
    return !relatedJoinFromQuery.hasSelection(col);
  }));
}

function findAllForeignKeysForModel(_ref6) {
  var modelClass = _ref6.modelClass,
      allRelations = _ref6.allRelations;

  var foreignKeys = modelClass.getIdColumnArray().slice();

  allRelations.forEach(function (rel) {
    if (rel.relatedModelClass.tableName === modelClass.tableName) {
      rel.relatedCol.forEach(function (col) {
        return foreignKeys.push(col);
      });
    }

    if (rel.ownerModelClass.tableName === modelClass.tableName) {
      rel.ownerCol.forEach(function (col) {
        return foreignKeys.push(col);
      });
    }
  });

  return _lodash2.default.uniq(foreignKeys);
}

function createModel(row, pInfo, keyInfoByPath) {
  var keyInfo = keyInfoByPath[pInfo.encPath];
  var json = {};

  for (var k = 0, lk = keyInfo.length; k < lk; ++k) {
    var kInfo = keyInfo[k];
    json[kInfo.col] = row[kInfo.key];
  }

  return pInfo.modelClass.fromDatabaseJson(json);
}

function joinTableForPath(path) {
  return path + '_join';
}

var PathInfo = function () {
  function PathInfo() {
    (0, _classCallCheck3.default)(this, PathInfo);

    this.path = null;
    this.encPath = null;
    this.encParentPath = null;
    this.modelClass = null;
    this.relation = null;
    this.omitCols = (0, _create2.default)(null);
    this.children = (0, _create2.default)(null);
    this.idGetter = null;
  }

  PathInfo.prototype.createBranch = function createBranch(parentModel) {
    var branch = (0, _create2.default)(null);
    parentModel[this.relation.name] = branch;
    return branch;
  };

  PathInfo.prototype.getBranch = function getBranch(parentModel) {
    return parentModel[this.relation.name];
  };

  PathInfo.prototype.getModelFromBranch = function getModelFromBranch(branch, id) {
    return branch[id];
  };

  PathInfo.prototype.setModelToBranch = function setModelToBranch(branch, id, model) {
    branch[id] = model;
  };

  PathInfo.prototype.finalizeBranch = function finalizeBranch(branch, parentModel) {
    var relModels = _lodash2.default.values(branch);
    parentModel[this.relation.name] = relModels;
    return relModels;
  };

  return PathInfo;
}();

var OneToOnePathInfo = function (_PathInfo) {
  (0, _inherits3.default)(OneToOnePathInfo, _PathInfo);

  function OneToOnePathInfo() {
    (0, _classCallCheck3.default)(this, OneToOnePathInfo);
    return (0, _possibleConstructorReturn3.default)(this, _PathInfo.apply(this, arguments));
  }

  OneToOnePathInfo.prototype.createBranch = function createBranch(parentModel) {
    return parentModel;
  };

  OneToOnePathInfo.prototype.getBranch = function getBranch(parentModel) {
    return parentModel;
  };

  OneToOnePathInfo.prototype.getModelFromBranch = function getModelFromBranch(branch, id) {
    return branch[this.relation.name];
  };

  OneToOnePathInfo.prototype.setModelToBranch = function setModelToBranch(branch, id, model) {
    branch[this.relation.name] = model;
  };

  OneToOnePathInfo.prototype.finalizeBranch = function finalizeBranch(branch, parentModel) {
    parentModel[this.relation.name] = branch || null;
    return branch || null;
  };

  return OneToOnePathInfo;
}(PathInfo);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpvaW5FYWdlck9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJjb2x1bW5JbmZvIiwiaWRMZW5ndGhMaW1pdCIsInJlbGF0aW9uUmVjdXJzaW9uTGltaXQiLCJKb2luRWFnZXJPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwiYWxsUmVsYXRpb25zIiwicm9vdE1vZGVsQ2xhc3MiLCJwYXRoSW5mbyIsImVuY29kaW5ncyIsImRlY29kaW5ncyIsImVuY0lkeCIsImRlZmF1bHRzIiwibWluaW1pemUiLCJzZXBhcmF0b3IiLCJhbGlhc2VzIiwiY2xvbmUiLCJjb3B5IiwiYWxsTW9kZWxDbGFzc2VzIiwiY2FsbCIsImJ1aWxkZXIiLCJhcmdzIiwicmV0IiwiTW9kZWxDbGFzcyIsIm1vZGVsQ2xhc3MiLCJmaW5kQWxsTW9kZWxzIiwiZXhwcmVzc2lvbiIsImZpbmRBbGxSZWxhdGlvbnMiLCJvbkJlZm9yZUludGVybmFsIiwiZmV0Y2hDb2x1bW5JbmZvIiwib25CZWZvcmVCdWlsZCIsImJ1aWxkZXJDbG9uZSIsInRhYmxlIiwidGFibGVOYW1lIiwiZmluZE9wdGlvbnMiLCJjYWxsQWZ0ZXJHZXREZWVwbHkiLCJidWlsZCIsImV4cHIiLCJwYXJlbnRJbmZvIiwicmVsYXRpb24iLCJwYXRoIiwic2VsZWN0RmlsdGVyIiwiY29sIiwiaGFzU2VsZWN0aW9uIiwib25SYXdSZXN1bHQiLCJyb3dzIiwiaXNFbXB0eSIsImtleUluZm9CeVBhdGgiLCJjcmVhdGVLZXlJbmZvIiwidmFsdWVzIiwidHJlZSIsInN0YWNrIiwiaSIsImxyIiwibGVuZ3RoIiwicm93IiwiY3VyQnJhbmNoIiwiaiIsImxwIiwicEluZm8iLCJpZCIsImlkR2V0dGVyIiwicGFyZW50TW9kZWwiLCJlbmNQYXJlbnRQYXRoIiwiZ2V0QnJhbmNoIiwiY3JlYXRlQnJhbmNoIiwibW9kZWwiLCJnZXRNb2RlbEZyb21CcmFuY2giLCJjcmVhdGVNb2RlbCIsInNldE1vZGVsVG9CcmFuY2giLCJlbmNQYXRoIiwiZmluYWxpemUiLCJrZXlzIiwia2V5SW5mbyIsImwiLCJrZXkiLCJzZXBJZHgiLCJsYXN0SW5kZXhPZiIsInNlcCIsIm9taXRDb2xzIiwicHVzaCIsInN1YnN0ciIsImRlY29kZSIsImdyb3VwQnkiLCJrSW5mbyIsIm1vZGVscyIsInJlbE5hbWVzIiwiY2hpbGRyZW4iLCJBcnJheSIsImlzQXJyYXkiLCJtIiwibG0iLCJmaW5hbGl6ZU9uZSIsInIiLCJyZWxOYW1lIiwiYnJhbmNoIiwiY2hpbGRQYXRoSW5mbyIsImZpbmFsaXplZCIsImZpbmFsaXplQnJhbmNoIiwiaW5mbyIsImNyZWF0ZVBhdGhJbmZvIiwiYnVpbGRTZWxlY3RzIiwiZm9yRWFjaEV4cHIiLCJjaGlsZEV4cHIiLCJuZXh0UGF0aCIsImpvaW5QYXRoIiwiZW5jTmV4dFBhdGgiLCJlbmNvZGUiLCJlbmNKb2luVGFibGVQYXRoIiwiam9pblRhYmxlIiwiam9pblRhYmxlRm9yUGF0aCIsImZpbHRlclF1ZXJ5IiwiY3JlYXRlRmlsdGVyUXVlcnkiLCJyZWxhdGVkSm9pblNlbGVjdFF1ZXJ5IiwiY3JlYXRlUmVsYXRlZEpvaW5Gcm9tUXVlcnkiLCJqb2luIiwiam9pbk9wZXJhdGlvbiIsIm93bmVyVGFibGUiLCJyZWxhdGVkVGFibGVBbGlhcyIsImpvaW5UYWJsZUFsaWFzIiwibW9kaWZ5IiwicmVsYXRlZE1vZGVsQ2xhc3MiLCJpc09uZVRvT25lIiwiT25lVG9PbmVQYXRoSW5mbyIsIlBhdGhJbmZvIiwicGFyZW50UGF0aCIsImNyZWF0ZUlkR2V0dGVyIiwic2VsZWN0cyIsImlkQ29scyIsImdldElkQ29sdW1uQXJyYXkiLCJyb290VGFibGUiLCJjb2x1bW5zIiwiZm9yRWFjaCIsImZpbHRlclBhc3NlZCIsImlzSWRDb2x1bW4iLCJpbmRleE9mIiwiYWxpYXMiLCJqb2luVGFibGVFeHRyYXMiLCJleHRyYSIsImpvaW5UYWJsZUNvbCIsImFsaWFzQ29sIiwidG9vTG9uZ0FsaWFzZXMiLCJmaWx0ZXIiLCJzZWxlY3QiLCJlYWdlciIsIm1hcCIsInBhcnRzIiwic3BsaXQiLCJwYXJ0IiwibmV4dEVuY29kZWRQYXRoIiwiY3JlYXRlU2luZ2xlSWRHZXR0ZXIiLCJjcmVhdGVUd29JZEdldHRlciIsImNyZWF0ZVRocmVlSWRHZXR0ZXIiLCJjcmVhdGVOSWRHZXR0ZXIiLCJuZXh0UGFydCIsImZpbmRBbGxNb2RlbHNJbXBsIiwidW5pcUJ5IiwicmVsYXRpb25zIiwiZmluZEFsbFJlbGF0aW9uc0ltcGwiLCJ1bmlxV2l0aCIsImxocyIsInJocyIsImtuZXgiLCJhbGwiLCJ0aGVuIiwicmVzdWx0IiwiY2FsbGJhY2siLCJnZXRSZWxhdGlvbkFycmF5IiwiaXNBbGxSZWN1cnNpdmUiLCJtYXhSZWN1cnNpb25EZXB0aCIsInRvU3RyaW5nIiwiY2hpbGRFeHByZXNzaW9uIiwiaWRDb2wiLCJ2YWwiLCJpZENvbDEiLCJpZENvbDIiLCJ2YWwxIiwidmFsMiIsImlkQ29sMyIsInZhbDMiLCJxdWVyeSIsImNoaWxkUXVlcnlPZiIsImZpbHRlck5hbWUiLCJmaWx0ZXJzIiwicmVsYXRlZEpvaW5Gcm9tUXVlcnkiLCJhbGxGb3JlaWduS2V5cyIsImZpbmRBbGxGb3JlaWduS2V5c0Zvck1vZGVsIiwiZm9yZWlnbktleXMiLCJzbGljZSIsInJlbCIsInJlbGF0ZWRDb2wiLCJvd25lck1vZGVsQ2xhc3MiLCJvd25lckNvbCIsInVuaXEiLCJqc29uIiwiayIsImxrIiwiZnJvbURhdGFiYXNlSnNvbiIsInJlbE1vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxhQUFhLHNCQUFjLElBQWQsQ0FBbkI7QUFDQSxJQUFNQyxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNQyx5QkFBeUIsRUFBL0I7O0lBRXFCQyxrQjs7O0FBRW5CLDhCQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQiwyQkFBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztB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RCxHOzs7RUF0QjRCNkIsUSIsImZpbGUiOiJKb2luRWFnZXJPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEVhZ2VyT3BlcmF0aW9uIGZyb20gJy4vRWFnZXJPcGVyYXRpb24nO1xuaW1wb3J0IFZhbGlkYXRpb25FcnJvciBmcm9tICcuLi8uLi9tb2RlbC9WYWxpZGF0aW9uRXJyb3InO1xuXG5jb25zdCBjb2x1bW5JbmZvID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbmNvbnN0IGlkTGVuZ3RoTGltaXQgPSA2MztcbmNvbnN0IHJlbGF0aW9uUmVjdXJzaW9uTGltaXQgPSA2NDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9pbkVhZ2VyT3BlcmF0aW9uIGV4dGVuZHMgRWFnZXJPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG5cbiAgICB0aGlzLmFsbFJlbGF0aW9ucyA9IG51bGw7XG4gICAgdGhpcy5yb290TW9kZWxDbGFzcyA9IG51bGw7XG4gICAgdGhpcy5wYXRoSW5mbyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5lbmNvZGluZ3MgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuZGVjb2RpbmdzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLmVuY0lkeCA9IDA7XG4gICAgdGhpcy5vcHQgPSBfLmRlZmF1bHRzKG9wdCwge1xuICAgICAgbWluaW1pemU6IGZhbHNlLFxuICAgICAgc2VwYXJhdG9yOiAnOicsXG4gICAgICBhbGlhc2VzOiB7fVxuICAgIH0pO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgY29uc3QgY29weSA9IHN1cGVyLmNsb25lKCk7XG5cbiAgICBjb3B5LmFsbFJlbGF0aW9ucyA9IHRoaXMuYWxsUmVsYXRpb25zO1xuICAgIGNvcHkuYWxsTW9kZWxDbGFzc2VzID0gdGhpcy5hbGxNb2RlbENsYXNzZXM7XG4gICAgY29weS5yb290TW9kZWxDbGFzcyA9IHRoaXMucm9vdE1vZGVsQ2xhc3M7XG4gICAgY29weS5wYXRoSW5mbyA9IHRoaXMucGF0aEluZm87XG4gICAgY29weS5lbmNvZGluZ3MgPSB0aGlzLmVuY29kaW5ncztcbiAgICBjb3B5LmRlY29kaW5ncyA9IHRoaXMuZGVjb2RpbmdzO1xuICAgIGNvcHkuZW5jSWR4ID0gdGhpcy5lbmNJZHg7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNhbGwoYnVpbGRlciwgYXJncykge1xuICAgIGNvbnN0IHJldCA9IHN1cGVyLmNhbGwoYnVpbGRlciwgYXJncyk7XG4gICAgY29uc3QgTW9kZWxDbGFzcyA9IGJ1aWxkZXIubW9kZWxDbGFzcygpO1xuXG4gICAgaWYgKHJldCkge1xuICAgICAgdGhpcy5yb290TW9kZWxDbGFzcyA9IE1vZGVsQ2xhc3M7XG4gICAgICB0aGlzLmFsbE1vZGVsQ2xhc3NlcyA9IGZpbmRBbGxNb2RlbHModGhpcy5leHByZXNzaW9uLCBNb2RlbENsYXNzKTtcbiAgICAgIHRoaXMuYWxsUmVsYXRpb25zID0gZmluZEFsbFJlbGF0aW9ucyh0aGlzLmV4cHJlc3Npb24sIE1vZGVsQ2xhc3MpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBvbkJlZm9yZUludGVybmFsKGJ1aWxkZXIpIHtcbiAgICByZXR1cm4gZmV0Y2hDb2x1bW5JbmZvKGJ1aWxkZXIsIHRoaXMuYWxsTW9kZWxDbGFzc2VzKTtcbiAgfVxuXG4gIG9uQmVmb3JlQnVpbGQoYnVpbGRlcikge1xuICAgIGNvbnN0IGJ1aWxkZXJDbG9uZSA9IGJ1aWxkZXIuY2xvbmUoKTtcblxuICAgIGJ1aWxkZXIudGFibGUoYCR7dGhpcy5yb290TW9kZWxDbGFzcy50YWJsZU5hbWV9IGFzICR7dGhpcy5yb290TW9kZWxDbGFzcy50YWJsZU5hbWV9YCk7XG4gICAgYnVpbGRlci5maW5kT3B0aW9ucyh7Y2FsbEFmdGVyR2V0RGVlcGx5OiB0cnVlfSk7XG5cbiAgICB0aGlzLmJ1aWxkKHtcbiAgICAgIGV4cHI6IHRoaXMuZXhwcmVzc2lvbixcbiAgICAgIGJ1aWxkZXI6IGJ1aWxkZXIsXG4gICAgICBtb2RlbENsYXNzOiBidWlsZGVyLm1vZGVsQ2xhc3MoKSxcbiAgICAgIHBhcmVudEluZm86IG51bGwsXG4gICAgICByZWxhdGlvbjogbnVsbCxcbiAgICAgIHBhdGg6ICcnLFxuICAgICAgc2VsZWN0RmlsdGVyOiAoY29sKSA9PiB7XG4gICAgICAgIHJldHVybiBidWlsZGVyQ2xvbmUuaGFzU2VsZWN0aW9uKGNvbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvblJhd1Jlc3VsdChidWlsZGVyLCByb3dzKSB7XG4gICAgaWYgKF8uaXNFbXB0eShyb3dzKSkge1xuICAgICAgcmV0dXJuIHJvd3M7XG4gICAgfVxuXG4gICAgY29uc3Qga2V5SW5mb0J5UGF0aCA9IHRoaXMuY3JlYXRlS2V5SW5mbyhyb3dzKTtcbiAgICBjb25zdCBwYXRoSW5mbyA9IF8udmFsdWVzKHRoaXMucGF0aEluZm8pO1xuXG4gICAgY29uc3QgdHJlZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgY29uc3Qgc3RhY2sgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxyID0gcm93cy5sZW5ndGg7IGkgPCBscjsgKytpKSB7XG4gICAgICBjb25zdCByb3cgPSByb3dzW2ldO1xuICAgICAgbGV0IGN1ckJyYW5jaCA9IHRyZWU7XG5cbiAgICAgIGZvciAobGV0IGogPSAwLCBscCA9IHBhdGhJbmZvLmxlbmd0aDsgaiA8IGxwOyArK2opIHtcbiAgICAgICAgY29uc3QgcEluZm8gPSBwYXRoSW5mb1tqXTtcbiAgICAgICAgY29uc3QgaWQgPSBwSW5mby5pZEdldHRlcihyb3cpO1xuXG4gICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwSW5mby5yZWxhdGlvbikge1xuICAgICAgICAgIGNvbnN0IHBhcmVudE1vZGVsID0gc3RhY2tbcEluZm8uZW5jUGFyZW50UGF0aF07XG5cbiAgICAgICAgICBjdXJCcmFuY2ggPSBwSW5mby5nZXRCcmFuY2gocGFyZW50TW9kZWwpO1xuXG4gICAgICAgICAgaWYgKCFjdXJCcmFuY2gpIHtcbiAgICAgICAgICAgIGN1ckJyYW5jaCA9IHBJbmZvLmNyZWF0ZUJyYW5jaChwYXJlbnRNb2RlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1vZGVsID0gcEluZm8uZ2V0TW9kZWxGcm9tQnJhbmNoKGN1ckJyYW5jaCwgaWQpO1xuXG4gICAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgICBtb2RlbCA9IGNyZWF0ZU1vZGVsKHJvdywgcEluZm8sIGtleUluZm9CeVBhdGgpO1xuICAgICAgICAgIHBJbmZvLnNldE1vZGVsVG9CcmFuY2goY3VyQnJhbmNoLCBpZCwgbW9kZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhY2tbcEluZm8uZW5jUGF0aF0gPSBtb2RlbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5maW5hbGl6ZShwYXRoSW5mb1swXSwgXy52YWx1ZXModHJlZSkpO1xuICB9XG5cbiAgY3JlYXRlS2V5SW5mbyhyb3dzKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJvd3NbMF0pO1xuICAgIGNvbnN0IGtleUluZm8gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICBjb25zdCBzZXBJZHggPSBrZXkubGFzdEluZGV4T2YodGhpcy5zZXApO1xuXG4gICAgICBpZiAoc2VwSWR4ID09PSAtMSkge1xuICAgICAgICBjb25zdCBwSW5mbyA9IHRoaXMucGF0aEluZm9bJyddO1xuICAgICAgICBjb25zdCBjb2wgPSBrZXk7XG5cbiAgICAgICAgaWYgKCFwSW5mby5vbWl0Q29sc1tjb2xdKSB7XG4gICAgICAgICAga2V5SW5mby5wdXNoKHtcbiAgICAgICAgICAgIHBJbmZvOiBwSW5mbyxcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgY29sOiBjb2xcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZW5jUGF0aCA9IGtleS5zdWJzdHIoMCwgc2VwSWR4KTtcbiAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMuZGVjb2RlKGVuY1BhdGgpO1xuICAgICAgICBjb25zdCBjb2wgPSBrZXkuc3Vic3RyKHNlcElkeCArIDEpO1xuICAgICAgICBjb25zdCBwSW5mbyA9IHRoaXMucGF0aEluZm9bcGF0aF07XG5cbiAgICAgICAgaWYgKCFwSW5mby5vbWl0Q29sc1tjb2xdKSB7XG4gICAgICAgICAga2V5SW5mby5wdXNoKHtcbiAgICAgICAgICAgIHBJbmZvOiBwSW5mbyxcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgY29sOiBjb2xcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfLmdyb3VwQnkoa2V5SW5mbywga0luZm8gPT4ga0luZm8ucEluZm8uZW5jUGF0aCk7XG4gIH1cblxuICBmaW5hbGl6ZShwSW5mbywgbW9kZWxzKSB7XG4gICAgY29uc3QgcmVsTmFtZXMgPSBPYmplY3Qua2V5cyhwSW5mby5jaGlsZHJlbik7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShtb2RlbHMpKSB7XG4gICAgICBmb3IgKGxldCBtID0gMCwgbG0gPSBtb2RlbHMubGVuZ3RoOyBtIDwgbG07ICsrbSkge1xuICAgICAgICB0aGlzLmZpbmFsaXplT25lKHBJbmZvLCByZWxOYW1lcywgbW9kZWxzW21dKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVscykge1xuICAgICAgdGhpcy5maW5hbGl6ZU9uZShwSW5mbywgcmVsTmFtZXMsIG1vZGVscyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZGVscztcbiAgfVxuXG4gIGZpbmFsaXplT25lKHBJbmZvLCByZWxOYW1lcywgbW9kZWwpIHtcbiAgICBmb3IgKGxldCByID0gMCwgbHIgPSByZWxOYW1lcy5sZW5ndGg7IHIgPCBscjsgKytyKSB7XG4gICAgICBjb25zdCByZWxOYW1lID0gcmVsTmFtZXNbcl07XG4gICAgICBjb25zdCBicmFuY2ggPSBtb2RlbFtyZWxOYW1lXTtcbiAgICAgIGNvbnN0IGNoaWxkUGF0aEluZm8gPSBwSW5mby5jaGlsZHJlbltyZWxOYW1lXTtcblxuICAgICAgY29uc3QgZmluYWxpemVkID0gY2hpbGRQYXRoSW5mby5maW5hbGl6ZUJyYW5jaChicmFuY2gsIG1vZGVsKTtcbiAgICAgIHRoaXMuZmluYWxpemUoY2hpbGRQYXRoSW5mbywgZmluYWxpemVkKTtcbiAgICB9XG4gIH1cblxuICBidWlsZCh7ZXhwciwgYnVpbGRlciwgc2VsZWN0RmlsdGVyLCBtb2RlbENsYXNzLCByZWxhdGlvbiwgcGF0aCwgcGFyZW50SW5mb30pIHtcbiAgICBjb25zdCBpbmZvID0gdGhpcy5jcmVhdGVQYXRoSW5mbyh7XG4gICAgICBtb2RlbENsYXNzLFxuICAgICAgcGF0aCxcbiAgICAgIHJlbGF0aW9uLFxuICAgICAgcGFyZW50SW5mb1xuICAgIH0pO1xuXG4gICAgdGhpcy5wYXRoSW5mb1twYXRoXSA9IGluZm87XG5cbiAgICB0aGlzLmJ1aWxkU2VsZWN0cyh7XG4gICAgICBidWlsZGVyLFxuICAgICAgc2VsZWN0RmlsdGVyLFxuICAgICAgbW9kZWxDbGFzcyxcbiAgICAgIHJlbGF0aW9uLFxuICAgICAgaW5mb1xuICAgIH0pO1xuXG4gICAgZm9yRWFjaEV4cHIoZXhwciwgbW9kZWxDbGFzcywgKGNoaWxkRXhwciwgcmVsYXRpb24pID0+IHtcbiAgICAgIGNvbnN0IG5leHRQYXRoID0gdGhpcy5qb2luUGF0aChwYXRoLCByZWxhdGlvbi5uYW1lKTtcbiAgICAgIGNvbnN0IGVuY05leHRQYXRoID0gdGhpcy5lbmNvZGUobmV4dFBhdGgpO1xuICAgICAgY29uc3QgZW5jSm9pblRhYmxlUGF0aCA9IHJlbGF0aW9uLmpvaW5UYWJsZVxuICAgICAgICA/IHRoaXMuZW5jb2RlKGpvaW5UYWJsZUZvclBhdGgobmV4dFBhdGgpKVxuICAgICAgICA6IG51bGw7XG5cbiAgICAgIGNvbnN0IGZpbHRlclF1ZXJ5ID0gY3JlYXRlRmlsdGVyUXVlcnkoe1xuICAgICAgICBidWlsZGVyLFxuICAgICAgICByZWxhdGlvbixcbiAgICAgICAgZXhwcjogY2hpbGRFeHByXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcmVsYXRlZEpvaW5TZWxlY3RRdWVyeSA9IGNyZWF0ZVJlbGF0ZWRKb2luRnJvbVF1ZXJ5KHtcbiAgICAgICAgZmlsdGVyUXVlcnksXG4gICAgICAgIHJlbGF0aW9uLFxuICAgICAgICBhbGxSZWxhdGlvbnM6IHRoaXMuYWxsUmVsYXRpb25zXG4gICAgICB9KTtcblxuICAgICAgcmVsYXRpb24uam9pbihidWlsZGVyLCB7XG4gICAgICAgIGpvaW5PcGVyYXRpb246ICdsZWZ0Sm9pbicsXG4gICAgICAgIG93bmVyVGFibGU6IGluZm8uZW5jUGF0aCxcbiAgICAgICAgcmVsYXRlZFRhYmxlQWxpYXM6IGVuY05leHRQYXRoLFxuICAgICAgICBqb2luVGFibGVBbGlhczogZW5jSm9pblRhYmxlUGF0aCxcbiAgICAgICAgcmVsYXRlZEpvaW5TZWxlY3RRdWVyeTogcmVsYXRlZEpvaW5TZWxlY3RRdWVyeVxuICAgICAgfSk7XG5cbiAgICAgIC8vIEFwcGx5IHJlbGF0aW9uLm1vZGlmeSBzaW5jZSBpdCBtYXkgYWxzbyBjb250YWlucyBzZWxlY3Rpb25zLiBEb24ndCBtb3ZlIHRoaXNcbiAgICAgIC8vIHRvIHRoZSBjcmVhdGVGaWx0ZXJRdWVyeSBmdW5jdGlvbiBiZWNhdXNlIHJlbGF0ZWRKb2luU2VsZWN0UXVlcnkgaXMgY2xvbmVkXG4gICAgICAvLyBGcm9tIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhhdCBmdW5jdGlvbiBhbmQgd2UgZG9uJ3Qgd2FudCByZWxhdGlvbi5tb2RpZnlcbiAgICAgIC8vIHRvIGJlIGNhbGxlZCB0d2ljZSBmb3IgaXQuXG4gICAgICBmaWx0ZXJRdWVyeS5tb2RpZnkocmVsYXRpb24ubW9kaWZ5KTtcblxuICAgICAgdGhpcy5idWlsZCh7XG4gICAgICAgIGV4cHI6IGNoaWxkRXhwcixcbiAgICAgICAgYnVpbGRlcjogYnVpbGRlcixcbiAgICAgICAgbW9kZWxDbGFzczogcmVsYXRpb24ucmVsYXRlZE1vZGVsQ2xhc3MsXG4gICAgICAgIHJlbGF0aW9uOiByZWxhdGlvbixcbiAgICAgICAgcGFyZW50SW5mbzogaW5mbyxcbiAgICAgICAgcGF0aDogbmV4dFBhdGgsXG4gICAgICAgIHNlbGVjdEZpbHRlcjogKGNvbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBmaWx0ZXJRdWVyeS5oYXNTZWxlY3Rpb24oY29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVQYXRoSW5mbyh7bW9kZWxDbGFzcywgcGF0aCwgcmVsYXRpb24sIHBhcmVudEluZm99KSB7XG4gICAgY29uc3QgZW5jUGF0aCA9IHRoaXMuZW5jb2RlKHBhdGgpO1xuICAgIGxldCBpbmZvO1xuXG4gICAgaWYgKHJlbGF0aW9uICYmIHJlbGF0aW9uLmlzT25lVG9PbmUoKSkge1xuICAgICAgaW5mbyA9IG5ldyBPbmVUb09uZVBhdGhJbmZvKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZm8gPSBuZXcgUGF0aEluZm8oKTtcbiAgICB9XG5cbiAgICBpbmZvLnBhdGggPSBwYXRoO1xuICAgIGluZm8uZW5jUGF0aCA9IGVuY1BhdGg7XG4gICAgaW5mby5wYXJlbnRQYXRoID0gcGFyZW50SW5mbyAmJiBwYXJlbnRJbmZvLnBhdGg7XG4gICAgaW5mby5lbmNQYXJlbnRQYXRoID0gcGFyZW50SW5mbyAmJiBwYXJlbnRJbmZvLmVuY1BhdGg7XG4gICAgaW5mby5tb2RlbENsYXNzID0gbW9kZWxDbGFzcztcbiAgICBpbmZvLnJlbGF0aW9uID0gcmVsYXRpb247XG4gICAgaW5mby5pZEdldHRlciA9IHRoaXMuY3JlYXRlSWRHZXR0ZXIobW9kZWxDbGFzcywgZW5jUGF0aCk7XG5cbiAgICBpZiAocGFyZW50SW5mbykge1xuICAgICAgcGFyZW50SW5mby5jaGlsZHJlbltyZWxhdGlvbi5uYW1lXSA9IGluZm87XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZm87XG4gIH1cblxuICBidWlsZFNlbGVjdHMoe2J1aWxkZXIsIHNlbGVjdEZpbHRlciwgbW9kZWxDbGFzcywgcmVsYXRpb24sIGluZm99KSB7XG4gICAgY29uc3Qgc2VsZWN0cyA9IFtdO1xuICAgIGNvbnN0IGlkQ29scyA9IG1vZGVsQ2xhc3MuZ2V0SWRDb2x1bW5BcnJheSgpO1xuICAgIGNvbnN0IHJvb3RUYWJsZSA9IHRoaXMucm9vdE1vZGVsQ2xhc3MudGFibGVOYW1lO1xuXG4gICAgY29sdW1uSW5mb1ttb2RlbENsYXNzLnRhYmxlTmFtZV0uY29sdW1ucy5mb3JFYWNoKGNvbCA9PiB7XG4gICAgICBjb25zdCBmaWx0ZXJQYXNzZWQgPSBzZWxlY3RGaWx0ZXIoY29sKTtcbiAgICAgIGNvbnN0IGlzSWRDb2x1bW4gPSBpZENvbHMuaW5kZXhPZihjb2wpICE9PSAtMTtcblxuICAgICAgaWYgKGZpbHRlclBhc3NlZCB8fCBpc0lkQ29sdW1uKSB7XG4gICAgICAgIHNlbGVjdHMucHVzaCh7XG4gICAgICAgICAgY29sOiBgJHtpbmZvLmVuY1BhdGggfHwgcm9vdFRhYmxlfS4ke2NvbH1gLFxuICAgICAgICAgIGFsaWFzOiB0aGlzLmpvaW5QYXRoKGluZm8uZW5jUGF0aCwgY29sKVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWZpbHRlclBhc3NlZCkge1xuICAgICAgICAgIGluZm8ub21pdENvbHNbY29sXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChyZWxhdGlvbiAmJiByZWxhdGlvbi5qb2luVGFibGVFeHRyYXMpIHtcbiAgICAgIGNvbnN0IGpvaW5UYWJsZSA9IHRoaXMuZW5jb2RlKGpvaW5UYWJsZUZvclBhdGgoaW5mby5wYXRoKSk7XG5cbiAgICAgIHJlbGF0aW9uLmpvaW5UYWJsZUV4dHJhcy5mb3JFYWNoKGV4dHJhID0+IHtcbiAgICAgICAgaWYgKHNlbGVjdEZpbHRlcihleHRyYS5qb2luVGFibGVDb2wpKSB7XG4gICAgICAgICAgc2VsZWN0cy5wdXNoKHtcbiAgICAgICAgICAgIGNvbDogYCR7am9pblRhYmxlfS4ke2V4dHJhLmpvaW5UYWJsZUNvbH1gLFxuICAgICAgICAgICAgYWxpYXM6IHRoaXMuam9pblBhdGgoaW5mby5lbmNQYXRoLCBleHRyYS5hbGlhc0NvbClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9vTG9uZ0FsaWFzZXMgPSBzZWxlY3RzLmZpbHRlcihzZWxlY3QgPT4gc2VsZWN0LmFsaWFzLmxlbmd0aCA+IGlkTGVuZ3RoTGltaXQpO1xuXG4gICAgaWYgKHRvb0xvbmdBbGlhc2VzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcih7XG4gICAgICAgIGVhZ2VyOiBgaWRlbnRpZmllciAke3Rvb0xvbmdBbGlhc2VzWzBdLmFsaWFzfSBpcyBvdmVyICR7aWRMZW5ndGhMaW1pdH0gY2hhcmFjdGVycyBsb25nIGBcbiAgICAgICAgICAgICArIGBhbmQgd291bGQgYmUgdHJ1bmNhdGVkIGJ5IHRoZSBkYXRhYmFzZSBlbmdpbmUuYFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYnVpbGRlci5zZWxlY3Qoc2VsZWN0c1xuICAgICAgLmZpbHRlcihzZWxlY3QgPT4gIWJ1aWxkZXIuaGFzU2VsZWN0aW9uKHNlbGVjdC5jb2wsIHRydWUpKVxuICAgICAgLm1hcChzZWxlY3QgPT4gYCR7c2VsZWN0LmNvbH0gYXMgJHtzZWxlY3QuYWxpYXN9YClcbiAgICApO1xuICB9XG5cbiAgZW5jb2RlKHBhdGgpIHtcbiAgICBpZiAoIXRoaXMub3B0Lm1pbmltaXplKSB7XG4gICAgICBsZXQgZW5jUGF0aCA9IHRoaXMuZW5jb2RpbmdzW3BhdGhdO1xuXG4gICAgICBpZiAoIWVuY1BhdGgpIHtcbiAgICAgICAgY29uc3QgcGFydHMgPSBwYXRoLnNwbGl0KHRoaXMuc2VwKTtcblxuICAgICAgICAvLyBEb24ndCBlbmNvZGUgdGhlIHJvb3QuXG4gICAgICAgIGlmICghcGF0aCkge1xuICAgICAgICAgIGVuY1BhdGggPSBwYXRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVuY1BhdGggPSBwYXJ0cy5tYXAocGFydCA9PiB0aGlzLm9wdC5hbGlhc2VzW3BhcnRdIHx8IHBhcnQpLmpvaW4odGhpcy5zZXApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbmNvZGluZ3NbcGF0aF0gPSBlbmNQYXRoO1xuICAgICAgICB0aGlzLmRlY29kaW5nc1tlbmNQYXRoXSA9IHBhdGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlbmNQYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZW5jUGF0aCA9IHRoaXMuZW5jb2RpbmdzW3BhdGhdO1xuXG4gICAgICBpZiAoIWVuY1BhdGgpIHtcbiAgICAgICAgLy8gRG9uJ3QgZW5jb2RlIHRoZSByb290LlxuICAgICAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgICBlbmNQYXRoID0gcGF0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbmNQYXRoID0gdGhpcy5uZXh0RW5jb2RlZFBhdGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5jb2RpbmdzW3BhdGhdID0gZW5jUGF0aDtcbiAgICAgICAgdGhpcy5kZWNvZGluZ3NbZW5jUGF0aF0gPSBwYXRoO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZW5jUGF0aDtcbiAgICB9XG4gIH1cblxuICBkZWNvZGUocGF0aCkge1xuICAgIHJldHVybiB0aGlzLmRlY29kaW5nc1twYXRoXTtcbiAgfVxuXG4gIG5leHRFbmNvZGVkUGF0aCgpIHtcbiAgICByZXR1cm4gYF90JHsrK3RoaXMuZW5jSWR4fWA7XG4gIH1cblxuICBjcmVhdGVJZEdldHRlcihtb2RlbENsYXNzLCBwYXRoKSB7XG4gICAgY29uc3QgaWRDb2xzID0gbW9kZWxDbGFzcy5nZXRJZENvbHVtbkFycmF5KCkubWFwKGNvbCA9PiB0aGlzLmpvaW5QYXRoKHBhdGgsIGNvbCkpO1xuXG4gICAgaWYgKGlkQ29scy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBjcmVhdGVTaW5nbGVJZEdldHRlcihpZENvbHMpO1xuICAgIH0gZWxzZSBpZiAoaWRDb2xzLmxlbmd0aCA9PT0gMikge1xuICAgICAgcmV0dXJuIGNyZWF0ZVR3b0lkR2V0dGVyKGlkQ29scyk7XG4gICAgfSBlbHNlIGlmIChpZENvbHMubGVuZ3RoID09PSAzKSB7XG4gICAgICByZXR1cm4gY3JlYXRlVGhyZWVJZEdldHRlcihpZENvbHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3JlYXRlTklkR2V0dGVyKGlkQ29scyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNlcCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHQuc2VwYXJhdG9yO1xuICB9XG5cbiAgam9pblBhdGgocGF0aCwgbmV4dFBhcnQpIHtcbiAgICBpZiAocGF0aCkge1xuICAgICAgcmV0dXJuIGAke3BhdGh9JHt0aGlzLnNlcH0ke25leHRQYXJ0fWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXh0UGFydDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEFsbE1vZGVscyhleHByLCBtb2RlbENsYXNzKSB7XG4gIGNvbnN0IG1vZGVscyA9IFtdO1xuXG4gIGZpbmRBbGxNb2RlbHNJbXBsKGV4cHIsIG1vZGVsQ2xhc3MsIG1vZGVscyk7XG5cbiAgcmV0dXJuIF8udW5pcUJ5KG1vZGVscywgJ3RhYmxlTmFtZScpO1xufVxuXG5mdW5jdGlvbiBmaW5kQWxsTW9kZWxzSW1wbChleHByLCBtb2RlbENsYXNzLCBtb2RlbHMpIHtcbiAgbW9kZWxzLnB1c2gobW9kZWxDbGFzcyk7XG5cbiAgZm9yRWFjaEV4cHIoZXhwciwgbW9kZWxDbGFzcywgKGNoaWxkRXhwciwgcmVsYXRpb24pID0+IHtcbiAgICBmaW5kQWxsTW9kZWxzSW1wbChjaGlsZEV4cHIsIHJlbGF0aW9uLnJlbGF0ZWRNb2RlbENsYXNzLCBtb2RlbHMpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZmluZEFsbFJlbGF0aW9ucyhleHByLCBtb2RlbENsYXNzKSB7XG4gIGNvbnN0IHJlbGF0aW9ucyA9IFtdO1xuXG4gIGZpbmRBbGxSZWxhdGlvbnNJbXBsKGV4cHIsIG1vZGVsQ2xhc3MsIHJlbGF0aW9ucyk7XG5cbiAgcmV0dXJuIF8udW5pcVdpdGgocmVsYXRpb25zLCAobGhzLCByaHMpID0+IGxocyA9PT0gcmhzKTtcbn1cblxuZnVuY3Rpb24gZmluZEFsbFJlbGF0aW9uc0ltcGwoZXhwciwgbW9kZWxDbGFzcywgcmVsYXRpb25zKSB7XG4gIGZvckVhY2hFeHByKGV4cHIsIG1vZGVsQ2xhc3MsIChjaGlsZEV4cHIsIHJlbGF0aW9uKSA9PiB7XG4gICAgcmVsYXRpb25zLnB1c2gocmVsYXRpb24pO1xuXG4gICAgZmluZEFsbFJlbGF0aW9uc0ltcGwoY2hpbGRFeHByLCByZWxhdGlvbi5yZWxhdGVkTW9kZWxDbGFzcywgcmVsYXRpb25zKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGZldGNoQ29sdW1uSW5mbyhidWlsZGVyLCBtb2RlbHMpIHtcbiAgY29uc3Qga25leCA9IGJ1aWxkZXIua25leCgpO1xuXG4gIHJldHVybiBQcm9taXNlLmFsbChtb2RlbHMubWFwKE1vZGVsQ2xhc3MgPT4ge1xuICAgIGNvbnN0IHRhYmxlID0gTW9kZWxDbGFzcy50YWJsZU5hbWU7XG5cbiAgICBpZiAoY29sdW1uSW5mb1t0YWJsZV0pIHtcbiAgICAgIHJldHVybiBjb2x1bW5JbmZvW3RhYmxlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1uSW5mb1t0YWJsZV0gPSBrbmV4KHRhYmxlKS5jb2x1bW5JbmZvKCkudGhlbihpbmZvID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgIGNvbHVtbnM6IE9iamVjdC5rZXlzKGluZm8pXG4gICAgICAgIH07XG5cbiAgICAgICAgY29sdW1uSW5mb1t0YWJsZV0gPSByZXN1bHQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNvbHVtbkluZm9bdGFibGVdO1xuICAgIH1cbiAgfSkpO1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoRXhwcihleHByLCBtb2RlbENsYXNzLCBjYWxsYmFjaykge1xuICBjb25zdCByZWxhdGlvbnMgPSBtb2RlbENsYXNzLmdldFJlbGF0aW9uQXJyYXkoKTtcblxuICBpZiAoZXhwci5pc0FsbFJlY3Vyc2l2ZSgpIHx8IGV4cHIubWF4UmVjdXJzaW9uRGVwdGgoKSA+IHJlbGF0aW9uUmVjdXJzaW9uTGltaXQpIHtcbiAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKHtcbiAgICAgIGVhZ2VyOiBgcmVjdXJzaW9uIGRlcHRoIG9mIGVhZ2VyIGV4cHJlc3Npb24gJHtleHByLnRvU3RyaW5nKCl9IHRvbyBiaWcgZm9yIEpvaW5FYWdlckFsZ29yaXRobWBcbiAgICB9KTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gcmVsYXRpb25zLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IHJlbGF0aW9uID0gcmVsYXRpb25zW2ldO1xuICAgIGNvbnN0IGNoaWxkRXhwciA9IGV4cHIuY2hpbGRFeHByZXNzaW9uKHJlbGF0aW9uLm5hbWUpO1xuXG4gICAgaWYgKGNoaWxkRXhwcikge1xuICAgICAgY2FsbGJhY2soY2hpbGRFeHByLCByZWxhdGlvbiwgcmVsYXRpb24ubmFtZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNpbmdsZUlkR2V0dGVyKGlkQ29scykge1xuICBjb25zdCBpZENvbCA9IGlkQ29sc1swXTtcblxuICByZXR1cm4gKHJvdykgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHJvd1tpZENvbF07XG5cbiAgICBpZiAoIXZhbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUd29JZEdldHRlcihpZENvbHMpIHtcbiAgY29uc3QgaWRDb2wxID0gaWRDb2xzWzBdO1xuICBjb25zdCBpZENvbDIgPSBpZENvbHNbMV07XG5cbiAgcmV0dXJuIChyb3cpID0+IHtcbiAgICBjb25zdCB2YWwxID0gcm93W2lkQ29sMV07XG4gICAgY29uc3QgdmFsMiA9IHJvd1tpZENvbDJdO1xuXG4gICAgaWYgKCF2YWwxIHx8ICF2YWwyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke3ZhbDF9LCR7dmFsMn1gO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGhyZWVJZEdldHRlcihpZENvbHMpIHtcbiAgY29uc3QgaWRDb2wxID0gaWRDb2xzWzBdO1xuICBjb25zdCBpZENvbDIgPSBpZENvbHNbMV07XG4gIGNvbnN0IGlkQ29sMyA9IGlkQ29sc1syXTtcblxuICByZXR1cm4gKHJvdykgPT4ge1xuICAgIGNvbnN0IHZhbDEgPSByb3dbaWRDb2wxXTtcbiAgICBjb25zdCB2YWwyID0gcm93W2lkQ29sMl07XG4gICAgY29uc3QgdmFsMyA9IHJvd1tpZENvbDNdO1xuXG4gICAgaWYgKCF2YWwxIHx8ICF2YWwyIHx8ICF2YWwzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke3ZhbDF9LCR7dmFsMn0sJHt2YWwzfWA7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOSWRHZXR0ZXIoaWRDb2xzKSB7XG4gIHJldHVybiAocm93KSA9PiB7XG4gICAgbGV0IGlkID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGlkQ29scy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IHZhbCA9IHJvd1tpZENvbHNbaV1dO1xuXG4gICAgICBpZiAoIXZhbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWQgKz0gKGkgPiAwID8gJywnIDogJycpICsgdmFsO1xuICAgIH1cblxuICAgIHJldHVybiBpZDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRmlsdGVyUXVlcnkoe2J1aWxkZXIsIGV4cHIsIHJlbGF0aW9ufSkge1xuICBjb25zdCBmaWx0ZXJRdWVyeSA9IHJlbGF0aW9uLnJlbGF0ZWRNb2RlbENsYXNzXG4gICAgLnF1ZXJ5KClcbiAgICAuY2hpbGRRdWVyeU9mKGJ1aWxkZXIpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gZXhwci5hcmdzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IGZpbHRlck5hbWUgPSBleHByLmFyZ3NbaV07XG4gICAgY29uc3QgZmlsdGVyID0gZXhwci5maWx0ZXJzW2ZpbHRlck5hbWVdO1xuXG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3Ioe2VhZ2VyOiBgY291bGQgbm90IGZpbmQgZmlsdGVyIFwiJHtmaWx0ZXJOYW1lfVwiIGZvciByZWxhdGlvbiBcIiR7cmVsYXRpb24ubmFtZX1cImB9KTtcbiAgICB9XG5cbiAgICBmaWx0ZXIoZmlsdGVyUXVlcnkpO1xuICB9XG5cbiAgcmV0dXJuIGZpbHRlclF1ZXJ5O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVSZWxhdGVkSm9pbkZyb21RdWVyeSh7ZmlsdGVyUXVlcnksIHJlbGF0aW9uLCBhbGxSZWxhdGlvbnN9KSB7XG4gIGNvbnN0IHJlbGF0ZWRKb2luRnJvbVF1ZXJ5ID0gZmlsdGVyUXVlcnkuY2xvbmUoKTtcblxuICBjb25zdCBhbGxGb3JlaWduS2V5cyA9IGZpbmRBbGxGb3JlaWduS2V5c0Zvck1vZGVsKHtcbiAgICBtb2RlbENsYXNzOiByZWxhdGlvbi5yZWxhdGVkTW9kZWxDbGFzcyxcbiAgICBhbGxSZWxhdGlvbnNcbiAgfSk7XG5cbiAgcmV0dXJuIHJlbGF0ZWRKb2luRnJvbVF1ZXJ5LnNlbGVjdChhbGxGb3JlaWduS2V5cy5maWx0ZXIoY29sID0+IHtcbiAgICByZXR1cm4gIXJlbGF0ZWRKb2luRnJvbVF1ZXJ5Lmhhc1NlbGVjdGlvbihjb2wpO1xuICB9KSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRBbGxGb3JlaWduS2V5c0Zvck1vZGVsKHttb2RlbENsYXNzLCBhbGxSZWxhdGlvbnN9KSB7XG4gIGxldCBmb3JlaWduS2V5cyA9IG1vZGVsQ2xhc3MuZ2V0SWRDb2x1bW5BcnJheSgpLnNsaWNlKCk7XG5cbiAgYWxsUmVsYXRpb25zLmZvckVhY2gocmVsID0+IHtcbiAgICBpZiAocmVsLnJlbGF0ZWRNb2RlbENsYXNzLnRhYmxlTmFtZSA9PT0gbW9kZWxDbGFzcy50YWJsZU5hbWUpIHtcbiAgICAgIHJlbC5yZWxhdGVkQ29sLmZvckVhY2goY29sID0+IGZvcmVpZ25LZXlzLnB1c2goY29sKSk7XG4gICAgfVxuXG4gICAgaWYgKHJlbC5vd25lck1vZGVsQ2xhc3MudGFibGVOYW1lID09PSBtb2RlbENsYXNzLnRhYmxlTmFtZSkge1xuICAgICAgcmVsLm93bmVyQ29sLmZvckVhY2goY29sID0+IGZvcmVpZ25LZXlzLnB1c2goY29sKSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gXy51bmlxKGZvcmVpZ25LZXlzKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTW9kZWwocm93LCBwSW5mbywga2V5SW5mb0J5UGF0aCkge1xuICBjb25zdCBrZXlJbmZvID0ga2V5SW5mb0J5UGF0aFtwSW5mby5lbmNQYXRoXTtcbiAgY29uc3QganNvbiA9IHt9O1xuXG4gIGZvciAobGV0IGsgPSAwLCBsayA9IGtleUluZm8ubGVuZ3RoOyBrIDwgbGs7ICsraykge1xuICAgIGNvbnN0IGtJbmZvID0ga2V5SW5mb1trXTtcbiAgICBqc29uW2tJbmZvLmNvbF0gPSByb3dba0luZm8ua2V5XTtcbiAgfVxuXG4gIHJldHVybiBwSW5mby5tb2RlbENsYXNzLmZyb21EYXRhYmFzZUpzb24oanNvbik7XG59XG5cbmZ1bmN0aW9uIGpvaW5UYWJsZUZvclBhdGgocGF0aCkge1xuICByZXR1cm4gcGF0aCArICdfam9pbic7XG59XG5cbmNsYXNzIFBhdGhJbmZvIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBhdGggPSBudWxsO1xuICAgIHRoaXMuZW5jUGF0aCA9IG51bGw7XG4gICAgdGhpcy5lbmNQYXJlbnRQYXRoID0gbnVsbDtcbiAgICB0aGlzLm1vZGVsQ2xhc3MgPSBudWxsO1xuICAgIHRoaXMucmVsYXRpb24gPSBudWxsO1xuICAgIHRoaXMub21pdENvbHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuaWRHZXR0ZXIgPSBudWxsO1xuICB9XG5cbiAgY3JlYXRlQnJhbmNoKHBhcmVudE1vZGVsKSB7XG4gICAgY29uc3QgYnJhbmNoID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBwYXJlbnRNb2RlbFt0aGlzLnJlbGF0aW9uLm5hbWVdID0gYnJhbmNoO1xuICAgIHJldHVybiBicmFuY2g7XG4gIH1cblxuICBnZXRCcmFuY2gocGFyZW50TW9kZWwpIHtcbiAgICByZXR1cm4gcGFyZW50TW9kZWxbdGhpcy5yZWxhdGlvbi5uYW1lXTtcbiAgfVxuXG4gIGdldE1vZGVsRnJvbUJyYW5jaChicmFuY2gsIGlkKSB7XG4gICAgcmV0dXJuIGJyYW5jaFtpZF07XG4gIH1cblxuICBzZXRNb2RlbFRvQnJhbmNoKGJyYW5jaCwgaWQsIG1vZGVsKSB7XG4gICAgYnJhbmNoW2lkXSA9IG1vZGVsO1xuICB9XG5cbiAgZmluYWxpemVCcmFuY2goYnJhbmNoLCBwYXJlbnRNb2RlbCkge1xuICAgIGNvbnN0IHJlbE1vZGVscyA9IF8udmFsdWVzKGJyYW5jaCk7XG4gICAgcGFyZW50TW9kZWxbdGhpcy5yZWxhdGlvbi5uYW1lXSA9IHJlbE1vZGVscztcbiAgICByZXR1cm4gcmVsTW9kZWxzO1xuICB9XG59XG5cbmNsYXNzIE9uZVRvT25lUGF0aEluZm8gZXh0ZW5kcyBQYXRoSW5mbyB7XG5cbiAgY3JlYXRlQnJhbmNoKHBhcmVudE1vZGVsKSB7XG4gICAgcmV0dXJuIHBhcmVudE1vZGVsO1xuICB9XG5cbiAgZ2V0QnJhbmNoKHBhcmVudE1vZGVsKSB7XG4gICAgcmV0dXJuIHBhcmVudE1vZGVsO1xuICB9XG5cbiAgZ2V0TW9kZWxGcm9tQnJhbmNoKGJyYW5jaCwgaWQpIHtcbiAgICByZXR1cm4gYnJhbmNoW3RoaXMucmVsYXRpb24ubmFtZV07XG4gIH1cblxuICBzZXRNb2RlbFRvQnJhbmNoKGJyYW5jaCwgaWQsIG1vZGVsKSB7XG4gICAgYnJhbmNoW3RoaXMucmVsYXRpb24ubmFtZV0gPSBtb2RlbDtcbiAgfVxuXG5cbiAgZmluYWxpemVCcmFuY2goYnJhbmNoLCBwYXJlbnRNb2RlbCkge1xuICAgIHBhcmVudE1vZGVsW3RoaXMucmVsYXRpb24ubmFtZV0gPSBicmFuY2ggfHwgbnVsbDtcbiAgICByZXR1cm4gYnJhbmNoIHx8IG51bGw7XG4gIH1cbn1cbiJdfQ==