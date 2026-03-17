const nodemailer = require('nodemailer');

async function sendMail() {
    // 1️⃣ Transporter setup (SMTP server)
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",      // Gmail SMTP
        port: 465,
        secure: true,                // true for 465, false for other ports
        auth: {
            user: "your.email@gmail.com",     // তোমার Gmail
            pass: "your_app_password"        // Gmail App Password
        },
    });

    // 2️⃣ Email options
    const mailOptions = {
        from: '"Atik" <your.email@gmail.com>',
        to: "recipient@example.com",
        subject: "Hello from Node.js",
        text: "This is a test email sent from Node.js",
        html: "<b>This is a test email sent from Node.js</b>"
    };

    // 3️⃣ Send email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    } catch (err) {
        console.error("Error sending mail:", err);
    }
}

sendMail();
