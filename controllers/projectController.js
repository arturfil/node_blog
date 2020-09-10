const Project = require('../models/Project');
const { update } = require('../models/Project');

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
  const project = new Project(req.body);
  const userId = req.user.sub;
  project.userId = userId; // this will be later req.params.id
  
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

exports.udpateProject = async (req, res) => {
  const {body, params: {id}} = req;

  try {
    const udpatedProject = await Project.findOneAndUpdate({_id: id}, body, {new: true, runValidators: true});
    return res.json(udpatedProject);
  } catch (error) {
    return res.status(422).send(error.message);
  }
}

exports.deleteProject = async (req, res) => {
  const project = await Project.findOneAndRemove({_id: req.params.id})
  return res.json({_id: project.id})
}