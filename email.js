const format = require('string-template');
const { Email } = require('email');

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

module.exports = (structuredJson, tpl) => {
  structuredJson.forEach((item) => {
    const params = getTplParams(item);
    const body = format(tpl, params);
    const subject = 'test subject'; // TODO
    const from = 'me@example.com'; // TODO
    const to = item.giver.email;
    const email = new Email({ from, to, subject, body });
    email.send();
  });
};
