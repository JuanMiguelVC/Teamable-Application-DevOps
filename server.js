// The required modules are imported
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const { isInvalidEmail, isEmptyPayload } = require('./validator')

// 1. We add DB_ADDRESS and PORT to the process.env destructuring.
const { DB_USER, DB_PASS, DEV, DB_ADDRESS, PORT } = process.env
console.log('Modo DEV:', DEV)

// 2. We evaluate the address dynamically.
// If Docker injects DB_ADDRESS, we use it. If running locally without Docker, it defaults to 127.0.0.1.
const dbAddress = DB_ADDRESS || '127.0.0.1:27017'

// The original connection logic remains intact as before the code refactor
const url = DEV ? `mongodb://${dbAddress}` : `mongodb://${DB_USER}:${DB_PASS}@${dbAddress}?authSource=company_db`
const client = new MongoClient(url)
const dbName = 'company_db'
const collName = 'employees'

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist'))

// Checking that the application is running on configured port
const serverPort = PORT || 3000
const server = app.listen(serverPort, function () {
    console.log(`app listening on port ${serverPort}`)
})

// Exporting the app and server for testing purposes
module.exports = {
    app,
    server
}