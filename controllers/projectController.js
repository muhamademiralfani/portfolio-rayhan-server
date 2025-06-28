// server/controllers/projectController.js
const Project = require('../models/Project');

// Mendapatkan semua proyek
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data proyek', error });
    }
};

// Menambahkan proyek baru (untuk admin nanti)
exports.addProject = async (req, res) => {
    const { title, description, imageUrl, techStack, liveUrl, repoUrl } = req.body;
    try {
        const newProject = new Project({
            title,
            description,
            imageUrl,
            techStack,
            liveUrl,
            repoUrl
        });
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: 'Gagal menambahkan proyek', error });
    }
};