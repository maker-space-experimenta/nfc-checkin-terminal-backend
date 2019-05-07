
import * as moment from 'moment';
import ScanModel from './scan.model';

export default class UserModel {

    constructor (uuid: string) {
        this.uuid = uuid;
    }

    public uuid: String;
    public scans: ScanModel[] = [];

    public GetState() {
        let scans = this.scans.filter(d => moment(d.date).isAfter(moment().subtract(10, 'h')));
        
        if (scans.length % 2 == 0)
            return false;
        
        return true;
    }
}