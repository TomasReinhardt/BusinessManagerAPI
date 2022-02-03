const dbConnection = require('../databases')
const connection = dbConnection();

var controllerProduct = {
    getProducts: (req,res) => {
        connection.query('SELECT * FROM products', (err, result) => {
            if (err) return res.status(500).send({ message: 'error al cargar' });
            if (!result) return res.status(404).send({ message: 'no existen productos' });
            return res.status(200).send({ result });
        })
    },

    addProduct: (req,res) => {
        const product = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            codigo: req.body.codigo
        }

        connection.query('INSERT INTO products SET ?',[product], (err,result) => {
            if(err) return res.status(500).send(err.sqlMessage)
            if(!result) return res.status(404).send({ message: 'no se a podido guardar el producto' })
            return res.status(200).send({message:'Save product'})
        })
    },

    updateProduct: (req,res) => {
        var productId = req.params.id;
        var product = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            cant: req.body.cant,
            codigo: req.body.codigo
        };
        connection.query('UPDATE products SET ? where id = ?',[product,productId], (err,result) => {
            if (err) return res.status(500).send({ message: 'error al actualizar' });
            if (!result) return res.status(404).send({ message: 'no existe el product' });
            return res.status(200).send({message:'Update product'});
        });
    },

    deleteProduct: (req,res) => {
        var productId = req.params.id;
        connection.query('DELETE FROM products WHERE id = ?',[productId], (err,result) => {
            if(err) return res.status(500).send({ message: 'error al eliminar' })
            return res.status(200).send({message:'Delete product'})
        })
    }
}

module.exports = controllerProduct;