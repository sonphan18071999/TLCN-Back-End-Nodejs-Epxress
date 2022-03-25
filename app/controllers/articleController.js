const { json } = require("body-parser");
const db = require("../models/mainModels");
const upload = require("../middleware/upload");
const { Schema, mongo, isValidObjectId, Mongoose } = require("mongoose");
const { ObjectId } = require("mongodb"); // or ObjectID
const hash_tag_Controller = require("./hashtagController");

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dsnt8hyn6",
  api_key: "121517243286974",
  api_secret: "q-rZlX2PIYFPuLOmPlrZso1UYx4",
});

/**Code tao bai article moi trong he thong */
exports.addNewArticle = async function (req, res, next) {
  var article = new db.articleModels();
  article = req.body;
  // 1. Convert link image main Image send to cloudiary make it online
  if (article.AvatarPost != null) {
    await cloudinary.uploader.upload(
      article.AvatarPost,
      function (err, result) {
        //set URL for Avatar Post
        article.AvatarPost = err.url;
      }
    );
  }
  //2. Convert link images send to cloudiary and make it online
  for (var i = 0; i < article.content.length; i++) {
    if (article.content[i].images != null) {
      await cloudinary.uploader.upload(
        article.content[i].images,
        function (err, result) {
          //Lấy URL trả về từ Cloudiary
          article.content[i].images = err.url.toString();
        }
      );
    }
  }
  // 3. Insert article to database type JSON - Raw
  var abc = await db.articleModels.create(article);
  if (abc) {
    //4. Thêm hashTag vào table.
    var hashTag = {
      idArticle: abc._id,
      hashTag: req.body.hashTag,
    };
    hash_tag_Controller.createHashTag(hashTag, res, next);
    return res.status(200).json({
      Message: "Post article successfully",
      article: abc,
    });
  }
};
/**Lấy 1 bài viết có lượt like cao nhất trong ngày.
 * Và 12 bài viết theo ngày.
 * Nếu bài viết trong ngày không đủ sẽ lấy bài viết của các ngày sau đó. */
exports.getAllArticle = async function (req, res, next) {
  var allArticle = await db.articleModels.find();
  return res.status(200).json({
    message: "The most liked article of the day.",
    PopularArticle: await getMostLikeArticleByDay(allArticle),
    Article: await pagingArticle(allArticle, req.body.order),
  });
};
async function pagingArticle(allArticle, current) {
  var article = new Array();
  var sixArticle = new Array();
  var currentDay = new Date();
  var articleAfter = new Array();
  allArticle.forEach((element) => {
    if (
      element.postedOn.getDate() == currentDay.getDate() &&
      element.postedOn.getMonth() == currentDay.getMonth() &&
      element.postedOn.getFullYear() == currentDay.getFullYear()
    ) {
      article.push(element);
    } else if (articleAfter.length < 40) {
      articleAfter.push(element);
    }
  });
  for (var i = articleAfter.length - 1; i > 0; i--) {
    article.push(articleAfter[i]);
  }

  var testArr = new Array();
  for (var i = current * 6; i < article.length && i < current * 6 + 6; i++) {
    var a = await db.userAccountModels.findOne({ _id: article[i].idUser });
    if (a) {
      testArr.push(a.name);
    }
    sixArticle.push(article[i]);
  }

  var arr = [];
  for (var i = 0; i < 6; i++) {
    if (sixArticle[i] != null) {
      var article2 = {
        Article: sixArticle[i],
        Author: testArr[i],
      };
      arr.push(article2);
    }
  }
  /**Load mỗi lần 6 bài viết  */
  return arr;
}

async function getMostLikeArticleByDay(allArticle) {
  let maxLike = 0;
  let popularArticle = new db.articleModels();
  allArticle.forEach((item) => {
    if (item.likesCount > maxLike) {
      maxLike = item.likesCount;
      popularArticle = item;
    }
  });

  let userInfo = await db.userAccountModels.findById(popularArticle.idUser);
  popularArticleRes = {
    Article: popularArticle,
    userName: userInfo,
  };
  return popularArticleRes;
}

exports.getArticleById = async function (req, res, next) {
  var article = await db.articleModels.findOne({ _id: req.query.id });
  var info = await db.userAccountModels.findOne({ _id: article.idUser });
  var hashTag = await hash_tag_Controller.getAllHashTagByArticleId(
    article._id,
    res,
    next
  );
  var relatedArticle = await getArticleWithByHashTag(hashTag, res, next);
  if (article != null && info != null) {
    return res.status(200).json({
      Aricle: article,
      Author: info,
      hashTag: hashTag,
      RelatedArticle: relatedArticle,
    });
  } else {
    return res.status(500).json({ Message: "Empty" });
  }
};

