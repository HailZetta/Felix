const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Template = require('../models/template.model');
const fs = require('fs');
const Path = require('path');
const multer = require('multer');
const unzipper = require('unzipper');
require('../config/passport');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../src/views/templates')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const filter = (req, file, cb) => {
  if (file.mimetype === 'application/zip' || file.mimetype === 'application/x-zip-compressed') {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filter });

mongoose.set('useFindAndModify', false);

router.post('/upload', upload.single('templateFile'), passport.authenticate('jwt', {session : false}), (req, res) => {
  if (req.file) {
    let {name, name_en, type, status, price} = req.body;
    let content = JSON.parse(req.body.content);

    let uploadFile = req.file.path;
    fs.createReadStream(uploadFile).pipe(unzipper.Extract({ path: '../src/views/templates' }));
    fs.unlinkSync(uploadFile, (err) => {
      if (err) throw err;
    });

    let templateFile = uploadFile.slice(0, -4).replace(/\\/g, "/");
    let newTemplate = new Template({name, name_en, content, templateFile, type, status, price});
    
    newTemplate.save()
    .then(data => {
      res.json({data})
    })
    .catch(err => {
      console.log(err)
      res.json({err})
    });
  } else {
    res.json({message: 'No template file'});
  }
});

router.get('/list', (req, res) => {
  Template.find()
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

router.get('/list/:id', (req, res) => {
  Template.findById(req.params.id)
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

router.put('/update/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  let {name, name_en, content, type, status, price} = req.body;
  let newTemplate = {
    name: name,
    name_en: name_en,
    content: content,
    type: type,
    status: status,
    price: price
  }
  Template.findByIdAndUpdate(req.params.id, newTemplate, (err) => {
    if (err) {
      return next(err);
    } else {
      res.json(newTemplate);
    }
  });
});

router.delete('/delete/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  Template.findByIdAndDelete(req.params.id, (err, data) => {
    fs.readdirSync(data.templateFile).forEach((file, index) => {
      const curPath = Path.join(data.templateFile, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(data.templateFile);
  })
  .then(data => res.json(data))
  .catch(err => res.json(err));
});

module.exports = router;