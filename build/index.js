"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summary = exports.histogram = exports.gauge = exports.defaultMetrics = exports.counter = exports.collect = exports.USE = exports.RED = exports.FourGoldenSignals = void 0;
var FourGoldenSignals_1 = require("./frameworks/FourGoldenSignals");
Object.defineProperty(exports, "FourGoldenSignals", { enumerable: true, get: function () { return __importDefault(FourGoldenSignals_1).default; } });
var RED_1 = require("./frameworks/RED");
Object.defineProperty(exports, "RED", { enumerable: true, get: function () { return __importDefault(RED_1).default; } });
var USE_1 = require("./frameworks/USE");
Object.defineProperty(exports, "USE", { enumerable: true, get: function () { return __importDefault(USE_1).default; } });
var metrics_1 = require("./metrics");
Object.defineProperty(exports, "collect", { enumerable: true, get: function () { return metrics_1.collect; } });
Object.defineProperty(exports, "counter", { enumerable: true, get: function () { return metrics_1.counter; } });
Object.defineProperty(exports, "defaultMetrics", { enumerable: true, get: function () { return metrics_1.defaultMetrics; } });
Object.defineProperty(exports, "gauge", { enumerable: true, get: function () { return metrics_1.gauge; } });
Object.defineProperty(exports, "histogram", { enumerable: true, get: function () { return metrics_1.histogram; } });
Object.defineProperty(exports, "summary", { enumerable: true, get: function () { return metrics_1.summary; } });
