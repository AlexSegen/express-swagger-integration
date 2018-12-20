var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');


var properties = require('./config/properties');
var db = require('./config/database');

//Hero Rotues
var herosRoutes = require('./heros/heros.routes');

var app = express();


//Configure bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncode =  bodyParser.urlencoded({extend:true});

//Initialise express router
var router = express.Router();

//Call the database connectivity function
db();

//configure app.use()
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncode);


//Error handling
app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
});

//use express router
app.use('/api', router);

app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`)
});