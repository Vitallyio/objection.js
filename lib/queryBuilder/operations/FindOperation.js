'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

var _Model = require('../../model/Model');

var _Model2 = _interopRequireDefault(_Model);

var _QueryBuilderOperation = require('./QueryBuilderOperation');

var _QueryBuilderOperation2 = _interopRequireDefault(_QueryBuilderOperation);

var _promiseUtils = require('../../utils/promiseUtils');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FindOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(FindOperation, _QueryBuilderOperatio);

  function FindOperation() {
    (0, _classCallCheck3.default)(this, FindOperation);
    return (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.apply(this, arguments));
  }

  FindOperation.prototype.clone = function clone(props) {
    props = props || {};
    return new this.constructor(this.name, props.opt || (0, _clone3.default)(this.opt));
  };

  FindOperation.prototype.onAfter = function onAfter(builder, results) {
    if (this.opt.dontCallAfterGet) {
      return results;
    } else {
      return callAfterGet(builder.context(), results, !!this.opt.callAfterGetDeeply);
    }
  };

  return FindOperation;
}(_QueryBuilderOperation2.default);

exports.default = FindOperation;


function callAfterGet(ctx, results, deep) {
  if (Array.isArray(results)) {
    if (results.length === 1) {
      return callAfterGetForOne(ctx, results[0], results, deep);
    } else {
      return callAfterGetArray(ctx, results, deep);
    }
  } else {
    return callAfterGetForOne(ctx, results, results, deep);
  }
}

function callAfterGetArray(ctx, results, deep) {
  if (results.length === 0 || (0, _typeof3.default)(results[0]) !== 'object') {
    return results;
  }

  var mapped = new Array(results.length);
  var containsPromise = false;

  for (var i = 0, l = results.length; i < l; ++i) {
    mapped[i] = callAfterGetForOne(ctx, results[i], results[i], deep);

    if ((0, _promiseUtils.isPromise)(mapped[i])) {
      containsPromise = true;
    }
  }

  if (containsPromise) {
    return _bluebird2.default.all(mapped);
  } else {
    return mapped;
  }
}

function callAfterGetForOne(ctx, model, result, deep) {
  if (!(model instanceof _Model2.default)) {
    return result;
  }

  if (deep) {
    var results = [];
    var containsPromise = callAfterGetForRelations(ctx, model, results);

    if (containsPromise) {
      return _bluebird2.default.all(results).then(function () {
        return doCallAfterGet(ctx, model, result);
      });
    } else {
      return doCallAfterGet(ctx, model, result);
    }
  } else {
    return doCallAfterGet(ctx, model, result);
  }
}

function callAfterGetForRelations(ctx, model, results) {
  var relations = model.constructor.getRelationArray();
  var containsPromise = false;

  for (var i = 0, l = relations.length; i < l; ++i) {
    var relName = relations[i].name;

    if (model[relName]) {
      var maybePromise = callAfterGet(ctx, model[relName], true);

      if ((0, _promiseUtils.isPromise)(maybePromise)) {
        containsPromise = true;
      }

      results.push(maybePromise);
    }
  }

  return containsPromise;
}

