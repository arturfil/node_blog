const Project = require('../models/Project');

exports.getProjects = (req, res) => {
  Project.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Coudn't find any project, please try again"
      })
    }
    res.json(data);
  })
}

exports.createProject = (req, res) => {
  const project = new Project(req.body)
  project.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Couldn't save project, please try again"
      })
    }
    res.json({data});
  })
}

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    return res.json(project);
  } catch (error) {
    return res.status(422).send(error.message);
  }
}