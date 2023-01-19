const express = require('express');
const router = express.Router();
const{addMessage,getMessages} = require('../controllers/chatControllers/messageController')



router.post('/',addMessage)
router.get('/:conversationId',getMessages)






module.exports = router;