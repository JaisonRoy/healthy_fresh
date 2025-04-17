var express = require("express");
var route = express.Router();
var { verifyToken } = require('./components/jwt')

var { Register } = require('./controller/register')
route.post('/user/register', Register)

var { Login } = require('./controller/login')
route.post('/login', Login)

var { AdminLogin } = require('./controller/adminlogin')
route.post('/admin-login', AdminLogin)

var { ListUsers } = require('./controller/listusers')
route.get('/list/users', ListUsers)

var { ListProducts } = require('./controller/listproducts')
route.post('/list/products', ListProducts)

var { AddCategory } = require('./controller/addcategory')
route.post('/add/category', AddCategory)

var { EditCategory } = require('./controller/adEditCategory')
route.post('/edit/category', EditCategory)

var { ListCategory } = require('./controller/listcategory')
route.post('/list/category', ListCategory)

var { DeleteSection } = require('./controller/deletesession')
route.post('/delete', DeleteSection)

var { AddProducts } = require('./controller/addproduct')
route.post('/add/product', AddProducts)

var { EditProduct } = require('./controller/editproducts')
route.post('/edit/product', EditProduct)

var { AddBanner } = require('./controller/addbanner')
route.post('/add/banner', AddBanner)

var { ListBanner } = require('./controller/listbannner')
route.post('/list/banner', ListBanner)

var { ViewProduct } = require('./controller/viewproduct')
route.post('/view-product', ViewProduct)

var { AddCart } = require('./controller/addcart')
route.post('/add/cart', AddCart)

var { ListCart } = require('./controller/listcart')
route.post('/list/cart', ListCart)

var { AddAddress } = require('./controller/addaddress')
route.post('/add/address', verifyToken, AddAddress)

var { ListAddress } = require('./controller/listaddress')
route.post('/list/address', ListAddress)

var { EditAddress } = require('./controller/editaddress')
route.post('/edit/address', EditAddress)

var { AddFav } = require('./controller/addfav')
route.post('/add/fav', AddFav)

var { FavList } = require('./controller/favouritelist')
route.post('/list/fav', FavList)

var { EditProfile } = require('./controller/editprofile')
route.post('/edit/profile', EditProfile)

var { ForgotPassword } = require('./controller/forgotpassword')
route.post('/forgotpassword', ForgotPassword)

var { verifyOtp } = require('./controller/forgotpassword')
route.post('/verify-otp', verifyOtp)

var { ResetPassword } = require('./controller/forgotpassword')
route.post('/reset-password', ResetPassword)

var { AddOrder } = require('./controller/addorder')
route.post('/add/order', AddOrder)

var { ListOrder } = require('./controller/listorder')
route.post('/list/order', ListOrder)

var { CancelOrder } = require('./controller/cancelorder')
route.post('/cancel/order', CancelOrder)

var { DeliveryStatus } = require('./controller/deliverystatus')
route.post('/delivery-status', DeliveryStatus)

let { AddSubCategory, EditSubCategory, ListSubCategory, DeleteSubCategory } = require('./controller/subCategory')
route.post('/add/subcategory', verifyToken, AddSubCategory)
route.put('/edit/subcategory', verifyToken, EditSubCategory)
route.get('/subcategory', verifyToken, ListSubCategory)
route.delete('/delete/subcategory', verifyToken, DeleteSubCategory)

var { SetDefultAddress } = require('./controller/setDefaultAddress')
route.post('/set/default-address', SetDefultAddress)

var { AddVendor } = require('./controller/addvendor')
route.post('/add/vendor', AddVendor)

var { ListVendors } = require('./controller/listvendors')
route.get('/list/vendor', ListVendors)

var { EditAddress } = require('./controller/editvendor')
route.put('/edit/vendor', EditAddress)

module.exports = route;
