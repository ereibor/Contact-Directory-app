const express = require('express')
const {createContact,getContact} = require('../controller/contactDirectoryController');
const { upload, multerInstance } = require('../utils/multer');



const router = express.Router()

// ===========GET ROUTE================
router.get('/home', getContact)


// ===========CREATE ROUTE================
router.post('/create', upload.single('image'), createContact)

module.exports = router;