var mongoose = require('mongoose')

const spot = mongoose.Schema({
    title: String,
    phone: String,
    mobile: String,
    days: Number,
    hours: Number,
    isPM: { type: Boolean, default: true},
    lowSal: Number,
    highSal: Number,
    gender: { type: String, default: 'Not important'},
    description: String
})

module.exports = {
    'Spot': mongoose.model('Spot', spot),
    'Schema': spot
}