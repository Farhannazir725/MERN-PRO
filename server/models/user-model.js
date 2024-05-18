const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const userSchema = new Schema({
    username: { 
        type: String, 
        required:true
            },
    email: { 
        type: String, 
        required:true
            },
    phone: { 
        type: String, 
        required:true
            },
    password: { 
        type: String, 
        required:true
            },
    isAdmin:{
        type:Boolean,
        default:false,
    },
  });
const JWT_SECRET = "Nazirisgoodboy";
  userSchema.pre('save', async function(next){
// console.log('pre method', this)
const user = this;
if (!user.isModified('password')) {
    next();
}
try {
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(user.password,salt);
    user.password = hash_pass;
} catch (error) {
    next(error)
}
  });

                //   compare password
        userSchema.methods.comparePassword = async function  (password){
            return  bcrypt.compare(password,this.password);
        }

        // json web token
   userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({userId:this._id.toString(), email:this.email, isAdmin:this.isAdmin},JWT_SECRET,{
           
        })
    } catch (error) {
        console.error(error)
    }
  };




  const User = new mongoose.model("User", userSchema);
  module.exports = User;