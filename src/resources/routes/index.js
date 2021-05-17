const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
     
}

module.exports = route;

//Luong di: o file index.js goc di tu route(app) -> index.js
//cua folder route -> co function handle(doc theo document)