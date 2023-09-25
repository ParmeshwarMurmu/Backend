const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    userID:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    userName: String
},
{
    versionKey: false
})

const PostModel = mongoose.model('post', postSchema)

module.exports = {
    PostModel
}