const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    profilePhoto: {
        type: String
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    },
    phone: {
        type: Number,
        required: [true, "Phone number is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})

UserSchema.virtual('confirmPassword')
    .get(function () {
        console.log("confirmPassword1" + this._confirmPassword)
        return this._confirmPassword;
    })
    .set(function (value) {
        console.log("confirmPassword2" + value)
        this._confirmPassword = value;
    });

UserSchema.pre('validate', function (next) {
    console.log("validate" + this.password + this.confirmPassword)
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Confirm password must match password');
    }
    next();
});

UserSchema.pre('save', function (next) {
    console.log("save")
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});


module.exports = mongoose.model('User', UserSchema)