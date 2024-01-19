const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const contactDirectory = require('./routes/contactDirectoryRoute')


// ===========EXPRESS APP================
const app = express();


// ===========MIDDLEWARE================
app.use(express.json());
app.use(cors());


// ===========ROUTES================

app.use('/', contactDirectory)
app.use('/user', contactDirectory)


// ===========DATABASE CONNECTION================

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    
    // ===========LISTEN FOR REQUEST================
    app.listen(process.env.PORT, ()=>{
        console.log(`Connected to DB & Server is running on port`, process.env.PORT)
    });
})
.catch((error)=>{
    console.log(error)
})




