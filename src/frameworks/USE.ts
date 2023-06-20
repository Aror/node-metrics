import { counter, defaultMetrics, gauge } from '../metrics'

type Props = {
  saturationName: string
  saturationHelp: string
  saturationLabels: string[]
  utilizationName: string
  utilizationHelp: string
  utilizationLabels: string[]
}

class USE {
  private saturationName: Props['saturationName']
  private saturationHelp: Props['saturationHelp']
  private saturationLabels: Props['saturationLabels']
  private utilizationName: Props['utilizationName']
  private utilizationHelp: Props['utilizationHelp']
  private utilizationLabels: Props['utilizationLabels']

  public errors: ReturnType<typeof counter>
  public saturation: ReturnType<typeof gauge>
  public utilization: ReturnType<typeof gauge>

  constructor(params: Props) {
    this.saturationName = params.saturationName
    this.saturationHelp = params.saturationHelp
    this.saturationLabels = params.saturationLabels
    this.utilizationName = params.utilizationName
    this.utilizationHelp = params.utilizationHelp
    this.utilizationLabels = params.utilizationLabels

    this.validate()
    defaultMetrics()

    this.errors = counter({
      name: 'errors_total',
      help: 'Number of errors',
      labelNames: ['error']
    })

    this.saturation = gauge({
      name: params.saturationName,
      help: params.saturationHelp,
      labelNames: params.saturationLabels
    })

    this.utilization = gauge({
      name: params.utilizationName,
      help: params.utilizationHelp,
      labelNames: params.utilizationLabels
    })
  }

  private validate(): void {
    if (!this.saturationName || typeof this.saturationName !== 'string') {
      throw new Error('saturationName is required and must be a string')
    }
    if (!this.saturationHelp || typeof this.saturationHelp !== 'string') {
      throw new Error('saturationHelp is required and must be a string')
    }
    if (!Array.isArray(this.saturationLabels) || this.saturationLabels.length === 0) {
      throw new Error('saturationLabels is required and must be a non-empty array')
    }
    if (!this.utilizationName || typeof this.utilizationName !== 'string') {
      throw new Error('utilizationName is required and must be a string')
    }
    if (!this.utilizationHelp || typeof this.utilizationHelp !== 'string') {
      throw new Error('utilizationHelp is required and must be a string')
    }
    if (!Array.isArray(this.utilizationLabels) || this.utilizationLabels.length === 0) {
      throw new Error('utilizationLabels is required and must be a non-empty array')
    }
    if (this.saturationLabels.some(label => typeof label !== 'string')) {
      throw new Error('saturationLabels must contain only string values')
    }
    if (this.utilizationLabels.some(label => typeof label !== 'string')) {
      throw new Error('utilizationLabels must contain only string values')
    }
  }
}

export default USE
