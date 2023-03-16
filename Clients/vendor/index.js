'use strict';

const socket = require('../socket.js');
const { deliveryRequest } = require('./handler.js');

socket.on('STEP4', (payload) => {
  setTimeout(() => {
    deliveryRequest(socket, payload);
  }, 2000);
});
