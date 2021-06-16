// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const router = require('./router');

app.use(cors());
app.use(express.json());
app.use(router)

app.get('*', (req,res) => {
    res.status(404).send('Page not found');
})
app.post('*', (req,res) => {
    res.status(404).send('Page not found');
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on port:${PORT}`)
    }
});