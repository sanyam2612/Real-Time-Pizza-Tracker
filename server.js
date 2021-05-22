require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')

// To connect sessions to database
const MongoDbStore = require('connect-mongo');

const passport = require('passport')
// Database connection
const url = 'mongodb://localhost/pizza'
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});


// Session Config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: url
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

// Passport config

app.use(passport.initialize())
app.use(passport.session())
require('./app/config/passport')(passport)


app.use(flash())


// Assets
// Serving static files
app.use(express.static('public'))
// To let know express about form data
app.use(express.urlencoded({ extended: false }))
// To let know express about json data
app.use(express.json())


// Global Middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})