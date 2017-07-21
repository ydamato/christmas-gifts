const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { join } = require('path');

const sendEmails = require('./api/sendEmails');

const app = express();


app.use(express.static(join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());

// API has only one method, used to send the emails
app.post('/emails/send', (req, res) => {
  res.json(sendEmails(req.body));
});

// Entry point to display the html page
app.get('*', (req, res) => {
  res.sendfile('./public/index.html');
});

app.listen(8080);
console.log('App listening on port 8080'); // eslint-disable-line
