require('dotenv').config()
 
//Import Express and Mongoose
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require('cors')
 
let uri = 'mongodb+srv://jayeshc224:test123@cluster0.pgwju8a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
 
 
//Establist connection with DB
mongoose.connect(uri)
mongoose.connection
.on('error',(error)=> console.error(error))
.once('open',()=> console.log("Connected to DB"))
 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
 
const routes = require('./src/routes/routes')
app.use('/', routes)
 
app.listen(3000, () => {
 
    console.log("Server alive at port 5000");
})