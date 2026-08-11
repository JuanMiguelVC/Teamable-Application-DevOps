// The required modules are imported
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const { isInvalidEmail, isEmptyPayload } = require('./validator')

// Create constants for environment variables and check if the app is in development mode
const { DB_USER, DB_PASS, DEV } = process.env
console.log(DEV)

// Create a new MongoClient
const dbAddress = '127.0.0.1:27017'
const url = DEV ? `mongodb://${dbAddress}` : `mongodb://${DB_USER}:${DB_PASS}@${dbAddress}?authSource=company_db`
const client = new MongoClient(url)
const dbName = 'company_db'
const collName = 'employees'

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist'))

// Getting the information from the database
app.get('/get-profile', async function (req, res) {
    // connect to mongodb database
    await client.connect()
    console.log('Connected successfully to server')

    // initiate or get the db & collection
    const db = client.db(dbName)
    const collection = db.collection(collName)

    // get data from database
    const result = await collection.findOne({ id: 1 })
    console.log(result)
    client.close()

    response = {}
    if (result !== null) {
        response = {
            name: result.name,
            email: result.email,
            interests: result.interests
        }
    }
    res.send(response)
})

// Updating the information in the database
app.post('/update-profile', async function (req, res) {
    const payload = req.body
    console.log(payload)

    if (isEmptyPayload(payload) || isInvalidEmail(payload)) {
        res.send({ error: "Payload is empty. User profile was not updated succesfully" })
    } else {
        // connect to mongodb database
        await client.connect()
        console.log('Connected successfully to database server')

        // initiate or get the db & collection
        const db = client.db(dbName)
        const collection = db.collection(collName)

        // save payload data to the database
        payload['id'] = 1
        const updatedValues = { $set: payload }
        await collection.updateOne({ id: 1 }, updatedValues, { upsert: true })
        client.close()

        res.send({ info: "Profile updated successfully" })
    }
})

// Checking that the application is running on port 3000
const server = app.listen(3000, function () {
    console.log("app listening on port 3000")
})

// Exporting the app and server for testing purposes
module.exports = {
    app,
    server
}
