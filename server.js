const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Twilio credentials
const accountSid = "AC9949d52ef400f36586067f76a1ee946e"; // Replace with your Twilio Account SID
const authToken = "78766a4dd90c844fc5e273ed52ec54fe";   // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

// Endpoint to handle form submission
app.post("/send-message", (req, res) => {
    const { name, email, message } = req.body;

    // Construct the message
    const whatsappMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    // Send message via Twilio WhatsApp API
    client.messages
        .create({
            from: "whatsapp:+14155238886", // Twilio's WhatsApp sandbox number
            to: "whatsapp:+918767800253",  // Your WhatsApp Business number
            body: whatsappMessage,
        })
        .then((message) => {
            console.log("Message sent:", message.sid);
            res.send("Message sent successfully!");
        })
        .catch((err) => {
            console.error("Error")
        })
