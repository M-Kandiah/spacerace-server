const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    passwordHash:{
        type: String,
        required: true
    },
    points:{
        type: Number,
        required: true
    },
    wins:{
        type: Number,
        required: true
    }
}
)

const Usermon = mongoose.model('user',userSchema)

module.exports = Usermon