const express = require('express');
const fs = require('fs');
var path = require('path')

var responseTime = require('response-time')
var morgan = require('morgan')
const app = express();


let hopCounter = 0;

//inserisco i middleware di terze parti

//RESPONSE TIME
app.use(responseTime())

//MORGAN
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/*', function (req, res) {
    //lancio errore proprio per scatenare gestione errori
    throw new Error('[Exception error message]');
})


//middleware custom di gestione errori (posso poi esportarlo come modulo a se, vedi app strutturata)
app.use(errorCustomHandlerFunction)

app.listen(3000);


function errorCustomHandlerFunction(err, req, res, next) {
  res.status(500).send('Error page' + err);
}