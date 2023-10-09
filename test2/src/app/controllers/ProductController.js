const Product = require('../models/Product')
const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose')

class ProductController {
    index(req, res, next) {
        Product.find()
            .then((product) => {
                res.render('home', {
                    product: multipleMongooseToObject(product)
                })
            })
            .catch(next)
    }

    create(req, res, next) {
        Product.findOne({id: req.params.id})
            .then(product => {
                res.render('create')
            })
            .catch(next)
    }

    save(req, res, next) {
        req.body.image = req.file ? req.file.filename : ''
        const product = new Product(req.body)
        product.save()
            .then(() => res.redirect('/'))
            .catch((error) => {
                if (error) {
                    // Xử lý lỗi validation ở đây, ví dụ in ra thông báo
                    const validationErrors = [];
                    //Duyệt và thêm các lỗi vào mảng
                    for (const field in error.errors) {
                        validationErrors[field] = error.errors[field].message
                    }
                    console.error('Lỗi validation:', validationErrors);

                    res.render('create', {
                        error: validationErrors,
                        product: {...req.body, image: req.file ? req.file.originalname : ''}
                    })
                } else {
                    // Xử lý lỗi khác nếu có
                    console.error('Lỗi khác:', error);
                    // Trả về trang lỗi hoặc xử lý theo yêu cầu của bạn
                    res.status(500).send('Đã xảy ra lỗi trong quá trình lưu dữ liệu');
                }
            });
    }

    edit(req, res, next) {
        Product.findById(req.params.id)
            .then(product => {
                res.render('update', {
                    product: mongooseToObject(product)
                })
            })
            .catch(next)
    }

    update(req, res, next) {
        req.body.image = req.file ? req.file.filename : '';
        Product.findById({_id: req.params.id})
            .then(product => {
                product = new Product(req.body)
                product._id = req.params.id
                product.save()
                    .then(() => res.redirect('/'))
                    .catch((error) => {
                        console.log(req.params.id)
                        console.log(product)
                        if (error) {
                            const validationErrors = [];
                            for (const field in error.errors) {
                                validationErrors[field] = error.errors[field].message;
                            }
                            console.error('Lỗi validation:', validationErrors);
                            res.render('update', {
                                error: validationErrors,
                                product: {...req.body,_id: req.params.id, image: req.file ? req.file.originalname : ''}
                            })
                        } else {
                            console.error('Lỗi khác:', error);
                            res.status(500).send('Đã xảy ra lỗi trong quá trình lưu dữ liệu');
                        }
                    });
            })
            .catch(next)

        // Product.updateOne({_id: req.params.id}, req.body)
        //     .then(() => res.redirect('/'))
        //     .catch((error) => {
        //         if (error.name === 'ValidationError') {
        //             // Xử lý lỗi validation ở đây, ví dụ in ra thông báo lỗi
        //             const validationErrors = [];
        //             for (const field in error.errors) {
        //                 validationErrors[field] = error.errors[field].message;
        //             }
        //             console.error('Lỗi validation:', validationErrors);
        //             // Trả về trang có thông báo lỗi cho người dùng hoặc xử lý theo yêu cầu của bạn
        //             res.render('update', {error: validationErrors});
        //         } else {
        //             // Xử lý lỗi khác nếu có
        //             console.error('Lỗi khác:', error);
        //             // Trả về trang lỗi hoặc xử lý theo yêu cầu của bạn
        //             res.status(500).send('Đã xảy ra lỗi trong quá trình lưu dữ liệu');
        //         }
        //     });
    }


    delete(req, res, next) {
        Product.deleteOne({_id: req.params.id})
            .then(() => res.redirect('/'))
            .catch(next)
    }

    detail(req, res, next) {
        Product.findOne({id: req.params.id})
            .then(product => {
                res.render('detail', {product: mongooseToObject(product)})
            })
            .catch(next)
    }

    search(req, res, next) {
        Product.find({name: req.params.name})
            .then(product => {
                console.log(product)
                console.log('SEARCH')
                // res.render('detail', {product: mongooseToObject(product)})
            })
            .catch(next)
    }
}

module.exports = new ProductController()