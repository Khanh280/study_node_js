module.exports = {
    multipleMongooseToObject: (mongooseArray) => {
        return mongooseArray.map(mongooseArray => mongooseArray.toObject())
    },
    mongooseToObject: (mongooseObject) => {
        return mongooseObject ? mongooseObject.toObject() : mongooseObject
    },
    multipleSqlToObject: (sqlArray) => {
        return sqlArray.map(sqlArray => sqlArray.toObject)
    },
    sqlToObject: (sqlObject) => {
        return sqlObject ? sqlObject.toObject : sqlObject
    }
}