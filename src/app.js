const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//console.log(__dirname)
// console.log(__filename)


const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//app.set('views', path.join(__dirname, '../views')); // Was added to make code work. found in QA

// Get the public Dir path and load it up in 'express.static' to serve the whole Dir dynamically
app.use(express.static(publicDirectoryPath))

// req-uest= : contains info about the incoming request to the server


// Route handlers
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather App',
        name: 'Ammar Sinan',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ammar Sinan',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'How Can I Help?',
        title: 'Help',
        name: 'Ammar Sinan',
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitiude, longtiude } = {}) => {

        if (error) {
            return res.send({ error })
        }
        //Chainig
        forecast(latitiude, longtiude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                address: req.query.address,
            })
        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        message: 'Help article not found!',
        name: 'Ammar Sinan',
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        messgae: 'Page not found!',
        name: 'Ammar Sinan'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
