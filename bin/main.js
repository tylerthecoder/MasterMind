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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/controller.ts":
/*!***************************!*\
  !*** ./src/controller.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Controller; });
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        const canvas = document.getElementById("gameCanvas");
        canvas.addEventListener("click", (event) => { this.clickHandler(event); });
        document.body.addEventListener("keydown", (event) => { this.keyHandler(event); });
    }
    clickHandler(event) {
        if (event.clientY < 100) {
            this.model.selectedColor = this.view.getColor(event.clientX);
        }
        else {
            const index = this.view.getCircleIndex(event.clientX);
            if (index !== -1) {
                this.model.setCurrentLineColor(index);
            }
        }
    }
    keyHandler(event) {
        this.model.check();
    }
}


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/controller.ts");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "./src/model.ts");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ "./src/view.ts");



class Game {
    constructor() {
        this.view = new _view__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.model = new _model__WEBPACK_IMPORTED_MODULE_1__["default"](this.view);
        this.controller = new _controller__WEBPACK_IMPORTED_MODULE_0__["default"](this.model, this.view);
    }
}
const game = new Game();


/***/ }),

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Model; });
class Model {
    constructor(view) {
        this.lines = [];
        this.allColors = ["r", "y", "b", "a", "w", "g"];
        this.secretCombo = ["y", "r", "r", "y"];
        this.currentLine = ["", "", "", ""];
        this.won = false;
        this.view = view;
        this.secretCombo = Array.from(Array(4)).map((_) => this.getRandomColor());
        console.log(this.secretCombo);
        this.view.draw(this);
    }
    setCurrentLineColor(index) {
        this.currentLine[index] = this.selectedColor;
        this.view.draw(this);
    }
    check() {
        let white = 0;
        let red = 0;
        const secret = this.secretCombo.slice(0);
        const check = this.currentLine.slice(0);
        for (const index of Object.keys(secret)) {
            if (check[index] === secret[index]) {
                red++;
                check[index] = false;
                secret[index] = false;
            }
        }
        if (red === 4) {
            this.win();
        }
        for (const index of Object.keys(secret)) {
            if (secret[index] && check.includes(secret[index])) {
                white++;
                check[check.indexOf(secret[index])] = NaN;
            }
        }
        this.lines.push({
            line: this.currentLine.splice(0),
            res: { red, white },
        });
        this.currentLine = ["", "", "", ""];
        this.view.draw(this);
        return false;
    }
    win() {
        this.won = true;
        this.view.draw(this);
    }
    getRandomColor() {
        return this.allColors[Math.floor(Math.random() * this.allColors.length)];
    }
}


/***/ }),

/***/ "./src/view.ts":
/*!*********************!*\
  !*** ./src/view.ts ***!
  \*********************/
