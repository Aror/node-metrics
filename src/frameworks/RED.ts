import Joi from 'joi'
import Base from './Base'
import { counter, defaultMetrics, histogram } from '../metrics'

type Props = {
  durationLabels: string[]
  requestType: string
  requestLabels: string[]
  collectDefaultMetrics?: boolean
}

class RED extends Base<Props> {
  private durationLabels: Props['durationLabels']
  private requestLabels: Props['requestLabels']
  private requestType: Props['requestType']

  public duration: ReturnType<typeof histogram>
  public errors: ReturnType<typeof counter>
  public requests: ReturnType<typeof counter>

  constructor(params: Props) {
    super()
    this.durationLabels = params.durationLabels
    this.requestLabels = params.requestLabels
    this.requestType = params.requestType

    this.validate(params)

    if (params.collectDefaultMetrics) {
      defaultMetrics()
    }

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

  protected schema(): Joi.ObjectSchema<Props> {
    return Joi.object({
      durationLabels: Joi.array().items(Joi.string()).min(1),
      requestType: Joi.string(),
      requestLabels: Joi.array().items(Joi.string()).min(1),
      collectDefaultMetrics: Joi.boolean()
    })
  }
}

export default RED
