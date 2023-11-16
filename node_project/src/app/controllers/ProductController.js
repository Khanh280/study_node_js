const Product = require('../models/Product')
const Brand = require('../models/Brand')
const User = require('../models/User')
const Role = require('../models/Role')
const Customer = require('../models/Customer')
const Type = require('../models/Type')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose')
require('dotenv').config();

const secretKey = process.env.SECRETKEY;
const data = process.env.DATA;
const bcrypt = require('bcrypt');
const saltRounds = 10;

//dotenv để đọc và cấu hình các biến môi trường từ một tệp cấu hình.

class ProductController {

    create(req, res, next) {
        Brand.find()
            .then(brand => {
                console.log(brand)
                Type.find()
                    .then(type => {
                        console.log(type)
                        res.render('create', {
                            brand: multipleMongooseToObject(brand),
                            type: multipleMongooseToObject(type)
                        })
                    })
            })
            .catch(next)
    }

    save(req, res, next) {
        req.body.image = req.file ? req.file.filename : ''
        const product = new Product(req.body)
        console.log(product)
        product.save()
            .then(() => {
                req.session.statusSave= true
                res.redirect('/home')
            })
            .catch((error) => {
                if (error) {
                    // Xử lý lỗi validation ở đây, ví dụ in ra thông báo
                    const validationErrors = [];
                    //Duyệt và thêm các lỗi vào mảng
                    for (const field in error.errors) {
                        validationErrors[field] = error.errors[field].message
                    }
                    console.error('Lỗi validation:', validationErrors);
                    Brand.find()
                        .then(brand => {
                            // console.log(brand)
                            Type.find()
                                .then(type => {
                                    // console.log(type)
                                    res.render('create', {
                                        error: validationErrors,
                                        product: {...req.body, image: req.file ? req.file.originalname : ''},
                                        brand: multipleMongooseToObject(brand),
                                        type: multipleMongooseToObject(type)
                                    })
                                })
                        })
                        .catch(next)
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
                Type.find()
                    .then(type => {
                        Product.findById(req.params.id)
                            .populate('brands types')
                            .exec()
                            .then(product => {
                                console.log(product)
                                res.render('update', {
                                    product: mongooseToObject(product),
                                    brand: multipleMongooseToObject(brand),
                                    type: multipleMongooseToObject(type)
                                })
                            })
                            .catch(next)
                    })
            })
            .catch(next)
    }

    update(req, res, next) {
        req.body.image = req.file ? req.file.filename : '';
        Product.updateOne({_id: req.params.id}, req.body)
            .then(() => {
                res.setHeader('statusDelete','true')
                res.redirect('/product')
            })
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
            .then(() => {
                req.session.statusDelete = true
                res.redirect('/home')
            })
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

    // register(req, res, next) {
    //     res.render('register')
    // }
    //
    // registerUse(req, res, next) {
    //     const {name, birthday, phone, address, username, password, confirmPassword} = req.body;
    //     const salt = bcrypt.genSaltSync(saltRounds);
    //     console.log(salt)
    //     if (password !== confirmPassword) {
    //         return res.render('register', {
    //             user: req.body,
    //             confirmPassword: "Password Mismatch",
    //         })
    //     }
    //     Role.findOne({name: "ROLE_CUSTOMER"})
    //         .then(role => {
    //             const hash = bcrypt.hashSync(password, salt);
    //             const user = new User({
    //                 username: username,
    //                 password: hash,
    //                 role: role._id
    //             });
    //             console.log(user)
    //             user.save()
    //                 .then(() => {
    //                     const customer = new Customer({
    //                         name: name,
    //                         birthday: birthday,
    //                         phone: phone,
    //                         address: address,
    //                         user: user._id
    //                     })
    //                     customer.save()
    //                         .then(() => {
    //                             res.redirect('/login')
    //                         })
    //                 })
    //                 .catch((error) => {
    //                     console.log(error)
    //                     if (error) {
    //                         // Xử lý lỗi validation ở đây, ví dụ in ra thông báo
    //                         const validationErrors = [];
    //                         //Duyệt và thêm các lỗi vào mảng
    //                         for (const field in error.errors) {
    //                             validationErrors[field] = error.errors[field].message
    //                         }
    //                         console.error('Lỗi validation:', validationErrors);
    //
    //                         res.render('register', {
    //                             error: validationErrors,
    //                         })
    //                     } else {
    //                         // Xử lý lỗi khác nếu có
    //                         console.error('Lỗi khác:', error);
    //                         // Trả về trang lỗi hoặc xử lý theo yêu cầu của bạn
    //                         res.status(500).send('Đã xảy ra lỗi trong quá trình lưu dữ liệu');
    //                     }
    //                 })
    //         })
    // }
    //
    // login(req, res, next) {
    //     console.log('login page')
    //     res.render('login')
    // }
    //
    // logout(req, res, next) {
    //     res.clearCookie('token')
    //     // localStorage.clear()
    //     res.redirect('/login')
    // }
    //
    // authenticate(req, res, next) {
    //     User.findOne({username: req.body.username})
    //         .populate('role')
    //         .exec()
    //         .then(user => {
    //             if (!user) {
    //                 return res.render('login', {
    //                     errorUsername: "Username không tồn tại.",
    //                     username: req.body.username
    //                 });
    //             }
    //             Customer.findOne({user: user._id})
    //                 .then(customer => {
    //                     let checkPassword = bcrypt.compareSync(req.body.password, user.password);
    //                     if (checkPassword) {
    //                         const payload = {
    //                             username: user.username,
    //                         };
    //                         const option = {expiresIn: '1d'};
    //                         const token = jwt.sign(payload, secretKey, option);
    //                         console.log(token);
    //                         const decoded = jwt.verify(token, secretKey);
    //                         console.log(decoded);
    //                         const nameCookie = 'token';
    //                         const valueCookie = token;
    //                         const timeExpiresIn = 60 * 60 * 1000;
    //                         res.cookie(nameCookie, valueCookie, {maxAge: timeExpiresIn})
    //                         res.redirect('/');
    //                     } else {
    //                         return res.render('login', {
    //                             username: req.body.username,
    //                             errorPassword: "Password không chính xác."
    //                         });
    //                     }
    //                 })
    //         })
    //         .catch(err =>
    //             console.log(err)
    //         )
    //
    // }
}

module.exports = new ProductController()