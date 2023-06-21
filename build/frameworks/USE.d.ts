import { counter, gauge } from '../metrics';
type Props = {
    saturationName: string;
    saturationHelp: string;
    saturationLabels: string[];
    utilizationName: string;
    utilizationHelp: string;
    utilizationLabels: string[];
};
declare class USE {
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
    private validate;
}
export default USE;
