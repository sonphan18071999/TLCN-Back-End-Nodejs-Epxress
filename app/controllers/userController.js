const db = require('../models/mainModels');
exports.AddUserCPU = async function (req, res, next) {
    const cpu = new db.userModels({
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        dob:req.body.dob,
        nation: req.body.nation,
        identification: req.body.identification
    })
    cpu.save(function (errr) {
      if (errr) {
        res.status(500).json("Failed to user" +errr);
      }
      else
        res.status(200).json({
          message: "Success to create new user",
          cpu: cpu
        });
    })
}

