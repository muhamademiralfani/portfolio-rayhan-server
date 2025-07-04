// server/routes/categories.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET /api/categories -> Mengambil semua kategori
router.get('/', categoryController.getAllCategories);

// POST /api/categories -> Membuat kategori baru
router.post('/', categoryController.createCategory);

module.exports = router;