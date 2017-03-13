'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _QueryBuilderOperation = require('./QueryBuilderOperation');

var _QueryBuilderOperation2 = _interopRequireDefault(_QueryBuilderOperation);

var _ReferenceBuilder = require('../ReferenceBuilder');

var _ReferenceBuilder2 = _interopRequireDefault(_ReferenceBuilder);

var _jsonFieldExpressionParser = require('../parsers/jsonFieldExpressionParser');

var _jsonFieldExpressionParser2 = _interopRequireDefault(_jsonFieldExpressionParser);

var _modelFactory = require('../../model/modelFactory');

var _promiseUtils = require('../../utils/promiseUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UpdateOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(UpdateOperation, _QueryBuilderOperatio);

  function UpdateOperation(name, opt) {
    (0, _classCallCheck3.default)(this, UpdateOperation);

    /**
     * The update model.
     *
     * @type {Model}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.call(this, name, opt));

    _this.model = null;

    /**
     * Options for the Model.fromJson call.
     *
     * @type {ModelOptions}
     */
    _this.modelOptions = (0, _assign2.default)({}, _this.opt.modelOptions || {});

    /**
     * Query properties separated from this.model.
     *
     * @type {Map}
     */
    _this.queryProps = null;

    /**
     * @type {boolean}
     */
    _this.isWriteOperation = true;
    return _this;
  }

  UpdateOperation.prototype.call = function call(builder, args) {
    var modelClass = builder.modelClass();
    var json = args[0];

    if (json instanceof modelClass) {
      this.model = json;
    } else if (json) {
      // Convert into model instance and separate query properties like
      // query builders, knex raw calls etc.
      var split = (0, _modelFactory.fromJson)({
        modelOptions: this.modelOptions,
        modelClass: modelClass,
        deep: false,
        json: json
      });

      this.model = split.model;
      this.queryProps = split.queryProps;
    }

    return true;
  };

  UpdateOperation.prototype.onBeforeInternal = function onBeforeInternal(builder, result) {
    var maybePromise = this.model.$beforeUpdate(this.modelOptions, builder.context());
    return (0, _promiseUtils.afterReturn)(maybePromise, result);
  };

  UpdateOperation.prototype.onBuild = function onBuild(knexBuilder, builder) {
    // Builder options can contain a queryProps map. Use it
    // if there isn't a local one.
    var queryProps = this.queryProps || builder.internalOptions().queryProps;

    var json = (0, _modelFactory.toDatabaseJson)({
      model: this.model,
      queryProps: queryProps
    });

    // convert ref syntax to knex.raw
    // TODO: jsonb attr update implementation for mysql and sqlite..
    var knex = builder.knex();
    var loweredJson = {};

    _lodash2.default.forOwn(json, function (val, key) {
      // convert ref values to raw
      var loweredValue = val instanceof _ReferenceBuilder2.default ? knex.raw.apply(knex, (0, _toConsumableArray3.default)(val.toRawArgs())) : val;

      // convert update to jsonb_set format if attr inside jsonb column is set
      if (key.indexOf(':') > -1) {
        // e.g. 'col:attr' : ref('other:lol') is transformed to
        // "col" : raw(`jsonb_set("col", '{attr}', to_jsonb("other"#>'{lol}'), true)`)

        var parsed = _jsonFieldExpressionParser2.default.parse(key);
        var jsonRefs = '{' + (0, _lodash2.default)(parsed.access).map('ref').value().join(',') + '}';

        loweredJson[parsed.columnName] = knex.raw('jsonb_set(??, \'' + jsonRefs + '\', to_jsonb(?), true)', [parsed.columnName, loweredValue]);
      } else {
        loweredJson[key] = loweredValue;
      }
    });

    knexBuilder.update(loweredJson);
  };

  UpdateOperation.prototype.onAfterInternal = function onAfterInternal(builder, numUpdated) {
    var maybePromise = this.model.$afterUpdate(this.modelOptions, builder.context());
    return (0, _promiseUtils.afterReturn)(maybePromise, numUpdated);
  };

  return UpdateOperation;
}(_QueryBuilderOperation2.default);

