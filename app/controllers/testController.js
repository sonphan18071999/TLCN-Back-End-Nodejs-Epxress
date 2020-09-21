const db = require('../models/mainModels');
const mongoose = require('mongoose');
exports.createTest = async function (req, res, next) {
    const test = new db.testModels({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title
    })
    test.save(function (errr) {
      if (errr) {
        res.status(500).json("Failed to create domestric payment card");
      }
      else
        res.status(200).json({
          message: "Create domestic account successfully!!",
          test: test
        });
    })
}