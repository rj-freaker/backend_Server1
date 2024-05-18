const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');
app.use(bodyParser.json());

const passport = require('./auth');
const port = process.env.DEV_PORT;

const logRequest = (req,res,next) => {
    next();
}

app.use(logRequest);
app.use(passport.initialize());

const localPassportMiddleware = passport.authenticate('local', {session: false});

// app.get('/', logRequest, (req,res) => {
//     res.send('Default get request');
// })

app.get('/', (req,res) => {
    res.send('This is default get request without authentication');
})

app.use('/person', require('./routes/personRoutes'));

app.use('/character', require('./routes/characterRoutes'));


app.listen(port, ()=> {
    console.log('server started');
});
