const http = require('http');
const port = 3000;
const host = 'localhost';


//definisco il server 
const server = http.createServer(
    function handler(request, response){
        console.log('Arrivata request');
        response.statusCode = 200;
        //Invio testo semplice in risposta
        //response.setHeader('Content-Type','text/html; charset=utf-8');
        //response.write('Output value<br/>');

        //Invio html in risposta
        //response.setHeader('Content-Type','text/html; charset=utf-8');
        //response.write('Output value<br/>');
        //response.end();

        //Modo piu' conciso
        let body = 'Output text <br/>'
        response.writeHead(200, {
            'Content-Type':'text/html; charset=utf-8',
            'Custom-Header':'value'
        });
        response.end(body);
    }
);

//attivo il server
server.listen(port, host, function startup(){
    console.log('Server listen startup');
});

//gestione errori
server.on('error',function(error){
    console.log('Errore server');
}); 