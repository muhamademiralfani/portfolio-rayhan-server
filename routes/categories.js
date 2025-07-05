// server/routes/categories.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const categoryController = require('../controllers/categoryController');

// --- Cloudinary and Multer Configuration ---
// This block should be similar to your projects.js routes
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio_categories', // A separate folder for category images
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 400, crop: 'fill' }]
    }
});

const upload = multer({ storage: storage });
// --- End of Configuration ---


// === CORRECTED ROUTES ===

// GET /api/categories -> Fetches all categories
// Using the correct function name: 'getCategories'
router.get('/', categoryController.getCategories);

// POST /api/categories -> Creates a new category with an image upload
// Using the correct function name 'addCategory' and adding the upload middleware
router.post('/', upload.single('categoryImage'), categoryController.addCategory);


module.exports = router;