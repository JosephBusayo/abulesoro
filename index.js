require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Job = require('./models/job');


const app = express()
const PORT = process.env.PORT || 3000



//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true })) //for accepting form data


//DB
const connectDB = async ()=> {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch (error){
        console.log(error)
    }
}


/* app.get('/add-job', (req, res) => {
    const job = new Job({
        title: 'Job 1',
        desc : 'Bla bla bla',
        tag : ['remote'],
        link: 'kininkan.com'
    })
    job.save()
        .then((result) => { res.send(result) })
        .catch((err) => { console.log(err) })
}) */

//Routes
app.get('/job', (req, res)=>{
    Job.find().sort({ createdAt : -1 })
        .then((result) => {
            res.send(result)
        })
        .catch(err => { console.log(err) })
})

app.post('/add-job', (req, res) => {    
    const job = new Job(req.body)
    job.save()
        .then((result) => { res.send({job, message: 'Sucessfully added'}) })
        .catch(err => { res.send(err)})
})

app.delete('/delete-job/:id', (req,res) => {
    const id = req.params.id

    Job.findByIdAndDelete(id)
    .then((result) => { res.send("Sucessfully deleted")})
    .catch(err => { res.send(err)})
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})