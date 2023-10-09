module.exports = {
    mutipleMongooseToArray: (mongooseArray) => {
        return mongooseArray.map(mongooseArray => mongooseArray.toObject())
    },
    mongooseToObject: (mongooseObject) => {
        return mongooseObject ? mongooseObject.toObject() : mongooseObject
    }
}