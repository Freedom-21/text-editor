const { pubClient } = require("../redis.config")
const Document = require('../models/Documents');



//Array contains all sockets that establish the connections
//with the server in order to keep track of number of clients
//connected and number of clients disconnected
const allClients = [];
const redisSub = []

const socket = (socket) => {

    const subClient = pubClient.duplicate();
    subClient.on('ready', () => {
        console.log('Subscriber connected to redis and ready to use')
    })
    socket.on("cursorChange", (cursorData) => {
        // Relay cursor changes to other connected clients
        socket.broadcast.emit("cursorChange", cursorData);
    });
    subClient.on('error', (err) => console.log('Subscriber Client Error', err));

    Promise.all([subClient.connect()]).then(() => {
        //Connecting the socket server to the redis channel
        //using Socket.io Redis-Adapter
        console.log(`A Subscriber clients connected ${username}`)
        redisSub.push(subClient);
        console.log(`number of subscribers is ${redisSub.length}`)
    });

    //Whenever a client connects to a server
    //We fetch his username from the handshake.query
    //and log it
    allClients.push(socket)
    const username = socket.handshake.query.username
    console.log(`A client is connected! ${username} - Number of sockets is: ${allClients.length}`)


    //TODO: if the client disconnects due to network error block the editing process and show a `RECONNECTING...' popup

    //Event listener for client's socket disconnect
    //Event that listens to any
    socket.on('disconnect', async function (reason) {
        //Unsubscribe from the redis channel
        console.log(`${username} got disconnected due to ${reason}`)
        const i = allClients.indexOf(socket);
        allClients.splice(i, 1);
        console.log(`Number of sockets now is: ${allClients.length}`)
        const subI = redisSub.indexOf(subClient)
        redisSub.splice(subI, 1)
        //Unsubscribe from all the channels
        await subClient.unsubscribe()
        await subClient.quit()
    })

    socket.on('get-document', async (documentID) => {
        try {
            //when receiving as a subscriber parse the data sent by the publisher to return to its form
            await subClient.subscribe(documentID, (message) => {
                const msg = JSON.parse(message)
                console.log(msg.sender)
                console.log(msg.data)
                console.log(username)
                if (socket.id !== msg.sender) {
                    socket.emit('receive-changes', msg.data)
                }
            })
        } catch (error) {
            console.error(error)
        }
        const document = await lookUpDocument(documentID);
        //TODO subscribe the socket to redis channel using the documentID
        socket.join(documentID);
        socket.emit("load-document", document?.data); //on load/reload
        socket.on("send-changes", async (delta) => {
            //Change delta to string when publishing
            //socket.to(documentID).emit("receive-changes", delta)
            try {
                const message = {
                    'sender': socket.id,
                    'data': delta
                }
                const sentMsg = JSON.stringify(message)
                await pubClient.publish(documentID, sentMsg)
                console.log(`${username} published`)
            } catch (error) {
                console.error(error)
            }
        })



        socket.on("save-document", async (data) => {
            try {
                await Document.findByIdAndUpdate(documentID, { data })
            } catch (e) {
                console.log(e)
            }
        })
        //TODO Group the last 3 minutes of changes into one 'commit'
        socket.on('commit-history', async (data) => {
            //Add the commit history to the database based on current
            //Date for example
        })

    })
}


async function lookUpDocument(id) {
    if (id == null) return
    try {
        const document = await Document.findById(id)
        const documentNotExist = (await document.is_deleted) === true;
        if (documentNotExist) return
        if (document) return document
    } catch (e) {
        console.log(e)
    }
}

module.exports = { socket }