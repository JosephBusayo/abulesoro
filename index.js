require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Job = require('./models/job');


const app = express()
const PORT = process.env.PORT || 3000


//View engine
app.set('view engine', 'ejs')
//Middleware
app.use(express.json())
app.use(express.static('public'))
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
app.get('/', (req, res)=>{
    Job.find().sort({ createdAT : -1 })
        .then((result) => {
            res.render('index', {title: 'All Jobs', jobs: result })
        })
        .catch(err => { console.log(err) })
})

//get form page
app.get('/add-job', (req, res) => {
    res.render('create', {title : 'Add new job'})
})

//form action
app.post('/add-job', (req, res) => {    
    const job = new Job(req.body)
    job.save()
        .then((result) => { res.redirect('/') })
        .catch(err => { console.log(err)})
})



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})