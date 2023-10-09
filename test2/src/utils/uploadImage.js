const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Thư mục đích để lưu trữ tệp hình ảnh
        cb(null, '/node_js/test2/src/public/image');
    },
    filename: function (req, file, cb) {
        console.log(file)
        // Đặt tên tệp hình ảnh theo thời gian đối với mục đích ví dụ
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
module.exports = upload