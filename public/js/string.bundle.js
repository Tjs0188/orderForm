/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/assets/string.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  var elements = document.querySelectorAll(".truncate");
  elements.forEach(function (element) {
    var truncateLength = element.dataset["truncatelength"] || 30;
    element.innerHTML = truncateString(element.innerHTML, truncateLength);
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQSxTQUFTQSxjQUFjQSxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtFQUNoQyxJQUFJRCxHQUFHLENBQUNFLE1BQU0sR0FBR0QsR0FBRyxFQUFFO0lBQ3BCLE9BQU9ELEdBQUcsQ0FBQ0csS0FBSyxDQUFDLENBQUMsRUFBRUYsR0FBRyxDQUFDLEdBQUcsS0FBSztFQUNsQyxDQUFDLE1BQU07SUFDTCxPQUFPRCxHQUFHO0VBQ1o7QUFDRjtBQUVBSSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQU07RUFDbEQsSUFBTUMsUUFBUSxHQUFHRixRQUFRLENBQUNHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztFQUN2REQsUUFBUSxDQUFDRSxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFLO0lBQzVCLElBQU1DLGNBQWMsR0FBR0QsT0FBTyxDQUFDRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0lBQzlERixPQUFPLENBQUNHLFNBQVMsR0FBR2IsY0FBYyxDQUFDVSxPQUFPLENBQUNHLFNBQVMsRUFBRUYsY0FBYyxDQUFDO0VBQ3ZFLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3JkZXJmb3JtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29yZGVyZm9ybS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29yZGVyZm9ybS8uL3NyYy9hc3NldHMvc3RyaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJmdW5jdGlvbiB0cnVuY2F0ZVN0cmluZyhzdHIsIG51bSkge1xuICBpZiAoc3RyLmxlbmd0aCA+IG51bSkge1xuICAgIHJldHVybiBzdHIuc2xpY2UoMCwgbnVtKSArIFwiLi4uXCI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50cnVuY2F0ZVwiKTtcbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IHRydW5jYXRlTGVuZ3RoID0gZWxlbWVudC5kYXRhc2V0W1widHJ1bmNhdGVsZW5ndGhcIl0gfHwgMzA7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSB0cnVuY2F0ZVN0cmluZyhlbGVtZW50LmlubmVySFRNTCwgdHJ1bmNhdGVMZW5ndGgpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbInRydW5jYXRlU3RyaW5nIiwic3RyIiwibnVtIiwibGVuZ3RoIiwic2xpY2UiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlbWVudCIsInRydW5jYXRlTGVuZ3RoIiwiZGF0YXNldCIsImlubmVySFRNTCJdLCJzb3VyY2VSb290IjoiIn0=