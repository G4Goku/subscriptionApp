require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const morgan =require('morgan')
const app = express()
const user = require('./routes/auth.route')
const mongoUrl = process.env.MONGO_URL

if(! process.env.JWT_TOKEN) {
    console.error("FATAL ERROR : jwt private key not defined");
    process.exit(1)
}
mongoose.connect(mongoUrl)
    .then(() => console.log("Mongo db connected"))
    .catch((err) => console.log("Mongo db connection failed",err.message) )

app.use(express.json())
app.use(morgan('tiny'))
app.use('/api/vidly/user',user)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening to port ${port}`))