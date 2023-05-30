const express = require('express');
const dbConnect = require('./database/index');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorhandler');

const app = express();

const PORT = 3000;

app.use(express.json());//always use this middleware abobe app.use(router). It shows we can send and accept data in json format.
app.use(router);
dbConnect();




app.use(errorHandler);
app.listen(PORT,console.log(`backend is running on port  ${PORT}`));
