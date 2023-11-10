"use strict";
const SubscriptionAbl = require("../../abl/subscription-abl.js");

class SubscriptionController {
  get(ucEnv) {
    return SubscriptionAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
  delete(ucEnv) {
    return SubscriptionAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
  create(ucEnv) {

    return SubscriptionAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new SubscriptionController();
