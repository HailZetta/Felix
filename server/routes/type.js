const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const InvitationType = require('../models/type.model');
require('../config/passport');

mongoose.set('useFindAndModify', false);

router.post('/create', passport.authenticate('jwt', {session : false}), (req, res) => {
  let {type, template} = req.body;

  if (type) {
    const newType = new InvitationType({type, template});
    newType.save()
    .then(res.json(newType))
    .catch(err => console.log(err));
  }
});

router.get('/list', passport.authenticate('jwt', {session : false}), (req, res) => {
  InvitationType.find()
  .then(data => res.json(data))
  .catch(err => console.log(err));
});

router.put('/update/:id', passport.authenticate('jwt', {session : false}), (req, res, next) => {
  const {type, template} = req.body;
  const newType = {
    type: type,
    template: template
  };

  InvitationType.findByIdAndUpdate(req.params.id, newType, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(newType);
    }
  })
});

router.get('/list/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  InvitationType.findById(req.params.id)
  .then(data => res.json(data))
  .catch(err => console.log(err));
});

router.delete('/delete/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  InvitationType.findByIdAndDelete(req.params.id)
  .then(data => res.json({deletedType: data}))
  .catch(err => console.log(err));
});

module.exports = router;