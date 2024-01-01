const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user-model');
const fs = require("fs");
const excelToJson = require('convert-excel-to-json');
const getAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (err) {
        return next(new HttpError('Something went wrong. Fetching users failed, Please try again later', 500))
    }
    res.json({users: users.map(user => user.toObject({getters: true}))});
};

const addUser = async (req, res, next) => {
    const {name, email, address, city, nic, gender} = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('Input data is not correct.', 422));
    }
    let existingUser;
    try {
        existingUser = await User.findOne({email: email})
    } catch (err) {
        return next(new HttpError('Adding user failed. Please try again later.', 500));
    }
    if (existingUser) {
        return next(new HttpError('User is already registered.', 422));
    }
    if (!req.file) {
        return next(new HttpError('File is not uploaded', 404))
    }

    const newUser = new User({
        image: req.file.path,
        name,
        email,
        address,
        city,
        nic,
        gender
    });

    try {
        await newUser.save();
    } catch (err) {
        return next(new HttpError('Adding user failed. Please try again later...', 500));
    }
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return next(new HttpError('Something went wrong. Fetching users failed, Please try again later', 500))
    }
    res.json({users: users.map(user => user.toObject({getters: true}))}).status(200);
};

const updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Data is not correct', 422);
    }
    const {name, email, address, city, nic, gender} = req.body;
    const userId = req.params.uid;

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        return next(new HttpError('Something went wrong', 500))
    }
    if (!user) {
        return next(new HttpError('Could not find any place against this provided id', 404));
    }
    user.image = req.file ? req.file.path : user.image;
    user.name = name;
    user.email = email;
    user.address = address;
    user.city = city;
    user.nic = nic;
    user.gender = gender;

    try {
        await user.save();
    } catch (err) {
        return next(new HttpError('Updating user failed', 500));
    }

    let users;
    try {
        users = await User.find();
    } catch (err) {
        return next(new HttpError('Something went wrong. Fetching users failed, Please try again later', 500))
    }
    res.json({users: users.map(user => user.toObject({getters: true}))}).status(200);
};

const deleteUserById = async (req, res, next) => {
    const userId = req.params.uid;
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        return next(new HttpError('Something went wrong', 500))
    }

    if (!user) {
        return next(new HttpError(' Could not fetch any User against this provided id', 404))
    }

    try {
        await user.deleteOne();
    } catch (err) {
        return next(new HttpError('Something went wrong. Could not delete user', 500))
    }
    const imagePath = user.image;

    let users;
    try {
        users = await User.find();
    } catch (err) {
        return next(new HttpError('Something went wrong. Fetching users failed, please try again later', 500))
    }
    fs.unlink(imagePath, err => {
        console.log(err)
    })
    res.json({users: users.map(user => user.toObject({getters: true}))});
};

const readXlFile = async (req, res, next) => {
    try {
        if (req.file?.filename === null || req.file?.filename === undefined) {
            return next(new HttpError('Something went wrong. No file attached', 400))
        } else {
            const filePath = "uploads/xlFiles/" + req.file.filename
            const excelData = excelToJson({
                sourceFile: filePath,
                header: {
                    rows: 1,
                },
                columnToKey: {
                    "*": "{{columnHeader}}"
                }
            })
            fs.unlink(filePath, err => {
            });
            res.json(excelData).status(200)
        }
    } catch (err) {
        console.log(err)
        return next(new HttpError('Something went wrong. please try again later', 500))
    }
}

exports.getAllUser = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUserById = deleteUserById;
exports.readXlFile = readXlFile;