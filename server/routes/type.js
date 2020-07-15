const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const InvitationType = require('../models/type.model');
require('../config/passport');

mongoose.set('useFindAndModify', false);

router.post('/create', passport.authenticate('jwt', {session : false}), (req, res) => {
  let {type, type_en, template} = req.body;

  if (type) {
    const newType = new InvitationType({type, type_en, template});
    newType.save()
    .then(res.json(newType))
    .catch(err => console.log(err));
  }
});

router.get('/list', (req, res) => {
  InvitationType.find()
  .then(data => res.json(data))
  .catch(err => console.log(err));
});

router.put('/update/:id', passport.authenticate('jwt', {session : false}), (req, res, next) => {
  let {type, type_en, template} = req.body;
  let newType = {
    type: type,
    type_en: type_en,
    template: template
  };

  console.log(newType, req.params.id);

  InvitationType.findByIdAndUpdate(req.params.id, newType, (err) => {
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

router.get('/name/:type_en', passport.authenticate('jwt', {session : false}), (req, res) => {
  InvitationType.findOne({type_en: req.params.type_en})
  .then(data => res.json(data))
  .catch(err => console.log(err));
});

router.delete('/delete/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  InvitationType.findByIdAndDelete(req.params.id)
  .then(data => res.json({deletedType: data}))
  .catch(err => console.log(err));
});

module.exports = router;