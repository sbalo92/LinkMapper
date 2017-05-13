const HTTP_PORT_NUMBER = 8080;
const BaseClass = require("./index/js/BaseClass.js");
console.log(BaseClass);

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const dal = require("./dal.js");
const GeoIp = require("./index/js/GeoIp.js");
app.enable('trust proxy');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));



app.set('port', (process.env.PORT || HTTP_PORT_NUMBER));
// app.configure(function(){
// app.use(app.router);
// });


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index/index.html');
});
app.get('/index/*.js', (req, res) => {
    console.log("index called with request " + req.url);
    res.sendFile(__dirname + req.url);
});


app.post('/location', (req, res) => {
    const locationPackage = {
        ip: req.ip,
        body: req.body
    };
    GeoIp.locate(locationPackage.ip);
    console.log(locationPackage);
    res.send(JSON.stringify(locationPackage));
});



app.listen(app.get('port'), () => {
    console.log('LinkMapper is listening for HTTP on port ' + app.get(
        'port'));
});


// const fs = require("fs");
// const https = require("https");
// const key = fs.readFileSync("./key.pem");
// const cert = fs.readFileSync("./cert.pem");
// const HTTPS_PORT_NUMBER = 8443
// const HOST = "localhost";

// // app.configure(()=>{
// //   app.use(app.router);
// // });

// const httpsServer = https.createServer({key:key,cert:cert,passphrase:"linkmapper"},app).listen(HTTPS_PORT_NUMBER,HOST);
// console.log("LinkMapper is listening for HTTPS on port " + HTTPS_PORT_NUMBER);
