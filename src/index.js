//require() cu phap de tai thu vien
const path = require('path');
const express = require('express');
var cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const route = require('./resources/routes/index.js');
const app = express();
const port = 3000;
const db = require('./config/db');

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));
//Sử dụng middlewware. Cái này là body-parse
//Middleware khi sử dụng js gửi
app.use(express.json());
//Cho phép ta ghi đè thêm các phương thức PUT, DELETE
const methodOverride = require('method-override');
app.use(methodOverride('_method'));




//Kết nối với server
db.connect();

app.use('/public',express.static(path.join(__dirname, './public')));
//path.join(__dirname, './public'))



//HTTP logger
app.use(morgan('combined'));

route(app);

//Template engine Handlebar giúp ta dễ dàng để rend data ra HTML
app.engine('handlebars', handlebars({
    helpers: {
        sum: (a,b) => a+b,
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources\\views'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
