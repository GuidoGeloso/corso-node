const express = require('express');
const fs = require('fs');
var path = require('path')
var responseTime = require('response-time')
var morgan = require('morgan')

//importo i moduli
const homeRouter = require('./routes/home')
const contattiRouter = require('./routes/contatti')

//applicazione principale
const app = express(); 

//link dell'app principale con i singoli moduli
//app.use(homeRouter)
//app.use(contattiRouter);

//MORGAN
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/app', function (req, res) {
    throw new Error('ok');
})

app.listen(3000);