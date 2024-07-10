import promClient, { collectDefaultMetrics, Counter, Gauge, Histogram, Summary, register } from 'prom-client'

interface Metrics {
  name: string
  help: string
  labelNames: string[]
}

function getContentType(): string {
  return promClient.register.contentType
}

function collect(): Promise<string> {
  return promClient.register.metrics()
}

function counter(params: Metrics): Counter {
  const result = register.getSingleMetric(params.name) as Counter | undefined
  if (result) {
    return result
  }
  return new Counter(params)
}

function defaultMetrics(): void {
  collectDefaultMetrics()
}

function gauge(params: Metrics): Gauge {
  const result = register.getSingleMetric(params.name) as Gauge | undefined
  if (result) {
    return result
  }
  return new Gauge(params)
}

function histogram(params: Metrics): Histogram {
  const result = register.getSingleMetric(params.name) as Histogram | undefined
  if (result) {
    return result
  }
  return new Histogram(params)
}

function summary(params: Metrics): Summary {
  const result = register.getSingleMetric(params.name) as Summary | undefined
  if (result) {
    return result
  }
  return new Summary(params)
}

export { getContentType, collect, counter, defaultMetrics, gauge, histogram, summary }
