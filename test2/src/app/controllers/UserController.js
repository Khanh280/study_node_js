const Role = require('../models/Role')
const Customer = require('../models/Customer')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const  secretKey = process.env.SECRETKEY
const saltRounds = 10
class UserController {
    register(req, res, next) {
        res.render('register')
    }

    registerUse(req, res, next) {
        const {name, birthday, phone, address, username, password, confirmPassword} = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        console.log(salt)
        if (password !== confirmPassword) {
            return res.render('register', {
                user: req.body,
                confirmPassword: "Password Mismatch",
            })
        }
        Role.findOne({name: "ROLE_CUSTOMER"})
            .then(role => {
                const hash = bcrypt.hashSync(password, salt);
                const user = new User({
                    username: username,
                    password: hash,
                    role: role._id
                });
                console.log(user)
                user.save()
                    .then(() => {
                        const customer = new Customer({
                            name: name,
                            birthday: birthday,
                            phone: phone,
                            address: address,
                            user: user._id
                        })
                        customer.save()
                            .then(() => {
                                res.redirect('/login')
                            })
                    })
                    .catch((error) => {
                        console.log(error)
                        if (error) {
                            // Xử lý lỗi validation ở đây, ví dụ in ra thông báo
                            const validationErrors = [];
                            //Duyệt và thêm các lỗi vào mảng
                            for (const field in error.errors) {
                                validationErrors[field] = error.errors[field].message
                            }
                            console.error('Lỗi validation:', validationErrors);

                            res.render('register', {
                                error: validationErrors,
                            })
                        } else {
                            // Xử lý lỗi khác nếu có
                            console.error('Lỗi khác:', error);
                            // Trả về trang lỗi hoặc xử lý theo yêu cầu của bạn
                            res.status(500).send('Đã xảy ra lỗi trong quá trình lưu dữ liệu');
                        }
                    })
            })
    }

    login(req, res, next) {
        console.log('login page')
        res.render('login')
    }

    logout(req, res, next) {
        res.clearCookie('token')
        // localStorage.clear()
        res.redirect('/login')
    }

    authenticate(req, res, next) {
        User.findOne({username: req.body.username})
            .populate('role')
            .exec()
            .then(user => {
                if (!user) {
                    return res.render('login', {
                        errorUsername: "Username không tồn tại.",
                        username: req.body.username
                    });
                }
                Customer.findOne({user: user._id})
                    .then(customer => {
                        let checkPassword = bcrypt.compareSync(req.body.password, user.password);
                        if (checkPassword) {
                            const payload = {
                                username: user.username,
                            };
                            const option = {expiresIn: '1d'};
                            const token = jwt.sign(payload, secretKey, option);
                            console.log(token);
                            const decoded = jwt.verify(token, secretKey);
                            console.log(decoded);
                            const nameCookie = 'token';
                            const valueCookie = token;
                            const timeExpiresIn = 60 * 60 * 1000;
                            res.cookie(nameCookie, valueCookie, {maxAge: timeExpiresIn})
                            req.session.statusLogin=true
                            res.redirect('/home');
                        } else {
                            return res.render('login', {
                                username: req.body.username,
                                errorPassword: "Password không chính xác."
                            });
                        }
                    })
            })
            .catch(err =>
                console.log(err)
            )

    }
}
module.exports = new UserController()