const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
   
    description: {
        type: String, 
        required: true
    }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note