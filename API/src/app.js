const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', productRoutes); 

module.exports = app;