//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: ['Admin','User'],
        default: 'User'
    },
},{
    collection: 'User',
    autoCreate: true,
});

export const User = mongoose.model('User', UserSchema);