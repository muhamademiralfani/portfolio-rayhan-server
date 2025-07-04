// server/controllers/categoryController.js
const Category = require('../models/Category');

// Mengambil semua kategori
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data kategori", error: error.message });
    }
};

// Menambah kategori baru (berguna untuk admin)
exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newCategory = new Category({ name, description });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: "Gagal membuat kategori", error: error.message });
    }
};