function doCallAfterGet(ctx, model, result) {
  if (model.$afterGet !== _Model2.default.prototype.$afterGet) {
    var maybePromise = model.$afterGet(ctx);

    if (maybePromise instanceof _bluebird2.default) {
      return maybePromise.return(result);
    } else if ((0, _promiseUtils.isPromise)(maybePromise)) {
      return maybePromise.then(function () {
        return result;
      });
    } else {
      return result;
    }
  } else {
    return result;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZpbmRPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiRmluZE9wZXJhdGlvbiIsImNsb25lIiwicHJvcHMiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJvcHQiLCJvbkFmdGVyIiwiYnVpbGRlciIsInJlc3VsdHMiLCJkb250Q2FsbEFmdGVyR2V0IiwiY2FsbEFmdGVyR2V0IiwiY29udGV4dCIsImNhbGxBZnRlckdldERlZXBseSIsImN0eCIsImRlZXAiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJjYWxsQWZ0ZXJHZXRGb3JPbmUiLCJjYWxsQWZ0ZXJHZXRBcnJheSIsIm1hcHBlZCIsImNvbnRhaW5zUHJvbWlzZSIsImkiLCJsIiwiYWxsIiwibW9kZWwiLCJyZXN1bHQiLCJjYWxsQWZ0ZXJHZXRGb3JSZWxhdGlvbnMiLCJ0aGVuIiwiZG9DYWxsQWZ0ZXJHZXQiLCJyZWxhdGlvbnMiLCJnZXRSZWxhdGlvbkFycmF5IiwicmVsTmFtZSIsIm1heWJlUHJvbWlzZSIsInB1c2giLCIkYWZ0ZXJHZXQiLCJwcm90b3R5cGUiLCJyZXR1cm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztJQUVxQkEsYTs7Ozs7Ozs7MEJBRW5CQyxLLGtCQUFNQyxLLEVBQU87QUFDWEEsWUFBUUEsU0FBUyxFQUFqQjtBQUNBLFdBQU8sSUFBSSxLQUFLQyxXQUFULENBQXFCLEtBQUtDLElBQTFCLEVBQWdDRixNQUFNRyxHQUFOLElBQWEscUJBQU0sS0FBS0EsR0FBWCxDQUE3QyxDQUFQO0FBQ0QsRzs7MEJBRURDLE8sb0JBQVFDLE8sRUFBU0MsTyxFQUFTO0FBQ3hCLFFBQUksS0FBS0gsR0FBTCxDQUFTSSxnQkFBYixFQUErQjtBQUM3QixhQUFPRCxPQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsYUFBT0UsYUFBYUgsUUFBUUksT0FBUixFQUFiLEVBQWdDSCxPQUFoQyxFQUF5QyxDQUFDLENBQUMs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VUFBVWIsTUFBOUIsRUFBc0NLLElBQUlDLENBQTFDLEVBQTZDLEVBQUVELENBQS9DLEVBQWtEO0FBQ2hELFFBQU1VLFVBQVVGLFVBQVVSLENBQVYsRUFBYWxCLElBQTdCOztBQUVBLFFBQUlxQixNQUFNTyxPQUFOLENBQUosRUFBb0I7QUFDbEIsVUFBTUMsZUFBZXZCLGFBQWFHLEdBQWIsRUFBa0JZLE1BQU1PLE9BQU4sQ0FBbEIsRUFBa0MsSUFBbEMsQ0FBckI7O0FBRUEsVUFBSSw2QkFBVUMsWUFBVixDQUFKLEVBQTZCO0FBQzNCWiwwQkFBa0IsSUFBbEI7QUFDRDs7QUFFRGIsY0FBUTBCLElBQVIsQ0FBYUQsWUFBYjtBQUNEO0FBQ0Y7O0FBRUQsU0FBT1osZUFBUDtBQUNEOztBQUVELFNBQVNRLGNBQVQsQ0FBd0JoQixHQUF4QixFQUE2QlksS0FBN0IsRUFBb0NDLE1BQXBDLEVBQTRDO0FBQzFDLE1BQUlELE1BQU1VLFNBQU4sS0FBb0IsZ0JBQU1DLFNBQU4sQ0FBZ0JELFNBQXhDLEVBQW1EO0FBQ2pELFFBQU1GLGVBQWVSLE1BQU1VLFNBQU4sQ0FBZ0J0QixHQUFoQixDQUFyQjs7QUFFQSxRQUFJb0IsMENBQUosRUFBcUM7QUFDbkMsYUFBT0EsYUFBYUksTUFBYixDQUFvQlgsTUFBcEIsQ0FBUDtBQUNELEtBRkQsTUFFTyxJQUFJLDZCQUFVTyxZQUFWLENBQUosRUFBNkI7QUFDbEMsYUFBT0EsYUFBYUwsSUFBYixDQUFrQjtBQUFBLGVBQU1GLE1BQU47QUFBQSxPQUFsQixDQUFQO0FBQ0QsS0FGTSxNQUVBO0FBQ0wsYUFBT0EsTUFBUDtBQUNEO0FBQ0YsR0FWRCxNQVVPO0FBQ0wsV0FBT0EsTUFBUDtBQUNEO0FBQ0YiLCJmaWxlIjoiRmluZE9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjbG9uZSBmcm9tICdsb2Rhc2gvY2xvbmUnO1xuaW1wb3J0IE1vZGVsIGZyb20gJy4uLy4uL21vZGVsL01vZGVsJztcbmltcG9ydCBRdWVyeUJ1aWxkZXJPcGVyYXRpb24gZnJvbSAnLi9RdWVyeUJ1aWxkZXJPcGVyYXRpb24nO1xuaW1wb3J0IHtpc1Byb21pc2V9IGZyb20gJy4uLy4uL3V0aWxzL3Byb21pc2VVdGlscyc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbmRPcGVyYXRpb24gZXh0ZW5kcyBRdWVyeUJ1aWxkZXJPcGVyYXRpb24ge1xuXG4gIGNsb25lKHByb3BzKSB7XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5uYW1lLCBwcm9wcy5vcHQgfHwgY2xvbmUodGhpcy5vcHQpKTtcbiAgfVxuXG4gIG9uQWZ0ZXIoYnVpbGRlciwgcmVzdWx0cykge1xuICAgIGlmICh0aGlzLm9wdC5kb250Q2FsbEFmdGVyR2V0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNhbGxBZnRlckdldChidWlsZGVyLmNvbnRleHQoKSwgcmVzdWx0cywgISF0aGlzLm9wdC5jYWxsQWZ0ZXJHZXREZWVwbHkpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsQWZ0ZXJHZXQoY3R4LCByZXN1bHRzLCBkZWVwKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdHMpKSB7XG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gY2FsbEFmdGVyR2V0Rm9yT25lKGN0eCwgcmVzdWx0c1swXSwgcmVzdWx0cywgZGVlcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjYWxsQWZ0ZXJHZXRBcnJheShjdHgsIHJlc3VsdHMsIGRlZXApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY2FsbEFmdGVyR2V0Rm9yT25lKGN0eCwgcmVzdWx0cywgcmVzdWx0cywgZGVlcCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEFmdGVyR2V0QXJyYXkoY3R4LCByZXN1bHRzLCBkZWVwKSB7XG4gIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCB8fCB0eXBlb2YgcmVzdWx0c1swXSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIGNvbnN0IG1hcHBlZCA9IG5ldyBBcnJheShyZXN1bHRzLmxlbmd0aCk7XG4gIGxldCBjb250YWluc1Byb21pc2UgPSBmYWxzZTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IHJlc3VsdHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgbWFwcGVkW2ldID0gY2FsbEFmdGVyR2V0Rm9yT25lKGN0eCwgcmVzdWx0c1tpXSwgcmVzdWx0c1tpXSwgZGVlcCk7XG5cbiAgICBpZiAoaXNQcm9taXNlKG1hcHBlZFtpXSkpIHtcbiAgICAgIGNvbnRhaW5zUHJvbWlzZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNvbnRhaW5zUHJvbWlzZSkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChtYXBwZWQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtYXBwZWQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEFmdGVyR2V0Rm9yT25lKGN0eCwgbW9kZWwsIHJlc3VsdCwgZGVlcCkge1xuICBpZiAoIShtb2RlbCBpbnN0YW5jZW9mIE1vZGVsKSkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAoZGVlcCkge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBjb25zdCBjb250YWluc1Byb21pc2UgPSBjYWxsQWZ0ZXJHZXRGb3JSZWxhdGlvbnMoY3R4LCBtb2RlbCwgcmVzdWx0cyk7XG5cbiAgICBpZiAoY29udGFpbnNQcm9taXNlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwocmVzdWx0cykudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiBkb0NhbGxBZnRlckdldChjdHgsIG1vZGVsLCByZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkb0NhbGxBZnRlckdldChjdHgsIG1vZGVsLCByZXN1bHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZG9DYWxsQWZ0ZXJHZXQoY3R4LCBtb2RlbCwgcmVzdWx0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsQWZ0ZXJHZXRGb3JSZWxhdGlvbnMoY3R4LCBtb2RlbCwgcmVzdWx0cykge1xuICBjb25zdCByZWxhdGlvbnMgPSBtb2RlbC5jb25zdHJ1Y3Rvci5nZXRSZWxhdGlvbkFycmF5KCk7XG4gIGxldCBjb250YWluc1Byb21pc2UgPSBmYWxzZTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IHJlbGF0aW9ucy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCByZWxOYW1lID0gcmVsYXRpb25zW2ldLm5hbWU7XG5cbiAgICBpZiAobW9kZWxbcmVsTmFtZV0pIHtcbiAgICAgIGNvbnN0IG1heWJlUHJvbWlzZSA9IGNhbGxBZnRlckdldChjdHgsIG1vZGVsW3JlbE5hbWVdLCB0cnVlKTtcblxuICAgICAgaWYgKGlzUHJvbWlzZShtYXliZVByb21pc2UpKSB7XG4gICAgICAgIGNvbnRhaW5zUHJvbWlzZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdHMucHVzaChtYXliZVByb21pc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb250YWluc1Byb21pc2U7XG59XG5cbmZ1bmN0aW9uIGRvQ2FsbEFmdGVyR2V0KGN0eCwgbW9kZWwsIHJlc3VsdCkge1xuICBpZiAobW9kZWwuJGFmdGVyR2V0ICE9PSBNb2RlbC5wcm90b3R5cGUuJGFmdGVyR2V0KSB7XG4gICAgY29uc3QgbWF5YmVQcm9taXNlID0gbW9kZWwuJGFmdGVyR2V0KGN0eCk7XG5cbiAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIG1heWJlUHJvbWlzZS5yZXR1cm4ocmVzdWx0KTtcbiAgICB9IGVsc2UgaWYgKGlzUHJvbWlzZShtYXliZVByb21pc2UpKSB7XG4gICAgICByZXR1cm4gbWF5YmVQcm9taXNlLnRoZW4oKCkgPT4gcmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19