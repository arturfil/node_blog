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

exports.createProject = async (req, res) => {
  console.log("req.body -> ", req.body);
  const project = new Project(req.body)
  project.userId = 'jsaadfjklasdfljjlaskdjfalskdfjasdf'; // this will be later req.params.id
  
  try {
    const newProject = await project.save();
    return res.json(newProject);
  } catch (error) {
    res.status(422).send(error.message);
  }
}

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    return res.json(project);
  } catch (error) {
    return res.status(422).send(error.message);
  }
}

exports.deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  try {
    project.remove((err, deleted) => {
      if (err) return res.json({error: "project was NOT deleted"});
      else
        return res.json({message: "Project was successfully deleted!"})
    })
  } catch (error) {
    res.status(422).send(error.message)
  }
}