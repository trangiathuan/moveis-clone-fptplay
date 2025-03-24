const express = require('express');
const connection = require('./configs/configDatabase');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT;

const testRoute = require('./routes/testRoute')
const OTPRoute = require('./routes/OTPRoute')
const movieRoute = require('./routes/movieRoute')
app.use(cors());

app.use(express.json())
app.use(express.urlencoded())

app.use('/api', testRoute);
app.use('/api', OTPRoute);
app.use('/api', movieRoute);

const conn = async () => {
    try {
        await connection();
        app.listen(port, () => {
            console.log(`Server is running at port: ${port}`);
        });
    } catch (error) {
        console.log("error connect to DB")
    }
}

conn();

