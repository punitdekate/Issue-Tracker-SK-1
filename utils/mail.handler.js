import nodemailer from "nodemailer";

export const sendPasswordForgetEmail = async(user, otp) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.ISSUETRACKER_SMPT_MAIL,
            pass: process.env.ISSUETRACKER_SMPT_MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.ISSUETRACKER_SMPT_MAIL,
        to: user.email,
        subject: "Password Forget",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* Add your custom CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    text-align: center;
                }
                .logo {
                    max-width: 150px;
                }
                .content {
                    margin-top: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #20d49a;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                /* Mobile Responsive Styles */
                @media only screen and (max-width: 600px) {
                    .container {
                        padding: 10px;
                    }
                    .logo {
                        max-width: 100px;
                    }
                    .button {
                        display: block;
                        margin-top: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img class="logo" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/website-bug-tracking-1819337-1544052.png" alt="Issue Tracker">
                    <h1>Password Reset</h1>
                </div>
                <div class="content">
                    <p>Hello, ${user.name}</p>
                    <p>Enter this otp to complete reset password: ${otp}</p>
                    <p>If you did not request a password reset, please raise a concern in help section.</p>
                </div>
            </div>
        </body>
        </html>
    `,
    };

    await transporter.sendMail(mailOptions);
};