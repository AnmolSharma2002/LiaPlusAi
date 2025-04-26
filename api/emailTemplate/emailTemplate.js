module.exports = ({ name, verificationLink }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(90deg, #007bff, #00d4ff);
      padding: 30px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 600;
    }
    .content {
      padding: 30px;
      text-align: center;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 20px;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 500;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #0056b3;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #666666;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
    @media (max-width: 600px) {
      .container {
        margin: 10px;
      }
      .header h1 {
        font-size: 22px;
      }
      .content {
        padding: 20px;
      }
      .button {
        padding: 12px 24px;
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to RBAC Blog Platform</h1>
    </div>
    <div class="content">
      <p>Hello ${name},</p>
      <p>We're thrilled to have you on board! To get started, please verify your email address by clicking the button below.</p>
      <a href="${verificationLink}" class="button">Verify Your Email</a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${verificationLink}">${verificationLink}</a></p>
    </div>
    <div class="footer">
      <p>&copy; 2025 RBAC Blog Platform. All rights reserved.</p>
      <p>Need help? <a href="mailto:support@rbacblog.com">Contact us</a></p>
    </div>
  </div>
</body>
</html>
`;
