import Joi from 'joi'
import Base from './Base'
import { counter, defaultMetrics, gauge } from '../metrics'

type Props = {
  saturationName: string
  saturationHelp: string
  saturationLabels: string[]
  utilizationName: string
  utilizationHelp: string
  utilizationLabels: string[]
}

class USE extends Base<Props> {
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
    super()
    this.saturationName = params.saturationName
    this.saturationHelp = params.saturationHelp
    this.saturationLabels = params.saturationLabels
    this.utilizationName = params.utilizationName
    this.utilizationHelp = params.utilizationHelp
    this.utilizationLabels = params.utilizationLabels

    this.validate(params)
    defaultMetrics()

    this.errors = counter({
      name: 'errors_total',
      help: 'Number of errors',
      labelNames: ['error']
    })

    this.saturation = gauge({
      name: this.saturationName,
      help: this.saturationHelp,
      labelNames: this.saturationLabels
    })

    this.utilization = gauge({
      name: this.utilizationName,
      help: this.utilizationHelp,
      labelNames: this.utilizationLabels
    })
  }

  protected schema(): Joi.ObjectSchema<Props> {
    return Joi.object({
      saturationName: Joi.string(),
      saturationHelp: Joi.string(),
      saturationLabels: Joi.array().items(Joi.string()).min(1),
      utilizationName: Joi.string(),
      utilizationHelp: Joi.string(),
      utilizationLabels: Joi.array().items(Joi.string()).min(1)
    })
  }
}

export default USE
