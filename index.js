const connectToMongo = require("./db");
const express = require("express");
const cors = require('cors');
const path = require("path");
require("dotenv").config({path:"./config.env"});
connectToMongo();

const app = express();
const port = process.env.PORT || 1352;

app.use(cors());
app.use(express.json());

// deployment
let dirName = path.resolve();
if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(dirName, "/frontend/build")));
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(dirName, "frontend", "build", "index.html"));
    });
}

// All router
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/notes', require('./Routes/notes'));

app.listen(port, ()=>{console.log(`Started on port ${port}`);});