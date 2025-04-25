const emailTemplate = (username, verificationLink) => {
  return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              color: #333;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 15px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              padding: 20px;
              text-align: center;
            }
            .footer {
              padding: 10px;
              text-align: center;
              font-size: 12px;
              color: #888;
            }
            a.button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Email Verification</h1>
            </div>
            <div class="content">
              <p>Hello ${username},</p>
              <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the link below:</p>
              <a href="${verificationLink}" class="button">Verify Email</a>
            </div>
            <div class="footer">
              <p>If you did not sign up for an account, please ignore this email.</p>
              <p>&copy; ${new Date().getFullYear()} YourCompanyName</p>
            </div>
          </div>
        </body>
      </html>
    `;
};

module.exports = emailTemplate;
