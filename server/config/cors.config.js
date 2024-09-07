const cors = require("cors");

/**@CORS in order to allow access from anywhere depending on your interest*/
const corsOptions = {
    origin: "*",
    credentials: false, //access-control-allow-credentials:true else false
    optionSuccessStatus: 200,
};

const CORS = cors(corsOptions)


module.exports = { CORS }