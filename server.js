const express = require('express')
const apiRoutes = require("./routes/api.js")

// Crete web app server
const app = express()

app.use(express.json())
app.use('/api', apiRoutes)

app.use(function(req, res, next) {
    res.status(404).send('Not Found')
})

app.use(function(req, res, next, err) {
    console.error(err.stack)
    res.status(500).send('Server error')
})

const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port ', server.address().port)
})