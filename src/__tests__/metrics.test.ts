import { collect, counter, defaultMetrics, gauge, histogram, summary, getContentType } from '../metrics'
import promClient, { collectDefaultMetrics, Counter, Histogram, Gauge, Summary, register } from 'prom-client'

const params = {
  name: 'test name',
  help: 'help test',
  labelNames: ['label1', 'label2']
}

describe('metrics', () => {
  test.each([
    [counter, Counter],
    [histogram, Histogram],
    [gauge, Gauge],
    [summary, Summary]
  ])('%p passes correct params to %p', (a, b) => {
    // @ts-expect-error (ts2339)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    register.getSingleMetric.mockReturnValue(undefined)
    a(params)
    expect(b).toHaveBeenCalledWith(params)
  })

  test.each([[counter], [histogram], [gauge], [summary]])('prevents to register duplicate metrics, method=%p', (method) => {
    // @ts-expect-error (ts2339)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    register.getSingleMetric.mockReturnValue(undefined)
    const result1 = method(params)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(register.getSingleMetric).toHaveBeenCalledTimes(1)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(register.getSingleMetric).toHaveBeenLastCalledWith(params.name)

    // @ts-expect-error (ts2339)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    register.getSingleMetric.mockReturnValue(result1)
    const result2 = method(params)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(register.getSingleMetric).toHaveBeenCalledTimes(2)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(register.getSingleMetric).toHaveBeenLastCalledWith(params.name)
    expect(result1).toEqual(result2)
  })

  it('collects metrics', async () => {
    await collect()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(promClient.register.metrics).toHaveBeenCalled()
  })

  it('collects default metrics', () => {
    defaultMetrics()
    expect(collectDefaultMetrics).toHaveBeenCalled()
  })

  it('get content type', () => {
    expect(getContentType()).toEqual('contentType')
  })
})
