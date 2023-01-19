
const bcyrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../Modal/user/UserSchema')
const Post = require('../../Modal/user/PostSchema')
const UserVerification = require("../../Modal/user/userVerification")
const Comment = require('../../Modal/user/commentSchema')
const nodemailer = require("nodemailer");


const sendUserOtp = async (req, res) => {
    const { email } = req.body
    console.log('email', email);
    try {
        const userData = await User.findOne({ email: email })
        console.log('userData', userData);
        if (userData) {
            res.status(409).json('invali')
        } else {
            otpGenerate(email, res).then((response) => {
            })
        }
    } catch (err) {
        res.status(500).json(err)

    }

}

/* ------------------------- OTP GENERATE  FUNCTION ------------------------- */

//Nodemailer configuration

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'connectplus246485@gmail.com',
        pass: 'noqieurtxfimvuja'
    }
})

const otpGenerate = async (email, res) => {
    console.log('email', email);
    // console.log('process.env.NODEMAILER',process.env.NODEMAILER);
    // console.log('process.env.NODEMAILER_PASS',process.env.NODEMAILER_PASS);
    try {
        const OTP = await Math.floor(100000 + Math.random() * 900000).toString()
        const hashOtp = await bcyrpt.hash(OTP, 10)
        const user = await UserVerification.findOne({ user: email })
        console.log('user in userVerification', user);
        console.log('otp', OTP);
        if (!user) {
            const data = new UserVerification({
                user: email,
                otp: hashOtp,
                created: Date.now(),
                expiry: Date.now() + 100000
            })
            await data.save()
            console.log('data saved');
        } else {
            await UserVerification.updateOne({ user: email }, { otp: hashOtp })
            console.log('data updated');
        }
        let info


        // send mail with defined transport object
        info = await transporter.sendMail({
            from: process.env.NODEMAILER, // sender address
            to: email, // list of receivers
            subject: "One Time Password for TalentF", // Subject line
            text: `Hello User Your six digit OTP for authentication is ${OTP} `, // plain text body
            html: `<p>Hello User Your six digit OTP for authentication is <b>${OTP}</b></p>`, // html body
        })


        if (info.messageId) {
            console.log('otp send');
            res.status(204).json({ status: true, message: 'Otp send to mail' })
        } else {
            console.log('something err')
            res.status(402).json('something went wrong')
        }


    } catch (error) {
        console.log(error, 'send otp error');
        res.status(500).json(error)
    }
}



const verifyOtp = async (req, res) => {
    try {
        let validUser = await UserVerification.findOne({ user: req.body.email })
        let validOtp = await bcyrpt.compare(req.body.otp, validUser.otp)
        console.log(validUser, 'validUser');
        console.log(validOtp, 'validOtp');

        if (validOtp) {
            await validUser.updateOne({ otp: 'used' })
            console.log('user updated to used');
            res.status(200).json({ message: 'otp verified', auth: true })
        } else {
            console.log('invalid otp')
            res.status(403).json({ message: 'invalid Otp' })
        }
    } catch (error) {

        console.log(error, 'verify otp error');
        res.status(500).json(error)
    }
}

const resendOtp = async (req, res) => {
    console.log('req reached');
    const { email } = req.body
    console.log('req bodyyyyyy', email);
    try {
        await otpGenerate(email, res).then((response) => {
            console.log('otppppp reeeeeeeee');
            // res.status(200).json({auth : true}) 
        })

    } catch (err) {
        res.status(500).json(err)
    }

}


const register = async (req, res) => {
    console.log(req.body);
    const { name, email, phone, password } = req.body
    let Password = await bcyrpt.hash(password, 10)
    console.log('Passworddddd', Password);

    try {
        console.log('one');
        const user = new User({
            userName: name,
            email,
            phone,
            password: Password
        })
        console.log('two');
        const uservalid = await User.findOne({ email: email })
        console.log('three', uservalid);
        if (!uservalid) {
            user.save()
            console.log('user saved');
            res.status(200).json({ res: user })

        } else {
            res.json('invalid')
        }
    } catch (err) {
        res.status(500).json(err)

    }
}

