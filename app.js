require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

require('./database');

const app = express();
app.use(cors());
app.use(express.json()); // replace body-parser middleware
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/uploads',express.static('uploads'));

const usersRoute = require('./routers/users');
const postsRoute = require('./routers/posts');

//Routes
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
})


//build client on production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
    
}

module.exports = app;