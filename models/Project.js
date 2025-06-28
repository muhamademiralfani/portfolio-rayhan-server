// server/models/Project.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    techStack: [{ type: String }],
    liveUrl: { type: String },
    repoUrl: { type: String }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;