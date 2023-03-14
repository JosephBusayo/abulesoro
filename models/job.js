const mongoose = require('mongoose')
const Schema = mongoose.Schema


const jobSchema = new Schema({
    title :{
        type: 'string',
        required: true
    },
    description :{
        type: 'string',
        required: true
    },
    tag: {
        type: 'array',
        required: true
    },
    link:{
        type: 'string',
        required: true
    }
}, {timestamps: true})


const Job = mongoose.model('Job', jobSchema)
module.exports = Job