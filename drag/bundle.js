/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./drag/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./drag/index.js":
/*!***********************!*\
  !*** ./drag/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _event = __webpack_require__(/*! ../event */ \"./event/index.js\");\n\nvar _event2 = _interopRequireDefault(_event);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n'use strict';\nfunction Drag(el) {\n    this.el = el;\n    this.isTouchDevice = 'ontouchstart' in document;\n    this.evs = this.isTouchDevice ? {\n        start: 'touchstart',\n        move: 'touchmove',\n        end: 'touchend'\n    } : {\n        start: 'mousedown',\n        move: 'mousemove',\n        end: 'mouseup'\n    };\n    this.startHandler = new Function();\n}\nDrag.prototype.enable = function () {\n    var el = this.el,\n        doc = document,\n        de = doc.documentElement,\n        bd = doc.body,\n        evs = this.evs,\n        isTouchDevice = this.isTouchDevice;\n    // 距离不变，三个事件\n    this.startHandler = function (ev) {\n        var sl = de.scrollLeft || bd.scrollLeft,\n            st = de.scrollTop || bd.scrollTop,\n            dw = de.clientWidth || bd.clientWidth,\n            dh = de.clientHeight || bd.clientHeight,\n            rect = el.getBoundingClientRect(),\n            cx = isTouchDevice ? ev.touches[0].clientX : ev.clientX,\n            cy = isTouchDevice ? ev.touches[0].clientY : ev.clientY,\n            dX = sl + cx - rect.left,\n            dY = st + cy - rect.top,\n            maxLeft = sl + dw - rect.width,\n            maxTop = st + dh - rect.height;\n        doc.addEventListener(evs.move, moveHandler);\n        _event2.default.emit('dragStart', { dX: dX, dY: dY });\n\n        function moveHandler(ev, cb) {\n            // prevent default images page behaviour\n            ev.preventDefault();\n            var sl = de.scrollLeft || bd.scrollLeft,\n                st = de.scrollTop || bd.scrollTop,\n                cx = isTouchDevice ? ev.touches[0].clientX : ev.clientX,\n                cy = isTouchDevice ? ev.touches[0].clientY : ev.clientY,\n                left = sl + cx - dX,\n                top = st + cy - dY;\n            // limit\n            var min = Math.min,\n                max = Math.max;\n            left = max(0, min(left, maxLeft));\n            top = max(0, min(top, maxTop));\n            // batch update dom\n            el.style.cssText += 'left:' + left + 'px;top:' + top + 'px;';\n            _event2.default.emit('dragMove', { left: left, top: top });\n        }\n\n        doc.addEventListener(evs.end, endHandler);\n\n        function endHandler(ev) {\n            doc.removeEventListener(evs.move, moveHandler);\n            doc.removeEventListener(evs.end, endHandler);\n            _event2.default.emit('dragEnd');\n        }\n    };\n    el.addEventListener(evs.start, this.startHandler);\n};\nDrag.prototype.disable = function () {\n    this.el.removeEventListener(this.evs.start, this.startHandler);\n};\n\nexports.default = Drag;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kcmFnL2luZGV4LmpzPzcyZjciXSwibmFtZXMiOlsiRHJhZyIsImVsIiwiaXNUb3VjaERldmljZSIsImRvY3VtZW50IiwiZXZzIiwic3RhcnQiLCJtb3ZlIiwiZW5kIiwic3RhcnRIYW5kbGVyIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJlbmFibGUiLCJkb2MiLCJkZSIsImRvY3VtZW50RWxlbWVudCIsImJkIiwiYm9keSIsImV2Iiwic2wiLCJzY3JvbGxMZWZ0Iiwic3QiLCJzY3JvbGxUb3AiLCJkdyIsImNsaWVudFdpZHRoIiwiZGgiLCJjbGllbnRIZWlnaHQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY3giLCJ0b3VjaGVzIiwiY2xpZW50WCIsImN5IiwiY2xpZW50WSIsImRYIiwibGVmdCIsImRZIiwidG9wIiwibWF4TGVmdCIsIndpZHRoIiwibWF4VG9wIiwiaGVpZ2h0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1vdmVIYW5kbGVyIiwiZW1pdCIsImNiIiwicHJldmVudERlZmF1bHQiLCJtaW4iLCJNYXRoIiwibWF4Iiwic3R5bGUiLCJjc3NUZXh0IiwiZW5kSGFuZGxlciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkaXNhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUE7QUFDQSxTQUFTQSxJQUFULENBQWNDLEVBQWQsRUFBa0I7QUFDZCxTQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxhQUFMLEdBQXNCLGtCQUFrQkMsUUFBeEM7QUFDQSxTQUFLQyxHQUFMLEdBQVcsS0FBS0YsYUFBTCxHQUFvQjtBQUMzQkcsZUFBTyxZQURvQjtBQUUzQkMsY0FBTSxXQUZxQjtBQUczQkMsYUFBSztBQUhzQixLQUFwQixHQUlUO0FBQ0VGLGVBQU8sV0FEVDtBQUVFQyxjQUFNLFdBRlI7QUFHRUMsYUFBSztBQUhQLEtBSkY7QUFTQSxTQUFLQyxZQUFMLEdBQW9CLElBQUlDLFFBQUosRUFBcEI7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a0NvQyxXQUFsQztBQUNBOUIsZ0JBQUl3QyxtQkFBSixDQUF3QmhELElBQUlHLEdBQTVCLEVBQWlDNEMsVUFBakM7QUFDQSw0QkFBYVIsSUFBYixDQUFrQixTQUFsQjtBQUNIO0FBQ0osS0F6Q0Q7QUEwQ0ExQyxPQUFHd0MsZ0JBQUgsQ0FBb0JyQyxJQUFJQyxLQUF4QixFQUErQixLQUFLRyxZQUFwQztBQUNILENBbkREO0FBb0RBUixLQUFLVSxTQUFMLENBQWUyQyxPQUFmLEdBQXlCLFlBQVk7QUFDakMsU0FBS3BELEVBQUwsQ0FBUW1ELG1CQUFSLENBQTRCLEtBQUtoRCxHQUFMLENBQVNDLEtBQXJDLEVBQTRDLEtBQUtHLFlBQWpEO0FBQ0gsQ0FGRDs7a0JBSWVSLEkiLCJmaWxlIjoiLi9kcmFnL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV2ZW50TWFuYWdlciBmcm9tICcuLi9ldmVudCdcblxuJ3VzZSBzdHJpY3QnXG5mdW5jdGlvbiBEcmFnKGVsKSB7XG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5pc1RvdWNoRGV2aWNlID0gKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50KVxuICAgIHRoaXMuZXZzID0gdGhpcy5pc1RvdWNoRGV2aWNlPyB7XG4gICAgICAgIHN0YXJ0OiAndG91Y2hzdGFydCcsXG4gICAgICAgIG1vdmU6ICd0b3VjaG1vdmUnLFxuICAgICAgICBlbmQ6ICd0b3VjaGVuZCdcbiAgICB9OntcbiAgICAgICAgc3RhcnQ6ICdtb3VzZWRvd24nLFxuICAgICAgICBtb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICAgICAgZW5kOiAnbW91c2V1cCdcbiAgICB9XG4gICAgdGhpcy5zdGFydEhhbmRsZXIgPSBuZXcgRnVuY3Rpb24oKVxuXG59XG5EcmFnLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsLFxuICAgICAgICBkb2MgPSBkb2N1bWVudCxcbiAgICAgICAgZGUgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICBiZCA9IGRvYy5ib2R5LFxuICAgICAgICBldnMgPSB0aGlzLmV2cyxcbiAgICAgICAgaXNUb3VjaERldmljZSA9IHRoaXMuaXNUb3VjaERldmljZVxuICAgIC8vIOi3neemu+S4jeWPmO+8jOS4ieS4quS6i+S7tlxuICAgIHRoaXMuc3RhcnRIYW5kbGVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgIGxldCBzbCA9IGRlLnNjcm9sbExlZnQgfHwgYmQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIHN0ID0gZGUuc2Nyb2xsVG9wIHx8IGJkLnNjcm9sbFRvcCxcbiAgICAgICAgICAgIGR3ID0gZGUuY2xpZW50V2lkdGggfHwgYmQuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBkaCA9IGRlLmNsaWVudEhlaWdodCB8fCBiZC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICBjeCA9IGlzVG91Y2hEZXZpY2U/IGV2LnRvdWNoZXNbMF0uY2xpZW50WDpldi5jbGllbnRYLFxuICAgICAgICAgICAgY3kgPSBpc1RvdWNoRGV2aWNlPyBldi50b3VjaGVzWzBdLmNsaWVudFk6ZXYuY2xpZW50WSxcbiAgICAgICAgICAgIGRYID0gc2wgKyBjeCAtIHJlY3QubGVmdCxcbiAgICAgICAgICAgIGRZID0gc3QgKyBjeSAtIHJlY3QudG9wLFxuICAgICAgICAgICAgbWF4TGVmdCA9IHNsICsgZHcgLSByZWN0LndpZHRoLFxuICAgICAgICAgICAgbWF4VG9wID0gc3QgKyBkaCAtIHJlY3QuaGVpZ2h0XG4gICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKGV2cy5tb3ZlLCBtb3ZlSGFuZGxlcilcbiAgICAgICAgZXZlbnRNYW5hZ2VyLmVtaXQoJ2RyYWdTdGFydCcsIHtkWCwgZFl9KVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vdmVIYW5kbGVyKGV2LCBjYikge1xuICAgICAgICAgICAgLy8gcHJldmVudCBkZWZhdWx0IHNjcm9sbCBwYWdlIGJlaGF2aW91clxuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgbGV0IHNsID0gZGUuc2Nyb2xsTGVmdCB8fCBiZC5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgIHN0ID0gZGUuc2Nyb2xsVG9wIHx8IGJkLnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICBjeCA9IGlzVG91Y2hEZXZpY2U/IGV2LnRvdWNoZXNbMF0uY2xpZW50WDpldi5jbGllbnRYLFxuICAgICAgICAgICAgICAgIGN5ID0gaXNUb3VjaERldmljZT8gZXYudG91Y2hlc1swXS5jbGllbnRZOmV2LmNsaWVudFksXG4gICAgICAgICAgICAgICAgbGVmdCA9IHNsICsgY3ggLSBkWCxcbiAgICAgICAgICAgICAgICB0b3AgPSBzdCArIGN5IC0gZFlcbiAgICAgICAgICAgIC8vIGxpbWl0XG4gICAgICAgICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbixcbiAgICAgICAgICAgICAgICBtYXggPSBNYXRoLm1heFxuICAgICAgICAgICAgbGVmdCA9IG1heCgwLCBtaW4obGVmdCwgbWF4TGVmdCkpXG4gICAgICAgICAgICB0b3AgPSBtYXgoMCwgbWluKHRvcCwgbWF4VG9wKSlcbiAgICAgICAgICAgIC8vIGJhdGNoIHVwZGF0ZSBkb21cbiAgICAgICAgICAgIGVsLnN0eWxlLmNzc1RleHQgKz0gYGxlZnQ6JHtsZWZ0fXB4O3RvcDoke3RvcH1weDtgXG4gICAgICAgICAgICBldmVudE1hbmFnZXIuZW1pdCgnZHJhZ01vdmUnLCB7bGVmdCwgdG9wfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKGV2cy5lbmQsIGVuZEhhbmRsZXIpXG5cbiAgICAgICAgZnVuY3Rpb24gZW5kSGFuZGxlcihldikge1xuICAgICAgICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZzLm1vdmUsIG1vdmVIYW5kbGVyKVxuICAgICAgICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZzLmVuZCwgZW5kSGFuZGxlcilcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5lbWl0KCdkcmFnRW5kJylcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2cy5zdGFydCwgdGhpcy5zdGFydEhhbmRsZXIpXG59XG5EcmFnLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmV2cy5zdGFydCwgdGhpcy5zdGFydEhhbmRsZXIpXG59XG5cbmV4cG9ydCBkZWZhdWx0IERyYWdcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./drag/index.js\n");

