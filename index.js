const dotenv = require('dotenv');
const express = require('express');
dotenv.config();

const app = express();
const router = require('./app/router');

app.use(express.static('public'));

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})