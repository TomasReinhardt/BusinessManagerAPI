const router = require('express').Router();
const controllerProduct = require('../controllers/product');

router.get('/products',controllerProduct.getProducts)
router.post('/addProduct',controllerProduct.addProduct)
router.put('/updateProduct/:id', controllerProduct.updateProduct)
router.delete('/deleteProduct/:id',controllerProduct.deleteProduct)

module.exports = router;
