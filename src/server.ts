
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'request';
import ScanController from './controllers/scan';
import { CfhnJob } from './jobs/cfhn-presence';
import UserRepository from './Repositories/user.repository';
import { Config } from './config';
import * as moment from 'moment';

export default class Server {

    public app: express.Application;
    public intervall: number;

    constructor() {
        this.app = express();
    }

    config() {
        this.app.use('/scan', ScanController.getInstance().Register());
    }

    start() {
        this.app.listen(Config.Port, () => {
            console.log('We are live on ' + Config.Port);
        });

        this.intervall = setInterval(() => {
            // console.log(JSON.stringify(UserRepository.getInstance().GetAll()));

            let users = UserRepository.getInstance().GetActive();

            // auto log off users that are present too long
            users
                .filter(u => moment(u.GetLastScan().date).isBefore(moment().subtract(Config.PresenceTimeout, 'minutes')))
                .forEach(u => u.AddScan("autoLogoff"));

            CfhnJob.run(users);
        }, Config.PresenceInterval);
    }
}




