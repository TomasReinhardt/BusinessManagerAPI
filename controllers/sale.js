const Sale = require('../models/sale');
const date = require('date-and-time');
const product = require('../models/product');

var controllerSale = {
    getSales: (req,res) => {
        Sale.find( (err,sale) => {
            if(err) return res.status(500).send({message: 'error al cargar'})
            if(!sale) return res.status(404).send({message: 'no existen ventas'})
            return res.status(200).send({ sale })
        });
    },

    addSale: (req,res) => {
        const now  =  new Date();
        const value = date.format(now,'DD/MM/YYYY');
        const newSale = new Sale({
            total: req.body.total,
            listProducts: req.body.listProducts,
            date: value,
            fiado: req.body.fiado
        })

        newSale.save( (err,newSale) => {
            if(err) return res.status(500).send({ message: 'error al guardar' })
            if(!newSale) return res.status(404).send({ message: 'no se a podido guardar la compra' })
            return res.status(200).send({ newSale })
        })
    },

    updateSale: (req,res) => {
        var saleId = req.params.id;
        var update = req.body;

        Sale.findByIdAndUpdate(saleId, update, {new:true}, (err,sale) => {
            if(err) return res.status(500).send({ message: 'error al actualizar' })
            if(!sale) return res.status(404).send({ message: 'no existe el producto' })
            return res.status(200).send({ sale: sale})
        })
    },

    deleteSale: (req,res) => {
        var saleId = req.params.id;
        Sale.findByIdAndDelete(saleId, (err,sale) => {
            if(err) return res.status(500).send({ message: 'no se a podido borrar el producto' })
            if(!sale) return res.status(404).send({ message: 'no se puede eliminar el proyecto' })
            return res.status(200).send({ sale })
        })
    }

}

module.exports = controllerSale;