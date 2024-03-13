const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    fullname : {
        type : String, 
        required: true
    },
    userame: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type : String,
        required : true
    },
    roles: {
        type : String,
        enum : [ 'donor', 'campaign creater' ],
    }
})

const User = model('User',UserSchema);

module.exports = User;