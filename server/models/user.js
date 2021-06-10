const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        maxLength: 1024,
    },
    email: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true,
    },
    doc: [
        {
            type: mongoose.Schema.Types.String,
            ref: 'Docs',
        },
    ],
});

userSchema.methods.genToken = function () {
    const token = jwt.sign({ _id: this._id, username: this.username, email: this.email }, process.env.JWT);
    return token;
};

const User = mongoose.model('User', userSchema);

function UserValidator(user) {
    const schema = Joi.object({
        username: Joi.string().required().min(5).max(30),
        password: Joi.string().required().min(5).max(100),
        password_confirmation: Joi.any()
            .equal(Joi.ref('password'))
            .required()
            .options({ messages: { 'any.only': 'password confirmation does not match password' } }),
        email: Joi.string().required().min(5).max(50).email(),
    });
    const result = schema.validate(user);
    return result;
}

exports.UserValidator = UserValidator;

exports.User = User;
