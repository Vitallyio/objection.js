'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

exports.init = init;
exports.createGetter = createGetter;
exports.createSetter = createSetter;
exports.inheritHiddenData = inheritHiddenData;
exports.copyHiddenData = copyHiddenData;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HIDDEN_DATA = '$$hiddenData';

function init(obj, data) {
  (0, _defineProperty2.default)(obj, HIDDEN_DATA, {
    enumerable: false,
    writable: true,
    value: data || (0, _create2.default)(null)
  });
}

function createGetter(propName) {
  return new Function('obj', '\n    if (obj.hasOwnProperty("' + HIDDEN_DATA + '")) {\n      return obj.' + HIDDEN_DATA + '.' + propName + ';\n    } else {\n      return undefined;\n    }\n  ');
}

function createSetter(propName) {
  return new Function('obj', 'data', '\n    if (!obj.hasOwnProperty("' + HIDDEN_DATA + '")) {\n      Object.defineProperty(obj, "' + HIDDEN_DATA + '", {\n        enumerable: false,\n        writable: true,\n        value: Object.create(null)\n      });\n    }\n\n    obj.' + HIDDEN_DATA + '.' + propName + ' = data;\n  ');
}

function inheritHiddenData(src, dst) {
  init(dst, (0, _create2.default)(src[HIDDEN_DATA] || null));
}

function copyHiddenData(src, dst) {
  init(dst, src[HIDDEN_DATA]);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhpZGRlbkRhdGEuanMiXSwibmFtZXMiOlsiaW5pdCIsImNyZWF0ZUdldHRlciIsImNyZWF0ZVNldHRlciIsImluaGVyaXRIaWRkZW5EYXRhIiwiY29weUhpZGRlbkRhdGEiLCJISURERU5fREFUQSIsIm9iaiIsImRhdGEiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJ2YWx1ZSIsInByb3BOYW1lIiwiRnVuY3Rpb24iLCJzcmMiLCJkc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1FBRWdCQSxJLEdBQUFBLEk7UUFRQUMsWSxHQUFBQSxZO1FBVUFDLFksR0FBQUEsWTtRQWNBQyxpQixHQUFBQSxpQjtRQUlBQyxjLEdBQUFBLGM7Ozs7QUF0Q2hCLElBQU1DLGNBQWMsY0FBcEI7O0FBRU8sU0FBU0wsSUFBVCxDQUFjTSxHQUFkLEVBQW1CQyxJQUFuQixFQUF5QjtBQUM5QixnQ0FBc0JELEdBQXRCLEVBQTJCRCxXQUEzQixFQUF3QztBQUN0Q0csZ0JBQVksS0FEMEI7QUFFdENDLGNBQVUsSUFGNEI7QUFHdENDLFdBQU9ILFFBQVEsc0JBQWMsSUFBZDtBQUh1QixHQUF4QztBQUtEOztBQUVNLFNBQVNOLFlBQVQsQ0FBc0JVLFFBQXRCLEVBQWdDO0FBQ3JDLFNBQU8sSUFBSUMsUUFBSixDQUFhLEtBQWIscUNBQ3FCUCxXQURyQixnQ0FFVUEsV0FGVixTQUV5Qk0sUUFGekIseURBQVA7QUFPRDs7QUFFTSxTQUFTVCxZQUFULENBQXNCUyxRQUF0QixFQUFnQztBQUNyQyxTQUFPLElBQUlDLFFBQUosQ0FBYSxLQUFiLEVBQW9CLE1BQXBCLHNDQUNzQlAsV0FEdEIsaURBRTJCQSxXQUYzQixtSUFTQ0EsV0FURCxTQVNnQk0sUUFUaEIsa0JBQVA7QUFXRDs7QUFFTSxTQUFTUixpQkFBVCxDQUEyQlUsR0FBM0IsRUFBZ0NDLEdBQWhDLEVBQXFDO0FBQzFDZCxPQUFLYyxHQUFMLEVBQVUsc0JBQWNELElBQUlSLFdBQUosS0FBb0IsSUFBbEMsQ0FBVjtBQUNEOztBQUVNLFNBQVNELGNBQVQsQ0FBd0JTLEdBQXhCLEVBQTZCQyxHQUE3QixFQUFrQztBQUN2Q2QsT0FBS2MsR0FBTCxFQUFVRCxJQUFJUixXQUFKLENBQVY7QUFDRCIsImZpbGUiOiJoaWRkZW5EYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgSElEREVOX0RBVEEgPSAnJCRoaWRkZW5EYXRhJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQob2JqLCBkYXRhKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIEhJRERFTl9EQVRBLCB7XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6IGRhdGEgfHwgT2JqZWN0LmNyZWF0ZShudWxsKVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdldHRlcihwcm9wTmFtZSkge1xuICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdvYmonLCBgXG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShcIiR7SElEREVOX0RBVEF9XCIpKSB7XG4gICAgICByZXR1cm4gb2JqLiR7SElEREVOX0RBVEF9LiR7cHJvcE5hbWV9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZXR0ZXIocHJvcE5hbWUpIHtcbiAgcmV0dXJuIG5ldyBGdW5jdGlvbignb2JqJywgJ2RhdGEnLCBgXG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoXCIke0hJRERFTl9EQVRBfVwiKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgXCIke0hJRERFTl9EQVRBfVwiLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG9iai4ke0hJRERFTl9EQVRBfS4ke3Byb3BOYW1lfSA9IGRhdGE7XG4gIGApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5oZXJpdEhpZGRlbkRhdGEoc3JjLCBkc3QpIHtcbiAgaW5pdChkc3QsIE9iamVjdC5jcmVhdGUoc3JjW0hJRERFTl9EQVRBXSB8fCBudWxsKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5SGlkZGVuRGF0YShzcmMsIGRzdCkge1xuICBpbml0KGRzdCwgc3JjW0hJRERFTl9EQVRBXSk7XG59Il19