const login = async (req, res) => {
    // console.log('req.body:', req.bodu);
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email })
        console.log(user);

        if (!user) {
            res.json('Invalidemail')
        } else {

            const auth = await bcyrpt.compare(password, user.password)
            if (auth) {
                if (user.isAdmin == false) {
                    const id = user._id
                    console.log('id:', id);
                    const token = jwt.sign({ id }, "ABCD1234", { expiresIn: "7d" })
                    console.log('token:', token)
                    res.json({ user, token, auth: true })

                } else {
                    res.status(500).json({mesage:'Your account is blocked!!'})
                 }
            } else {
                res.json('Invalidpass')
            }
        }
    } catch (error) {
        console.log(error);
    }

}

const getUserInfo = async (req, res) => {
    const userid = req.params.id
    // console.log('useriddddddddd:', userid);
    try {
        userDetails = await User.findOne({ _id: Object(userid) })
        // console.log('userdetails', userDetails);
        res.json(userDetails)
    } catch (err) {
        console.log(err);
    }


}

const frSuggestion = async (req, res) => {
    // console.log('start suggestion');
    try {
        const userList = await User.find({ suggession: false })
        // console.log('idssssssssss', userList);
        res.status(200).json(userList)

    } catch (err) {
        res.status(500).json(err)

    }




}
const posts = async (req, res) => {
    // console.log(req.body);
    const { desc, userId } = req.body
    // console.log(desc, '==msg');
    try {
        const newPost = new Post(req.body)

        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (err) {
        console.log(err, 'mmmmmmmmmmmmmmm');
        res.status(500).json(err)
    }


}

const profilePosts = async (req, res) => {
    // console.log('start');
    console.log('req.params.username', req.params.username);

    try {
        const user = await User.findOne({ userName: req.params.username })
        // console.log(' user', user);

        const userPosts = await Post.find({ userId: user._id }).populate('userId').sort({ _id: -1 })
        // console.log(' userPosts', userPosts);
        res.status(200).json(userPosts)
    } catch (err) {
        res.status(500).json(err)

    }
}
const profileUser = async (req, res) => {
    try {
        const profileData = await User.findOne({ userName: req.params.username })
        //    const{password, ...other}= profileData
        res.status(200).json(profileData)
        //    console.log('other',other);
    } catch (err) {
        res.status(500).json(err)

    }
}
const editPfofile = async (req, res) => {
    const { city, from, coverPic, profilePic } = req.body
    // console.log('req.body', req.body);
    // console.log('coverPic', coverPic);
    // console.log('profilePic', profilePic);
    try {
        await User.findByIdAndUpdate(req.params.id, { $set: { city, from, coverPic, profilePic } })
        res.status(200).json('success')
    } catch (err) {
        res.status(500).json(err)

    }


}


const timelinePosts = async (req, res) => {
    // console.log(req.params.id,'===req.body');
    const userid = req.params.id
    try {
        const currentuser = await User.findOne({ _id: Object(userid) })

        // console.log(currentuser, 'current===user');
        userPosts = await Post.find({ userId: currentuser._id }).populate('userId').sort({ createdAt: -1 })
        // console.log(' userPostsssssssssssss', userPosts);
        const friendsPosts = await Promise.all(
            currentuser.following.map((friendId) => {
                return (
                    Post.find({ userId: friendId, report: { $ne: req.params.id } }).populate('userId').sort({ createdAt: -1 })
                )
            })
        )
        // console.log('friendsPostsssssssssss', friendsPosts);
        const allPosts = userPosts.concat(...friendsPosts)
        console.log('allPostssss', allPosts);
        res.status(200).json(allPosts)

    } catch (err) {
        res.status(500).json(err)
    }
}


const like = async (req, res) => {
    // console.log(req.body, 'idsssssssssss');
    const { userId } = req.body
    // console.log(userId,'idsssssssssss');
    // console.log(req.params.id, 'post===');
    try {
        const post = await Post.findById(req.params.id)
        // console.log(post, 'post=====data');
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json('the post has been liked')
        } else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json('the post has been disliked')

        }
    } catch (err) {
        res.status(500).json(err)

    }

}
const deletePost = async (req, res) => {
    // console.log(req.params.id,'postid');
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Post has been deleted' })

    } catch (err) {
        res.status(500).json(err)

    }
}
const editPost = async (req, res) => {
    const { updateDesc, postId } = req.body
    // console.log(updateDesc,postId);

    try {
        if (updateDesc != '') {
            await Post.findByIdAndUpdate(postId, { desc: updateDesc })
            res.status(200).json({ message: 'post updated successfully!' })
        }

    } catch (err) {
        res.status(500).json(err)
        console.log(err);
    }


}

