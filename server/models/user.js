const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 30
    },
    password:{
        type: String,
        required: true,
        maxLength: 1024
    },
    email:{
        type: String,
        required: true,
        maxLength: 50
    },
    doc:{
        type: Schema.Types.ObjectId,
        ref: "Docs"
    }
})

const User = mongoose.model('User',userSchema)

exports.User = User