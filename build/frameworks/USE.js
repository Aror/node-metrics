"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const Base_1 = __importDefault(require("./Base"));
const metrics_1 = require("../metrics");
class USE extends Base_1.default {
    constructor(params) {
        super();
        this.saturationName = params.saturationName;
        this.saturationHelp = params.saturationHelp;
        this.saturationLabels = params.saturationLabels;
        this.utilizationName = params.utilizationName;
        this.utilizationHelp = params.utilizationHelp;
        this.utilizationLabels = params.utilizationLabels;
        this.validate(params);
        (0, metrics_1.defaultMetrics)();
        this.errors = (0, metrics_1.counter)({
            name: 'errors_total',
            help: 'Number of errors',
            labelNames: ['error']
        });
        this.saturation = (0, metrics_1.gauge)({
            name: this.saturationName,
            help: this.saturationHelp,
            labelNames: this.saturationLabels
        });
        this.utilization = (0, metrics_1.gauge)({
            name: this.utilizationName,
            help: this.utilizationHelp,
            labelNames: this.utilizationLabels
        });
    }
    schema() {
        return joi_1.default.object({
            saturationName: joi_1.default.string(),
            saturationHelp: joi_1.default.string(),
            saturationLabels: joi_1.default.array().items(joi_1.default.string()).min(1),
            utilizationName: joi_1.default.string(),
            utilizationHelp: joi_1.default.string(),
            utilizationLabels: joi_1.default.array().items(joi_1.default.string()).min(1)
        });
    }
}
exports.default = USE;
