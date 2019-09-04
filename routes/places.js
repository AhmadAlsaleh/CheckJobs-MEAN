var express = require('express');
var router = express.Router();
var User = require('../models/user_model').User

router.get('/', function(req, res, next) {
    User.find({}, ['places'],(err, data) => {
      if (err) {
        res.send(err)
      } else {
        var rs = []
        data.forEach(user => {
          user.places.forEach(place => {
            if (place.isActive == true) {
              rs.push(place)
            }
          })
        })
        res.send(rs)
      }
    })
})  

router.get('/:id', (req, res) => {
    User.findById(req.params.id, ['name', 'places'], (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

router.post('/newPlace/:id', (req, res) => {
    User.update({ _id: req.params.id }, { $push: { places: req.body } }, (err, data) => {
        if (err) {
          res.send(err)
        } else {
          res.send(data)
        }
      })
})

router.delete('/:id', (req, res) => {
    User.update({ 'places._id': req.params.id }, { $set: {
        'places.$.isActive': false
    } }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

router.delete('/delete/:id', (req, res) => {
  User.update({ $pull: { places: { _id: req.params.id } } },(err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

module.exports = router;
