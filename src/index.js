//require() cu phap de tai thu vien
const path = require('path');
const express = require('express');

const morgan = require('morgan');
const handlebars  = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./resources/routes/index.js');

app.use(express.static(path.join(__dirname, 'public')));
//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views',path.join(__dirname,'resources\\views'));
console.log('haha');

//Routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
