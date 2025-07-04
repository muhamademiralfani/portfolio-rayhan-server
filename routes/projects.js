// server/routes/projects.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const projectController = require('../controllers/projectController.js');

// Konfigurasi Cloudinary menggunakan variabel dari .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Konfigurasi storage engine untuk Multer menggunakan Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio_projects', // Nama folder di Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Format yang diizinkan
        transformation: [{ width: 800, height: 600, crop: 'limit' }] // Contoh transformasi gambar
    }
});

// Inisialisasi Multer dengan storage engine Cloudinary
const upload = multer({ storage: storage });

// Rute API

// Rute API
router.get('/', projectController.getProjects); // Mengambil SEMUA proyek
router.post('/', upload.single('projectImage'), projectController.addProject); // Menambah proyek
router.get('/:id', projectController.getProjectById); // Mengambil detail satu proyek
router.get('/category/:categoryName', projectController.getProjectsByCategory); // Rute baru untuk mengambil proyek berdasarkan nama kategori


// Rute POST sekarang akan mengunggah file langsung ke Cloudinary
router.post('/', upload.single('projectImage'), projectController.addProject);

module.exports = router;