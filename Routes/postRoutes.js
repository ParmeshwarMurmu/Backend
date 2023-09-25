const express = require('express')
const {auth} = require('../Middlewares/auth')
const {PostModel} = require('../Model/postSchema')

const postRoute = express.Router()

postRoute.get('/', auth, async(req,res)=>{

    const {userID} = req.body;
    try {
        
        const allPost = await PostModel.find({userID})
        res.status(200).send({"posts": allPost})
        
    } catch (error) {
        res.status(400).send({"msg": "Cannot get posts", "err": error})
    }
})

postRoute.post('/add', auth, async(req,res)=>{

    try {

        const newPost = new PostModel(req.body)
        await newPost.save();
        res.status(200).send({"msg": "Posts added Succesfully"})
        
    } catch (error) {
        res.status(400).send({"msg": "Posts cannot be added Succesfully", "err": error})
    }
})


postRoute.patch('/update/:id', auth, async(req,res)=>{

    const {id} = req.params;
    const {userID} = req.body;

    try {
        
        const post = await PostModel.findOne({_id: id})
        console.log("post", post);
        if(userID == post.userID){
            const updated = await PostModel.findByIdAndUpdate({_id: id}, {...req.body})
            res.status(200).send({"msg": "Posts updated Succesfully"})
        }
        else{
            res.status(200).send({"msg": "login to update your posts"})
        }
        
    } catch (error) {
        res.status(400).send({"msg": "cannot update posts", "err": error})
    }
})

postRoute.delete('/delete/:id', auth, async(req,res)=>{

    const {id} = req.params;
    const {userID} = req.body;

    try {
        
        const post = await PostModel.findOne({_id: id})
        console.log("post", post);
        if(userID == post.userID){
            const updated = await PostModel.findByIdAndDelete({_id: id})
            res.status(200).send({"msg": "Posts Deleted Succesfully"})
        }
        else{
            res.status(200).send({"msg": "login to Delete your posts"})
        }
        
    } catch (error) {
        res.status(400).send({"msg": "cannot Delete posts", "err": error})
    }
})

module.exports = {
    postRoute
}