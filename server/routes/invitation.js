const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const multer = require('multer');
const Profile = require('../models/profile.model');
const Invitation = require('../models/invitation.model');
require('../config/passport');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../src/views/upload');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const filter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filter });

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
        res.json(newInvitation._id);
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

router.get('/list/:id', (req, res) => {
  Invitation.findById(req.params.id)
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

router.delete('/delete/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  Invitation.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      Profile.findById(req.user.profile._id, (err, data) => {
        data.invitation.map((item, index) => {
          if (item == req.params.id) {
            console.log(item, req.params.id, index)
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

router.put('/upload/:id', upload.any(), passport.authenticate('jwt', {session : false}), (req, res) => {
  if (req.files) {

    Invitation.findById(req.params.id).then(data => {
      for (let i = 0; i < req.files.length; i++) {
        console.log(req.files[i]);
        data.content = {
          ...data.content,
          [req.files[i].fieldname]: req.files[i].path.replace(/\\/g, "/"),
        }
      };

      Invitation.findByIdAndUpdate(req.params.id, data, (err) => {
        if (err) {
          return next(err);
        } else {
          res.json(data);
        }
      });
    });

  } else {
    res.json({message: 'No file'});
  }
});

module.exports = router;