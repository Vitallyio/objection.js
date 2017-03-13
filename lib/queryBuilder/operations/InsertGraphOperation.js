'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _DelegateOperation2 = require('./DelegateOperation');

var _DelegateOperation3 = _interopRequireDefault(_DelegateOperation2);

var _InsertOperation = require('./InsertOperation');

var _InsertOperation2 = _interopRequireDefault(_InsertOperation);

var _inserter = require('../graphInserter/inserter');

var _inserter2 = _interopRequireDefault(_inserter);

var _GraphInserter = require('../graphInserter/GraphInserter');

var _GraphInserter2 = _interopRequireDefault(_GraphInserter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InsertGraphOperation = function (_DelegateOperation) {
  (0, _inherits3.default)(InsertGraphOperation, _DelegateOperation);

  function InsertGraphOperation(name, opt) {
    (0, _classCallCheck3.default)(this, InsertGraphOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _DelegateOperation.call(this, name, opt));

    if (!_this.delegate.is(_InsertOperation2.default)) {
      throw new Error('Invalid delegate');
    }

    // Our delegate operation inherits from `InsertOperation`. Disable the call-time
    // validation. We do the validation in onAfterQuery instead.
    _this.delegate.modelOptions.skipValidation = true;

    // We need to split the query props deeply.
    _this.delegate.splitQueryPropsDeep = true;
    return _this;
  }

  InsertGraphOperation.prototype.call = function call(builder, args) {
    var retVal = _DelegateOperation.prototype.call.call(this, builder, args);

    // We resolve this query here and will not execute it. This is because the root
    // value may depend on other models in the graph and cannot be inserted first.
    builder.resolve([]);

    return retVal;
  };

  InsertGraphOperation.prototype.onBefore = function onBefore() {
    // Do nothing.
  };

  InsertGraphOperation.prototype.onBeforeInternal = function onBeforeInternal() {
    // Do nothing. We override this with empty implementation so that
    // the $beforeInsert() hooks are not called twice for the root models.
  };

  InsertGraphOperation.prototype.onBeforeBuild = function onBeforeBuild() {
    // Do nothing.
  };

  InsertGraphOperation.prototype.onBuild = function onBuild() {}
  // Do nothing.


  // We overrode all other hooks but this one and do all the work in here.
  // This is a bit hacky.
  ;

  InsertGraphOperation.prototype.onAfterQuery = function onAfterQuery(builder) {
    var _this2 = this;

    // We split the query props from all the models in the graph in the
    // InsertOperation.call method. We need to set the queryProps option
    // so that the individual inserts started by insertFunc all get their
    // query properties.
    builder = builder.clone().internalOptions({ queryProps: this.queryProps });

    var ModelClass = builder.modelClass();
    var insertFunc = (0, _inserter2.default)(builder);

    var graphInserter = new _GraphInserter2.default({
      modelClass: ModelClass,
      models: this.models,
      allowedRelations: builder._allowedInsertExpression || null,
      knex: builder.knex()
    });

    return graphInserter.execute(insertFunc).then(function () {
      return _DelegateOperation.prototype.onAfterQuery.call(_this2, builder, _this2.models);
    });
  };

  InsertGraphOperation.prototype.onAfterInternal = function onAfterInternal() {
    // We override this with empty implementation so that the $afterInsert() hooks
    // are not called twice for the root models.
    return this.isArray ? this.models : this.models[0] || null;
  };

  (0, _createClass3.default)(InsertGraphOperation, [{
    key: 'models',
    get: function get() {
      return this.delegate.models;
    }
  }, {
    key: 'isArray',
    get: function get() {
      return this.delegate.isArray;
    }
  }, {
    key: 'queryProps',
    get: function get() {
      return this.delegate.queryProps;
    }
  }]);
  return InsertGraphOperation;
}(_DelegateOperation3.default);

exports.default = InsertGraphOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluc2VydEdyYXBoT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIkluc2VydEdyYXBoT3BlcmF0aW9uIiwibmFtZSIsIm9wdCIsImRlbGVnYXRlIiwiaXMiLCJFcnJvciIsIm1vZGVsT3B0aW9ucyIsInNraXBWYWxpZGF0aW9uIiwic3BsaXRRdWVyeVByb3BzRGVlcCIsImNhbGwiLCJidWlsZGVyIiwiYXJncyIsInJldFZhbCIsInJlc29sdmUiLCJvbkJlZm9yZSIsIm9uQmVmb3JlSW50ZXJuYWwiLCJvbkJlZm9yZUJ1aWxkIiwib25CdWlsZCIsIm9uQWZ0ZXJRdWVyeSIsImNsb25lIiwiaW50ZXJuYWxPcHRpb25zIiwicXVlcnlQcm9wcyIsIk1vZGVsQ2xhc3MiLCJtb2RlbENsYXNzIiwiaW5zZXJ0RnVuYyIsImdyYXBoSW5zZXJ0ZXIiLCJtb2RlbHMiLCJhbGxvd2VkUmVsYXRpb25zIiwiX2FsbG93ZWRJbnNlcnRFeHByZXNzaW9uIiwia25leCIsImV4ZWN1dGUiLCJ0aGVuIiwib25BZnRlckludGVybmFsIiwiaXNBcnJheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxvQjs7O0FBRW5CLGdDQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQiw4QkFBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUdyQixRQUFJLENBQUMsTUFBS0MsUUFBTCxDQUFjQyxFQUFkLDJCQUFMLEVBQXdDO0FBQ3RDLFlBQU0sSUFBSUMsS0FBSixDQUFVLGtCQUFWLENBQU47QUFDRDs7QUFFRDtBQUNBO0FBQ0EsVUFBS0YsUUFBTCxDQUFjRyxZQUFkLENBQTJCQyxjQUEzQixHQUE0QyxJQUE1Qzs7QUFFQTtBQUNBLFVBQUtKLFFBQUwsQ0FBY0ssbUJBQWQsR0FBb0MsSUFBcEM7QUFacUI7QUFhdEI7O2lDQUVEQyxJLGlCQUFLQyxPLEVBQVNDLEksRUFBTTtBQUNsQixRQUFNQyxTQUFTLDZCQUFNSCxJQUFOLFlBQVdDLE9BQVgsRUFBb0JDLElBQXBCLENBQWY7O0FBRUE7QUFDQTtBQUNBRCxZQUFRRyxPQUFSLENBQWdCLEVBQWhCOztBQUVBLFdBQU9ELE1BQVA7QUFDRCxHOztpQ0FjREUsUSx1QkFBVztBQUNUO0FBQ0QsRzs7aUNBRURDLGdCLCtCQUFtQjtBQUNqQjtBQUNBO0FBQ0QsRzs7aUNBRURDLGEsNEJBQWdCO0FBQ2Q7QUFDRCxHOztpQ0FFREMsTyxzQkFBVSxDQUVUO0FBREM7OztBQUdGO0FBQ0E7OztpQ0FDQUMsWSx5QkFBYVIsTyxFQUFTO0FBQUE7O0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLGNBQVVBLFFBQVFTLEtBQVIsR0FBZ0JDLGVBQWhCLENBQWdDLEVBQUNDLFlBQVksS0FBS0EsVUFBbEIsRUFBaEMsQ0FBVjs7QUFFQSxRQUFNQyxhQUFhWixRQUFRYSxVQUFSLEVBQW5CO0FBQ0EsUUFBTUMsYUFBYSx3QkFBa0JkLE9BQWxCLENBQW5COztBQUVBLFFBQU1lLGdCQUFnQiw0QkFBa0I7QUFDdENGLGtCQUFZRCxVQUQwQjtBQUV0Q0ksY0FBUSxLQUFLQSxNQUZ5QjtBQUd0Q0Msd0JBQWtCakIsUUFBUWtCLHdCQUFSLElBQW9DLElBSGhCO0FBSXRDQyxZQUFNbkIsUUFBUW1CLElBQVI7QUFKZ0MsS0FBbEIsQ0FBdEI7O0FBT0EsV0FBT0osY0FBY0ssT0FBZCxDQUFzQk4sVUFBdEIsRUFBa0NPLElBQWxDLENBQXVDLFlBQU07QUFDbEQsYUFBTyw2QkFBTWIsWUFBTixjQUFtQlIsT0FBbkIsRUFBNEIsT0FBS2dCLE1BQWpDLENBQVA7QUFDRCxLQUZNLENBQVA7QUFHRCxHOztpQ0FFRE0sZSw4QkFBa0I7QUFDaEI7QUFDQTtBQUNBLFdBQU8sS0FBS0MsT0FBTCxHQUFlLEtBQUtQLE1BQXBCLEdBQThCLEtBQUtBLE1BQUwsQ0FBWSxDQUFaLEtBQWtCLElBQXZEO0FBQ0QsRzs7Ozt3QkF6RFk7QUFDWCxhQUFPLEtBQUt2QixRQUFMLENBQWN1QixNQUFyQjtBQUNEOzs7d0JBRWE7QUFDWixhQUFPLEtBQUt2QixRQUFMLENBQWM4QixPQUFyQjtBQUNEOzs7d0JBRWdCO0FBQ2YsYUFBTyxLQUFLOUIsUUFBTCxDQUFja0IsVUFBckI7QUFDRDs7Ozs7a0JBckNrQnJCLG9CIiwiZmlsZSI6Ikluc2VydEdyYXBoT3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERlbGVnYXRlT3BlcmF0aW9uIGZyb20gJy4vRGVsZWdhdGVPcGVyYXRpb24nO1xuaW1wb3J0IEluc2VydE9wZXJhdGlvbiBmcm9tICcuL0luc2VydE9wZXJhdGlvbic7XG5cbmltcG9ydCBpbnNlcnRGdW5jQnVpbGRlciBmcm9tICcuLi9ncmFwaEluc2VydGVyL2luc2VydGVyJztcbmltcG9ydCBHcmFwaEluc2VydGVyIGZyb20gJy4uL2dyYXBoSW5zZXJ0ZXIvR3JhcGhJbnNlcnRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc2VydEdyYXBoT3BlcmF0aW9uIGV4dGVuZHMgRGVsZWdhdGVPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG5cbiAgICBpZiAoIXRoaXMuZGVsZWdhdGUuaXMoSW5zZXJ0T3BlcmF0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGRlbGVnYXRlJyk7XG4gICAgfVxuXG4gICAgLy8gT3VyIGRlbGVnYXRlIG9wZXJhdGlvbiBpbmhlcml0cyBmcm9tIGBJbnNlcnRPcGVyYXRpb25gLiBEaXNhYmxlIHRoZSBjYWxsLXRpbWVcbiAgICAvLyB2YWxpZGF0aW9uLiBXZSBkbyB0aGUgdmFsaWRhdGlvbiBpbiBvbkFmdGVyUXVlcnkgaW5zdGVhZC5cbiAgICB0aGlzLmRlbGVnYXRlLm1vZGVsT3B0aW9ucy5za2lwVmFsaWRhdGlvbiA9IHRydWU7XG5cbiAgICAvLyBXZSBuZWVkIHRvIHNwbGl0IHRoZSBxdWVyeSBwcm9wcyBkZWVwbHkuXG4gICAgdGhpcy5kZWxlZ2F0ZS5zcGxpdFF1ZXJ5UHJvcHNEZWVwID0gdHJ1ZTtcbiAgfVxuXG4gIGNhbGwoYnVpbGRlciwgYXJncykge1xuICAgIGNvbnN0IHJldFZhbCA9IHN1cGVyLmNhbGwoYnVpbGRlciwgYXJncyk7XG5cbiAgICAvLyBXZSByZXNvbHZlIHRoaXMgcXVlcnkgaGVyZSBhbmQgd2lsbCBub3QgZXhlY3V0ZSBpdC4gVGhpcyBpcyBiZWNhdXNlIHRoZSByb290XG4gICAgLy8gdmFsdWUgbWF5IGRlcGVuZCBvbiBvdGhlciBtb2RlbHMgaW4gdGhlIGdyYXBoIGFuZCBjYW5ub3QgYmUgaW5zZXJ0ZWQgZmlyc3QuXG4gICAgYnVpbGRlci5yZXNvbHZlKFtdKTtcblxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBnZXQgbW9kZWxzKCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLm1vZGVscztcbiAgfVxuXG4gIGdldCBpc0FycmF5KCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmlzQXJyYXk7XG4gIH1cblxuICBnZXQgcXVlcnlQcm9wcygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5xdWVyeVByb3BzO1xuICB9XG5cbiAgb25CZWZvcmUoKSB7XG4gICAgLy8gRG8gbm90aGluZy5cbiAgfVxuXG4gIG9uQmVmb3JlSW50ZXJuYWwoKSB7XG4gICAgLy8gRG8gbm90aGluZy4gV2Ugb3ZlcnJpZGUgdGhpcyB3aXRoIGVtcHR5IGltcGxlbWVudGF0aW9uIHNvIHRoYXRcbiAgICAvLyB0aGUgJGJlZm9yZUluc2VydCgpIGhvb2tzIGFyZSBub3QgY2FsbGVkIHR3aWNlIGZvciB0aGUgcm9vdCBtb2RlbHMuXG4gIH1cblxuICBvbkJlZm9yZUJ1aWxkKCkge1xuICAgIC8vIERvIG5vdGhpbmcuXG4gIH1cblxuICBvbkJ1aWxkKCkge1xuICAgIC8vIERvIG5vdGhpbmcuXG4gIH1cblxuICAvLyBXZSBvdmVycm9kZSBhbGwgb3RoZXIgaG9va3MgYnV0IHRoaXMgb25lIGFuZCBkbyBhbGwgdGhlIHdvcmsgaW4gaGVyZS5cbiAgLy8gVGhpcyBpcyBhIGJpdCBoYWNreS5cbiAgb25BZnRlclF1ZXJ5KGJ1aWxkZXIpIHtcbiAgICAvLyBXZSBzcGxpdCB0aGUgcXVlcnkgcHJvcHMgZnJvbSBhbGwgdGhlIG1vZGVscyBpbiB0aGUgZ3JhcGggaW4gdGhlXG4gICAgLy8gSW5zZXJ0T3BlcmF0aW9uLmNhbGwgbWV0aG9kLiBXZSBuZWVkIHRvIHNldCB0aGUgcXVlcnlQcm9wcyBvcHRpb25cbiAgICAvLyBzbyB0aGF0IHRoZSBpbmRpdmlkdWFsIGluc2VydHMgc3RhcnRlZCBieSBpbnNlcnRGdW5jIGFsbCBnZXQgdGhlaXJcbiAgICAvLyBxdWVyeSBwcm9wZXJ0aWVzLlxuICAgIGJ1aWxkZXIgPSBidWlsZGVyLmNsb25lKCkuaW50ZXJuYWxPcHRpb25zKHtxdWVyeVByb3BzOiB0aGlzLnF1ZXJ5UHJvcHN9KTtcblxuICAgIGNvbnN0IE1vZGVsQ2xhc3MgPSBidWlsZGVyLm1vZGVsQ2xhc3MoKTtcbiAgICBjb25zdCBpbnNlcnRGdW5jID0gaW5zZXJ0RnVuY0J1aWxkZXIoYnVpbGRlcik7XG5cbiAgICBjb25zdCBncmFwaEluc2VydGVyID0gbmV3IEdyYXBoSW5zZXJ0ZXIoe1xuICAgICAgbW9kZWxDbGFzczogTW9kZWxDbGFzcyxcbiAgICAgIG1vZGVsczogdGhpcy5tb2RlbHMsXG4gICAgICBhbGxvd2VkUmVsYXRpb25zOiBidWlsZGVyLl9hbGxvd2VkSW5zZXJ0RXhwcmVzc2lvbiB8fCBudWxsLFxuICAgICAga25leDogYnVpbGRlci5rbmV4KClcbiAgICB9KTtcblxuICAgIHJldHVybiBncmFwaEluc2VydGVyLmV4ZWN1dGUoaW5zZXJ0RnVuYykudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gc3VwZXIub25BZnRlclF1ZXJ5KGJ1aWxkZXIsIHRoaXMubW9kZWxzKVxuICAgIH0pO1xuICB9XG5cbiAgb25BZnRlckludGVybmFsKCkge1xuICAgIC8vIFdlIG92ZXJyaWRlIHRoaXMgd2l0aCBlbXB0eSBpbXBsZW1lbnRhdGlvbiBzbyB0aGF0IHRoZSAkYWZ0ZXJJbnNlcnQoKSBob29rc1xuICAgIC8vIGFyZSBub3QgY2FsbGVkIHR3aWNlIGZvciB0aGUgcm9vdCBtb2RlbHMuXG4gICAgcmV0dXJuIHRoaXMuaXNBcnJheSA/IHRoaXMubW9kZWxzIDogKHRoaXMubW9kZWxzWzBdIHx8IG51bGwpO1xuICB9XG59XG4iXX0=