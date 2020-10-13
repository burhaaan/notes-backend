const express = require('express')
const Note = require('./database/models/note')
const mongoose = require('./database/mongoose')


const app = express()
const port = 3000

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
//GET all notes
app.get('/notes', (req, res) => {
    Note.find({})
    .then((notes) => res.send(notes))
    .catch((err) => console.log(err))
})
//POST a note
app.post('/notes', (req, res) => {
    new Note({description: req.body.description})
    .save()
    .then((note) => res.send(note))
    .catch((err) => console.log(err))
})

//GET a note with a specific id
app.get('/notes/:noteId', (req, res) => {
    Note.findById(req.params.noteId)
    .then((note) => res.send(note))
    .catch((err) => console.log(err))
})

app.patch('/notes/:noteId', (req, res) => {
    Note.findByIdAndUpdate(req.params.noteId, {$set: req.body})
    .then((note) => res.send(note))
    .catch((err) => console.log(err))
})

app.delete('/notes/:noteId', (req, res) => {
    Note.findByIdAndDelete(req.params.noteId)
    .then((note) => res.send(note))
    .catch((err) => console.log(err))
})


app.listen(port, console.log('Listening on port ' + port))