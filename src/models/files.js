const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
})

const file = mongoose.model('File', fileSchema)

module.exports = file