const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {UserModel} = require('../Model/userSchema')
require('dotenv').config()

const userRoute = express.Router()


userRoute.post('/register', async(req, res)=>{

    const {email, pass} = req.body;

    try {
        
        const existingUser = await UserModel.findOne({email})

        if(existingUser){
            res.status(200).send({"msg": "user already exists"})
        }
        else{
            bcrypt.hash(pass, 5, async(err, hash)=>{
                // Store hash in your password DB.
                if(err){
                    res.status(200).send({"err": err})
                }
                
                const user = new UserModel({...req.body, pass: hash})
                await user.save();
                res.status(200).send({"msg": "user registered"})
            });
        }
    } catch (error) {

        res.status(400).send({"err": error})
        
    }

})



userRoute.post('/login', async(req, res)=>{

    const {email, pass} = req.body;

    try {
        
        const existingUser = await UserModel.findOne({email})
        
        if(existingUser){
            bcrypt.compare(pass, existingUser.pass, (err, result)=> {
                // result == true
                if(err){
                    res.status(200).send({"err": err})
                }

                const token = jwt.sign({userID: existingUser._id, userName: existingUser.name}, process.env.secretKey, {expiresIn: '7d'});
                res.status(200).send({"msg": "login succesfull", "token": token})
            });
        }
        else{
            res.status(200).send({"msg": "user not found"})
        }
    } catch (error) {

        res.status(400).send({"err": error})
        
    }

})






module.exports={
    userRoute
}