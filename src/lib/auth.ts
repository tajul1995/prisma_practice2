import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "tajulislam199595@gmail.com",
    pass: "dkre hspg wmio btat",
  },
});


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins:[process.env.APP_URL!],
    user:{
        additionalFields:{
            role:{
                type:'string',
                defaultValue:"USER",
                required:false
            },
            phone:{
                type:'string',
                required:false
            },
            status:{
                type:'string',
                defaultValue:"ACTIVE",
                required:false
            }
        }
    },
    emailAndPassword: { 
    enabled: true, 
    autoSignIn:false,
    requireEmailVerification: true,
  },

emailVerification: {
    sendOnSignUp:true,
    autoSignInAfterVerification:true,
    sendVerificationEmail: async ( { user, url, token }, request) => {
        const verificationUrl=`${process.env.APP_URL}/verify-email?token=${token}`
      const info = await transporter.sendMail({
    from: '"prisma_blog" <prismablog@gmail.com>',
    to: user.email,
    subject: user.name,
    text: "Hello world?", // Plain-text version of the message
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .header {
      background-color: #4f46e5;
      padding: 20px;
      text-align: center;
      color: #ffffff;
    }
    .content {
      padding: 30px;
      color: #333333;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      margin: 20px 0;
      padding: 14px 28px;
      background-color: #4f46e5;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }
    .footer {
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #777777;
      background-color: #f9fafb;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verify Your Email</h1>
    </div>

    <div class="content">
      <p>Hi <strong>${user.name}</strong>,</p>

      <p>
        Thank you for signing up for <strong>Prisma Blog</strong>.
        Please confirm your email address by clicking the button below.
      </p>

      <p style="text-align: center;">
        <a href="${verificationUrl}" class="button">Verify Email</a>
      </p>

      <p>
        If the button doesn’t work, copy and paste this link into your browser:
      </p>

      <p style="word-break: break-all;">
        <a href="${verificationUrl}">${verificationUrl}</a>
      </p>

      <p>
        This link will expire soon. If you did not create an account, you can safely ignore this email.
      </p>

      <p>Best regards,<br />Prisma Blog Team</p>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Prisma Blog. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`, 
  });

  console.log("Message sent:", info.messageId);
    },
  },






});