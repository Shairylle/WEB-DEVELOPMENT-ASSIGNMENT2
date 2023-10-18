const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/Marketplace', { useNewUrlParser: true, useUnifiedTopology: true });

const productRouter = require('./routes/products');
app.use('/api/products', productRouter);
const categoryRouter = require('./routes/categories');
app.use('/api/category', categoryRouter);
const connection = mongoose.connection;

connection.on('error', (error) => 
    console.error(error))

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to DressStore Application.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
