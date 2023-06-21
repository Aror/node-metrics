import { counter, histogram } from '../metrics';
type Props = {
    durationLabels: string[];
    requestType: string;
    requestLabels: string[];
};
declare class RED {
    private durationLabels;
    private requestLabels;
    private requestType;
    duration: ReturnType<typeof histogram>;
    errors: ReturnType<typeof counter>;
    requests: ReturnType<typeof counter>;
    constructor(params: Props);
    private validate;
}
export default RED;
