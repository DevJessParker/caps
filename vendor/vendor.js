'use strict';

const io = require('socket.io-client');
let host = 'http://localhost:3000';

const hub = io.connect(host);
let vendorSpace;

const Email = require('../lib/email.js');
const storeNUM = 1000;

function vendor(io) {
  vendorSpace = io.of('/vendor');
  vendorSpace.on('connection', setupListeners)
}

function setupListeners(socket) {

  socket.on('order received', handleReceived);
  socket.on('delivery confirmed', handleDelivery);
  socket.on('send email', handleEmail);
  
  function handleReceived(payload) {
    vendorSpace.emit('pickup scheduled', payload);
    console.log(`VENDOR: Order ${payload.order.orderID} has been RECEIVED`)
  }

  function handleDelivery(payload) {
    console.log('VENDOR: delivery confirmed', payload)
    vendorSpace.emit('send email', payload);
  }

  function handleEmail(payload) {
    const email = new Email(payload);
    console.log('VENDOR: send email', email);
  }
}


module.exports = vendor;

  