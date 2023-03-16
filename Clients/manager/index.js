'use strict';

const socket = require('../socket.js');

const { deliveryNotice, managerRequest } = require('./handler');

//step 2 below will receive the payload
//manager needs to review payload(console.log)

socket.on('STEP2', (payload) => {
  managerRequest(socket, payload);
  console.log('MANAGER: PART_REQUEST_REVIEWED.', payload);
});
// setTimeout(() => {
// }, 1000);

socket.on('STEP6', (payload) => {
  setTimeout(() => {
    deliveryNotice(socket, payload);
  });
});