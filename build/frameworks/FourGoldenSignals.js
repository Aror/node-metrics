"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const Base_1 = __importDefault(require("./Base"));
const metrics_1 = require("../metrics");
class FourGoldenSignals extends Base_1.default {
    constructor(params) {
        super();
        this.latencyName = params.latencyName;
        this.latencyHelp = params.latencyHelp;
        this.latencyLabels = params.latencyLabels;
        this.trafficName = params.trafficName;
        this.trafficHelp = params.trafficHelp;
        this.trafficLabels = params.trafficLabels;
        this.saturationName = params.saturationName;
        this.saturationHelp = params.saturationHelp;
        this.saturationLabels = params.saturationLabels;
        this.validate(params);
        (0, metrics_1.defaultMetrics)();
        this.errors = (0, metrics_1.counter)({
            name: 'errors_total',
            help: 'Number of errors',
            labelNames: ['error']
        });
        this.latency = (0, metrics_1.histogram)({
            name: this.latencyName,
            help: this.latencyHelp,
            labelNames: this.latencyLabels,
        });
        this.saturation = (0, metrics_1.gauge)({
            name: this.saturationName,
            help: this.saturationHelp,
            labelNames: this.saturationLabels
        });
        this.traffic = (0, metrics_1.counter)({
            name: this.trafficName,
            help: this.trafficHelp,
            labelNames: this.trafficLabels
        });
    }
    schema() {
        return joi_1.default.object({
            latencyName: joi_1.default.string(),
            latencyHelp: joi_1.default.string(),
            latencyLabels: joi_1.default.array().items(joi_1.default.string()).min(1),
            saturationName: joi_1.default.string(),
            saturationHelp: joi_1.default.string(),
            saturationLabels: joi_1.default.array().items(joi_1.default.string()).min(1),
            trafficName: joi_1.default.string(),
            trafficHelp: joi_1.default.string(),
            trafficLabels: joi_1.default.array().items(joi_1.default.string()).min(1)
        });
    }
}
exports.default = FourGoldenSignals;
