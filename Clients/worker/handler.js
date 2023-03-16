'use strict';

const Chance = require('chance');
const chance = new Chance();
const inquirer = require('inquirer');



const createPayload = () => {
  let payload = {
    worker: chance.name(),
    orderID: chance.guid(),
    partName: '',
    quantity: '',
    description: '',
    manufacturer: '',
    color: '',
  };

  inquirer
    .prompt([
      {
        name: 'partName',
        type: 'input',
        message: 'Enter item name ',
      },
      {
        name: 'quantity',
        type: 'number',
        message: 'Enter item quantity ',
      },
      {
        name: 'description',
        type: 'input',
        message: 'Enter item description ',
      },
      {
        name: 'manufacturer',
        type: 'input',
        message: 'Enter item manufacturer ',
      },
      {
        name: 'color',
        type: 'input',
        message: 'Enter item color ',
      },

    ])
    .then((answer) => {
      payload.name = answer.name;
      payload.quantity = answer.quantity;
      payload.description = answer.description;
      payload.manufacturer = answer.manufacturer;
      payload.color = answer.color;
      console.log('payload', payload);
      return payload;
    });
};

const partRequest = (socket, payload = null) => {
  if (!payload) {
    payload = createPayload();
  }
  socket.emit('JOIN', payload);
  socket.emit('STEP1', payload);

  console.log(payload);
  // console.log(`Worker: Order request for ${payload.orderID} submitted.`);
};



















// const partRequest = (socket, payload = null) => {
//   if (!payload) {
//     payload = {
//       worker: chance.name(),
//       orderID: chance.guid(),
//       partName:  chance.shuffle(['brick', 'saw', 'wrench', 'hammer']),
//       partID: chance.guid(),
//       partQuantity: chance.integer({ min: 1, max: 100 }),
//       // priority: chance.shuffle(['Minor/low', 'Major/high', 'Critical/severe']),
//     };
//   }
//   socket.emit('JOIN', payload);
//   socket.emit('STEP1', payload);

//   console.log(payload);
//   console.log(`Worker: Order request for ${payload.orderID} submitted.`);
// };

const deliveryConfirmation = (payload) => {
  console.log(`Worker: Order request for ${payload.partName} filled.`);
};


module.exports = { partRequest, deliveryConfirmation };
