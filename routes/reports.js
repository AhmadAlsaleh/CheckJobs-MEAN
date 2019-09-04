var express = require('express');
var router = express.Router();

var User = require('../models/user_model').User

router.get('/', function(req, res, next) {
  User.find({}, ['_id', 'name', 'reports'],(err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.post('/newReport', (req, res) => {
  User.update({ _id: req.body.userID }, { $push: { reports: { body: req.body.reportBody } } }, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send({
        "message": "Report sent successfully"
      })
    }
  })
})

router.get('/doneReport/:id', (req, res) => {
  User.update({
    'reports._id': req.params.id
  }, {
    $set: {
      'reports.$.isDone': true
    }
  }, (err) =>{
    if (err) {
      res.send(err)
    } else {
      res.send({
        'message': 'Report Done'
      })
    }
  })
})

module.exports = router;
