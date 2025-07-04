// server/models/Category.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Nama setiap kategori harus unik
        trim: true
    },
    description: {
        type: String,
        required: false // Deskripsi bersifat opsional
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;