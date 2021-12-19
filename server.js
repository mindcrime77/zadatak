const express = require('express')
const app = express()
const cors = require('cors')
require('./db')
require('dotenv/config')
const routes = require('./routes')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('hello world...')
})

app.use('/users', routes)
app.use('/uploads', express.static('uploads'))

app.listen(process.env.PORT || 5000, () => console.log(`listening...port - ${process.env.PORT} `))