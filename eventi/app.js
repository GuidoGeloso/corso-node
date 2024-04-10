const {EventEmitter} = require('events');

const eventEmitter = new EventEmitter();

function anotherfunction(event){
    console.log('evento catturato da anotherfunction, info contenute: ' +  event.info);
}

function launchEvent(eventEmitter){
    console.log('lancio evento ')
    //lancio evento
    eventEmitter.emit(eventName, {
        info: 'Info evento'}
    );
}

const eventName='event1';

//metodi: 
// emitt per emettere evento
// addListener (o on) per gestire evento

//gestore evento
eventEmitter.on(eventName, function(event){
    console.log('evento catturato da function, info contenute: ' +  event.info);
})


//altro modo per dichiarare la funzione con cui gestire l'evento
eventEmitter.on(eventName, event => {
    console.log('evento catturato da funzione anonima, info contenute: ' +  event.info);
})

//un altro eventEmitter, questo pero' non becca l'evento perche' on ed emit devono essere lanciati sullo stesso emitter!
const anotherEventEmitter = new EventEmitter();

//questo non verra' mai usato perche' si tratta di un emitter diverso da quello che lancia
anotherEventEmitter.on(eventName, event => {
    console.log('ALTRO EVENT EMITTER, info contenute: ' +  event.info);
});


launchEvent(eventEmitter);

eventEmitter.on(eventName, anotherfunction);

//Lista di eventi a cui è iscritto un eventEmitter come listener 
console.log('eventEmitter ascolta ['+eventEmitter.eventNames()+']');

//rimuovo listener
console.log('rimuovo listener per evento ['+eventName+']');

eventEmitter.removeListener(eventName, anotherfunction);

launchEvent(eventEmitter);