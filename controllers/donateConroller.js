
const User = require('../model/user');
const Donation = require('../model/donations');
const jwt = require('jsonwebtoken');

exports.donate = async (req, res) =>{
    const { token, to, currency, amount,message } = req.body
    try{
      const user = jwt.verify(token, JWT_SECRET)
      const receiver = await User.findOne({username: to})
      if(!receiver){
        return res.json({status: 'error', error: 'Invalid Reciptent'})
      }
      console.log(receiver)
      const donation = {
        from : user.username,
        to : to,
        currency: currency,
        amount : amount,
        message: message
      }
      const response = await Donation.create(donation)
      res.json({status: 'ok', message: 'Donation Successfull'})
    } catch(error){
      res.json({status: 'error', error: error})
    }
   
    
  }