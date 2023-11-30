const db = require("../models/mainModels");
const jwt = require("jsonwebtoken");
const TOKEN = require("../helper/helper");

exports.register = async function (req, res, next) {
  let checkEmail = await db.accountDTO.findOne({
    email: req.body.email,
  });
  console.log("req",req)
  if (checkEmail) {
    return res.status(500).json({ Message: "Email already used" });
  } else {
    let user = await db.accountDTO.create(req.body);
    if (user) {
      return res.status(200).json({
        Message: "Create user successfully",
        User: user,
      });
    } else {
      return res.status(200).json({
        Message: "Cant create new user",
        Error: user,
      });
    }
  }
};

exports.login = async function (req, res, next) {
  if (req.body.typeAccount == "facebook") {
    await db.accountDTO.findOne({ email: req.body.email }, (er, ok) => {
      if (er) {
        return res.status(500).json({
          message: "User doesn't exist",
        });
      }
      if (ok) {
        return res.status(200).json({
          message: "User does exist",
          user: ok,
        });
      } else {
        //Email k tồn tại thì đăng ký mới.
        const userCreate = new db.accountDTO({
          email: req.body.email,
          password: "ramdomize",
          name: req.body.userName,
          phone: "00000000",
          typeAccount: "facebook",
        });
        userCreate.save(function (errr) {
          if (errr) {
            res.status(500).json("Failed to account" + errr);
          } else
            res.status(200).json({
              message: "Success to create new account",
              user: userCreate,
            });
        });
      }
    });
  } else if (req.body.typeAccount === "admin") {
    // let chkUser = await db.accountDTO.findOne({
    //   email: req.body.email,
    //   password: req.body.password,
    //   typeAccount: req.body.typeAccount,
    // });
    // if (chkUser) {
    //   return res.status(200).json({
    //     message: "User does exist",
    //     user: chkUser,
    //   });
    // } else {
    //   return res.status(500).json({
    //     message: "User doesn't exist",
    //   });
    // }
    return res.status(200);
  }

  if (req.body.typeAccount === "normal") {
    let chkUser = await db.accountDTO.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign(
      { userId: chkUser.id, userName: chkUser.name },
      TOKEN.SECRET,
      {
        expiresIn: 60 * 24,
      }
    );

    if (chkUser) {
      chkUser.token = token;
      chkUser.save();
      return res.status(200).json({
        message: "Login success",
        user: chkUser,
      });
    } else {
      return res.status(500).json({
        message: "Login failed",
      });
    }
  }
};
exports.findUserById = async (req, res, next) => {
  var idUser = req.body.idUser;
  await db.accountDTO.findOne({ _id: idUser }, (er, ok) => {
    if (er) {
      return res.status(500).json({ Message: er });
    }
    if (ok) {
      return res.status(200).json({
        Message: "Find user by id",
        UserInfo: ok,
      });
    }
  });
};
exports.getAllUser = async (req, res, next) => {
  await db.accountDTO.find((er, ok) => {
    return res.status(200).json({
      message: "Get all the user successfully",
      AllUser: ok,
    });
  });
};
