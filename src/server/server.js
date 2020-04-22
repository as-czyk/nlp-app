const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')
const aylien = require("aylien_textapi");

dotenv.config();

const PORT = process.env.PORT || 3000
const app = express()

const textapi = new aylien({
    application_id: process.env.ApplicationID,
    application_key: process.env.ApplicationKey
})

app.listen(PORT, () => {console.log(`The server is running on port ${PORT}`)})
app.use(express.static('builds'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/api/keys', function(req, res) {
    res.send ({
        key: process.env.ApplicationKey,
        id: process.env.ApplicationID
    })
})

app.get('/', function(req, res) {
    res.sendFile(path.resolve('builds/index.html'))
})

app.get('/api/combined', function(req, res) {
    textapi.combined({
        'text': 'John is a very good football player!',
        'endpoint': ['language','sentiment','classify','entities','summarize']
    }, function (err, response) {

        if (err === null) {
            res.send(response)
        } else {
            res.send(`The request failed with error ${err}`)
        }
    })
})