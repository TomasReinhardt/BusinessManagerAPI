const router = require('express').Router();
const controllerSale = require('../controllers/sale');

router.get('/sales',controllerSale.getSales);
router.post('/addSale',controllerSale.addSale);
router.put('/updateSale/:id',controllerSale.updateSale);
router.delete('/deleteSale/:id',controllerSale.deleteSale);

module.exports = router;
