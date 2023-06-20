"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("../metrics");
class USE {
    constructor(params) {
        this.saturationName = params.saturationName;
        this.saturationHelp = params.saturationHelp;
        this.saturationLabels = params.saturationLabels;
        this.utilizationName = params.utilizationName;
        this.utilizationHelp = params.utilizationHelp;
        this.utilizationLabels = params.utilizationLabels;
        this.validate();
        (0, metrics_1.defaultMetrics)();
        this.errors = (0, metrics_1.counter)({
            name: 'errors_total',
            help: 'Number of errors',
            labelNames: ['error']
        });
        this.saturation = (0, metrics_1.gauge)({
            name: params.saturationName,
            help: params.saturationHelp,
            labelNames: params.saturationLabels
        });
        this.utilization = (0, metrics_1.gauge)({
            name: params.utilizationName,
            help: params.utilizationHelp,
            labelNames: params.utilizationLabels
        });
    }
    validate() {
        if (!this.saturationName || typeof this.saturationName !== 'string') {
            throw new Error('saturationName is required and must be a string');
        }
        if (!this.saturationHelp || typeof this.saturationHelp !== 'string') {
            throw new Error('saturationHelp is required and must be a string');
        }
        if (!Array.isArray(this.saturationLabels) || this.saturationLabels.length === 0) {
            throw new Error('saturationLabels is required and must be a non-empty array');
        }
        if (!this.utilizationName || typeof this.utilizationName !== 'string') {
            throw new Error('utilizationName is required and must be a string');
        }
        if (!this.utilizationHelp || typeof this.utilizationHelp !== 'string') {
            throw new Error('utilizationHelp is required and must be a string');
        }
        if (!Array.isArray(this.utilizationLabels) || this.utilizationLabels.length === 0) {
            throw new Error('utilizationLabels is required and must be a non-empty array');
        }
        if (this.saturationLabels.some(label => typeof label !== 'string')) {
            throw new Error('saturationLabels must contain only string values');
        }
        if (this.utilizationLabels.some(label => typeof label !== 'string')) {
            throw new Error('utilizationLabels must contain only string values');
        }
    }
}
exports.default = USE;
