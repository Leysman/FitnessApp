// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

// либо сразу так, если вы указали CLOUDINARY_URL:
// cloudinary.config(process.env.CLOUDINARY_URL);

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
