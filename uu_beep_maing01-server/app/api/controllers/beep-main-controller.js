"use strict";
const BeepMainAbl = require("../../abl/beep-main-abl.js");

class BeepMainController {
  init(ucEnv) {
    return BeepMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return BeepMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return BeepMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new BeepMainController();
