"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summary = exports.histogram = exports.gauge = exports.defaultMetrics = exports.counter = exports.collect = void 0;
const prom_client_1 = __importStar(require("prom-client"));
function collect() {
    return prom_client_1.default.register.metrics();
}
exports.collect = collect;
function counter(params) {
    return new prom_client_1.Counter(params);
}
exports.counter = counter;
function defaultMetrics() {
    (0, prom_client_1.collectDefaultMetrics)();
}
exports.defaultMetrics = defaultMetrics;
function gauge(params) {
    return new prom_client_1.Gauge(params);
}
exports.gauge = gauge;
function histogram(params) {
    return new prom_client_1.Histogram(params);
}
exports.histogram = histogram;
function summary(params) {
    return new prom_client_1.Summary(params);
}
exports.summary = summary;
