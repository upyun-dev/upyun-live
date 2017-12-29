const _ = require('lodash');
const request = require('request-promise-native');

class Choppe {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.token = options.token;
  }

  async request(options) {
    options = _.assign({
      baseUrl: this.baseUrl,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      json: true
    }, options);
  
    return await request(options);
  }
}

module.exports = Choppe;