const nodemailer = require("nodemailer");
var nodeoutlook = require('nodejs-nodemailer-outlook')
require('dotenv').config();


const sendMail = (toEmail, body) => {
    nodeoutlook.sendEmail({
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        },
        from: process.env.SENDER_EMAIL,
        to: toEmail,
        subject: 'Password Reset',
        text: body,
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });
};

const sendPDF = (toEmail, body) => {
    nodeoutlook.sendEmail({
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        },
        from: process.env.SENDER_EMAIL,
        to: toEmail,
        subject: 'Certificate of completion',
        text: body,
        attachments: [{
            filename: 'certificate.pdf',
            path: '../backend/Documents/certificate.pdf',
            contentType: 'application/pdf'
        }],
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });
};

module.exports = {
    sendMail,
    sendPDF
}