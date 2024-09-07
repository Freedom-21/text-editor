const express = require("express");
const socketIo = require("socket.io");
const { connectDB, CORS } = require("./config/");
const { errorHandler } = require("./middleware/errorMiddleware");
const { socket } = require("./emitters/socket.config");
const { APP_PORT } = require("./constants/index");



//Connecting to the MongoDB database using
connectDB();

const app = express();

//Creating HTTP server using express to handle both normal requests and socket requests
const server = require("http").createServer(app);

//initializing socket server
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

//url encoder and json parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**@routes */
app.use("/api/v1/users", CORS, require("./routes/user.route"));
app.use("/api/v1/documents", CORS, require("./routes/document.route"));

//Creating event listener for connection event
//That is listened to whenever a client establishes A connection with the server
io.on("connection", socket);

server.listen(APP_PORT, '0.0.0.0',  ( ) => {
    console.log(`Server listening on port ${APP_PORT}`);
});

/**@error_handler */
app.use(errorHandler);
