'use strict';

const events = require('../lib/events.js');

events.on('pickup scheduled', (payload) => {
  const delayVar = (Math.ceil(Math.random() * 10))
  setTimeout(() => {
    if (delayVar > 5) {
      events.emit('in-transit', payload);
      console.log(`DRIVER: Order ${payload.order.orderID} is now IN TRANSIT`)
    } else if (delayVar > 3 && delayVar <= 5) {
      events.emit('delayed', payload)
      console.log(`DRIVER: Order ${payload.order.orderID} is now DELAYED`)
    } else if (delayVar > 0 && delayVar <= 3) {
      events.emit('returned to vendor', payload)
      console.log(`DRIVER: Order ${payload.order.orderID} has been RETURNED TO VENDOR`)
    }
  }, 1000)
})

events.on('in-transit', (payload) => {
  setTimeout(() => {
  events.emit('delivered', payload)
  console.log(`DRIVER: Order ${payload.order.orderID} has been DELIVERED`)
  }, 1000)
})


