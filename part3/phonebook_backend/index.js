const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json())
// Add Morgan middleware for logging
// Define new token
morgan.token('body', function (request, response) { return JSON.stringify(request.body) })

// Use morgan middleware with custom configuration
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors());

app.use(express.static('build'))

let persons = [
	{
		"id": 1,
		"name": "Arto Hellas",
		"number": "040-123456"
	},
	{
		"id": 2,
		"name": "Ada Lovelace",
		"number": "39-44-5323523"
	},
	{
		"id": 3,
		"name": "Fan Abramov",
		"number": "12-43-234345"
	},
	{
		"id": 4,
		"name": "Mary Poppendieck",
		"number": "39-23-6423122"
	}
]

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/info', (request, response) => {
	const date = new Date()
	response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => {
		console.log(person.id, typeof person.id, id, typeof id, person.id === id)
		return person.id === id
	})
	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

// const generateId = () => {
// 	const maxId = notes.length > 0
// 		? Math.max(...notes.map(n => n.id))
// 		: 0
// 	return maxId + 1
// }

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'Name or number missing'
		})
	}

	const person = {
		// id: generateId(),
		id: Math.floor(Math.random() * 1000000),
		name: body.name,
		number: body.number,
	}

	persons = persons.concat(person)

	response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)