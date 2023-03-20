const { Router } = require('express')
const Job = require('../models/job');

const router = Router()



//Routes
router.get('/job', (req, res)=>{
    Job.find().sort({ createdAt : -1 })
        .then((result) => {
            res.send(result)
        })
        .catch(err => { console.log(err) })
})

router.post('/add-job', (req, res) => {    
    const job = new Job(req.body)
    job.save()
        .then((result) => { res.send({job, message: 'Sucessfully added'}) })
        .catch(err => { res.send(err)})
})

router.delete('/delete-job/:id', (req,res) => {
    const id = req.params.id

    Job.findByIdAndDelete(id)
    .then((result) => { res.send("Sucessfully deleted")})
    .catch(err => { res.send(err)})
})


module.exports = router