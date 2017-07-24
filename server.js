const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { join } = require('path');

const sendEmails = require('./api/sendEmails');
const { validate } = require('./api/validator');

const app = express();


app.use(express.static(join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());

// Send the emails
app.post('/emails/send', (req, res) => {
  res.json(sendEmails(req.body));
});

// Validate participant data
app.post('/validate', (req, res) => {
  res.json(validate(req.body));
});

// Entry point to display the html page
app.get('*', (req, res) => {
  res.sendfile('./public/index.html');
});

app.listen(8080);
console.log('App listening on port 8080'); // eslint-disable-line
