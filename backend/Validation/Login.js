const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateLogin(data) {
  let errors = {};

  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.password = !isEmpty(data.password) ? data.password : "";
 
  if (validator.isEmpty(data.userName)) {
    errors.userName = "Required User Name";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Required Password";
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }
};
