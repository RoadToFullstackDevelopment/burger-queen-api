const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 5000;

const userRouter = require('./routes/api/users.route');
const productRouter = require('./routes/api/products.route');
const orderRouter = require('./routes/api/orders.route');
const uploadRouter = require('./routes/api/uploads.route');
const complementRouter = require('./routes/api/complement.route');

const uri = process.env.ATLAS_PASSWORD;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).catch(err => {
    console.log(err);
});

const connection = mongoose.connection;
connection.on('error', (error) => console.error(error));
connection.once('open', () => console.log('MongoDB database connected!'))


app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')
        return res.status(200).json({})
    }
    next();
})

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/complement', complementRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404; 
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

app.listen(port, () => console.log(`The server is working on port ${port}!!`));