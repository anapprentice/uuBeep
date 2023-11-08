"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/event-error.js");

const WARNINGS = {

};

class EventAbl {

  constructor() {
    this.validator = Validator.load();
    // this.dao = DaoFactory.getDao("event");
  }

  async trigger(awid, dtoIn) {
    
  }

}

module.exports = new EventAbl();
