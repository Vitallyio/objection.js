'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _QueryBuilderOperation = require('./QueryBuilderOperation');

var _QueryBuilderOperation2 = _interopRequireDefault(_QueryBuilderOperation);

var _modelFactory = require('../../model/modelFactory');

var _promiseUtils = require('../../utils/promiseUtils');

var _dbUtils = require('../../utils/dbUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InsertOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(InsertOperation, _QueryBuilderOperatio);

  function InsertOperation(name, opt) {
    (0, _classCallCheck3.default)(this, InsertOperation);

    /**
     * The models we are inserting.
     *
     * @type {Array.<Model>}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.call(this, name, opt));

    _this.models = null;

    /**
     * this.models is always an array, this is true if the
     * original input was an array.
     *
     * @type {boolean}
     */
    _this.isArray = false;

    /**
     * Options for the Model.fromJson call.
     *
     * @type {ModelOptions}
     */
    _this.modelOptions = (0, _assign2.default)({}, _this.opt.modelOptions || {});

    /**
     * Set this to true if the the input should be split into models
     * and query properties deeply (with relations).
     *
     * @type {boolean}
     */
    _this.splitQueryPropsDeep = false;

    /**
     * Maps models in this.models into query properties that were
     * separated from them.
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

  InsertOperation.prototype.call = function call(builder, args) {
    // The objects to insert.
    var json = args[0];
    var modelClass = builder.modelClass();

    this.isArray = Array.isArray(json);

    if (!this.isArray) {
      json = [json];
    }

    if (json.every(function (it) {
      return it instanceof modelClass;
    })) {
      // No need to convert, already model instances.
      this.models = json;
    } else {
      // Convert into model instances and separate query properties like
      // query builders, knex raw calls etc.
      var split = (0, _modelFactory.fromJson)({
        modelOptions: this.modelOptions,
        modelClass: modelClass,
        deep: this.splitQueryPropsDeep,
        json: json
      });

      this.models = split.model;
      this.queryProps = split.queryProps;
    }

    return true;
  };

  InsertOperation.prototype.onBeforeInternal = function onBeforeInternal(builder, result) {
    if (this.models.length > 1 && !(0, _dbUtils.isPostgres)(builder.knex())) {
      throw new Error('batch insert only works with Postgresql');
    } else {
      return (0, _promiseUtils.mapAfterAllReturn)(this.models, function (model) {
        return model.$beforeInsert(builder.context());
      }, result);
    }
  };

  InsertOperation.prototype.onBuild = function onBuild(knexBuilder, builder) {
    if (!builder.has(/returning/)) {
      // If the user hasn't specified a `returning` clause, we make sure
      // that at least the identifier is returned.
      knexBuilder.returning(builder.modelClass().idColumn);
    }

    var json = new Array(this.models.length);
    // Builder options can contain a queryProps map. Use it
    // if there isn't a local one.
    var queryProps = this.queryProps || builder.internalOptions().queryProps;

    // Convert the models into database json and merge the query
    // properties back.
    for (var i = 0, l = this.models.length; i < l; ++i) {
      json[i] = (0, _modelFactory.toDatabaseJson)({
        model: this.models[i],
        queryProps: queryProps
      });
    }

    knexBuilder.insert(json);
  };

  InsertOperation.prototype.onAfterQuery = function onAfterQuery(builder, ret) {
    if (!Array.isArray(ret) || !ret.length || ret === this.models) {
      // Early exit if there is nothing to do.
      return this.models;
    }

    if (ret[0] && (0, _typeof3.default)(ret[0]) === 'object') {
      // If the user specified a `returning` clause the result may be an array of objects.
      // Merge all values of the objects to our models.
      for (var i = 0, l = this.models.length; i < l; ++i) {
        this.models[i].$set(ret[i]);
      }
    } else {
      // If the return value is not an array of objects, we assume it is an array of identifiers.
      for (var _i = 0, _l = this.models.length; _i < _l; ++_i) {
        var model = this.models[_i];

        // Don't set the id if the model already has one. MySQL and Sqlite don't return the correct
        // primary key value if the id is not generated in db, but given explicitly.
        if (!model.$id()) {
          model.$id(ret[_i]);
        }
      }
    }

    return this.models;
  };

  InsertOperation.prototype.onAfterInternal = function onAfterInternal(builder, models) {
    var result = this.isArray ? models : models[0] || null;
    return (0, _promiseUtils.mapAfterAllReturn)(models, function (model) {
      return model.$afterInsert(builder.context());
    }, result);
  };

  return InsertOperation;
}(_QueryBuilderOperation2.default);

exports.default = InsertOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluc2VydE9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJJbnNlcnRPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwibW9kZWxzIiwiaXNBcnJheSIsIm1vZGVsT3B0aW9ucyIsInNwbGl0UXVlcnlQcm9wc0RlZXAiLCJxdWVyeVByb3BzIiwiaXNXcml0ZU9wZXJhdGlvbiIsImNhbGwiLCJidWlsZGVyIiwiYXJncyIsImpzb24iLCJtb2RlbENsYXNzIiwiQXJyYXkiLCJldmVyeSIsIml0Iiwic3BsaXQiLCJkZWVwIiwibW9kZWwiLCJvbkJlZm9yZUludGVybmFsIiwicmVzdWx0IiwibGVuZ3RoIiwia25leCIsIkVycm9yIiwiJGJlZm9yZUluc2VydCIsImNvbnRleHQiLCJvbkJ1aWxkIiwia25leEJ1aWxkZXIiLCJoYXMiLCJyZXR1cm5pbmciLCJpZENvbHVtbiIsImludGVybmFsT3B0aW9ucyIsImkiLCJsIiwiaW5zZXJ0Iiwib25BZnRlclF1ZXJ5IiwicmV0IiwiJHNldCIsIiRpZCIsIm9uQWZ0ZXJJbnRlcm5hbCIsIiRhZnRlckluc2VydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztJQUVxQkEsZTs7O0FBRW5CLDJCQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUdyQjs7Ozs7QUFIcUIsK0RBQ3JCLGlDQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBUXJCLFVBQUtDLE1BQUwsR0FBYyxJQUFkOztBQUVBOzs7Ozs7QUFNQSxVQUFLQyxPQUFMLEdBQWUsS0FBZjs7QUFFQTs7Ozs7QUFLQSxVQUFLQyxZQUFMLEdBQW9CLHNCQUFjLEVBQWQsRUFBa0IsTUFBS0gsR0FBTCxDQUFTRyxZQUFULElBQXlCLEVBQTNDLENBQXBCOztBQUVBOzs7Ozs7QUFNQSxVQUFLQyxtQkFBTCxHQUEyQixLQUEzQjs7QUFFQTs7Ozs7O0FBTUEsVUFBS0MsVUFBTCxHQUFrQixJQUFs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RUFBRUQsQ0FBakQsRUFBb0Q7QUFDbEQsYUFBSzlCLE1BQUwsQ0FBWThCLENBQVosRUFBZUssSUFBZixDQUFvQkQsSUFBSUosQ0FBSixDQUFwQjtBQUNEO0FBQ0YsS0FORCxNQU1PO0FBQ0w7QUFDQSxXQUFLLElBQUlBLEtBQUksQ0FBUixFQUFXQyxLQUFJLEtBQUsvQixNQUFMLENBQVltQixNQUFoQyxFQUF3Q1csS0FBSUMsRUFBNUMsRUFBK0MsRUFBRUQsRUFBakQsRUFBb0Q7QUFDbEQsWUFBTWQsUUFBUSxLQUFLaEIsTUFBTCxDQUFZOEIsRUFBWixDQUFkOztBQUVBO0FBQ0E7QUFDQSxZQUFJLENBQUNkLE1BQU1vQixHQUFOLEVBQUwsRUFBa0I7QUFDaEJwQixnQkFBTW9CLEdBQU4sQ0FBVUYsSUFBSUosRUFBSixDQUFWO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFdBQU8sS0FBSzlCLE1BQVo7QUFDRCxHOzs0QkFFRHFDLGUsNEJBQWdCOUIsTyxFQUFTUCxNLEVBQVE7QUFDL0IsUUFBTWtCLFNBQVMsS0FBS2pCLE9BQUwsR0FBZUQsTUFBZixHQUF5QkEsT0FBTyxDQUFQLEtBQWEsSUFBckQ7QUFDQSxXQUFPLHFDQUFrQkEsTUFBbEIsRUFBMEI7QUFBQSxhQUFTZ0IsTUFBTXNCLFlBQU4sQ0FBbUIvQixRQUFRZ0IsT0FBUixFQUFuQixDQUFUO0FBQUEsS0FBMUIsRUFBMEVMLE1BQTFFLENBQVA7QUFDRCxHOzs7OztrQkEvSWtCckIsZSIsImZpbGUiOiJJbnNlcnRPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIGZyb20gJy4vUXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcbmltcG9ydCB7ZnJvbUpzb24sIHRvRGF0YWJhc2VKc29ufSBmcm9tICcuLi8uLi9tb2RlbC9tb2RlbEZhY3RvcnknO1xuaW1wb3J0IHttYXBBZnRlckFsbFJldHVybn0gZnJvbSAnLi4vLi4vdXRpbHMvcHJvbWlzZVV0aWxzJztcbmltcG9ydCB7aXNQb3N0Z3Jlc30gZnJvbSAnLi4vLi4vdXRpbHMvZGJVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc2VydE9wZXJhdGlvbiBleHRlbmRzIFF1ZXJ5QnVpbGRlck9wZXJhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgb3B0KSB7XG4gICAgc3VwZXIobmFtZSwgb3B0KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBtb2RlbHMgd2UgYXJlIGluc2VydGluZy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtBcnJheS48TW9kZWw+fVxuICAgICAqL1xuICAgIHRoaXMubW9kZWxzID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIHRoaXMubW9kZWxzIGlzIGFsd2F5cyBhbiBhcnJheSwgdGhpcyBpcyB0cnVlIGlmIHRoZVxuICAgICAqIG9yaWdpbmFsIGlucHV0IHdhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuaXNBcnJheSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogT3B0aW9ucyBmb3IgdGhlIE1vZGVsLmZyb21Kc29uIGNhbGwuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7TW9kZWxPcHRpb25zfVxuICAgICAqL1xuICAgIHRoaXMubW9kZWxPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHQubW9kZWxPcHRpb25zIHx8IHt9KTtcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGlzIHRvIHRydWUgaWYgdGhlIHRoZSBpbnB1dCBzaG91bGQgYmUgc3BsaXQgaW50byBtb2RlbHNcbiAgICAgKiBhbmQgcXVlcnkgcHJvcGVydGllcyBkZWVwbHkgKHdpdGggcmVsYXRpb25zKS5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuc3BsaXRRdWVyeVByb3BzRGVlcCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogTWFwcyBtb2RlbHMgaW4gdGhpcy5tb2RlbHMgaW50byBxdWVyeSBwcm9wZXJ0aWVzIHRoYXQgd2VyZVxuICAgICAqIHNlcGFyYXRlZCBmcm9tIHRoZW0uXG4gICAgICpcbiAgICAgKiBAdHlwZSB7TWFwfVxuICAgICAqL1xuICAgIHRoaXMucXVlcnlQcm9wcyA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmlzV3JpdGVPcGVyYXRpb24gPSB0cnVlO1xuICB9XG5cbiAgY2FsbChidWlsZGVyLCBhcmdzKSB7XG4gICAgLy8gVGhlIG9iamVjdHMgdG8gaW5zZXJ0LlxuICAgIGxldCBqc29uID0gYXJnc1swXTtcbiAgICBsZXQgbW9kZWxDbGFzcyA9IGJ1aWxkZXIubW9kZWxDbGFzcygpO1xuXG4gICAgdGhpcy5pc0FycmF5ID0gQXJyYXkuaXNBcnJheShqc29uKTtcblxuICAgIGlmICghdGhpcy5pc0FycmF5KSB7XG4gICAgICBqc29uID0gW2pzb25dO1xuICAgIH1cblxuICAgIGlmIChqc29uLmV2ZXJ5KGl0ID0+IGl0IGluc3RhbmNlb2YgbW9kZWxDbGFzcykpIHtcbiAgICAgIC8vIE5vIG5lZWQgdG8gY29udmVydCwgYWxyZWFkeSBtb2RlbCBpbnN0YW5jZXMuXG4gICAgICB0aGlzLm1vZGVscyA9IGpzb247XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENvbnZlcnQgaW50byBtb2RlbCBpbnN0YW5jZXMgYW5kIHNlcGFyYXRlIHF1ZXJ5IHByb3BlcnRpZXMgbGlrZVxuICAgICAgLy8gcXVlcnkgYnVpbGRlcnMsIGtuZXggcmF3IGNhbGxzIGV0Yy5cbiAgICAgIGNvbnN0IHNwbGl0ID0gZnJvbUpzb24oe1xuICAgICAgICBtb2RlbE9wdGlvbnM6IHRoaXMubW9kZWxPcHRpb25zLFxuICAgICAgICBtb2RlbENsYXNzOiBtb2RlbENsYXNzLFxuICAgICAgICBkZWVwOiB0aGlzLnNwbGl0UXVlcnlQcm9wc0RlZXAsXG4gICAgICAgIGpzb25cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLm1vZGVscyA9IHNwbGl0Lm1vZGVsO1xuICAgICAgdGhpcy5xdWVyeVByb3BzID0gc3BsaXQucXVlcnlQcm9wcztcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG9uQmVmb3JlSW50ZXJuYWwoYnVpbGRlciwgcmVzdWx0KSB7XG4gICAgaWYgKHRoaXMubW9kZWxzLmxlbmd0aCA+IDEgJiYgIWlzUG9zdGdyZXMoYnVpbGRlci5rbmV4KCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhdGNoIGluc2VydCBvbmx5IHdvcmtzIHdpdGggUG9zdGdyZXNxbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWFwQWZ0ZXJBbGxSZXR1cm4odGhpcy5tb2RlbHMsIG1vZGVsID0+IG1vZGVsLiRiZWZvcmVJbnNlcnQoYnVpbGRlci5jb250ZXh0KCkpLCByZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIG9uQnVpbGQoa25leEJ1aWxkZXIsIGJ1aWxkZXIpIHtcbiAgICBpZiAoIWJ1aWxkZXIuaGFzKC9yZXR1cm5pbmcvKSkge1xuICAgICAgLy8gSWYgdGhlIHVzZXIgaGFzbid0IHNwZWNpZmllZCBhIGByZXR1cm5pbmdgIGNsYXVzZSwgd2UgbWFrZSBzdXJlXG4gICAgICAvLyB0aGF0IGF0IGxlYXN0IHRoZSBpZGVudGlmaWVyIGlzIHJldHVybmVkLlxuICAgICAga25leEJ1aWxkZXIucmV0dXJuaW5nKGJ1aWxkZXIubW9kZWxDbGFzcygpLmlkQ29sdW1uKTtcbiAgICB9XG5cbiAgICBjb25zdCBqc29uID0gbmV3IEFycmF5KHRoaXMubW9kZWxzLmxlbmd0aCk7XG4gICAgLy8gQnVpbGRlciBvcHRpb25zIGNhbiBjb250YWluIGEgcXVlcnlQcm9wcyBtYXAuIFVzZSBpdFxuICAgIC8vIGlmIHRoZXJlIGlzbid0IGEgbG9jYWwgb25lLlxuICAgIGNvbnN0IHF1ZXJ5UHJvcHMgPSB0aGlzLnF1ZXJ5UHJvcHMgfHwgYnVpbGRlci5pbnRlcm5hbE9wdGlvbnMoKS5xdWVyeVByb3BzO1xuXG4gICAgLy8gQ29udmVydCB0aGUgbW9kZWxzIGludG8gZGF0YWJhc2UganNvbiBhbmQgbWVyZ2UgdGhlIHF1ZXJ5XG4gICAgLy8gcHJvcGVydGllcyBiYWNrLlxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5tb2RlbHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBqc29uW2ldID0gdG9EYXRhYmFzZUpzb24oe1xuICAgICAgICBtb2RlbDogdGhpcy5tb2RlbHNbaV0sXG4gICAgICAgIHF1ZXJ5UHJvcHNcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGtuZXhCdWlsZGVyLmluc2VydChqc29uKTtcbiAgfVxuXG4gIG9uQWZ0ZXJRdWVyeShidWlsZGVyLCByZXQpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocmV0KSB8fCAhcmV0Lmxlbmd0aCB8fCByZXQgPT09IHRoaXMubW9kZWxzKSB7XG4gICAgICAvLyBFYXJseSBleGl0IGlmIHRoZXJlIGlzIG5vdGhpbmcgdG8gZG8uXG4gICAgICByZXR1cm4gdGhpcy5tb2RlbHM7XG4gICAgfVxuXG4gICAgaWYgKHJldFswXSAmJiB0eXBlb2YgcmV0WzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgLy8gSWYgdGhlIHVzZXIgc3BlY2lmaWVkIGEgYHJldHVybmluZ2AgY2xhdXNlIHRoZSByZXN1bHQgbWF5IGJlIGFuIGFycmF5IG9mIG9iamVjdHMuXG4gICAgICAvLyBNZXJnZSBhbGwgdmFsdWVzIG9mIHRoZSBvYmplY3RzIHRvIG91ciBtb2RlbHMuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMubW9kZWxzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICB0aGlzLm1vZGVsc1tpXS4kc2V0KHJldFtpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHRoZSByZXR1cm4gdmFsdWUgaXMgbm90IGFuIGFycmF5IG9mIG9iamVjdHMsIHdlIGFzc3VtZSBpdCBpcyBhbiBhcnJheSBvZiBpZGVudGlmaWVycy5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5tb2RlbHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbHNbaV07XG5cbiAgICAgICAgLy8gRG9uJ3Qgc2V0IHRoZSBpZCBpZiB0aGUgbW9kZWwgYWxyZWFkeSBoYXMgb25lLiBNeVNRTCBhbmQgU3FsaXRlIGRvbid0IHJldHVybiB0aGUgY29ycmVjdFxuICAgICAgICAvLyBwcmltYXJ5IGtleSB2YWx1ZSBpZiB0aGUgaWQgaXMgbm90IGdlbmVyYXRlZCBpbiBkYiwgYnV0IGdpdmVuIGV4cGxpY2l0bHkuXG4gICAgICAgIGlmICghbW9kZWwuJGlkKCkpIHtcbiAgICAgICAgICBtb2RlbC4kaWQocmV0W2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1vZGVscztcbiAgfVxuXG4gIG9uQWZ0ZXJJbnRlcm5hbChidWlsZGVyLCBtb2RlbHMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmlzQXJyYXkgPyBtb2RlbHMgOiAobW9kZWxzWzBdIHx8IG51bGwpO1xuICAgIHJldHVybiBtYXBBZnRlckFsbFJldHVybihtb2RlbHMsIG1vZGVsID0+IG1vZGVsLiRhZnRlckluc2VydChidWlsZGVyLmNvbnRleHQoKSksIHJlc3VsdCk7XG4gIH1cbn1cbiJdfQ==