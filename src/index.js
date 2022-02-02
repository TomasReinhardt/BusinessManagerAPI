const express = require('express');
const morgan = require('morgan');
require('dotenv').config()

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const saleRoutes = require('./routes/sale');

app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', saleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})