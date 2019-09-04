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
    description: String,
    isActive: { type: Boolean, default: true },
    isDone: { type: Boolean, default: false }
})

module.exports = {
    'Spot': mongoose.model('Spot', spot),
    'Schema': spot
}