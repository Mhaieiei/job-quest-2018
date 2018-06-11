
//Requires+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var express   = require('express');
var parser    = require('body-parser');
var path      = require('path'); //path
var mongoose  = require('mongoose');


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var app       = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:890-uiop@ds149960.mlab.com:49960/takemetourtest');
//connect to mongodb
mongoose.connection.once('connected',function(err){
    if(err) {
        console.log('error cant connect to mongodb')
        return;
    }
    console.log('Connected to mongodb database')
});


//Uses+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.use(express.static(path.join(__dirname, './public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


require('./routes')(app);
//config routes
// app.get('/', (req,res) => {
//   res.send('hello');
// });

//Create-server++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const port = 8081;
app.listen(port, () => {
  console.log('Connected & Listem to port', port)
})
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
