const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = process.env.DEV_PORT;

app.get('/', (req,res) => {
    res.send('Default get request');
})

app.use('/person', require('./routes/personRoutes'));

app.use('/character', require('./routes/characterRoutes'));


app.listen(port, ()=> {
    console.log('server started');
});
