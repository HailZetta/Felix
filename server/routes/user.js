const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/user.model');
require('../config/passport');

mongoose.set('useFindAndModify', true);

// Register
router.post('/register', (req, res) => {
  let {email, password, password2, role, profile} = req.body;
  let errors = [];

  if (!email || !password || !password2) {
    errors.push({vi: 'Vui lòng điền các thông tin yêu cầu (*)', en: 'Fill in all required infomation'});
  }

  if (password != password2) {
    errors.push({vi: 'Mật khẩu xác nhận không chính xác', en: 'Password is not match'});
  }

  if (errors.length > 0) {
    res.status(500).json({message: errors, messageError: true});
  } else {
    Users.findOne({email: email})
    .then(user => {
      if (user) {
        errors.push({vi: 'Email đã tồn tại, vui lòng sử dụng email khác', en: 'Email already exists, please try another email'})
        res.status(500).json({message: errors, messageError: true})
      } else {
        bcrypt.hash(password, 10, (err, hashPassword) => {
          password = hashPassword;
          const newUser = new Users({
            email, password, role, profile
          });
          newUser.save()
          .then(() => {res.status(200).json({message: {en: 'Sign up successfully', vi: 'Đăng ký tài khoản thành công'}, messageError: false})})
          .catch(err => console.log(err));
        });
      }
    })
  }
});

router.get('/list', (req, res) => {
  Users.find()
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err))
});

router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
  if (req.isAuthenticated()){
    const {_id, email, role, profile} = req.user;
    const token = JWT.sign({
      iss : "ZettaCo",
      sub : _id
    }, "zetta", {expiresIn: "12h"});

    res.cookie('access_token', token, {httpOnly: true, sameSite: true}); 
    res.status(200).json({isAuthenticated: true, user: {_id, email, role, profile}});
  }
});

router.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.clearCookie('access_token');
  res.json({user: {email: "", role: ""}, success: true});
});

router.get('/authenticated', passport.authenticate('jwt', {session : false}), (req, res) => {
  const {_id, email, role, profile} = req.user;
  res.status(200).json({isAuthenticated : true, user : {_id, email, role, profile}});
});

router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  let {password, password2} = req.body;
  bcrypt.hash(password, 10, (err, hashPassword) => {
    password = hashPassword;
    const newUser = {
      password: password,
    };
    Users.findByIdAndUpdate(req.params.id, newUser, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json({message: newUser});
      }
    });
  });
});

router.get('/list/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
  Users.findById(req.params.id)
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;