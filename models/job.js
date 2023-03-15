const mongoose = require('mongoose')
const Schema = mongoose.Schema


const jobSchema = new Schema({
    title :{
        type: 'string',
        required: true
    },
    desc :{
        type: 'string',
        required: true
    },
    link:{
        type: 'string',
        required: true
    },
    tag: {
        type: Array,
        default : [],
        required: true
    }
}, {timestamps: true})


const Job = mongoose.model('Job', jobSchema)
module.exports = Job