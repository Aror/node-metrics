import promClient, { collectDefaultMetrics, Counter, Gauge, Histogram, Summary } from 'prom-client'

interface Metrics {
  name: string
  help: string
  labelNames: string[]
}

function collect(): Promise<string> {
  return promClient.register.metrics()
}

function counter(params: Metrics): Counter {
  return new Counter(params)
}

function defaultMetrics(): void {
  collectDefaultMetrics()
}

function gauge(params: Metrics): Gauge {
  return new Gauge(params)
}

function histogram(params: Metrics): Histogram {
  return new Histogram(params)
}

function summary(params: Metrics): Summary {
  return new Summary(params)
}

export {
  collect,
  counter,
  defaultMetrics,
  gauge,
  histogram,
  summary
}
