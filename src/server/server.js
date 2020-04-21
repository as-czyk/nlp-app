const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config();

const PORT = process.env.PORT || 3000
const app = express()

app.listen(PORT, () => {console.log(`The server is running on port ${PORT}`)})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/', function(req, res) {
    res.send('Hello World')
})