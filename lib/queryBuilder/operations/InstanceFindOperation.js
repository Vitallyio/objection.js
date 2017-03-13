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

var _FindOperation2 = require('./FindOperation');

var _FindOperation3 = _interopRequireDefault(_FindOperation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InstanceFindOperation = function (_FindOperation) {
  (0, _inherits3.default)(InstanceFindOperation, _FindOperation);

  function InstanceFindOperation(name, opt) {
    (0, _classCallCheck3.default)(this, InstanceFindOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _FindOperation.call(this, name, opt));

    _this.instance = opt.instance;
    return _this;
  }

  InstanceFindOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    builder.whereComposite(builder.modelClass().getFullIdColumn(), this.instance.$id()).first();
  };

  return InstanceFindOperation;
}(_FindOperation3.default);

exports.default = InstanceFindOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluc3RhbmNlRmluZE9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJJbnN0YW5jZUZpbmRPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwiaW5zdGFuY2UiLCJvbkJlZm9yZUJ1aWxkIiwiYnVpbGRlciIsIndoZXJlQ29tcG9zaXRlIiwibW9kZWxDbGFzcyIsImdldEZ1bGxJZENvbHVtbiIsIiRpZCIsImZpcnN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEscUI7OztBQUVuQixpQ0FBWUMsSUFBWixFQUFrQkMsR0FBbEIsRUFBdUI7QUFBQTs7QUFBQSwrREFDckIsMEJBQU1ELElBQU4sRUFBWUMsR0FBWixDQURxQjs7QUFFckIsVUFBS0MsUUFBTCxHQUFnQkQsSUFBSUMsUUFBcEI7QUFGcUI7QUFHdEI7O2tDQUVEQyxhLDBCQUFjQyxPLEVBQVM7QUFDckJBLFlBQVFDLGNBQVIsQ0FBdUJELFFBQVFFLFVBQVIsR0FBcUJDLGVBQXJCLEVBQXZCLEVBQStELEtBQUtMLFFBQUwsQ0FBY00sR0FBZCxFQUEvRCxFQUFvRkMsS0FBcEY7QUFDRCxHOzs7OztrQkFUa0JWLHFCIiwiZmlsZSI6Ikluc3RhbmNlRmluZE9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGaW5kT3BlcmF0aW9uIGZyb20gJy4vRmluZE9wZXJhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc3RhbmNlRmluZE9wZXJhdGlvbiBleHRlbmRzIEZpbmRPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG4gICAgdGhpcy5pbnN0YW5jZSA9IG9wdC5pbnN0YW5jZTtcbiAgfVxuXG4gIG9uQmVmb3JlQnVpbGQoYnVpbGRlcikge1xuICAgIGJ1aWxkZXIud2hlcmVDb21wb3NpdGUoYnVpbGRlci5tb2RlbENsYXNzKCkuZ2V0RnVsbElkQ29sdW1uKCksIHRoaXMuaW5zdGFuY2UuJGlkKCkpLmZpcnN0KClcbiAgfVxufSJdfQ==