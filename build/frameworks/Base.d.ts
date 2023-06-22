import type Joi from 'joi';
declare abstract class Base<T> {
    protected abstract schema(): Joi.ObjectSchema<T>;
    protected validate(params: T): T;
}
export default Base;
