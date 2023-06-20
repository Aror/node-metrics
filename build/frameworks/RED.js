"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("../metrics");
class RED {
    constructor(params) {
        this.durationLabels = params.durationLabels;
        this.requestLabels = params.requestLabels;
        this.requestType = params.requestType;
        this.validate();
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
    validate() {
        if (!this.requestType || typeof this.requestType !== 'string') {
            throw new Error('requestType is required and must be a string');
        }
        if (!Array.isArray(this.requestLabels) || this.requestLabels.length === 0) {
            throw new Error('requestLabels is required and must be a non-empty array');
        }
        if (!Array.isArray(this.durationLabels) || this.durationLabels.length === 0) {
            throw new Error('durationLabels is required and must be a non-empty array');
        }
        if (this.requestLabels.some(label => typeof label !== 'string')) {
            throw new Error('requestLabels must contain only string values');
        }
        if (this.durationLabels.some(label => typeof label !== 'string')) {
            throw new Error('DurationLabels must contain only string values');
        }
    }
}
exports.default = RED;
