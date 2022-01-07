const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@funkopop-database.pexou.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e)) 

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product')

app.use('/api', authRoutes);
app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})