// middleware/tokenExtractor.js
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7) // This will extract the token from the header
  } else {
    request.token = null
  }
  next()
}

module.exports = tokenExtractor
