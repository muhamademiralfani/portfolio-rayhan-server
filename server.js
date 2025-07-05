// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Untuk mem-parsing body JSON dari request

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Berhasil terhubung ke MongoDB');
}).catch(err => {
    console.error('Koneksi database gagal:', err.stack);
});

// Routes
// Routes
const projectRoutes = require('./routes/projects');
const categoryRoutes = require('./routes/categories'); // <-- 1. Impor rute kategori
app.use('/api/projects', projectRoutes);
app.use('/api/categories', categoryRoutes); // <-- 2. Gunakan rute kategori

// Jalankan server
module.exports = app;