const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    userame: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    roles: {
        type : String,
        enum : [ 'donor', 'campaign creater' ],
    }
})

const User = model('user',UserSchema);

module.exports = User;