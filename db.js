const mongoose = require("mongoose");
require("dotenv").config({path:"./config.env"});

const mongoUri = process.env.MONGO_URI;

const connectToMongo = ()=>{
    mongoose.connect(mongoUri, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Connection successfully");
        }
    })
}

module.exports = connectToMongo;