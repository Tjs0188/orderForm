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
/*!***********************!*\
  !*** ./src/string.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
function truncateString(str, num) {
  if (str.length > num) {
    console.log("Truncating string...");
    console.log("Original string: ", str);
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
  var tooltips = document.querySelectorAll(".hs-tooltip-content");
  tooltips.forEach(function (tooltip) {
    var truncateLength = tooltip.dataset["truncatelength"] || 30;
    tooltip.innerHTML = tooltip.innerHTML.split("<br>").map(function (line) {
      return truncateString(line, truncateLength);
    }).join("<br>");
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQSxTQUFTQSxjQUFjQSxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtFQUNoQyxJQUFJRCxHQUFHLENBQUNFLE1BQU0sR0FBR0QsR0FBRyxFQUFFO0lBQ3BCRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztJQUNuQ0QsT0FBTyxDQUFDQyxHQUFHLENBQUMsbUJBQW1CLEVBQUVKLEdBQUcsQ0FBQztJQUNyQyxPQUFPQSxHQUFHLENBQUNLLEtBQUssQ0FBQyxDQUFDLEVBQUVKLEdBQUcsQ0FBQyxHQUFHLEtBQUs7RUFDbEMsQ0FBQyxNQUFNO0lBQ0wsT0FBT0QsR0FBRztFQUNaO0FBQ0Y7QUFFQU0sUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0VBQ2xELElBQU1DLFFBQVEsR0FBR0YsUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7RUFDdkRELFFBQVEsQ0FBQ0UsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBSztJQUM1QixJQUFNQyxjQUFjLEdBQUdELE9BQU8sQ0FBQ0UsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRTtJQUU5REYsT0FBTyxDQUFDRyxTQUFTLEdBQUdmLGNBQWMsQ0FBQ1ksT0FBTyxDQUFDRyxTQUFTLEVBQUVGLGNBQWMsQ0FBQztFQUN2RSxDQUFDLENBQUM7RUFFRixJQUFNRyxRQUFRLEdBQUdULFFBQVEsQ0FBQ0csZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7RUFDakVNLFFBQVEsQ0FBQ0wsT0FBTyxDQUFDLFVBQUNNLE9BQU8sRUFBSztJQUM1QixJQUFNSixjQUFjLEdBQUdJLE9BQU8sQ0FBQ0gsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRTtJQUM5REcsT0FBTyxDQUFDRixTQUFTLEdBQUdFLE9BQU8sQ0FBQ0YsU0FBUyxDQUNsQ0csS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUNiQyxHQUFHLENBQUMsVUFBQ0MsSUFBSTtNQUFBLE9BQUtwQixjQUFjLENBQUNvQixJQUFJLEVBQUVQLGNBQWMsQ0FBQztJQUFBLEVBQUMsQ0FDbkRRLElBQUksQ0FBQyxNQUFNLENBQUM7RUFDakIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmRlcmZvcm0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3JkZXJmb3JtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3JkZXJmb3JtLy4vc3JjL3N0cmluZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZnVuY3Rpb24gdHJ1bmNhdGVTdHJpbmcoc3RyLCBudW0pIHtcbiAgaWYgKHN0ci5sZW5ndGggPiBudW0pIHtcbiAgICBjb25zb2xlLmxvZyhcIlRydW5jYXRpbmcgc3RyaW5nLi4uXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiT3JpZ2luYWwgc3RyaW5nOiBcIiwgc3RyKTtcbiAgICByZXR1cm4gc3RyLnNsaWNlKDAsIG51bSkgKyBcIi4uLlwiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudHJ1bmNhdGVcIik7XG4gIGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBjb25zdCB0cnVuY2F0ZUxlbmd0aCA9IGVsZW1lbnQuZGF0YXNldFtcInRydW5jYXRlbGVuZ3RoXCJdIHx8IDMwO1xuXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSB0cnVuY2F0ZVN0cmluZyhlbGVtZW50LmlubmVySFRNTCwgdHJ1bmNhdGVMZW5ndGgpO1xuICB9KTtcblxuICBjb25zdCB0b29sdGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaHMtdG9vbHRpcC1jb250ZW50XCIpO1xuICB0b29sdGlwcy5mb3JFYWNoKCh0b29sdGlwKSA9PiB7XG4gICAgY29uc3QgdHJ1bmNhdGVMZW5ndGggPSB0b29sdGlwLmRhdGFzZXRbXCJ0cnVuY2F0ZWxlbmd0aFwiXSB8fCAzMDtcbiAgICB0b29sdGlwLmlubmVySFRNTCA9IHRvb2x0aXAuaW5uZXJIVE1MXG4gICAgICAuc3BsaXQoXCI8YnI+XCIpXG4gICAgICAubWFwKChsaW5lKSA9PiB0cnVuY2F0ZVN0cmluZyhsaW5lLCB0cnVuY2F0ZUxlbmd0aCkpXG4gICAgICAuam9pbihcIjxicj5cIik7XG4gIH0pO1xufSk7XG4iXSwibmFtZXMiOlsidHJ1bmNhdGVTdHJpbmciLCJzdHIiLCJudW0iLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwic2xpY2UiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlbWVudCIsInRydW5jYXRlTGVuZ3RoIiwiZGF0YXNldCIsImlubmVySFRNTCIsInRvb2x0aXBzIiwidG9vbHRpcCIsInNwbGl0IiwibWFwIiwibGluZSIsImpvaW4iXSwic291cmNlUm9vdCI6IiJ9