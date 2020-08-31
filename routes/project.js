const express = require('express');
const router = express.Router();
const { getProjects, createProject, getProjectById, deleteProject } = require('../controllers/projectController');

const { checkJwt } = require('../controllers/authController');

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.delete('/:id', deleteProject);

module.exports = router;