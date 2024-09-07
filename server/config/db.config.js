const mongoose = require('mongoose')
const { APP_DB_URI } = require("../constants/index")

const connectDB = async () => {
    //Which must be the MongoDB replicaSet URI
    //const dbURL = `mongodb://${process.env.DB1},${process.env.DB2},${process.env.DB3}?replicaSet=Dist`
    // const dbURL = process.env.DB_URL
    try {

        mongoose.connect(APP_DB_URI)
        console.log(`Connected to database successfully ${APP_DB_URI}`)
    } catch (e) {
        process.exit(1)
    }
}

module.exports = { connectDB }
