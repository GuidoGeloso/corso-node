const express = require('express');
const app = express();

app.all('/blog/*', function callback(req, res){
    isLogged=false;
    console.log('got BLOG call ', req.method);
    if(!isLogged){
        res.status(200).send('Welcome to BLOG');
    }
});


app.all('/api/*', function callback(req, res){
    isLogged=false;
    console.log('got API call ', req.method);
    if(!isLogged){
        res.status(403).send('Non sei loggato');
    }
});

app.listen(3000);