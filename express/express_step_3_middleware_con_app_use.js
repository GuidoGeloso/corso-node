const express = require('express');
const app = express();


let hopCounter = 0;

//eseguo e poi passo il controllo alla successiva funzione, se però ho piu' path che necessitano di queste
//funzioni in sequenza devo fare copia incolla
/*app.get('/path1', primaMiddleware, secondaMiddleware, terzaMiddleware);
app.get('/path2', primaMiddleware, secondaMiddleware, terzaMiddleware);
app.get('/path3', primaMiddleware, secondaMiddleware, terzaMiddleware);
*/

//quindi uso app.use(); qui per dire di usare la funzione per TUTTI i path che stanno sotto /needCheck/*
app.use('/needCheck/*', primaMiddleware);

app.use('/needCheck/*', secondaMiddleware);

//questa invece vale per tutti perche' e' quella che da la risposta
app.use( terzaMiddleware);

//a questo punto
app.get('/needCheck/*', (req, res) => {
  res.send('Feedback post check');
});

app.get('/api/*', (req, res) => {
  res.send('Feedback senza check');
});

//verifica autenticazione
function primaMiddleware(req, res, next){
    hopCounter++;
    console.log('Prima middleware ', hopCounter);
    next();
};

//verifica autorizzazione
function secondaMiddleware(req, res, next){
    hopCounter++;
    console.log('Seconda middleware ', hopCounter);
    //se qui mando response interrompo la chain, quindi commento
    //res.json('ok');
    next();
  };

  //invio risorse richieste
  function terzaMiddleware(req, res, next){
    hopCounter++;
    console.log('Terza middleware ', hopCounter);
    next();
  };







app.listen(3000);