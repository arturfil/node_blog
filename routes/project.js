const express = require('express');
const router = express.Router();
const { getProjects, createProject, getProjectById, deleteProject, udpateProject } = require('../controllers/projectController');

const { checkJwt } = require('../controllers/authController');

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', checkJwt, createProject);
// create middleware to check for admin rights
router.patch('/:id', checkJwt, udpateProject)
router.delete('/:id', deleteProject);

module.exports = router;