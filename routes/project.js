const express = require('express');
const router = express.Router();
const { getProjects, createProject, getProjectById } = require('../controllers/projectController');

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/create', createProject);

module.exports = router;