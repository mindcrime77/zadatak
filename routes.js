const router = require('express').Router()
const { createDb, createTable, registerUser, showUsers, updateUser, deleteUser, resetPassword, userPicture, loginUser } = require('./controllers')
const { validateRegister, validateLogin, auth } = require('./middlewares')
const upload = require('./multer')

router
    .route('/createdb')
    .get(createDb)
router
    .route('/createtable')
    .get(createTable)
router
    .route('/add')
    .post(upload.single('image'), validateRegister, registerUser)
router
    .route('/login')
    .post(validateLogin, loginUser)
router
    .route('/show')
    .get(auth, showUsers)
router
    .route('/update/:id')
    .put(auth, updateUser)
router
    .route('/reset')
    .post(resetPassword)

router
    .route('/delete/:id')
    .delete(auth, deleteUser)
router
    .route('/picture/:id')
    .post(auth, upload.single('image'), userPicture)



module.exports = router