const express = require("express")
const { getCategories, getCategoryByid } = require('../controllers/user/userCategory')
const { getProductDetails, getProductBySubCategory } = require('../controllers/user/product')
const { onUserSignUp, onUserLogIn, onVerfiyUser } = require('../controllers/user/authController')
const { addToCart, increaseQuantity, deceraseQuantity, getCart } = require("../controllers/user/cartController")
const { addAddress, getAddresses } = require('../controllers/user/addressController')
const { getOffers } = require('../controllers/user/userOfferController')
const authMiddleware = require("../middlewares/user/authMiddleware")

const router = express.Router()

// category routes 
router.get('/getcategories', getCategories)
router.get('/getproductdetails', getProductDetails)
router.get('/getproductbysubid', getProductBySubCategory)
router.get('/getcategorybyid', getCategoryByid)

// login routes 
router.post('/signup', onUserSignUp)
router.post('/login', onUserLogIn)
router.post('/verifyuser', onVerfiyUser)

// cart routes 
router.post('/addtocart', authMiddleware, addToCart)
router.get('/getcart', authMiddleware, getCart)
router.post('/increasequantity', authMiddleware, increaseQuantity)
router.post('/decreasequantity', authMiddleware, deceraseQuantity)

// address Routres 
router.post('/addaddress', authMiddleware, addAddress)
router.get('/getAddresses', authMiddleware, getAddresses)

//offer routes 
router.get('/getoffers', authMiddleware, getOffers)




// exports 
module.exports = router