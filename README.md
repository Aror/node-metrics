# Metrics Library for Node.js

## A simple, lightweight metrics library that provides an interface for instrumenting Node.js applications with Prometheus.

## Motivation

This library is a JavaScript port of the [metrics](https://github.com/rabellamy/metrics) package written in Go lang by [Tony Bellamy](https://github.com/rabellamy).

Observability is a crucial aspect of building scalable and reliable applications. Instrumenting applications to gather meaningful metrics is a challenging task, especially when teams are not familiar with the fundamental concepts and best practices. This library aims to address these challenges by providing a streamlined approach to instrumenting Node.js applications with Prometheus. It draws inspiration from proven strategies and methodologies, such as the **USE Method**, **RED Method**, and **The Four Golden Signals**.

The primary goals of this library are to:

- Provide **Minimal Viable Metrics (MVMs)** based on well-established strategies, allowing teams to bootstrap their instrumentation efforts.
- Simplify the process of creating Prometheus counters, gauges, histograms, and summaries.
- Foster the adoption of **Service Level Objectives (SLOs)** and proven instrumentation practices.

## Features

- Easy creation of Prometheus counters, gauges, histograms, and summaries.
- Implementation of **MVMs** based on the **USE Method**, **RED Method**, and **The Four Golden Signals**.

## Naming
- `RED` class represents the RED method which focuses on measuring:
  - **Rate** - the number of requests, per second, you services are serving
  - **Errors** - the number of failed requests per second
  - **Duration** - distributions of the amount of time each request takes
- `FourGoldenSignals` class stands for UserPerformance Metrics. It follows **The Four Golden Signals** and focuses on measuring:
  - **Latency** - the time it takes to service a request
  - **Traffic** - how much demand is being placed on your system
  - **Errors** - rate of requests that fail
  - **Saturation** - measure of system consumption
- `USE` class represents the USE method which focuses on measuring:
  - **Errors** - count of error events
  - **Saturation** - the degree to which the resource has extra work which it can't service, often queued
  - **Utilization** - the average time that the resource was busy servicing work

## Usage

- Install the library
- Import one of the MVM classes
```JavaScript
import { USE } from 'node-metrics'

// Create an instance of USE with the desired configuration
const useMetrics = new USE({
  saturationName: 'saturation',
  saturationHelp: 'saturation metric help text',
  saturationLabels: ['label1', 'label2'],
  utilizationName: 'utilization',
  utilizationHelp: 'utilization metric help text',
  utilizationLabels: ['label3', 'label4'],
})

// Increment the error counter
useMetrics.errors.inc()

// Set the saturation and utilization values
useMetrics.saturation.set({ label1: 'value1', label2: 'value2' }, 0.75)
useMetrics.utilization.set({ label3: 'value3', label4: 'value4' }, 0.5)
```

OR
- Use basic prometheus metrics:
```JavaScript
import { counter, defaultMetrics, gauge, histogram, summary } from 'node-metrics'

// Register default metrics collector
defaultMetrics()

// Create a counter metric
const errorCounter = counter({
  name: 'errors_total',
  help: 'number of errors',
  labelNames: ['error'],
})

// Increment the error counter
errorCounter.inc({ error: 'sample_error' })

// Create a gauge metric
const saturationGauge = gauge({
  name: 'saturation',
  help: 'saturation metric help text',
  labelNames: ['label1', 'label2'],
})

// Set the saturation value
saturationGauge.set({ label1: 'value1', label2: 'value2' }, 0.75)

// Create a histogram metric
const responseTimeHistogram = histogram({
  name: 'response_time',
  help: 'response time metric help text',
  labelNames: ['endpoint'],
})

// Observe a response time value
responseTimeHistogram.observe({ endpoint: '/api/some-endpoint' }, 100)

// Create a summary metric
const requestSizeSummary = summary({
  name: 'request_size',
  help: 'request size metric help text',
  labelNames: ['endpoint'],
})

// Observe a request size value
requestSizeSummary.observe({ endpoint: '/api/another-endpoint' }, 1024)
```
- to expose the metrics to prometheus, use the `collect` method:

```JavaScript
import { collect } from 'node-metrics'

app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.end(collect())
})

```
