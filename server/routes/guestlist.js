const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Profile = require('../models/profile.model');
const GuestList = require('../models/guestlist.model');
require('../config/passport');

mongoose.set('useFindAndModify', false);

router.post('/create', passport.authenticate('jwt', {session : false}), (req, res) => {
  let {fullname, displayname, tel, email, invitation} = req.body;
  let errors = [];
  if (!fullname && !displayname) {
    errors.push({message: 'Vui lòng điền họ tên hoặc tên hiển thị người nhận', message_en: 'Fill in fullname or displayname'});
  };

  if (errors.length > 0) {
    res.status(500).json({message: {massageBody: errors, massageError: true}});
  } else {
    let newGuest = new GuestList({fullname, displayname, tel, email, invitation});
    newGuest.save(err => {
      if (err) {
        res.status(500).json({message : 'Xảy ra lỗi', message_en: 'Errors'});
      } else {
        Profile.findById(req.user.profile._id)
        .then(data => {
          data.guestlist.push(newGuest);
          data.save();
          res.json(newGuest);
        })
        .catch(err => console.log(err));
      }
    });
  }
});

router.get('/list', passport.authenticate('jwt', {session : false}), (req, res) => {
  GuestList.find()
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

router.get('/list/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  GuestList.findById(req.params.id)
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

router.delete('/delete/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  GuestList.findOneAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      Profile.findById(req.user.profile._id, (err, data) => {
        data.guestlist.map((item, index) => {
          if (item == req.params.id) {
            return data.guestlist.splice(index, 1);
          }
        });
        data.save(err => {
          if (err) {
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
          } else {
            res.status(200).json({message : {msgBody : "Successfully deleted", msgError : false}});
          }
        })
      });
    }
  });
});

router.put('/update/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  let {fullname, displayname, tel, email, invitation} = req.body;
  let newGuest = {
    fullname: fullname,
    displayname: displayname,
    tel: tel,
    email: email,
    invitation: invitation,
  }
  GuestList.findByIdAndUpdate(req.params.id, newGuest, (err) => {
    if (err) {
      return next(err);
    } else {
      res.json(newGuest);
    }
  });
});

module.exports = router;