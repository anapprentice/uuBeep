"use strict";
const ConnectionAbl = require("../../abl/connection-abl.js");

class ConnectionController {
  list(ucEnv) {
    return ConnectionAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new ConnectionController();
