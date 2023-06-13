require('dotenv').config()

const PORT = process.env.NODE_ENV === 'test' ? 3003 : process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}