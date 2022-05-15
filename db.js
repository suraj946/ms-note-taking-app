const mongoose = require("mongoose");
require("dotenv").config({path:"./config.env"});

const mongoUri = process.env.NODE_ENV == "production" ? process.env.MONGO_URI : "mongodb://localhost:27017/inotebook";

const connectToMongo = ()=>{
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    }).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
      });
}

module.exports = connectToMongo;