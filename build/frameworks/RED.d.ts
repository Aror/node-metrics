import Joi from 'joi';
import Base from './Base';
import { counter, histogram } from '../metrics';
type Props = {
    durationLabels: string[];
    requestType: string;
    requestLabels: string[];
};
declare class RED extends Base<Props> {
    private durationLabels;
    private requestLabels;
    private requestType;
    duration: ReturnType<typeof histogram>;
    errors: ReturnType<typeof counter>;
    requests: ReturnType<typeof counter>;
    constructor(params: Props);
    protected schema(): Joi.ObjectSchema<Props>;
}
export default RED;
