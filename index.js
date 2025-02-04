// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// /api/:date?

app.get("/api/:date?", function(req, res){

  let input_date = 0;
  
  if(!req.params.date){
    input_date = new Date().getTime();
  }else{
    input_date = new Date(req.params.date).getTime();
    //console.log(input_date);
    if(!input_date){
      input_date = Number(req.params.date);
    }
  }

  let utc_date = new Date(input_date).toUTCString();

  if(utc_date != "Invalid Date"){
    res.json({unix: input_date, utc: utc_date});
    return ;
  }

  res.json({error: "Invalid Date"});
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
