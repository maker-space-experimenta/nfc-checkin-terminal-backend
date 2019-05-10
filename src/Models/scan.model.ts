
import * as moment from 'moment';

export default class ScanModel {

    constructor (d: Date, terminalId: string) {
        this.date = d;
        this.terminalId = terminalId;
    }

    public date: Date;
    public terminalId: string;
}