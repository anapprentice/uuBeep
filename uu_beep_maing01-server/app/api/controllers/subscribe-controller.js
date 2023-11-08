"use strict";
const SubscribeAbl = require("../../abl/subscribe-abl.js");

class SubscribeController {
  create(ucEnv) {
    return SubscribeAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new SubscribeController();
