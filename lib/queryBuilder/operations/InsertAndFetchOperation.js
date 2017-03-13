'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _InsertOperation = require('./InsertOperation');

var _InsertOperation2 = _interopRequireDefault(_InsertOperation);

var _DelegateOperation2 = require('./DelegateOperation');

var _DelegateOperation3 = _interopRequireDefault(_DelegateOperation2);

var _promiseUtils = require('../../utils/promiseUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InsertAndFetchOperation = function (_DelegateOperation) {
  (0, _inherits3.default)(InsertAndFetchOperation, _DelegateOperation);

  function InsertAndFetchOperation(name, opt) {
    (0, _classCallCheck3.default)(this, InsertAndFetchOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _DelegateOperation.call(this, name, opt));

    if (!_this.delegate.is(_InsertOperation2.default)) {
      throw new Error('Invalid delegate');
    }
    return _this;
  }

  InsertAndFetchOperation.prototype.onAfterInternal = function onAfterInternal(builder, inserted) {
    var maybePromise = _DelegateOperation.prototype.onAfterInternal.call(this, builder, inserted);

    return (0, _promiseUtils.after)(maybePromise, function (insertedModels) {
      var insertedModelArray = Array.isArray(insertedModels) ? insertedModels : [insertedModels];
      var idProps = builder.modelClass().getIdPropertyArray();

      return builder.modelClass().query().childQueryOf(builder).whereInComposite(builder.modelClass().getFullIdColumn(), insertedModelArray.map(function (model) {
        return model.$id();
      })).then(function (fetchedModels) {
        fetchedModels = _lodash2.default.keyBy(fetchedModels, function (model) {
          return model.$propKey(idProps);
        });

        // Instead of returning the freshly fetched models, update the input
        // models with the fresh values.
        insertedModelArray.forEach(function (insertedModel) {
          insertedModel.$set(fetchedModels[insertedModel.$propKey(idProps)]);
        });

        return insertedModels;
      });
    });
  };

  return InsertAndFetchOperation;
}(_DelegateOperation3.default);

