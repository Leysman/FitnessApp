// backend/config/multerCloudinary.js

const multer                = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary            = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'posts',  // папка в вашем аккаунте Cloudinary
    format: async (req, file) => file.mimetype.split('/')[1], // jpg, png и т.п.
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '')}`,
  },
});

module.exports = multer({ storage });