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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./carousel/carousel.js":
/*!******************************!*\
  !*** ./carousel/carousel.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var TAB_WIDTH = 1024;
var INPUT_MAX_VAL = 100;
var THUMB_RIGHT = -5;
var input = document.getElementsByClassName('toggle__input')[0];
var carousel = document.getElementsByClassName('carousel')[0];
var tabs = document.querySelectorAll('.carousel > .slide');
var thumb = document.getElementsByClassName('toggle__thumb')[0];
var barProg = document.getElementsByClassName('toggle__bar-prog')[0];
var borderVals = setBorders(tabs.length);
var initSlide;
var right;

carousel.style.right = 0;
thumb.style.right = THUMB_RIGHT + 'px';

input.addEventListener('touchstart', function(evt) {
    evt.stopPropagation();
    
    initSlide = initialSlide(input.value);
    right = parseInt(carousel.style.right);

    setTimeout(changeSlide, 0);
    
    this.addEventListener('touchmove', changeSlide, false);
    
    this.addEventListener('touchend', function() {
        this.removeEventListener('touchmove', changeSlide);
        setTimeout(changeSlide, 0);
        moveToggle(input.value);
    }, {once: true});
}, false);

// Changing slide according to toggle position

function changeSlide() {
    var inputVal = input.value;
    var rightVal;

    borderVals.some(function(item, idx) {
        if (inputVal >= item[0] && inputVal <= item[1]) {

            if (initSlide > idx) {
                rightVal = right - TAB_WIDTH * (initSlide - idx);
                
            } else if (initSlide < idx) {
                rightVal = right + TAB_WIDTH * (idx - initSlide);
                
            } else if (initSlide === idx) {
                rightVal = right;
            }

            carousel.style.right = rightVal + 'px';
            moveWrapper(input.value);
            return true;
        }
    });
}

// Setting borders for slides on toggle

function setBorders(tabCount) {
    var result = [];
    var border = INPUT_MAX_VAL / tabCount;
    
    for (var i = 0; i < tabCount; i++) {
        result[i] = [];
        
        if (i === 0) {
            result[0].push(0, border);
        
        } else if (i === tabCount - 1) {
            result[i].push(result[i-1][1], INPUT_MAX_VAL);
        
        } else {
            result[i].push(result[i-1][1], border * (i + 1));
        }
    }

    return result;
}

// Looking for current slide

function initialSlide(inpStartVal) {
    var slideNum;

    borderVals.some(function(item, idx) {
    
        if (inpStartVal >= item[0] && inpStartVal <= item[1]) {
            slideNum = idx;
            return true;
        }
    });

    return slideNum;
}

// Moving toggle to year tag

function moveToggle(inputVal) {
    var inputTags = setBorders(tabs.length - 1, inputVal);
    
    inputTags.some(function(tagsItem) {
    
        if (inputVal >= tagsItem[0] && inputVal <= tagsItem[1]) {
            var aveTag = (tagsItem[1] + tagsItem[0]) / 2;
        
        borderVals.some(function(bordItem) {
            
            if (inputVal >= bordItem[0] && inputVal <= bordItem[1]) {
                var aveBord = (bordItem[1] + bordItem[0]) / 2;
            
                if (aveBord <= aveTag) {
                    input.value = tagsItem[0];
                
                } else if (aveBord > aveTag) {
                    input.value = tagsItem[1];
                }

                moveWrapper(input.value);
                return true;
            }
        });

            return true;
        }
    });
}

// Moving input wrapper

function moveWrapper(inpVal) {
    barProg.style.width = inpVal + '%';
    thumb.style.right = ((inpVal - INPUT_MAX_VAL) / 3 + THUMB_RIGHT) + 'px';
}

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _slider_slider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slider/slider.js */ "./slider/slider.js");
/* harmony import */ var _slider_slider_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_slider_slider_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _carousel_carousel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./carousel/carousel.js */ "./carousel/carousel.js");
/* harmony import */ var _carousel_carousel_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_carousel_carousel_js__WEBPACK_IMPORTED_MODULE_2__);





/***/ }),

