'use strict';

const socket = require('../socket.js');

socket.on('NEW_PART_REQUEST', (payload) => {
  socket.emit('PRODUCT_PICKED_UP', payload);

  console.log(`VENDOR: Part order ${payload.orderID} were picked up`);
  setTimeout(() => {
    socket.emit('PARTS_DELIVERED', payload);
    console.log(`VENDOR: Part order ${payload.orderID} were delivered`);
  }, 2000);
});