/***/ }),

/***/ "./event/index.js":
/*!************************!*\
  !*** ./event/index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/*\nEventManager is a single instance class\n */\nvar EventManager = function () {\n    function EventManager() {\n        _classCallCheck(this, EventManager);\n\n        this.events = {};\n        this.domEvents = new Map();\n        // on is an alias for addHandler\n        this.on = this.addHandler;\n    }\n\n    _createClass(EventManager, [{\n        key: \"addHandler\",\n        value: function addHandler(eventName, handler) {\n            if (this.events[eventName] === undefined) {\n                this.events[eventName] = [];\n            }\n            if (this.events[eventName].indexOf(handler) === -1) {\n                this.events[eventName].push(handler);\n            }\n        }\n    }, {\n        key: \"removeHandler\",\n        value: function removeHandler(eventName, handler) {\n            var arr = this.events[eventName];\n            if (arr !== undefined) {\n                var i = arr.indexOf(handler);\n                if (i !== -1) {\n                    arr.splice(i, 1);\n                }\n            }\n        }\n    }, {\n        key: \"emit\",\n        value: function emit(eventName) {\n            var eventObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n            if (this.events[eventName] === undefined) return;\n            eventObj.type = eventName;\n            this.events[eventName].forEach(function (handler) {\n                return handler(eventObj);\n            });\n        }\n    }]);\n\n    return EventManager;\n}();\n\nexports.default = new EventManager();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ldmVudC9pbmRleC5qcz8yOWVlIl0sIm5hbWVzIjpbIkV2ZW50TWFuYWdlciIsImV2ZW50cyIsImRvbUV2ZW50cyIsIk1hcCIsIm9uIiwiYWRkSGFuZGxlciIsImV2ZW50TmFtZSIsImhhbmRsZXIiLCJ1bmRlZmluZWQiLCJpbmRleE9mIiwicHVzaCIsImFyciIsImkiLCJzcGxpY2UiLCJldmVudE9iaiIsInR5cGUiLCJmb3JFYWNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7OztJQUdNQSxZO0FBQ0YsNEJBQWM7QUFBQTs7QUFDVixhQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLGFBQUtDLFNBQUwsR0FBaUIsSUFBSUMsR0FBSixFQUFqQjtBQUNBO0FBQ0EsYUFBS0MsRUFBTCxHQUFVLEtBQUtDLFVBQWY7QUFDSDs7OzttQ0FDVUMsUyxFQUFXQyxPLEVBQVM7QUFDM0IsZ0JBQUksS0FBS04sTUFBTCxDQUFZSyxTQUFaLE1BQTJCRSxTQUEvQixFQUEwQztBQUN0QyxxQkFBS1AsTUFBTCxDQUFZSyxTQUFaLElBQXlCLEVBQXpCO0FBQ0g7QUFDRCxnQkFBSSxLQUFLTCxNQUFMLENBQVlLLFNBQVosRUFBdUJHLE9BQXZCLENBQStCRixPQUEvQixNQUE0QyxDQUFDLENBQWpELEVBQW9EO0FBQ2hELHFCQUFLTixNQUFMLENBQVlLLFNBQVosRUFBdUJJLElBQXZCLENBQTRCSCxPQUE1QjtBQUNIO0FBQ0o7OztzQ0FDYUQsUyxFQUFXQyxPLEVBQVM7QUFDOUIsZ0JBQU1JLE1BQU0sS0FBS1YsTUFBTCxDQUFZSyxTQUFaLENBQVo7QUFDQSxnQkFBR0ssUUFBUUgsU0FBWCxFQUFzQjtBQUNsQixvQkFBSUksSUFBSUQsSUFBSUYsT0FBSixDQUFZRixPQUFaLENBQVI7QUFDQSxvQkFBSUssTUFBTSxDQUFDLENBQVgsRUFBYztBQUNWRCx3QkFBSUUsTUFBSixDQUFXRCxDQUFYLEVBQWMsQ0FBZDtBQUNIO0FBQ0o7QUFDSjs7OzZCQUNJTixTLEVBQXdCO0FBQUEsZ0JBQWJRLFFBQWEsdUVBQUosRUFBSTs7QUFDekIsZ0JBQUksS0FBS2IsTUFBTCxDQUFZSyxTQUFaLE1BQTJCRSxTQUEvQixFQUEwQztBQUMxQ00scUJBQVNDLElBQVQsR0FBZ0JULFNBQWhCO0FBQ0EsaUJBQUtMLE1BQUwsQ0FBWUssU0FBWixFQUF1QlUsT0FBdkIsQ0FBK0I7QUFBQSx1QkFBV1QsUUFBUU8sUUFBUixDQUFYO0FBQUEsYUFBL0I7QUFDSDs7Ozs7O2tCQUVVLElBQUlkLFlBQUosRSIsImZpbGUiOiIuL2V2ZW50L2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkV2ZW50TWFuYWdlciBpcyBhIHNpbmdsZSBpbnN0YW5jZSBjbGFzc1xuICovXG5jbGFzcyBFdmVudE1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9XG4gICAgICAgIHRoaXMuZG9tRXZlbnRzID0gbmV3IE1hcCgpXG4gICAgICAgIC8vIG9uIGlzIGFuIGFsaWFzIGZvciBhZGRIYW5kbGVyXG4gICAgICAgIHRoaXMub24gPSB0aGlzLmFkZEhhbmRsZXJcbiAgICB9XG4gICAgYWRkSGFuZGxlcihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uaW5kZXhPZihoYW5kbGVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZUhhbmRsZXIoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV1cbiAgICAgICAgaWYoYXJyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBpID0gYXJyLmluZGV4T2YoaGFuZGxlcilcbiAgICAgICAgICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbWl0KGV2ZW50TmFtZSwgZXZlbnRPYmo9e30pIHtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPT09IHVuZGVmaW5lZCkgcmV0dXJuXG4gICAgICAgIGV2ZW50T2JqLnR5cGUgPSBldmVudE5hbWVcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKGhhbmRsZXIgPT4gaGFuZGxlcihldmVudE9iaikpXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IEV2ZW50TWFuYWdlcigpIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./event/index.js\n");

/***/ })

/******/ });