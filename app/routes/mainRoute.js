const express = require("express");
const articleController = require("../controllers/articleController");
const announcementController = require("../controllers/announcementController");
const bulletinController = require("../controllers/bulletinBoardController");
const brandController = require("../controllers/brandController");
const commentController = require("../controllers/commentController");
const hashTagController = require("../controllers/hashtagController");
const imageController = require("../controllers/imageController");
const reportArticleController = require("../controllers/articleBeingReportController");
const savedArticleController = require("../controllers/savedArticleController.js");
const userAccountController = require("../controllers/userAccountController");
const groupController = require("../controllers/groupController");

const router = express.Router();

const authorize = require("../middleware/auth");
/**Brand */
router.post("/add-new-brand", brandController.addNewBrand);
/**Brand */

/**User account */
router.get("/get-all-user", userAccountController.getAllUser);
router.post("/add-new", userAccountController.register);
router.post("/check-user", userAccountController.login);
router.post("/get-user-information", userAccountController.findUserById);
/**User account */

/**Image */
router.post("/post-image", imageController.addNewImage);
router.get("/get-all-image", imageController.getAllImage);
/**Image */

/**Article */
router.post("/post-article", articleController.addNewArticle);
router.post("/get-all-article", articleController.getAllArticle);
router.get("/get-article", articleController.getArticleById);
router.post(
  "/update-article-content",
  articleController.updateContentArticleById
);
router.post("/delete-article", articleController.deleteArticleById);
router.get(
  "/get-all-article-posted-by-user",
  articleController.getAllArticleByIdUser
);
router.post("/check-author", articleController.checkArticleAuthor);
router.post("/article/likePost", articleController.likeArticle);
router.post("/article/search-title", articleController.searchArticle);
/**Article */

/**Comment */
router.post("/get-comment-article", commentController.getAllCommentByIdArticle);
router.post("/post-comment-parent", commentController.postCommentParent);
router.post("/post-comment-child", commentController.postCommentChild);
/**Comment */

/**Saved Article */
router.post("/save-article", savedArticleController.SaveArticle);
router.post(
  "/check-save-status-article",
  savedArticleController.checkSaveArticle
);
router.post(
  "/get-saved-article-by-user",
  savedArticleController.getSavedArticleByIdUser
);
/**Saved Article */

/**Save HashTag */
router.post("/create-hashtag", hashTagController.createHashTag);
/**Save HashTag */

/**Report article */
router.post("/create-report", reportArticleController.createReports);
router.get(
  "/all-article-being-report",
  reportArticleController.getAllArticleBeingReport
); //get all article being report
router.post("/disable-article", reportArticleController.disableArticle); //Disable article
router.post("/enable-article", reportArticleController.enableArticle); //Enable article
router.post(
  "/update-level-artilce-report",
  reportArticleController.setLevelForArticleReport
);
/**Report article */

/**Create annoucement */
router.post(
  "/create-annoucement",
  announcementController.createNewAnnouncement
);
/**Create annoucement */

/**Facts Controller */
router.post(
  "/bullentinBoard/create",
  bulletinController.createNewBullentinBoard
);
router.get("/bullentinBoard/get-all", bulletinController.getAllBullentinBoard);
router.post(
  "/bullentinBoard/detail",
  bulletinController.getDetailBullentinBoardById
);
/**Facts Controller */

// Group

router.post("/group", authorize, groupController.createGroup);

module.exports = router;
