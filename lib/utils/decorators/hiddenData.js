'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = hiddenData;

var _hiddenData = require('../hiddenData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hiddenData(opt) {
  return function (target, property, descriptor) {
    var propName = void 0;
    var append = void 0;

    if ((typeof opt === 'undefined' ? 'undefined' : (0, _typeof3.default)(opt)) === 'object') {
      propName = opt.name || property;
      append = !!opt.append;
    } else {
      propName = opt || property;
      append = false;
    }

    var get = (0, _hiddenData.createGetter)(propName);
    var set = (0, _hiddenData.createSetter)(propName);

    if (typeof descriptor.value === 'function') {
      if (append) {
        descriptor.value = function decorator$hiddenData() {
          if (arguments.length === 0) {
            return get(this);
          } else {
            return appendSet(this, arguments[0], get, set);
          }
        };
      } else {
        descriptor.value = function decorator$hiddenData() {
          if (arguments.length === 0) {
            return get(this);
          } else {
            set(this, arguments[0]);
          }
        };
      }
    }

    if (typeof descriptor.get === 'function') {
      descriptor.get = function decorator$hiddenDataGetter() {
        return get(this);
      };
    }

    if (typeof descriptor.set === 'function') {
      descriptor.set = function decorator$hiddenDataSetter(value) {
        return set(this, value);
      };
    }
  };
}

