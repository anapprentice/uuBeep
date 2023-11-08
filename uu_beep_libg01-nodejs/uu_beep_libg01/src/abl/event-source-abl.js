"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/event-source-error.js");

const WARNINGS = {};

class EventSourceAbl {
  constructor() {
    this.validator = Validator.load();
    // this.dao = DaoFactory.getDao("eventSource");
  }

  async broadcast(awid, dtoIn) {
    
  }

  async initiate(awid, dtoIn) {
    return { lib: "ok" };
  }
}

module.exports = new EventSourceAbl();
