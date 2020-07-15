const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Require = require('../models/require.model');
require('../config/passport');

mongoose.set('useFindAndModify', false);

router.post('/create', (req, res) => {
  const { name, tel, email, type, request } = req.body;
  const newRequire = new Require({name, tel, email, type, request});
  newRequire.save()
  .then(() => res.json(newRequire))
  .catch(err => console.log(err));
});

router.get('/list', passport.authenticate('jwt', {session : false}), (req, res) => {
  Require.find()
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

router.get('/list/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  Require.findById(req.params.id)
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

module.exports = router;