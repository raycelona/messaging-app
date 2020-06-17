const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: post
    })
});

app.get('/api/posts', (req,res, next) => {
    const posts = [
        {id: '4567456347856ur', title: 'First post', body: 'Server post'},
        {id: 'ewvwshtrhe56j356', title: 'Second post', body: 'Server post two'}
    ];
    res.status(200).json({
        message: 'Success',
        posts: posts
    });
});

module.exports = app;