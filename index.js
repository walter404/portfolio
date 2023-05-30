const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

const EMAIL = process.env.MAIL;
const EMAIL_PASS = process.env.EMAILPASS;

app.post('/', (req, res) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: EMAIL,
            pass: EMAIL_PASS
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'walterame123@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.project}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server connect port ${PORT}`)
});