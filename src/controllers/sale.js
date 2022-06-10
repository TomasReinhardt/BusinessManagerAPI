const dbConnection = require('../databases')
const connection = dbConnection();

var controllerSale = {

    getSales: (req,res) => {
        var saleDate = req.params.date+'%';
        console.log(saleDate)
        connection.query('select * from salesbussinesmanager where date like ?',[saleDate], (err, result) => {
            if(err) return res.status(500).send({ message: 'error al cargar' })
            if(!result) return res.status(404).send({ message: 'no existen ventas' })
            return res.status(200).send({ result })
        })
    },

    getDates: (req,res) => {
        connection.query('SELECT date FROM salesbussinesmanager', (err, result) => {
            if(err) return res.status(500).send({ message: 'error al cargar' })
            if(!result) return res.status(404).send({ message: 'no existen fechas' })
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

        connection.query('INSERT INTO salesbussinesmanager SET ?',[newSale], (err,result) => {
            if(err) return res.status(500).send(err.sqlMessage)
            if(!result) return res.status(404).send({ message: 'no se a podido guardar la venta' })
            return res.status(200).send({message:'Save sale'})
        })
    },

    updateSale: (req,res) => {
        var saleId = req.params.id;
        var sale = {
            fiado: req.body.fiado
        };
        connection.query('UPDATE salesbussinesmanager SET ? where id = ?',[sale,saleId], (err,result) => {
            if (err) return res.status(500).send({ message: 'error al actualizar' });
            if (!result) return res.status(404).send({ message: 'no existe la venta' });
            return res.status(200).send({message:'Update sale'});
        });
    },

    deleteSale: (req,res) => {
        var saleId = req.params.id;
        connection.query('DELETE FROM salesbussinesmanager WHERE id = ?',[saleId], (err,result) => {
            if(err) return res.status(500).send({ message: 'error al eliminar' })
            return res.status(200).send({message:'Delete sale'})
        })
    }

}

module.exports = controllerSale;