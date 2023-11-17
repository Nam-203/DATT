const express = require('express');
const router = express.Router();
const commentController = require('../../app/controllers/controller.comment');

router.get('/list', commentController.adminGetList);
router.get('/detail', commentController.adminGetDetail);
router.get('/delete/:id', commentController.admindelete)
module.exports = router;
