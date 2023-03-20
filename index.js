require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jobRoute = require('./routes/jobRoutes')
const cors = require('cors');

app.use(cors());
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


app.use('/api/v1', jobRoute)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})


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
