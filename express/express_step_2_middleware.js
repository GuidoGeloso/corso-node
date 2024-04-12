const express = require('express');
const app = express();


let hopCounter = 0;

//eseguo e poi passo il controllo alla successiva funzione
app.get('/*', primaMiddleware, secondaMiddleware, terzaMiddleware);


//verifica autenticazione
function primaMiddleware(req, res, next){
    console.log(req.method+' ricevuta');
    hopCounter++;
    console.log('Prima middleware, [%]', hopCounter);
    next();
};

//verifica autorizzazione
function secondaMiddleware(req, res, next){
    hopCounter++;
    console.log('Seconda middleware, [%]', hopCounter);
    //se qui mando response interrompo la chain, quindi commento
    //res.json('ok');
    next();
  };

  //invio risorse richieste
  function terzaMiddleware(req, res, next){
    hopCounter++;
    console.log('Terza middleware, [%]', hopCounter);
    console.log('Restituisco info richieste');
    res.send('Feedback');
  };







app.listen(3000);