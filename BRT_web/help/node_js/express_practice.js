/**
 * Created by CCT on 2014/5/8.
 */
var express = require('express');
var app = express();

app.get('/hello.txt', function(req, res) {
   res.send('hello world');
})

var server = app.listen(3000, function() {
   console.log('Listening on port %d', server.address().port);
})