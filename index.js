const express = require('express');
const server = express();

require('dotenv').config();

server.get('/api/test', (req, res) => {
  res.json({message: "Api is working"})
})

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});