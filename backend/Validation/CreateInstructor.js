const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateCreateInstructor(data) {
    let errors = {};
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.userName = !isEmpty(data.userName) ? data.userName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.gender = !isEmpty(data.gender) ? data.gender : "";
    data.country = !isEmpty(data.country) ? data.country : "";
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.bio = !isEmpty(data.bio) ? data.bio : "";
    data.role = !isEmpty(data.role) ? data.role : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirm = !isEmpty(data.confirm) ? data.confirm : "";

    if (validator.isEmpty(data.firstName)) {
        errors.firstName = "Required First Name";
    }
    if (validator.isEmpty(data.lastName)) {
        errors.lastName = "Required Last Name";
    }
    if (validator.isEmpty(data.userName)) {
        errors.userName = "Required User Name";
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Required Valid Email";
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "Required Email";
    }
    if (validator.isEmpty(data.gender)) {
        errors.gender = "Required Gender";
    }
    if (validator.isEmpty(data.country)) {
        errors.country = "Required Role";
    }
    if (validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "Required Role";
    }
    if (validator.isEmpty(data.address)) {
        errors.address = "Required Role";
    }
    if (validator.isEmpty(data.bio)) {
        errors.bio = "Required Role";
    }
    if (validator.isEmpty(data.role)) {
        errors.role = "Required Role";
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Required Password";
    }
    if (!validator.equals(data.password, data.confirm)) {
        errors.confirm = "Passwords does not match";
    }
    if (validator.isEmpty(data.confirm)) {
        errors.confirm = "Required Confirm";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};