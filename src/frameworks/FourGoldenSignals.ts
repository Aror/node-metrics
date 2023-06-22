import Joi from 'joi'
import Base from './Base'
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

class FourGoldenSignals extends Base<Props> {
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
    super()
    this.latencyName = params.latencyName
    this.latencyHelp = params.latencyHelp
    this.latencyLabels = params.latencyLabels
    this.trafficName = params.trafficName
    this.trafficHelp = params.trafficHelp
    this.trafficLabels = params.trafficLabels
    this.saturationName = params.saturationName
    this.saturationHelp = params.saturationHelp
    this.saturationLabels = params.saturationLabels

    this.validate(params)
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

  protected schema(): Joi.ObjectSchema<Props> {
    return Joi.object({
      latencyName: Joi.string(),
      latencyHelp: Joi.string(),
      latencyLabels: Joi.array().items(Joi.string()).min(1),
      saturationName: Joi.string(),
      saturationHelp: Joi.string(),
      saturationLabels: Joi.array().items(Joi.string()).min(1),
      trafficName: Joi.string(),
      trafficHelp: Joi.string(),
      trafficLabels: Joi.array().items(Joi.string()).min(1)
    })
  }
}

export default FourGoldenSignals
