const fs = require('fs');

const fileExist1 = 'f1.txt';
const unexistentFile = 'unexistentFile.txt';
const errorEventName = 'errorEvent';
const openMode = 'w+';

//da 1 a 10 miliardi
for(var i=0; i<1e10; i++){
    i++;
}

const options = {
    persistent: true
};

const watcher = fs.watch(fileExist1, options, 
            function callbackFunction(evt, filename){
                console.log('Watch callback: ', {evt, filename})
            }
        );

// fs.watch mi da un watcher che funziona come eventEmitter, catcho diversi eventi
watcher
.on('change', function onChangeFunction(data){
    console.log('change Data', data)
})
.on('close', function onCloseFunction(){
    console.log('close')
})
.on('err', function onErrorFunction(){
    console.log('error')
});


//chiudo monitoraggio
setTimeout(function rimuoviMonitoraggio(){
    watcher.close();
}, 5000);


//questo però è un po' buggato nel senso che mi da più volte gli stessi eventi
//nel caso mi serva fare watching su file, meglio usare chokidar installandolo con NPM


const chokidar = require('chokidar');

chokidar.watch(fileExist1)
.on('all', function (event, path){
    console.log('chokidar ', {event, path})
});
