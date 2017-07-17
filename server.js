const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { join } = require('path');

const sendEmails = require('./api/emailManager');

const app = express();


app.use(express.static(join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());

// App has only one method, used to send the emails
app.post('/emails/send', (req, res) => {
  res.json(sendEmails(req.body.data));
});

app.listen(8080);
console.log('App listening on port 8080'); // eslint-disable-line no-console