/*! exports provided: sw, sh, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sw", function() { return sw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sh", function() { return sh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return View; });
let sw = window.innerWidth;
let sh = window.innerHeight;
window.addEventListener("resize", () => {
    sw = window.innerWidth;
    sh = window.innerHeight;
});
class View {
    constructor() {
        this.boardWidth = 500;
        this.circleRadius = 25;
        this.lineHeight = 80;
        this.colorMappings = {
            r: "red",
            y: "yellow",
            b: "blue",
            a: "black",
            w: "white",
            g: "green",
        };
        const canvas = document.getElementById("gameCanvas");
        canvas.width = sw;
        canvas.height = sh;
        this.ctx = canvas.getContext("2d");
        this.rowWidth = this.boardWidth / 4;
    }
    draw(model) {
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0, 0, sw, sh);
        this.ctx.fillStyle = "lightgrey";
        this.ctx.fillRect(sw / 2 - this.boardWidth / 2, this.lineHeight, this.boardWidth, sh);
        const colors = Object.keys(this.colorMappings).map((x) => this.colorMappings[x]);
        for (const index in colors) {
            const color = colors[index];
            this.ctx.fillStyle = color;
            this.ctx.fillRect(Number(index) * 50 + sw / 2 - this.boardWidth / 2, 0, 50, 50);
        }
        if (model.won) {
            this.drawLine(1, model.secretCombo);
        }
        this.drawLine(2, model.currentLine);
        for (const index in model.lines) {
            this.drawLine(model.lines.length - Number(index) + 2, model.lines[index].line);
            this.drawResult(model.lines.length - Number(index) + 2, model.lines[index].res);
        }
    }
    getColor(x) {
        const colorIndex = Math.floor((x - (sw / 2 - this.boardWidth / 2)) / 50);
        const colors = Object.keys(this.colorMappings);
        if (colorIndex in colors) {
            return colors[colorIndex];
        }
        return false;
    }
    drawLine(line, colors) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.moveTo(sw / 2 - this.boardWidth / 2, line * this.lineHeight);
        this.ctx.lineTo(sw / 2 + this.boardWidth / 2, line * this.lineHeight);
        this.ctx.stroke();
        for (const index in colors) {
            const color = colors[index];
            if (color) {
                this.ctx.fillStyle = this.colorMappings[color];
            }
            else {
                this.ctx.fillStyle = "grey";
            }
            const cc = this.circleCords(line, Number(index));
            this.ctx.beginPath();
            this.ctx.arc(cc.x, cc.y, this.circleRadius, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }
    drawResult(line, res) {
        let { red, white } = res;
        const y = line * this.lineHeight;
        const x = 4 * this.rowWidth + (sw / 2 - this.boardWidth / 2);
        top: for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let color = null;
                if (red > 0) {
                    color = "red";
                    red--;
                }
                else if (white > 0) {
                    color = "white";
                    white--;
                }
                else {
                    break top;
                }
                this.ctx.fillStyle = color;
                this.ctx.strokeStyle = "black";
                const rx = x + i * this.lineHeight / 2;
                const ry = y + j * this.lineHeight / 2;
                this.ctx.fillRect(rx, ry, this.lineHeight / 2, this.lineHeight / 2);
                this.ctx.strokeRect(rx, ry, this.lineHeight / 2, this.lineHeight / 2);
            }
        }
    }
    circleCords(line, index) {
        const x = index * this.rowWidth + this.rowWidth / 2 + sw / 2 - this.boardWidth / 2;
        const y = this.circleRadius + line * this.lineHeight + this.lineHeight / 2 - this.circleRadius;
        return { x, y };
    }
    getCircleIndex(x) {
        if (Math.abs(x - sw / 2) > this.boardWidth / 2) {
            return -1;
        }
        return Math.floor((x - (this.rowWidth / 2 + sw / 2 - this.boardWidth / 2 + this.circleRadius)) / this.rowWidth) + 1;
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvRUE7QUFBQTtBQUFlLE1BQU0sVUFBVTtJQUc3QixZQUFZLEtBQVksRUFBRSxJQUFVO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFzQixDQUFDO1FBQzFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVB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R0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RILENBQUM7Q0FDRiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsImltcG9ydCBNb2RlbCwgeyBJQ29sb3IgfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlld1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sbGVyIHtcbiAgcHVibGljIG1vZGVsOiBNb2RlbDtcbiAgcHVibGljIHZpZXc6IFZpZXc7XG4gIGNvbnN0cnVjdG9yKG1vZGVsOiBNb2RlbCwgdmlldzogVmlldykge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lQ2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7dGhpcy5jbGlja0hhbmRsZXIoZXZlbnQpOyB9KTtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge3RoaXMua2V5SGFuZGxlcihldmVudCk7IH0pO1xuICB9XG5cbiAgcHVibGljIGNsaWNrSGFuZGxlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmIChldmVudC5jbGllbnRZIDwgMTAwKSB7IC8vIHBpY2tpbmcgYSBjb2xvclxuICAgICAgdGhpcy5tb2RlbC5zZWxlY3RlZENvbG9yID0gdGhpcy52aWV3LmdldENvbG9yKGV2ZW50LmNsaWVudFgpIGFzIElDb2xvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnZpZXcuZ2V0Q2lyY2xlSW5kZXgoZXZlbnQuY2xpZW50WCk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMubW9kZWwuc2V0Q3VycmVudExpbmVDb2xvcihpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGtleUhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICB0aGlzLm1vZGVsLmNoZWNrKCk7XG4gIH1cbn1cbiIsImltcG9ydCBDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcbmltcG9ydCBNb2RlbCBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlld1wiO1xuXG5jbGFzcyBHYW1lIHtcbiAgcHVibGljIHZpZXc6IFZpZXc7XG4gIHB1YmxpYyBtb2RlbDogTW9kZWw7XG4gIHB1YmxpYyBjb250cm9sbGVyOiBDb250cm9sbGVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KCk7XG4gICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbCh0aGlzLnZpZXcpO1xuICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKHRoaXMubW9kZWwsIHRoaXMudmlldyk7XG4gIH1cbn1cblxuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKCk7XG4iLCJpbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3XCI7XG5cbmV4cG9ydCB0eXBlIElDb2xvciA9IFwiclwiIHwgXCJ5XCIgfCBcImJcIiB8IFwiYVwiIHwgXCJ3XCIgfCBcImdcIiB8IFwiXCI7XG5leHBvcnQgdHlwZSBJTGluZSA9IElDb2xvcltdO1xuXG5leHBvcnQgaW50ZXJmYWNlIElMaW5lUmVzdWx0IHtcbiAgcmVkOiBudW1iZXI7XG4gIHdoaXRlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGVsIHtcbiAgcHVibGljIHZpZXc6IFZpZXc7XG4gIHB1YmxpYyBsaW5lczogQXJyYXk8e1xuICAgIGxpbmU6IElMaW5lLFxuICAgIHJlczogSUxpbmVSZXN1bHQsXG4gIH0+ID0gW107XG4gIHB1YmxpYyBhbGxDb2xvcnMgPSBbXCJyXCIsIFwieVwiLCBcImJcIiwgXCJhXCIsIFwid1wiLCBcImdcIl07XG4gIHB1YmxpYyBzZWNyZXRDb21ibzogSUxpbmUgPSBbXCJ5XCIsIFwiclwiLCBcInJcIiwgXCJ5XCJdO1xuICBwdWJsaWMgY3VycmVudExpbmU6IElMaW5lID0gW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCJdO1xuICBwdWJsaWMgc2VsZWN0ZWRDb2xvcjogSUNvbG9yO1xuICBwdWJsaWMgd29uID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IodmlldzogVmlldykge1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5zZWNyZXRDb21ibyA9IEFycmF5LmZyb20oQXJyYXkoNCkpLm1hcCgoXykgPT4gdGhpcy5nZXRSYW5kb21Db2xvcigpKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnNlY3JldENvbWJvKTtcbiAgICB0aGlzLnZpZXcuZHJhdyh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRDdXJyZW50TGluZUNvbG9yKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRMaW5lW2luZGV4XSA9IHRoaXMuc2VsZWN0ZWRDb2xvcjtcbiAgICB0aGlzLnZpZXcuZHJhdyh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGVjaygpIHtcbiAgICAvLyBjb21wYXJlIGN1cnJlbnQgbGluZSB0byBzZWNyZXQgY29kZS5cbiAgICBsZXQgd2hpdGUgPSAwO1xuICAgIGxldCByZWQgPSAwO1xuICAgIGNvbnN0IHNlY3JldCA9IHRoaXMuc2VjcmV0Q29tYm8uc2xpY2UoMCk7XG4gICAgY29uc3QgY2hlY2s6IGFueVtdID0gdGhpcy5jdXJyZW50TGluZS5zbGljZSgwKTtcbiAgICBmb3IgKGNvbnN0IGluZGV4IG9mIE9iamVjdC5rZXlzKHNlY3JldCkpIHtcbiAgICAgIGlmIChjaGVja1tpbmRleF0gPT09IHNlY3JldFtpbmRleF0pIHtcbiAgICAgICAgcmVkKys7XG4gICAgICAgIGNoZWNrW2luZGV4XSA9IGZhbHNlO1xuICAgICAgICBzZWNyZXRbaW5kZXhdID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHlvdSB3aW5cbiAgICBpZiAocmVkID09PSA0KSB7XG4gICAgICB0aGlzLndpbigpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGluZGV4IG9mIE9iamVjdC5rZXlzKHNlY3JldCkpIHtcbiAgICAgIGlmIChzZWNyZXRbaW5kZXhdICYmIGNoZWNrLmluY2x1ZGVzKHNlY3JldFtpbmRleF0pKSB7XG4gICAgICAgIHdoaXRlKys7XG4gICAgICAgIGNoZWNrW2NoZWNrLmluZGV4T2Yoc2VjcmV0W2luZGV4XSldID0gTmFOO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxpbmVzLnB1c2goe1xuICAgICAgbGluZTogdGhpcy5jdXJyZW50TGluZS5zcGxpY2UoMCksXG4gICAgICByZXM6IHsgcmVkLCB3aGl0ZSB9LFxuICAgIH0pO1xuICAgIHRoaXMuY3VycmVudExpbmUgPSBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl07XG4gICAgdGhpcy52aWV3LmRyYXcodGhpcyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSB3aW4oKSB7XG4gICAgdGhpcy53b24gPSB0cnVlO1xuICAgIHRoaXMudmlldy5kcmF3KHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSYW5kb21Db2xvcigpOiBJQ29sb3Ige1xuICAgIHJldHVybiB0aGlzLmFsbENvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmFsbENvbG9ycy5sZW5ndGgpXSBhcyBJQ29sb3I7XG4gIH1cbn1cbiIsImltcG9ydCBNb2RlbCwgeyBJTGluZVJlc3VsdCB9IGZyb20gXCIuL21vZGVsXCI7XG5cbmV4cG9ydCBsZXQgc3cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmV4cG9ydCBsZXQgc2ggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gIHN3ID0gd2luZG93LmlubmVyV2lkdGg7XG4gIHNoID0gd2luZG93LmlubmVySGVpZ2h0O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBwdWJsaWMgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHB1YmxpYyBib2FyZFdpZHRoID0gNTAwO1xuICBwdWJsaWMgY2lyY2xlUmFkaXVzID0gMjU7XG4gIHB1YmxpYyBsaW5lSGVpZ2h0ID0gODA7XG4gIHB1YmxpYyByb3dXaWR0aDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb2xvck1hcHBpbmdzOiB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBzdHJpbmcgfVxuICA9IHtcbiAgICByOiBcInJlZFwiLFxuICAgIHk6IFwieWVsbG93XCIsXG4gICAgYjogXCJibHVlXCIsXG4gICAgYTogXCJibGFja1wiLFxuICAgIHc6IFwid2hpdGVcIixcbiAgICBnOiBcImdyZWVuXCIsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lQ2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGNhbnZhcy53aWR0aCA9IHN3O1xuICAgIGNhbnZhcy5oZWlnaHQgPSBzaDtcbiAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5yb3dXaWR0aCA9IHRoaXMuYm9hcmRXaWR0aCAvIDQ7XG4gIH1cblxuICBwdWJsaWMgZHJhdyhtb2RlbDogTW9kZWwpIHtcbiAgICAvLyBiYWNrZ3JvdW5kXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJncmV5XCI7XG4gICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgc3csIHNoKTtcblxuICAgIC8vIGJvYXJkXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJsaWdodGdyZXlcIjtcbiAgICB0aGlzLmN0eC5maWxsUmVjdChzdyAvIDIgLSB0aGlzLmJvYXJkV2lkdGggLyAyLCB0aGlzLmxpbmVIZWlnaHQsIHRoaXMuYm9hcmRXaWR0aCwgc2gpO1xuXG4gICAgLy8gY29sb3IgcGlja2VyXG4gICAgLy8gbG9vcCB0aHJvdWdoIGFsbCB0aGUgY29sb3JzO1xuICAgIGNvbnN0IGNvbG9ycyA9IE9iamVjdC5rZXlzKHRoaXMuY29sb3JNYXBwaW5ncykubWFwKCh4KSA9PiB0aGlzLmNvbG9yTWFwcGluZ3NbeF0pO1xuICAgIGZvciAoY29uc3QgaW5kZXggaW4gY29sb3JzKSB7XG4gICAgICBjb25zdCBjb2xvciA9IGNvbG9yc1tpbmRleF07XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KE51bWJlcihpbmRleCkgKiA1MCArIHN3IC8gMiAtIHRoaXMuYm9hcmRXaWR0aCAvIDIsIDAsIDUwLCA1MCk7XG4gICAgfVxuXG4gICAgLy8gbGluZXNcbiAgICBpZiAobW9kZWwud29uKSB7XG4gICAgICB0aGlzLmRyYXdMaW5lKDEsIG1vZGVsLnNlY3JldENvbWJvKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3TGluZSgyLCBtb2RlbC5jdXJyZW50TGluZSk7XG4gICAgZm9yIChjb25zdCBpbmRleCBpbiBtb2RlbC5saW5lcykge1xuICAgICAgdGhpcy5kcmF3TGluZShtb2RlbC5saW5lcy5sZW5ndGggLSBOdW1iZXIoaW5kZXgpICsgMiwgbW9kZWwubGluZXNbaW5kZXhdLmxpbmUpO1xuICAgICAgdGhpcy5kcmF3UmVzdWx0KG1vZGVsLmxpbmVzLmxlbmd0aCAtIE51bWJlcihpbmRleCkgKyAyLCBtb2RlbC5saW5lc1tpbmRleF0ucmVzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29sb3IoeDogbnVtYmVyKSB7XG4gICAgY29uc3QgY29sb3JJbmRleCA9IE1hdGguZmxvb3IoKHggLSAoc3cgLyAyIC0gdGhpcy5ib2FyZFdpZHRoIC8gMikpIC8gNTApO1xuICAgIGNvbnN0IGNvbG9ycyA9IE9iamVjdC5rZXlzKHRoaXMuY29sb3JNYXBwaW5ncyk7XG4gICAgaWYgKGNvbG9ySW5kZXggaW4gY29sb3JzKSB7XG4gICAgICByZXR1cm4gY29sb3JzW2NvbG9ySW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZHJhd0xpbmUobGluZTogbnVtYmVyLCBjb2xvcnM6IHN0cmluZ1tdKSB7XG4gICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgdGhpcy5jdHgubW92ZVRvKHN3IC8gMiAtIHRoaXMuYm9hcmRXaWR0aCAvIDIsIGxpbmUgKiB0aGlzLmxpbmVIZWlnaHQpO1xuICAgdGhpcy5jdHgubGluZVRvKHN3IC8gMiArIHRoaXMuYm9hcmRXaWR0aCAvIDIsIGxpbmUgKiB0aGlzLmxpbmVIZWlnaHQpO1xuICAgdGhpcy5jdHguc3Ryb2tlKCk7XG5cbiAgIGZvciAoY29uc3QgaW5kZXggaW4gY29sb3JzKSB7XG4gICAgICBjb25zdCBjb2xvciA9IGNvbG9yc1tpbmRleF07XG4gICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvck1hcHBpbmdzW2NvbG9yXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ3JleVwiO1xuICAgICAgfVxuICAgICAgY29uc3QgY2MgPSB0aGlzLmNpcmNsZUNvcmRzKGxpbmUsIE51bWJlcihpbmRleCkpO1xuICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmN0eC5hcmMoY2MueCwgY2MueSwgdGhpcy5jaXJjbGVSYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhd1Jlc3VsdChsaW5lOiBudW1iZXIsIHJlczogSUxpbmVSZXN1bHQpIHtcbiAgICBsZXQgeyByZWQsIHdoaXRlIH0gPSByZXM7XG4gICAgY29uc3QgeSA9IGxpbmUgKiB0aGlzLmxpbmVIZWlnaHQ7XG4gICAgY29uc3QgeCA9IDQgKiB0aGlzLnJvd1dpZHRoICsgKHN3IC8gMiAtIHRoaXMuYm9hcmRXaWR0aCAvIDIpO1xuICAgIHRvcDpcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAyOyBqKyspIHtcbiAgICAgICAgbGV0IGNvbG9yID0gbnVsbDtcbiAgICAgICAgaWYgKHJlZCA+IDApIHtcbiAgICAgICAgICBjb2xvciA9IFwicmVkXCI7XG4gICAgICAgICAgcmVkLS07XG4gICAgICAgIH0gZWxzZSBpZiAod2hpdGUgPiAwKSB7XG4gICAgICAgICAgY29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgICAgd2hpdGUtLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBicmVhayB0b3A7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICBjb25zdCByeCA9IHggKyBpICogdGhpcy5saW5lSGVpZ2h0IC8gMjtcbiAgICAgICAgY29uc3QgcnkgPSB5ICsgaiAqIHRoaXMubGluZUhlaWdodCAvIDI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHJ4LCByeSwgdGhpcy5saW5lSGVpZ2h0IC8gMiwgdGhpcy5saW5lSGVpZ2h0IC8gMik7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QocngsIHJ5LCB0aGlzLmxpbmVIZWlnaHQgLyAyLCB0aGlzLmxpbmVIZWlnaHQgLyAyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2lyY2xlQ29yZHMobGluZTogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgY29uc3QgeCA9IGluZGV4ICogdGhpcy5yb3dXaWR0aCArIHRoaXMucm93V2lkdGggLyAyICsgc3cgLyAyIC0gdGhpcy5ib2FyZFdpZHRoIC8gMjtcbiAgICBjb25zdCB5ID0gdGhpcy5jaXJjbGVSYWRpdXMgKyBsaW5lICogdGhpcy5saW5lSGVpZ2h0ICsgdGhpcy5saW5lSGVpZ2h0IC8gMiAtIHRoaXMuY2lyY2xlUmFkaXVzO1xuICAgIHJldHVybiB7IHgsIHkgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDaXJjbGVJbmRleCh4OiBudW1iZXIpIHtcbiAgICBpZiAoTWF0aC5hYnMoeCAtIHN3IC8gMikgPiB0aGlzLmJvYXJkV2lkdGggLyAyKSB7IHJldHVybiAtMTsgfVxuICAgIHJldHVybiBNYXRoLmZsb29yKCh4IC0gKHRoaXMucm93V2lkdGggLyAyICsgc3cgLyAyIC0gdGhpcy5ib2FyZFdpZHRoIC8gMiArIHRoaXMuY2lyY2xlUmFkaXVzKSkgLyB0aGlzLnJvd1dpZHRoKSArIDE7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=