const mongoose = require('mongoose');
// const DB_PORT = process.env.DB_PORT || 27017;
// const DB_NAME = process.env.DB_NAME || 'farmersMarket';
const DB_BASE_URL = process.env.DB_BASE_URL;

const url = `${DB_BASE_URL}`;

mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false},
    (err) => {
        if (err) {
            console.log(`Database is not connected error:${err}`)
        } 
        // else {
        //     console.log(`Database is connected @ port: ${DB_PORT}`)
        // }
    }
);

module.exports = mongoose;