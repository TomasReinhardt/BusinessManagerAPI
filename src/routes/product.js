const router = require('express').Router();
const controllerProduct = require('../controllers/product');
const verifyToken = require('../Middleware/validete-token');

router.get('/products',verifyToken,controllerProduct.getProducts)
router.post('/addProduct',verifyToken,controllerProduct.addProduct)
router.put('/updateProduct/:id',verifyToken,controllerProduct.updateProduct)
router.delete('/deleteProduct/:id',verifyToken,controllerProduct.deleteProduct)

module.exports = router;
