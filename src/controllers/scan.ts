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
        let uuid = req.params.guid.toUpperCase();
        let user = UserRepository.getInstance().Get(uuid);
        let result = "removed";

        if (!user) {
            console.debug('user added - uuid ' + uuid);
            user = new UserModel(uuid);
            UserRepository.getInstance().Add(user);

            result = "added";
        }

        user.AddScan();

        res.send({ result: result });
    }

    public Register () :express.Router {
        let router = express.Router();

        router.get('/:guid', this.ScanEndpoint);

        return router;
    }
}