getArticleWithByHashTag = async function (req, res, next) {
  var arrayIdArticle = new Array();
  var newArrayIdArticle = new Array();
  var allRelatedArticle = new Array();
  //1. Đưa tất cả những id article có những hashtag trung nhau vào một array
  for (var item of req) {
    for (var idArticle of item.article) {
      arrayIdArticle.push(idArticle);
    }
  }
  // console.log(arrayIdArticle.length)
  //2. Loại bỏ những id article trung nhau.
  let uniq = {};
  newArrayIdArticle = arrayIdArticle.filter(
    (obj) => !uniq[obj] && (uniq[obj] = true)
  );
  //3.Từ mảng article mới đó trả về những nội dung trong article.
  for (var item of newArrayIdArticle) {
    let a = await db.articleModels.findOne({ _id: item });
    allRelatedArticle.push(a);
  }
  return allRelatedArticle;
};

exports.updateContentArticleById = async function (req, res, next) {
  var article = req.body;
  //1. Convert link images send to cloudiary and make it online
  for (var i = 0; i < article.content.length; i++) {
    if (article.content[i].images != null) {
      await cloudinary.uploader.upload(
        article.content[i].images,
        function (err, result) {
          //Lấy URL trả về từ Cloudiary
          article.content[i].images = err.url.toString();
        }
      );
    }
  }
  // 2. Update article to database type JSON - Raw
  await db.articleModels.updateMany(
    { _id: req.body.idArticle },
    { content: article.content }
  );

  var a = await db.articleModels.findOne({ _id: req.body.idArticle });
  if (a) {
    return res.status(200).json({
      Message: "Update article successfully",
      Article: a,
    });
  }
};
exports.deleteArticleById = async (req, res, next) => {
  if (req.body.id == null) {
    return res.status(203).json({
      Message: "You don't put any id",
    });
  }
  // 1. Xóa article trong bảng article
  await db.articleModels.deleteOne(
    { _id: mongo.ObjectID(req.body.id) },
    (err, ok) => {
      if (err) {
        return res.status(500).json({
          Message: "Cant delete this article",
          error: err,
        });
      }
    }
  );

  // 2. Xóa những idArticle mà User lưu.

  // 3. Xóa những comment thuộc về article.

  // 4. Xóa những id thuộc hastag.
};

exports.likeArticle = async (req, res, next) => {
  var uniq;
  await db.articleModels.findOne({ _id: req.body.idArticle }).then((item) => {
    item.arrayLike.push({ idUser: req.body.idUser });
    /**Loại bỏ những phần idUser trung trong đó */
    uniq = item.arrayLike.filter(function ({ idUser }) {
      return !this[idUser] && (this[idUser] = idUser);
    }, {});
    /**Loại bỏ những phần id trung trong đó */
  });
  /**Update lại arrayLike */
  var updateArticle = await db.articleModels.findOneAndUpdate(
    { _id: req.body.idArticle },
    { $set: { arrayLike: uniq } }
  );
  var updateLikeCount = await db.articleModels.findOneAndUpdate(
    { _id: req.body.idArticle },
    { $set: { likesCount: uniq.length } }
  );
  if (updateArticle && updateLikeCount) {
    return res.status(200).json({
      Message: "Like successfully",
      article: updateArticle,
    });
  } else {
    return res.status(203).json({
      Message: "Server busy",
    });
  }
};
exports.getAllArticleByIdUser = async (req, res, next) => {
  var article = await db.articleModels.find({ idUser: req.query.id });
  return res.status(200).json({
    Message: "All article",
    article: article,
  });
};
exports.checkArticleAuthor = async (req, res) => {
  var article = await db.articleModels.findById({ _id: req.body.idArticle });
  if (article) {
    if (article.idUser == req.body.idUser) {
      return res.status(200).json({
        Message: "Authenticated",
      });
    } else {
      return res.status(203).json({
        Message: "Unauthenticated",
      });
    }
  }
};

exports.searchArticle = async (req, res, next) => {
  var allArticleSearched = await db.articleModels.find({
    tittle: { $regex: req.body.searchKeyWord },
  });
  if (allArticleSearched) {
    return res.status(200).json({
      Message: "All searched Article",
      allArticle: allArticleSearched,
    });
  } else {
    return res.status(200).json({
      Message: "Can't find equivalent article",
    });
  }
};
