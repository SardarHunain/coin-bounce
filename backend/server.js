const express = require('express');
const dbConnect = require('./database/index');
const router = require('./routes/index');

const app = express();

const PORT = 3000;

app.use(router);
dbConnect();





app.listen(PORT,console.log(`backend is running on port  ${PORT}`));
