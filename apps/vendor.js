'use strict';

const events = require('../lib/events.js');
const faker = require('faker');

class Email {
  constructor(payload) {
    this.customerName = payload.order.customerName,
    this.orderID = payload.order.orderID,
    this.email = `Thank you ${this.customerName}! Order ${this.orderID} has been delivered.`
  }
}

events.on('order received', (payload) => {
  events.emit('pickup scheduled', payload);
  console.log(`VENDOR: Order ${payload.order.orderID} has been RECEIVED`)
})

events.on('delivery confirmed', (payload) => {
  console.log('VENDOR: delivery confirmed', payload)
  events.emit('send email', payload);
})

events.on('send email', (payload) => {
  const email = new Email(payload);
  console.log('VENDOR: send email', email);
})

setInterval(() => {
  let orderDetails = {
    date: Date.now(),
    order: {
      storeName: "Flower Power",
      orderedOn: Date.now(),
      orderID: faker.datatype.uuid(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress()
    }
  }
  events.emit('order received', orderDetails);
}, 10000);

  