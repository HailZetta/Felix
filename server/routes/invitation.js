const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Profile = require('../models/profile.model');
const Invitation = require('../models/invitation.model');
require('../config/passport');

mongoose.set('useFindAndModify', false);

router.post('/create', passport.authenticate('jwt', {session : false}), (req, res) => {
  let {type, template, content, guestlist, status} = req.body;
  const newInvitation = new Invitation({type, template, content, guestlist, status});
  newInvitation.save(err => {
    if (err) {
      res.status(500).json({message : 'Xảy ra lỗi', message_en: 'Errors'});
    } else {
      Profile.findById(req.user.profile._id)
      .then(data => {
        data.invitation.push(newInvitation);
        data.save();
        res.json(data);
      })
      .catch(err => console.log(err));
    }
  });
});

router.get('/list', passport.authenticate('jwt', {session : false}), (req, res) => {
  Invitation.find()
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

router.get('/list/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  Invitation.findById(res.params.id)
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

router.delete('/delete/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  Invitation.findOneAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      Profile.findById(req.user.profile._id, (err, data) => {
        data.invitation.map((item, index) => {
          if (item == req.params.id) {
            return data.invitation.splice(index, 1);
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

router.put('/update/:id', passport.authenticate('jwt', {session : false}), (req, res, next) => {
  let {type, template, content, guestlist, status} = req.body;
  const newInvitation = {
    type: type,
    template: template,
    content: content,
    guestlist: guestlist,
    status: status,
  }
  Invitation.findByIdAndUpdate(req.params.id, newInvitation, (err) => {
    if (err) {
      return next(err);
    } else {
      res.json(newInvitation);
    }
  });
});

module.exports = router;