exports.default = InsertAndFetchOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluc2VydEFuZEZldGNoT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIkluc2VydEFuZEZldGNoT3BlcmF0aW9uIiwibmFtZSIsIm9wdCIsImRlbGVnYXRlIiwiaXMiLCJFcnJvciIsIm9uQWZ0ZXJJbnRlcm5hbCIsImJ1aWxkZXIiLCJpbnNlcnRlZCIsIm1heWJlUHJvbWlzZSIsImluc2VydGVkTW9kZWxBcnJheSIsIkFycmF5IiwiaXNBcnJheSIsImluc2VydGVkTW9kZWxzIiwiaWRQcm9wcyIsIm1vZGVsQ2xhc3MiLCJnZXRJZFByb3BlcnR5QXJyYXkiLCJxdWVyeSIsImNoaWxkUXVlcnlPZiIsIndoZXJlSW5Db21wb3NpdGUiLCJnZXRGdWxsSWRDb2x1bW4iLCJtYXAiLCJtb2RlbCIsIiRpZCIsInRoZW4iLCJmZXRjaGVkTW9kZWxzIiwia2V5QnkiLCIkcHJvcEtleSIsImZvckVhY2giLCJpbnNlcnRlZE1vZGVsIiwiJHNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0lBRXFCQSx1Qjs7O0FBRW5CLG1DQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQiw4QkFBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUdyQixRQUFJLENBQUMsTUFBS0MsUUFBTCxDQUFjQyxFQUFkLDJCQUFMLEVBQXdDO0FBQ3RDLFlBQU0sSUFBSUMsS0FBSixDQUFVLGtCQUFWLENBQU47QUFDRDtBQUxvQjtBQU10Qjs7b0NBRURDLGUsNEJBQWdCQyxPLEVBQVNDLFEsRUFBVTtBQUNqQyxRQUFNQyxlQUFlLDZCQUFNSCxlQUFOLFlBQXNCQyxPQUF0QixFQUErQkMsUUFBL0IsQ0FBckI7O0FBRUEsV0FBTyx5QkFBTUMsWUFBTixFQUFvQiwwQkFBa0I7QUFDM0MsVUFBTUMscUJBQXFCQyxNQUFNQyxPQUFOLENBQWNDLGNBQWQsSUFBZ0NBLGNBQWhDLEdBQWlELENBQUNBLGNBQUQsQ0FBNUU7QUFDQSxVQUFNQyxVQUFVUCxRQUFRUSxVQUFSLEdBQXFCQyxrQkFBckIsRUFBaEI7O0FBRUEsYUFBT1QsUUFBUVEsVUFBUixHQUNKRSxLQURJLEdBRUpDLFlBRkksQ0FFU1gsT0FGVCxFQUdKWSxnQkFISSxDQUdhWixRQUFRUSxVQUFSLEdBQXFCSyxlQUFyQixFQUhiLEVBR3FEVixtQkFBbUJXLEdBQW5CLENBQXVCO0FBQUEsZUFBU0MsTUFBTUMsR0FBTixFQUFUO0FBQUEsT0FBdkIsQ0FIckQsRUFJSkMsSUFKSSxDQUlDLHlCQUFpQjtBQUNyQkMsd0JBQWdCLGlCQUFFQyxLQUFGLENBQVFELGFBQVIsRUFBdUI7QUFBQSxpQkFBU0gsTUFBTUssUUFBTixDQUFlYixPQUFmLENBQVQ7QUFBQSxTQUF2QixDQUFoQjs7QUFFQTtBQUNBO0FBQ0FKLDJCQUFtQmtCLE9BQW5CLENBQTJCLHlCQUFpQjtBQUMxQ0Msd0JBQWNDLElBQWQsQ0FBbUJMLGNBQWNJLGNBQWNGLFFBQWQsQ0FBdUJiLE9BQXZCLENBQWQsQ0FBbkI7QUFDRCxTQUZEOztBQUlBLGVBQU9ELGNBQVA7QUFDRCxPQWRJLENBQVA7QUFlRCxLQW5CTSxDQUFQO0FBb0JELEc7Ozs7O2tCQWpDa0JiLHVCIiwiZmlsZSI6Ikluc2VydEFuZEZldGNoT3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBJbnNlcnRPcGVyYXRpb24gZnJvbSAnLi9JbnNlcnRPcGVyYXRpb24nO1xuaW1wb3J0IERlbGVnYXRlT3BlcmF0aW9uIGZyb20gJy4vRGVsZWdhdGVPcGVyYXRpb24nO1xuaW1wb3J0IHthZnRlcn0gZnJvbSAnLi4vLi4vdXRpbHMvcHJvbWlzZVV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5zZXJ0QW5kRmV0Y2hPcGVyYXRpb24gZXh0ZW5kcyBEZWxlZ2F0ZU9wZXJhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgb3B0KSB7XG4gICAgc3VwZXIobmFtZSwgb3B0KTtcblxuICAgIGlmICghdGhpcy5kZWxlZ2F0ZS5pcyhJbnNlcnRPcGVyYXRpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZGVsZWdhdGUnKTtcbiAgICB9XG4gIH1cblxuICBvbkFmdGVySW50ZXJuYWwoYnVpbGRlciwgaW5zZXJ0ZWQpIHtcbiAgICBjb25zdCBtYXliZVByb21pc2UgPSBzdXBlci5vbkFmdGVySW50ZXJuYWwoYnVpbGRlciwgaW5zZXJ0ZWQpO1xuXG4gICAgcmV0dXJuIGFmdGVyKG1heWJlUHJvbWlzZSwgaW5zZXJ0ZWRNb2RlbHMgPT4ge1xuICAgICAgY29uc3QgaW5zZXJ0ZWRNb2RlbEFycmF5ID0gQXJyYXkuaXNBcnJheShpbnNlcnRlZE1vZGVscykgPyBpbnNlcnRlZE1vZGVscyA6IFtpbnNlcnRlZE1vZGVsc107XG4gICAgICBjb25zdCBpZFByb3BzID0gYnVpbGRlci5tb2RlbENsYXNzKCkuZ2V0SWRQcm9wZXJ0eUFycmF5KCk7XG5cbiAgICAgIHJldHVybiBidWlsZGVyLm1vZGVsQ2xhc3MoKVxuICAgICAgICAucXVlcnkoKVxuICAgICAgICAuY2hpbGRRdWVyeU9mKGJ1aWxkZXIpXG4gICAgICAgIC53aGVyZUluQ29tcG9zaXRlKGJ1aWxkZXIubW9kZWxDbGFzcygpLmdldEZ1bGxJZENvbHVtbigpLCBpbnNlcnRlZE1vZGVsQXJyYXkubWFwKG1vZGVsID0+IG1vZGVsLiRpZCgpKSlcbiAgICAgICAgLnRoZW4oZmV0Y2hlZE1vZGVscyA9PiB7XG4gICAgICAgICAgZmV0Y2hlZE1vZGVscyA9IF8ua2V5QnkoZmV0Y2hlZE1vZGVscywgbW9kZWwgPT4gbW9kZWwuJHByb3BLZXkoaWRQcm9wcykpO1xuXG4gICAgICAgICAgLy8gSW5zdGVhZCBvZiByZXR1cm5pbmcgdGhlIGZyZXNobHkgZmV0Y2hlZCBtb2RlbHMsIHVwZGF0ZSB0aGUgaW5wdXRcbiAgICAgICAgICAvLyBtb2RlbHMgd2l0aCB0aGUgZnJlc2ggdmFsdWVzLlxuICAgICAgICAgIGluc2VydGVkTW9kZWxBcnJheS5mb3JFYWNoKGluc2VydGVkTW9kZWwgPT4ge1xuICAgICAgICAgICAgaW5zZXJ0ZWRNb2RlbC4kc2V0KGZldGNoZWRNb2RlbHNbaW5zZXJ0ZWRNb2RlbC4kcHJvcEtleShpZFByb3BzKV0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGluc2VydGVkTW9kZWxzO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19