// import { body } from 'express-validator';
import Mailgen from 'mailgen';
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config()


export const sendmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {

            name: 'Book Bazar',
            link: 'https://mailgen.js/'

        }
    });

    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);
    var emailBody = mailGenerator.generate(options.mailGenContent);

    //nodemailer configuration
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_USER, // generated ethereal user
            pass: process.env.MAILTRAP_PASS, // generated ethereal password
        },
    });

    const mail = {

        from: process.env.MAILTRAP_SENDERMAIL,  // ✅ Correct
// sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: emailText, // plain text body
        html: emailBody, // html body
    }
    try{
        await transporter.sendMail(mail);
        console.log('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
    }



}

//this method send mail

export const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to Bookbazar! we are veryexcited to have you on board.',
            action: {
                instructions: 'To get started with Mailgen, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'verify your email',
                    link: verificationUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}

export const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: 'we got a request to reset your password.',
            action: {
                instructions: 'to change your password, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'reset your password',
                    link: passwordResetUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}

// sendmail({
//     email: user.email,
//     subject: 'Verify your email address',
//     mailGenContent: emailVerificationMailgenContent(
//         user.username,
//         ` `
//     )
// })
// sendResetPasswordMail({
//     email: user.email,
//     subject: "Reset your password",
//     mailGenContent: forgotPasswordMailgenContent(
//         user.username,
//         ` `
//     )
// })