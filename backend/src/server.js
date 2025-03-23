const express = require('express');
const connection = require('./configs/configDatabase');
const app = express();
require('dotenv').config()
const port = process.env.PORT;

const testRoute = require('./routes/testRoute')
const OTPRoute = require('./routes/OTPRoute')

app.use(express())
app.use(express.urlencoded())

app.use('/api', testRoute);
app.use('/api', OTPRoute);

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

