require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')


const app = express()
const PORT = process.env.PORT || 3000

//Middleware
app.use(express.json())


//DB
const connectDB = async ()=> {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch (error){
        console.log(error)
    }
}

//Routes
app.get('/', (req, res)=>{
    res.send("All job")
})