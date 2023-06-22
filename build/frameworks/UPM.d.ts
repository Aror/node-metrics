import Joi from 'joi';
import Base from './Base';
import { counter, gauge, histogram } from '../metrics';
type Props = {
    latencyName: string;
    latencyHelp: string;
    latencyLabels: string[];
    trafficName: string;
    trafficHelp: string;
    trafficLabels: string[];
    saturationName: string;
    saturationHelp: string;
    saturationLabels: string[];
};
declare class UPM extends Base<Props> {
    private latencyName;
    private latencyHelp;
    private latencyLabels;
    private trafficName;
    private trafficHelp;
    private trafficLabels;
    private saturationName;
    private saturationHelp;
    private saturationLabels;
    errors: ReturnType<typeof counter>;
    latency: ReturnType<typeof histogram>;
    saturation: ReturnType<typeof gauge>;
    traffic: ReturnType<typeof counter>;
    constructor(params: Props);
    protected schema(): Joi.ObjectSchema<Props>;
}
export default UPM;
