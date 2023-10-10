import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noumanlf2@gmail.com",
    pass: "mpmbncdcxbllpuyi",
  },
});
export default transporter;
