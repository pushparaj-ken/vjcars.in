const mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '68.178.153.196',
    user: 'vjcars',
    password: '=l].7!nb3GZ9',
    database: 'vjcars'
});
const singleRowInsert = (tablename, info) => {
    return new Promise((resolve, reject) => {
        // let data1 = []

        // let keys = Object.keys(info)
        // let values = Object.values(info)
        // for (each in keys) {
        //     let data = {}
        //     data[keys[each]] = values[each];
        //     data1.push(data)
        // }
        // console.log(data1);
        var query = 'INSERT INTO ' + tablename + ' SET ?';
		 delete info.tablename;
		 delete info.url; 
        console.log(info); 

        // Creating queries
        pool.query(query, info, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

const singleRowUpdate = (tablename, info) => {
    return new Promise((resolve, reject) => {

        var query = 'UPDATE ' + tablename + ' SET ? where id = ?';

        delete info.tablename;
        delete info.row_id;
		delete info.url;  
        console.log("info-->", info);
        const params = [info, info.id];
        // Creating queries
        pool.query(query, params, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

module.exports = {
    singleRowInsert,
	singleRowUpdate
}