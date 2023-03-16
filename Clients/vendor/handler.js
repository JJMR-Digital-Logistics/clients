'use strict';

// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3001/jjmr');

const deliveryRequest = (socket, payload) => {
  setTimeout(() => {
    console.log('Vendor: Request for Delivery Received');
    socket.emit('STEP5', payload);
  }, 2000);
};

module.exports = { deliveryRequest };