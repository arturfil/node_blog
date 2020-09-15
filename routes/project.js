const express = require('express');
const router = express.Router();
const { getProjects, createProject, getProjectById, deleteProject, udpateProject } = require('../controllers/projectController');

const { checkJwt, checkRole } = require('../controllers/authController');

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', checkJwt, checkRole('admin'), createProject);

router.patch('/:id', checkJwt, checkRole('admin'), udpateProject)
router.delete('/:id', checkJwt, checkRole('admin'), deleteProject);

module.exports = router;