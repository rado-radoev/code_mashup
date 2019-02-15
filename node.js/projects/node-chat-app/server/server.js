const path = require('path');
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '/../public');

var app = express();
hbs.registerPartials(path.join(__dirname, './../views/partials'));
app.set('view engine', 'hbs');

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
