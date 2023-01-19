const express = require('express');
const router = express.Router();
const {adminlogin,userManagement,blockUser,unBlockUser,getReportedPosts,
    blockPost,unblockPost}=require("../controllers/adminControllers/adminControllers")
const {verifyAdminToken} = require('../Middleweares/admin/jwtVerify')

router.post('/adminlogin',adminlogin)
router.get('/usermanagement',verifyAdminToken,userManagement)
router.put('/block_user',verifyAdminToken,blockUser)
router.put('/unblock_user',verifyAdminToken,unBlockUser)

router.get('/reportedPosts',verifyAdminToken,getReportedPosts)
router.post('/blockPost',verifyAdminToken,blockPost)
router.post('/unblockPost',verifyAdminToken,unblockPost)

module.exports = router;
