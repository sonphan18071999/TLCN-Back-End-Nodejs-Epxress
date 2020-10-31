const express = require('express')
const test_Controller=require('../controllers/testController')
const brand_Controller=require('../controllers/brandController')
const user_Account_Controller = require('../controllers/userAccountController')
const image_Controller = require('../controllers/imageController');
const article_Controller = require('../controllers/articleController');
const comment_Controller = require('../controllers/commentController');
const router = express.Router();



/**Brand */
router.post('/add-new-brand',brand_Controller.addNewBrand);
/**Brand */




/**User account */
router.post('/add-new-user-account',user_Account_Controller.AddUserAccount)
router.post('/check-user',user_Account_Controller.checkAccount)
/**User account */

/**Image */
router.post('/post-image',image_Controller.addNewImage);
router.get('/get-all-image',image_Controller.getAllImage);

/**Image */

/**Article */
router.post('/post-article',article_Controller.addNewArticle);
router.post('/get-all-article',article_Controller.getAllArticle);
router.get('/get-article',article_Controller.getArticleById);
router.post('/update-article',article_Controller.updateArticleById);
router.post('/delete-article',article_Controller.deleteArticleById)
/**Article */


/**Comment */
router.post('/post-comment',comment_Controller.postComment);
/**Comment */
module.exports = router;
