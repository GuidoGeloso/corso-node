const EventEmitter = require('events');
const {MongoClient} = require('mongodb');
const debugDBConnection = require('debug')('app:dbConnection');
const persone = require('./persone').listaPersone;

const connectionCompleteEvent = 'connectionCompleteEvent';

class DBConnection extends EventEmitter{
    mongoclient = new MongoClient('mongodb+srv://guidogelosofincons:2CBMu9gGiMvfweiv@maestro-node.klypedp.mongodb.net/?retryWrites=true&w=majority&appName=maestro-node');
    
    async connect(){
        await this.mongoclient.connect();
        this.emit(connectionCompleteEvent);
    }

    getCollection(){
        return this.mongoclient.db('persone').collection('persone');
    }

    async setupData(){       
        //seleziono il db a cui connettermi, seleziono una collection e la svuoto 
        this.getCollection().deleteMany({});

        //inserisco le persone
        this.getCollection().insertMany(persone);

        debugDBConnection('Persone di base inserite con successo');
        
    }

    async getPersone(){

        debugDBConnection('getPersone - Start, wait for data been retrieved from DB');
        const cursore = await this.getCollection().find({});
     
        debugDBConnection('Parsing data');

        const allValues = await cursore.toArray();
    
        return allValues;
    }

    async addPersona(persona){
        await this.getCollection().insertOne(persona)
            .then((ris) => {
                debugDBConnection('addPersona, ok!');
            })
            .catch((err) =>{
                debugDBConnection('addPersona, error: '+err);
            });
            debugDBConnection('Uhmm....');
    }

}

module.exports = {DBConnection, connectionCompleteEvent}