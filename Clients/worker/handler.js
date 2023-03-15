'use strict';

const Chance = require('chance');

const chance = new Chance();

const partRequest = (socket, payload = null) => {
  if (!payload) {
    payload = {
      worker: chance.name(),
      orderID: chance.guid(),
      partName: chance.pickone(['brick', 'saw', 'wrench', 'hammer']),
      partID: chance.guid(),
      partQuantity: chance.integer({ min: 1, max: 50 }),
      priority: chance.pickone(['Minor/low', 'Major/high', 'Critical/severe']),
    };
  }

  socket.emit('JOIN', payload.worker);
  socket.emit('NEW_PART_REQUEST', payload);

  console.log(`Worker: Order request for ${payload.orderID} submitted.`);
};

const partRequestFilled = (payload) => {
  console.log(`Worker: Order request for ${payload.orderID} filled.`);
};

module.exports = { partRequest, partRequestFilled };
