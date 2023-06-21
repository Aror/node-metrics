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
declare class FourGoldenSignalsOpts {
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
    validate(): void;
}
export default FourGoldenSignalsOpts;
