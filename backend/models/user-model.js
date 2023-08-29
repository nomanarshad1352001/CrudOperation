const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    image: {type: String, require: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    nic: {type: String, required: true},
    gender: {type: String, required: true}
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);