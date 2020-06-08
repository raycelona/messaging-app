const express = require('express');

const app = express();

app.use('/api/posts', (req,res, next) => {
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