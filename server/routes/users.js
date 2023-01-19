const express = require('express');
const router = express.Router();
const User = require('../Modal/user/UserSchema')

const bcyrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const {verifyUserToken} = require('../Middleweares/user/jwtVerify')
const {verifyAdminToken}= require('../Middleweares/admin/jwtVerify')
const { sendUserOtp,verifyOtp,resendOtp,register, login, getUserInfo,frSuggestion,frinedsList,
     posts, timelinePosts,like,deletePost,editPost,reportPost,getReportedPosts,
     profilePosts,profileUser,editPfofile,
     comment,getComments,
     follow ,unfollow,searchUsers
          } = require('../controllers/userControllers/userControllers')



const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: fileStorage });


router.post('/upload',verifyUserToken,upload.single('file'), (req, res) => {
    try {
        console.log(req.file, 'pooppopopopopo')
        //   console.log(req.file.fileName);
        //   console.log(req.file.fileId);
        //   res.json(req.file.fileId)
        res.status(200).json('file upload successfully')
    } catch (err) {
        res.json(err)
    }
})

router.post('/sendOtp',sendUserOtp)
router.post('/validateOtp',verifyOtp)

router.post('/resendOtpCall',resendOtp)
router.post('/register', register)
router.post('/login', login)
router.get('/getUserInfo/:id',getUserInfo)

router.get('/friendsSuggestion',verifyUserToken,frSuggestion)
router.get('/frinedsList/:id',verifyUserToken,frinedsList)

router.post('/posts',verifyUserToken, posts)
router.get('/timelinePosts/:id',verifyUserToken, timelinePosts)
router.put('/like/:id',verifyUserToken,like)
router.post('/deletePost/:id', deletePost)
router.post('/editPost',verifyUserToken,editPost)
router.post('/reportpost',verifyUserToken,reportPost)


router.get('/profile/:use rname',verifyUserToken, profilePosts)
router.get('/profileUser/:username',verifyUserToken,profileUser)
router.put('/profileEdit/:id',verifyUserToken,editPfofile)


router.post('/comment',verifyUserToken,comment)
router.get('/getComments/:id', verifyUserToken,getComments)

router.post('/follow/:id',verifyUserToken,follow)
router.post('/unfollow/:id',verifyUserToken,unfollow)


router.get('/search/:name', searchUsers)






module.exports = router;
