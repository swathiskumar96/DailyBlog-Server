require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')



//create an express app
const dbServer = express()
 
//use cors in express server
 dbServer.use(cors())
 dbServer.use(express.json())
 dbServer.use(router)
 dbServer.use('/uploads',express.static('./uploads'))



 const PORT = 3000 || process.env.PORT

 dbServer.listen(PORT,()=>{
    console.log(`Daily Blog server started at PORT : ${PORT}`);
 })

 dbServer.get("/",(req,res)=>{
   res.status(200).send(`<h1 style="color:blue">Daily Blog Server Started and waiting for client request</h1> `)
 })

 dbServer.post("/",(req,res)=>{
   res.status(200).send(`POST REQUEST`)
 })

