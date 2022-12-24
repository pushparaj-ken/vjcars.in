const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");

dotenv.config();
//dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;


const app = express();

app.use(morgan('tiny'));
app.use(bodyparser.urlencoded({ extended: true }));



var indexRouter = require('./server/routes/index');
var imageRouter = require('./server/routes/image');


app.use('/api', indexRouter);
app.use('/api/image', imageRouter);




// const connectDB = require('./server/database/connection');
// connectDB();

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });