const express = require('express');
const router = express.Router();
const {createConversation,userConversations} = require ('../controllers/chatControllers/conversationController')


router.post('/',createConversation)
router.get('/:userId',userConversations)

module.exports = router;