const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');

const app = express();
//SvbYciEvxsQUWAZN
mongoose.connect('mongodb+srv://ray:SvbYciEvxsQUWAZN@messaging-cluster.4jqee.mongodb.net/<dbname>?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connection established');
    })
    .catch(() => {
        console.log('Connection failed');
    });

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api/posts', postRoutes)

module.exports = app;