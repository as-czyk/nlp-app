const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config();

const PORT = process.env.PORT || 3000
const app = express()

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