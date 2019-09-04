var mongoose = require('mongoose')
var placesSchema = require('./place_model').Schema
var reportsSchema = require('./report_model').Schema

const user = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    facebookID: String,
    imagePath: String,
    isPro: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    places: [placesSchema],
    reports: [reportsSchema],
    starredSpots: [String]
})

module.exports = {
    'User': mongoose.model('User', user),
    'Schema': user
}