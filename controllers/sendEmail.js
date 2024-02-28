import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adelnamazi61@gmail.com",
    pass: "aari ktsn ujve erwl",
  },
});

export const sendVerificationLinkToEmail = async (
  email,
  firstName,
  verifyToken
) => {
  let details = {
    from: "adelnamazi61@gmail.com",
    to: email,
    subject: "verify Account",
    html: `
    <img src="https://cdn-icons-png.flaticon.com/512/5309/5309779.png" alt="brand" width="30" height="30"/>
      <p>Dear ${firstName}</p>
      <p>Thank you for signing up. Please click the following link to verify your account:</p>
      <a href="http://localhost:3000/api/verify_account/${verifyToken}">Verify Account</a>
      <p>If you did not sign up, please ignore this email.</p>
      <p>Best Regards,<br/>Your Website Team</p>
    `,
  };
  await transporter.sendMail(details);
};
