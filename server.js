const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mysql = require('mysql');
const bodyparser = require("body-parser");

dotenv.config();
//dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;


const app = express();
const connection = mysql.createConnection({
    host: '68.178.153.196',
    user: 'vjcars',
    password: '=l].7!nb3GZ9',
    database: 'vjcars'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});

// const query = 'SELECT * FROM tbl_car Where status =0';
// connection.query(query, (err, rows) => {
//     if (err) {
//         console.error('Error executing query:', err);
//         return;
//     }
//     console.log('Fetched data:', rows);
// });
app.use(morgan('tiny'));
app.use(bodyparser.urlencoded({ extended: true }));



var indexRouter = require('./server/routes/index');
var imageRouter = require('./server/routes/image');


app.use('/api', indexRouter);
app.use('/api/image', imageRouter);




// const connectDB = require('./server/database/connection');
// connectDB();

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });