module.exports = {
    multipleMongoToObject: (mongooseArray) => {
        return mongooseArray.map(mongooseArray => mongooseArray.toObject())
    }
}