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

module.exports = {
    sendMail
}


// const sendMail = (toEmail, body) => {
//     let transporter = nodeoutlook.createTransport({
//         // service: 'gmail',
//         // auth: {
//         //     user: fromEmail,
//         //     pass: fromPassword,
//         // }

//         // host: , // hostname
//         // secureConnection: false, // TLS requires secureConnection to be false
//         // port: 587, // port for secure SMTP
//         // tls: {
//         //     ciphers: 'SSLv3'
//         // },
//         // auth: {
//         //     user: fromEmail,
//         //     pass: fromPassword,
//         // }
//         //service: outlook,
//         auth: {
//             user: "resetpassrads@outlook.com",
//             pass: "replier112233"
//         }
//     });
//     let mailOptions = {
//         from: "resetpassrads@outlook.com",
//         to: toEmail,
//         subject: 'Password Reset',
//         text: body,
//     }
//     transporter.sendMail(mailOptions, function(err, data) {
//         if (err) {
//             console.log("Error: ", err);
//         } else {
//             console.log("Email sent successfully");
//         }
//     });
// };