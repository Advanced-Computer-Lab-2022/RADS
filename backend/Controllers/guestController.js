const Admin = require('../Models/adminModel');
const corpTrainee = require('../Models/corpTraineeModel');
const Instructor = require('../Models/instructorModel');
const Trainee = require('../Models/traineeModel');
const ValidateSignUp = require("../Validation/SignUp");
const ValidateLogin = require("../Validation/Login");
const ValidateCreateInstructor = require("../Validation/CreateInstructor");
const ValidateCreateCorpTrainee = require("../Validation/CreateCorpTrainee");
const ValidateEmail = require("../Validation/ForgotPassword");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { sendMail } = require('../Utilities/sendEmail');

const SignUp = async(req, res) => {
    const { errors, isValid } = ValidateSignUp(req.body);
    try {
        if (!isValid) {
            res.status(404).json(errors);
        } else {
            Instructor.findOne({ userName: req.body.userName }).then(async(exist) => {
                if (exist) {
                    errors.userName = "This username already exists";
                    res.status(404).json(errors);
                } else {
                    Trainee.findOne({ userName: req.body.userName }).then(async(exist) => {
                        if (exist) {
                            errors.userName = "This username already exists";
                            res.status(404).json(errors);
                        } else {
                            corpTrainee.findOne({ userName: req.body.userName }).then(async(exist) => {
                                if (exist) {
                                    errors.userName = "This username already exists";
                                    res.status(404).json(errors);
                                } else {
                                    Admin.findOne({ userName: req.body.userName }).then(async(exist) => {
                                        if (exist) {
                                            errors.userName = "This username already exists";
                                            res.status(404).json(errors);
                                        } else {
                                            Instructor.findOne({ email: req.body.email }).then(async(exist) => {
                                                if (exist) {
                                                    errors.email = "This email already exists";
                                                    res.status(404).json(errors);
                                                } else {
                                                    corpTrainee.findOne({ email: req.body.email }).then(async(exist) => {
                                                        if (exist) {
                                                            errors.email = "This email already exists";
                                                            res.status(404).json(errors);
                                                        } else {
                                                            Trainee.findOne({ email: req.body.email }).then(async(exist) => {
                                                                if (exist) {
                                                                    errors.email = "This email already exists";
                                                                    res.status(404).json(errors);
                                                                } else {
                                                                    Admin.findOne({ email: req.body.email }).then(async(exist) => {
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

const CreateInstructor = async(req, res) => {
    const { errors, isValid } = ValidateCreateInstructor(req.body);
    try {
        if (!isValid) {
            res.status(404).json(errors);
        } else {
            Instructor.findOne({ userName: req.body.userName }).then(async(exist) => {
                if (exist) {
                    errors.userName = "This username already exists";
                    res.status(404).json(errors);
                } else {
                    Trainee.findOne({ userName: req.body.userName }).then(async(exist) => {
                        if (exist) {
                            errors.userName = "This username already exists";
                            res.status(404).json(errors);
                        } else {
                            corpTrainee.findOne({ userName: req.body.userName }).then(async(exist) => {
                                if (exist) {
                                    errors.userName = "This username already exists";
                                    res.status(404).json(errors);
                                } else {
                                    Admin.findOne({ userName: req.body.userName }).then(async(exist) => {
                                        if (exist) {
                                            errors.userName = "This username already exists";
                                            res.status(404).json(errors);
                                        } else {
                                            Instructor.findOne({ email: req.body.email }).then(async(exist) => {
                                                if (exist) {
                                                    errors.email = "This email already exists";
                                                    res.status(404).json(errors);
                                                } else {
                                                    corpTrainee.findOne({ email: req.body.email }).then(async(exist) => {
                                                        if (exist) {
                                                            errors.email = "This email already exists";
                                                            res.status(404).json(errors);
                                                        } else {
                                                            Trainee.findOne({ email: req.body.email }).then(async(exist) => {
                                                                if (exist) {
                                                                    errors.email = "This email already exists";
                                                                    res.status(404).json(errors);
                                                                } else {
                                                                    Admin.findOne({ email: req.body.email }).then(async(exist) => {
                                                                        if (exist) {
                                                                            errors.email = "This email already exists";
                                                                            res.status(404).json(errors);
                                                                        } else {
                                                                            const hash = bcrypt.hashSync(req.body.password, 10);
                                                                            req.body.password = hash;
                                                                            await Instructor.create(req.body);
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

const CreateCorpTrainee = async(req, res) => {
    const { errors, isValid } = ValidateCreateCorpTrainee(req.body);
    try {
        if (!isValid) {
            res.status(404).json(errors);
        } else {
            Instructor.findOne({ userName: req.body.userName }).then(async(exist) => {
                if (exist) {
                    errors.userName = "This username already exists";
                    res.status(404).json(errors);
                } else {
                    Trainee.findOne({ userName: req.body.userName }).then(async(exist) => {
                        if (exist) {
                            errors.userName = "This username already exists";
                            res.status(404).json(errors);
                        } else {
                            corpTrainee.findOne({ userName: req.body.userName }).then(async(exist) => {
                                if (exist) {
                                    errors.userName = "This username already exists";
                                    res.status(404).json(errors);
                                } else {
                                    Admin.findOne({ userName: req.body.userName }).then(async(exist) => {
                                        if (exist) {
                                            errors.userName = "This username already exists";
                                            res.status(404).json(errors);
                                        } else {
                                            Instructor.findOne({ email: req.body.email }).then(async(exist) => {
                                                if (exist) {
                                                    errors.email = "This email already exists";
                                                    res.status(404).json(errors);
                                                } else {
                                                    corpTrainee.findOne({ email: req.body.email }).then(async(exist) => {
                                                        if (exist) {
                                                            errors.email = "This email already exists";
                                                            res.status(404).json(errors);
                                                        } else {
                                                            Trainee.findOne({ email: req.body.email }).then(async(exist) => {
                                                                if (exist) {
                                                                    errors.email = "This email already exists";
                                                                    res.status(404).json(errors);
                                                                } else {
                                                                    Admin.findOne({ email: req.body.email }).then(async(exist) => {
                                                                        if (exist) {
                                                                            errors.email = "This email already exists";
                                                                            res.status(404).json(errors);
                                                                        } else {
                                                                            const hash = bcrypt.hashSync(req.body.password, 10);
                                                                            req.body.password = hash;
                                                                            await corpTrainee.create(req.body);
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

const CreateAdmin = async(req, res) => {
    const { errors, isValid } = ValidateSignUp(req.body);
    try {
        if (!isValid) {
            res.status(404).json(errors);
        } else {
            Instructor.findOne({ userName: req.body.userName }).then(async(exist) => {
                if (exist) {
                    errors.userName = "This username already exists";
                    res.status(404).json(errors);
                } else {
                    Trainee.findOne({ userName: req.body.userName }).then(async(exist) => {
                        if (exist) {
                            errors.userName = "This username already exists";
                            res.status(404).json(errors);
                        } else {
                            corpTrainee.findOne({ userName: req.body.userName }).then(async(exist) => {
                                if (exist) {
                                    errors.userName = "This username already exists";
                                    res.status(404).json(errors);
                                } else {
                                    Admin.findOne({ userName: req.body.userName }).then(async(exist) => {
                                        if (exist) {
                                            errors.userName = "This username already exists";
                                            res.status(404).json(errors);
                                        } else {
                                            Instructor.findOne({ email: req.body.email }).then(async(exist) => {
                                                if (exist) {
                                                    errors.email = "This email already exists";
                                                    res.status(404).json(errors);
                                                } else {
                                                    corpTrainee.findOne({ email: req.body.email }).then(async(exist) => {
                                                        if (exist) {
                                                            errors.email = "This email already exists";
                                                            res.status(404).json(errors);
                                                        } else {
                                                            Trainee.findOne({ email: req.body.email }).then(async(exist) => {
                                                                if (exist) {
                                                                    errors.email = "This email already exists";
                                                                    res.status(404).json(errors);
                                                                } else {
                                                                    Admin.findOne({ email: req.body.email }).then(async(exist) => {
                                                                        if (exist) {
                                                                            errors.email = "This email already exists";
                                                                            res.status(404).json(errors);
                                                                        } else {
                                                                            const hash = bcrypt.hashSync(req.body.password, 10);
                                                                            req.body.password = hash;
                                                                            await Admin.create(req.body);
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

const ChangePassword = async(req, res) => {
    const { id, password } = req.body;
    Instructor.findOne({ _id: id }).then(async(exist) => {
        if (exist) {
            const hash = bcrypt.hashSync(password, 10);
            let instructor = await Instructor.findById(id);
            instructor.password = hash;
            await instructor.save();
            res.status(200).json({ message: "success" });
        } else {
            corpTrainee.findOne({ _id: id }).then(async(exist) => {
                if (exist) {
                    const hash = bcrypt.hashSync(password, 10);
                    let corptrainee = await corpTrainee.findById(id);
                    corptrainee.password = hash;
                    await corptrainee.save();
                    res.status(200).json({ message: "success" });
                } else {
                    Trainee.findOne({ _id: id }).then(async(exist) => {
                        if (exist) {
                            const hash = bcrypt.hashSync(password, 10);
                            let trainee = await Trainee.findById(id);
                            trainee.password = hash;
                            await trainee.save();
                            res.status(200).json({ message: "success" });
                        } else {
                            Admin.findOne({ _id: id }).then(async(exist) => {
                                if (exist) {
                                    const hash = bcrypt.hashSync(password, 10);
                                    let admin = await Admin.findById(id);
                                    admin.password = hash;
                                    await admin.save();
                                    res.status(200).json({ message: "success" });
                                } else {
                                    errors.email = "User Not found";
                                    res.status(404).json(errors);
                                }
                            });
                        }
                    });
                }
            });
        }
    });

}

const ForgetPassword = async(req, res) => {
    const { errors, isValid } = ValidateEmail(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors);
        } else {
            Instructor.findOne({ email: req.body.email }).then(async(exist) => {
                if (exist) {
                    let id = await Instructor.findOne({ email: req.body.email }).select("_id");
                    textBody = `You're Verified!, Click the link to return to change your password: http://localhost:3000/changepass/${id._id}`;
                    sendMail(req.body.email, textBody);
                    res.status(200).json({ message: "success" });
                } else {
                    corpTrainee.findOne({ email: req.body.email }).then(async(exist) => {
                        if (exist) {
                            let id = await corpTrainee.findOne({ email: req.body.email }).select("_id");
                            textBody = `You're Verified!, Click the link to return to change your password: http://localhost:3000/changepass/${id._id}`;
                            sendMail(req.body.email, textBody);
                            res.status(200).json({ message: "success" });
                        } else {
                            Trainee.findOne({ email: req.body.email }).then(async(exist) => {
                                if (exist) {
                                    let id = await Trainee.findOne({ email: req.body.email }).select("_id");
                                    textBody = `You're Verified!, Click the link to return to change your password: http://localhost:3000/changepass/${id._id}`;
                                    sendMail(req.body.email, textBody);
                                    res.status(200).json({ message: "success" });
                                } else {
                                    Admin.findOne({ email: req.body.email }).then(async(exist) => {
                                        if (exist) {
                                            let id = await Admin.findOne({ email: req.body.email }).select("_id");
                                            textBody = `You're Verified!, Click the link to return to change your password: http://localhost:3000/changepass/${id._id}`;
                                            sendMail(req.body.email, textBody);
                                            res.status(200).json({ message: "success" });
                                        } else {
                                            errors.email = "Invalid Email";
                                            res.status(404).json(errors);
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
}

const Login = async(req, res) => {
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
    Login,
    CreateAdmin,
    CreateInstructor,
    CreateCorpTrainee,
    ForgetPassword,
    ChangePassword
};