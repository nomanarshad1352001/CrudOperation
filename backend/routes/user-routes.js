const express = require('express');
const {check} = require('express-validator');
const userController = require('../controller/user-controller')
const fileUpload = require('../middleWare/file-uploads')
const xlFileUpload = require('../middleWare/xlFile-uploads')

const router = express.Router();

router.get('/', userController.getAllUser);

router.post('/', fileUpload.single('image'), [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('address').notEmpty(),
    check('city').notEmpty(),
    check('nic').notEmpty(),
    check('gender').notEmpty()
], userController.addUser);

router.patch('/:uid', fileUpload.single('image'), [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('address').notEmpty(),
    check('city').notEmpty(),
    check('nic').notEmpty(),
    check('gender').notEmpty()
], userController.updateUser);

router.delete('/:uid', userController.deleteUserById);
router.post('/readXlFile', xlFileUpload.single('file'), userController.readXlFile);

module.exports = router;

