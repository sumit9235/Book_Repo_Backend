const express = require("express")
const cors=require('cors')
const {bookRouter}=require('./route/books.routes')
const {connection}=require('./config/db')
require('dotenv').config()
const app=express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send({"msg":"Hello world"})
})

app.use("/books",bookRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("Connected to server")
})