const express = require('express');
const path = require('path')
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs')
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const publicDir = path.join(__dirname, "../public");
const views = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
app.use(express.static(publicDir))
app.set("view engine", "hbs")
app.set("views", views)
hbs.registerPartials(partialPath)

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Vignesh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please enter an address"
        })
    }
    try {
        geocode(req.query.address, (error, {
            latitude,
            location,
            longitude
        } = {}) => {
            if (error)
                return res.send({
                    error
                })
            forecast(latitude, longitude, (error, forecast) => {
                if (error)
                    return res.send({
                        error
                    })
                console.log(location)
                console.log(forecast)
                return res.send({
                    address: req.query.address,
                    location,
                    forecast
                })
            })

        })
    } catch (err) {
        console.log(err)
        return res.send({
            error: "SomeError"
        })
    }

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: "Help Article not found",
        name: 'Vignesh'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: "Page not found",
        name: 'Vignesh'
    })
})



app.listen(port, () => {
    console.log('server is running on ' + port)
})