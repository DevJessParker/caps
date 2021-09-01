'use strict';

const locations = require('./locationRef.js');

class Store {
  constructor(num) {
    this.location = faker.address.cityName,
    this.storeNUM = num,
    this.socket = io.of(`'/${this.storeNUM}'`),
    this.push = function () {
      locations.push(this)
    }
  }
}

module.exports = Store;