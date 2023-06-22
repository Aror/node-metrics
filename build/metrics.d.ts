import { Counter, Gauge, Histogram, Summary } from 'prom-client';
interface Metrics {
    name: string;
    help: string;
    labelNames: string[];
}
declare function collect(): Promise<string>;
declare function counter(params: Metrics): Counter;
declare function defaultMetrics(): void;
declare function gauge(params: Metrics): Gauge;
declare function histogram(params: Metrics): Histogram;
declare function summary(params: Metrics): Summary;
export { collect, counter, defaultMetrics, gauge, histogram, summary };
