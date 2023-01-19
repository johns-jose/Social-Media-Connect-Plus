const bcyrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../Modal/user/UserSchema')
const Post =require('../../Modal/user/PostSchema')



//adminLogin

const adminlogin=(req,res)=>{
    console.log('adminlogin start');
    adminEmail="admin@gmail.com"
    adminPass = 12345
    console.log(req.body.email,'req.body.email');
    console.log(req.body.password,'req.body.password');
    try {
        if(adminEmail==req.body.email){
            const id = 'admin12345'
            if(adminPass==req.body.password){
                const token = jwt.sign({id},'abcd1234',{expiresIn:'7d'})
                res.status(200).json({adminToken:token,admin:true})
            }else{
                res.status(400).json('incorrect password')
            }
        }else{
            res.status(400).json('Email is not valid')
        }
    } catch (err) {
        res.status(500).json(err)
        
    }

}


const userManagement = (req,res)=>{
    console.log('usermangement start');
    try {
        User.find().then(response=>{
            res.status(200).json(response)
        })

        
    } catch (error) {
        res.status(401).json({message:'Something went wrong! Try again'})
    }
}

const blockUser = async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.body.userId,{isAdmin:'true'})
        res.status(200).json({update:true,message:"User has been Blocked!"})
    } catch (err) {
        res.status(500).json(err)
        
    }
}
const unBlockUser = async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.body.userId,{isAdmin:'false'})
        res.status(200).json({update:true,message:"User has been UnBlocked!"})
    } catch (err) {
        res.status(500).json(err)
        
    }
}

const getReportedPosts = async(req,res)=>{
    console.log('getreported post start');
    try {
       const posts =  await Post.find()
       console.log('reported posts',posts);
       const result = posts.filter((post)=>{
        if(post?.report.length!=0)
        return(post)

       })
       console.log('result',result);
       res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }

}
const blockPost = async(req,res)=>{
    const{postId}=req.body
    console.log(postId);
    try {
        const post =  await Post.findById(req.body.postId)
        console.log('blockpost',post);
        if(!post.status){
         await post.updateOne({$set: { status:"inactive"}},{upsert:true})
         res.status(200).json({message:'post blocked successfully'})
        }
    } catch (err) {
        res.status(500).json(err)
        
    }
    
}
const unblockPost = async(req,res)=>{
    const{postId}=req.body
    try {
        const post =  await Post.findById(req.body.postId)
        console.log('unblockpost',post);
         const result = await post.updateOne({$unset:{status:'inactive'}})
         res.status(200).json({message:'post unblocked'})
    } catch (err) {
        res.status(500).json(err)
        
    }
}



module.exports={adminlogin,userManagement,blockUser,unBlockUser,
    getReportedPosts, blockPost,unblockPost}