// server/models/Project.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    // Field umum untuk semua jenis proyek
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    imageUrl: { 
        type: String, 
        required: true,
        comment: 'URL untuk thumbnail atau gambar utama proyek.'
    },

    // Field untuk kategori proyek (sudah benar)
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Referensi ke model 'Category'
        required: true
    },

    // Field yang dibuat lebih fleksibel
    toolsUsed: [{ 
        type: String,
        comment: 'Menggantikan techStack. Bisa diisi software (Photoshop, Figma) atau teknologi (React, Node.js).'
    }],

    // URL untuk melihat hasil akhir proyek
    projectUrl: { 
        type: String,
        comment: 'URL untuk melihat hasil live. Bisa link YouTube, Behance, Dribbble, atau website live.'
    },
    
    // URL khusus untuk source code (opsional)
    repoUrl: { 
        type: String,
        comment: 'URL ke repository kode seperti GitHub/GitLab. Hanya diisi jika proyeknya berupa coding.'
    }

}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;