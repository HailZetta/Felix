const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Content = require('../models/content.model');
require('../config/passport');

mongoose.set('useFindAndModify', false);

router.post('/create', passport.authenticate('jwt', {session : false}), (req, res) => {
  const {contentlist} = req.body;
  const newContent = new Content({contentlist});
  newContent.save()
  .then(() => res.json(newContent))
  .catch(err => console.log(err));
});

router.get('/list', passport.authenticate('jwt', {session : false}), (req, res) => {
  Content.find()
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

router.get('/list/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  Content.findById(req.params.id)
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

router.put('/update/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  let {contentlist} = req.body;
  let newContent = {
    contentlist: contentlist,
  };
  Content.findByIdAndUpdate(req.params.id, newContent, (err) => {
    if (err) {
      return next(err);
    } else {
      res.json(newContent);
    }
  });
});

router.delete('/delete/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  Content.findByIdAndDelete(req.params.id)
  .then(data => res.json({deletedContent: data}))
  .catch(err => console.log(err));
});

module.exports = router;