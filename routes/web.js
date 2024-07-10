const express = require('express')
const UserController = require('../controllers/UserController')
const ProductController=require('../controllers/ProductController')
const CategoryController = require('../controllers/CategoryController')
const SliderController = require('../controllers/SliderController')
const router=express.Router()
const {CheckUserAuth}=require('../middleware/auth')
const PaymentController = require('../controllers/PaymentController')


//usercontroller
router.get('/getalluser',UserController.getalluser)
router.get('/admin/getUser/:id', UserController.getSingleUser)
router.post('/userInsert',UserController.userInsert)
router.post('/verifyLogin',UserController.loginUser)
router.get('/logout',UserController.logout)
router.post('/updatePassword', CheckUserAuth ,UserController.updatePassword)
router.post('/updateProfile', CheckUserAuth, UserController.updateProfile)
router.get('/me', CheckUserAuth, UserController.getUserDetail)
router.get('/admin/deleteUser/:id', UserController.deleteUser)

//productController
router.get('/products', ProductController.getAllProducts)
router.get('/getProductDetail/:id', ProductController.getProductDetail)
router.get('/product/getAdminProduct', ProductController.getAdminProduct)
router.get('/product/deleteProduct/:id',ProductController.deleteProduct)
router.post('/product/create', ProductController.createProduct)


// categoryController

router.get('/getAllCategories', CategoryController.display);
router.post('/insertCategory', CategoryController.insert);
router.get('/getCategory/:id', CategoryController.view);
router.put('/updateCategory/:id', CategoryController.update);
router.delete('/deleteCategory/:id', CategoryController.delete);

//sliderController
router.get('/slider', SliderController.display);
router.post('/insert', SliderController.insert);
router.get('/view', SliderController.view);
router.post('/slider', SliderController.update);
router.delete('/slider', SliderController.delete);

//PaymentController
router.post('/payment/process', PaymentController.processPayment)
router.get('/stripepiKey', PaymentController.sendStripeApiKey)

module.exports=router


