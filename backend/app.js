const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log('first');
//     next();
// });

app.use((req,res, next) => {
    res.send('Express yourself');
});

module.exports = app;