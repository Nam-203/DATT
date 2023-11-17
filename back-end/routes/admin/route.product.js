const express = require('express');
const productController = require('../../app/controllers/controller.product');
const router = express.Router();
const { uploadS3 } = require('../../middlewares/upload-aws-s3');

// GET
router.get('/list', productController.adminGetList);



module.exports = router;
