const express = require('express');
const app = express();

app.all('/', function callback(req, res){
    console.log(req);
    res.send(req.method + ' request' );
});

app.get('/home', function callback(req, res){
    console.log(req);
    res.send('GET home page' );
});

app.get('/blog', function callback(req, res){
    console.log(req);
    res.send('GET blog' );
});

app.post('/', function callback(req, res){
    console.log(req);
    res.send('POST home page' );
});

app.listen(3000);