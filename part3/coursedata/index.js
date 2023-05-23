const http = require('http')
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const path = require('path');
const Note = require('./models/note')


console.log(`Node.js version: ${process.version}`);

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())

app.get('/api/notes', (request, response, next) => {
	Note.find({})
	  .then(notes => {
		response.json(notes)
	  })
	  .catch(error => next(error))
  });

app.get('/api/notes/:id', (request, response, next) => {
	Note.findById(request.params.id)
		.then(note => {
			if (note) {
				response.json(note)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
	Note.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
	const body = request.body

	if (body.content === undefined) {
		return response.status(400).json({ error: 'content missing' })
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
	})

	note.save().then(savedNote => {
		response.json(savedNote)
	})
})

app.put('/api/notes/:id', (request, response, next) => {
	const body = request.body

	const note = {
		content: body.content,
		important: body.important,
	}

	Note.findByIdAndUpdate(request.params.id, note, { new: true })
		.then(updatedNote => {
			response.json(updatedNote)
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})