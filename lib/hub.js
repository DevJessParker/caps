'use strict';

const port = process.env.PORT || 3000;
const io = require('socket.io')(port);
const vendor = require('../vendor/vendor.js');
const driver = require('../driver/driver.js');
const defaultConnection = require('../caps.js');

defaultConnection(io);
vendor(io);
driver(io);

setInterval(() => {
  new Store(storeNUM);
  storeNUM++
  let orderDetails = {
    date: Date.now(),
    order: {
      storeName: `${newStore.location}`,
      storeNumber: `${newStore.storeNUM}`,
      orderedOn: Date.now(),
      orderID: faker.datatype.uuid(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress()
    }
  }
  io.emit('order received', orderDetails);
}, 500);







