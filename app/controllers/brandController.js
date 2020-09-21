const db = require('../models/mainModels');
exports.addNewBrand = async function (req, res, next) {
    const brand = new db.brandModels({
        NameBrand: req.body.NameBrand
    })
    brand.save(function (errr) {
      if (errr) {
        res.status(500).json("Failed to create brand");
      }
      else
        res.status(200).json({
          message: "Create brand successfully!!",
          brand: brand
        });
    })
}