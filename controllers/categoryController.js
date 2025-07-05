// server/controllers/categoryController.js
const Category = require('../models/Category');

// GET all categories (tidak perlu diubah, sudah mengambil semua field)
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ name: 1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data kategori", error: error.message });
    }
};

// POST a new category (DIPERBARUI)
exports.addCategory = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Gambar thumbnail kategori wajib diunggah.' });
        }

        // 1. Ambil 'description' dari body request
        const { name, description } = req.body;
        if (!name || !description) { // 2. Tambahkan validasi untuk description
            return res.status(400).json({ message: 'Nama dan deskripsi kategori wajib diisi.' });
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(409).json({ message: 'Kategori dengan nama ini sudah ada.' });
        }

        const newCategory = new Category({
            name,
            description, // 3. Simpan deskripsi ke database
            imageUrl: req.file.path
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);

    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan di server saat menambahkan kategori.', error: error.message });
    }
};

// DELETE a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        // 1. Ambil ID dari parameter URL
        const { id } = req.params;

        // 2. Cari dan hapus kategori berdasarkan ID
        const deletedCategory = await Category.findByIdAndDelete(id);

        // 3. Jika tidak ada kategori dengan ID tersebut, kirim respons 404
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Kategori tidak ditemukan.' });
        }

        // 4. Kirim respons sukses jika berhasil
        res.status(200).json({ message: 'Kategori berhasil dihapus.' });

    } catch (error) {
        // 5. Tangani kesalahan server
        res.status(500).json({ message: 'Gagal menghapus kategori.', error: error.message });
    }
};