const { APP_REDIS_HOST, APP_REDIS_PORT, APP_REDIS_PASSWORD } = require("./constants/index")
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');


//Array contains all publisher's or servers that connect with Redis
const redisPub = []

//TODO Create Publish and subscribe clients for the redis channels
//Initialized Publisher and Subscriber Redis Clients in order
//To subscribe to a single channel so that all websocket's servers
//Can be connected to each other using it.

const pubClient = createClient({
    url: `redis://:${APP_REDIS_PASSWORD}@${APP_REDIS_HOST}:${APP_REDIS_PORT}`
});

pubClient.on('ready', () => {
    console.log('Publisher connected to redis and ready to use')
})

pubClient.on('error', (err) => console.log('Publisher Client Error', err));

Promise.all([pubClient.connect()]).then(() => {
    redisPub.push(pubClient)
    console.log(`number of publishers is ${redisPub.length}`)
})


module.exports = { pubClient }