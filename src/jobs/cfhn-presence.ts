import UserModel from "../Models/user.model";
import * as request from 'request';
import { Config } from "../config";


export class CfhnJob {
    
    public static run (users: UserModel[]) {

        console.log("running job 'cfhn presence'");
        console.log(JSON.stringify(users));

        users.forEach(user => {
            this.sendingUid(user);
        });
    }
    
    private static sendingUid (user: UserModel) {
        let mac = user.uid.toLowerCase().substring(0, 17);
        
        console.log('sending ' + mac);

        let headers = {
            'User-Agent':   'MSE-Terminal',
            'Content-Type': 'application/json'
        };

        let options = {
            url:        Config.PresenceServer + '?token=' + Config.PresenceApiToken,
            method:     'POST',
            headers:    headers,
            json:       [{
                location:   Config.TerminalLocation,
                mac:        mac
            }]
        };

        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
            }

            console.log(body);
        });
    }

}