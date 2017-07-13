const format = require('string-template');
const { Email } = require('email');
const config = require('./data/config.json');

/**
 * @function getTplParams
 * @description Get parameters to apply to the template
 * @param json JSON for a specific giver
 * @return {Object} List of parameters
 */
const getTplParams = (json) => {
  const result = {
    giver: json.giver.name
  };

  json.receivers.forEach((receiver, index) => {
    result['receiver' + (index + 1)] = receiver.name;
  });

  return result;
};

/**
 * @function getEmailData
 * @description Get email data from JSON file
 * @param {String} path Path to the JSON file
 * @return {Object} email data
 */
const getEmailData = path => require(path || config.defaultEmailJsonFile);

module.exports = (structuredJson, emailDataPath) => {
  const emailData = getEmailData(emailDataPath);
  structuredJson.forEach((item) => {
    const params = getTplParams(item);
    const { subject, from } = emailData;
    const body = format(emailData.body, params);
    const to = item.giver.email;
    const bodyType = 'html';

    const email = new Email({ from, to, subject, body, bodyType });
    email.send();
  });
};
