/**
 * This File is Responsible For Configuring Automated
 * Mailer Service & Create Helper Functions Which
 * Are Exported to Other Files.
*/

/** External Imports ( NPM ) */
import nodemailer from 'nodemailer';

/** Internal Imports */
import constants from '../constants/global.constant.js';

/**
 * The Admin Transporter Configurations
 * Using Outlook Service.
*/
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: '587',
    auth: {
        user: constants.MAILER.EMAIL,
        pass: constants.MAILER.PASS
    },
    secureConnection: false,
    tls: { ciphers: 'SSLv3' }
});

/** Sends an Email Containing The Password */
const sendMail = (email, password) => {
    const mailOptions = {
        from: constants.MAILER.EMAIL,
        to: email,
        subject: 'Runprof Task User Authentication Password',
        text: `Welcome ${email}!\nYour Password is: ${password}`
    };
    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Sent: ${res.response}`);
    });
};

export default sendMail;
