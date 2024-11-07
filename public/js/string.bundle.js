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
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  var elements = document.querySelectorAll(".truncate");
  elements.forEach(function (element) {
    var truncateLength = element.dataset["truncatelength"] || 30;
    console.log("truncateLength", truncateLength);
    element.innerHTML = truncateString(element.innerHTML, truncateLength);
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQSxTQUFTQSxjQUFjQSxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtFQUNoQyxJQUFJRCxHQUFHLENBQUNFLE1BQU0sR0FBR0QsR0FBRyxFQUFFO0lBQ3BCLE9BQU9ELEdBQUcsQ0FBQ0csS0FBSyxDQUFDLENBQUMsRUFBRUYsR0FBRyxDQUFDLEdBQUcsS0FBSztFQUNsQyxDQUFDLE1BQU07SUFDTCxPQUFPRCxHQUFHO0VBQ1o7QUFDRjtBQUVBSSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQU07RUFDbEQsSUFBTUMsUUFBUSxHQUFHRixRQUFRLENBQUNHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztFQUN2REQsUUFBUSxDQUFDRSxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFLO0lBQzVCLElBQU1DLGNBQWMsR0FBR0QsT0FBTyxDQUFDRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0lBQzlEQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRUgsY0FBYyxDQUFDO0lBQzdDRCxPQUFPLENBQUNLLFNBQVMsR0FBR2YsY0FBYyxDQUFDVSxPQUFPLENBQUNLLFNBQVMsRUFBRUosY0FBYyxDQUFDO0VBQ3ZFLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3JkZXJmb3JtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29yZGVyZm9ybS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29yZGVyZm9ybS8uL3NyYy9zdHJpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImZ1bmN0aW9uIHRydW5jYXRlU3RyaW5nKHN0ciwgbnVtKSB7XG4gIGlmIChzdHIubGVuZ3RoID4gbnVtKSB7XG4gICAgcmV0dXJuIHN0ci5zbGljZSgwLCBudW0pICsgXCIuLi5cIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRydW5jYXRlXCIpO1xuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgY29uc3QgdHJ1bmNhdGVMZW5ndGggPSBlbGVtZW50LmRhdGFzZXRbXCJ0cnVuY2F0ZWxlbmd0aFwiXSB8fCAzMDtcbiAgICBjb25zb2xlLmxvZyhcInRydW5jYXRlTGVuZ3RoXCIsIHRydW5jYXRlTGVuZ3RoKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IHRydW5jYXRlU3RyaW5nKGVsZW1lbnQuaW5uZXJIVE1MLCB0cnVuY2F0ZUxlbmd0aCk7XG4gIH0pO1xufSk7XG4iXSwibmFtZXMiOlsidHJ1bmNhdGVTdHJpbmciLCJzdHIiLCJudW0iLCJsZW5ndGgiLCJzbGljZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbGVtZW50IiwidHJ1bmNhdGVMZW5ndGgiLCJkYXRhc2V0IiwiY29uc29sZSIsImxvZyIsImlubmVySFRNTCJdLCJzb3VyY2VSb290IjoiIn0=