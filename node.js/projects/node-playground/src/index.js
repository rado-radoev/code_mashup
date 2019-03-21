const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const hbs = require('hbs')

var app = express()
const server = http.createServer()
const io = socketio(server)

const port = 3000

const viewPath = path.join(__dirname, '../public/views')
const partialsPath = path.join(__dirname, '../public/views/partials')

app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

hbs.registerHelper('welcome-message', (message) => {
    return message
})

app.get('/', (req, res) => {
    res.render('index', {
        'document-title': 'Node.js Playground',
        text: 'TeeEEEEeeest'
    })
})


app.listen(port, () => {
    console.log('Server is running on port ' + port)
})
