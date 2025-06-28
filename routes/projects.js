// server/routes/projects.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// GET /api/projects - Mendapatkan semua proyek
router.get('/', projectController.getProjects);

// POST /api/projects - Menambahkan proyek baru
router.post('/', projectController.addProject);

module.exports = router;