const {MongoClient, ObjectId} = require('mongodb');

const express = require('express');

const dbURI = 'mongodb+srv://guidogelosofincons:2CBMu9gGiMvfweiv@maestro-node.klypedp.mongodb.net/?retryWrites=true&w=majority&appName=maestro-node';

const app = express();

let testDB, testCollection;

//Si, schiantato, lo so che non va bene.. Prendine uno dal db..
let idArticoloDaModificare = '661916d743dc14693ca18a57';

app.get('/articolo', 
    async (req, res) => {
        console.log('lista articoli')
        
        //operazione asincrona, quindi uso await per trattarlo come codice sincrono
        const output = await testCollection.findOne({
            titolo : "Titolo"
        });
        res.send(output);
    }
);

app.get('/countArticoli', 
    async (req, res) => {
        console.log('lista articoli')
        
        //operazione asincrona, quindi uso await per trattarlo come codice sincrono
        const cursor = await testCollection.find({
            titolo : "Titolo"
        });
        let outArray = []
        let count = await cursor.count();
        res.send('Ci sono ' + count + ' articoli');
    }
);

app.get('/articoli', 
    async (req, res) => {
        console.log('lista articoli')
        
        //operazione asincrona, quindi uso await per trattarlo come codice sincrono
        const cursor = await testCollection.find({
            titolo : "Titolo"
        });
        let outArray = []
        await cursor.forEach(element => {
            outArray.push(element);
        });
        res.send(outArray);
    }
);


app.post('/articoli', 
async (req, res) =>  {
        console.log(req.method + ' articoli ')
        const articoli = [{
            titolo : 'Titolo 1',
            testo : 'Testo 1'
        },
        {
            titolo : 'Titolo 2',
            testo : 'Testo 2'
        }];

        //operazione asincrona, quindi uso await per trattarlo come codice sincrono
        const ris = await testCollection.insertMany(articoli);
        if(ris.insertedCount >0){
            res.send('Inserimento avvenuto con successo. Numero articoli inseriti: ' + ris.insertedCount);
        }else{
            res.send('Errore in fase di inserimento' + ris.insertedCount );
        }


        

    }
);

app.put('/articoli', 
    async (req, res) => {
        console.log('Update articoli')

        //Voglio modificare l'autore degli articoli impostandolo ad "Alessandro"
        const update = {
            $set: {
                autore : "Alessandrollo"
            }
        };

        //voglio modificare un certo articolo, specifico l'id
        filter = {
            _id: new ObjectId(idArticoloDaModificare)
        }

        const ris = await testCollection.updateOne(filter, update);

        
        if(ris){
            res.send('Update avvenuto con successo. Numero articoli modificati: ');// + ris.result.nModified);
        }else{
            res.send('Errore in fase di update di articolo con id');// + idArticoloDaModificare );
        }
        

    }
);

app.delete('/articolo', 
    async (req, res) => {
        console.log('cancella articolo')
        

        const ris = await testCollection.deleteOne({
            _id: new ObjectId(idArticoloDaModificare)
        })
        res.send('Cancellati '+ ris.deletedCount+ ' articoli');
        

    }
);

const mongoClient = new MongoClient(dbURI);

mongoClient.connect();

async function connettiAlDB(){
    //connessione è asincrona, uso await
    await mongoClient.connect();
    console.log('Connessione al DB riuscita con successo!');

    //seleziono il db a cui connettermi
    testDB = mongoClient.db('test');

    //seleziono una collection
    testCollection = testDB.collection('test-collection');

    

    //qui ha senso avviare l'applicazione
    app.listen(3000);
}

connettiAlDB()
    .catch(function(err){
        console.log('Errore connessione al DB');
    });
