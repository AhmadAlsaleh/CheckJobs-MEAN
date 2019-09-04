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

router.post('/newSpot/:id', (req, res) => {
    User.update({ 'places._id': req.params.id }, { $push: { 'places.$.spots': req.body } }, (err, data) => {
        if (err) {
          res.send(err)
        } else {
          res.send(data)
        }
      })
})

router.delete('/:id', (req, res) => {
  res.send("TODO")
  // User.findOneAndUpdate({
  //   'places.spots._id': req.params.id
  // },
  // { $pull: {
  //     'places.$.spots': { id: req.params.id }
  // } }, (err, data) => {
  //     if (err) {
  //         res.send(err)
  //     } else {
  //         res.send(data)
  //     }
  // })

  // User.findOne({ 'places.spots': { $elemMatch: { _id: req.params.id } } }, ['places'], (err, data) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     var reS = {}
  //     data.places.forEach(place => {
  //       place.spots.forEach(spot => {
  //         if (spot._id == req.params.id) {
  //           reS = spot
  //         }
  //       })
  //     })
  //     reS.isActive = false


  // User.update({
  //   'places.spots._id': req.params.id
  // },
  // { $set: {
  //     'places.$.spots.0': reS
  // } }, (err, data) => {
  //     if (err) {
  //         res.send(err)
  //     } else {
  //         res.send(data)
  //     }
  // })  

  //   }
  // })

})

router.get('/getStarred/:id', (req, res) => {
  User.findById(req.params.id, ['starredSpots'], (err, dataStar) => {
    if (err) {
      res.send(err);
    } else {
      
      User.find(
        { places: { $elemMatch: { _id: { $in: dataStar.starredSpots } } } },
       ['places'] ,(err, data) => {
         if (err) {
           res.send(err)
         } else {
           var rs = [];
           data.forEach(user => {
             user.places.forEach(place => {
               if (dataStar.starredSpots.includes(place.id) && place.isActive == true) {
                 rs.push(place)
               }
             })
           });
           res.send(rs)
         }
     })
    }
  })
})

router.post('/toggleStarred', (req, res) => {
  User.findById(req.body.userID, ['starredPlaces'], (err, data) => {
    if (data.starredPlaces.includes(req.body.placeID)) {
      
      User.update({ '_id': req.body.userID }, { $pull: { starredPlaces: req.body.placeID } }, (err) => {
        if (err) {
          res.send(err)
        } else {
          res.send({ "message": "Remove from Starred" })
        }
      })

    } else {

      User.update({ '_id': req.body.userID }, { $push: { starredPlaces: req.body.placeID } }, (err) => {
        if (err) {
          res.send(err)
        } else {
          res.send({ "message": "Add to Starred" })
        }
      })

    }
  })
})

module.exports = router;
