const mongoose = require('mongoose')
const mysql = require('mysql2');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Khanh@28082001',
    database: 'k_guard_shop'
});

function connect() {
    mongoose.connect('mongodb://127.0.0.1:27017/test_mongo')
        .then(() => console.log('Connected!!!!!!')).catch(() => console.log('Fail'));

    mysqlConnection.connect(function (err) {
        if (err) {
            console.error('Lỗi kết nối đến cơ sở dữ liệu:', err.message);
        } else {
            console.log('Đã kết nối đến cơ sở dữ liệu MySQL');

            // Thực hiện các truy vấn SQL hoặc thao tác với cơ sở dữ liệu ở đây
            // mysqlConnection.query(
            //     'SELECT * FROM `brand`',
            //     function (err, results, fields) {
            //         console.log(results); // results contains rows returned by server
            //         console.log(fields); // fields contains extra meta data about results, if available
            //     }
            // );
            // Sau khi hoàn thành công việc, đừng quên đóng kết nối
            // mysqlConnection.end(function (err) {
            //     if (err) {
            //         console.error('Lỗi khi đóng kết nối:', err.message);
            //     } else {
            //         console.log('Kết nối đã đóng');
            //     }
            // });
        }
    });
}

module.exports = {connect, mysqlConnection}
