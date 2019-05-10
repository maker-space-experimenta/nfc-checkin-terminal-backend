import * as express from 'express';
import UserRepository from '../Repositories/user.repository';
import ScanModel from '../Models/scan.model';
import UserModel from '../Models/user.model';

export default class ScanController {

    private static instance: ScanController;

    private constructor() { }

    public static getInstance(): ScanController {
        if (!ScanController.instance) {
            ScanController.instance = new ScanController();
        }

        return ScanController.instance;
    }

    public ScanEndpoint (req, res) {
        let uid = req.body.uid.toUpperCase();
        let terminalId = req.body.terminalId;
        let user = UserRepository.getInstance().Get(uid);

        if (!user) {
            console.debug('user added - UID ' + uid);
            user = new UserModel(uid);
            UserRepository.getInstance().Add(user);
        }

        user.AddScan(terminalId);

        res.send({ result: user.GetState() ? "added" : "removed" });
    }

    public Register () :express.Router {
        let router = express.Router();
        router.use(express.json());
        router.post('/', this.ScanEndpoint);

        return router;
    }
}