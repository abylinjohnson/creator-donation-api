const mongoose  = require('mongoose')

const DonationSchema = new mongoose.Schema({
    from: { type: String, required: true},
    to: { type: String, required: true,},
    currency: { type: String, required: true,},
    amount: { type: String, required: true,},
    message: { type: String, required: true,},
},
{
    collection: 'donations'
})

const model = mongoose.model('DonationSchema', DonationSchema)

module.exports = model