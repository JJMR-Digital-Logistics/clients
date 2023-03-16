'use strict';

const managerRequest = (socket, payload) => {
  setTimeout(() => {
    console.log('MANAGER: PART_REQUEST_REVIEWED.', payload);
    socket.emit('STEP3', payload);
  }, 5000);
};

const deliveryNotice = (socket, payload) => {
  setTimeout(() => {
    console.log('Purchased parts were delivered to your facility!');
    socket.emit('STEP7', payload);
  }, 3000);
};

module.exports = { managerRequest, deliveryNotice };

// setTimeout(() => {
//   console.log('MANAGER:');
//   socket.emit('DELIVERED', {...payload, event: 'DELIVERED'});
// }, 2000);
