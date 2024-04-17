const redisModule = require('redis');

//import { createClient } from 'redis';

const {createClient} = redisModule;

async function connectToRedis(){

    const client = createClient();

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();

    await client.set('key', 'value');
    const value = await client.get('key');

    console.log('Settato: ' + value);
}

connectToRedis();