const reportPost = async (req, res) => {
    console.log('report post', req.body);
    const { postId, currentuserId } = req.body
    try {
        let post = await Post.findById(postId)
        console.log("post", post);
        if (!post.report?.includes(currentuserId)) {
            await post.updateOne({ $push: { report: currentuserId } }, { upsert: true })
            res.status(200).json({ message: 'post Reported Successfully!' })
            console.log('success');
        }
    } catch (err) {
        console.log('post error');
        res.status(500).json(err)
    }

}

const comment = async (req, res) => {
    const { userId, postId, commentDesc } = req.body
    // console.log(userId,'userid');
    // console.log(postId,'postid');
    // console.log(commentDesc,'commentDesc');
    try {
        const newComment = new Comment(req.body)
        await newComment.save()
        res.status(200).json('comment added successfully')
    } catch (err) {
        res.status(500).json(err)

    }

}
const getComments = async (req, res) => {
    // console.log('req.params.id', req.params.id);
    try {
        const allcomments = await Comment.find({ postId: req.params.id }).populate('userId').sort({ _id: 1 })
        res.status(200).json(allcomments)
        // console.log('allcomments', allcomments);

    } catch (err) {
        res.status(500).json(err)

    }

}

const follow = async (req, res) => {
    console.log('zero');
    if (req.params.id != req.body.userId) {
        try {
            const user = await User.findById(req.params.id)
            const currentuser = await User.findById(req.body.userId)
            console.log('first');
            if (!user.followers.includes(req.body.userId)) {
                console.log('second 1');
                await user.updateOne({ $push: { followers: req.body.userId } })
                console.log('second');
                await currentuser.updateOne({ $push: { following: req.params.id } })
                console.log('third');
                res.status(200).json('user has been followed')
            } else {
                res.status(403).json('you already followes this user')
            }
        } catch (err) {
            res.status(500).json(err)

        }

    } else {
        res.status(403).json('you can not follow yourself ')
    }
}

const unfollow = async (req, res) => {
    if (req.params.id != req.body.userId) {
        try {
            const user = await User.findById(req.params.id)
            const currentuser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentuser.updateOne({ $pull: { following: req.params.id } })
                res.status(200).json('user has been unfollowed')
            } else {
                res.status(403).json('you dont follow this user')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('you can not ufollow yourself ')
    }
}

const frinedsList = async (req, res) => {
    console.log('start');
    try {
        const user = await User.findById(req.params.id)
        console.log('user', user);
        const friends = await Promise.all(
            user.following.map((friendId) => {
                return (
                    User.findById(friendId)
                )
            })
        )
        console.log('friends', friends);
        let friendsList = []
        friends.map((friend) => {
            const { _id, userName, profilePic } = friend
            friendsList.push({ _id, userName, profilePic })
        })
        console.log('friendsList', friendsList);
        res.status(200).json(friendsList)
    } catch (err) {
        res.status(500).json(err)
    }
}

const searchUsers = async (req, res) => {
    const data = req.params.name
    console.log('data', req.params.name);
    try {
        const users = await User.find(
            { userName: { $regex: "^" + data, $options: "i" } },
            { userName: 1, profilePic: 1, accountType: 1 }
        )
        res.status(200).json(users)
        console.log(users, "usersssssssss");
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}









module.exports = {
    sendUserOtp, verifyOtp, resendOtp, register, login, getUserInfo, frSuggestion, frinedsList,
    posts, timelinePosts, like, deletePost, editPost, reportPost,
    profilePosts, profileUser, editPfofile,
    comment, getComments,
    follow, unfollow, searchUsers

}