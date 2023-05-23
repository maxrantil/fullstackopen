const http = require('http')
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const path = require('path');
const Note = require('./models/note')

console.log(`Node.js version: ${process.version}`);

app.use(cors());

app.use(express.json())

app.use(express.static(path.join(__dirname, 'build')));


let notes = [
	{
		id: 1,
		content: "HTML is easy",
		important: true
	},
	{
		id: 2,
		content: "Browser can execute only JavaScript",
		important: false
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		important: true
	}
]

app.get('/api/notes', (request, response) => {
	response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
	Note.findById(request.params.id).then(note => {
		response.json(note)
	})
})

app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	notes = notes.filter(note => note.id !== id)

	response.status(204).end()
})

const generateId = () => {
	const maxId = notes.length > 0
		? Math.max(...notes.map(n => n.id))
		: 0
	return maxId + 1
}

app.post('/api/notes', (request, response) => {
	const body = request.body

	if (body.content === undefined) {
		return response.status(400).json({ error: 'content missing' })
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
		// id: generateId(),
	})

	note.save().then(savedNote => {
		response.json(savedNote)
	})
})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})