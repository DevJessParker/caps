'use strict';

const io = require('socket.io-client');
let host = 'http://localhost:3000';

const hub = io.connect(host);

let driverSpace;

function driver(io) {
  driverSpace = io.of('/vendor');
  driverSpace.on('connection', setupListeners)
}

function setupListeners(socket) {

  socket.on('pickup scheduled', handlePickupScheduled(payload));
  socket.on('in-transit', handleInTransit(payload));


  function handlePickupScheduled(payload) {
    const delayVar = (Math.ceil(Math.random() * 10))
    setTimeout(() => {
      if (delayVar > 5) {
        driverSpace.emit('in-transit', payload);
        console.log(`DRIVER: Order ${payload.order.orderID} is now IN TRANSIT`)
      } else if (delayVar > 3 && delayVar <= 5) {
        driverSpace.emit('delayed', payload)
        console.log(`DRIVER: Order ${payload.order.orderID} is now DELAYED`)
      } else if (delayVar > 0 && delayVar <= 3) {
        driverSpace.emit('returned to vendor', payload)
        console.log(`DRIVER: Order ${payload.order.orderID} has been RETURNED TO VENDOR`)
      }
    }, 1000)
  }

  function handleInTransit(payload) {
    setTimeout(() => {
    driverSpace.emit('delivered', payload)
    console.log(`DRIVER: Order ${payload.order.orderID} has been DELIVERED`)
    }, 1000)
  }
}

module.exports = driver;


