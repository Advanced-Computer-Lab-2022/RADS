const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateEmail(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    if (!validator.isEmail(data.email)) {
        errors.email = "Required Valid Email";
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "Required Email";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};