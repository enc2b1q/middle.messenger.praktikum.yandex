const express = require('express');
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html" )) // NO;TE: path ставить запрещено
})

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
})
