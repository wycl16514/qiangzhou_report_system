const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema(
    {
        name: { type: String, required: true, trim: true, },
        age: { type: Number },
        phone_number: { type: String, required: true },
        email: { type: String },
        access_level: { type: String, enum: ["admin", "manager"] },
        hash: { type: String, required: true },
        icon_path: { type: String }
    }
)

const User = mongoose.model('User', schema);
module.exports = User;