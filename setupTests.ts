jest.mock('prom-client', () => ({
  collectDefaultMetrics: jest.fn(),
  Counter: jest.fn(),
  Gauge: jest.fn(),
  Histogram: jest.fn(),
  register: {
    metrics: jest.fn(),
    getSingleMetric: jest.fn(),
    contentType: 'contentType'
  },
  Summary: jest.fn()
}))
