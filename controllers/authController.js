const express = require('express');
const mongoose = require('mongoose')
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({username}).lean()
  
    if(!user){
      return res.json({status: 'error', error: 'invalid username/password'})
    }
  
    if(await bcrypt.compare(password, user.password)){
  
      const token = jwt.sign({ 
        id: user._id, 
        username: user.username 
      }, JWT_SECRET)
      return res.json({status: 'ok', data: token})
    }
    return res.json({status: 'error', error: 'invalid username/password'})
  }

exports.register = async (req, res) =>{
    console.log(req.body)
    const { username, password: plainTextPassword} = req.body

    if(!username || typeof username !== 'string'){
        return res.json({ status: 'error', error: 'invalid Username' })
    }

    const password = await bcrypt.hash(plainTextPassword, 15)
    try{
        const response = await User.create({
            username,
            password
        })
        
        console.log("User Created : ",response)
    }catch(err){
        if(err.code === 11000){
            return res.json({status: 'error', error: 'Username already taken'})
        }
        return res.json({status: 'error'})
    }

    res.json({status: 'ok'})
}

exports.creator = async (req, res) =>{
    const page = req.query.p || 0
    const creatorsPerPage = 4
    const creators = await User.find().skip(page * creatorsPerPage).limit(creatorsPerPage).select('-password')
    return res.json({status: 'success', data: creators})

}

