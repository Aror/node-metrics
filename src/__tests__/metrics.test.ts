import { collect, counter, defaultMetrics, gauge, histogram, summary } from '../metrics'
import promClient, { collectDefaultMetrics, Counter, Histogram, Gauge, Summary } from 'prom-client'

const params = {
  name: 'test name',
  help: 'help test',
  labelNames: ['label1', 'label2']
}

describe('metrics', () => {
  test.each([[counter, Counter], [histogram, Histogram], [gauge, Gauge], [summary, Summary]])(
    '%p passes correct params to %p',
    (a, b) => {
      a(params)
      expect(b).toHaveBeenCalledWith(params)
    }
  )

  it('collects metrics', () => {
    collect()
    expect(promClient.register.metrics).toHaveBeenCalled()
  })

  it('collects default metrics', async () => {
    await defaultMetrics()
    expect(collectDefaultMetrics).toHaveBeenCalled()
  })
})
