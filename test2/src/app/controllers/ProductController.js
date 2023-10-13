const Product = require('../models/Product')
const Brand = require('../models/Brand')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose')

const secretKey = 'tek4vn';


class ProductController {
    index(req, res, next) {
        Product.find()
            .populate('brands')
            .exec()
            .then((product) => {
                console.log(product)
                res.render('home', {
                    product: multipleMongooseToObject(product)
                })
                const token = req.cookies.token
                console.log(token)
                const generateToken = jwt.decode(token, secretKey)
                User.findOne({username: generateToken.username})
                    .then(user => {
                        if(generateToken.username === user.username && generateToken.id === user.id){
                            console.log("Authenticate Success")
                        }else {
                            console.log("Authenticate Fail")
                        }
                    })
            })
            .catch((err) =>
                console.log('JOIN  FAIL ' + err)
            )
    }

    create(req, res, next) {
        Brand.find()
            .then(brand => {
                console.log(brand)
                res.render('create', {brand: multipleMongooseToObject(brand)})
            })
            .catch(next)
    }

    save(req, res, next) {
        req.body.image = req.file ? req.file.filename : ''
        const product = new Product(req.body)
        product.save()
            .then(() => res.redirect('/product'))
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
        Brand.find()
            .then(brand => {
                Product.findById(req.params.id)
                    .populate('brands')
                    .exec()
                    .then(product => {
                        console.log(product)
                        res.render('update', {
                            product: mongooseToObject(product),
                            brand: multipleMongooseToObject(brand)
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }

    update(req, res, next) {
        req.body.image = req.file ? req.file.filename : '';
        // Product.findById({_id: req.params.id})
        //     .then(product => {
        //         product = new Product(req.body)
        //         product._id = req.params.id
        //         product.save()
        //             .then(() => res.redirect('/'))
        //             .catch((error) => {
        //                 console.log(req.params.id)
        //                 console.log(req.body)
        //                 if (error) {
        //                     const validationErrors = [];
        //                     for (const field in error.errors) {
        //                         validationErrors[field] = error.errors[field].message;
        //                     }
        //                     console.error('Lỗi validation:', validationErrors);
        //                     // Brand.find()
        //                     //     .then(brand =>
        //                     //         res.render('update', {
        //                     //             error: validationErrors,
        //                     //             product: {
        //                     //                 ...req.body,
        //                     //                 _id: req.params.id,
        //                     //                 image: req.file ? req.file.originalname : '',
        //                     //             },
        //                     //             brand: multipleMongooseToObject(brand)
        //                     //         })
        //                     //     )
        //                 } else {
        //                     console.error('Lỗi khác:', error);
        //                     res.status(500).send('Đã xảy ra lỗi trong quá trình lưu dữ liệu');
        //                 }
        //             });
        //     })
        //     .catch(next)

        Product.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/product'))
            .catch((error) => {
                if (error.name === 'ValidationError') {
                    // Xử lý lỗi validation ở đây, ví dụ in ra thông báo lỗi
                    const validationErrors = [];
                    for (const field in error.errors) {
                        validationErrors[field] = error.errors[field].message;
                    }
                    console.error('Lỗi validation:', validationErrors);
                    // Trả về trang có thông báo lỗi cho người dùng hoặc xử lý theo yêu cầu của bạn
                    res.render('update', {error: validationErrors});
                } else {
                    // Xử lý lỗi khác nếu có
                    console.error('Lỗi khác:', error);
                    // Trả về trang lỗi hoặc xử lý theo yêu cầu của bạn
                    res.status(500).send('Đã xảy ra lỗi trong quá trình lưu dữ liệu');
                }
            });
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

    login(req, res, next) {
        res.render('login')
    }

    authenticate(req, res, next) {
        User.findOne({username: req.body.username, password: req.body.password})
            .then(user => {
                console.log(user)
                const payload = {
                    id: user._id,
                    username: user.username
                };
                const option = {expiresIn: '1d'};
                const token = jwt.sign(payload, secretKey, option);
                console.log(token);
                const decoded = jwt.verify(token, secretKey);
                console.log(decoded);

                const nameCookie = 'token';
                //valueCookie: giá trị sẽ lưu vào name cookie, ở đây chúng ta sẽ sẽ lưu giá trị token được tạo bởi jwt
                const valueCookie = token;
                //timeExpiresIn: thời gian sống của cookie, chúng ta sẽ lưu thời gian của cookie bằng với thời gian của mã token được tạo bởi jwt nhé
                // vì thời gian của cookie tính bằng ms nên chúng ta phải quy đổi lại nhé (60 * 60 * 1000 * 24) cú pháp đổi ms -> 1 ngày
                // ở đây chúng ta tạo token là 3650 ngày nên cần nhân thêm 3650
                const timeExpiresIn = 60 * 60 * 1000;
                res.cookie(nameCookie, valueCookie, {maxAge: timeExpiresIn})
                const cookie = req.cookies.token
                console.log(cookie)
                res.send("Token: " + token)
            })
            .catch(err =>
                console.log(err)
            )

    }
}

module.exports = new ProductController()