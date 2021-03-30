const mongoose = require('mongoose');
const uri = process.env.DB_URI;

//Database connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Connection estabislished');
}).catch(error => console.error(error.message));
