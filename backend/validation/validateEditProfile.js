// backend/validation/validateEditProfile.js
const validator = require('validator');

module.exports = function validateEditProfile(data) {
  let errors = {};

  if (data.email && !validator.isEmail(data.email)) {
    errors.email = 'Invalid email format';
  }
  if (data.firstName && !/^[A-Za-z]+$/.test(data.firstName)) {
    errors.firstName = 'Name must contain only letters';
  }
  if (data.lastName && !/^[A-Za-z]+$/.test(data.lastName)) {
    errors.lastName = 'Last Name must contain only letters';
  }
  // не проверяем avatarFile и другие поля

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
