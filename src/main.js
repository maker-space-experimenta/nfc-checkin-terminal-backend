const express        = require('express');
const bodyParser     = require('body-parser');
const request        = require('request');

const app            = express();

let users = [];

function sendingGuid(guid) {
    let mac = guid.toLowerCase().substring(0, 17);
    console.log('sending ' + mac);

    let headers = {
        'User-Agent':   'MSE-Terminal',
        'Content-Type': 'application/json'
    };

    let options = {
        url:        'https://presence.my.cfhn.it/push?token=<<api-token>>',
        method:     'POST',
        headers:    headers,
        json:       [{
            location:   'MSE',
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

app.get('/scan/:guid', (req, res) => {

    let guid = req.params.guid.toUpperCase();

    if (users.includes(guid)) {
        console.log("user left", guid);
        users.splice(users.indexOf(guid), 1);
        res.send({ result: "removed" });
    } else {
        console.log("new user arrived", guid);
        users.push(guid);

        sendingGuid(guid);

        res.send({ result: "added" });
    }
});


setInterval(() => {
    console.log("sending guids to presence", users);

    users.forEach(guid => {
        sendingGuid(guid);
    });
}, 60 * 1000);

const port = 8000;

app.listen(port, () => {
  console.log('We are live on ' + port);
});