'use strict';

const socket = require('../socket');
const inquirer = require('inquirer');
const Chance = require('chance');
const chance = new Chance();


const { partRequest, deliveryConfirmation } = require('./handler');
// step 1 remove set timeout
//step 2 add inquirer for user to select product
//  create payload
//step 3 emit payload

//-----Inquirer Signin Info-----//

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
    payload.partName = answer.partName;
    payload.quantity = answer.quantity;
    payload.description = answer.description;
    payload.manufacturer = answer.manufacturer;
    payload.color = answer.color;
    console.log('payload', payload);
    socket.emit('STEP1', payload);
  });


//-----Socket.io Emits-----//  
// partRequest(socket);

  
socket.on('STEP8', (payload) => {
  setTimeout(() => {
    deliveryConfirmation(payload);
  });
});

// socket.emit('STEP1', (payload) => {
//   partRequest(payload);
// });




