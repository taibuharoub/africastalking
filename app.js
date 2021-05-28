const express = require("express");
require('dotenv').config()
const credentials = {
    apiKey: process.env.AF_TALKING_KEY,
    username: process.env.AF_TALKING_USERNAME,
  }
const Africastalking = require('africastalking')(credentials);

const app = express()
const port = 3000;

app.use(express.json());

app.post("/sms", (req, res, next) => {
    const sms = Africastalking.SMS
    const {to, message} = req.body;
    // console.log(+to);
    // console.log(req.body);
    const options = {
        to: to,
        message: message
    }

    sms.send(options)
    .then( response => {
        console.log(response);
        res.status(200).json({
            success: true,
            data: response
        })
    })
    .catch( error => {
        console.log(error);
    });
}) 

app.listen(port, ()=> {
    console.log(`server started`);
})