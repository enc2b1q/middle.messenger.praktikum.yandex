const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static("./dist"));

app.get('/', function(req, res) {
    res.sendfile(`${__dirname}/build/index.html`);
  });

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});