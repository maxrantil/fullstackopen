const http = require('http')
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

app.use(express.json())

// Add Morgan middleware for logging
// Define new token
morgan.token('body', function (request, response) { return JSON.stringify(request.body) })
// Use morgan middleware with custom configuration
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors());

app.use(express.static('build'))

// const path = require('path');
// app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/people', (request, response, next) => {
	Person.find({})
		.then(people => {
			response.json(people);
		})
		.catch(error => next(error))
});

// app.get('/info', (request, response) => {
// 	const date = new Date()
// 	response.send(`<p>Phonebook has info for ${people.length} people</p><p>${date}</p>`)
// })

// app.get('/info', (request, response) => {
// 	const date = new Date()
// 	Person.countDocuments({}, function(err, count) {
// 		response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
// 	})
// })

app.get('/api/people/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/people/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/people', (request, response) => {
	const body = request.body

	if (body.name === undefined || body.number === undefined) {
		return response.status(400).json({ error: 'content missing' })
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
})

app.put('/api/people/:id', (request, response, next) => {
	const body = request.body

	const person = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

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
app.listen(PORT)
console.log(`Server running on port ${PORT}`)