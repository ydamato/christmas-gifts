const shuffle = require('shuffle-array');
const format = require('string-template');
const _ = require('lodash');
const { Email } = require('email');

/**
 * @function getTplParams
 * @description Get parameters to apply to the template
 * @param {object} participant data for a participant
 * @return {Object} List of parameters
 */
const getTplParams = (participant) => {
  const result = {
    giver: participant.name
  };

  participant.receivers.forEach((receiver, index) => {
    result['receiver' + (index + 1)] = receiver.name;
  });

  return result;
};

/**
 * @function sendEmails
 * @description Send emails to all participants
 * @param {object} structuredJson JSON data for all participants
 * @return {Object} Object to send to the client
 */
const sendEmails = (structuredJson) => {
  const { subject, from, body } = structuredJson;
  const bodyType = 'html';
  const emailsAsString = [];
  structuredJson.participants.forEach((participant) => {
    const params = getTplParams(participant);
    const formattedBody = format(body, params);
    const to = participant.email;
    const email = new Email({ from, to, subject, formattedBody, bodyType });
    // email.send();
    emailsAsString.push(formattedBody);
  });
  return emailsAsString;
};

/**
 * @function getReceivers
 * @description Get all the receivers for a specific giver
 * @param {Array} participants List of all participants
 * @param {Number} index Index of the giver in the list
 * @param {Number} quantity Number of receiver
 * @return {Array} list of receivers
 */
const getReceivers = (participants, index, quantity) => {
  let giftCounter = quantity;
  let receiverIndex = index;
  const receivers = [];

  while (giftCounter > 0) {
    receiverIndex += 1;
    if (participants.length <= receiverIndex) {
      receiverIndex = 0;
    }
    receivers.push(participants[receiverIndex]);
    giftCounter -= 1;
  }

  return receivers;
};

/**
 * @function fillStructuredJson
 * @description Fill the JSON structure containing the matching giver/receivers
 * @param {JSON} data Data comming from http call
 * @return {Array} Structured json with shuffled array and receiver list for each participant
 */
const fillStructuredJson = (data) => {
  const { quantity, participants } = data;
  const shuffledParticipants = shuffle(participants);

  return _.merge(
    {},
    data,
    {
      participants: participants.map((giver, index) =>
        ({
          receivers: getReceivers(shuffledParticipants, index, quantity),
        })
      )
    }
  );
};


module.exports = data => sendEmails(fillStructuredJson(data));
