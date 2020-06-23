const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Profile = require('../models/profile.model');
require('../config/passport');

mongoose.set('useFindAndModify', false);

router.post('/create', passport.authenticate('jwt', {session : false}), (req, res) => {
  let {fullname, tel, city, guestlist, invitation} = req.body;
  if (fullname) {
    const newProfile = new Profile({fullname, tel, city, guestlist, invitation});
    console.log(newProfile)
    newProfile.save(err => {
      if (err) {
        res.status(500).json({message : 'Xảy ra lỗi', message_en: 'Errors'});
      } else {
        req.user.profile = newProfile;
        req.user.save(err => {
          if (err) {
            res.status(500).json({message : 'Xảy ra lỗi', message_en: 'Errors'});
          } else {
            res.status(200).json({newProfile});
          }
        });
      }
    });
  }
});

router.get('/list', passport.authenticate('jwt', {session : false}), (req, res) => {
  Profile.find()
  .then(data => res.json(data))
  .catch(err => console.log(err));
});

router.get('/list/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  Profile.findById(req.params.id)
  .then(data => res.json(data))
  .catch(err => console.log(err));
});

router.put('/update/:id', passport.authenticate('jwt', {session : false}), (req, res, next) => {
  let {fullname, tel, city} = req.body;
  const newProfile = {
    fullname: fullname,
    tel: tel,
    city: city
  }
  Profile.findByIdAndUpdate(req.params.id, newProfile, (err) => {
    if (err) {
      return next(err);
    } else {
      res.json(newProfile);
    }
  })
});

module.exports = router;