const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(cookieParser());
app.use('/templates', express.static('templates'));
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/felix', {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
  if (err) throw err;
  console.log('Successfully connected!');
})

mongoose.set('useFindAndModify', true);

const UserRouter = require('./routes/user');
const TypeRouter = require('./routes/type');
const ProfileRouter = require('./routes/profile');
const InvitationRouter = require('./routes/invitation');
const ContentRouter = require('./routes/content');
const GuestlistRouter = require('./routes/guestlist');
const TemplateRouter = require('./routes/template');

app.use('/users', UserRouter);
app.use('/type', TypeRouter);
app.use('/profile', ProfileRouter);
app.use('/invitation', InvitationRouter);
app.use('/content', ContentRouter);
app.use('/guestlist', GuestlistRouter);
app.use('/template', TemplateRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});