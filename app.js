const express = require('express')
const app = express()
const config = require('config')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

app.use(cookieParser())
app.use(express.json())

const userRouter = require('./routes/User')


mongoose.connect(config.get('mongoUri'), 
{useNewUrlParser: true, 
useUnifiedTopology: true, 
useCreateIndex: true},
(err) => {
    if (err)
        console.log(err)
    else 
        console.log('Connected to database')
})

app.use('/user', userRouter)

app.listen(config.get('port'), () => console.log('Server up and running'))

