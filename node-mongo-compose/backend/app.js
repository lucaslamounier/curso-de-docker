const express = require('express')
const restfull = require('node-restful')
const server = express()
const mongoose = restfull.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

// Database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

// Teste
//server.get('/', (req, res, next) => res.send('Backend'))

// Middlewares
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

// ODM
const Client = restfull.model('Client', {
    name: {type: String, require: true}
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

// Routes
Client.register(server, '/clients')

// Start Server
server.listen(3000)

