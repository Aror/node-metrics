"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const Base_1 = __importDefault(require("./Base"));
const metrics_1 = require("../metrics");
class RED extends Base_1.default {
    constructor(params) {
        super();
        this.durationLabels = params.durationLabels;
        this.requestLabels = params.requestLabels;
        this.requestType = params.requestType;
        this.validate(params);
        (0, metrics_1.defaultMetrics)();
        this.duration = (0, metrics_1.histogram)({
            name: `${this.requestType}_duration_seconds`,
            help: `Duration of ${this.requestType} requests in seconds`,
            labelNames: this.durationLabels
        });
        this.errors = (0, metrics_1.counter)({
            name: `${this.requestType}_errors_total`,
            help: `Number of ${this.requestType} errors`,
            labelNames: this.requestLabels.concat('error')
        });
        this.requests = (0, metrics_1.counter)({
            name: `${this.requestType}_requests_total`,
            help: `Number of ${this.requestType} requests`,
            labelNames: this.requestLabels
        });
    }
    schema() {
        return joi_1.default.object({
            durationLabels: joi_1.default.array().items(joi_1.default.string()).min(1),
            requestType: joi_1.default.string(),
            requestLabels: joi_1.default.array().items(joi_1.default.string()).min(1)
        });
    }
}
exports.default = RED;
