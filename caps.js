'use strict';

const events = require('./lib/events.js');

require('./apps/driver.js');
require('./apps/vendor.js');

class EVENT {
  constructor(event, payload) {
    this.event = event
    this.timestamp = Date.now();
    this.payload = payload.order
  }
}

events.on('order received', (payload) => {
  let log = new EVENT('order received', payload)
  console.log(log)
});
events.on('pickup scheduled', (payload) => {
  let log = new EVENT('pickup scheduled', payload)
  console.log(log)
});
events.on('in-transit', (payload) => {
  let log = new EVENT('in-transit', payload)
  console.log(log)
});
events.on('delivered', (payload) => {
  let log = new EVENT('delivered', payload)
  console.log(log)
  events.emit('delivery confirmed', payload);
});
events.on('delayed', (payload) => {
  let log = new EVENT('order delayed', payload)
  console.log(log)
});
events.on('returned to vendor', (payload) => {
  let log = new EVENT('returned to vendor', payload)
  console.log(log)
});

