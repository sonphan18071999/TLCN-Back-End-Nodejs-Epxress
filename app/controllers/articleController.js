const db = require('../models/mainModels');
exports.addNewArticle = async function (req, res, next) {
    const a = new db.articleModels({
        tittle:req.body.tittle,
        content:req.body.content,
        idUser:req.body.idUser
    })
    a.save(function (errr) {
      if (errr) {
        res.status(500).json("Failed to create new article");
      }
      else
        res.status(200).json({
          message: "Create new article successfully!!",
          article: a
        });
    })
}