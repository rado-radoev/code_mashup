const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express();

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public/')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials/')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rado'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Rado'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page title',
        name: 'Rado'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Pleven'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})