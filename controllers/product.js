const Product = require('../models/product');

var controllerProduct = {
    getProducts: (req,res) => {
        Product.find( (err,product) => {
            if(err) return res.status(500).send({message: 'error al cargar'})
            if(!product) return res.status(404).send({message: 'no existen productos'})
            return res.status(200).send({ product })
        });
    },

    addProduct: (req,res) => {
        const product = new Product({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock
        })

        product.save( (err,product) => {
            if(err) return res.status(500).send({ message: 'error al guardar' })
            if(!product) return res.status(404).send({ message: 'no se a podido guardar el producto' })
            return res.status(200).send({ product })
        })
    },

    updateProduct: (req,res) => {
        var productId = req.params.id;
        var update = req.body;

        Product.findByIdAndUpdate(productId, update, {new:true}, (err,product) => {
            if(err) return res.status(500).send({ message: 'error al actualizar' })
            if(!product) return res.status(404).send({ message: 'no existe el producto' })
            return res.status(200).send({ product: product})
        })
    },

    deleteProduct: (req,res) => {
        var productId = req.params.id;
        Product.findByIdAndRemove(productId, (err,product) => {
            if(err) return res.status(500).send({ message: 'no se a podido borrar el producto' })
            if(!product) return res.status(404).send({ message: 'no se puede eliminar el proyecto' })
            return res.status(200).send({ product })
        });
    }
}

module.exports = controllerProduct;