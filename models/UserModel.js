const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {

        userName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        userImg: {
            type: String,
            default: null,
        },
        
        userPhone: {
            type: Number,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        userStatus: {
            type: Boolean,
            trim: true,
        },
       
        Age: {
            type: Number,
            trim: true
        },
        Rate: {
            type: Number,
            default: null,
        },
        roleId: {
            type: Number,
            ref: 'Role',
            // required: true
        },
       
        
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("user", userSchema);
