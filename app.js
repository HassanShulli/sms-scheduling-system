var express = require("express");
var morgan = require('morgan');
var app = express();
app.use(morgan('combined'));

// var port = process.env.PORT || 8080;    // for heroku
var port = 3000;    // for local use
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/POS_DB");  //for local mongo use
// mongoose.connect("mongodb://pos_admin1:pos_admin1@ds151530.mlab.com:51530/pos_app", {useMongoClient: true}); //mlab
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


const scheduleRouter = require('./routes/schedule.route');

// Identifiy the router object
// const routingPoint = '/api/' + 'v1';
// app.use(routingPoint, scheduleRouter);

// app.use(app.router);
// scheduleRouter.initialize(app);

const apiRoute = '/api/v1/';
const scheduleCtrl = require('./controllers/schedule.controller');

app.get(apiRoute + 'schedule', scheduleCtrl.read);
app.post(apiRoute + 'schedule', scheduleCtrl.create);

// catch 404
app.use(function (req, res) {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

app.listen(port, function () {

    console.log("Server listening on port " + port);

});
// module.exports = router;