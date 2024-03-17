const express = require('express')
const UserController = require('../controllers/UserController')
const router=express.Router()
const {CheckUserAuth}=require('../middleware/auth')


//usercontroller
router.get('/getalluser',UserController.getalluser)
router.post('/userInsert',UserController.userInsert)
router.post('/verifyLogin',UserController.loginUser)
router.get('/logout',UserController.logout)
router.post('/updatePassword', CheckUserAuth ,UserController.updatePassword)




module.exports=router


