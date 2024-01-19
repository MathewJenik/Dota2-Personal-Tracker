require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const {logger} = require('./middleware/logger.js')
const errorHandler = require('./middleware/errorHandler.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions.js')
const connectDB = require('./config/dbConn.js')
const mongoose = require('mongoose')
const { logEvents } = require('./middleware/logger')
const PORT = process.env.PORT || 3500

// environment variable colelction
console.log(process.env.NODE_ENV)

// connect to databse
connectDB()


// add required libs
app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())


// used to point express to static files (css files)
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/', require('./routes/root.js'))

// 404 page setup
app.all('*', (req, res) => {
    res.status(404)

    if (req.accepts('html') == true) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json') == true) {
        res.json({message: "404 Not Found"});
    } else {
        res.type('txt').send('404 Not Found');
    }
})

app.use(errorHandler)


mongoose.connection.once('open', () => {
    console.log("connected to the database")
    // server to start listening for requests
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

})

mongoose.connection.on('error', error => {
    console.log(error)
    logEvents(`${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`, 'mongoErrorLog.log')

})
