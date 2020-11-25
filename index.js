const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

// capture body
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

// pull database
const url = `${process.env.MONGODB_URI_DOCKER}`
const option = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(url, option)
.then(() => console.log('successfully connected to the database'))
.catch(err => console.log('error connecting to the database:', err))

// middlewares
const validateToken = require('./src/middlewares/validateToken');

// import routes
const registerRoute = require('./src/routers/register');
const loginRoute = require('./src/routers/login');
const adminRoute = require('./src/routers/admin');

// route middlewares
app.use('/api/v1/user', registerRoute);
app.use('/api/v1/user', loginRoute);
app.use('/api/v1/admin',validateToken, adminRoute);

// main route
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// start server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`server on port: ${PORT}`)
});