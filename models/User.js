const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

// this is the parent document
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            lowercase: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'],
        },
        
    },
);


const Users = mongoose.model('users', userSchema);

module.exports = Users;



