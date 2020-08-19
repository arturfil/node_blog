const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const server = express();
require('dotenv').config();

// connect to database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(console.log("Connected to mongodb"));

// implement middlewares
server.use(morgan('dev'));
server.use(bodyParser.json());

// const projectRoutes = require('./routes/project');
const projectRoutes = require('./routes/project');
server.use('/api/v1/projects', projectRoutes);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});