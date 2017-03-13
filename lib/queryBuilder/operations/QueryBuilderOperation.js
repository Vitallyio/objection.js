"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryBuilderOperation = function () {

  /**
   * @param {knex} knex
   * @param {string} name
   * @param {Object} opt
   */
  function QueryBuilderOperation(name, opt) {
    (0, _classCallCheck3.default)(this, QueryBuilderOperation);

    this.name = name;
    this.opt = opt || {};
    this.isWriteOperation = false;
  }

  /**
   * @param {Constructor.<QueryBuilderOperation>} OperationClass
   * @return {boolean}
   */


  QueryBuilderOperation.prototype.is = function is(OperationClass) {
    return this instanceof OperationClass;
  };

  /**
   * @param {QueryBuilder} builder
   * @param {Array.<*>} args
   * @returns {boolean}
   */


  QueryBuilderOperation.prototype.call = function call(builder, args) {
    return true;
  };

  /**
   * @param {QueryBuilder} builder
   * @param {*} result
   * @returns {Promise|*}
   */


  QueryBuilderOperation.prototype.onBefore = function onBefore(builder, result) {};

  /**
   * @returns {boolean}
   */


  QueryBuilderOperation.prototype.hasOnBefore = function hasOnBefore() {
    return this.onBefore !== QueryBuilderOperation.prototype.onBefore;
  };

  /**
   * @param {QueryBuilder} builder
   * @param {*} result
   * @returns {Promise|*}
   */


  QueryBuilderOperation.prototype.onBeforeInternal = function onBeforeInternal(builder, result) {};

  /**
   * @returns {boolean}
   */


  QueryBuilderOperation.prototype.hasOnBeforeInternal = function hasOnBeforeInternal() {
    return this.onBeforeInternal !== QueryBuilderOperation.prototype.onBeforeInternal;
  };

  /**
   * @param {QueryBuilder} builder
   */


  QueryBuilderOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {};

  /**
   * @returns {boolean}
   */


  QueryBuilderOperation.prototype.hasOnBeforeBuild = function hasOnBeforeBuild() {
    return this.onBeforeBuild !== QueryBuilderOperation.prototype.onBeforeBuild;
  };

  /**
   * @param {QueryBuilder} knexBuilder
   * @param {QueryBuilder} builder
   */


  QueryBuilderOperation.prototype.onBuild = function onBuild(knexBuilder, builder) {};

  /**
   * @returns {boolean}
   */


  QueryBuilderOperation.prototype.hasOnBuild = function hasOnBuild() {
    return this.onBuild !== QueryBuilderOperation.prototype.onBuild;
  };

  /**
   * @param {QueryBuilder} builder
   * @param {*} result
   * @returns {*}
   */


  QueryBuilderOperation.prototype.onRawResult = function onRawResult(builder, result) {
    return rows;
  };

  /**
   * @returns {boolean}
   */


  QueryBuilderOperation.prototype.hasOnRawResult = function hasOnRawResult() {
    return this.onRawResult !== QueryBuilderOperation.prototype.onRawResult;
  };

  /**
   * @param {QueryBuilder} builder
   * @param {*} result
   * @returns {Promise|*}
   */


  QueryBuilderOperation.prototype.onAfterQuery = function onAfterQuery(builder, result) {};

  /**
   * @returns {boolean}
   */


  QueryBuilderOperation.prototype.hasOnAfterQuery = function hasOnAfterQuery() {
    return this.onAfterQuery !== QueryBuilderOperation.prototype.onAfterQuery;
  };

  /**
   * @param {QueryBuilder} builder
   * @param {*} result
   * @returns {Promise|*}
   */


  QueryBuilderOperation.prototype.onAfterInternal = function onAfterInternal(builder, result) {};

  /**
   * @returns {boolean}
   */


  QueryBuilderOperation.prototype.hasOnAfterInternal = function hasOnAfterInternal() {
    return this.onAfterInternal !== QueryBuilderOperation.prototype.onAfterInternal;
  };

  /**
   * @param {QueryBuilder} builder
   * @param {*} result
   * @returns {Promise|*}
   */


  QueryBuilderOperation.prototype.onAfter = function onAfter(builder, result) {};

  /**
   * @returns {boolean}
   */


  QueryBuilderOperation.prototype.hasOnAfter = function hasOnAfter() {
    return this.onAfter !== QueryBuilderOperation.prototype.onAfter;
  };

  /**
   * @param {QueryBuilder} builder
   * @returns {QueryBuilder}
   */


  QueryBuilderOperation.prototype.queryExecutor = function queryExecutor(builder) {};

  /**
   * @returns {boolean}
   */


  QueryBuilderOperation.prototype.hasQueryExecutor = function hasQueryExecutor() {
    return this.queryExecutor !== QueryBuilderOperation.prototype.queryExecutor;
  };

  return QueryBuilderOperation;
}();

