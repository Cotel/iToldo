"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var functions_1 = require("../src/awning/functions");
var nodeplotlib_1 = require("nodeplotlib");
var range = function (from, to, step) {
    if (step === void 0) { step = 1; }
    return __spreadArray([], Array(Math.floor((to - from) / step) + 1), true).map(function (_, i) { return from + i * step; });
};
var October_29_SunTimes = {
    sunrise: 1635488873000,
    sunset: 1635527160000
};
var startOfDay = 1635458400;
var endOfDay = 1635544799;
var millisRange = range(startOfDay, endOfDay, 300);
var awningPositions = millisRange.map(function (now) { return (0, functions_1.determineAwningPosition)("Clear", 10, October_29_SunTimes, new Date(now * 1000)); });
var result = [{
        x: millisRange.map(function (millis) {
            var date = new Date(millis * 1000);
            return date.toLocaleTimeString();
        }),
        y: awningPositions,
        type: "scatter"
    }];
(0, nodeplotlib_1.plot)(result);
