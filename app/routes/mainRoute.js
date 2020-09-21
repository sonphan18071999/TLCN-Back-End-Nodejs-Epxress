const express = require('express')
const test_Controller=require('../controllers/testController')
const cpu_Controller=require('../controllers/cputController')
const brand_Controller=require('../controllers/brandController')

const router = express.Router();


/**CPU */
router.post('/add-new-cpu',cpu_Controller.AddNewCPU);
router.put('/edit-cpu',cpu_Controller.EditCPU);
router.get('/get-all-cpu',cpu_Controller.getAllCPU);

/**CPU */

/**Brand */
router.post('/add-new-brand',brand_Controller.addNewBrand);
/**Brand */

module.exports = router;
