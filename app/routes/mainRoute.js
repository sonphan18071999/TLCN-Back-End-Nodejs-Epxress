const express = require('express')
const test_Controller=require('../controllers/testController')
const brand_Controller=require('../controllers/brandController')
const user_Account_Controller = require('../controllers/userAccountController')
const image_Controller = require('../controllers/imageController');
const article_Controller = require('../controllers/articleController');
const comment_Controller = require('../controllers/commentController');
const saved_article_Controller = require('../controllers/savedArticleController.js')
const hash_tag_Controller = require('../controllers/hashtagController')
const report_article_Controller = require('../controllers/articleBeingReportController')
const annoucement_Controller = require('../controllers/announcementController')
const bullentin_Controller = require('../controllers/bulletinBoardController')
const router = express.Router();

/**Brand */
router.post('/add-new-brand',brand_Controller.addNewBrand);
/**Brand */

/**User account */
router.get('/get-all-user',user_Account_Controller.getAllUser);
router.post('/add-new-user-account',user_Account_Controller.AddUserAccount)
router.post('/check-user',user_Account_Controller.checkAccount)
router.post('/get-user-information',user_Account_Controller.findUserById);

/**User account */

/**Image */
router.post('/post-image',image_Controller.addNewImage);
router.get('/get-all-image',image_Controller.getAllImage);
/**Image */

/**Article */
router.post('/post-article',article_Controller.addNewArticle);
router.post('/get-all-article',article_Controller.getAllArticle);
router.get('/get-article',article_Controller.getArticleById);
router.post('/update-article-content',article_Controller.updateContentArticleById);
router.post('/delete-article',article_Controller.deleteArticleById)
router.get('/get-all-article-posted-by-user',article_Controller.getAllArticleByIdUser)
router.post('/check-author',article_Controller.checkArticleAuthor);
/**Article */

/**Comment */
router.post('/get-comment-article',comment_Controller.getAllCommentByIdArticle);
router.post('/post-comment-parent',comment_Controller.postCommentParent);
router.post('/post-comment-child',comment_Controller.postCommentChild);
/**Comment */


/**Saved Article */
router.post('/save-article',saved_article_Controller.SaveArticle);
router.post('/check-save-status-article',saved_article_Controller.checkSaveArticle);
router.post('/get-saved-article-by-user',saved_article_Controller.getSavedArticleByIdUser);
/**Saved Article */


/**Save HashTag */
router.post('/create-hashtag',hash_tag_Controller.createHashTag);
/**Save HashTag */


/**Report article */
router.post('/create-report',report_article_Controller.createReports)
router.get('/all-article-being-report',report_article_Controller.getAllArticleBeingReport);         //get all article being report
router.post('/disable-article',report_article_Controller.disableArticle);           //Disable article
router.post('/enable-article',report_article_Controller.enableArticle);             //Enable article
router.post('/update-level-artilce-report',report_article_Controller.setLevelForArticleReport)
/**Report article */

/**Create annoucement */
router.post('/create-annoucement',annoucement_Controller.createNewAnnouncement);
/**Create annoucement */


/**Bullentin Controller */
router.post('/bullentinBoard/create',bullentin_Controller.createNewBullentinBoard);
router.get('/bullentinBoard/get-all',bullentin_Controller.getAllBullentinBoard);
router.post('/bullentinBoard/detail',bullentin_Controller.getDetailBullentinBoardById);
/**Bullentin Controller */

module.exports = router;
