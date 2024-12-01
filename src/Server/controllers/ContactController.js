const transporter = require('../utils/SendMail');
require('dotenv').config();

const { SENDER_EMAIL } = process.env;

async function sendAcknowledgementEmail(req, res) {
    try {
        const { Name, Email } = req.body

        const mailOptions = {
            from: SENDER_EMAIL,
            to: Email,
            subject: 'Thank You for Reaching Out to Trenvo',
            text: `
Hello ${Name},

Thank you for contacting Trenvo! We've received your message, and our team is reviewing it. We're committed to providing prompt assistance, so you can expect a response within the next 24-48 hours.

If your inquiry is urgent, please feel free to call us at +91 95172 72735 during our business hours, and our support team will be happy to assist.

Thank you for choosing Trenvo. We're here to help you look and feel your best!

Warm regards,
Trenvo Team

This is an automated response to confirm we have received your message. Our team will get back to you soon.
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email Sent Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error', error: error.message });
    }
}

async function NotifySupportTeam(req, res) {
    try {

        const { Name, Email, Subject, Message } = req.body
        const mailOptions = {
            from: SENDER_EMAIL,
            to: Email,
            subject: 'Customer Support Request Notification',
            text: `
Dear Trenvo Support Team,

This is an automated notification to inform you that a customer has submitted a support request through the contact form on Trenvo website.

Customer Details:

Name: ${Name}
Email: ${Email}

Subject: ${Subject}
Message: ${Message}

Please address this inquiry at your earliest convenience. If you need any additional information or assistance regarding this request, feel free to reach out.

Best regards,
Trenvo Support Bot
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email Sent Successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server error', error: error.message });
    }
}

module.exports = {sendAcknowledgementEmail, NotifySupportTeam}