/***/ "./index.scss":
/*!********************!*\
  !*** ./index.scss ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./slider/slider.js":
/*!**************************!*\
  !*** ./slider/slider.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

var slidesCont = document.getElementsByClassName('slider-container')[0];
var slides = document.querySelectorAll('.slider-container > .slide');
var pagItems = document.getElementsByClassName('pagination__circle');
var bar = document.getElementsByClassName('next-slide')[0];
var slidesArr = Array.prototype.slice.call(slides, 0);
var SLIDE_HEIGHT = 768;
console.log(pagItems);
slidesCont.style.top = 0;

slidesArr.forEach(function(item) {

    item.addEventListener('touchstart', function(evt) {
        var initClientY = evt.changedTouches[0].clientY;
        var slide = evt.currentTarget;

        item.addEventListener('touchmove', hideBar, {once: true});

        item.addEventListener('touchend', function(evt) {
            var endClientY = evt.changedTouches[0].clientY;
            var diffClientY = endClientY - initClientY;
            
            if (Math.abs(diffClientY) > SLIDE_HEIGHT * 0.05) {
                
                if (diffClientY > 0 && isNextSlide(slide, 0)) {
                    changeSlide(slide, 0);
                
                } else if (diffClientY < 0 && isNextSlide(slide, 1)) {
                    changeSlide(slide, 1);
                }
            }

            showBar();
        }, {once: true});
}, false);

});
 
function isNextSlide(currSlide, direction) {
    // direction = 0 for backward move
    // direction = 1 for forward move

    var lastIdx = slides.length - 1;
    var currSlidePos;

    slidesArr.some(function(item, idx) {
        
        if (item.classList[1] === currSlide.classList[1]) {
            currSlidePos = idx;
            return true;
        }
    });

    switch (currSlidePos) {

        case 0: {

            if (direction) {
                return true;
                
            } else {
                return false;
            }
        }

        case lastIdx: {

            if (direction) {
                return false;
                
            } else {
                return true;
            }
        }

        default: return true;
    }
}
 
function changeSlide(currSlide, direction) {
    // direction = 0 for backward move
    // direction = 1 for forward move

    var currSlideIdx = parseInt(currSlide.classList[1][6]);
    var nextSlideIdx;

    if (direction) {
        slidesCont.style.top = (-SLIDE_HEIGHT * (currSlideIdx)) + 'px';
        nextSlideIdx = currSlideIdx + 1;

    } else if (!direction) {
        slidesCont.style.top = (-SLIDE_HEIGHT * (currSlideIdx - 2)) + 'px';
        nextSlideIdx = currSlideIdx - 1;
    }

    changePageIdx(nextSlideIdx, currSlideIdx);
}
 
function changePageIdx(nextSlide, currSlide) {
    pagItems[currSlide - 1].className = 'pagination__circle';
    pagItems[nextSlide - 1].className += ' pagination__circle_active';
}
 
function showBar() {
    bar.style = 'opacity: 1; transition: opacity .3s ease .5s;';
}
 
function hideBar() {
    bar.style = 'opacity: 0;';
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2Fyb3VzZWwvY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguc2Nzcz81NDU4Iiwid2VicGFjazovLy8uL3NsaWRlci9zbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLEdBQUcsV0FBVztBQUNuQixDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiOztBQUVBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsY0FBYztBQUNqQzs7QUFFQTtBQUNBOztBQUVBLFNBQVM7QUFDVDs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdElBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNGQSx1Qzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxREFBcUQsV0FBVzs7QUFFaEU7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVMsR0FBRyxXQUFXO0FBQ3ZCLENBQUM7O0FBRUQsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QixrQ0FBa0M7QUFDOUQ7O0FBRUE7QUFDQSw0QkFBNEI7QUFDNUIsQyIsImZpbGUiOiIuL2pzL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwidmFyIFRBQl9XSURUSCA9IDEwMjQ7XHJcbnZhciBJTlBVVF9NQVhfVkFMID0gMTAwO1xyXG52YXIgVEhVTUJfUklHSFQgPSAtNTtcclxudmFyIGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG9nZ2xlX19pbnB1dCcpWzBdO1xyXG52YXIgY2Fyb3VzZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjYXJvdXNlbCcpWzBdO1xyXG52YXIgdGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJvdXNlbCA+IC5zbGlkZScpO1xyXG52YXIgdGh1bWIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0b2dnbGVfX3RodW1iJylbMF07XHJcbnZhciBiYXJQcm9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG9nZ2xlX19iYXItcHJvZycpWzBdO1xyXG52YXIgYm9yZGVyVmFscyA9IHNldEJvcmRlcnModGFicy5sZW5ndGgpO1xyXG52YXIgaW5pdFNsaWRlO1xyXG52YXIgcmlnaHQ7XHJcblxyXG5jYXJvdXNlbC5zdHlsZS5yaWdodCA9IDA7XHJcbnRodW1iLnN0eWxlLnJpZ2h0ID0gVEhVTUJfUklHSFQgKyAncHgnO1xyXG5cclxuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgXHJcbiAgICBpbml0U2xpZGUgPSBpbml0aWFsU2xpZGUoaW5wdXQudmFsdWUpO1xyXG4gICAgcmlnaHQgPSBwYXJzZUludChjYXJvdXNlbC5zdHlsZS5yaWdodCk7XHJcblxyXG4gICAgc2V0VGltZW91dChjaGFuZ2VTbGlkZSwgMCk7XHJcbiAgICBcclxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgY2hhbmdlU2xpZGUsIGZhbHNlKTtcclxuICAgIFxyXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgY2hhbmdlU2xpZGUpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoY2hhbmdlU2xpZGUsIDApO1xyXG4gICAgICAgIG1vdmVUb2dnbGUoaW5wdXQudmFsdWUpO1xyXG4gICAgfSwge29uY2U6IHRydWV9KTtcclxufSwgZmFsc2UpO1xyXG5cclxuLy8gQ2hhbmdpbmcgc2xpZGUgYWNjb3JkaW5nIHRvIHRvZ2dsZSBwb3NpdGlvblxyXG5cclxuZnVuY3Rpb24gY2hhbmdlU2xpZGUoKSB7XHJcbiAgICB2YXIgaW5wdXRWYWwgPSBpbnB1dC52YWx1ZTtcclxuICAgIHZhciByaWdodFZhbDtcclxuXHJcbiAgICBib3JkZXJWYWxzLnNvbWUoZnVuY3Rpb24oaXRlbSwgaWR4KSB7XHJcbiAgICAgICAgaWYgKGlucHV0VmFsID49IGl0ZW1bMF0gJiYgaW5wdXRWYWwgPD0gaXRlbVsxXSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGluaXRTbGlkZSA+IGlkeCkge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRWYWwgPSByaWdodCAtIFRBQl9XSURUSCAqIChpbml0U2xpZGUgLSBpZHgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5pdFNsaWRlIDwgaWR4KSB7XHJcbiAgICAgICAgICAgICAgICByaWdodFZhbCA9IHJpZ2h0ICsgVEFCX1dJRFRIICogKGlkeCAtIGluaXRTbGlkZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbml0U2xpZGUgPT09IGlkeCkge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRWYWwgPSByaWdodDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2Fyb3VzZWwuc3R5bGUucmlnaHQgPSByaWdodFZhbCArICdweCc7XHJcbiAgICAgICAgICAgIG1vdmVXcmFwcGVyKGlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIFNldHRpbmcgYm9yZGVycyBmb3Igc2xpZGVzIG9uIHRvZ2dsZVxyXG5cclxuZnVuY3Rpb24gc2V0Qm9yZGVycyh0YWJDb3VudCkge1xyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgdmFyIGJvcmRlciA9IElOUFVUX01BWF9WQUwgLyB0YWJDb3VudDtcclxuICAgIFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgcmVzdWx0W2ldID0gW107XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0WzBdLnB1c2goMCwgYm9yZGVyKTtcclxuICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKGkgPT09IHRhYkNvdW50IC0gMSkge1xyXG4gICAgICAgICAgICByZXN1bHRbaV0ucHVzaChyZXN1bHRbaS0xXVsxXSwgSU5QVVRfTUFYX1ZBTCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0W2ldLnB1c2gocmVzdWx0W2ktMV1bMV0sIGJvcmRlciAqIChpICsgMSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vLyBMb29raW5nIGZvciBjdXJyZW50IHNsaWRlXHJcblxyXG5mdW5jdGlvbiBpbml0aWFsU2xpZGUoaW5wU3RhcnRWYWwpIHtcclxuICAgIHZhciBzbGlkZU51bTtcclxuXHJcbiAgICBib3JkZXJWYWxzLnNvbWUoZnVuY3Rpb24oaXRlbSwgaWR4KSB7XHJcbiAgICBcclxuICAgICAgICBpZiAoaW5wU3RhcnRWYWwgPj0gaXRlbVswXSAmJiBpbnBTdGFydFZhbCA8PSBpdGVtWzFdKSB7XHJcbiAgICAgICAgICAgIHNsaWRlTnVtID0gaWR4O1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gc2xpZGVOdW07XHJcbn1cclxuXHJcbi8vIE1vdmluZyB0b2dnbGUgdG8geWVhciB0YWdcclxuXHJcbmZ1bmN0aW9uIG1vdmVUb2dnbGUoaW5wdXRWYWwpIHtcclxuICAgIHZhciBpbnB1dFRhZ3MgPSBzZXRCb3JkZXJzKHRhYnMubGVuZ3RoIC0gMSwgaW5wdXRWYWwpO1xyXG4gICAgXHJcbiAgICBpbnB1dFRhZ3Muc29tZShmdW5jdGlvbih0YWdzSXRlbSkge1xyXG4gICAgXHJcbiAgICAgICAgaWYgKGlucHV0VmFsID49IHRhZ3NJdGVtWzBdICYmIGlucHV0VmFsIDw9IHRhZ3NJdGVtWzFdKSB7XHJcbiAgICAgICAgICAgIHZhciBhdmVUYWcgPSAodGFnc0l0ZW1bMV0gKyB0YWdzSXRlbVswXSkgLyAyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGJvcmRlclZhbHMuc29tZShmdW5jdGlvbihib3JkSXRlbSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGlucHV0VmFsID49IGJvcmRJdGVtWzBdICYmIGlucHV0VmFsIDw9IGJvcmRJdGVtWzFdKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXZlQm9yZCA9IChib3JkSXRlbVsxXSArIGJvcmRJdGVtWzBdKSAvIDI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGF2ZUJvcmQgPD0gYXZlVGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB0YWdzSXRlbVswXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhdmVCb3JkID4gYXZlVGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB0YWdzSXRlbVsxXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBtb3ZlV3JhcHBlcihpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIE1vdmluZyBpbnB1dCB3cmFwcGVyXHJcblxyXG5mdW5jdGlvbiBtb3ZlV3JhcHBlcihpbnBWYWwpIHtcclxuICAgIGJhclByb2cuc3R5bGUud2lkdGggPSBpbnBWYWwgKyAnJSc7XHJcbiAgICB0aHVtYi5zdHlsZS5yaWdodCA9ICgoaW5wVmFsIC0gSU5QVVRfTUFYX1ZBTCkgLyAzICsgVEhVTUJfUklHSFQpICsgJ3B4JztcclxufSIsImltcG9ydCAnLi9pbmRleC5zY3NzJztcclxuXHJcbmltcG9ydCAnLi9zbGlkZXIvc2xpZGVyLmpzJztcclxuaW1wb3J0ICcuL2Nhcm91c2VsL2Nhcm91c2VsLmpzJzsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJ2YXIgc2xpZGVzQ29udCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlci1jb250YWluZXInKVswXTtcclxudmFyIHNsaWRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXItY29udGFpbmVyID4gLnNsaWRlJyk7XHJcbnZhciBwYWdJdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2luYXRpb25fX2NpcmNsZScpO1xyXG52YXIgYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmV4dC1zbGlkZScpWzBdO1xyXG52YXIgc2xpZGVzQXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc2xpZGVzLCAwKTtcclxudmFyIFNMSURFX0hFSUdIVCA9IDc2ODtcclxuY29uc29sZS5sb2cocGFnSXRlbXMpO1xyXG5zbGlkZXNDb250LnN0eWxlLnRvcCA9IDA7XHJcblxyXG5zbGlkZXNBcnIuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcblxyXG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZXZ0KSB7XHJcbiAgICAgICAgdmFyIGluaXRDbGllbnRZID0gZXZ0LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFk7XHJcbiAgICAgICAgdmFyIHNsaWRlID0gZXZ0LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgaGlkZUJhciwge29uY2U6IHRydWV9KTtcclxuXHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgICAgICAgICB2YXIgZW5kQ2xpZW50WSA9IGV2dC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgICAgICAgICB2YXIgZGlmZkNsaWVudFkgPSBlbmRDbGllbnRZIC0gaW5pdENsaWVudFk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZkNsaWVudFkpID4gU0xJREVfSEVJR0hUICogMC4wNSkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlmZkNsaWVudFkgPiAwICYmIGlzTmV4dFNsaWRlKHNsaWRlLCAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVNsaWRlKHNsaWRlLCAwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaWZmQ2xpZW50WSA8IDAgJiYgaXNOZXh0U2xpZGUoc2xpZGUsIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlU2xpZGUoc2xpZGUsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzaG93QmFyKCk7XHJcbiAgICAgICAgfSwge29uY2U6IHRydWV9KTtcclxufSwgZmFsc2UpO1xyXG5cclxufSk7XHJcbiBcclxuZnVuY3Rpb24gaXNOZXh0U2xpZGUoY3VyclNsaWRlLCBkaXJlY3Rpb24pIHtcclxuICAgIC8vIGRpcmVjdGlvbiA9IDAgZm9yIGJhY2t3YXJkIG1vdmVcclxuICAgIC8vIGRpcmVjdGlvbiA9IDEgZm9yIGZvcndhcmQgbW92ZVxyXG5cclxuICAgIHZhciBsYXN0SWR4ID0gc2xpZGVzLmxlbmd0aCAtIDE7XHJcbiAgICB2YXIgY3VyclNsaWRlUG9zO1xyXG5cclxuICAgIHNsaWRlc0Fyci5zb21lKGZ1bmN0aW9uKGl0ZW0sIGlkeCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpdGVtLmNsYXNzTGlzdFsxXSA9PT0gY3VyclNsaWRlLmNsYXNzTGlzdFsxXSkge1xyXG4gICAgICAgICAgICBjdXJyU2xpZGVQb3MgPSBpZHg7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHN3aXRjaCAoY3VyclNsaWRlUG9zKSB7XHJcblxyXG4gICAgICAgIGNhc2UgMDoge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSBsYXN0SWR4OiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWZhdWx0OiByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG4gXHJcbmZ1bmN0aW9uIGNoYW5nZVNsaWRlKGN1cnJTbGlkZSwgZGlyZWN0aW9uKSB7XHJcbiAgICAvLyBkaXJlY3Rpb24gPSAwIGZvciBiYWNrd2FyZCBtb3ZlXHJcbiAgICAvLyBkaXJlY3Rpb24gPSAxIGZvciBmb3J3YXJkIG1vdmVcclxuXHJcbiAgICB2YXIgY3VyclNsaWRlSWR4ID0gcGFyc2VJbnQoY3VyclNsaWRlLmNsYXNzTGlzdFsxXVs2XSk7XHJcbiAgICB2YXIgbmV4dFNsaWRlSWR4O1xyXG5cclxuICAgIGlmIChkaXJlY3Rpb24pIHtcclxuICAgICAgICBzbGlkZXNDb250LnN0eWxlLnRvcCA9ICgtU0xJREVfSEVJR0hUICogKGN1cnJTbGlkZUlkeCkpICsgJ3B4JztcclxuICAgICAgICBuZXh0U2xpZGVJZHggPSBjdXJyU2xpZGVJZHggKyAxO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoIWRpcmVjdGlvbikge1xyXG4gICAgICAgIHNsaWRlc0NvbnQuc3R5bGUudG9wID0gKC1TTElERV9IRUlHSFQgKiAoY3VyclNsaWRlSWR4IC0gMikpICsgJ3B4JztcclxuICAgICAgICBuZXh0U2xpZGVJZHggPSBjdXJyU2xpZGVJZHggLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVBhZ2VJZHgobmV4dFNsaWRlSWR4LCBjdXJyU2xpZGVJZHgpO1xyXG59XHJcbiBcclxuZnVuY3Rpb24gY2hhbmdlUGFnZUlkeChuZXh0U2xpZGUsIGN1cnJTbGlkZSkge1xyXG4gICAgcGFnSXRlbXNbY3VyclNsaWRlIC0gMV0uY2xhc3NOYW1lID0gJ3BhZ2luYXRpb25fX2NpcmNsZSc7XHJcbiAgICBwYWdJdGVtc1tuZXh0U2xpZGUgLSAxXS5jbGFzc05hbWUgKz0gJyBwYWdpbmF0aW9uX19jaXJjbGVfYWN0aXZlJztcclxufVxyXG4gXHJcbmZ1bmN0aW9uIHNob3dCYXIoKSB7XHJcbiAgICBiYXIuc3R5bGUgPSAnb3BhY2l0eTogMTsgdHJhbnNpdGlvbjogb3BhY2l0eSAuM3MgZWFzZSAuNXM7JztcclxufVxyXG4gXHJcbmZ1bmN0aW9uIGhpZGVCYXIoKSB7XHJcbiAgICBiYXIuc3R5bGUgPSAnb3BhY2l0eTogMDsnO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==