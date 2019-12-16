const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 3000;

const uri = process.env.ATLAS_PASSWORD;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on('error', (error) => console.error(error));
connection.once('open', () => console.log('MongoDB database connected!'))

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRouter = require('./routes/users.route');
const productRouter = require('./routes/products.route');
const orderRouter = require('./routes/orders.route');
const authRouter = require('./routes/auth.route');
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/auth', authRouter);

app.listen(port, () => console.log(`The server is working on port ${port}!!`));