const express = require('express');
// const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

//App configuration
const app = express();
// app.use(cors());
app.use(express.json());

//Environment variables
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const uri = process.env.DB_URI;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
}


//Database connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Connection estabislished with MongoDB');
}).catch(error => console.error(error.message));


//Routes
const usersRouter = require('./routers/users');
const postsRouter = require('./routers/posts');

app.use('/users', usersRouter);
app.use('/posts', postsRouter);


//Server
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT} `)
});