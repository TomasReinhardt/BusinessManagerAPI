const router = require('express').Router();
const controllerSale = require('../controllers/sale');
const verifyToken = require('../Middleware/validete-token');

router.get('/sales/:date',verifyToken,controllerSale.getSales);
router.get('/salesClients/:client',verifyToken,controllerSale.getSalesClients);
router.get('/dates',verifyToken,controllerSale.getDates);
router.get('/clients',verifyToken,controllerSale.getClients);
router.post('/addSale',verifyToken,controllerSale.addSale);
router.put('/updateSale/:id',verifyToken,controllerSale.updateSale);
router.delete('/deleteSale/:id',verifyToken,controllerSale.deleteSale);

module.exports = router;