function appendSet(self, value, get, set) {
  var data = get(self);

  if (Array.isArray(data) && Array.isArray(value)) {
    for (var i = 0, l = value.length; i < l; ++i) {
      data.push(value[i]);
    }
  } else {
    set(self, value);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhpZGRlbkRhdGEuanMiXSwibmFtZXMiOlsiaGlkZGVuRGF0YSIsIm9wdCIsInRhcmdldCIsInByb3BlcnR5IiwiZGVzY3JpcHRvciIsInByb3BOYW1lIiwiYXBwZW5kIiwibmFtZSIsImdldCIsInNldCIsInZhbHVlIiwiZGVjb3JhdG9yJGhpZGRlbkRhdGEiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcHBlbmRTZXQiLCJkZWNvcmF0b3IkaGlkZGVuRGF0YUdldHRlciIsImRlY29yYXRvciRoaWRkZW5EYXRhU2V0dGVyIiwic2VsZiIsImRhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJpIiwibCIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBRXdCQSxVOztBQUZ4Qjs7OztBQUVlLFNBQVNBLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCO0FBQ3RDLFNBQU8sVUFBVUMsTUFBVixFQUFrQkMsUUFBbEIsRUFBNEJDLFVBQTVCLEVBQXdDO0FBQzdDLFFBQUlDLGlCQUFKO0FBQ0EsUUFBSUMsZUFBSjs7QUFFQSxRQUFJLFFBQU9MLEdBQVAsdURBQU9BLEdBQVAsT0FBZSxRQUFuQixFQUE2QjtBQUMzQkksaUJBQVdKLElBQUlNLElBQUosSUFBWUosUUFBdkI7QUFDQUcsZUFBUyxDQUFDLENBQUNMLElBQUlLLE1BQWY7QUFDRCxLQUhELE1BR087QUFDTEQsaUJBQVdKLE9BQU9FLFFBQWxCO0FBQ0FHLGVBQVMsS0FBVDtBQUNEOztBQUVELFFBQU1FLE1BQU0sOEJBQWFILFFBQWIsQ0FBWjtBQUNBLFFBQU1JLE1BQU0sOEJBQWFKLFFBQWIsQ0FBWjs7QUFFQSxRQUFJLE9BQU9ELFdBQVdNLEtBQWxCLEtBQTRCLFVBQWhDLEVBQTRDO0FBQzFDLFVBQUlKLE1BQUosRUFBWTtBQUNWRixtQkFBV00sS0FBWCxHQUFtQixTQUFTQyxvQkFBVCxHQUFnQztBQUNqRCxjQUFJQyxVQUFVQyxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCLG1CQUFPTCxJQUFJLElBQUosQ0FBUDtBQUNELFdBRkQsTUFFTztBQUNMLG1CQUFPTSxVQUFVLElBQVYsRUFBZ0JGLFVBQVUsQ0FBVixDQUFoQixFQUE4QkosR0FBOUIsRUFBbUNDLEdBQW5DLENBQVA7QUFDRDtBQUNGLFNBTkQ7QUFPRCxPQVJELE1BUU87QUFDTEwsbUJBQVdNLEtBQVgsR0FBbUIsU0FBU0Msb0JBQVQsR0FBZ0M7QUFDakQsY0FBSUMsVUFBVUMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQixtQkFBT0wsSUFBSSxJQUFKLENBQVA7QUFDRCxXQUZELE1BRU87QUFDTEMsZ0JBQUksSUFBSixFQUFVRyxVQUFVLENBQVYsQ0FBVjtBQUNEO0FBQ0YsU0FORDtBQU9EO0FBQ0Y7O0FBRUQsUUFBSSxPQUFPUixXQUFXSSxHQUFsQixLQUEwQixVQUE5QixFQUEwQztBQUN4Q0osaUJBQVdJLEdBQVgsR0FBaUIsU0FBU08sMEJBQVQsR0FBc0M7QUFDckQsZUFBT1AsSUFBSSxJQUFKLENBQVA7QUFDRCxPQUZEO0FBR0Q7O0FBRUQsUUFBSSxPQUFPSixXQUFXSyxHQUFsQixLQUEwQixVQUE5QixFQUEwQztBQUN4Q0wsaUJBQVdLLEdBQVgsR0FBaUIsU0FBU08sMEJBQVQsQ0FBb0NOLEtBQXBDLEVBQTJDO0FBQzFELGVBQU9ELElBQUksSUFBSixFQUFVQyxLQUFWLENBQVA7QUFDRCxPQUZEO0FBR0Q7QUFDRixHQTlDRDtBQStDRDs7QUFFRCxTQUFTSSxTQUFULENBQW1CRyxJQUFuQixFQUF5QlAsS0FBekIsRUFBZ0NGLEdBQWhDLEVBQXFDQyxHQUFyQyxFQUEwQztBQUN4QyxNQUFNUyxPQUFPVixJQUFJUyxJQUFKLENBQWI7O0FBRUEsTUFBSUUsTUFBTUMsT0FBTixDQUFjRixJQUFkLEtBQXVCQyxNQUFNQyxPQUFOLENBQWNWLEtBQWQsQ0FBM0IsRUFBaUQ7QUFDL0MsU0FBSyxJQUFJVyxJQUFJLENBQVIsRUFBV0MsSUFBSVosTUFBTUcsTUFBMUIsRUFBa0NRLElBQUlDLENBQXRDLEVBQXlDLEVBQUVELENBQTNDLEVBQThDO0FBQzVDSCxXQUFLSyxJQUFMLENBQVViLE1BQU1XLENBQU4sQ0FBVjtBQUNEO0FBQ0YsR0FKRCxNQUlPO0FBQ0xaLFFBQUlRLElBQUosRUFBVVAsS0FBVjtBQUNEO0FBQ0YiLCJmaWxlIjoiaGlkZGVuRGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlR2V0dGVyLCBjcmVhdGVTZXR0ZXJ9IGZyb20gJy4uL2hpZGRlbkRhdGEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoaWRkZW5EYXRhKG9wdCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHksIGRlc2NyaXB0b3IpIHtcbiAgICBsZXQgcHJvcE5hbWU7XG4gICAgbGV0IGFwcGVuZDtcblxuICAgIGlmICh0eXBlb2Ygb3B0ID09PSAnb2JqZWN0Jykge1xuICAgICAgcHJvcE5hbWUgPSBvcHQubmFtZSB8fCBwcm9wZXJ0eTtcbiAgICAgIGFwcGVuZCA9ICEhb3B0LmFwcGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvcE5hbWUgPSBvcHQgfHwgcHJvcGVydHk7XG4gICAgICBhcHBlbmQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXQgPSBjcmVhdGVHZXR0ZXIocHJvcE5hbWUpO1xuICAgIGNvbnN0IHNldCA9IGNyZWF0ZVNldHRlcihwcm9wTmFtZSk7XG5cbiAgICBpZiAodHlwZW9mIGRlc2NyaXB0b3IudmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChhcHBlbmQpIHtcbiAgICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uIGRlY29yYXRvciRoaWRkZW5EYXRhKCkge1xuICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0KHRoaXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYXBwZW5kU2V0KHRoaXMsIGFyZ3VtZW50c1swXSwgZ2V0LCBzZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiBkZWNvcmF0b3IkaGlkZGVuRGF0YSgpIHtcbiAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldCh0aGlzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0KHRoaXMsIGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGRlc2NyaXB0b3IuZ2V0ID0gZnVuY3Rpb24gZGVjb3JhdG9yJGhpZGRlbkRhdGFHZXR0ZXIoKSB7XG4gICAgICAgIHJldHVybiBnZXQodGhpcyk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGVzY3JpcHRvci5zZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gZnVuY3Rpb24gZGVjb3JhdG9yJGhpZGRlbkRhdGFTZXR0ZXIodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHNldCh0aGlzLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBhcHBlbmRTZXQoc2VsZiwgdmFsdWUsIGdldCwgc2V0KSB7XG4gIGNvbnN0IGRhdGEgPSBnZXQoc2VsZik7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgZGF0YS5wdXNoKHZhbHVlW2ldKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc2V0KHNlbGYsIHZhbHVlKTtcbiAgfVxufSJdfQ==