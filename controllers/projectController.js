// server/controllers/projectController.js

const mongoose = require('mongoose');
const Project = require('../models/Project');
const Category = require('../models/Category');

// GET all projects (Sudah Baik)
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).populate('category', 'name').sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Gagal mengambil data proyek", error: error.message });
    }
};

// GET projects by category (Sudah Baik)
exports.getProjectsByCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const category = await Category.findOne({ name: { $regex: new RegExp(`^${categoryName}$`, 'i') } });

        if (!category) {
            return res.status(404).json({ message: "Kategori tidak ditemukan" });
        }
        
        const projects = await Project.find({ category: category._id }).populate('category', 'name').sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects by category:", error);
        res.status(500).json({ message: "Gagal mengambil data proyek berdasarkan kategori", error: error.message });
    }
};

// GET a single project by ID (Sudah Baik)
exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Format ID Proyek tidak valid" });
        }
        const project = await Project.findById(id).populate('category', 'name');
        if (!project) {
            return res.status(404).json({ message: "Proyek tidak ditemukan" });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error("Error fetching project by ID:", error);
        res.status(500).json({ message: "Gagal mengambil detail proyek", error: error.message });
    }
};

// POST a new project (Disesuaikan dengan model baru)
exports.addProject = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Gambar proyek wajib diunggah.' });
        }
        
        // DISESUAIKAN: Menggunakan nama field baru 'toolsUsed' dan 'projectUrl'
        const { title, description, toolsUsed, projectUrl, repoUrl, category } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({ message: 'Judul, deskripsi, dan kategori wajib diisi.' });
        }
        
        const imageUrl = req.file.path;

        // DISESUAIKAN: Mengolah 'toolsUsed' menjadi array
        const toolsUsedArray = toolsUsed ? toolsUsed.split(',').map(item => item.trim()) : [];

        const newProject = new Project({
            title,
            description,
            imageUrl,
            toolsUsed: toolsUsedArray, // DISESUAIKAN: Menyimpan ke field 'toolsUsed'
            projectUrl,                // DISESUAIKAN: Menyimpan ke field 'projectUrl'
            repoUrl,
            category
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);

    } catch (error) {
        console.error("ERROR SAAT MENAMBAH PROYEK:", error);
        res.status(500).json({ message: 'Terjadi kesalahan di server saat menambahkan proyek.', error: error.message });
    }
};

// PUT / Update a project (TAMBAHAN PENTING)
exports.updateProject = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Format ID Proyek tidak valid" });
    }

    try {
        const updateData = { ...req.body };

        // Jika ada file gambar baru yang di-upload, perbarui path gambarnya
        if (req.file) {
            updateData.imageUrl = req.file.path;
        }

        // Jika ada 'toolsUsed' yang dikirim, ubah menjadi array
        if (updateData.toolsUsed && typeof updateData.toolsUsed === 'string') {
            updateData.toolsUsed = updateData.toolsUsed.split(',').map(item => item.trim());
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { $set: updateData }, // Gunakan $set untuk update yang aman
            { new: true, runValidators: true } // Opsi untuk mengembalikan dokumen baru & menjalankan validasi model
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Proyek tidak ditemukan" });
        }

        res.status(200).json(updatedProject);

    } catch (error) {
        console.error("ERROR SAAT MEMPERBARUI PROYEK:", error);
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui proyek.', error: error.message });
    }
};

// DELETE a project (TAMBAHAN PENTING)
exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Format ID Proyek tidak valid" });
    }

    try {
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ message: "Proyek tidak ditemukan" });
        }
        
        // Di sini Anda mungkin ingin menambahkan logika untuk menghapus file gambar dari server
        // const fs = require('fs');
        // fs.unlinkSync(deletedProject.imageUrl);

        res.status(200).json({ message: "Proyek berhasil dihapus.", project: deletedProject });

    } catch (error) {
        console.error("ERROR SAAT MENGHAPUS PROYEK:", error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menghapus proyek.', error: error.message });
    }
};