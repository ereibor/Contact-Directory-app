const multer = require('multer');
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require ("multer-storage-cloudinary");


// ===========CLOUDINARY CONFIGURATION================
 // cSpell:ignore CLOUDINARY

 cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file)=>{
        return {
            folder:"DEV"
        }
    },
});

module.exports = { upload: multer({ storage }), multerInstance: multer({ storage }) };