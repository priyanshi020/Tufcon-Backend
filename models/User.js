const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'  
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    email: {
        type: String,
    },
    roleId: {
        type: Number,
        ref: 'Role',  // Make sure the reference is capitalized correctly
        required: true,
    },
    attendance: [
        {
            scannedIn: { type: Date, default: null },
            scannedOut: { type: Date, default: null },
            rescan: { type: Date, default: null },
        },
    ],
    profilePicture: {
        type: String,  // This will store the URL/path to the profile picture
        default: null, // Set a default value if no picture is uploaded
    },
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
