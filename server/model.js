const goose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
goose.connect("mongodb://localhost:27017/LoginAndReg", {useNewUrlParser : true}, (errs) => console.log(errs?errs : "db LoginAndReg"));

const UserSchema = new goose.Schema({
    first_name : {
        type : String,
        required : [true, "Give me your first name"],
        minlength: [2, "too short"]
    },
    last_name : {
        type : String,
        required : [true, "Give me your last name"],
        minlength: [2, "too short"]
    },
    email : {
        type : String,
        required : [true, "Give me your email"],
        unique : [true, "Email is in the database"],
        match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Invalid email address']
    },
    password : {
        type : String,
        required : [true, "Password"],
        minlength : [8, "At least 8 characters"]
    },
    birthday : {
        type : Date,
        required : [true, "Your B-day?"],
    }
})
UserSchema.plugin(uniqueValidator,  { message: 'Error, {PATH} already in the database' });
const User = goose.model('User', UserSchema);

module.exports = User;