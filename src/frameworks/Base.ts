import type Joi from 'joi'

abstract class Base<T> {
  protected abstract schema(): Joi.ObjectSchema<T>

  protected validate(params: T) {
    const schema = this.schema()
    const { error, value } = schema.validate(params)

    if (error) {
      throw new Error(`Validation failed: ${error.details.map((detail) => detail.message).join(', ')}`)
    }

    return value
  }
}
export default Base
