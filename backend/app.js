const express = require('express');

const app = express();

app.use((req,res, next) => {
    res.send('express yourself');
});

module.exports = app;