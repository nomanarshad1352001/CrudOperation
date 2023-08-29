const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path');

const HttpError = require('./models/http-error')
const userRouter = require('./routes/user-routes');

const app = express();

app.use(bodyParser.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PATCH');
    next();
});

app.use('/api/users', userRouter);

app.use((req, res, next) => {
    return next(new HttpError('No routes found', 404));
});

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
        });
    }
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'})

});

mongoose.connect('mongodb+srv://noumanArshad:noman1122@cluster0.ja2kqar.mongodb.net/crud?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err)
    })