exports.default = QueryBuilderOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlF1ZXJ5QnVpbGRlck9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJRdWVyeUJ1aWxkZXJPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwiaXNXcml0ZU9wZXJhdGlvbiIsImlzIiwiT3BlcmF0aW9uQ2xhc3MiLCJjYWxsIiwiYnVpbGRlciIsImFyZ3MiLCJvbkJlZm9yZSIsInJlc3VsdCIsImhhc09uQmVmb3JlIiwicHJvdG90eXBlIiwib25CZWZvcmVJbnRlcm5hbCIsImhhc09uQmVmb3JlSW50ZXJuYWwiLCJvbkJlZm9yZUJ1aWxkIiwiaGFzT25CZWZvcmVCdWlsZCIsIm9uQnVpbGQiLCJrbmV4QnVpbGRlciIsImhhc09uQnVpbGQiLCJvblJhd1Jlc3VsdCIsInJvd3MiLCJoYXNPblJhd1Jlc3VsdCIsIm9uQWZ0ZXJRdWVyeSIsImhhc09uQWZ0ZXJRdWVyeSIsIm9uQWZ0ZXJJbnRlcm5hbCIsImhhc09uQWZ0ZXJJbnRlcm5hbCIsIm9uQWZ0ZXIiLCJoYXNPbkFmdGVyIiwicXVlcnlFeGVjdXRvciIsImhhc1F1ZXJ5RXhlY3V0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFBcUJBLHFCOztBQUVuQjs7Ozs7QUFLQSxpQ0FBWUMsSUFBWixFQUFrQkMsR0FBbEIsRUFBdUI7QUFBQTs7QUFDckIsU0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsR0FBTCxHQUFXQSxPQUFPLEVBQWxCO0FBQ0EsU0FBS0MsZ0JBQUwsR0FBd0IsS0FBeEI7QUFDRDs7QUFFRDs7Ozs7O2tDQUlBQyxFLGVBQUdDLGMsRUFBZ0I7QUFDakIsV0FBTyxnQkFBZ0JBLGNBQXZCO0FBQ0QsRzs7QUFFRDs7Ozs7OztrQ0FLQUMsSSxpQkFBS0MsTyxFQUFTQyxJLEVBQU07QUFDbEIsV0FBTyxJQUFQO0FBQ0QsRzs7QUFFRDs7Ozs7OztrQ0FLQUMsUSxxQkFBU0YsTyxFQUFTRyxNLEVBQVEsQ0FBRSxDOztBQUU1Qjs7Ozs7a0NBR0FDLFcsMEJBQWM7QUFDWixXQUFPLEtBQUtGLFFBQUwsS0FBa0JULHNCQUFzQlksU0FBdEIsQ0FBZ0NILFFBQXpEO0FBQ0QsRzs7QUFFRDs7Ozs7OztrQ0FLQUksZ0IsNkJBQWlCTixPLEVBQVNHLE0sRUFBUSxDQUFFLEM7O0FBRXBDOzs7OztrQ0FHQUksbUIsa0NBQXNCO0FBQ3BCLFdBQU8sS0FBS0QsZ0JBQUwsS0FBMEJiLHNCQUFzQlksU0FBdEIsQ0FBZ0NDLGdCQUFqRTtBQUNELEc7O0FBRUQ7Ozs7O2tDQUdBRSxhLDBCQUFjUixPLEVBQVMsQ0FBRSxDOztBQUV6Qjs7Ozs7a0NBR0FTLGdCLCtCQUFtQjtBQUNqQixXQUFPLEtBQUtELGFBQUwsS0FBdUJmLHNCQUFzQlksU0FBdEIsQ0FBZ0NHLGFBQTlEO0FBQ0QsRzs7QUFFRDs7Ozs7O2tDQUlBRSxPLG9CQUFRQyxXLEVBQWFYLE8sRUFBUyxDQUFFLEM7O0FBRWhDOzs7OztrQ0FHQVksVSx5QkFBYTtBQUNYLFdBQU8sS0FBS0YsT0FBTCxLQUFpQmpCLHNCQUFzQlksU0FBdEIsQ0FBZ0NLLE9BQXhEO0FBQ0QsRzs7QUFFRDs7Ozs7OztrQ0FLQUcsVyx3QkFBWWIsTyxFQUFTRyxNLEVBQVE7QUFDM0IsV0FBT1csSUFBUDtBQUNELEc7O0FBRUQ7Ozs7O2tDQUdBQyxjLDZCQUFpQjtBQUNmLFdBQU8sS0FBS0YsV0FBTCxLQUFxQnBCLHNCQUFzQlksU0FBdEIsQ0FBZ0NRLFdBQTVEO0FBQ0QsRzs7QUFFRDs7Ozs7OztrQ0FLQUcsWSx5QkFBYWhCLE8sRUFBU0csTSxFQUFRLENBQUUsQzs7QUFFaEM7Ozs7O2tDQUdBYyxlLDhCQUFrQjtBQUNoQixXQUFPLEtBQUtELFlBQUwsS0FBc0J2QixzQkFBc0JZLFNBQXRCLENBQWdDVyxZQUE3RDtBQUNELEc7O0FBRUQ7Ozs7Ozs7a0NBS0FFLGUsNEJBQWdCbEIsTyxFQUFTRyxNLEVBQVEsQ0FBRSxDOztBQUVuQzs7Ozs7a0NBR0FnQixrQixpQ0FBcUI7QUFDbkIsV0FBTyxLQUFLRCxlQUFMLEtBQXlCekIsc0JBQXNCWSxTQUF0QixDQUFnQ2EsZUFBaEU7QUFDRCxHOztBQUVEOzs7Ozs7O2tDQUtBRSxPLG9CQUFRcEIsTyxFQUFTRyxNLEVBQVEsQ0FBRSxDOztBQUUzQjs7Ozs7a0NBR0FrQixVLHlCQUFhO0FBQ1gsV0FBTyxLQUFLRCxPQUFMLEtBQWlCM0Isc0JBQXNCWSxTQUF0QixDQUFnQ2UsT0FBeEQ7QUFDRCxHOztBQUVEOzs7Ozs7a0NBSUFFLGEsMEJBQWN0QixPLEVBQVMsQ0FBRSxDOztBQUV6Qjs7Ozs7a0NBR0F1QixnQiwrQkFBbUI7QUFDakIsV0FBTyxLQUFLRCxhQUFMLEtBQXVCN0Isc0JBQXNCWSxTQUF0QixDQUFnQ2lCLGFBQTlEO0FBQ0QsRzs7Ozs7a0JBeEprQjdCLHFCIiwiZmlsZSI6IlF1ZXJ5QnVpbGRlck9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXJ5QnVpbGRlck9wZXJhdGlvbiB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7a25leH0ga25leFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0XG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMub3B0ID0gb3B0IHx8IHt9O1xuICAgIHRoaXMuaXNXcml0ZU9wZXJhdGlvbiA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29uc3RydWN0b3IuPFF1ZXJ5QnVpbGRlck9wZXJhdGlvbj59IE9wZXJhdGlvbkNsYXNzXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpcyhPcGVyYXRpb25DbGFzcykge1xuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgT3BlcmF0aW9uQ2xhc3M7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtRdWVyeUJ1aWxkZXJ9IGJ1aWxkZXJcbiAgICogQHBhcmFtIHtBcnJheS48Kj59IGFyZ3NcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlcn0gYnVpbGRlclxuICAgKiBAcGFyYW0geyp9IHJlc3VsdFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZXwqfVxuICAgKi9cbiAgb25CZWZvcmUoYnVpbGRlciwgcmVzdWx0KSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc09uQmVmb3JlKCkge1xuICAgIHJldHVybiB0aGlzLm9uQmVmb3JlICE9PSBRdWVyeUJ1aWxkZXJPcGVyYXRpb24ucHJvdG90eXBlLm9uQmVmb3JlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyfSBidWlsZGVyXG4gICAqIEBwYXJhbSB7Kn0gcmVzdWx0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfCp9XG4gICAqL1xuICBvbkJlZm9yZUludGVybmFsKGJ1aWxkZXIsIHJlc3VsdCkge31cblxuICAvKipcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBoYXNPbkJlZm9yZUludGVybmFsKCkge1xuICAgIHJldHVybiB0aGlzLm9uQmVmb3JlSW50ZXJuYWwgIT09IFF1ZXJ5QnVpbGRlck9wZXJhdGlvbi5wcm90b3R5cGUub25CZWZvcmVJbnRlcm5hbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlcn0gYnVpbGRlclxuICAgKi9cbiAgb25CZWZvcmVCdWlsZChidWlsZGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc09uQmVmb3JlQnVpbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMub25CZWZvcmVCdWlsZCAhPT0gUXVlcnlCdWlsZGVyT3BlcmF0aW9uLnByb3RvdHlwZS5vbkJlZm9yZUJ1aWxkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyfSBrbmV4QnVpbGRlclxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlcn0gYnVpbGRlclxuICAgKi9cbiAgb25CdWlsZChrbmV4QnVpbGRlciwgYnVpbGRlcikge31cblxuICAvKipcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBoYXNPbkJ1aWxkKCkge1xuICAgIHJldHVybiB0aGlzLm9uQnVpbGQgIT09IFF1ZXJ5QnVpbGRlck9wZXJhdGlvbi5wcm90b3R5cGUub25CdWlsZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlcn0gYnVpbGRlclxuICAgKiBAcGFyYW0geyp9IHJlc3VsdFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIG9uUmF3UmVzdWx0KGJ1aWxkZXIsIHJlc3VsdCkge1xuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzT25SYXdSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHRoaXMub25SYXdSZXN1bHQgIT09IFF1ZXJ5QnVpbGRlck9wZXJhdGlvbi5wcm90b3R5cGUub25SYXdSZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtRdWVyeUJ1aWxkZXJ9IGJ1aWxkZXJcbiAgICogQHBhcmFtIHsqfSByZXN1bHRcbiAgICogQHJldHVybnMge1Byb21pc2V8Kn1cbiAgICovXG4gIG9uQWZ0ZXJRdWVyeShidWlsZGVyLCByZXN1bHQpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzT25BZnRlclF1ZXJ5KCkge1xuICAgIHJldHVybiB0aGlzLm9uQWZ0ZXJRdWVyeSAhPT0gUXVlcnlCdWlsZGVyT3BlcmF0aW9uLnByb3RvdHlwZS5vbkFmdGVyUXVlcnk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtRdWVyeUJ1aWxkZXJ9IGJ1aWxkZXJcbiAgICogQHBhcmFtIHsqfSByZXN1bHRcbiAgICogQHJldHVybnMge1Byb21pc2V8Kn1cbiAgICovXG4gIG9uQWZ0ZXJJbnRlcm5hbChidWlsZGVyLCByZXN1bHQpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzT25BZnRlckludGVybmFsKCkge1xuICAgIHJldHVybiB0aGlzLm9uQWZ0ZXJJbnRlcm5hbCAhPT0gUXVlcnlCdWlsZGVyT3BlcmF0aW9uLnByb3RvdHlwZS5vbkFmdGVySW50ZXJuYWw7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtRdWVyeUJ1aWxkZXJ9IGJ1aWxkZXJcbiAgICogQHBhcmFtIHsqfSByZXN1bHRcbiAgICogQHJldHVybnMge1Byb21pc2V8Kn1cbiAgICovXG4gIG9uQWZ0ZXIoYnVpbGRlciwgcmVzdWx0KSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc09uQWZ0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMub25BZnRlciAhPT0gUXVlcnlCdWlsZGVyT3BlcmF0aW9uLnByb3RvdHlwZS5vbkFmdGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyfSBidWlsZGVyXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBxdWVyeUV4ZWN1dG9yKGJ1aWxkZXIpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzUXVlcnlFeGVjdXRvcigpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeUV4ZWN1dG9yICE9PSBRdWVyeUJ1aWxkZXJPcGVyYXRpb24ucHJvdG90eXBlLnF1ZXJ5RXhlY3V0b3I7XG4gIH1cbn0iXX0=