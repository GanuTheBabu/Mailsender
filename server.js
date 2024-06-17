const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'msec.edu.in@gmail.com', // Replace with your Gmail email address
        pass: 'sxxx kbth asbn bblz' // Replace with your Gmail password
    }
});

// Endpoint to send email
app.get('/send-email', (req, res) => {
    const { staffid, name, date, time, location, floor, room, issue, priority } = req.query;

    // Setup email data
    let mailOptions = {
        from: 'msec.edu.in@gmail.com', // Replace with your Gmail email address
        to: 'maintenancea022@gmail.com', // Replace with the recipient's email address
        subject: 'New Ticket Created',
        text: `A new ticket has been created with the following details:\n
               Staff ID: ${staffid}\n
               Requester Name: ${name}\n
               Date: ${date}\n
               Time: ${time}\n
               Location: ${location}\n
               Floor: ${floor}\n
               Room: ${room}\n
               Issue: ${issue}\n
               Priority: ${priority}`
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("There was a problem sending the email:", error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log('Email sent: %s', info.messageId);
            res.send("Email sent successfully!");
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