exports.default = UpdateOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwZGF0ZU9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJVcGRhdGVPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwibW9kZWwiLCJtb2RlbE9wdGlvbnMiLCJxdWVyeVByb3BzIiwiaXNXcml0ZU9wZXJhdGlvbiIsImNhbGwiLCJidWlsZGVyIiwiYXJncyIsIm1vZGVsQ2xhc3MiLCJqc29uIiwic3BsaXQiLCJkZWVwIiwib25CZWZvcmVJbnRlcm5hbCIsInJlc3VsdCIsIm1heWJlUHJvbWlzZSIsIiRiZWZvcmVVcGRhdGUiLCJjb250ZXh0Iiwib25CdWlsZCIsImtuZXhCdWlsZGVyIiwiaW50ZXJuYWxPcHRpb25zIiwia25leCIsImxvd2VyZWRKc29uIiwiZm9yT3duIiwidmFsIiwia2V5IiwibG93ZXJlZFZhbHVlIiwicmF3IiwidG9SYXdBcmdzIiwiaW5kZXhPZiIsInBhcnNlZCIsInBhcnNlIiwianNvblJlZnMiLCJhY2Nlc3MiLCJtYXAiLCJ2YWx1ZSIsImpvaW4iLCJjb2x1bW5OYW1lIiwidXBkYXRlIiwib25BZnRlckludGVybmFsIiwibnVtVXBkYXRlZCIsIiRhZnRlclVwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztJQUVxQkEsZTs7O0FBRW5CLDJCQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUdyQjs7Ozs7QUFIcUIsK0RBQ3JCLGlDQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBUXJCLFVBQUtDLEtBQUwsR0FBYSxJQUFiOztBQUVBOzs7OztBQUtBLFVBQUtDLFlBQUwsR0FBb0Isc0JBQWMsRUFBZCxFQUFrQixNQUFLRixHQUFMLENBQVNFLFlBQVQsSUFBeUIsRUFBM0MsQ0FBcEI7O0FBRUE7Ozs7O0FBS0EsVUFBS0MsVUFBTCxHQUFrQixJQUFsQjs7QUFFQTs7O0FBR0EsVUFBS0MsZ0JBQUwsR0FBd0IsSUFBeEI7QUEzQnFCO0FBNEJ0Qjs7NEJBRURDLEksaUJBQUtDLE8sRUFBU0MsSSxFQUFNO0FBQ2xCLFFBQU1DLGFBQWFGLFFBQVFFLFVBQVIsRUFBbkI7QUFDQSxRQUFJQyxPQUFPRixLQUFLLENBQUwsQ0FBWDs7QUFFQSxRQUFJRSxnQkFBZ0JELFVBQXBCLEVBQWdDO0FBQzlCLFdBQUtQLEtBQUwsR0FBYVEsSUFBYjtBQUNELEtBRkQsTUFFTyxJQUFJQSxJQUFKLEVBQVU7QUFDZjtBQUNBO0FBQ0EsVUFBTUMsUUFBUSw0QkFBUztBQUNyQlIsc0JBQWMsS0FBS0EsWUFERTtBQUVyQk0sb0JBQVlBLFVBRlM7QUFHckJHLGNBQU0sS0FIZTtBQUlyQkY7QUFKcUIsT0FBVCxDQUFkOztBQU9BLFdBQUtSLEtBQUwsR0FBYVMsTUFBTVQsS0FBbkI7QUFDQSxXQUFLRSxVQUFMLEdBQWtCTyxNQUFNUCxVQUF4QjtBQUNEOztBQUVELFdBQU8sSUFBUDtBQUNELEc7OzRCQUVEUyxnQiw2QkFBaUJOLE8sRUFBU08sTSxFQUFRO0FBQ2hDLFFBQU1DLGVBQWUsS0FBS2IsS0FBTCxDQUFXYyxhQUFYLENBQXlCLEtBQUtiLFlBQTlCLEVBQTRDSSxRQUFRVSxPQUFSLEVBQTVDLENBQXJCO0FBQ0EsV0FBTywrQkFBWUYsWUFBWixFQUEwQkQsTUFBMUIsQ0FBUDtBQUNELEc7OzRCQUVESSxPLG9CQUFRQyxXLEVBQWFaLE8sRUFBUztBQUM1QjtBQUNBO0FBQ0EsUUFBTUgsYUFBYSxLQUFLQSxVQUFMLElBQW1CRyxRQUFRYSxlQUFSLEdBQTBCaEIsVUFBaEU7O0FBRUEsUUFBTU0sT0FBTyxrQ0FBZTtBQUMxQlIsYUFBTyxLQUFLQSxLQURjO0FBRTFCRTtBQUYwQixLQUFmLENBQWI7O0FBS0E7QUFDQTtBQUNBLFFBQU1pQixPQUFPZCxRQUFRYyxJQUFSLEVBQWI7QUFDQSxRQUFNQyxjQUFjLEVBQXBCOztBQUVBLHFCQUFFQyxNQUFGLENBQVNiLElBQVQsRUFBZSxVQUFDYyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUMzQjtBQUNBLFVBQUlDLGVBQWdCRix5Q0FBRCxHQUNqQkgsS0FBS00sR0FBTCw4Q0FBYUgsSUFBSUksU0FBSixFQUFiLEVBRGlCLEdBQ2dCSixHQURuQzs7QUFHQTtBQUNBLFVBQUlDLElBQUlJLE9BQUosQ0FBWSxHQUFaLElBQW1CLENBQUMsQ0FBeEIsRUFBMkI7QUFDekI7QUFDQTs7QUFFQSxZQUFJQyxTQUFTLG9DQUEwQkMsS0FBMUIsQ0FBZ0NOLEdBQWhDLENBQWI7QUFDQSxZQUFJTyxXQUFXLE1BQU0sc0JBQUVGLE9BQU9HLE1BQVQsRUFBaUJDLEdBQWpCLENBQXFCLEtBQXJCLEVBQTRCQyxLQUE1QixHQUFvQ0MsSUFBcEMsQ0FBeUMsR0FBekMsQ0FBTixHQUFzRCxHQUFyRTs7QUFFQWQsb0JBQVlRLE9BQU9PLFVBQW5CLElBQWlDaEIsS0FBS00sR0FBTCxzQkFDYkssUUFEYSw2QkFFL0IsQ0FBQ0YsT0FBT08sVUFBUixFQUFvQlgsWUFBcEIsQ0FGK0IsQ0FBakM7QUFJRCxPQVhELE1BV087QUFDTEosb0JBQVlHLEdBQVosSUFBbUJDLFlBQW5CO0FBQ0Q7QUFDRixLQXBCRDs7QUFzQkFQLGdCQUFZbUIsTUFBWixDQUFtQmhCLFdBQW5CO0FBQ0QsRzs7NEJBRURpQixlLDRCQUFnQmhDLE8sRUFBU2lDLFUsRUFBWTtBQUNuQyxRQUFNekIsZUFBZSxLQUFLYixLQUFMLENBQVd1QyxZQUFYLENBQXdCLEtBQUt0QyxZQUE3QixFQUEyQ0ksUUFBUVUsT0FBUixFQUEzQyxDQUFyQjtBQUNBLFdBQU8sK0JBQVlGLFlBQVosRUFBMEJ5QixVQUExQixDQUFQO0FBQ0QsRzs7Ozs7a0JBdkdrQnpDLGUiLCJmaWxlIjoiVXBkYXRlT3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBRdWVyeUJ1aWxkZXJPcGVyYXRpb24gZnJvbSAnLi9RdWVyeUJ1aWxkZXJPcGVyYXRpb24nO1xuaW1wb3J0IFJlZmVyZW5jZUJ1aWxkZXIgZnJvbSAnLi4vUmVmZXJlbmNlQnVpbGRlcic7XG5pbXBvcnQganNvbkZpZWxkRXhwcmVzc2lvblBhcnNlciBmcm9tICcuLi9wYXJzZXJzL2pzb25GaWVsZEV4cHJlc3Npb25QYXJzZXInO1xuaW1wb3J0IHtmcm9tSnNvbiwgdG9EYXRhYmFzZUpzb259IGZyb20gJy4uLy4uL21vZGVsL21vZGVsRmFjdG9yeSc7XG5pbXBvcnQge2FmdGVyUmV0dXJufSBmcm9tICcuLi8uLi91dGlscy9wcm9taXNlVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGRhdGVPcGVyYXRpb24gZXh0ZW5kcyBRdWVyeUJ1aWxkZXJPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdXBkYXRlIG1vZGVsLlxuICAgICAqXG4gICAgICogQHR5cGUge01vZGVsfVxuICAgICAqL1xuICAgIHRoaXMubW9kZWwgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogT3B0aW9ucyBmb3IgdGhlIE1vZGVsLmZyb21Kc29uIGNhbGwuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7TW9kZWxPcHRpb25zfVxuICAgICAqL1xuICAgIHRoaXMubW9kZWxPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHQubW9kZWxPcHRpb25zIHx8IHt9KTtcblxuICAgIC8qKlxuICAgICAqIFF1ZXJ5IHByb3BlcnRpZXMgc2VwYXJhdGVkIGZyb20gdGhpcy5tb2RlbC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtNYXB9XG4gICAgICovXG4gICAgdGhpcy5xdWVyeVByb3BzID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuaXNXcml0ZU9wZXJhdGlvbiA9IHRydWU7XG4gIH1cblxuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICBjb25zdCBtb2RlbENsYXNzID0gYnVpbGRlci5tb2RlbENsYXNzKCk7XG4gICAgbGV0IGpzb24gPSBhcmdzWzBdO1xuXG4gICAgaWYgKGpzb24gaW5zdGFuY2VvZiBtb2RlbENsYXNzKSB7XG4gICAgICB0aGlzLm1vZGVsID0ganNvbjtcbiAgICB9IGVsc2UgaWYgKGpzb24pIHtcbiAgICAgIC8vIENvbnZlcnQgaW50byBtb2RlbCBpbnN0YW5jZSBhbmQgc2VwYXJhdGUgcXVlcnkgcHJvcGVydGllcyBsaWtlXG4gICAgICAvLyBxdWVyeSBidWlsZGVycywga25leCByYXcgY2FsbHMgZXRjLlxuICAgICAgY29uc3Qgc3BsaXQgPSBmcm9tSnNvbih7XG4gICAgICAgIG1vZGVsT3B0aW9uczogdGhpcy5tb2RlbE9wdGlvbnMsXG4gICAgICAgIG1vZGVsQ2xhc3M6IG1vZGVsQ2xhc3MsXG4gICAgICAgIGRlZXA6IGZhbHNlLFxuICAgICAgICBqc29uXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5tb2RlbCA9IHNwbGl0Lm1vZGVsO1xuICAgICAgdGhpcy5xdWVyeVByb3BzID0gc3BsaXQucXVlcnlQcm9wcztcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG9uQmVmb3JlSW50ZXJuYWwoYnVpbGRlciwgcmVzdWx0KSB7XG4gICAgY29uc3QgbWF5YmVQcm9taXNlID0gdGhpcy5tb2RlbC4kYmVmb3JlVXBkYXRlKHRoaXMubW9kZWxPcHRpb25zLCBidWlsZGVyLmNvbnRleHQoKSk7XG4gICAgcmV0dXJuIGFmdGVyUmV0dXJuKG1heWJlUHJvbWlzZSwgcmVzdWx0KTtcbiAgfVxuXG4gIG9uQnVpbGQoa25leEJ1aWxkZXIsIGJ1aWxkZXIpIHtcbiAgICAvLyBCdWlsZGVyIG9wdGlvbnMgY2FuIGNvbnRhaW4gYSBxdWVyeVByb3BzIG1hcC4gVXNlIGl0XG4gICAgLy8gaWYgdGhlcmUgaXNuJ3QgYSBsb2NhbCBvbmUuXG4gICAgY29uc3QgcXVlcnlQcm9wcyA9IHRoaXMucXVlcnlQcm9wcyB8fCBidWlsZGVyLmludGVybmFsT3B0aW9ucygpLnF1ZXJ5UHJvcHM7XG5cbiAgICBjb25zdCBqc29uID0gdG9EYXRhYmFzZUpzb24oe1xuICAgICAgbW9kZWw6IHRoaXMubW9kZWwsXG4gICAgICBxdWVyeVByb3BzXG4gICAgfSk7XG5cbiAgICAvLyBjb252ZXJ0IHJlZiBzeW50YXggdG8ga25leC5yYXdcbiAgICAvLyBUT0RPOiBqc29uYiBhdHRyIHVwZGF0ZSBpbXBsZW1lbnRhdGlvbiBmb3IgbXlzcWwgYW5kIHNxbGl0ZS4uXG4gICAgY29uc3Qga25leCA9IGJ1aWxkZXIua25leCgpO1xuICAgIGNvbnN0IGxvd2VyZWRKc29uID0ge307XG5cbiAgICBfLmZvck93bihqc29uLCAodmFsLCBrZXkpID0+IHtcbiAgICAgIC8vIGNvbnZlcnQgcmVmIHZhbHVlcyB0byByYXdcbiAgICAgIGxldCBsb3dlcmVkVmFsdWUgPSAodmFsIGluc3RhbmNlb2YgUmVmZXJlbmNlQnVpbGRlcikgP1xuICAgICAgICBrbmV4LnJhdyguLi4odmFsLnRvUmF3QXJncygpKSkgOiB2YWw7XG5cbiAgICAgIC8vIGNvbnZlcnQgdXBkYXRlIHRvIGpzb25iX3NldCBmb3JtYXQgaWYgYXR0ciBpbnNpZGUganNvbmIgY29sdW1uIGlzIHNldFxuICAgICAgaWYgKGtleS5pbmRleE9mKCc6JykgPiAtMSkge1xuICAgICAgICAvLyBlLmcuICdjb2w6YXR0cicgOiByZWYoJ290aGVyOmxvbCcpIGlzIHRyYW5zZm9ybWVkIHRvXG4gICAgICAgIC8vIFwiY29sXCIgOiByYXcoYGpzb25iX3NldChcImNvbFwiLCAne2F0dHJ9JywgdG9fanNvbmIoXCJvdGhlclwiIz4ne2xvbH0nKSwgdHJ1ZSlgKVxuXG4gICAgICAgIGxldCBwYXJzZWQgPSBqc29uRmllbGRFeHByZXNzaW9uUGFyc2VyLnBhcnNlKGtleSk7XG4gICAgICAgIGxldCBqc29uUmVmcyA9ICd7JyArIF8ocGFyc2VkLmFjY2VzcykubWFwKCdyZWYnKS52YWx1ZSgpLmpvaW4oJywnKSArICd9JztcblxuICAgICAgICBsb3dlcmVkSnNvbltwYXJzZWQuY29sdW1uTmFtZV0gPSBrbmV4LnJhdyhcbiAgICAgICAgICBganNvbmJfc2V0KD8/LCAnJHtqc29uUmVmc30nLCB0b19qc29uYig/KSwgdHJ1ZSlgLFxuICAgICAgICAgIFtwYXJzZWQuY29sdW1uTmFtZSwgbG93ZXJlZFZhbHVlXVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG93ZXJlZEpzb25ba2V5XSA9IGxvd2VyZWRWYWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGtuZXhCdWlsZGVyLnVwZGF0ZShsb3dlcmVkSnNvbik7XG4gIH1cblxuICBvbkFmdGVySW50ZXJuYWwoYnVpbGRlciwgbnVtVXBkYXRlZCkge1xuICAgIGNvbnN0IG1heWJlUHJvbWlzZSA9IHRoaXMubW9kZWwuJGFmdGVyVXBkYXRlKHRoaXMubW9kZWxPcHRpb25zLCBidWlsZGVyLmNvbnRleHQoKSk7XG4gICAgcmV0dXJuIGFmdGVyUmV0dXJuKG1heWJlUHJvbWlzZSwgbnVtVXBkYXRlZCk7XG4gIH1cbn1cbiJdfQ==