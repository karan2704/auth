const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 15,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
    }, ],
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        this.password = hashedPassword;
        next();
    });
});

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        } else {
            if (!isMatch) {
                return cb(null, isMatch);
            }
            return cb(null, this);
        }
    });
};

module.exports = mongoose.model("User", userSchema);