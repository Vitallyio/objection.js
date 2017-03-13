'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validator = function () {
  function Validator() {
    (0, _classCallCheck3.default)(this, Validator);
  }

  Validator.prototype.beforeValidate = function beforeValidate(_ref) {
    var model = _ref.model,
        json = _ref.json,
        options = _ref.options;

    model.$beforeValidate(null, json, options);
  };

  Validator.prototype.validate = function validate(_ref2) {
    var model = _ref2.model,
        json = _ref2.json,
        options = _ref2.options;

    throw new Error('not implemented');
  };

  Validator.prototype.afterValidate = function afterValidate(_ref3) {
    var model = _ref3.model,
        json = _ref3.json,
        options = _ref3.options;

    model.$afterValidate(json, options);
  };

  return Validator;
}();

exports.default = Validator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZhbGlkYXRvci5qcyJdLCJuYW1lcyI6WyJWYWxpZGF0b3IiLCJiZWZvcmVWYWxpZGF0ZSIsIm1vZGVsIiwianNvbiIsIm9wdGlvbnMiLCIkYmVmb3JlVmFsaWRhdGUiLCJ2YWxpZGF0ZSIsIkVycm9yIiwiYWZ0ZXJWYWxpZGF0ZSIsIiRhZnRlclZhbGlkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQXFCQSxTOzs7OztzQkFDbkJDLGMsaUNBQXVDO0FBQUEsUUFBdkJDLEtBQXVCLFFBQXZCQSxLQUF1QjtBQUFBLFFBQWhCQyxJQUFnQixRQUFoQkEsSUFBZ0I7QUFBQSxRQUFWQyxPQUFVLFFBQVZBLE9BQVU7O0FBQ3JDRixVQUFNRyxlQUFOLENBQXNCLElBQXRCLEVBQTRCRixJQUE1QixFQUFrQ0MsT0FBbEM7QUFDRCxHOztzQkFFREUsUSw0QkFBaUM7QUFBQSxRQUF2QkosS0FBdUIsU0FBdkJBLEtBQXVCO0FBQUEsUUFBaEJDLElBQWdCLFNBQWhCQSxJQUFnQjtBQUFBLFFBQVZDLE9BQVUsU0FBVkEsT0FBVTs7QUFDL0IsVUFBTSxJQUFJRyxLQUFKLENBQVUsaUJBQVYsQ0FBTjtBQUNELEc7O3NCQUVEQyxhLGlDQUFzQztBQUFBLFFBQXZCTixLQUF1QixTQUF2QkEsS0FBdUI7QUFBQSxRQUFoQkMsSUFBZ0IsU0FBaEJBLElBQWdCO0FBQUEsUUFBVkMsT0FBVSxTQUFWQSxPQUFVOztBQUNwQ0YsVUFBTU8sY0FBTixDQUFxQk4sSUFBckIsRUFBMkJDLE9BQTNCO0FBQ0QsRzs7Ozs7a0JBWGtCSixTIiwiZmlsZSI6IlZhbGlkYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRvciB7XG4gIGJlZm9yZVZhbGlkYXRlKHttb2RlbCwganNvbiwgb3B0aW9uc30pIHtcbiAgICBtb2RlbC4kYmVmb3JlVmFsaWRhdGUobnVsbCwganNvbiwgb3B0aW9ucyk7XG4gIH1cblxuICB2YWxpZGF0ZSh7bW9kZWwsIGpzb24sIG9wdGlvbnN9KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdub3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIGFmdGVyVmFsaWRhdGUoe21vZGVsLCBqc29uLCBvcHRpb25zfSkge1xuICAgIG1vZGVsLiRhZnRlclZhbGlkYXRlKGpzb24sIG9wdGlvbnMpO1xuICB9XG59Il19