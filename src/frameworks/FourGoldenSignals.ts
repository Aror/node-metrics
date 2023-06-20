import { counter, defaultMetrics, gauge, histogram } from '../metrics'

type Props = {
  latencyName: string
  latencyHelp: string
  latencyLabels: string[]
  trafficName: string
  trafficHelp: string
  trafficLabels: string[]
  saturationName: string
  saturationHelp: string
  saturationLabels: string[]
}

class FourGoldenSignalsOpts {
  private latencyName: Props['latencyName']
  private latencyHelp: Props['latencyHelp']
  private latencyLabels: Props['latencyLabels']
  private trafficName: Props['trafficName']
  private trafficHelp: Props['trafficHelp']
  private trafficLabels: Props['trafficLabels']
  private saturationName: Props['saturationName']
  private saturationHelp: Props['saturationHelp']
  private saturationLabels: Props['saturationLabels']

  public errors: ReturnType<typeof counter>
  public latency: ReturnType<typeof histogram>
  public saturation: ReturnType<typeof gauge>
  public traffic: ReturnType<typeof counter>

  constructor(params: Props) {
    this.latencyName = params.latencyName
    this.latencyHelp = params.latencyHelp
    this.latencyLabels = params.latencyLabels
    this.trafficName = params.trafficName
    this.trafficHelp = params.trafficHelp
    this.trafficLabels = params.trafficLabels
    this.saturationName = params.saturationName
    this.saturationHelp = params.saturationHelp
    this.saturationLabels = params.saturationLabels

    this.validate()
    defaultMetrics()

    this.errors = counter({
      name: 'errors_total',
      help: 'Number of errors',
      labelNames: ['error']
    })

    this.latency = histogram({
      name: this.latencyName,
      help: this.latencyHelp,
      labelNames: this.latencyLabels,
    })

    this.saturation = gauge({
      name: this.saturationName,
      help: this.saturationHelp,
      labelNames: this.saturationLabels
    })

    this.traffic = counter({
      name: this.trafficName,
      help: this.trafficHelp,
      labelNames: this.trafficLabels
    })
  }

   validate(): void {
    if (!this.latencyName || typeof this.latencyName !== 'string') {
      throw new Error('latencyName is required and must be a string')
    }
    if (!this.latencyHelp || typeof this.latencyHelp !== 'string') {
      throw new Error('latencyHelp is required and must be a string')
    }
    if (!Array.isArray(this.latencyLabels) || this.latencyLabels.length === 0) {
      throw new Error('latencyLabels is required and must be a non-empty array')
    }
    if (!this.trafficName || typeof this.trafficName !== 'string') {
      throw new Error('trafficName is required and must be a string')
    }
    if (!this.trafficHelp || typeof this.trafficHelp !== 'string') {
      throw new Error('trafficHelp is required and must be a string')
    }
    if (!Array.isArray(this.trafficLabels) || this.trafficLabels.length === 0) {
      throw new Error('trafficLabels is required and must be a non-empty array')
    }
    if (!this.saturationName || typeof this.saturationName !== 'string') {
      throw new Error('saturationName is required and must be a string')
    }
    if (!this.saturationHelp || typeof this.saturationHelp !== 'string') {
      throw new Error('saturationHelp is required and must be a string')
    }
    if (!Array.isArray(this.saturationLabels) || this.saturationLabels.length === 0) {
      throw new Error('saturationLabels is required and must be a non-empty array')
    }
    if (this.latencyLabels.some(label => typeof label !== 'string')) {
      throw new Error('latencyLabels must contain only string values')
    }
    if (this.trafficLabels.some(label => typeof label !== 'string')) {
      throw new Error('trafficLabels must contain only string values')
    }
    if (this.saturationLabels.some(label => typeof label !== 'string')) {
      throw new Error('saturationLabels must contain only string values')
    }
  }
}

export default FourGoldenSignalsOpts
