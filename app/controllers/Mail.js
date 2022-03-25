const db = require("../models/mainModels");
const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res, next) => {
  const mailSender = req.body;
  const emailSender = "daicaratu12341234@gmail.com";
  const emailPassword = "Chikiet1@";

  if (mailSender) {
    // console.log(mailSender);

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: emailSender,
        pass: emailPassword,
      },
    });

    let info = await transporter.sendMail({
      from: emailSender, // sender address
      to: mailSender.receiver, // list of receivers
      subject: mailSender.title, // Subject line
      text: "Hello world?", // plain text body
      html: mailSender.content, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    if (info) {
      transporter.close();
    }
  }
};
