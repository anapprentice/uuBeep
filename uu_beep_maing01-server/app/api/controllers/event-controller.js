"use strict";
const EventAbl = require("../../abl/event-abl.js");

class EventController {

  trigger(ucEnv) {
    return EventAbl.trigger(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new EventController();
