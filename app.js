const express = require("express");
const morgan = require('morgan');
const app = express();
app.use(morgan('combined'));
const axios = require('axios').default;
const cronGenerator = require('./helpers/cron.helper');
const CronJob = require('cron').CronJob;

const port = 3000;  
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/sms_db"); 
mongoose.connection.on('error', function (err) {
    console.error(err);
    process.exit();
});

// allow-cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if(req.method === 'OPTIONS'){
        res.writeHead(200);
        res.end()
    }else{
        next();
    }
});

var job = new CronJob('0 0 * * *', function() {

    axios.get('http://localhost:3000/api/v1/schedule')
        .then(function (response) {
            response.data.result.forEach(data => {
                cronGenerator(data.sendTime, data.message, data.recipient);
            })
        })
        .catch(function (error) {
            console.log(error);
        });

}, null, true, 'America/Los_Angeles');
job.start();

const apiRoute = '/api/v1/';
const scheduleCtrl = require('./controllers/schedule.controller');

app.get(apiRoute + 'schedule', scheduleCtrl.read);
app.get(apiRoute + 'schedule-today', scheduleCtrl.readToday);
app.post(apiRoute + 'schedule', scheduleCtrl.create);
app.put(apiRoute + 'schedule', scheduleCtrl.update);
app.delete(apiRoute + 'schedule', scheduleCtrl.delete);

// catch 404
app.use(function (req, res) {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

app.listen(port, function () {

    console.log("Server listening on port " + port);

});
