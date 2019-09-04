var mongoose = require('mongoose')

const report = mongoose.Schema({
    creationDate: { type: Date, default: new Date() },
    body: String,
    isDone: { type: Boolean, default: false }
})

module.exports = {
    'Report': mongoose.model('Report', report),
    'Schema': report
}