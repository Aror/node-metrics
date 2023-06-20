import { counter, defaultMetrics, histogram } from '../metrics'

type Props = {
  durationLabels: string[]
  requestType: string
  requestLabels: string[]
}

class RED {
  private durationLabels: Props['durationLabels']
  private requestLabels: Props['requestLabels']
  private requestType: Props['requestType']

  public duration: ReturnType<typeof histogram>
  public errors: ReturnType<typeof counter>
  public requests: ReturnType<typeof counter>

  constructor(params: Props) {
    this.durationLabels = params.durationLabels
    this.requestLabels = params.requestLabels
    this.requestType = params.requestType

    this.validate()
    defaultMetrics()

    this.duration = histogram({
      name: `${this.requestType}_duration_seconds`,
      help: `Duration of ${this.requestType} requests in seconds`,
      labelNames: this.durationLabels
    })

    this.errors = counter({
      name: `${this.requestType}_errors_total`,
      help: `Number of ${this.requestType} errors`,
      labelNames: this.requestLabels.concat('error')
    })

    this.requests = counter({
      name: `${this.requestType}_requests_total`,
      help: `Number of ${this.requestType} requests`,
      labelNames: this.requestLabels
    })
  }

  private validate(): void {
    if (!this.requestType || typeof this.requestType !== 'string') {
      throw new Error('requestType is required and must be a string')
    }
    if (!Array.isArray(this.requestLabels) || this.requestLabels.length === 0) {
      throw new Error('requestLabels is required and must be a non-empty array')
    }
    if (!Array.isArray(this.durationLabels) || this.durationLabels.length === 0) {
      throw new Error('durationLabels is required and must be a non-empty array')
    }
    if (this.requestLabels.some(label => typeof label !== 'string')) {
      throw new Error('requestLabels must contain only string values')
    }
    if (this.durationLabels.some(label => typeof label !== 'string')) {
      throw new Error('DurationLabels must contain only string values')
    }
  }
}

export default RED
