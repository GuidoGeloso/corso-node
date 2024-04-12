const http = require('http');
const fs = require('fs');

const port = 3000;
const host = 'localhost';
const fileNotFoundPage = 'fileNotFound.html'


//definisco il server 
const server = http.createServer(
    function handler(request, response){
        console.log('Arrivata request');
        response.statusCode = 200;
        let htmlFile = '';
        switch(request.url){
            case '/': ;
            //fallthrough
            case '/home': htmlFile = 'home.html'; break;
            case '/contatti': htmlFile = 'contatti.html';  break;
            default: break;
        }
        response.setHeader('Content-Type', 'text/html');

        if(htmlFile){
            response.statusCode = 200;

            //leggo il contenuto del file
            const risGestita =
                fs.promises.readFile(htmlFile, 'utf-8')
                .then(fileData => response.end(fileData))
                .catch(err => console.log('Error', err));           
        }else{
            response.statusCode = 404;
            fs.promises.readFile(fileNotFoundPage, 'utf-8')
            .then(fileData => response.end(fileData))
            .catch(err => console.log('Error', err));  
        }
        
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