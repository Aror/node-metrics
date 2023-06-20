"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("../metrics");
class FourGoldenSignalsOpts {
    constructor(params) {
        this.latencyName = params.latencyName;
        this.latencyHelp = params.latencyHelp;
        this.latencyLabels = params.latencyLabels;
        this.trafficName = params.trafficName;
        this.trafficHelp = params.trafficHelp;
        this.trafficLabels = params.trafficLabels;
        this.saturationName = params.saturationName;
        this.saturationHelp = params.saturationHelp;
        this.saturationLabels = params.saturationLabels;
        this.validate();
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
    validate() {
        if (!this.latencyName || typeof this.latencyName !== 'string') {
            throw new Error('latencyName is required and must be a string');
        }
        if (!this.latencyHelp || typeof this.latencyHelp !== 'string') {
            throw new Error('latencyHelp is required and must be a string');
        }
        if (!Array.isArray(this.latencyLabels) || this.latencyLabels.length === 0) {
            throw new Error('latencyLabels is required and must be a non-empty array');
        }
        if (!this.trafficName || typeof this.trafficName !== 'string') {
            throw new Error('trafficName is required and must be a string');
        }
        if (!this.trafficHelp || typeof this.trafficHelp !== 'string') {
            throw new Error('trafficHelp is required and must be a string');
        }
        if (!Array.isArray(this.trafficLabels) || this.trafficLabels.length === 0) {
            throw new Error('trafficLabels is required and must be a non-empty array');
        }
        if (!this.saturationName || typeof this.saturationName !== 'string') {
            throw new Error('saturationName is required and must be a string');
        }
        if (!this.saturationHelp || typeof this.saturationHelp !== 'string') {
            throw new Error('saturationHelp is required and must be a string');
        }
        if (!Array.isArray(this.saturationLabels) || this.saturationLabels.length === 0) {
            throw new Error('saturationLabels is required and must be a non-empty array');
        }
        if (this.latencyLabels.some(label => typeof label !== 'string')) {
            throw new Error('latencyLabels must contain only string values');
        }
        if (this.trafficLabels.some(label => typeof label !== 'string')) {
            throw new Error('trafficLabels must contain only string values');
        }
        if (this.saturationLabels.some(label => typeof label !== 'string')) {
            throw new Error('saturationLabels must contain only string values');
        }
    }
}
exports.default = FourGoldenSignalsOpts;
