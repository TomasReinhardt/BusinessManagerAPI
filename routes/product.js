const router = require('express').Router();
const productController = require('../controllers/product');

router.get('/products',productController.getProducts)
router.post('/addProduct',productController.addProduct)
router.put('/updateProduct/:id', productController.updateProduct)
router.delete('/deleteProduct/:id',productController.deleteProduct)

module.exports = router;
