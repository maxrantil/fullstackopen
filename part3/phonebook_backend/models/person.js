const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneRegex = /^[0-9]{2,3}-[0-9]{1,}$/

const personSchema = new mongoose.Schema({
  name : {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        if (!phoneRegex.test(v)) {
          return false
        }

        let digits = v.replace(/-/g, '')
        if (digits.length < 8) {
          return false
        }

        return true
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)