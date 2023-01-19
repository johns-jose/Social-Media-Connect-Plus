const Message = require('../../Modal/user/Message')


const addMessage = async(req,res)=>{
    newMessage = new Message(req.body)
        try {
            const savedMessage = await newMessage.save()
            res.status(200).json(savedMessage)
    
        } catch (err) {
            res.status(500).json(err)
    
        }

}
const getMessages = async(req,res)=>{
    try {
        const messages = await Message.find({conversationId: req.params.conversationId})
     console.log(messages,'messages');
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json(err)
    }

}


module.exports={addMessage,getMessages}