const dbConnection = require('../databases')
const connection = dbConnection();

var controllerSale = {

    getSales: (req,res) => {
        connection.query('SELECT * FROM salesBussinesManager', (err, result) => {
            if(err) return res.status(500).send({ message: 'error al cargar' })
            if(!result) return res.status(404).send({ message: 'no existen ventas' })
            return res.status(200).send({ result })
        })
    },

    addSale: (req,res) => {
        const newSale = {
            total: req.body.total,
            listProducts: req.body.listProducts,
            fiado: req.body.fiado,
            seller: req.body.seller,
            buyer: req.body.buyer
        }

        connection.query('INSERT INTO salesBussinesManager SET ?',[newSale], (err,result) => {
            if(err) return res.status(500).send(err.sqlMessage)
            if(!result) return res.status(404).send({ message: 'no se a podido guardar la venta' })
            return res.status(200).send({message:'Save sale'})
        })
    },

    updateSale: (req,res) => {
        var saleId = req.params.id;
        console.log(saleId)
        var sale = {
            fiado: req.body.fiado
        };
        connection.query('UPDATE salesBussinesManager SET ? where id = ?',[sale,saleId], (err,result) => {
            if (err) return res.status(500).send({ message: 'error al actualizar' });
            if (!result) return res.status(404).send({ message: 'no existe la venta' });
            return res.status(200).send({message:'Update sale'});
        });
    },

    deleteSale: (req,res) => {
        var saleId = req.params.id;
        connection.query('DELETE FROM salesBussinesManager WHERE id = ?',[saleId], (err,result) => {
            if(err) return res.status(500).send({ message: 'error al eliminar' })
            return res.status(200).send({message:'Delete sale'})
        })
    }

}

module.exports = controllerSale;