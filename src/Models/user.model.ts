
import ScanModel from './scan.model';

export default class UserModel {

    constructor (uid: string) {
        this.uid = uid;
    }

    public uid: String;
    public scans: ScanModel[] = [];
    public isPresent: boolean = false;

    public GetState(): boolean {
        return this.isPresent;
    }

    public AddScan(terminalId: string)  {
        this.scans.push(new ScanModel(new Date(), terminalId));

        this.isPresent = !this.isPresent;
    }

    public GetLastScan(): ScanModel {
        return this.scans[this.scans.length - 1];
    }
}