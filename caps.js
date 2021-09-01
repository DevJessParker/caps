'use strict';

const Event = require('./lib/event.js');

let globalConnection;

function defaultConnection(io) {
  globalConnection = io;
  globalConnection.on('connect', setupListeners)
  console.log('global connection active')
}

function setupListeners(socket) {
  socket.on('order received', handleOrderReceived(payload));
  socket.on('pickup scheduled', handlePickup(payload));
  socket.on('in-transit'), handleInTransit(payload);
  socket.on('delivered', handleDelivered(payload));
  socket.on('delayed', handleDelayed(payload));
  socket.on('returned to vendor', handleReturnedToVendor(payload));

  function handleOrderReceived(payload) {
    let log = new EVENT('order received', payload)
    console.log(log)
  }
  function handlePickup(payload) {
     log = new EVENT('pickup scheduled', payload)
    console.log(log)
  }
  function handleInTransit(payload) {
    let log = new EVENT('in-transit', payload)
    console.log(log)
  }
  function handleDelivered(payload) {
    let log = new EVENT('delivered', payload)
    console.log(log)
    globalConnection.emit('delivery confirmed', payload);
  }
  function handleDelayed(payload) {
    let log = new Event('order delayed', payload)
    console.log(log)
  }
  function handleReturnedToVendor(payload) {
    let log = new EVENT('returned to vendor', payload)
    console.log(log)
  }
}

module.exports = defaultConnection;

