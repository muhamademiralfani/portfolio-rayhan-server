// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

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
const projectRoutes = require('./routes/projects');
app.use('/api/projects', projectRoutes);

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di port: ${port}`);
});