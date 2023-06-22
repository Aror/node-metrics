import Joi from 'joi';
import Base from './Base';
import { counter, gauge } from '../metrics';
type Props = {
    saturationName: string;
    saturationHelp: string;
    saturationLabels: string[];
    utilizationName: string;
    utilizationHelp: string;
    utilizationLabels: string[];
};
declare class USE extends Base<Props> {
    private saturationName;
    private saturationHelp;
    private saturationLabels;
    private utilizationName;
    private utilizationHelp;
    private utilizationLabels;
    errors: ReturnType<typeof counter>;
    saturation: ReturnType<typeof gauge>;
    utilization: ReturnType<typeof gauge>;
    constructor(params: Props);
    protected schema(): Joi.ObjectSchema<Props>;
}
export default USE;
