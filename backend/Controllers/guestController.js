const Admin = require('../Models/adminModel');
const corpTrainee = require('../Models/corpTraineeModel');
const Instructor = require('../Models/instructorModel');
const Trainee = require('../Models/traineeModel');
const ValidateSignUp = require("../Validation/SignUp");
const ValidateLogin = require("../Validation/Login");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const SignUp = async (req, res) => {
    const { errors, isValid } = ValidateSignUp(req.body);
    try {
        if (!isValid) {
            res.status(404).json(errors);
        } else {
            Instructor.findOne({ userName: req.body.userName }).then(async (exist) => {
                if (exist) {
                    errors.userName = "This username already exists";
                    res.status(404).json(errors);
                } else {
                    Trainee.findOne({ userName: req.body.userName }).then(async (exist) => {
                        if (exist) {
                            errors.userName = "This username already exists";
                            res.status(404).json(errors);
                        } else {
                            corpTrainee.findOne({ userName: req.body.userName }).then(async (exist) => {
                                if (exist) {
                                    errors.userName = "This username already exists";
                                    res.status(404).json(errors);
                                } else {
                                    Admin.findOne({ userName: req.body.userName }).then(async (exist) => {
                                        if (exist) {
                                            errors.userName = "This username already exists";
                                            res.status(404).json(errors);
                                        } else {
                                            Trainee.findOne({ email: req.body.email }).then(async (exist) => {
                                                if (exist) {
                                                    errors.email = "This email already exists";
                                                    res.status(404).json(errors);
                                                } else {
                                                    const hash = bcrypt.hashSync(req.body.password, 10);
                                                    req.body.password = hash;
                                                    await Trainee.create(req.body);
                                                    res.status(200).json({ message: "success" });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const Login = async (req, res) => {
    const { errors, isValid } = ValidateLogin(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        } else {
            Instructor.findOne({ userName: req.body.userName })
                .then(user => {
                    if (!user) {
                        Trainee.findOne({ userName: req.body.userName })
                            .then(user => {
                                if (!user) {
                                    corpTrainee.findOne({ userName: req.body.userName })
                                        .then(user => {
                                            if (!user) {
                                                Admin.findOne({ userName: req.body.userName })
                                                    .then(user => {
                                                        if (!user) {
                                                            errors.userName = "Incorrect username"
                                                            res.status(404).json(errors)
                                                        } else {
                                                            bcrypt.compare(req.body.password, user.password)
                                                                .then(isMatch => {
                                                                    if (!isMatch) {
                                                                        errors.password = "Incorrect password"
                                                                        res.status(404).json(errors)
                                                                    } else {
                                                                        const token = jwt.sign({
                                                                            id: user._id,
                                                                            firstName: user.firstName,
                                                                            lastName: user.lastName,
                                                                            userName: user.userName,
                                                                            email: user.email,
                                                                            gender: user.gender,
                                                                            role: user.role
                                                                        }, process.env.PRIVATE_KEY, { expiresIn: '10h' });
                                                                        res.status(200).json({
                                                                            message: "success",
                                                                            token: "Bearer " + token,
                                                                        })
                                                                    }
                                                                })
                                                        }
                                                    })
                                            } else {
                                                bcrypt.compare(req.body.password, user.password)
                                                    .then(isMatch => {
                                                        if (!isMatch) {
                                                            errors.password = "Incorrect password"
                                                            res.status(404).json(errors)
                                                        } else {
                                                            const token = jwt.sign({
                                                                id: user._id,
                                                                firstName: user.firstName,
                                                                lastName: user.lastName,
                                                                userName: user.userName,
                                                                email: user.email,
                                                                gender: user.gender,
                                                                role: user.role
                                                            }, process.env.PRIVATE_KEY, { expiresIn: '10h' });
                                                            res.status(200).json({
                                                                message: "success",
                                                                token: "Bearer " + token
                                                            })
                                                        }
                                                    })
                                            }
                                        })
                                } else {
                                    bcrypt.compare(req.body.password, user.password)
                                        .then(isMatch => {
                                            if (!isMatch) {
                                                errors.password = "Incorrect password"
                                                res.status(404).json(errors)
                                            } else {
                                                const token = jwt.sign({
                                                    id: user._id,
                                                    firstName: user.firstName,
                                                    lastName: user.lastName,
                                                    userName: user.userName,
                                                    email: user.email,
                                                    gender: user.gender,
                                                    role: user.role
                                                }, process.env.PRIVATE_KEY, { expiresIn: '10h' });
                                                res.status(200).json({
                                                    message: "success",
                                                    token: "Bearer " + token
                                                })
                                            }
                                        })
                                }
                            })
                    } else {
                        bcrypt.compare(req.body.password, user.password)
                            .then(isMatch => {
                                if (!isMatch) {
                                    errors.password = "Incorrect password"
                                    res.status(404).json(errors)
                                } else {
                                    const token = jwt.sign({
                                        id: user._id,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        userName: user.userName,
                                        email: user.email,
                                        gender: user.gender,
                                        role: user.role,
                                        verified: user.verified
                                    }, process.env.PRIVATE_KEY, { expiresIn: '10h' });
                                    res.status(200).json({
                                        message: "success",
                                        token: "Bearer " + token
                                    })
                                }
                            })
                    }
                })
        }
    } catch (error) {
        res.status(404).json(error.message);
    }
}

module.exports = {
    SignUp,
    Login
};