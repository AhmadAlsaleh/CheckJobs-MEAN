var mongoose = require('mongoose')
var SpotSchema = require('./spot_model').Schema

const place = mongoose.Schema({
    title: String,
    description: String,
    lat: Number,
    lng: Number,
    isActive: { type: Boolean, default: true },
    creationData: { type: Date, default: new Date() },
    spots: [SpotSchema]
})

module.exports = {
    'Place': mongoose.model('Place', place),
    'Schema': place
}