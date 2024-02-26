import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adelnamazi61@gmail.com",
    pass: "aari ktsn ujve erwl",
  },
});

export const sendVerificationEmail = async (email, verifyAccountToken) => {
  let details = {
    from: "adelnamazi61@gmail.com",
    to: email,
    subject: "verify Account",
    text: `http://localhost:3000/api/verify_account/${verifyAccountToken}`,
  };
  await transporter.sendMail(details);
};
