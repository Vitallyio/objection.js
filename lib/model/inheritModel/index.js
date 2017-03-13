'use strict';

/**
 * This module is used to make anonymous model subclasses.
 *
 * Doing this in a way that works for both ES5 and ES6 node versions is a bit of a hack. We
 * first attempt to require the ES6 version that uses the `class` and `extends` keywords and
 * then fall back to the ES5 version that mimics ES6 inheritance as well as possible. We cannot
 * use ES5 inheritance to inherit models created using the `class` keyword because:
 *
 * ```js
 * function AnonymousModelSubClass() {
 *   // This line will throw if `BaseClass` is created using the `class` keyword.
 *   // In ES6 you cannot invoke the constructor function without `new` keyword.
 *   BaseClass.apply(this, arguments);
 * }
 * ```
 */

try {
  module.exports = require('./inheritModelEs6');
} catch (err) {
  module.exports = require('./inheritModelEs5');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwiZXJyIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsSUFBSTtBQUNGQSxTQUFPQyxPQUFQLEdBQWlCQyxRQUFRLG1CQUFSLENBQWpCO0FBQ0QsQ0FGRCxDQUVFLE9BQU9DLEdBQVAsRUFBWTtBQUNaSCxTQUFPQyxPQUFQLEdBQWlCQyxRQUFRLG1CQUFSLENBQWpCO0FBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVGhpcyBtb2R1bGUgaXMgdXNlZCB0byBtYWtlIGFub255bW91cyBtb2RlbCBzdWJjbGFzc2VzLlxuICpcbiAqIERvaW5nIHRoaXMgaW4gYSB3YXkgdGhhdCB3b3JrcyBmb3IgYm90aCBFUzUgYW5kIEVTNiBub2RlIHZlcnNpb25zIGlzIGEgYml0IG9mIGEgaGFjay4gV2VcbiAqIGZpcnN0IGF0dGVtcHQgdG8gcmVxdWlyZSB0aGUgRVM2IHZlcnNpb24gdGhhdCB1c2VzIHRoZSBgY2xhc3NgIGFuZCBgZXh0ZW5kc2Aga2V5d29yZHMgYW5kXG4gKiB0aGVuIGZhbGwgYmFjayB0byB0aGUgRVM1IHZlcnNpb24gdGhhdCBtaW1pY3MgRVM2IGluaGVyaXRhbmNlIGFzIHdlbGwgYXMgcG9zc2libGUuIFdlIGNhbm5vdFxuICogdXNlIEVTNSBpbmhlcml0YW5jZSB0byBpbmhlcml0IG1vZGVscyBjcmVhdGVkIHVzaW5nIHRoZSBgY2xhc3NgIGtleXdvcmQgYmVjYXVzZTpcbiAqXG4gKiBgYGBqc1xuICogZnVuY3Rpb24gQW5vbnltb3VzTW9kZWxTdWJDbGFzcygpIHtcbiAqICAgLy8gVGhpcyBsaW5lIHdpbGwgdGhyb3cgaWYgYEJhc2VDbGFzc2AgaXMgY3JlYXRlZCB1c2luZyB0aGUgYGNsYXNzYCBrZXl3b3JkLlxuICogICAvLyBJbiBFUzYgeW91IGNhbm5vdCBpbnZva2UgdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHdpdGhvdXQgYG5ld2Aga2V5d29yZC5cbiAqICAgQmFzZUNsYXNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gKiB9XG4gKiBgYGBcbiAqL1xudHJ5IHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2luaGVyaXRNb2RlbEVzNicpO1xufSBjYXRjaCAoZXJyKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pbmhlcml0TW9kZWxFczUnKTtcbn1cbiJdfQ==