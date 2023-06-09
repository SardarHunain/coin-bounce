const express = require('express');
const dbConnect = require('./database/index');
const router = require('./routes/index');
const errorhandler = require('./middlewares/errorhandler');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const PORT = 3000;

app.use(express.json());//always use this middleware abobe app.use(router). It shows we can send and accept data in json format.
app.use(router);
dbConnect();

app.use('storage',express.static('storage'));



app.use(errorhandler);
app.listen(PORT,console.log(`backend is running on port  ${PORT}`));
