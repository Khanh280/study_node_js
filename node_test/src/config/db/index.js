const index = require('mongoose')
function connect() {
    index.connect('mongodb://127.0.0.1:27017/test_mongo')
        .then(() => console.log('Connected!!!!!!'))
        .catch(() => console.log('Fail'));
}

module.exports = {connect}