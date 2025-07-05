// server/models/Category.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    // TAMBAHAN BARU: Field untuk deskripsi kategori
    description: {
        type: String,
        required: true // Deskripsi juga kita buat wajib
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;