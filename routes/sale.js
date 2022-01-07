const router = require('express').Router();
const controllerSale = require('../controllers/sale');
const verifyToken = require('../Middleware/validete-token');

router.get('/sales',verifyToken,controllerSale.getSales);
router.post('/addSale',verifyToken,controllerSale.addSale);
router.put('/updateSale/:id',verifyToken,controllerSale.updateSale);
router.delete('/deleteSale/:id',verifyToken,controllerSale.deleteSale);

module.exports = router;
