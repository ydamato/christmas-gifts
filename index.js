const shuffle = require('shuffle-array');

const config = require('./data/config.json');
const sendEmail = require('./email');

/**
 * @function setNodeParams
 * @description Set the custom node params, used during app launch
 * params need the format 'key=value' to be take into account
 * @return {Object} all custom app params
 */
const setNodeParams = () => {
  const result = {};
  process.argv.forEach((arg) => {
    if (arg.includes('=')) {
      const splittedArg = arg.split('=');
      result[splittedArg[0]] = splittedArg[1];
    }
  });
  return result;
};

/**
 * @function getReceivers
 * @description Get all the receivers for a specific giver
 * @param {Array} participants List of all participants
 * @param {Number} index Index of the giver in the list
 * @param {Number} nbOfReceivers Number of receiver
 * @return {Array} list of receivers
 */
const getReceivers = (participants, index, nbOfReceivers) => {
  let giftCounter = nbOfReceivers;
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
 * @param {Array} participants List of all participants
 * @param {Number} nbOfReceivers Number of receiver - default: 2
 * @return {Array} list of receivers
 */
const fillStructuredJson = (participants, nbOfReceivers = 2) =>
  participants.map((giver, index) =>
    ({
      giver,
      receivers: getReceivers(participants, index, nbOfReceivers),
    })
  );

/**
 * @function getParticipants
 * @description Get participants list from JSON file
 * @param {String} dataPath Path to the JSON file
 * @return {Array} list of participants
 */
const getParticipants = dataPath => require(dataPath || config.defaultParticipantsJsonFile);

const params = setNodeParams();
const participants = shuffle(getParticipants(params.data));
const structuredJson = fillStructuredJson(participants, params.receivers);

sendEmail(structuredJson, params.email);
