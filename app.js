var express = require('express');



var app = express();
var router = require('./config/routes');

var port = process.env.PORT || 3000;


app.use('/api', router);

app.listen(port, function(){
  console.log("express app is listening on port " + port);
});
