const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const templatePath = path.join(__dirname, '../views/bookCreated.pug');

async function sendBookCreatedEmail(book) {
    // Compile the Pug template to HTML
    const html = pug.renderFile(templatePath, {
        title: book.title,
        author: book.author,
        year: book.year,
        message: 'A new book has been added to the system.'
    });

    // Send the email
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.DEFAULT_RECIPIENT_EMAIL,
        subject: 'New Book Added',
        html
    });
}

module.exports = sendBookCreatedEmail;